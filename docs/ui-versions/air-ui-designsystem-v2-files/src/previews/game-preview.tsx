"use client";

import { useState } from "react";

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
          className="relative aspect-video w-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,#141019,#0a0a0f_55%,#161a24)] text-left shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,184,134,0.18),transparent_28%),radial-gradient(circle_at_74%_74%,rgba(164,184,214,0.14),transparent_30%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.72)_100%)]" />

          {scene.type === "narration" ? (
            <div className="relative flex h-full items-center justify-center px-16 text-center">
              <p className="max-w-[520px] text-[17px] italic leading-9 text-white/78">{scene.text}</p>
            </div>
          ) : null}

          {scene.type === "dialog" ? (
            <div className="absolute bottom-16 left-[5%] max-w-[42%]">
              <p className="air-text-shadow mb-2 font-serif text-[28px] font-bold tracking-[0.08em] text-white">
                {scene.speaker}
              </p>
              <p className="air-text-shadow text-[21px] leading-[1.8] text-white/90">{scene.text}</p>
            </div>
          ) : null}

          {scene.type === "options" ? (
            <div className="absolute inset-y-0 right-[5%] flex w-[36%] flex-col justify-center gap-4">
              {scene.options.map((option, optionIndex) => (
                <div
                  key={option.label}
                  className="group relative border-b border-white/15 pb-3 pl-5 text-left transition"
                >
                  <span className="absolute left-0 top-0 h-full w-px bg-transparent transition group-hover:bg-[#D4B886]/80" />
                  <span className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-[#D4B886]/0 blur-md transition group-hover:bg-[#D4B886]/15" />
                  <p className="relative mb-1 flex items-baseline gap-3">
                    <span className="font-serif text-[25px] font-bold text-white/50 group-hover:text-[#D4B886]/80">
                      {String.fromCharCode(65 + optionIndex)}.
                    </span>
                    <span className="text-[21px] text-white/80 group-hover:text-white">{option.label}</span>
                  </p>
                  <p className="relative pl-10 text-[13px] leading-5 text-white/30">{option.hint}</p>
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
                  itemIndex === index ? "bg-[#D4B886]" : "bg-white/18",
                ].join(" ")}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="px-3 py-1.5 text-xs font-light text-white/55 transition hover:text-[#D4B886]"
          >
            ↺ 从头播放
          </button>
        </div>
      </div>
    </div>
  );
}
