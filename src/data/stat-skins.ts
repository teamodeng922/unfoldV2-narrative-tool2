import type { StatSkin, StatSkinMap } from "@/src/types";

export const DEFAULT_STAT_SKIN: StatSkin[] = [
  { id: "acting", base: "演技", name: "演技", desc: "伪装情绪、扮演身份、掩盖真实意图", icon: "mask" },
  { id: "charm", base: "魅力", name: "魅力", desc: "初见印象、好感累积、影响他人为你破例", icon: "flower" },
  { id: "intellect", base: "才智", name: "才智", desc: "解谜推理、策略对抗、看穿陷阱与谎言", icon: "diamond" },
  { id: "physique", base: "体魄", name: "体魄", desc: "身体耐受、自卫反击、极限环境生存", icon: "sword" },
];

export const STAT_SKINS: StatSkinMap = {
  宫廷后宫: [
    { id: "acting", base: "演技", name: "演技", desc: "装柔弱、装病、假晕，后宫伪装是生存第一课", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让皇帝多看你一眼，让宫人替你传话", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "看穿陷害、识破下毒、解读宫廷暗语", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "长跪不倒、反击刺客、寒夜出宫不倒", icon: "sword" },
  ],
  世家宅斗: [
    { id: "acting", base: "演技", name: "演技", desc: "装贤良、藏锋芒、在族中滴水不漏", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让族中长辈偏心你，让下人死忠", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "管家理财、识破账目猫腻、拆解阴谋", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "掌家操劳不倒、撑过产期凶险", icon: "sword" },
  ],
  仙侠情缘: [
    { id: "acting", base: "演技", name: "演技", desc: "藏修为、装散修、假装被夺舍骗过天道", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让神兽认主、让宗师破例收徒", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "解古卷咒文、破万年阵法、推演天道", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "扛天雷渡劫、御剑万里、抗魔气侵蚀", icon: "sword" },
  ],
  江湖恩怨: [
    { id: "acting", base: "演技", name: "演技", desc: "扮弱者、潜入敌帮、藏起真实武功", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让江湖人愿拔刀相助、让对手手下留情", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "识破暗算、推理凶手、看穿江湖棋局", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "过招不落下风、轻功追逐、硬抗暗器", icon: "sword" },
  ],
  将门风云: [
    { id: "acting", base: "演技", name: "演技", desc: "朝堂装顺从、敌前藏实力、隐忍待发", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让将士信服、让盟友甘愿追随", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "排兵布阵、识破间谍、粮草调度", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "上阵杀敌、骑射不落、长途行军", icon: "sword" },
  ],
  豪门恩怨: [
    { id: "acting", base: "演技", name: "演技", desc: "装门当户对、演淡泊名利、假女友成真", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让长辈喜欢、让上流圈接纳、路人缘在线", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "看穿合约陷阱、股权博弈、揭破阴谋", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "连轴商旅不倒、绑架自救、车祸求生", icon: "sword" },
  ],
  娱乐圈: [
    { id: "acting", base: "演技", name: "演技", desc: "试镜一镜过、哭戏让导演起立、假戏真做", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "红毯封面、路人转粉、品牌争抢代言", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "识破合约、公关危机反转、爆款营销", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "打戏不用替身、跳唱三小时、连轴72h不倒", icon: "sword" },
  ],
  校园青春: [
    { id: "acting", base: "演技", name: "演技", desc: "装乖学生、装不在意他、假告白测真心", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "校园风云人物、社团抢人、舞会焦点", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "年级前十、破解校园谜案、辩论赛冠军", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "校运会冠军、挡在霸凌者前、马拉松第一", icon: "sword" },
  ],
  悬疑推理: [
    { id: "acting", base: "演技", name: "演技", desc: "潜入现场、装无辜、引嫌疑人露出破绽", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让证人愿意开口、让警方全力配合", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "拼合线索、识破谎言、还原现场真相", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "追逐嫌犯、搏斗自卫、长时间蹲守", icon: "sword" },
  ],
  末日求生: [
    { id: "acting", base: "演技", name: "演技", desc: "装没异能、卧底敌营、设局诱敌", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "招募同伴、让基地接纳你、让敌方动摇", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "制定逃生路线、研究病毒、防御设计", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "异能爆发承载、抗辐射、徒手搏斗", icon: "sword" },
  ],
  星际联姻: [
    { id: "acting", base: "演技", name: "演技", desc: "在异族前扮演对方期待的角色、装系统故障", icon: "mask" },
    { id: "charm", base: "魅力", name: "魅力", desc: "让AI产生异常响应、让异星贵族心动", icon: "flower" },
    { id: "intellect", base: "才智", name: "才智", desc: "破解外星语言、推理星际阴谋、解AI代码", icon: "diamond" },
    { id: "physique", base: "体魄", name: "体魄", desc: "操控机甲、零重力作业、抗异星病毒", icon: "sword" },
  ],
};
