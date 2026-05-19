"use client";

import { useState } from "react";
import { AppIcon } from "@/src/components/ui/app-icon";

const scenes = [
  {
    type: "narration",
    text: "长夜将尽，宫墙深处的钟声迟迟未响。你知道，今夜之后，一切都会改变。",
  },
  {
    type: "dialog",
    speaker: "萧夜寒",
    text: "别回头。若有人问起，你从未来过这里。",
  },
  {
    type: "narration",
    text: "风雪从破窗灌入，他掌心的血却比烛火更热。你第一次意识到，这座宫城里没有无辜的相遇。",
  },
  {
    type: "dialog",
    speaker: "你",
    text: "如果我偏要知道真相呢？",
  },
  {
    type: "narration",
    text: "他沉默许久，终于把那枚刻着旧年号的玉佩放进你手心。",
  },
  {
    type: "options",
    options: [
      { label: "追问玉佩来历", hint: "需要才智≥20，可能提前揭开皇室旧案" },
      { label: "先替他包扎伤口", hint: "提升好感，进入萧夜寒情感线" },
      { label: "藏起玉佩离开", hint: "保持中立，主线进入观望分支" },
    ],
  },
] as const;

export function GamePreview() {
  const [index, setIndex] = useState(0);
  const scene = scenes[index];

  const next = () => setIndex((current) => Math.min(current + 1, scenes.length - 1));

  return (
    <div className="flex h-full min-h-[520px] w-full items-start justify-center py-4">
      <div className="w-full max-w-[760px]">
        <button
          type="button"
          onClick={next}
          className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#141019,#050509_55%,#161a24)] text-left shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(47,140,255,0.18),transparent_28%),radial-gradient(circle_at_74%_74%,rgba(56,213,255,0.14),transparent_30%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.72)_100%)]" />

          {scene.type === "narration" ? (
            <div className="relative flex h-full items-center justify-center px-16 text-center">
              <p className="max-w-[520px] text-[14px] italic leading-9 text-white/78">{scene.text}</p>
            </div>
          ) : null}

          {scene.type === "dialog" ? (
            <div className="absolute inset-x-8 bottom-8 rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur">
              <p className="mb-2 font-serif text-[14px] font-bold text-[#2F8CFF]">{scene.speaker}</p>
              <p className="text-[14px] leading-7 text-white/78">{scene.text}</p>
            </div>
          ) : null}

          {scene.type === "options" ? (
            <div className="absolute inset-y-0 right-0 flex w-[46%] flex-col justify-center gap-3 bg-black/20 p-5">
              {scene.options.map((option, optionIndex) => (
                <div
                  key={option.label}
                  className="rounded-lg border border-white/10 bg-[#191D25] p-3 transition hover:border-[rgba(47,140,255,0.35)]"
                >
                  <p className="mb-1 text-[14px] font-semibold text-white">
                    {optionIndex + 1}. {option.label}
                  </p>
                  <p className="text-[13px] leading-5 text-white/42">{option.hint}</p>
                </div>
              ))}
            </div>
          ) : null}
        </button>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {scenes.map((item, itemIndex) => (
              <span
                key={`${item.type}-${itemIndex}`}
                className={[
                  "h-2 w-2 rounded-full transition",
                  itemIndex === index ? "bg-[#2F8CFF]" : "bg-white/18",
                ].join(" ")}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="rounded-lg border border-white/10 bg-[#111217] px-3 py-1.5 text-[14px] text-white/55 transition hover:text-[#2F8CFF]"
          >
            <AppIcon className="mr-1.5 inline-block align-[-2px]" name="refresh-cw" size={14} />
            从头播放
          </button>
        </div>
      </div>
    </div>
  );
}
