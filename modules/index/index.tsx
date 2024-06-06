import React, { useState, FC, useEffect } from "react";
import { UI } from '@hyext/hy-ui'
import { router, routes } from '../../constants/router';

const { View, Button } = UI

export const Index: FC<{}> = () => {
  const handleRouter = (path: string) => {
    router.history.push(path)
  }
  return (
    <View style={{
      padding: 20,
    }}>
      {routes.map(route => <Button style={{
        marginBottom: 10,
      }} key={route.path} type="info" onPress={() => handleRouter(route.path)}>{route.name}</Button>)}
    </View>
  )
}