import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import './index.hycss'
import { ThemeOneFc } from "./themeOne";
import { useAppInit } from "../../hooks/common";
import { WB_NAME_ANNOUNCEMENT } from "../../constants/common";
import { useGift } from "../../hooks/useListener";

const { View, Button, Text, Switch } = UI;

const ANNOUNCEMENTS = [
  {
    label: '订阅公告',
    key: 'subscribe',
  },
  {
    label: '礼物公告',
    key: 'gifts',
  },
  {
    label: '守护公告',
    key: 'guardian',
  },
  {
    label: '贵族公告',
    key: 'noble',
  },
]

export const WhiteBoardFc: FC<{}> = () => {
  const [wbId, setWbId] = useState("");
  const { isWb } = useAppInit();
  const [annValues, setAnnValues] = useState<Record<string, boolean>>({});
  const { listenGifts, unListenGifts, giftInfo, setGiftInfo} = useGift();

  /**
   * 创建普通白板
   * SDK:hyExt.stream.createWB()
   */
  const createNormalWb = async () => {
    const { wbId } = await hyExt.stream
      .createWB({
        width: 1920,
        height: 160,
        type: "EXTRA",
        wbName: WB_NAME_ANNOUNCEMENT,
        offsetX: 0,
        offsetY: 0,
        canvasWidth: 1920,
        canvasHeight: 160,
        x: 0,
        y: 0,
        force: true,
      });
    setWbId(wbId);
    setTimeout(() => {
      hyExt.stream.sendToExtraWhiteBoard({
        wbId,
        data: JSON.stringify({
          routePath: '/white_board'
        })
      })
    }, 100);
  };
  function getTrueKeys(obj: Record<string, boolean>) {
    const result = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === true) {
        result.push(key);
      }
    }

    return result;
  }
  const closeBeautify = async () => {
    if (!wbId) return;
    await hyExt.stream.deleteWB({
      wbId,
    })
    setWbId("")
  }
  const switchChange = (key: string, value: any) => {
    const values = {
      ...annValues,
      [key]: value
    }
    setAnnValues(values);
  }
  const sendValues = () => {
    hyExt.stream.sendToExtraWhiteBoard({
      wbId,
      data: JSON.stringify({
        annValues,
        giftInfo,
      }),
    }).catch(err => {
      console.log('sendToExtraWhiteBoard', err);
    })
  }
  useEffect(() => {
    listenGifts();
    return () => {
      closeBeautify();
      unListenGifts();
    }
  }, []);

  useEffect(() => {
    if (!isWb) {
      sendValues();
      return;
    }
    hyExt.stream.onExtraWhiteBoardMessage({
      callback: (data) => {
        if (!data) return;
        try {
          const dataObj = JSON.parse(data);
          setAnnValues(dataObj.annValues);
          setGiftInfo(dataObj.giftInfo);
        } catch (error) {
          console.log('[onExtraWhiteBoardMessage]', error);
        }
      }
    })
  }, [isWb, annValues, giftInfo])
  return (
    <>
      {/* <ThemeOneFc annValues={annValues} /> */}
      {isWb ? <ThemeOneFc annValues={annValues} giftInfo={giftInfo} /> :
        <View className="container">
          <Button className="button" onPress={() => createNormalWb()}>
            横幅公告
          </Button>
          <Button className="button" onPress={() => closeBeautify()}>
            关闭公告
          </Button>
          {ANNOUNCEMENTS.map(item => (
            <View className="switch-row" key={item.key}>
              <Text className="row-label">{item.label}</Text>
              <Switch value={annValues[item.key]} onChange={(value: any) => switchChange(item.key, value)} />
            </View>
          ))}
          <Text>礼物：{giftInfo?.itemName}</Text>
        </View>
      }
    </>
  )
}