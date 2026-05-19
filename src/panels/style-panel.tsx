"use client";

import { ART_STYLES } from "@/src/data/art-styles";
import { useEditorStore } from "@/src/stores/editor-store";
import type { ArtStyle, ProportionId } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";

const PROPORTIONS: Array<{ id: ProportionId; label: string; desc: string }> = [
  { id: "real", label: "写实比例", desc: "7-8头身" },
  { id: "slim", label: "美型修长", desc: "8-9头身" },
  { id: "chibi", label: "可爱Q版", desc: "3-4头身" },
];

function isStyleFit(style: ArtStyle, era: string) {
  return style.fit.includes("all") || style.fit.includes(era as never);
}

function Section({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="mb-6">
      <h3 className="mb-2.5 text-[14px] font-semibold tracking-[0.04em] text-white/64">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function StylePanel() {
  const era = useEditorStore((state) => state.worldSettings.era);
  const artStyle = useEditorStore((state) => state.artStyle);
  const proportion = useEditorStore((state) => state.proportion);
  const setArtStyle = useEditorStore((state) => state.setArtStyle);
  const setProportion = useEditorStore((state) => state.setProportion);

  return (
    <div className="py-4">
      <Section title="画面风格">
        <div className="grid grid-cols-2 gap-3">
          {ART_STYLES.map((style) => {
            const fit = isStyleFit(style, era);
            const active = artStyle === style.id;

            return (
              <button
                key={style.id}
                type="button"
                disabled={!fit}
                onClick={() => setArtStyle(style.id)}
                className={[
                  "relative overflow-hidden rounded-lg border text-left transition",
                  active && fit
                    ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                    : "border-white/[0.10] bg-[#111217]",
                  fit ? "hover:bg-[rgba(255,255,255,0.05)]" : "cursor-not-allowed opacity-40 grayscale",
                ].join(" ")}
              >
                <div
                  className="h-[90px] w-full"
                  style={{
                    background: `radial-gradient(circle at 25% 20%, hsla(${style.hue}, 80%, 76%, 0.85), transparent 34%), linear-gradient(135deg, hsl(${style.hue}, 50%, 28%), hsl(${(style.hue + 48) % 360}, 42%, 12%))`,
                  }}
                />
                {!fit ? (
                  <span className="absolute right-2 top-2 rounded bg-black/45 px-2 py-1 text-[10px] text-white/70">
                    不适配
                  </span>
                ) : null}
                {active && fit ? (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(47,140,255,0.22)] text-[12px] text-[#2F8CFF]">
                    ✓
                  </span>
                ) : null}
                <div className="p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-white">{style.label}</span>
                  </div>
                  <p className="text-[13px] leading-5 text-white/42">{style.ref}</p>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="人物比例">
        <div className="grid grid-cols-3 gap-3">
          {PROPORTIONS.map((item) => {
            const active = proportion === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setProportion(item.id)}
                className={[
                  "rounded-lg border p-3 text-center transition",
                  active
                    ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                    : "border-white/[0.10] bg-[#111217] hover:bg-[rgba(255,255,255,0.05)]",
                ].join(" ")}
              >
                <span className="block text-[14px] font-semibold text-white">{item.label}</span>
                <span className="mt-1 block text-[13px] text-white/42">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition hover:bg-[#123967]"
        >
          <AppIcon className="mr-1.5 inline-block align-[-2px]" name="wand" size={14} />
          生成游戏开场界面
        </button>
      </div>
    </div>
  );
}
