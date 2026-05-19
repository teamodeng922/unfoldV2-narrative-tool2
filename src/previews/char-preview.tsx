"use client";

import { MALE_HERO_TYPES } from "@/src/data/hero-types";
import { FEMALE_HEROINE_TYPES } from "@/src/data/heroine-types";
import { useEditorStore } from "@/src/stores/editor-store";
import type { GenderDirection, HeroCharacter } from "@/src/types";

type CharPreviewProps = {
  gender: GenderDirection;
  type: "hero" | "heroine";
};

function Portrait({ hero, index }: { hero: HeroCharacter; index: number }) {
  return (
    <article className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/10 bg-[#111217]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 24%, rgba(22,119,255,.26), transparent 24%), linear-gradient(150deg, hsl(${28 + index * 42}, 35%, 18%), hsl(${220 + index * 25}, 28%, 8%))`,
        }}
      />
      <div className="absolute left-1/2 top-[16%] h-[42%] w-[46%] -translate-x-1/2 rounded-full bg-white/14 blur-sm" />
      <div className="absolute bottom-0 left-1/2 h-[62%] w-[58%] -translate-x-1/2 rounded-t-full bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
        <h3 className="font-serif text-[14px] font-bold text-white">{hero.name}</h3>
        <p className="mt-1 text-[12px] text-[#2F8CFF]">
          {hero.outerTags.join("、")} · {hero.innerTags.join("、")}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/55">{hero.identity}</p>
      </div>
    </article>
  );
}

export function CharPreview({ gender, type }: CharPreviewProps) {
  const heroes = useEditorStore((state) => state.heroes);
  const heroines = useEditorStore((state) => state.heroines);
  const maleHeroType = useEditorStore((state) => state.maleHeroType);
  const maleHeroIdentity = useEditorStore((state) => state.maleHeroIdentity);
  const maleHeroAppearance = useEditorStore((state) => state.maleHeroAppearance);
  const femaleHeroineType = useEditorStore((state) => state.femaleHeroineType);
  const femaleHeroineIdentity = useEditorStore((state) => state.femaleHeroineIdentity);
  const femaleHeroineAppearance = useEditorStore((state) => state.femaleHeroineAppearance);

  if (type === "hero" && gender === "male") {
    const selectedType = MALE_HERO_TYPES.find((item) => item.id === maleHeroType) ?? MALE_HERO_TYPES[0];
    const hero: HeroCharacter = {
      id: selectedType.id,
      name: "你的角色",
      age: "",
      outerTags: [selectedType.label],
      innerTags: ["主角"],
      identity: maleHeroIdentity,
      appearance: maleHeroAppearance,
    };

    return (
      <div className="flex w-full justify-center py-4">
        <div className="w-[65%] min-w-[260px] max-w-[420px]">
          <Portrait hero={hero} index={1} />
          <p className="mt-4 text-center text-[14px] leading-6 text-white/45">{selectedType.desc}</p>
        </div>
      </div>
    );
  }

  if (type === "heroine" && gender === "female") {
    const selectedType =
      FEMALE_HEROINE_TYPES.find((item) => item.id === femaleHeroineType) ?? FEMALE_HEROINE_TYPES[0];
    const heroine: HeroCharacter = {
      id: selectedType.id,
      name: "你的女主",
      age: "",
      outerTags: [selectedType.label],
      innerTags: ["主角"],
      identity: femaleHeroineIdentity,
      appearance: femaleHeroineAppearance,
    };

    return (
      <div className="flex w-full justify-center py-4">
        <div className="w-[65%] min-w-[260px] max-w-[420px]">
          <Portrait hero={heroine} index={2} />
          <p className="mt-4 text-center text-[14px] leading-6 text-white/45">{selectedType.desc}</p>
        </div>
      </div>
    );
  }

  const characters = type === "hero" ? heroes : heroines;

  return (
    <div className="grid w-full grid-cols-2 gap-4 py-4">
      {characters.map((character, index) => (
        <Portrait key={character.id} hero={character} index={index} />
      ))}
    </div>
  );
}
