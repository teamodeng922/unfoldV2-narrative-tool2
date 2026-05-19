import type { WorldsByGenderAndEra } from "@/src/types";

export const WORLDS: WorldsByGenderAndEra = {
  female: {
    ancient: ["宫廷后宫", "世家宅斗", "仙侠情缘", "江湖恩怨", "将门风云"],
    modern: ["豪门恩怨", "娱乐圈", "校园青春", "悬疑推理", "职场风云", "婚恋逆袭"],
    future: ["星际联姻", "ABO世界", "赛博情缘", "末日求生"],
  },
  male: {
    ancient: ["帝王争霸", "武侠江湖", "历史架空", "盗墓探险", "仙侠诡道"],
    modern: ["悬疑探案", "诡异怪谈", "都市商战", "娱乐巨星", "都市异能"],
    future: ["赛博朋克", "末日求生", "AI觉醒", "时空穿梭"],
  },
};

export const FEMALE_WORLD_COUNT = 15;
export const MALE_WORLD_COUNT = 14;
