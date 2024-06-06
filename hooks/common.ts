import { router } from "../constants/router";
import { useState, useEffect } from "react";

export const useVisible = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  }
  const hide = () => {
    setVisible(false);
  }

  return {
    visible,
    show,
    hide,
  }
}

export const useAppInit = () => {
  const [isWb, setIsWb] = useState(false);


  const setEnv = async () => {
    const res = await hyExt.env.getInitialParam();
    if ((res as any).wb) {
      setIsWb(true);
      setTimeout(() => {
        setWb();
      }, 100);
    }
  }
  const setWb = async () => {
    await hyExt.stream.onExtraWhiteBoardMessage({
      callback: (data) => {
        try {
          const dataObj = JSON.parse(data);
          if (dataObj.routePath) {
            router.history.push(dataObj.routePath)
          }
        } catch (error) {
          console.log('[setWb]', error);
        }
      }
    })
  }
  useEffect(() => {
    setEnv();
  }, [])
  return {
    setEnv,
    isWb,
  }
}