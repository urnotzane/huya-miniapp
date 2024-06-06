import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import '../../../styles/index.hycss'

const { View, Button, Form, Input, Tip, Avatar, Text } = UI
interface GameRole {
  partition?: string;
  username?: string;
  pass?: string
}
const milkTea = {
  "giftId": 20377, "giftName": "奶茶",
  "giftLogo": "https://huyaimg.msstatic.com/cdnimage/actprop/20377_1__108_1594291048.jpg?77364842f1afd1074935cb1af777d4ea",
  "giftGif": "https://huyaimg.msstatic.com/cdnimage/actprop/20377_1__gif_1594137679.gif?617cee9aaa9f19fba40e3c8019f2ebf3",
  "giftPriceHuya": 0.1, "giftPriceGreenBean": 100, "giftPriceWhiteBean": -1
}
export const GiftProxyFc: FC<{}> = () => {
  const [showGamePanel, setShowGamePanel] = useState(false);
  const [curForm, setCurForm] = useState<any>();
  const [gameRole, setGameRole] = useState<GameRole>({
    username: '',
    partition: '',
    pass: '',
  });

  const handleProxy = () => {
    setShowGamePanel(!showGamePanel)
  }
  const handleSure = async() => {
    try {
      const validator = curForm?.validate();
      if (!validator.pass) {
        Tip.show("请填写完整信息");
        return;
      }
      await hyExt.context.sendGift({
        giftCount: 1,
        giftId: milkTea.giftId,
      })
      setShowGamePanel(false);
    } catch (error) {
      console.log('[handleSure]', error);
    }
  }
  const valueChange = (key: keyof GameRole, value: string) => {
    setGameRole({
      ...gameRole,
      [key]: value,
    })
  }
  return (
    <>
      <Button className="button" onPress={handleProxy} type="info">一毛钱雇佣主播</Button>
      {showGamePanel ?
        // @ts-ignore 不存在属性“children”
        <Form ref={(c) => (setCurForm(c))} data={gameRole}>
          <Form.Item
            label="账号"
            name="username"
            validate="required"
            error={["不能为空"]}
            hasLine
          >
            <Input value={gameRole.username} onChange={(v: any) => valueChange('username', v)} />
          </Form.Item>
          <Form.Item
            label="区服"
            name="partition"
            validate="required"
            error={["不能为空"]}
            hasLine
          >
            <Input value={gameRole.partition} onChange={(v: any) => valueChange('partition', v)} />
          </Form.Item>
          <Form.Item
            label="角色"
            name="pass"
            validate="required"
            error={["不能为空"]}
            hasLine
          >
            <Input value={gameRole.pass} onChange={(v: any) => valueChange('pass', v)} />
          </Form.Item>
          <Form.Item
            label="礼物"
            hasLine
          >
            <View>
              <Avatar
                size="m"
                borderColor="#f90909"
                src={milkTea.giftGif}
                border={false}
                circle={false}
              >
              </Avatar>
              <Text style={{width: 70, textAlign: 'center'}}>奶茶 * 1</Text>
            </View>
          </Form.Item>
          <Button onPress={handleSure}>确认</Button>
        </Form> : <></>
      }
    </>
  )
}
