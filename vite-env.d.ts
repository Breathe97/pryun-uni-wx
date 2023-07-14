/// <reference types="vite/client" />
// vue.d.ts 处理 识别 .vue 文件
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 忽略其他类型定义
declare module '*.js'
declare module '*.gif'
declare module '*.png'
declare module '*.jpg'