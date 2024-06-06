import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui';
import '../../../styles/index.hycss';
import { type Dialog as TypeDialog, type Form as TypeForm } from "@hyext/hy-ui/dist/types/components";
import { ViewerInfo } from '../../../constants/common'

const { View, Button, Text, Tab, Avatar, Tag, Dialog } = UI;

export const StreamerGuardianFc: FC<{}> = () => {
  const [curDialog, setCurDialog] = useState<TypeDialog | null>(null)

  const handleGuardian = () => {
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
          <Text style={{ marginTop: 5, color: '#999' }}>为你开通了【超级守护】，正在等待你与他开黑 1 个直播天！</Text>
        </View>
        <Button type="primary" size="sm" style={{
          paddingTop: 5,
          paddingBottom: 5,
        }} onPress={handleGuardian}>查看角色</Button>
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