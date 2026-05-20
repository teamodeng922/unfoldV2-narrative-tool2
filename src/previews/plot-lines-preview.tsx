"use client";

import { useState } from "react";
import { RegenButton } from "@/src/components/ui/regen-button";
import { NumberedTitle } from "@/src/components/ui/numbered-title";
import { useEditorStore } from "@/src/stores/editor-store";
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
  void gender;
  const lines = useEditorStore((state) => state.characterLines);
  const generateCharacterLine = useEditorStore((state) => state.generateCharacterLine);
  const [collapsedLineIds, setCollapsedLineIds] = useState<string[]>([]);

  return (
    <div className="w-full py-4">
      <NumberedTitle className="mb-4" num="02">角色剧情线</NumberedTitle>
      <div className="grid gap-4">
        {lines.map((line) => {
          const opened = !collapsedLineIds.includes(line.id);

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
                      <p className="text-[13px] leading-5 text-white/64">{line.values[key]}</p>
                    </div>
                  ))}
                  <RegenButton
                    className="justify-self-start"
                    type="button"
                    onClick={() => generateCharacterLine(line.id)}
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
