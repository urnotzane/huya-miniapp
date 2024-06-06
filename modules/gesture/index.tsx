import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import { useHandler } from "../../hooks/useHandler";
import { Button } from "react-native";
import './index.hycss'

const { View, Text } = UI

export const GestureFc: FC<{}> = () => {
  const { apiRes, setApiRes, handlerInterrupter } = useHandler();
  
  const start = () => {
    handlerInterrupter(async() => hyExt.reg.onGestureRecognition({
      callback: (res: any)=> {
        setApiRes(res);
      },
    }))
  }
  const stop = () => {
    handlerInterrupter(async() => hyExt.reg.offGestureRecognition())
  }
  useEffect(() => {

  }, []);
  return (
    <View>
      <Button className="button" title="开始识别" onPress={start}></Button>
      <Button className="button" title="停止识别" onPress={stop} color={'red'}></Button>
      <Text>{JSON.stringify(apiRes)}</Text>
    </View>
  )
}