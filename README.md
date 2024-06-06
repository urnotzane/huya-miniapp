# huya-miniapp

虎牙小程序开发Demo。

## QA
Q: 出现相关 className 的TS语法错误怎么办？
A: 打开vscode控制台，输入`restart ts server`, 重启本地ts服务就行。

# 出现的问题
- 弹窗如 modal、bottomModal 不能和 Form 一起用，会导致即使 modal 已经关闭，半透明遮罩还在的情况.