"use client";

import { ReadOnlyField } from "@/src/components/ui/read-only-field";
import { RegenButton } from "@/src/components/ui/regen-button";
import { RegenField } from "@/src/components/ui/regen-field";
import { NumberedTitle } from "@/src/components/ui/numbered-title";
import { useEditorStore } from "@/src/stores/editor-store";
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

const plotLabelClassName = "mb-1.5 text-[14px] font-semibold text-[#2F8CFF]";

export function PlotPanel({ mode, gender }: PlotPanelProps) {
  void gender;
  const mainPlot = useEditorStore((state) => state.mainPlot);
  const setMainPlotValue = useEditorStore((state) => state.setMainPlotValue);
  const generateMainPlot = useEditorStore((state) => state.generateMainPlot);

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
              onChange={(value) => setMainPlotValue(key, value)}
            />
          ) : (
            <ReadOnlyField key={key} label={plotLabels[key]} value={mainPlot[key]} labelClassName={plotLabelClassName} />
          ),
        )}
        <RegenButton onClick={generateMainPlot}>{mode === "pro" ? "全部重新生成" : "重新生成"}</RegenButton>
      </section>
    </div>
  );
}
