export type EditorMode = "beginner" | "pro";

export type StepId =
  | "world"
  | "mechanic"
  | "style"
  | "hero"
  | "heroine"
  | "plot"
  | "scene"
  | "detail"
  | "play";

export type GenderDirection = "female" | "male";
export type Era = "ancient" | "modern" | "future";
export type ArtStyleFit = Era | "all";

export type GameTypeId =
  | "romance"
  | "mystery"
  | "survival"
  | "adventure"
  | "raising"
  | "fate"
  | "strategy"
  | "loop";

export type ArtStyleId =
  | "jp"
  | "kr"
  | "cn_ink"
  | "cn_fine"
  | "thick"
  | "cel"
  | "west";
export type ProportionId = "real" | "slim" | "chibi";

export type MaleHeroTypeId = "yx" | "tx" | "px" | "ax" | "rx";
export type FemaleHeroineTypeId = "dv" | "bq" | "ql" | "tc" | "fp";

export type EndingId = "he" | "be" | "open" | "shura" | "solo" | "trust" | "fail";
export type StatId = "acting" | "charm" | "intellect" | "physique";

export type WorldSettings = {
  gender: GenderDirection;
  era: Era;
  worldType: string;
};

export type StepDefinition = {
  id: StepId;
  label: string;
  icon: string;
  mode: "all" | EditorMode;
};

export type WorldsByGenderAndEra = Record<GenderDirection, Record<Era, string[]>>;

export type GameType = {
  id: GameTypeId;
  label: string;
  icon: string;
  desc: string;
  detail: string;
  mechanics: string[];
};

export type WorldMechanicMap = Record<string, GameTypeId[]>;

export type ArtStyle = {
  id: ArtStyleId;
  label: string;
  ref: string;
  hue: number;
  fit: ArtStyleFit[];
};

export type GameNameMap = Record<string, string>;

export type CharacterType<TId extends string = string> = {
  id: TId;
  label: string;
  desc: string;
};

export type HeroCharacter = {
  id: string;
  name: string;
  age: string;
  outerTags: string[];
  innerTags: string[];
  identity: string;
  appearance: string;
};

export type PlotKey = "opening" | "develop" | "climax" | "ending";

export type PlotValues = Record<PlotKey, string>;

export type CharacterPlotLine = {
  id: string;
  title: string;
  values: PlotValues;
};

export type TimeSlot = "上午" | "下午" | "晚上";

export type SceneLocation = {
  id: string;
  name: string;
  times: TimeSlot[];
  condition: string;
  roles: string[];
};

export type SceneAction = {
  id: string;
  name: string;
  desc: string;
};

export type Outline = {
  id: number;
  title: string;
  desc: string;
  crisis: string;
  factions: string;
  mystery: string;
};

export type OutlineMap = Record<string, Outline[]>;

export type EndingType = {
  id: EndingId;
  label: string;
  desc: string;
  defaultSelected: boolean;
};

export type StatSkin = {
  id: StatId;
  base: string;
  name: string;
  desc: string;
  icon: string;
};

export type StatSkinMap = Record<string, StatSkin[]>;
