import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import { useHandler } from "../../hooks/useHandler";
import { Button } from "react-native";
import './index.hycss'

const { View, Text } = UI

export const HumanSkeletonFc: FC<{}> = () => {
  const { apiRes, setApiRes, handlerInterrupter } = useHandler();
  
  const start = () => {
    handlerInterrupter(async() => hyExt.reg.onHumanSkeletonDetection({
      callback: (res: any)=> {
        setApiRes(res);
      },
    }))
  }
  const stop = () => {
    handlerInterrupter(async() => hyExt.reg.offHumanSkeletonDetection())
  }
  useEffect(() => {

  }, []);
  return (
    <View>
      <Button className="button" title="开始检测" onPress={start}></Button>
      <Button className="button" title="停止检测" onPress={stop} color={'red'}></Button>
      <Text>{JSON.stringify(apiRes)}</Text>
    </View>
  )
}