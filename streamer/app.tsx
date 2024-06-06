import React, {useEffect} from 'react'
import './app.hycss'
import App from "../viewer/app"
import { router } from '../constants/router'
import { useAppInit } from '../hooks/common'

const StreamerApp:React.FC<{}> = () => {
  const { setEnv } = useAppInit()

  useEffect(() => {
    // setEnv();
  }, [])
  return <App isStreamer />
}
export default StreamerApp
