import type { ArtStyle } from "@/src/types";

export const ART_STYLES: ArtStyle[] = [
  { id: "jp", label: "日系平涂", ref: "原神、恋与深空", hue: 210, fit: ["all"] },
  { id: "kr", label: "韩系唯美", ref: "光与夜之恋", hue: 330, fit: ["ancient", "modern"] },
  { id: "cn_ink", label: "国风水墨", ref: "江湖悠悠", hue: 180, fit: ["ancient"] },
  { id: "cn_fine", label: "国风工笔", ref: "花亦山心之月", hue: 15, fit: ["ancient"] },
  { id: "thick", label: "厚涂写实", ref: "阴阳师", hue: 30, fit: ["all"] },
  { id: "cel", label: "赛璐珞", ref: "Fate系列", hue: 260, fit: ["all"] },
  { id: "west", label: "欧美插画", ref: "巫师、龙腾世纪", hue: 200, fit: ["modern", "future"] },
];
