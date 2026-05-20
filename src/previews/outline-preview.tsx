"use client";

import { useMemo, useState } from "react";
import { DEFAULT_OUTLINES, OUTLINES_MAP } from "@/src/data/outlines";
import { RegenButton } from "@/src/components/ui/regen-button";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";
import { NumberedTitle } from "@/src/components/ui/numbered-title";

type OutlinePreviewProps = {
  mode: EditorMode;
};

export function OutlinePreview({ mode }: OutlinePreviewProps) {
  const worldType = useEditorStore((state) => state.worldSettings.worldType);
  const gameName = useEditorStore((state) => state.gameName);
  const worldOutlineSeed = useEditorStore((state) => state.worldOutlineSeed);
  const mainPlot = useEditorStore((state) => state.mainPlot);
  const setGameName = useEditorStore((state) => state.setGameName);
  const generateWorldOutline = useEditorStore((state) => state.generateWorldOutline);
  const [selectedIdByWorld, setSelectedIdByWorld] = useState<Record<string, number>>({});
  const [expandedByWorld, setExpandedByWorld] = useState<Record<string, boolean>>({});
  const [draftDescByWorld, setDraftDescByWorld] = useState<Record<string, Record<number, string>>>(
    {},
  );

  const outlines = useMemo(() => OUTLINES_MAP[worldType] ?? DEFAULT_OUTLINES, [worldType]);
  const selectionKey = `${worldType}:${worldOutlineSeed}`;
  const generatedOutline = outlines[worldOutlineSeed % outlines.length] ?? outlines[0];
  const selectedId = selectedIdByWorld[selectionKey] ?? generatedOutline?.id ?? 1;
  const expanded = expandedByWorld[worldType] ?? false;
  const selectedOutline = outlines.find((outline) => outline.id === selectedId) ?? outlines[0];
  const generatedCards = [
    { id: 1, title: selectedOutline.title, desc: mainPlot.opening },
    { id: 2, title: outlines[1]?.title ?? "中段推进", desc: mainPlot.develop },
    { id: 3, title: outlines[2]?.title ?? "终局爆发", desc: mainPlot.climax },
  ];
  const selectedCard = generatedCards.find((outline) => outline.id === selectedId) ?? generatedCards[0];
  const draftDesc = draftDescByWorld[worldType]?.[selectedCard.id] ?? selectedCard.desc;

  return (
    <div className="w-full py-4">
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <NumberedTitle className="mb-0 text-white/55" num="01">游戏名称</NumberedTitle>
        </div>

        {mode === "pro" ? (
          <input
            value={gameName}
            onChange={(event) => setGameName(event.target.value)}
            className="h-10 w-[240px] rounded-lg border border-white/[0.10] bg-[#111217] px-3 font-serif text-[14px] font-bold text-white outline-none transition focus:border-[#2F8CFF]/45"
          />
        ) : (
          <div className="w-[240px] rounded-lg border border-white/[0.10] bg-[#111217] px-3 py-2.5 font-serif text-[14px] font-bold text-white">
            {gameName}
          </div>
        )}
      </section>

      <section className="mb-6">
        <NumberedTitle className="text-white/55" num="02">世界大纲</NumberedTitle>
        <div className="grid grid-cols-3 gap-3">
          {generatedCards.map((outline) => {
            const active = outline.id === selectedCard.id;

            return (
              <button
                key={outline.id}
                type="button"
                onClick={() =>
                  setSelectedIdByWorld((current) => ({ ...current, [selectionKey]: outline.id }))
                }
                className={[
                  "min-h-[96px] rounded-lg border p-3 text-left transition",
                  active
                    ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                    : "border-white/[0.10] bg-[#111217] hover:bg-[rgba(255,255,255,0.05)]",
                ].join(" ")}
              >
                <span className="mb-2 block text-[11px] font-semibold text-[#2F8CFF]">
                  方向 {outline.id}
                </span>
                <span className="block text-[14px] font-semibold text-white">{outline.title}</span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-5 text-white/42">
                  {outline.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <NumberedTitle className="mb-0 text-white/55" num="03">大纲详情</NumberedTitle>
          {mode === "pro" ? (
            <button
              type="button"
              onClick={() =>
                setExpandedByWorld((current) => ({ ...current, [worldType]: !expanded }))
              }
              className="text-[13px] text-[#38D5FF] transition hover:text-[#2F8CFF]"
            >
              {expanded ? "更多信息" : "更多信息"}
              <AppIcon className="ml-1 inline-block align-[-2px]" name={expanded ? "chevron-up" : "chevron-down"} size={12} />
            </button>
          ) : null}
        </div>

        {mode === "pro" ? (
          <input
            value={draftDesc}
            onChange={(event) =>
              setDraftDescByWorld((current) => ({
                ...current,
                [worldType]: {
                  ...current[worldType],
                  [selectedCard.id]: event.target.value,
                },
              }))
            }
            className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[13px] text-[#E6E1D8] outline-none transition focus:border-[#2F8CFF]/45"
          />
        ) : (
          <div className="rounded-lg bg-[#111217] p-3 text-[13px] leading-6 text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            {draftDesc}
          </div>
        )}

        {mode === "pro" && expanded ? (
          <div className="mt-3 grid gap-3">
            {[
              ["世界危机", selectedOutline.crisis],
              ["阵营格局", selectedOutline.factions],
              ["核心悬念", selectedOutline.mystery],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg bg-[#111217] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] text-white/42">{label}</span>
                  <AppIcon className="text-white/42" name="pencil-line" size={12} />
                </div>
                <p className="text-[14px] leading-6 text-white/64">{value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <div className="flex justify-center">
        <RegenButton onClick={generateWorldOutline}>重新生成</RegenButton>
      </div>
    </div>
  );
}
