import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui';
import '../../../styles/index.hycss';
import { type Dialog as TypeDialog, type Form as TypeForm } from "@hyext/hy-ui/dist/types/components";
import { ViewerInfo } from '../../../constants/common'

const { View, Button, Text, Tab, Avatar, Tag, Dialog } = UI;

export const StreamerEasterEggFc: FC<{}> = () => {
  const [curDialog, setCurDialog] = useState<TypeDialog | null>(null)

  const handleEasterEgg = () => {
    curDialog?.open();
  }
  return (
    <>
      <View style={{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: "center"
      }}>
        <Avatar src={ViewerInfo.userAvatarUrl} size="m" border={false}></Avatar>
        <View style={{
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1,
        }}>
          <Text style={{ fontSize: 16, }}>{ViewerInfo.userNick}</Text>
          <Text style={{ marginTop: 5, color: '#999' }}>送了你一个礼物并抽中了【主播亲密么么哒 * 1】</Text>
        </View>
      </View>
      <View style={{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: "center"
      }}>
        <Avatar src="https://gallary.ithen.cn/images/2024/04/18/1f04f65f72c016d07b713608d3efe1c0.th.jpg" size="m" border={false}></Avatar>
        <View style={{
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1,
        }}>
          <Text style={{ fontSize: 16, }}>悠米</Text>
          <Text style={{ marginTop: 5, color: '#999' }}>送了你一个礼物并抽中了【主播亲密么么哒 * 1】</Text>
        </View>
      </View>
      <View style={{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: "center"
      }}>
        <Avatar src="https://gallary.ithen.cn/images/2023/03/27/youmi.th.jpg" size="m" border={false}></Avatar>
        <View style={{
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1,
        }}>
          <Text style={{ fontSize: 16, }}>疾风剑豪</Text>
          <Text style={{ marginTop: 5, color: '#999' }}>送了你一个礼物并抽中了【神龙尊者亚索皮肤 * 1】</Text>
        </View>
      </View>
      {/* @ts-ignore */}
      <Dialog
        ref={(c) => {
          setCurDialog(c)
        }}
        title="账号信息"
        body={<View style={{ padding: 20 }}>
          <Text className="text">角色：鼠鼠熬夜</Text>
        </View>}
        cancelable={true}
        cancelCallback={() => {
          console.log('cancel')
        }}
        confirmCallback={() => {
          console.log('confirm')
        }}
      >
      </Dialog>
    </>
  )
}