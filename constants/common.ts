import { ViewStyle } from "react-native";

export let isStreamer = false;
export const setIsStreamer = (v: boolean) => {
  isStreamer = v;
}
export const tagStyle: ViewStyle = { marginRight: 5, marginBottom: 5, borderRadius: 11, marginTop: 10, width: 80, }

export const NobleList = [
  { name: '剑士', costs: 50 },
  { name: '骑士', costs: 300 },
  { name: '领主', costs: 1000 },
  { name: '公爵', costs: 5000 },
  { name: '君王', costs: 20000 },
  { name: '帝皇', costs: 200000 },
  { name: '超神·帝皇', costs: 1500000 },
]

export const EasterEggs = [
  { name: '主播亲密么么哒 * 1', weight: 100 },
  { name: '点券 * 1000', weight: 50 },
  { name: 'Q币 * 30', weight: 30 },
  { name: '灵魂莲华锤石皮肤 * 1', weight: 10 },
  { name: '玉剑传说艾瑞莉娅皮肤 * 1', weight: 10 },
  { name: '神龙尊者亚索皮肤 * 1', weight: 10 },
  { name: '未来战士伊泽瑞尔皮肤 * 1', weight: 10 },
]

export const ViewerInfo = {
  "userNick": "出门掌舟",
  "userAvatarUrl": "https://huyaimg.msstatic.com/avatar/1085/d7/5cc8debc06d8d75fe82a34c58dbac7_180_135.jpg?1713428843",
  "userLevel": 2,
  "userUnionId": "un7wWQO7PuTLaLQ6QdcrwgsSAmtD4swO7H",
}

export const WB_NAME_ANNOUNCEMENT = "announcements"