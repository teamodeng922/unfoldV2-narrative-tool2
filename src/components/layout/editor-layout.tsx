"use client";

import { useEffect } from "react";
import { AiChatBar } from "@/src/components/layout/ai-chat-bar";
import { Header } from "@/src/components/layout/header";
import { StepNav } from "@/src/components/ui/step-nav";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";
import { DetailPanel } from "@/src/panels/detail-panel";
import { HeroPanel } from "@/src/panels/hero-panel";
import { HeroinePanel } from "@/src/panels/heroine-panel";
import { MechanicPanel } from "@/src/panels/mechanic-panel";
import { PlotPanel } from "@/src/panels/plot-panel";
import { ScenePanel } from "@/src/panels/scene-panel";
import { StylePanel } from "@/src/panels/style-panel";
import { WorldPanel } from "@/src/panels/world-panel";
import { CharPreview } from "@/src/previews/char-preview";
import { DetailPreview } from "@/src/previews/detail-preview";
import { EmptyPreview } from "@/src/previews/empty-preview";
import { MechanicPreview } from "@/src/previews/mechanic-preview";
import { OpeningPreview } from "@/src/previews/opening-preview";
import { OutlinePreview } from "@/src/previews/outline-preview";
import { PlotLinesPreview } from "@/src/previews/plot-lines-preview";
import { SceneMapPreview } from "@/src/previews/scene-map-preview";
import { getSteps, useEditorStore } from "@/src/stores/editor-store";

export function EditorLayout() {
  const mode = useEditorStore((state) => state.mode);
  const step = useEditorStore((state) => state.step);
  const done = useEditorStore((state) => state.done);
  const gender = useEditorStore((state) => state.worldSettings.gender);
  const worldType = useEditorStore((state) => state.worldSettings.worldType);
  const mechTypes = useEditorStore((state) => state.mechTypes);
  const setStep = useEditorStore((state) => state.setStep);
  const goNext = useEditorStore((state) => state.goNext);

  const activeMode = mode ?? "pro";
  const steps = getSteps(activeMode);
  const currentStep = steps.find((item) => item.id === step) ?? steps[0];
  const activeStepId = currentStep.id;
  const isWorldStep = activeStepId === "world";
  const isMechanicStep = activeStepId === "mechanic";
  const isStyleStep = activeStepId === "style";
  const isHeroStep = activeStepId === "hero";
  const isHeroineStep = activeStepId === "heroine";
  const isPlotStep = activeStepId === "plot";
  const isSceneStep = activeStepId === "scene";
  const isDetailStep = activeStepId === "detail";

  useEffect(() => {
    if (step !== activeStepId) {
      setStep(activeStepId);
    }
  }, [activeStepId, setStep, step]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#050509] text-[#E6E1D8]">
      <Header />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="h-full w-[136px] shrink-0 overflow-y-auto border-r border-white/[0.08] bg-[#050509] py-4 shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]">
          <StepNav current={activeStepId} done={done} steps={steps} onSelect={setStep} />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <section className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-white/[0.08] bg-[#050509] px-[22px]">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2F8CFF]/15 text-[13px] text-[#2F8CFF]">
                  <AppIcon name={currentStep.icon as AppIconName} size={14} />
                </span>
                <h2 className="text-[17px] font-semibold text-white">{currentStep.label}</h2>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-[#050509] px-[22px] py-5">
                {isWorldStep ? (
                  <WorldPanel mode={activeMode} />
                ) : isMechanicStep ? (
                  <MechanicPanel mode={activeMode} />
                ) : isStyleStep ? (
                  <StylePanel />
                ) : isHeroStep ? (
                  <HeroPanel mode={activeMode} gender={gender} />
                ) : isHeroineStep ? (
                  <HeroinePanel mode={activeMode} gender={gender} />
                ) : isPlotStep ? (
                  <PlotPanel mode={activeMode} gender={gender} />
                ) : isSceneStep ? (
                  <ScenePanel mode={activeMode} onConfirm={() => goNext("scene")} />
                ) : isDetailStep ? (
                  <DetailPanel
                    mode={activeMode}
                    gender={gender}
                    worldType={worldType}
                    mechTypes={mechTypes}
                  />
                ) : (
                  <div className="rounded-lg border border-white/[0.1] bg-[#111217] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)]">
                    <h3 className="mb-2 font-serif text-[18px] font-bold text-white">
                      {currentStep.label}
                    </h3>
                    <p className="text-[14px] leading-6 text-white/45">
                      这个页签的编辑面板会在后续轮次接入。
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="flex min-w-0 flex-1 flex-col border-l border-white/[0.08] bg-[#050509]">
              <div className="min-h-0 flex-1 overflow-y-auto bg-[#050509] p-6">
                {isWorldStep ? (
                  <OutlinePreview mode={activeMode} />
                ) : isMechanicStep ? (
                  <MechanicPreview mode={activeMode} />
                ) : isStyleStep ? (
                  <OpeningPreview />
                ) : isHeroStep ? (
                  <CharPreview gender={gender} type="hero" />
                ) : isHeroineStep ? (
                  <CharPreview gender={gender} type="heroine" />
                ) : isPlotStep ? (
                  <PlotLinesPreview gender={gender} />
                ) : isSceneStep ? (
                  <SceneMapPreview />
                ) : isDetailStep ? (
                  activeMode === "pro" ? (
                    <DetailPreview worldType={worldType} />
                  ) : (
                    <EmptyPreview />
                  )
                ) : (
                  <div className="h-full min-h-[420px] rounded-lg border border-white/[0.1] bg-[#111217] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)]">
                    <p className="mb-4 font-serif text-[20px] font-bold text-white">
                      {currentStep.label}
                    </p>
                    <p className="text-[12px] leading-7 text-white/50">
                      当前页签的预览内容会在后续轮次接入。
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <AiChatBar />
        </main>
      </div>
    </div>
  );
}
