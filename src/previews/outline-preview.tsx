"use client";

import { useMemo, useState } from "react";
import { DEFAULT_OUTLINES, OUTLINES_MAP } from "@/src/data/outlines";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";

type OutlinePreviewProps = {
  mode: EditorMode;
};

export function OutlinePreview({ mode }: OutlinePreviewProps) {
  const worldType = useEditorStore((state) => state.worldSettings.worldType);
  const gameName = useEditorStore((state) => state.gameName);
  const worldOutlineSeed = useEditorStore((state) => state.worldOutlineSeed);
  const setGameName = useEditorStore((state) => state.setGameName);
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
  const draftDesc = draftDescByWorld[worldType]?.[selectedOutline.id] ?? selectedOutline.desc;

  return (
    <div className="w-full py-4">
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold tracking-[0.02em] text-white/55">游戏名称</h3>
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
        <h3 className="mb-3 text-[14px] font-semibold tracking-[0.02em] text-white/55">世界大纲</h3>
        <div className="grid grid-cols-3 gap-3">
          {outlines.map((outline) => {
            const active = outline.id === selectedOutline.id;

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
          <h3 className="text-[14px] font-semibold tracking-[0.02em] text-white/55">大纲详情</h3>
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
                  [selectedOutline.id]: event.target.value,
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
        <button
          type="button"
          className="rounded-md border border-white/[0.10] bg-[#111217] px-4 py-2 text-[13px] text-white/62 transition hover:bg-[#191D25] hover:text-[#2F8CFF]"
        >
          <AppIcon className="mr-1.5 inline-block align-[-2px]" name="refresh-cw" size={13} />
          重新生成
        </button>
      </div>
    </div>
  );
}
