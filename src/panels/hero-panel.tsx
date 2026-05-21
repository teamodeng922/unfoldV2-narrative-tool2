"use client";

import { useMemo, useState } from "react";
import { RegenButton } from "@/src/components/ui/regen-button";
import { HERO_INNER_TAGS, HERO_OUTER_TAGS, MALE_HERO_TYPES } from "@/src/data/hero-types";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode, GenderDirection, HeroCharacter } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";

type HeroPanelProps = {
  mode: EditorMode;
  gender: GenderDirection;
};

const nameBatches = [
  ["萧夜寒", "沈墨尘", "顾渊"],
  ["裴行舟", "谢临渊", "陆沉舟"],
  ["容珩", "周砚", "裴照"],
];

const lineMap: Record<string, string> = {
  "高冷+深情": "他对全世界都冷若冰霜，却在无人时默默为你挡下所有风雨",
  "高冷+腹黑": "表面清冷自持的他，每一步棋都在将你推向他的棋盘中央",
  "高冷+孤独": "他站在所有人触不到的高处，只有你看见了他眼底的荒芜",
  "温润+深情": "他对谁都温柔，但只有看你的时候，眼里会多出一点光",
  "温润+腹黑": "笑容如沐春风的他，心里藏着整盘棋局，而你是唯一的变数",
};

function heroLine(hero: HeroCharacter) {
  if (hero.intro) return hero.intro;
  const outer = hero.outerTags[0] ?? "高冷";
  const inner = hero.innerTags[0] ?? "深情";
  return lineMap[`${outer}+${inner}`] ?? `他看似${outer}，内心却${inner}，与你的相遇注定改变一切`;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-[14px] font-semibold text-white/55">{children}</div>;
}

function TagPicker({
  title,
  tags,
  selected,
  onChange,
}: {
  title: string;
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const shownTags = expanded ? tags : selected;

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((item) => item !== tag));
      return;
    }
    if (selected.length < 2) {
      onChange([...selected, tag]);
    }
  };

  return (
    <section className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <FieldLabel>{title}</FieldLabel>
        <div className="flex items-center gap-2">
          <RegenButton iconOnly aria-label="重新生成" />
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="text-[13px] text-[#38D5FF] hover:text-[#2F8CFF]"
          >
            {expanded ? "收起" : "更多"}
            <AppIcon className="ml-1 inline-block align-[-2px]" name={expanded ? "chevron-up" : "chevron-down"} size={12} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {shownTags.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={[
                "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none transition",
                active
                  ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                  : "border-white/[0.10] bg-[#141720] text-white/62",
              ].join(" ")}
            >
              {tag}
            </button>
          );
        })}
        <input
          placeholder="自由输入"
          className="h-8 w-24 rounded-full border border-white/[0.10] bg-[#111217] px-3 text-[14px] leading-none text-white/70 outline-none placeholder:text-white/42 focus:border-[#2F8CFF]/45"
        />
      </div>
    </section>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <FieldLabel>{label}</FieldLabel>
        <RegenButton iconOnly aria-label="重新生成" />
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-[#E6E1D8] outline-none focus:border-[#2F8CFF]/45"
      />
    </div>
  );
}

function FemaleHeroPanel({ mode }: { mode: EditorMode }) {
  const heroes = useEditorStore((state) => state.heroes);
  const activeHeroId = useEditorStore((state) => state.activeHeroId);
  const setActiveHeroId = useEditorStore((state) => state.setActiveHeroId);
  const updateHero = useEditorStore((state) => state.updateHero);
  const addHero = useEditorStore((state) => state.addHero);
  const generateActiveHero = useEditorStore((state) => state.generateActiveHero);
  const [batchIndex, setBatchIndex] = useState(0);
  const activeHero = heroes.find((hero) => hero.id === activeHeroId) ?? heroes[0];
  const names = nameBatches[batchIndex % nameBatches.length];

  if (mode === "beginner") {
    return (
      <div className="py-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {heroes.map((hero, index) => (
            <button
              key={hero.id}
              type="button"
              onClick={() => setActiveHeroId(hero.id)}
              className={[
                "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none",
                hero.id === activeHero.id
                  ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                  : "border-white/[0.10] bg-[#141720] text-white/62",
              ].join(" ")}
            >
              男主{index + 1}
            </button>
          ))}
          {heroes.length < 5 ? (
            <button type="button" onClick={addHero} className="rounded-full border border-white/[0.10] px-3 py-1.5 text-white/55">
              <AppIcon name="plus" size={14} />
            </button>
          ) : null}
        </div>
        <article className="rounded-lg border border-[rgba(47,140,255,0.22)] bg-[rgba(47,140,255,0.06)] p-4">
          <p className="mb-3 text-[14px] leading-6 text-[#2F8CFF]">{heroLine(activeHero)}</p>
          {[
            ["姓名", activeHero.name],
            ["性格", `${activeHero.outerTags.join("、")} · ${activeHero.innerTags.join("、")}`],
            ["身份", activeHero.identity],
            ["外貌", activeHero.appearance],
          ].map(([label, value]) => (
            <div key={label} className="mb-3">
              <FieldLabel>{label}</FieldLabel>
              <p className="text-[14px] leading-6 text-white/64">{value}</p>
            </div>
          ))}
          <RegenButton
            type="button"
            onClick={generateActiveHero}
            className="mt-1"
          >
            重新生成
          </RegenButton>
        </article>
        <div className="mt-6 flex justify-center">
          <button className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]" type="button">
            生成立绘
            <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {heroes.map((hero, index) => (
          <button
            key={hero.id}
            type="button"
            onClick={() => setActiveHeroId(hero.id)}
            className={[
              "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none",
              hero.id === activeHero.id
                ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                : "border-white/[0.10] bg-[#141720] text-white/62",
            ].join(" ")}
          >
            男主{index + 1}
          </button>
        ))}
        {heroes.length < 5 ? (
          <button type="button" onClick={addHero} className="rounded-full border border-white/[0.10] px-3 py-1.5 text-white/55">
            <AppIcon name="plus" size={14} />
          </button>
        ) : null}
      </div>

      <p className="mb-4 text-[14px] leading-6 text-[#2F8CFF]">{heroLine(activeHero)}</p>

      <div className="mb-4">
        <FieldLabel>姓名</FieldLabel>
        <div className="flex flex-wrap items-center gap-2">
          {names.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => updateHero(activeHero.id, { name })}
              className={[
                "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none",
                activeHero.name === name
                  ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                  : "border-white/[0.10] bg-[#141720] text-white/62",
              ].join(" ")}
            >
              {name}
            </button>
          ))}
          <button type="button" onClick={() => setBatchIndex((value) => value + 1)} className="text-[13px] text-white/42 hover:text-[#2F8CFF]">
            <AppIcon className="mr-1 inline-block align-[-2px]" name="refresh-cw" size={13} />
            换一批
          </button>
          <input
            value={activeHero.name}
            onChange={(event) => updateHero(activeHero.id, { name: event.target.value })}
            className="h-8 w-28 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[13px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
          />
        </div>
      </div>

      <div className="mb-4">
        <FieldLabel>年龄</FieldLabel>
        <input
          value={activeHero.age}
          onChange={(event) => updateHero(activeHero.id, { age: event.target.value })}
          className="h-9 w-24 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
        />
      </div>

      <TagPicker title="外在人格" tags={HERO_OUTER_TAGS} selected={activeHero.outerTags} onChange={(outerTags) => updateHero(activeHero.id, { outerTags })} />
      <TagPicker title="内在本质" tags={HERO_INNER_TAGS} selected={activeHero.innerTags} onChange={(innerTags) => updateHero(activeHero.id, { innerTags })} />
      <TextAreaField label="身份/职业" value={activeHero.identity} onChange={(identity) => updateHero(activeHero.id, { identity })} />
      <TextAreaField label="外貌特征" value={activeHero.appearance} onChange={(appearance) => updateHero(activeHero.id, { appearance })} />

      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-24 w-16 items-center justify-center rounded-lg border border-dashed border-white/[0.14] bg-[#111217] text-[13px] text-white/40">
          上传
        </div>
        <p className="text-[13px] leading-5 text-white/42">64×96 角色立绘上传区</p>
      </div>

      <div className="flex justify-center">
        <RegenButton className="mr-3" onClick={generateActiveHero}>重新生成</RegenButton>
        <button className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]" type="button">
          生成立绘
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}

function MaleHeroPanel({ mode }: { mode: EditorMode }) {
  const maleHeroType = useEditorStore((state) => state.maleHeroType);
  const maleHeroAge = useEditorStore((state) => state.maleHeroAge);
  const maleHeroIdentity = useEditorStore((state) => state.maleHeroIdentity);
  const maleHeroAppearance = useEditorStore((state) => state.maleHeroAppearance);
  const setMaleHeroType = useEditorStore((state) => state.setMaleHeroType);
  const setMaleHeroField = useEditorStore((state) => state.setMaleHeroField);
  const generateMaleHeroSetting = useEditorStore((state) => state.generateMaleHeroSetting);
  const selectedType = useMemo(
    () => MALE_HERO_TYPES.find((item) => item.id === maleHeroType) ?? MALE_HERO_TYPES[0],
    [maleHeroType],
  );

  return (
    <div className="py-4">
      <p className="mb-4 text-[14px] leading-6 text-[#2F8CFF]">{selectedType.desc}</p>
      {mode === "pro" ? (
        <div className="mb-4">
          <FieldLabel>年龄</FieldLabel>
          <input value={maleHeroAge} onChange={(event) => setMaleHeroField("maleHeroAge", event.target.value)} className="h-9 w-24 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45" />
        </div>
      ) : null}

      <section className="mb-5">
        <FieldLabel>男主类型</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          {MALE_HERO_TYPES.map((item) => (
            <button key={item.id} type="button" onClick={() => setMaleHeroType(item.id)} className={[
              "rounded-lg border p-3 text-left transition",
              item.id === maleHeroType
                ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                : "border-white/[0.10] bg-[#111217] hover:bg-[#111217]",
            ].join(" ")}>
              <span className="block text-[14px] font-semibold text-white">{item.label}</span>
              <span className="mt-1 block text-[13px] leading-5 text-white/40">{item.desc}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-white/40">决定对话和行事风格</p>
      </section>

      {mode === "pro" ? (
        <>
          <TextAreaField label="身份/职业" value={maleHeroIdentity} onChange={(value) => setMaleHeroField("maleHeroIdentity", value)} />
          <TextAreaField label="外貌特征" value={maleHeroAppearance} onChange={(value) => setMaleHeroField("maleHeroAppearance", value)} />
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-24 w-16 items-center justify-center rounded-lg border border-dashed border-white/[0.14] bg-[#111217] text-[13px] text-white/40">上传</div>
            <p className="text-[13px] leading-5 text-white/42">64×96 角色立绘上传区</p>
          </div>
        </>
      ) : null}

      <div className="flex justify-center">
        <RegenButton className="mr-3" onClick={generateMaleHeroSetting}>重新生成</RegenButton>
        <button className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]" type="button">
          生成立绘
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}

export function HeroPanel({ mode, gender }: HeroPanelProps) {
  return gender === "female" ? <FemaleHeroPanel mode={mode} /> : <MaleHeroPanel mode={mode} />;
}
