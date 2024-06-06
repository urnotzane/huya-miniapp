import { UI } from '@hyext/hy-ui'
import React, { Component, useEffect, useState } from 'react'
import './app.hycss'
import { Route, Router } from "@hyext/router";
import { createRouter, routes, router, indexPath } from '../constants/router';
import { setIsStreamer } from '../constants/common';
import { useAppInit } from '../hooks/common';

const { View, Tag, Button, NavigationBar } = UI

const App: React.FC<{isStreamer?:boolean}> = (props) => {
  const { isWb } = useAppInit()
  const [appRouter, setAppRouter] = useState<any>();
  const [pathname, setPathname] = useState(indexPath);
  const [title, setTitle] = useState<string>()

  const back = () => {
    router.history.goBack();
  }
  useEffect(() => {
    createRouter(appRouter);
    router?.history?.listen((location: any) => {
      setPathname(location.pathname);
      const route = routes.find(r => r.path === location.pathname);
      setTitle(route?.name || '')
    })
  }, [appRouter]);
  useEffect(() => {
    setIsStreamer(!!props.isStreamer);
    
    hyExt.panel.setLayout({
      x: 0.1,
      y: 0.1,
      width: 0.3,
      height: 0.5,
      visible: true,
      animate: false,
      alpha: 1,
    }).catch((error) => {
      console.log(error);
    });
  }, [])
  return (
    <View className="container">
      {pathname !== indexPath && !isWb ? <NavigationBar onPressBack={back} title={title}></NavigationBar> : <></>}
      <Router initialEntries={[pathname]} ref={(c: any) => { setAppRouter(c) }}>
        {routes.map(route => (
            <Route key={route.path} path={route.path} component={route.component}></Route>
        ))}
      </Router>
    </View>
  )
}
export default App