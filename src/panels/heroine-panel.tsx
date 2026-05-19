"use client";

import { useMemo, useState } from "react";
import {
  FEMALE_HEROINE_TYPES,
  HEROINE_INNER_TAGS,
  HEROINE_OUTER_TAGS,
} from "@/src/data/heroine-types";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode, GenderDirection, HeroCharacter } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";

type HeroinePanelProps = {
  mode: EditorMode;
  gender: GenderDirection;
};

const nameBatches = [
  ["苏挽月", "柳如烟", "姜宁"],
  ["叶清澜", "唐雪", "沈知微"],
  ["林昭", "许南枝", "白鹿"],
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-[14px] font-semibold text-white/55">{children}</div>;
}

function heroineLine(heroine: HeroCharacter) {
  const outer = heroine.outerTags[0] ?? "温柔";
  const inner = heroine.innerTags[0] ?? "坚韧";
  return `她看似${outer}，内心却${inner}，在关键时刻总能做出自己的选择`;
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
    if (selected.length < 2) onChange([...selected, tag]);
  };

  return (
    <section className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <FieldLabel>{title}</FieldLabel>
        <div className="flex items-center gap-2">
          <button type="button" className="text-[13px] text-white/42 hover:text-[#2F8CFF]">
            <AppIcon name="refresh-cw" size={13} />
          </button>
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
        <button type="button" className="text-[13px] text-white/42 hover:text-[#2F8CFF]">
          <AppIcon name="refresh-cw" size={13} />
        </button>
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-[#E6E1D8] outline-none focus:border-[#2F8CFF]/45"
      />
    </div>
  );
}

function FemaleDirectionHeroinePanel({ mode }: { mode: EditorMode }) {
  const femaleHeroineType = useEditorStore((state) => state.femaleHeroineType);
  const femaleHeroineAge = useEditorStore((state) => state.femaleHeroineAge);
  const femaleHeroineIdentity = useEditorStore((state) => state.femaleHeroineIdentity);
  const femaleHeroineAppearance = useEditorStore((state) => state.femaleHeroineAppearance);
  const setFemaleHeroineType = useEditorStore((state) => state.setFemaleHeroineType);
  const setFemaleHeroineField = useEditorStore((state) => state.setFemaleHeroineField);
  const selectedType = useMemo(
    () => FEMALE_HEROINE_TYPES.find((item) => item.id === femaleHeroineType) ?? FEMALE_HEROINE_TYPES[0],
    [femaleHeroineType],
  );

  return (
    <div className="py-4">
      <p className="mb-4 text-[14px] leading-6 text-[#2F8CFF]">{selectedType.desc}</p>
      {mode === "pro" ? (
        <div className="mb-4">
          <FieldLabel>年龄</FieldLabel>
          <input
            value={femaleHeroineAge}
            onChange={(event) => setFemaleHeroineField("femaleHeroineAge", event.target.value)}
            className="h-9 w-24 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
          />
        </div>
      ) : null}
      <section className="mb-5">
        <FieldLabel>女主类型</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          {FEMALE_HEROINE_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFemaleHeroineType(item.id)}
              className={[
                "rounded-lg border p-3 text-left transition",
                item.id === femaleHeroineType
                  ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                  : "border-white/[0.10] bg-[#111217] hover:bg-[#111217]",
              ].join(" ")}
            >
              <span className="block text-[14px] font-semibold text-white">{item.label}</span>
              <span className="mt-1 block text-[13px] leading-5 text-white/40">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>
      {mode === "pro" ? (
        <>
          <TextAreaField
            label="身份/职业"
            value={femaleHeroineIdentity}
            onChange={(value) => setFemaleHeroineField("femaleHeroineIdentity", value)}
          />
          <TextAreaField
            label="外貌特征"
            value={femaleHeroineAppearance}
            onChange={(value) => setFemaleHeroineField("femaleHeroineAppearance", value)}
          />
        </>
      ) : null}
      <div className="flex justify-center">
        <button
          className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
          type="button"
        >
          生成立绘
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}

function MaleDirectionHeroinePanel({ mode }: { mode: EditorMode }) {
  const heroines = useEditorStore((state) => state.heroines);
  const activeHeroineId = useEditorStore((state) => state.activeHeroineId);
  const setActiveHeroineId = useEditorStore((state) => state.setActiveHeroineId);
  const updateHeroine = useEditorStore((state) => state.updateHeroine);
  const addHeroine = useEditorStore((state) => state.addHeroine);
  const [batchIndex, setBatchIndex] = useState(0);
  const activeHeroine = heroines.find((heroine) => heroine.id === activeHeroineId) ?? heroines[0];
  const names = nameBatches[batchIndex % nameBatches.length];

  if (mode === "beginner") {
    return (
      <div className="py-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {heroines.map((heroine, index) => (
            <button
              key={heroine.id}
              type="button"
              onClick={() => setActiveHeroineId(heroine.id)}
              className={[
                "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none",
                heroine.id === activeHeroine.id
                  ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                  : "border-white/[0.10] bg-[#141720] text-white/62",
              ].join(" ")}
            >
              女主{index + 1}
            </button>
          ))}
          {heroines.length < 5 ? (
            <button type="button" onClick={addHeroine} className="rounded-full border border-white/[0.10] px-3 py-1.5 text-white/55">
              <AppIcon name="plus" size={14} />
            </button>
          ) : null}
        </div>
        <article className="rounded-lg border border-[rgba(47,140,255,0.22)] bg-[rgba(47,140,255,0.06)] p-4">
          <p className="mb-3 text-[14px] leading-6 text-[#2F8CFF]">{heroineLine(activeHeroine)}</p>
          {[
            ["姓名", activeHeroine.name],
            ["性格", `${activeHeroine.outerTags.join("、")} · ${activeHeroine.innerTags.join("、")}`],
            ["身份", activeHeroine.identity],
            ["外貌", activeHeroine.appearance],
          ].map(([label, value]) => (
            <div key={label} className="mb-3">
              <FieldLabel>{label}</FieldLabel>
              <p className="text-[14px] leading-6 text-white/64">{value}</p>
            </div>
          ))}
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
        {heroines.map((heroine, index) => (
          <button
            key={heroine.id}
            type="button"
            onClick={() => setActiveHeroineId(heroine.id)}
            className={[
              "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none",
              heroine.id === activeHeroine.id
                ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]"
                : "border-white/[0.10] bg-[#141720] text-white/62",
            ].join(" ")}
          >
            女主{index + 1}
          </button>
        ))}
        {heroines.length < 5 ? (
          <button type="button" onClick={addHeroine} className="rounded-full border border-white/[0.10] px-3 py-1.5 text-white/55">
            <AppIcon name="plus" size={14} />
          </button>
        ) : null}
      </div>

      <p className="mb-4 text-[14px] leading-6 text-[#2F8CFF]">{heroineLine(activeHeroine)}</p>
      <div className="mb-4">
        <FieldLabel>姓名</FieldLabel>
        <div className="flex flex-wrap items-center gap-2">
          {names.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => updateHeroine(activeHeroine.id, { name })}
              className={[
                "inline-flex h-8 items-center rounded-full border px-3 text-[14px] leading-none",
                activeHeroine.name === name
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
            value={activeHeroine.name}
            onChange={(event) => updateHeroine(activeHeroine.id, { name: event.target.value })}
            className="h-8 w-28 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[13px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
          />
        </div>
      </div>
      <div className="mb-4">
        <FieldLabel>年龄</FieldLabel>
        <input
          value={activeHeroine.age}
          onChange={(event) => updateHeroine(activeHeroine.id, { age: event.target.value })}
          className="h-9 w-24 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
        />
      </div>
      <TagPicker
        title="外在印象"
        tags={HEROINE_OUTER_TAGS}
        selected={activeHeroine.outerTags}
        onChange={(outerTags) => updateHeroine(activeHeroine.id, { outerTags })}
      />
      <TagPicker
        title="内在特质"
        tags={HEROINE_INNER_TAGS}
        selected={activeHeroine.innerTags}
        onChange={(innerTags) => updateHeroine(activeHeroine.id, { innerTags })}
      />
      <TextAreaField label="身份/职业" value={activeHeroine.identity} onChange={(identity) => updateHeroine(activeHeroine.id, { identity })} />
      <TextAreaField label="外貌特征" value={activeHeroine.appearance} onChange={(appearance) => updateHeroine(activeHeroine.id, { appearance })} />
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-24 w-16 items-center justify-center rounded-lg border border-dashed border-white/[0.14] bg-[#111217] text-[13px] text-white/40">上传</div>
        <p className="text-[13px] leading-5 text-white/42">64×96 角色立绘上传区</p>
      </div>
      <div className="flex justify-center">
        <button className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]" type="button">
          生成立绘
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}

export function HeroinePanel({ mode, gender }: HeroinePanelProps) {
  return gender === "female" ? (
    <FemaleDirectionHeroinePanel mode={mode} />
  ) : (
    <MaleDirectionHeroinePanel mode={mode} />
  );
}
