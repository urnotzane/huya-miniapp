import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui';
import '../../styles/index.hycss';
import { type Dialog as TypeDialog, type Form as TypeForm } from "@hyext/hy-ui/dist/types/components";
import {StreamerMilkTeaFc} from './streamer/milkTea'
import { StreamerGuardianFc } from "./streamer/guardian";
import { StreamerNobleFc } from "./streamer/noble";
import { StreamerEasterEggFc } from "./streamer/easterEgg";

const { View, Button, Text, Tab, Avatar, Tag, Dialog } = UI;

const tabs = [
  {
    value: 1,
    label: '雇主',
  },
  {
    value: 2,
    label: '守护',
  },
  {
    value: 3,
    label: '贵族',
  },
  {
    value: 4,
    label: '彩蛋',
  },
]
const ViewerInfo = {
  "userNick": "出门掌舟",
  "userAvatarUrl": "https://huyaimg.msstatic.com/avatar/1085/d7/5cc8debc06d8d75fe82a34c58dbac7_180_135.jpg?1713428843",
  "userLevel": 2,
  "userUnionId": "un7wWQO7PuTLaLQ6QdcrwgsSAmtD4swO7H",
}

export const ProxyPlayStreamerFc: FC<{}> = () => {
  const [curTab, setCurTab] = useState(1);
  const [curDialog, setCurDialog] = useState<TypeDialog | null>(null)

  const handleMilkTea = () => {
    curDialog?.open();
  }
  return (
    <View className="container">
      <Tab
        value={curTab}
        data={tabs}
        onChange={(item: any) => {
          setCurTab(item.value)
        }}
        style={{
          marginBottom: 20,
        }}
        activeColor="#188afa"
      />
      {curTab === 1 ? <StreamerMilkTeaFc /> : <></>}
      {curTab === 2 ? <StreamerGuardianFc /> : <></>}
      {curTab === 3 ? <StreamerNobleFc /> : <></>}
      {curTab === 4 ? <StreamerEasterEggFc /> : <></>}
    </View>
  )
}