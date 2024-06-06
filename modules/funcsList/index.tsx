import React, { FC, useEffect, useState } from "react";
import { UI } from '@hyext/hy-ui'
import './index.hycss'
import { useHandler } from "../../hooks/useHandler";
import { isStreamer } from "../../constants/common";

const { View, Text, Button, Tab } = UI

const externalUrl = "https://baidu.com";
const dyScheme = "snssdk1128://setting"

export const FuncsList: FC<{}> = (props) => {
  const { apiRes, setApiRes, handlerInterrupter } = useHandler();

  const getUserInfo = async () => {
    const res = await hyExt.context.getUserInfo();
    return res;
  }
  const getJwtInfo = async () => {
    const res = await hyExt.vip.getJWT({
      anonymous: false,
    });
    return res;
  }
  const openOuterBrowser = async () => {
    const res = await hyExt.context.openExternalUrl({
      url: externalUrl
    })
    return res;
  }
  const openWebview = async () => {
    const res = await hyExt.device.openWebView({
      url: externalUrl,
      layout: {
        width: 300,
        height: 700,
      }
    })
    return res;
  }
  const openAdvanceUrl = async () => {
    const res = await hyExt.advance.openUrl({
      url: externalUrl,
    })
    return res;
  }
  const openApp = async () => {
    const res = await hyExt.context.openExternalUrl({
      url: dyScheme,
    })
    return res;
  }
  const showEntrance = async () => {
    const res = await hyExt.action.showEntrance({
      extTypes: 'web_video_com,app_panel',
      cornerMarkId: "fire",
      countDown: 5,
    })
    return res;
  }
  const hideEntrance = async () => {
    const res = await hyExt.action.hideEntrance({
      extTypes: 'web_video_com,app_panel',
    })
    return res;
  }
  /**
   * @双端都报错 
   * 
   * {"code":9005,"msg":"该操作仅支持虎牙主站面板(web_video_com)小程序类型","api":"HYExtAction.localControlPanelVisible"
  */
  const openPanel = async () => {
    const res = await hyExt.action.localControlPanelVisible({
      extType: 'web_video_com,',
      visible: true,
    })
    return res;
  }
  /** 同上 */
  const closePanel = async () => {
    const res = await hyExt.action.localControlPanelVisible({
      extType: 'web_video_com,',
      visible: false,
    })
    return res;
  }
  const showPopup = async () => {
    const res = await hyExt.action.localControlPanelLoad({ extType: "web_popup", load: true })
    return res;
  }
  const hidePopup = async () => {
    const res = await hyExt.action.localControlPanelLoad({ extType: "web_popup", load: false })
    return res;
  }
  const showPopupOfUp = async () => {
    const res = await hyExt.backend.commonOperate({
      key: 'controlPanelLoad',
      param: {
        extTypes: 'web_popup',
        visible: true,
      },
    })
    return res;
  }
  const hidePopupOfUp = async () => {
    const res = await hyExt.backend.commonOperate({
      key: 'controlPanelLoad',
      param: {
        extTypes: 'web_popup',
        visible: false,
      },
    })
    return res;
  }
  const leadBarrage = async () => {
    const res = await hyExt.context.leadBarrage()
    return res;
  }
  const listenBarrage = async () => {
    const res = await hyExt.context.onBarrageChange({
      // 这里的筛选无效，callback 会返回所有弹幕
      content: "参加LOL比赛",
      fansLevel: 3,
    }, (barrageInfo) => {
      setApiRes({
        ...barrageInfo,
        '0': '-----这是弹幕数据-----',
      });
    })
    return res;
  }
  const unListenBarrage = async () => {
    const res = await hyExt.context.offBarrageChange()
    return res;
  }

  /**
   * - 观众和主播都能发送消息
   */
  const sendMsg = async () => {
    const res = await hyExt.observer.emit('helloMsg', `${new Date().toTimeString()}——我知道你很急，但你先别急。`)
    return res;
  }
  /**
   * - 主播不能监听消息
   * - 观众既能发消息也能听消息
   */
  const listenMsg = async () => {
    const res = hyExt.observer.on('helloMsg', (rec) => {
      setApiRes(rec);
    })
    return res;
  }
  const unListenMsg = async () => {
    const res = hyExt.observer.off('helloMsg', (rec) => {
      setApiRes(rec);
    })
    return res;
  }
  /**
   * @事件监听
   */
  const listenEvent = async () => {
    const res = hyExt.context.on('activated', (rec) => {
      setApiRes(rec);
    })
    return res;
  }
  const unListenEvent = async () => {
    const res = hyExt.context.off('activated', (rec) => {
      setApiRes(rec);
    })
    return res;
  }


  const funcs = [
    { name: '用户信息', handler: getUserInfo },
    { name: '鉴权信息', handler: getJwtInfo },
    { name: '打开外部浏览器', handler: openOuterBrowser },
    { name: '打开指定APP（API 同上）', handler: openApp },
    { name: '打开webview', handler: openWebview },
    { name: '打开指定URL', handler: openAdvanceUrl },
    { name: '[observe]发送消息', handler: sendMsg },
    { name: '[content]事件监听', handler: listenEvent },
    { name: '[content]取消事件监听', handler: unListenEvent },
  ]
  const viewerFuncs = [
    { name: '显示小程序', handler: showPopup },
    { name: '隐藏小程序', handler: hidePopup },
    { name: '引导发送弹幕', handler: leadBarrage },
    { name: '监听弹幕', handler: listenBarrage },
    { name: '取消监听弹幕', handler: unListenBarrage },
    { name: '[observe]监听消息', handler: listenMsg },
    { name: '[observe]取消监听消息', handler: unListenMsg },
  ]
  const upFuncs = [
    { name: '显示观众端小程序入口', handler: showEntrance },
    { name: '隐藏观众端小程序入口', handler: hideEntrance },
    { name: '显示观众端小程序页面', handler: showPopupOfUp },
    { name: '隐藏观众端小程序页面', handler: hidePopupOfUp },
    // { name: '打开面板', handler: openPanel },
    // { name: '关闭面板', handler: closePanel },
  ]
  /// NOTE - 以下为 tabs
  const commonTabs = [
    {
      value: 1,
      label: '通用',
      funcs,
    },]
  const viewerTabs = [
    ...commonTabs,
    {
      value: 2,
      label: '观众端',
      funcs: viewerFuncs,
    },
  ]
  const streamerTabs = [
    ...commonTabs,
    {
      value: 3,
      label: '主播端',
      funcs: upFuncs,
    },
  ]
  const [tabs, setTabs] = useState(viewerTabs);
  const [curTab, setCurTab] = useState(1)
  useEffect(() => {
    if (isStreamer) {
      setTabs(streamerTabs)
    }
  }, [isStreamer])
  /// NOTE - 以上为 tabs
  return (
    <View className="container">
      <Tab
        value={curTab}
        data={tabs}
        onChange={(item:any) => {
          setCurTab(item.value)
        }}
        style={{
          marginBottom: 20,
        }}
        activeColor="#188afa"
      />
      {tabs.map(tab => (
        curTab === tab.value ? <View key={tab.value}>
        {tab.funcs.map((func) =>
          <Button className="button" key={func.name} type="info" size="sm" onPress={() => handlerInterrupter(func.handler)}>
            {func.name}
          </Button>)
        }
      </View>: <></>
      ))}
      {apiRes ? <>
        <Text className="result">
          {JSON.stringify(apiRes)}
        </Text>
      </> : <></>}
    </View>
  )
}