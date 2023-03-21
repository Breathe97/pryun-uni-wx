# pr-ui

## 说明

1.  本组件只支持vue3 并且只支持微信小程序。（没有计划兼容其他端，因为即使兼容了，也会导致包体积臃肿，与本人初衷相斥）
2.  组件完成度不高。但是你得相信，每一个组件都是独立的，你甚至可以直接复制到你自己的components，然后就可以使用，当然你完全可以在此基础上扩展一些你需要的东西，在pr-ui没有正式完善前，我只能这样来保证你们的可用性。
3.  请注意文档不会很友好，因为实在没有那么多时间去维护，如果有更多的时间 我认为应该是优先去完善pr-ui。
4.  我相信你有一定的阅读能力，我尽力充实了所有的注释。（致敬uview作者，擅于阅读别人的源码可能这将很利于你的学习。）
5.  欢迎关注PR云社区（围绕pr-ui开发的一个相互学习的平台，目前它还处于规划期，它还有很长的路要走。但值得期待的是，它将完全使用pr-ui来开发的，所以你能看到的就是你能做到的。）
6.  目前可用的组件可能不会很多，但是在我看来它们都是一些很重要的组件（pr-ui不会扩展如button、tag类似的组件）：pr-action-sheet、pr-calendar、pr-card、pr-icon、pr-modal、pr-navbar、pr-row-cell、pr-switch、pr-tabbar、pr-verification-code
7.	ts的类型相关申明可能很low，因为ts也只是学习阶段，HBuilderX对ts的支持也不太友好，所以偷懒了。还请大神们口下留情。

## PR云社区

通过微信扫码你可以看到目前的PR云社区，尽管它是未完成的。
<br>
<br>
<img src="https://pryun.vip/img/pryun.jpg" width="220" height="220" />

## 未来规划

> pr-ui会专注微信小程序领域，目前没有兼容其他端的想法，但是如果你想用来来完成一个完美的微信小程序，那么它可能是最好的选择。
> 曾经的我，也想过写一套全端兼容的ui库，但实际上两年后的我看来，它并不是那么容易的（尤其是nvue在安卓和ios的差异性）。再加上我对性能和表现的苛刻，因此我决定放弃nvue，放弃vue2，在我看来该抛弃的就不应该留恋（感情除外）。
> 但是值得期待的是，pr-ui会朝着90%还原ios交互靠齐（当然这必须保证性能和可用性的基础上进行）。
> 在pr-ui的基础上，我将扩建一个社区，用来一起学习成长，当然 它不能太混乱。核心只能是uniapp、微信小程序、wxs、vue3、pr-ui。

## 使用方法

#### 配置easycom规则
```json
	"easycom": {
		"autoscan": true,
		"custom": {
			"^pr-(.*)": "@/pr-ui/components/pr-$1/pr-$1.vue"
		}
	}
```

#### 页面使用
```html
	<pr-calendar v-model="calendarShow" :mode="options['mode']" :time="options['time']"></pr-calendar>
```

#### 配置项
```js
	import { ref, computed } from 'vue'
	const options = ref({
		mode: 'radio',
		time: '',
	})
	const calendarShow = ref(false)
```

### 暗黑模式说明
本插件完全适配暗黑模式，如果你的小程序适配也希望适配它，请查阅以下说明。

#### 开启暗黑模式
1、在 manifest.json 文件中手动配置,并且在你的项目根目录创建theme.json,并且按需修改pages.json的动态主题引入，具体请查阅微信官方[暗黑适配](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/theme.html)。
```json
"mp-weixin": {
	"darkmode" : true, // 开启暗黑模式
	"themeLocation" : "theme.json", // 主题颜色配置
}
```

2、在App.vue引入pr-ui的内置样式。
```css
	@import './pr-ui/styles/color.css';
```
3、使用媒体查询来适配你自定义的页面主题
```css
	.pr-page {
		background-color: rgba(0, 0, 0, 1);
	}
	@media (prefers-color-scheme: dark) {
		.pr-page {
			background-color: rgba(0, 0, 0, 1);
		}
	}
```

### 注意事项
1. 因插件自动适配暗黑，在某些组件调用了 @media (prefers-color-scheme: dark),并对图标进行颜色反转。如果你不需要，你需要在组件props中配置参数 <font color="#0097ff">:autoTheme="false"</font> 
2. 你可能需要在tsconfig.json配置以下的d.ts文件支持（不配置不会影响程序正常运行，只会在你编辑pr-ui的组件时会有警告）。而vite-env.d.ts 是vite在默认模板就会生成，但是uni官方中没有，所以我这里也配置了，方便开发者自行扩展。
```json
// tsconfig.json
"types": ["vite-env", "pr-ui/pr"]
```
3. 如果你想在pr-ui的基础上定制自己的一些主题，那么你应该复制一份<font color="#0097ff">color.css</font> 为 <font color="#0097ff">color_custom.css</font>，然后引入。（这个应该不难理解吧） 

## 代码仓库
PR云社区是开源的，你可以在此基础上学习，希望能帮到你。 [gitee](https://gitee.com/breathe97/pryun-uni-wx)
<br />另外开放PR云社区服务端的部分接口，以便大家学习，且用且珍惜！！！ [PR云在线接口文档](http://api.pryun.vip) 

## 贡献
breathe