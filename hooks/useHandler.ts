import { useState } from "react";

export const useHandler = () => {
  const [apiRes, setApiRes] = useState<any>();

  /**
   * 对函数进行统一处理
   * - 添加test 版本实时日志功能
   * @param func 功能函数
   */
  const handlerInterrupter = async (func: () => Promise<any>) => {
    try {
      const res = await func();
      setApiRes(res);
    } catch (error) {
      hyExt.logger.info(func.name, error);
      setApiRes(error);
    }
  }

  return {
    apiRes,
    setApiRes,
    handlerInterrupter,
  }
}