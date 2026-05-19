import type { EndingType } from "@/src/types";

export const ENDINGS: EndingType[] = [
  {
    id: "he",
    label: "单人HE",
    desc: "与某位角色关系圆满，走向幸福结局",
    defaultSelected: true,
  },
  {
    id: "be",
    label: "单人BE",
    desc: "与某位角色悲剧收场，遗憾或牺牲",
    defaultSelected: true,
  },
  {
    id: "open",
    label: "开放式结局",
    desc: "关系未定，故事留有余韵",
    defaultSelected: false,
  },
  {
    id: "shura",
    label: "修罗场",
    desc: "多位角色争夺引发冲突",
    defaultSelected: true,
  },
  {
    id: "solo",
    label: "独立结局",
    desc: "不依附任何角色",
    defaultSelected: true,
  },
  {
    id: "trust",
    label: "全员信任",
    desc: "与所有角色建立深厚羁绊",
    defaultSelected: false,
  },
  {
    id: "fail",
    label: "主线失败",
    desc: "世界主线彻底崩坏",
    defaultSelected: false,
  },
];
