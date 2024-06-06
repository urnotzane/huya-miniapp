import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import '../../../styles/index.hycss'
import { useVisible } from "../../../hooks/common";
import { type Modal as TypeModal, type Form as TypeForm } from "@hyext/hy-ui/dist/types/components";
import { getRandomEasterEgg } from "../../../utils/common";

const { View, Button, Text, Tag, Modal, Form, Input, Tip } = UI;

export const EasterEggFc: FC<{}> = () => {
  const { visible, show, hide } = useVisible();
  const [curModal, setModal] = useState<TypeModal<any> | null>(null);
  const [easterEgg, setEasterEgg] = useState('');

  const handleEasterEggBtn = () => {
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
    const egg = getRandomEasterEgg();
    setEasterEgg(egg || '');
    curModal?.open();
  }
  const listenEasterEgg = async () => {
    try {
      await hyExt.context.onGiftChange({
      }, (res) => {
        console.log('[listenEasterEgg]', res);
        nobleCallback();
      });
      console.log('[listenEasterEgg]', '开始监听送礼物事件');
    } catch (error) {
      console.log('[listenEasterEgg catch]', error);
    }
  }
  const unListenEasterEgg = async () => {
    try {
      await hyExt.context.offGiftChange();
      console.log('[unListenEasterEgg]', '取消监听送礼物事件');
    } catch (error) {
      console.log('[unListenEasterEgg catch]', error);
    }
  }
  useEffect(() => {
    listenEasterEgg();
    return () => {
      unListenEasterEgg();
    }
  }, [])
  return (
    <>
      <Button className="button" onPress={handleEasterEggBtn} type="info">更多随机彩蛋</Button>
      {visible ? <View style={{
        marginTop: 20,
      }}>
        {/* @ts-ignore 不存在属性“children” */}
        <Tag style={{
          borderColor: '#91d5ff', backgroundColor: '#e6f7ff',
        }} textStyle={{ color: '#1890ff' }}>送任意礼物给主播，可触发随机彩蛋，快去试试吧！</Tag>
      </View> : <></>}
      <Modal
        ref={c => {
          setModal(c)
        }}
        cancelable>
        <View style={{ width: 300, padding: 16, backgroundColor: '#fff' }}>
          {/* @ts-ignore 不存在属性“children” */}
          <Tag type='primary' textColorInverse>哇！运气太好了吧～</Tag>
          <Text style={{ marginTop: 16 }}>恭喜获得【{easterEgg}】，游戏道具稍后会发放到绑定的游戏账号内，非游戏道具等待主播联系发放哦～</Text>
        </View>
      </Modal>
    </>
  )
}