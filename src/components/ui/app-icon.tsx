"use client";

import type { SVGProps } from "react";

export type AppIconName =
  | "pencil-line"
  | "save"
  | "play"
  | "refresh-cw"
  | "book-open"
  | "gamepad"
  | "palette"
  | "route"
  | "sliders"
  | "flask"
  | "diamond"
  | "settings"
  | "sparkle"
  | "spade"
  | "heart"
  | "circle-dot"
  | "flag"
  | "list"
  | "search"
  | "alert"
  | "map"
  | "chart"
  | "scales"
  | "chess"
  | "infinity"
  | "mask"
  | "flower"
  | "sword"
  | "yin-yang"
  | "orbit"
  | "star"
  | "wand"
  | "plus"
  | "check"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right";

const paths: Record<AppIconName, string[]> = {
  "pencil-line": [
    "M13 21h8",
    "m15 5 4 4",
    "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
  ],
  save: [
    "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
    "M7 3v4a1 1 0 0 0 1 1h7",
  ],
  play: ["M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"],
  "refresh-cw": [
    "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
    "M21 3v5h-5",
    "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
    "M8 16H3v5",
  ],
  "book-open": [
    "M12 7v14",
    "M3 5.5A2.5 2.5 0 0 1 5.5 3H11a1 1 0 0 1 1 1v17a1 1 0 0 0-1-1H5.5A2.5 2.5 0 0 0 3 22Z",
    "M21 5.5A2.5 2.5 0 0 0 18.5 3H13a1 1 0 0 0-1 1v17a1 1 0 0 1 1-1h5.5A2.5 2.5 0 0 1 21 22Z",
  ],
  gamepad: [
    "M6 11h4",
    "M8 9v4",
    "M15 12h.01",
    "M18 10h.01",
    "M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1 5.2A3 3 0 0 0 6.9 16l2-2h6.2l2 2a3 3 0 0 0 5.1-2.7l-1-5.2A4 4 0 0 0 17.3 5Z",
  ],
  palette: [
    "M12 22a10 10 0 1 1 10-10c0 2.2-1.8 3-3.7 3h-1.2a2.1 2.1 0 0 0-1.8 3.2l.3.5A2.2 2.2 0 0 1 13.7 22Z",
    "M7.5 10.5h.01",
    "M10.5 7.5h.01",
    "M14.5 7.5h.01",
    "M16.5 10.5h.01",
  ],
  route: [
    "M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M8.5 16h5a4.5 4.5 0 0 0 0-9h-2",
  ],
  sliders: [
    "M21 4H14",
    "M10 4H3",
    "M21 12h-9",
    "M8 12H3",
    "M21 20h-5",
    "M12 20H3",
    "M14 2v4",
    "M8 10v4",
    "M16 18v4",
  ],
  flask: [
    "M9 2h6",
    "M10 2v6.5L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 8.5V2",
    "M7.5 15h9",
  ],
  diamond: ["M12 3 21 12 12 21 3 12Z", "M12 8 16 12 12 16 8 12Z"],
  settings: [
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M12 2v3",
    "M12 19v3",
    "M4.9 4.9 7 7",
    "M17 17l2.1 2.1",
    "M2 12h3",
    "M19 12h3",
    "M4.9 19.1 7 17",
    "M17 7l2.1-2.1",
  ],
  sparkle: [
    "M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z",
    "M5 3v3",
    "M3.5 4.5h3",
    "M19 18v3",
    "M17.5 19.5h3",
  ],
  spade: ["M12 3s7 5.2 7 10a4 4 0 0 1-7 2.6A4 4 0 0 1 5 13c0-4.8 7-10 7-10Z", "M9 21h6", "M12 16v5"],
  heart: ["M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"],
  "circle-dot": ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"],
  flag: ["M5 21V4", "M5 4h12l-2 4 2 4H5"],
  list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
  search: ["M21 21l-4.3-4.3", "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"],
  alert: [
    "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h16.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
    "M12 9v4",
    "M12 17h.01",
  ],
  map: ["M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z", "M9 3v15", "M15 6v15"],
  chart: ["M3 3v18h18", "M7 15l4-4 3 3 5-7"],
  scales: ["M12 3v18", "M5 6h14", "M6 6l-3 7h6Z", "M18 6l-3 7h6Z", "M9 21h6"],
  chess: ["M8 4h8", "M9 8h6", "M10 8v5l-3 3v4h10v-4l-3-3V8"],
  infinity: ["M18.2 8.6c2 0 3.8 1.6 3.8 3.4s-1.8 3.4-3.8 3.4c-3.6 0-4.8-6.8-8.4-6.8C7.8 8.6 6 10.2 6 12s1.8 3.4 3.8 3.4c3.6 0 4.8-6.8 8.4-6.8Z"],
  mask: ["M4 6c2.5-1.5 13.5-1.5 16 0 0 8-2 14-8 14S4 14 4 6Z", "M8.5 11h.01", "M15.5 11h.01", "M9 15c1.4 1 4.6 1 6 0"],
  flower: ["M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z", "M12 2v2", "M12 20v2", "M4.9 4.9l1.4 1.4", "M17.7 17.7l1.4 1.4", "M2 12h2", "M20 12h2", "M4.9 19.1l1.4-1.4", "M17.7 6.3l1.4-1.4"],
  sword: ["M14.5 5.5 18 2l4 4-3.5 3.5", "M13 7l4 4L7 21H3v-4Z", "M8 16l-2-2"],
  "yin-yang": ["M12 3a9 9 0 1 0 0 18 4.5 4.5 0 1 1 0-9 4.5 4.5 0 1 0 0-9Z", "M12 7h.01", "M12 17h.01"],
  orbit: ["M12 12m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0", "M4.9 19.1c-2.2-2.2.4-8.4 5.8-13.8s11.6-8 13.8-5.8-.4 8.4-5.8 13.8-11.6 8-13.8 5.8Z"],
  star: ["M12 3l2.2 6.4H21l-5.4 4 2 6.6-5.6-4-5.6 4 2-6.6L3 9.4h6.8Z"],
  wand: ["M15 4l5 5", "M14 5l5 5", "M3 21l11-11", "M6 4v3", "M4.5 5.5h3", "M19 16v3", "M17.5 17.5h3"],
  plus: ["M12 5v14", "M5 12h14"],
  check: ["M20 6 9 17l-5-5"],
  "chevron-up": ["m18 15-6-6-6 6"],
  "chevron-down": ["m6 9 6 6 6-6"],
  "chevron-left": ["m15 18-6-6 6-6"],
  "chevron-right": ["m9 18 6-6-6-6"],
};

export function AppIcon({
  name,
  size = 16,
  strokeWidth = 2,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: AppIconName;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
