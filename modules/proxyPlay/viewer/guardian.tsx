import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import '../../../styles/index.hycss'
import { useVisible } from "../../../hooks/common";
import { tagStyle } from "../../../constants/common";
import { type Modal as TypeModal, type Form as TypeForm } from "@hyext/hy-ui/dist/types/components";

const { View, Button, Text, Tag, Modal, Form, Input, Tip } = UI;

export const GuardianFc: FC<{}> = () => {
  const { visible, show, hide } = useVisible();
  const [curModal, setModal] = useState<TypeModal<any> | null>(null);
  const [gameValues, setGameValues] = useState<{
    roleName: string;
  }>({
    roleName: '',
  });
  const handleProtect = () => {
    if (visible) {
      hide();
    } else {
      show();
      setTimeout(() => {
        guardianCallback();
      }, 2000);
    }
  }
  const guardianCallback = () => {
    curModal?.open();
  }
  const listenGuardian = async () => {
    try {
      await hyExt.context.onOpenGuardianNotice({
        callback: (res) => {
          console.log('[listenGuardian]', res);
          guardianCallback();
        }
      });
      console.log('[listenGuardian]', '开始监听守护事件');
    } catch (error) {
      console.log('[listenGuardian catch]', error);
    }
  }
  const unListenGuardian = async () => {
    try {
      await hyExt.context.offOpenGuardianNotice();
      console.log('[unListenGuardian]', '取消监听守护事件');
    } catch (error) {
      console.log('[unListenGuardian catch]', error);
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
    listenGuardian();
    return () => {
      unListenGuardian();
    }
  }, [])
  return (
    <>
      <Button className="button" onPress={handleProtect} type="info">和主播开黑守护主播</Button>
      {visible ? <View style={{
        marginTop: 20,
      }}>
        <Text>为主播开通守护可获得与主播的开黑次数：</Text>
        {/* @ts-ignore 不存在属性“children” */}
        <Tag style={tagStyle} type='primary' textColorInverse>初爱守护</Tag>
        <Text>获得守护主播 5 个对局！</Text>
        {/* @ts-ignore 不存在属性“children” */}
        <Tag style={tagStyle} type='primary' textColorInverse>超级守护</Tag>
        <Text>获得守护主播 1 个直播天！</Text>
        {/* @ts-ignore 不存在属性“children” */}
        <Tag style={tagStyle} type='primary' textColorInverse>至尊守护</Tag>
        <Text>获得守护主播三个直播天！！！</Text>
        {/* @ts-ignore 不存在属性“children” */}
        <Tag style={{
          borderColor: '#91d5ff', backgroundColor: '#e6f7ff',
          marginTop: 10
        }} textStyle={{ color: '#1890ff' }}>快去为主播开通守护，一起开黑守护主播！</Tag>
      </View> : <></>}
      <Modal
        ref={c => {
          setModal(c)
        }}
        cancelable>
        <View style={{ width: 300, padding: 10, backgroundColor: '#fff' }}>
          {/* @ts-ignore 不存在属性“children” */}
          <Tag type='primary' textColorInverse>您已为主播开通【超级守护】</Tag>
          <Text style={{ marginTop: 8 }}>奖励与主播开黑 1 个直播天，快输入你的游戏数据，通知主播联系你吧～</Text>
          <Text style={{marginTop: 16, marginBottom: 5}}>游戏角色名称</Text>
          <Input value={gameValues.roleName} onChange={(v: any) => setGameValues({ ...gameValues, roleName: v })} />
          <Button onPress={handleSure} className="button">确认</Button>
        </View>
      </Modal>
    </>
  )
}