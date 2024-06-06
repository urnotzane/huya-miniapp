import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import './index.hycss'
import { useGift } from "../../hooks/useListener";

const { View, FullImage, Text, BackgroundImage } = UI;

export const ThemeOneFc: FC<{
  annValues: Record<string,boolean>;
  giftInfo?: hyExt.GifterInfo,
}> = (props) => {

  return (
    <View className="one">
      <View className="top">
        <BackgroundImage className="one-bg" src={require('../../assets/images/wb_bg_one.png')} ></BackgroundImage>
        <View className="top-item">
          {props.annValues.subscribe ? <View>
            <Text className="text-title">关注主播不迷路</Text>
            <Text className="text-s">感谢♥出门掌舟♥的关注 ——刚刚</Text>
            <Text className="text-s">感谢♥摸鱼达银♥的关注 ——1分钟前</Text>
            <Text className="text-s">感谢♥悠米臭猫♥的关注 ——3分钟前</Text>
          </View> : <></>}
        </View>
        <View className="top-item">
          {props.annValues.gifts ? <View>
            <Text className="text-title">送礼抽奖，皮肤、点券等你来</Text>
            {props.giftInfo?.itemId ? <Text className="text-s">感谢♥{props.giftInfo?.sendNick}♥送出的{props.giftInfo?.itemName}，恭喜抽到皮肤星之守护者厄加特*1，请进入VES小程序领取~</Text> : <></>}
          </View> : <></>}
        </View>
        <View className="top-item">
          {props.annValues.guardian ? <View>
            <Text className="text-title">开通守护可得一对一教学机会</Text>
            <Text className="text-s">初爱守护者♥出门掌舟♥进入直播间，快与主播开黑一起守护主播~</Text>
          </View> : <></>}
        </View>
        <View className="top-item">
          {props.annValues.noble ? <View>
            <Text className="text-title">开通贵族可上号</Text>
            <Text className="text-s">骑士♥出门掌舟♥进入直播间，联系主播带你装逼带你飞，带你飞进苞米堆~</Text>
          </View> : <></>}
        </View>
      </View>
      {/* <BackgroundImage className="streamer-area" src={require('../../assets/images/gn_game.jpg')} />
      <View className="bot">
        <BackgroundImage className="one-bg" src={require('../../assets/images/wb_bg_one.png')} ></BackgroundImage>
      </View> */}
    </View>
  )
}