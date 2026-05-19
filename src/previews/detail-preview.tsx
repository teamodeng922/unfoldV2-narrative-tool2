"use client";

import { useState } from "react";
import { DEFAULT_STAT_SKIN, STAT_SKINS } from "@/src/data/stat-skins";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";

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
          <div key={stat.id} className="rounded-lg border border-white/10 bg-[#141720] p-2 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[13px] text-white/45">
              <AppIcon name={stat.icon as AppIconName} size={13} />
              {stat.name}
            </p>
            <p className="mt-1 text-[13px] font-semibold text-[#2F8CFF]">{16 + statIndex * 3}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setIndex((current) => (current + 1) % scenes.length)} className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#121018,#08080d_55%,#17120f)] text-left shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(47,140,255,0.16),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(56,213,255,0.13),transparent_28%)]" />
        <div className="absolute inset-x-8 bottom-8 rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur">
          <p className="mb-2 font-serif text-[14px] font-bold text-[#2F8CFF]">{scene.title}</p>
          <p className="text-[14px] leading-7 text-white/78">{scene.text}</p>
        </div>
      </button>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["选项门槛: 开", "自由多线", "修罗场: 开", "主动来访", "赠送物品", "崩盘: 关"].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-[#111217] p-3 text-center text-[14px] text-white/55">{item}</div>
        ))}
      </div>
    </div>
  );
}
