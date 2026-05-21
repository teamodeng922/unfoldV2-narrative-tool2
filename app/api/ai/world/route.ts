import { NextResponse } from "next/server";
import type { PlotValues, WorldAiPatch, WorldSettings } from "@/src/types";

export const runtime = "nodejs";

type WorldAiRequest = {
  message?: string;
  context?: {
    worldSettings?: WorldSettings;
    gameName?: string;
    mainPlot?: PlotValues;
  };
};

type WorldAiResponse = {
  reply: string;
  patch: WorldAiPatch;
};

const jsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: {
      type: "string",
      description: "给用户的一句简短中文回复，说明已调整了什么。",
    },
    patch: {
      type: "object",
      additionalProperties: false,
      properties: {
        gameName: {
          type: "string",
          description: "新的游戏名称。没有必要修改时可以省略。",
        },
        mainPlot: {
          type: "object",
          additionalProperties: false,
          properties: {
            opening: { type: "string" },
            develop: { type: "string" },
            climax: { type: "string" },
            ending: { type: "string" },
          },
        },
      },
    },
  },
  required: ["reply", "patch"],
};

function readOutputText(value: unknown): string {
  if (typeof value !== "object" || value === null) return "";

  const record = value as Record<string, unknown>;
  if (typeof record.output_text === "string") return record.output_text;

  const output = record.output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      if (typeof item !== "object" || item === null) return [];
      const content = (item as Record<string, unknown>).content;
      if (!Array.isArray(content)) return [];

      return content.flatMap((contentItem) => {
        if (typeof contentItem !== "object" || contentItem === null) return [];
        const text = (contentItem as Record<string, unknown>).text;
        return typeof text === "string" ? [text] : [];
      });
    })
    .join("");
}

function isWorldAiResponse(value: unknown): value is WorldAiResponse {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.reply === "string" && typeof record.patch === "object" && record.patch !== null;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "缺少 OPENAI_API_KEY，已无法调用真实 AI。" },
      { status: 500 },
    );
  }

  const body = (await request.json()) as WorldAiRequest;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "请输入要调整的内容。" }, { status: 400 });
  }

  const context = body.context;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.2",
      input: [
        {
          role: "system",
          content:
            "你是互动叙事游戏策划助手，只负责修改世界设定页。必须只返回符合 schema 的 JSON。不要改用户没有要求改的字段。中文要精炼、可直接放进产品界面。",
        },
        {
          role: "user",
          content: JSON.stringify(
            {
              task: message,
              currentWorld: context,
              rules: [
                "patch 只能包含 gameName 和 mainPlot。",
                "mainPlot 的 opening/develop/climax/ending 每段控制在 30 到 70 个中文字符。",
                "如果用户要求改游戏名，返回 gameName。",
                "如果用户要求改氛围、世界观、大纲、主线方向，返回 mainPlot 中需要变化的段落。",
                "reply 不超过 30 个中文字符。",
              ],
            },
            null,
            2,
          ),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "world_setting_patch",
          schema: jsonSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `AI 调用失败：${errorText.slice(0, 300)}` },
      { status: response.status },
    );
  }

  const result = (await response.json()) as unknown;
  const outputText = readOutputText(result);

  try {
    const parsed = JSON.parse(outputText) as unknown;
    if (isWorldAiResponse(parsed)) {
      return NextResponse.json(parsed);
    }
  } catch {
    // Fall through to a readable error below.
  }

  return NextResponse.json(
    { error: "AI 返回内容无法识别，请再试一次。" },
    { status: 502 },
  );
}
