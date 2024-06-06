import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import '../../styles/index.hycss'
import { GiftProxyFc } from "./viewer/gift";
import { GuardianFc } from "./viewer/guardian";
import { NobleFc } from "./viewer/noble";
import { EasterEggFc } from "./viewer/easterEgg";
import { isStreamer } from "../../constants/common";
import { ProxyPlayStreamerFc } from "./streamer";

const { View, Button, Text, BottomModal } = UI;

export const ProxyPlayFc: FC<{}> = () => {
  return (
    <>
      {isStreamer ?
        <ProxyPlayStreamerFc></ProxyPlayStreamerFc> :
        <View className="container"><GiftProxyFc />
          <GuardianFc />
          <NobleFc />
          <EasterEggFc /></View>}
    </>
  )
}