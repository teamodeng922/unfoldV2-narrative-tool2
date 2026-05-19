"use client";

import { useState } from "react";
import { RegenButton } from "@/src/components/ui/regen-button";
import { femaleLines, maleLines } from "@/src/panels/plot-panel";
import type { GenderDirection } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";

type PlotLinesPreviewProps = {
  gender: GenderDirection;
};

const plotLabels = {
  opening: "相遇",
  develop: "相知",
  climax: "相爱",
  ending: "结局",
};

const plotKeys = ["opening", "develop", "climax", "ending"] as const;
type PlotKey = (typeof plotKeys)[number];
type PlotValues = Record<PlotKey, string>;

const generatedLineSets: PlotValues[] = [
  {
    opening: "一次意外让你们被迫同行，最初的试探里藏着彼此都不肯说破的戒备。",
    develop: "共同经历让关系逐渐松动，他开始把隐秘的软肋交到你手中。",
    climax: "危机逼近时，你们必须在信任与自保之间做出选择，任何迟疑都会改变结局。",
    ending: "若你们站在同一边，这条线会走向并肩；若选择错过，余下的只会成为遗憾。",
  },
  {
    opening: "你在最狼狈的时刻撞见他，也撞见了这座城最不该被看见的秘密。",
    develop: "他一边推开你，一边又在暗处替你清路，关系因此变得危险又暧昧。",
    climax: "旧案翻出真相，你们曾经依赖的理由被彻底撕开，只剩最后一次选择。",
    ending: "你可以把他拉回人间，也可以亲手结束这段互相牵制的命运。",
  },
  {
    opening: "一个看似普通的约定成为起点，你们从互相利用开始走进彼此的生活。",
    develop: "日常互动积累出细小信任，连沉默都开始有了只有你们懂的含义。",
    climax: "当外部压力集中爆发，他必须公开立场，而你也要决定是否回应这份偏爱。",
    ending: "这条线会根据你的选择收束为守护、分离，或一场迟来的坦白。",
  },
];

function generateLineValues(title: string, seed: number) {
  const base = generatedLineSets[seed % generatedLineSets.length];
  return {
    opening: `${title}：${base.opening}`,
    develop: base.develop,
    climax: base.climax,
    ending: base.ending,
  };
}

export function PlotLinesPreview({ gender }: PlotLinesPreviewProps) {
  const lines = gender === "female" ? femaleLines : maleLines;
  const [collapsedLineIds, setCollapsedLineIds] = useState<string[]>([]);
  const [lineSeeds, setLineSeeds] = useState<Record<string, number>>({});

  return (
    <div className="w-full py-4">
      <h3 className="mb-4 text-[15px] font-semibold tracking-[0.04em] text-white/64">
        角色剧情线
      </h3>
      <div className="grid gap-4">
        {lines.map((line) => {
          const opened = !collapsedLineIds.includes(line.id);
          const seed = lineSeeds[line.id] ?? 0;
          const values = seed > 0 ? generateLineValues(line.title, seed - 1) : line.values;

          return (
            <article key={line.id} className="rounded-lg border border-white/[0.10] bg-[#111217]">
              <button
                type="button"
                onClick={() =>
                  setCollapsedLineIds((current) =>
                    current.includes(line.id)
                      ? current.filter((item) => item !== line.id)
                      : [...current, line.id],
                  )
                }
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-[15px] font-semibold text-white">{line.title}</span>
                <span className="inline-flex items-center gap-1 text-[13px] text-[#38D5FF]">
                  {opened ? "收起" : "展开"}
                  <AppIcon name={opened ? "chevron-up" : "chevron-down"} size={12} />
                </span>
              </button>
              {opened ? (
                <div className="grid gap-3 border-t border-white/[0.09] p-4">
                  {plotKeys.map((key) => (
                    <div key={key} className="rounded-lg bg-[#0B0D13] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                      <p className="mb-1 text-[13px] font-semibold text-[#2F8CFF]">
                        {plotLabels[key]}
                      </p>
                      <p className="text-[13px] leading-5 text-white/64">{values[key]}</p>
                    </div>
                  ))}
                  <RegenButton
                    type="button"
                    onClick={() =>
                      setLineSeeds((current) => ({
                        ...current,
                        [line.id]: (current[line.id] ?? 0) + 1,
                      }))
                    }
                  >
                    重新生成
                  </RegenButton>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
