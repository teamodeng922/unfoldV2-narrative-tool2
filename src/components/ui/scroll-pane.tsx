"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AppIcon } from "@/src/components/ui/app-icon";

type ScrollPaneProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollPane({ children, className = "" }: ScrollPaneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const remaining = node.scrollHeight - node.clientHeight - node.scrollTop;
      setCanScrollDown(remaining > 12);
    };

    update();
    const observer = new ResizeObserver(update);
    const mutationObserver = new MutationObserver(update);
    observer.observe(node);
    mutationObserver.observe(node, { childList: true, subtree: true, characterData: true });
    node.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      node.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={ref} className={["h-full overflow-y-auto", className].join(" ")}>
        {children}
      </div>
      {canScrollDown ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-[linear-gradient(180deg,rgba(5,5,9,0),rgba(5,5,9,0.88))] pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2F8CFF]/35 bg-[#071325]/90 text-[#38D5FF] shadow-[0_0_20px_rgba(47,140,255,0.22)]">
            <AppIcon name="chevron-down" size={15} strokeWidth={2.4} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
