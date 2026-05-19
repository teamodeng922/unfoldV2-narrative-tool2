"use client";

import { create } from "zustand";
import { GAME_NAMES } from "@/src/data/game-names";
import { WORLD_MECHANIC_MAP } from "@/src/data/world-mechanic-map";
import { WORLDS } from "@/src/data/worlds";
import type {
  ArtStyleId,
  EditorMode,
  FemaleHeroineTypeId,
  GameTypeId,
  HeroCharacter,
  MaleHeroTypeId,
  ProportionId,
  StepDefinition,
  StepId,
  WorldSettings,
} from "@/src/types";

export const ALL_STEPS: StepDefinition[] = [
  { id: "world", label: "世界设定", icon: "book-open", mode: "all" },
  { id: "mechanic", label: "游戏玩法", icon: "gamepad", mode: "all" },
  { id: "style", label: "美术风格", icon: "palette", mode: "pro" },
  { id: "hero", label: "男主设定", icon: "spade", mode: "all" },
  { id: "heroine", label: "女主设定", icon: "heart", mode: "all" },
  { id: "plot", label: "剧情线", icon: "route", mode: "all" },
  { id: "scene", label: "地点与场景", icon: "map", mode: "all" },
  { id: "play", label: "开始游戏", icon: "play", mode: "all" },
];

export const getSteps = (mode: EditorMode) =>
  ALL_STEPS.filter((step) => step.mode === "all" || step.mode === mode);

type EditorState = {
  mode: EditorMode | null;
  step: StepId;
  done: StepId[];
  worldSettings: WorldSettings;
  gameName: string;
  worldOutlineSeed: number;
  mechTypes: GameTypeId[];
  artStyle: ArtStyleId;
  proportion: ProportionId;
  heroes: HeroCharacter[];
  activeHeroId: string;
  maleHeroType: MaleHeroTypeId;
  maleHeroAge: string;
  maleHeroIdentity: string;
  maleHeroAppearance: string;
  heroines: HeroCharacter[];
  activeHeroineId: string;
  femaleHeroineType: FemaleHeroineTypeId;
  femaleHeroineAge: string;
  femaleHeroineIdentity: string;
  femaleHeroineAppearance: string;
  setMode: (mode: EditorMode | null) => void;
  setStep: (step: StepId) => void;
  setWorldSettings: (worldSettings: WorldSettings) => void;
  setGameName: (gameName: string) => void;
  generateWorldOutline: () => void;
  setMechTypes: (mechTypes: GameTypeId[]) => void;
  toggleMechanic: (mechanicId: GameTypeId) => void;
  moveMechanic: (mechanicId: GameTypeId, direction: "up" | "down") => void;
  setArtStyle: (artStyle: ArtStyleId) => void;
  setProportion: (proportion: ProportionId) => void;
  setActiveHeroId: (heroId: string) => void;
  updateHero: (heroId: string, patch: Partial<HeroCharacter>) => void;
  addHero: () => void;
  setMaleHeroType: (heroType: MaleHeroTypeId) => void;
  setMaleHeroField: (field: "maleHeroAge" | "maleHeroIdentity" | "maleHeroAppearance", value: string) => void;
  setActiveHeroineId: (heroineId: string) => void;
  updateHeroine: (heroineId: string, patch: Partial<HeroCharacter>) => void;
  addHeroine: () => void;
  setFemaleHeroineType: (heroineType: FemaleHeroineTypeId) => void;
  setFemaleHeroineField: (
    field: "femaleHeroineAge" | "femaleHeroineIdentity" | "femaleHeroineAppearance",
    value: string,
  ) => void;
  selectGender: (gender: WorldSettings["gender"]) => void;
  selectEra: (era: WorldSettings["era"]) => void;
  selectWorldType: (worldType: string) => void;
  markDone: (step: StepId) => void;
  goNext: (step: StepId) => void;
};

const initialWorldSettings: WorldSettings = {
  gender: "female",
  era: "ancient",
  worldType: "宫廷后宫",
};

const WORLD_NAME_VARIANTS: Record<string, string[]> = {
  宫廷后宫: ["凤鸣长安", "深宫月影", "金阶暗香"],
  世家宅斗: ["深闺谋", "朱门暗局", "花厅雪"],
  仙侠情缘: ["三生劫", "问灵录", "云上盟"],
  江湖恩怨: ["刀与月", "风雪故人", "断桥刀影"],
  将门风云: ["铁衣红妆", "玉门春秋", "烽火故人"],
  帝王争霸: ["龙御九州", "孤城帝业", "山河为局"],
};

const getGeneratedGameName = (worldType: string, seed: number) => {
  const variants = WORLD_NAME_VARIANTS[worldType] ?? [GAME_NAMES[worldType] ?? "未命名之卷"];
  return variants[seed % variants.length];
};

const initialHeroes: HeroCharacter[] = [
  {
    id: "xiao-yehan",
    name: "萧夜寒",
    age: "24",
    outerTags: ["高冷"],
    innerTags: ["深情"],
    identity: "冷宫废皇子，表面失势，暗中仍有人替他传递消息。",
    appearance: "墨发如瀑，肤若冷玉，常着玄色旧袍，眼神锋利而克制。",
  },
  {
    id: "shen-mochen",
    name: "沈墨尘",
    age: "26",
    outerTags: ["痞气"],
    innerTags: ["腹黑"],
    identity: "镇北将军之子，玩世不恭只是保护色。",
    appearance: "剑眉英挺，肤色微铜，笑起来漫不经心，手背有旧伤。",
  },
];

const heroPool: HeroCharacter[] = [
  ...initialHeroes,
  {
    id: "gu-yuan",
    name: "顾渊",
    age: "25",
    outerTags: ["温润"],
    innerTags: ["孤独"],
    identity: "太医院少院判，温和守礼，掌握宫中许多不能说的病案。",
    appearance: "眉眼清雅，常带药香，袖口总压着一枚旧银针。",
  },
  {
    id: "pei-xingzhou",
    name: "裴行舟",
    age: "27",
    outerTags: ["张扬"],
    innerTags: ["野心"],
    identity: "新贵权臣，锋芒太露，却愿意为你留一条退路。",
    appearance: "红衣金扣，眉峰凌厉，笑意明亮却带审视。",
  },
  {
    id: "xie-linyuan",
    name: "谢临渊",
    age: "23",
    outerTags: ["清冷"],
    innerTags: ["偏执"],
    identity: "前朝遗孤，隐身禁军，所有忠诚都藏着代价。",
    appearance: "眼尾微冷，常佩无纹短刀，站在人群里像一段雪光。",
  },
];

const initialHeroines: HeroCharacter[] = [
  {
    id: "su-wanyue",
    name: "苏挽月",
    age: "22",
    outerTags: ["温柔"],
    innerTags: ["坚韧"],
    identity: "医馆少东家，表面温顺，遇事却从不退让。",
    appearance: "眉眼柔和，常着浅青衣裙，腕间系着一枚旧铃。",
  },
  {
    id: "liu-ruyan",
    name: "柳如烟",
    age: "24",
    outerTags: ["冷艳"],
    innerTags: ["腹黑"],
    identity: "情报组织首领，擅长用笑意遮住刀锋。",
    appearance: "红唇冷眸，衣饰利落，发间银簪暗藏机关。",
  },
];

const heroinePool: HeroCharacter[] = [
  ...initialHeroines,
  {
    id: "jiang-ning",
    name: "姜宁",
    age: "21",
    outerTags: ["活泼"],
    innerTags: ["赤诚"],
    identity: "江湖跑商之女，消息灵通，胆子比天大。",
    appearance: "笑眼明亮，衣角总沾着风尘，腰间挂满小物件。",
  },
  {
    id: "ye-qinglan",
    name: "叶清澜",
    age: "25",
    outerTags: ["清纯"],
    innerTags: ["神秘"],
    identity: "失忆的琴师，琴声里藏着某个灭门旧案。",
    appearance: "白衣素净，指尖有薄茧，望人时像隔着一层雾。",
  },
  {
    id: "tang-xue",
    name: "唐雪",
    age: "23",
    outerTags: ["飒爽"],
    innerTags: ["独立"],
    identity: "边城女捕，行事果决，最讨厌拖泥带水。",
    appearance: "束发劲装，眼神清亮，佩刀从不离身。",
  },
];

export const useEditorStore = create<EditorState>((set, get) => ({
  mode: null,
  step: "world",
  done: [],
  worldSettings: initialWorldSettings,
  gameName: GAME_NAMES[initialWorldSettings.worldType],
  worldOutlineSeed: 0,
  mechTypes: WORLD_MECHANIC_MAP[initialWorldSettings.worldType] ?? ["romance"],
  artStyle: "cn_fine",
  proportion: "slim",
  heroes: initialHeroes,
  activeHeroId: initialHeroes[0].id,
  maleHeroType: "yx",
  maleHeroAge: "22",
  maleHeroIdentity: "不受宠的边缘皇子，从冷宫与废墟中重新组织自己的势力。",
  maleHeroAppearance: "身形修长，眉目沉静，常穿不起眼的深色衣袍，腰间藏着旧玉佩。",
  heroines: initialHeroines,
  activeHeroineId: initialHeroines[0].id,
  femaleHeroineType: "dv",
  femaleHeroineAge: "21",
  femaleHeroineIdentity: "出身普通却不愿被命运安排，正在为自己争取真正的选择权。",
  femaleHeroineAppearance: "眉眼清亮，身形利落，衣着简洁但有锋芒。",
  setMode: (mode) =>
    set({
      mode,
      step: "world",
      done: [],
    }),
  setStep: (step) => set({ step }),
  setWorldSettings: (worldSettings) =>
    set({
      worldSettings,
      gameName: GAME_NAMES[worldSettings.worldType] ?? get().gameName,
      mechTypes: WORLD_MECHANIC_MAP[worldSettings.worldType] ?? get().mechTypes,
    }),
  setGameName: (gameName) => set({ gameName }),
  generateWorldOutline: () =>
    set((state) => {
      const nextSeed = state.worldOutlineSeed + 1;

      return {
        worldOutlineSeed: nextSeed,
        gameName: getGeneratedGameName(state.worldSettings.worldType, nextSeed),
      };
    }),
  setMechTypes: (mechTypes) => set({ mechTypes }),
  toggleMechanic: (mechanicId) =>
    set((state) => {
      if (state.mechTypes.includes(mechanicId)) {
        return {
          mechTypes:
            state.mechTypes.length === 1
              ? state.mechTypes
              : state.mechTypes.filter((id) => id !== mechanicId),
        };
      }

      if (state.mechTypes.length >= 3) {
        return { mechTypes: state.mechTypes };
      }

      return { mechTypes: [...state.mechTypes, mechanicId] };
    }),
  moveMechanic: (mechanicId, direction) =>
    set((state) => {
      const index = state.mechTypes.indexOf(mechanicId);
      const nextIndex = direction === "up" ? index - 1 : index + 1;

      if (index < 0 || nextIndex < 0 || nextIndex >= state.mechTypes.length) {
        return { mechTypes: state.mechTypes };
      }

      const nextMechTypes = [...state.mechTypes];
      [nextMechTypes[index], nextMechTypes[nextIndex]] = [
        nextMechTypes[nextIndex],
        nextMechTypes[index],
      ];

      return { mechTypes: nextMechTypes };
    }),
  setArtStyle: (artStyle) => set({ artStyle }),
  setProportion: (proportion) => set({ proportion }),
  setActiveHeroId: (activeHeroId) => set({ activeHeroId }),
  updateHero: (heroId, patch) =>
    set((state) => ({
      heroes: state.heroes.map((hero) => (hero.id === heroId ? { ...hero, ...patch } : hero)),
    })),
  addHero: () =>
    set((state) => {
      if (state.heroes.length >= 5) return { heroes: state.heroes };
      const nextHero =
        heroPool.find((hero) => !state.heroes.some((existing) => existing.id === hero.id)) ??
        heroPool[state.heroes.length % heroPool.length];
      return {
        heroes: [...state.heroes, { ...nextHero, id: `${nextHero.id}-${state.heroes.length}` }],
        activeHeroId: `${nextHero.id}-${state.heroes.length}`,
      };
    }),
  setMaleHeroType: (maleHeroType) => set({ maleHeroType }),
  setMaleHeroField: (field, value) => set({ [field]: value }),
  setActiveHeroineId: (activeHeroineId) => set({ activeHeroineId }),
  updateHeroine: (heroineId, patch) =>
    set((state) => ({
      heroines: state.heroines.map((heroine) =>
        heroine.id === heroineId ? { ...heroine, ...patch } : heroine,
      ),
    })),
  addHeroine: () =>
    set((state) => {
      if (state.heroines.length >= 5) return { heroines: state.heroines };
      const nextHeroine =
        heroinePool.find((heroine) => !state.heroines.some((existing) => existing.id === heroine.id)) ??
        heroinePool[state.heroines.length % heroinePool.length];
      const nextId = `${nextHeroine.id}-${state.heroines.length}`;
      return {
        heroines: [...state.heroines, { ...nextHeroine, id: nextId }],
        activeHeroineId: nextId,
      };
    }),
  setFemaleHeroineType: (femaleHeroineType) => set({ femaleHeroineType }),
  setFemaleHeroineField: (field, value) => set({ [field]: value }),
  selectGender: (gender) => {
    const era = "ancient";
    const worldType = WORLDS[gender][era][0];

    set({
      worldSettings: { gender, era, worldType },
      gameName: GAME_NAMES[worldType] ?? "",
      mechTypes: WORLD_MECHANIC_MAP[worldType] ?? ["romance"],
    });
  },
  selectEra: (era) => {
    const { gender } = get().worldSettings;
    const worldType = WORLDS[gender][era][0];

    set({
      worldSettings: { gender, era, worldType },
      gameName: GAME_NAMES[worldType] ?? "",
      mechTypes: WORLD_MECHANIC_MAP[worldType] ?? ["romance"],
    });
  },
  selectWorldType: (worldType) =>
    set((state) => ({
      worldSettings: { ...state.worldSettings, worldType },
      gameName: GAME_NAMES[worldType] ?? state.gameName,
      mechTypes: WORLD_MECHANIC_MAP[worldType] ?? state.mechTypes,
    })),
  markDone: (step) =>
    set((state) => ({
      done: state.done.includes(step) ? state.done : [...state.done, step],
    })),
  goNext: (step) => {
    const mode = get().mode ?? "pro";
    const steps = getSteps(mode);
    const currentIndex = steps.findIndex((item) => item.id === step);
    const nextStep = steps[currentIndex + 1]?.id;

    get().markDone(step);

    if (nextStep) {
      set({ step: nextStep });
    }
  },
}));
