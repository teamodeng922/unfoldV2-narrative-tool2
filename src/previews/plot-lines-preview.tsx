"use client";

import { useState } from "react";
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

export function PlotLinesPreview({ gender }: PlotLinesPreviewProps) {
  const lines = gender === "female" ? femaleLines : maleLines;
  const [openLineIds, setOpenLineIds] = useState<string[]>([lines[0].id]);

  return (
    <div className="w-full py-4">
      <h3 className="mb-4 text-[15px] font-semibold tracking-[0.04em] text-white/60">
        角色剧情线
      </h3>
      <div className="grid gap-4">
        {lines.map((line) => {
          const opened = openLineIds.includes(line.id);

          return (
            <article key={line.id} className="rounded-lg border border-white/10 bg-[#111217]">
              <button
                type="button"
                onClick={() =>
                  setOpenLineIds((current) =>
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
                <div className="grid gap-3 border-t border-white/[0.06] p-4">
                  {plotKeys.map((key) => (
                    <div key={key} className="rounded-lg border border-white/10 bg-[#0B0D13] p-3">
                      <p className="mb-1 text-[13px] font-semibold text-[#2F8CFF]">
                        {plotLabels[key]}
                      </p>
                      <p className="text-[13px] leading-6 text-white/60">{line.values[key]}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
