"use client";

import { useState } from "react";
import { ReadOnlyField } from "@/src/components/ui/read-only-field";
import { RegenButton } from "@/src/components/ui/regen-button";
import { RegenField } from "@/src/components/ui/regen-field";
import { NumberedTitle } from "@/src/components/ui/numbered-title";
import type { EditorMode, GenderDirection } from "@/src/types";

type PlotPanelProps = {
  mode: EditorMode;
  gender: GenderDirection;
};

const plotKeys = ["opening", "develop", "climax", "ending"] as const;
const plotLabels = {
  opening: "开端",
  develop: "发展",
  climax: "高潮",
  ending: "结局",
};

const initialMainPlot: Record<(typeof plotKeys)[number], string> = {
  opening: "主角在命运的夹缝中进入新的世界，第一次看见权力、情感与危险交织的真实面。",
  develop: "关键人物陆续登场，旧秘密被一点点揭开，主角开始在不同阵营之间做出选择。",
  climax: "所有关系与矛盾集中爆发，信任被考验，主角必须付出代价换取真正的主动权。",
  ending: "世界危机迎来结算，角色关系落定，主角走向由选择共同塑造的最终结局。",
};

const plotLabelClassName = "mb-1.5 text-[14px] font-semibold text-[#2F8CFF]";

export const femaleLines = [
  {
    id: "xiao",
    title: "萧夜寒 + 你",
    values: {
      opening: "冷宫雪夜，你误入禁地，第一次看见他从黑暗中抬眼。",
      develop: "他教你读懂宫中暗语，你也逐渐发现他藏起的旧伤。",
      climax: "夺嫡风暴中，他愿把唯一退路让给你，却也把真心暴露在刀锋前。",
      ending: "若你选择相信，他会与你共同走出长夜；若你退后，他仍会替你守住最后一盏灯。",
    },
  },
  {
    id: "shen",
    title: "沈墨尘 + 你",
    values: {
      opening: "练武场上，他用漫不经心的笑替你挡下一场羞辱。",
      develop: "你发现他的轻佻只是伪装，真正的他比任何人都清醒。",
      climax: "边军与朝堂冲突爆发，他必须在家族忠义与你之间做出选择。",
      ending: "你们可能并肩策马离开，也可能在宫门前把未说出口的话永远藏起。",
    },
  },
];

export const maleLines = [
  {
    id: "su",
    title: "你 + 苏挽月",
    values: {
      opening: "你在雨夜受伤，被苏挽月藏进医馆后院。",
      develop: "她帮你处理伤口，也一点点看穿你不肯说出口的来历。",
      climax: "敌人追至城中，她第一次违背家训，将你推向生路。",
      ending: "若你回头，她会与你并肩；若你远走，她会把那枚旧铃留给你。",
    },
  },
  {
    id: "liu",
    title: "你 + 柳如烟",
    values: {
      opening: "你在黑市交易中遇见柳如烟，她一句话便拆穿你的伪装。",
      develop: "你们互相利用，却在一次次试探里生出危险的默契。",
      climax: "情报网崩塌，她把最致命的秘密交到你手中。",
      ending: "你们可能共享胜利，也可能在真相揭开后成为彼此最锋利的遗憾。",
    },
  },
];

export function PlotPanel({ mode, gender }: PlotPanelProps) {
  void gender;
  const [mainPlot, setMainPlot] = useState(initialMainPlot);

  return (
    <div className="py-4">
      <section className="mb-7">
        <NumberedTitle num="01">世界主线大纲</NumberedTitle>
        {plotKeys.map((key) =>
          mode === "pro" ? (
            <RegenField
              key={key}
              label={plotLabels[key]}
              value={mainPlot[key]}
              labelClassName={plotLabelClassName}
              onChange={(value) => setMainPlot((current) => ({ ...current, [key]: value }))}
            />
          ) : (
            <ReadOnlyField key={key} label={plotLabels[key]} value={mainPlot[key]} labelClassName={plotLabelClassName} />
          ),
        )}
        <RegenButton>{mode === "pro" ? "全部重新生成" : "重新生成"}</RegenButton>
      </section>
    </div>
  );
}
