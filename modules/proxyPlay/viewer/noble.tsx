import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import '../../../styles/index.hycss'
import { useVisible } from "../../../hooks/common";
import { NobleList, tagStyle } from "../../../constants/common";
import { type Modal as TypeModal, type Form as TypeForm } from "@hyext/hy-ui/dist/types/components";

const { View, Button, Text, Tag, Modal, Form, Input, Tip } = UI;

export const NobleFc: FC<{}> = () => {
  const { visible, show, hide } = useVisible();
  const [curModal, setModal] = useState<TypeModal<any> | null>(null);
  const [gameValues, setGameValues] = useState<{
    roleName: string;
  }>({
    roleName: '',
  });
  const handleNobleBtn = () => {
    if (visible) {
      hide();
    } else {
      show();
      setTimeout(() => {
        nobleCallback();
      }, 2000);
    }
  }
  const nobleCallback = () => {
    curModal?.open();
  }
  const listenNoble = async () => {
    try {
      await hyExt.context.onOpenNobleNotice({
        callback: (res) => {
          console.log('[listenNoble]', res);
          nobleCallback();
        }
      });
      console.log('[listenNoble]', '开始监听贵族开通事件');
    } catch (error) {
      console.log('[listenNoble catch]', error);
    }
  }
  const unListenNoble = async () => {
    try {
      await hyExt.context.offOpenNobleNotice();
      console.log('[unListenNoble]', '取消监听贵族开通事件');
    } catch (error) {
      console.log('[unListenNoble catch]', error);
    }
  }
  const handleSure = () => {
    try {
      if (!gameValues.roleName) {
        Tip.show("请完整填写信息");
        return;
      }
      curModal?.close();
    } catch (error) {
      console.log('[handleSure]', error);
    }
  }
  useEffect(() => {
    listenNoble();
    return () => {
      unListenNoble();
    }
  }, [])
  return (
    <>
      <Button className="button" onPress={handleNobleBtn} type="info">开通贵族与主播现场 solo </Button>
      {visible ? <View style={{
        marginTop: 20,
      }}>
        <Text>为主播开通贵族开通可获得与主播的开黑次数：</Text>
        {NobleList.map((noble, index) => <View key={index}>
          {/* @ts-ignore 不存在属性“children” */}
          <Tag style={tagStyle} type='primary' textColorInverse>{noble.name}</Tag>
          <Text>获得与主播现场 solo {noble.costs / 50} 个对局</Text>
        </View>)}
        {/* @ts-ignore 不存在属性“children” */}
        <Tag style={{
          borderColor: '#91d5ff', backgroundColor: '#e6f7ff',
          marginTop: 10
        }} textStyle={{ color: '#1890ff' }}>快去为主播开通贵族，现场“暴打”（不是）主播！</Tag>
      </View> : <></>}
      <Modal
        ref={c => {
          setModal(c)
        }}
        cancelable>
        <View style={{ width: 300, padding: 10, backgroundColor: '#fff' }}>
          {/* @ts-ignore 不存在属性“children” */}
          <Tag type='primary' textColorInverse>您已成为主播的【剑士】</Tag>
          <Text style={{ marginTop: 8 }}>奖励与主播solo 1 个对局，快输入你的游戏数据，等待主播加游戏好友，与你现场畅快 solo！</Text>
          <Text style={{ marginTop: 16, marginBottom: 5 }}>游戏角色名称</Text>
          <Input value={gameValues.roleName} onChange={(v: any) => setGameValues({ ...gameValues, roleName: v })} />
          <Button onPress={handleSure} className="button">确认</Button>
        </View>
      </Modal>
    </>
  )
}