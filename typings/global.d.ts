declare module '@hyext/router'
declare module '*.png'
declare module '@hyext-beyond/hy-ui-native'
declare module '@hyext-beyond/core'

declare interface ChildrenProps {
  children?: React.ReactNode
  [key: string]: any
}

declare interface ExtraStyleProps {
  extraStyle?: any
}

declare var __HYEXT_IS_PC__: boolean
declare var __HYEXT_IS_WEB__: boolean
declare var __HYEXT_IS_APP__: boolean
declare var __HYEXT_IS_ZS__: boolean
declare var __HYEXT_IS_POPUP__: boolean
declare var __HYEXT_IS_PANEL__: boolean
declare var __HYEXT_IS_VIEWER__: boolean
declare var __HYEXT_IS_STREAMER__: boolean
declare var __HYEXT_IS_INNER__: boolean

declare var __os: 'web' | 'ios' | 'android'
declare var __device: { width: number; height: number }

type Optional<U, T extends keyof U> = {
  [P in Exclude<keyof U, T>]: U[P]
} &
  {
    [P in T]?: U[P]
  }

type ToValues<U, T extends keyof U> = U[T] // 获取值的联合类型

type ToValMap<C extends number | string, U = any, T extends C = C> = {
  [P in T]: U
} // 通过遍历联合类型，转成新的对象
