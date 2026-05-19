"use client";

import { useState } from "react";
import { DEFAULT_STAT_SKIN, STAT_SKINS } from "@/src/data/stat-skins";

type DetailPreviewProps = {
  worldType: string;
};

const scenes = [
  { title: "属性提升", text: "你在书房研读密信，才智 +3，演技 +1。" },
  { title: "角色对话", text: "萧夜寒注意到你的疲惫，低声提醒你今晚别去御花园。" },
  { title: "数值门槛选项", text: "出现特殊选项：需要才智≥20，识破宫女证词漏洞。" },
  { title: "修罗场", text: "沈墨尘撞见你与萧夜寒深夜密谈，空气骤然紧绷。" },
  { title: "角色来访", text: "夜半有人叩门，顾渊送来一包没有署名的药。"},
];

export function DetailPreview({ worldType }: DetailPreviewProps) {
  const [index, setIndex] = useState(0);
  const stats = STAT_SKINS[worldType] ?? DEFAULT_STAT_SKIN;
  const scene = scenes[index];

  return (
    <div className="w-full py-4">
      <div className="mb-3 grid grid-cols-4 gap-2">
        {stats.map((stat, statIndex) => (
          <div key={stat.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
            <p className="text-xs text-white/45">{stat.icon} {stat.name}</p>
            <p className="mt-1 text-sm font-semibold text-[#D4B886]">{16 + statIndex * 3}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setIndex((current) => (current + 1) % scenes.length)} className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#121018,#08080d_55%,#17120f)] text-left shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(212,184,134,0.16),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(164,184,214,0.13),transparent_28%)]" />
        <div className="absolute bottom-14 left-[5%] max-w-[55%]">
          <p className="air-text-shadow mb-2 font-serif text-[28px] font-bold tracking-[0.08em] text-[#D4B886]/90">
            {scene.title}
          </p>
          <p className="air-text-shadow text-[21px] leading-[1.8] text-white/85">{scene.text}</p>
        </div>
      </button>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["选项门槛: 开", "自由多线", "修罗场: 开", "主动来访", "赠送物品", "崩盘: 关"].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center text-xs text-white/55">{item}</div>
        ))}
      </div>
    </div>
  );
}
