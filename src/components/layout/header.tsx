"use client";

import { useRef, useState } from "react";
import { AppIcon } from "@/src/components/ui/app-icon";
import { useEditorStore } from "@/src/stores/editor-store";

export function Header() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportProject = useEditorStore((state) => state.exportProject);
  const importProject = useEditorStore((state) => state.importProject);
  const [notice, setNotice] = useState("");

  const handleExport = () => {
    const json = exportProject();
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");

    link.href = url;
    link.download = `unfold-project-${stamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("已导出项目 JSON");
  };

  const handleImport = async (file: File | undefined) => {
    if (!file) return;

    const result = importProject(await file.text());
    setNotice(result.message);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-white/[0.09] bg-[#050509] px-5 shadow-[0_12px_34px_rgba(0,0,0,0.24)]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[linear-gradient(135deg,#2F8CFF,#38D5FF)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.34)]">
          <AppIcon name="pencil-line" size={15} />
        </span>
        <span className="text-[17px] font-bold tracking-[0.02em] text-white">开卷 Unfold</span>
      </div>
      <div className="flex items-center gap-2.5">
        {notice ? <span className="text-[12px] text-white/52">{notice}</span> : null}
        <input
          ref={fileInputRef}
          accept="application/json,.json"
          className="hidden"
          type="file"
          onChange={(event) => void handleImport(event.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/[0.13] bg-white/[0.04] px-3 text-[13px] font-medium text-white/72 transition hover:border-[#2F8CFF]/60 hover:bg-[#0D2B52]/60 hover:text-white"
        >
          <AppIcon name="upload" size={14} />
          导入 JSON
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#2F8CFF]/65 bg-[#0D2B52] px-3 text-[13px] font-medium text-white transition hover:bg-[#123765]"
        >
          <AppIcon name="download" size={14} />
          导出 JSON
        </button>
      </div>
    </header>
  );
}
