"use client";

import { WORLDS } from "@/src/data/worlds";
import { useEditorStore } from "@/src/stores/editor-store";
import type { ReactNode } from "react";
import type { EditorMode, Era } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";

type WorldPanelProps = {
  mode: EditorMode;
};

const eraOptions: Array<{ id: Era; label: string }> = [
  { id: "ancient", label: "古代" },
  { id: "modern", label: "现代" },
  { id: "future", label: "未来" },
];

function Section({
  title,
  children,
}: Readonly<{
  title: string;
  children: ReactNode;
}>) {
  return (
    <section className="mb-6">
      <h3 className="mb-2.5 text-[14px] font-semibold tracking-[0.02em] text-white/60">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function WorldPanel({ mode }: WorldPanelProps) {
  const worldSettings = useEditorStore((state) => state.worldSettings);
  const selectEra = useEditorStore((state) => state.selectEra);
  const selectWorldType = useEditorStore((state) => state.selectWorldType);
  const generateWorldOutline = useEditorStore((state) => state.generateWorldOutline);

  const availableWorlds = WORLDS[worldSettings.gender][worldSettings.era];

  return (
    <div className="py-4">
      <Section title="时代">
        <div className="grid grid-cols-3 gap-3">
          {eraOptions.map((option) => {
            const active = worldSettings.era === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectEra(option.id)}
                className={[
                  "flex h-[48px] items-center justify-center rounded-lg border transition",
                  active
                    ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                    : "border-white/10 bg-[#111217] hover:bg-[rgba(255,255,255,0.05)]",
                ].join(" ")}
              >
                <span className="text-[14px] font-semibold text-white">{option.label}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="世界类型">
        <div className="flex flex-wrap gap-2">
          {availableWorlds.map((worldType, index) => {
            const active = worldSettings.worldType === worldType;

            return (
              <button
                key={worldType}
                type="button"
                onClick={() => selectWorldType(worldType)}
                className={[
                  "inline-flex min-h-8 items-center gap-1 rounded-full border px-3.5 py-1.5 text-[14px] transition",
                  active
                    ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                    : "border-white/10 bg-[#141720] text-[#E6E1D8] hover:bg-[#191D25]",
                ].join(" ")}
              >
                {worldType}
                {index === 0 ? (
                  <span className="rounded bg-[rgba(47,140,255,0.2)] px-1.5 py-0.5 text-[10px] text-[#2F8CFF]">
                    热
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </Section>

      {mode === "pro" ? (
        <section className="mb-6">
          <div className="mb-3 flex items-center gap-3 text-[12px] text-white/25">
            <span className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
            或
            <span className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
          </div>
          <h3 className="mb-2.5 text-[14px] font-semibold tracking-[0.02em] text-white/60">
            自由输入
          </h3>
          <input
            placeholder="自由输入你想要的世界背景描述..."
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111217] px-3 text-[13px] text-[#E6E1D8] outline-none transition placeholder:text-white/25 focus:border-[#2F8CFF]/45"
          />
        </section>
      ) : null}

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={generateWorldOutline}
          className="rounded-md border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition hover:bg-[#123967]"
        >
          生成世界大纲
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}
