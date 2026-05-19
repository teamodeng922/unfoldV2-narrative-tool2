"use client";

import { useCallback, useState } from "react";
import { AimengPreflow } from "@/src/components/onboarding/aimeng-preflow";
import { EditorLayout } from "@/src/components/layout/editor-layout";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode } from "@/src/types";

export function EditorApp() {
  const mode = useEditorStore((state) => state.mode);
  const setMode = useEditorStore((state) => state.setMode);
  const selectGender = useEditorStore((state) => state.selectGender);
  const [preflowDone, setPreflowDone] = useState(false);
  const [preflowStartStep, setPreflowStartStep] = useState(0);
  const [skipPreflowFinale, setSkipPreflowFinale] = useState(false);

  const completePreflow = useCallback((selectedMode: EditorMode) => {
    selectGender("female");
    setMode(selectedMode);
    setPreflowDone(true);
    setPreflowStartStep(0);
    setSkipPreflowFinale(false);
  }, [selectGender, setMode]);

  if (!mode && !preflowDone) {
    return (
      <AimengPreflow
        initialStep={preflowStartStep}
        skipFinale={skipPreflowFinale}
        onEnter={completePreflow}
      />
    );
  }

  return mode ? <EditorLayout /> : null;
}
