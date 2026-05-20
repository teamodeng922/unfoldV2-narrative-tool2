"use client";

import { useState } from "react";
import { RegenField } from "@/src/components/ui/regen-field";
import { RegenButton } from "@/src/components/ui/regen-button";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode, SceneAction, SceneLocation, TimeSlot } from "@/src/types";
import { AppIcon } from "@/src/components/ui/app-icon";
import { NumberedTitle } from "@/src/components/ui/numbered-title";

type ScenePanelProps = {
  mode: EditorMode;
};

const timeSlots: TimeSlot[] = ["上午", "下午", "晚上"];
const roleOptions = ["萧夜寒", "沈墨尘", "顾渊", "苏挽月", "柳如烟", "你"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-[14px] font-semibold text-white/55">{children}</div>;
}

function toggleArrayValue<T>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function ScenePanel({ mode }: ScenePanelProps) {
  const totalDays = useEditorStore((state) => state.totalDays);
  const stages = useEditorStore((state) => state.sceneStages);
  const locations = useEditorStore((state) => state.locations);
  const actions = useEditorStore((state) => state.actions);
  const setTotalDays = useEditorStore((state) => state.setTotalDays);
  const setSceneStage = useEditorStore((state) => state.setSceneStage);
  const setLocations = useEditorStore((state) => state.setLocations);
  const setActions = useEditorStore((state) => state.setActions);
  const generateScenes = useEditorStore((state) => state.generateScenes);
  const [openLocationIds, setOpenLocationIds] = useState<string[]>([]);
  const [openActionIds, setOpenActionIds] = useState<string[]>([]);

  const updateLocation = (id: string, patch: Partial<SceneLocation>) =>
    setLocations(locations.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const updateAction = (id: string, patch: Partial<SceneAction>) =>
    setActions(actions.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const addLocation = () => {
    const id = `location-${locations.length + 1}`;
    setLocations([
      ...locations,
      { id, name: "新地点", times: ["上午"], condition: "默认开放", roles: ["你"] },
    ]);
    setOpenLocationIds((current) => [...current, id]);
  };

  const addAction = () => {
    const id = `action-${actions.length + 1}`;
    setActions([...actions, { id, name: "新行动", desc: "描述这个行动类型的效果。" }]);
    setOpenActionIds((current) => [...current, id]);
  };

  return (
    <div className="py-4">
      <section className="mb-6">
        <NumberedTitle num="01">玩法说明</NumberedTitle>
        <div className="rounded-lg border border-[rgba(47,140,255,0.22)] bg-[rgba(47,140,255,0.06)] p-4">
          <p className="text-[14px] leading-6 text-white/62">
            玩家每天选择地点与行动，在探索、互动和养成中推进角色关系与主线事件。
          </p>
        </div>
      </section>

      {mode === "pro" ? (
        <section className="mb-6">
          <NumberedTitle num="02">整体节奏</NumberedTitle>
          <div className="mb-4">
            <FieldLabel>游戏总天数</FieldLabel>
            <input
              value={totalDays}
              onChange={(event) => setTotalDays(event.target.value)}
              className="h-9 w-28 rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
            />
          </div>
          <RegenField label="引导期 1-3 天" value={stages.guide} onChange={(value) => setSceneStage("guide", value)} />
          <RegenField label="自由期第 4 天起" value={stages.free} onChange={(value) => setSceneStage("free", value)} />
          <RegenField label="中期大事件约 15 天" value={stages.mid} onChange={(value) => setSceneStage("mid", value)} />
          <RegenField label="后期 20-30 天" value={stages.late} onChange={(value) => setSceneStage("late", value)} />
        </section>
      ) : null}

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <NumberedTitle className="mb-0" num={mode === "pro" ? "03" : "02"}>地点列表</NumberedTitle>
        </div>
        <div className="grid gap-3">
          {locations.map((location) => {
            const opened = openLocationIds.includes(location.id);
            return (
              <article key={location.id} className="rounded-lg border border-white/[0.10] bg-[#111217]">
                <button
                  type="button"
                  disabled={mode === "beginner"}
                  onClick={() =>
                    setOpenLocationIds((current) =>
                      current.includes(location.id) ? current.filter((id) => id !== location.id) : [...current, location.id],
                    )
                  }
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left disabled:cursor-default"
                >
                  <div>
                    <p className="text-[14px] font-semibold text-white">{location.name}</p>
                    <p className="mt-1 text-[13px] text-white/38">
                      {location.times.join(" / ")} · {location.roles.join("、")}
                    </p>
                  </div>
                  {mode === "pro" ? (
                    <span className="inline-flex items-center gap-1 text-[13px] text-[#38D5FF]">
                      {opened ? "收起" : "展开"}
                      <AppIcon name={opened ? "chevron-up" : "chevron-down"} size={12} />
                    </span>
                  ) : null}
                </button>

                {mode === "pro" && opened ? (
                  <div className="border-t border-[rgba(255,255,255,0.08)] p-4">
                    <FieldLabel>地点名称</FieldLabel>
                    <input value={location.name} onChange={(event) => updateLocation(location.id, { name: event.target.value })} className="mb-4 h-9 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45" />
                    <FieldLabel>开放时段</FieldLabel>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {timeSlots.map((slot) => (
                        <button key={slot} type="button" onClick={() => updateLocation(location.id, { times: toggleArrayValue(location.times, slot) })} className={[
                          "rounded-full border px-3 py-1.5 text-[14px]",
                          location.times.includes(slot) ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]" : "border-white/[0.10] bg-[#141720] text-white/62",
                        ].join(" ")}>
                          {slot}
                        </button>
                      ))}
                    </div>
                    <FieldLabel>开放条件</FieldLabel>
                    <input value={location.condition} onChange={(event) => updateLocation(location.id, { condition: event.target.value })} className="mb-4 h-9 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45" />
                    <FieldLabel>可出现角色</FieldLabel>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {roleOptions.map((role) => (
                        <button key={role} type="button" onClick={() => updateLocation(location.id, { roles: toggleArrayValue(location.roles, role) })} className={[
                          "rounded-full border px-3 py-1.5 text-[14px]",
                          location.roles.includes(role) ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]" : "border-white/[0.10] bg-[#141720] text-white/62",
                        ].join(" ")}>
                          {role}
                        </button>
                      ))}
                    </div>
                    <div className="mb-4 flex h-24 items-center justify-center rounded-lg border border-dashed border-white/[0.14] bg-[#111217] text-[13px] text-white/40">场景图上传区</div>
                    <button type="button" onClick={() => setLocations(locations.filter((item) => item.id !== location.id))} className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-[12px] text-red-200/70">
                      删除地点
                    </button>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        {mode === "pro" ? (
          <button type="button" onClick={addLocation} className="mt-3 rounded-lg border border-white/[0.10] bg-[#111217] px-4 py-2 text-[14px] text-white/62 hover:text-[#2F8CFF]">
            <AppIcon className="mr-1.5 inline-block align-[-2px]" name="plus" size={14} />
            添加地点
          </button>
        ) : null}
      </section>

      <section className="mb-7">
        <div className="mb-3 flex items-center justify-between">
          <NumberedTitle className="mb-0" num={mode === "pro" ? "04" : "03"}>行动类型</NumberedTitle>
        </div>
        <div className="grid gap-3">
          {actions.map((action) => {
            const opened = openActionIds.includes(action.id);
            return (
              <article key={action.id} className="rounded-lg border border-white/[0.10] bg-[#111217]">
                <button
                  type="button"
                  disabled={mode === "beginner"}
                  onClick={() =>
                    setOpenActionIds((current) =>
                      current.includes(action.id) ? current.filter((id) => id !== action.id) : [...current, action.id],
                    )
                  }
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left disabled:cursor-default"
                >
                  <div>
                    <p className="text-[14px] font-semibold text-white">{action.name}</p>
                    <p className="mt-1 text-[13px] leading-5 text-white/38">{action.desc}</p>
                  </div>
                  {mode === "pro" ? (
                    <span className="inline-flex items-center gap-1 text-[13px] text-[#38D5FF]">
                      {opened ? "收起" : "展开"}
                      <AppIcon name={opened ? "chevron-up" : "chevron-down"} size={12} />
                    </span>
                  ) : null}
                </button>
                {mode === "pro" && opened ? (
                  <div className="border-t border-[rgba(255,255,255,0.08)] p-4">
                    <FieldLabel>名称</FieldLabel>
                    <input value={action.name} onChange={(event) => updateAction(action.id, { name: event.target.value })} className="mb-4 h-9 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45" />
                    <FieldLabel>说明</FieldLabel>
                    <input value={action.desc} onChange={(event) => updateAction(action.id, { desc: event.target.value })} className="mb-4 h-9 w-full rounded-lg border border-white/[0.10] bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45" />
                    <button type="button" onClick={() => setActions(actions.filter((item) => item.id !== action.id))} className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-[12px] text-red-200/70">
                      删除行动
                    </button>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        {mode === "pro" ? (
          <button type="button" onClick={addAction} className="mt-3 rounded-lg border border-white/[0.10] bg-[#111217] px-4 py-2 text-[14px] text-white/62 hover:text-[#2F8CFF]">
            <AppIcon className="mr-1.5 inline-block align-[-2px]" name="plus" size={14} />
            添加行动类型
          </button>
        ) : null}
      </section>

      <div className="flex justify-center">
        <RegenButton className="mr-3" onClick={generateScenes}>重新生成</RegenButton>
        <button type="button" className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition hover:bg-[#123967]">
          生成场景图
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}
