import { useState } from "react";

export const useGift = () => {
  const [giftInfo, setGiftInfo] = useState<hyExt.GifterInfo>();

  const listenGifts = async() => {
    try {
      // 会监听到当前直播间的礼物，不仅仅是当前用户，白板用不了
      hyExt.context.onGiftChange({}, (res) => {
        setGiftInfo(res)
      })
    } catch (error) {
      console.log('[listenGifts]', error);
    }
  }
  const unListenGifts = () => {
    hyExt.context.offGiftChange()
  }

  return {
    giftInfo,
    setGiftInfo,
    listenGifts,
    unListenGifts,
  }
}