"use client";

import { ART_STYLES } from "@/src/data/art-styles";
import { useEditorStore } from "@/src/stores/editor-store";

export function OpeningPreview() {
  const gameName = useEditorStore((state) => state.gameName);
  const artStyleId = useEditorStore((state) => state.artStyle);
  const style = ART_STYLES.find((item) => item.id === artStyleId) ?? ART_STYLES[0];
  const hue = style.hue;

  return (
    <div className="flex h-full min-h-[520px] w-full items-start justify-center py-4">
      <div
        className="relative aspect-video w-full max-w-[720px] overflow-hidden rounded-lg border border-white/[0.10] shadow-2xl"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 46%, 18%), hsl(${(hue + 34) % 360}, 54%, 8%) 62%, hsl(${(hue + 78) % 360}, 40%, 13%))`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 28% 24%, hsla(${hue}, 82%, 72%, 0.32), transparent 26%), radial-gradient(circle at 76% 68%, hsla(${(hue + 46) % 360}, 76%, 62%, 0.22), transparent 28%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.68)_100%)]" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <h3
            className="font-serif text-[22px] font-bold text-white"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.78), 0 0 24px rgba(47,140,255,0.18)" }}
          >
            {gameName}
          </h3>
          <p className="mt-5 text-[12px] tracking-[0.08em] text-white/55">— 点击开始 —</p>
        </div>
      </div>
    </div>
  );
}
