// /// <reference types="vite/client" />

// declare module "*.vue" {
// 	import Vue from "vue";
// 	export default Vue;
// }

// declare module '*.vue' {
// 	import type { DefineComponent } from 'vue'
// 	const component: DefineComponent<{}, {}, any>
// 	export default component
// }

// 忽略其他类型定义
declare module '*.js'
declare module '*.gif'
declare module '*.png'
declare module '*.jpg'
