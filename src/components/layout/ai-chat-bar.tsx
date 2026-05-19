"use client";

import { useMemo, useState } from "react";
import { useEditorStore } from "@/src/stores/editor-store";
import type { StepId } from "@/src/types";

type ChatMessage = {
  id: number;
  role: "user" | "ai";
  text: string;
};

const stepPrompts: Record<StepId, { intro: string; placeholder: string; reply: string }> = {
  world: {
    intro: "这里专门调整世界设定。你可以说：把宫廷斗争更黑暗一点，增加亡国秘密，或把游戏名改得更古风。",
    placeholder: "例如：让世界观更暗一点，增加一个皇室秘密...",
    reply: "我会优先调整游戏名、主线方向和大纲详情，让世界设定更贴近你的描述。",
  },
  mechanic: {
    intro: "这里专门调整游戏玩法。你可以说：降低恋爱攻略比重，加入更多策略博弈，或把副玩法换成悬疑推理。",
    placeholder: "例如：主玩法保留恋爱，但加入更多策略谋略...",
    reply: "我会按你的方向重组主玩法、副玩法和玩家体验流程。",
  },
  style: {
    intro: "这里专门调整美术风格。你可以说：更冷一点、更像国风工笔，或让开场画面更有压迫感。",
    placeholder: "例如：画面更冷，更有深宫压迫感...",
    reply: "我会把画风、色调和开场画面氛围一起往这个方向调整。",
  },
  hero: {
    intro: "这里专门调整男主设定。你可以说：让他更危险、更克制，身份改成废太子，或外貌更病弱。",
    placeholder: "例如：把男主改得更危险，身份换成废太子...",
    reply: "我会围绕男主性格、身份、外貌和一句话介绍做联动调整。",
  },
  heroine: {
    intro: "这里专门调整女主设定。你可以说：让她更强势，身份换成亡国公主，或性格更白切黑。",
    placeholder: "例如：女主更强势，身份改成亡国公主...",
    reply: "我会同步调整女主类型、身份处境、外貌特征和角色气质。",
  },
  plot: {
    intro: "这里专门调整剧情线。你可以说：开端太平淡，加入刺杀；高潮更虐；或把结局改成开放式。",
    placeholder: "例如：开端加入一场刺杀，让剧情更紧张...",
    reply: "我会按你的要求改写主线四段和相关角色剧情线。",
  },
  scene: {
    intro: "这里专门调整地点与场景。你可以说：增加一个密室地点，把冷宫改成关键场景，或缩短总天数。",
    placeholder: "例如：增加一个密室地点，把冷宫设为关键线索点...",
    reply: "我会围绕日程、地点开放条件和场景用途来调整。",
  },
  detail: {
    intro: "这里专门调整玩法细节。你可以说：好感度可见，修罗场第20天触发，或数值门槛降低。",
    placeholder: "例如：好感度改成可见，修罗场第20天触发...",
    reply: "我会更新结局框架、数值规则、多线恋爱和角色主动行为。",
  },
  play: {
    intro: "这里是开始游戏前的检查。你可以说：帮我检查还缺什么，或把未完成的地方列出来。",
    placeholder: "例如：帮我检查还有哪些地方没完成...",
    reply: "我会按当前配置做一次开局前检查，并指出最需要补齐的内容。",
  },
};

export function AiChatBar() {
  const step = useEditorStore((state) => state.step);
  const prompt = useMemo(() => stepPrompts[step], [step]);
  const [message, setMessage] = useState("");
  const [messagesByStep, setMessagesByStep] = useState<Partial<Record<StepId, ChatMessage[]>>>(
    {},
  );
  const messages = messagesByStep[step] ?? [
    {
      id: 0,
      role: "ai" as const,
      text: prompt.intro,
    },
  ];

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;

    const nextId = Date.now();
    setMessagesByStep((current) => ({
      ...current,
      [step]: [
        ...(current[step] ?? [{ id: 0, role: "ai", text: prompt.intro }]),
        { id: nextId, role: "user", text },
        {
          id: nextId + 1,
          role: "ai",
          text: `${prompt.reply} 已收到你的要求：“${text}”。`,
        },
      ],
    }));
    setMessage("");
  };

  return (
    <footer className="h-[220px] shrink-0 border-t border-[#2F8CFF]/20 bg-[#050509] px-5 py-4">
      <div className="mx-auto flex h-full max-w-[1540px] flex-col gap-3 rounded-xl border border-[#2F8CFF]/45 bg-[linear-gradient(180deg,rgba(47,140,255,0.12),rgba(11,13,19,0.96)_34%,rgba(7,9,14,0.98))] p-4 shadow-[0_0_0_1px_rgba(56,213,255,0.08),0_0_34px_rgba(47,140,255,0.22),0_22px_64px_rgba(0,0,0,0.38)]">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col gap-2">
            {messages.map((item) => (
              <div
                key={item.id}
                className={[
                  "max-w-[72%] rounded-md px-3.5 py-2.5 text-[13px] leading-5 shadow-[0_10px_28px_rgba(0,0,0,0.18)]",
                  item.role === "user"
                    ? "ml-auto border border-[#2F8CFF]/55 bg-[#0D2B52]/90 text-white"
                    : "mr-auto border border-[#2F8CFF]/18 bg-[#111827] text-white/70",
                ].join(" ")}
              >
                <span className="mb-1 block text-[11px] font-semibold text-[#2F8CFF]">
                  {item.role === "user" ? "你" : "AI"}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#2F8CFF]/55 bg-[#2F8CFF]/18 text-[13px] font-bold text-[#38D5FF] shadow-[0_0_18px_rgba(47,140,255,0.22)]">
          AI
        </div>
        <div className="flex-1">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder={prompt.placeholder}
            className="h-11 w-full rounded-md border border-[#2F8CFF]/24 bg-[#0D111A] px-4 text-[13px] text-[#E6E1D8] outline-none transition placeholder:text-white/35 focus:border-[#2F8CFF]/65 focus:bg-[#111827] focus:shadow-[0_0_0_3px_rgba(47,140,255,0.12)]"
          />
        </div>
        <button
          type="button"
          onClick={sendMessage}
          className={[
            "h-11 w-[112px] shrink-0 rounded-md border px-4 text-[13px] font-semibold transition",
            message.trim()
              ? "border-[#2F8CFF]/65 bg-[#0D2B52] text-white shadow-[0_0_18px_rgba(47,140,255,0.28)] hover:bg-[#123967]"
              : "border-[#2F8CFF]/18 bg-[#111827] text-white/32",
          ].join(" ")}
        >
          发送
        </button>
        </div>
      </div>
    </footer>
  );
}
