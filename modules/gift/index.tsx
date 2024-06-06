import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import { useHandler } from "../../hooks/useHandler";
import './index.hycss'

const { View, Text, Button, Tag } = UI

export const GiftFc: FC<{}> = () => {
  const { apiRes, setApiRes, handlerInterrupter } = useHandler();
  const [listenerRes, setListenerRes] = useState<any>();
  
  const getGiftConf = () => {
    handlerInterrupter(async() => hyExt.context.getGiftConf())
  }
  const sendGift = () => {
    handlerInterrupter(async() => hyExt.context.sendGift({
      giftCount: 1,
      giftId: 20114,
    }))
  }
  const leadGift = () => {
    handlerInterrupter(async() => hyExt.context.leadGift())
  }
  const listenGift = () => {
    handlerInterrupter(async() => hyExt.context.onGiftChange({}, (res) => {
      setListenerRes(res)
    }))
  }
  const unListenGift = () => {
    handlerInterrupter(async() => hyExt.context.offGiftChange())
  }

  const fnList = [
    { name: '获取当前直播间礼物配置', fn: getGiftConf },
    { name: '当前观众送一个月亮（1 毛钱）', fn: sendGift },
    { name: '引导当前观众送礼', fn: leadGift },
    { name: '监听当前直播间送礼事件', fn: listenGift },
    { name: '取消监听当前直播间送礼事件', fn: unListenGift },
  ]
  useEffect(() => {

  }, []);
  return (
    <View className="container">
      <Button className="button" type="primary" >以下仅观众端可用</Button>
      {fnList.map(fn => <Button key={fn.name} className="button" type="info" onPress={fn.fn}>{fn.name}</Button>)}
      <Text className="result">{JSON.stringify(apiRes)}</Text>
      <Tag >监听结果：</Tag>
      <Text className="result">{JSON.stringify(listenerRes)}</Text>
    </View>
  )
}