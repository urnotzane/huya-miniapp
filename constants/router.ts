import React, { useState, useEffect } from 'react'
import { FuncsList } from "../modules/funcsList";
import { Index } from "../modules/index";
import { AudioFc } from "../modules/audio";
import { GestureFc } from "../modules/gesture";
import { HumanSkeletonFc } from "../modules/humanSkeleton";
import { GiftFc } from "../modules/gift";
import { ProxyPlayFc } from "../modules/proxyPlay";
import { WhiteBoardFc } from '../modules/whiteBoard';

export const indexPath = '/home'
export const routes = [
  {
    path: indexPath,
    component: Index,
    name: '首页'
  },
  {
    path: '/base',
    component: FuncsList,
    name: '双端基础能力'
  },
  {
    path: '/gift',
    component: GiftFc,
    name: '礼物'
  },
  {
    path: '/proxy_play',
    component: ProxyPlayFc,
    name: '场景结合'
  },
  {
    path: '/white_board',
    component: WhiteBoardFc,
    name: '白板[仅主播]'
  },
  {
    path: '/human_skeleton',
    component: HumanSkeletonFc,
    name: '肢体骨骼点检测'
  },
  {
    path: '/audio',
    component: AudioFc,
    name: '语音识别[已废弃]'
  },
  {
    path: '/gesture',
    component: GestureFc,
    name: '手势识别[已废弃]'
  },
]
export const createRouter = (r: any) => {
  router = r;
  return router;
}
export let router: any = null;
