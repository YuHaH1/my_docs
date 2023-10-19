---
lang: zh-CN
title: js中遇到的问题
description: 关键功能
collapsible: true
---
# js中遇到的问题

## 1.字符串表情问题

在抖音遇到的一个有趣的问题

~~~js
const str = '😊😔🆒😀'
console.log(str.length)
console.log(str[0])
console.log(str.substring(1, 3))
输出结果是
8
�
��
~~~

每个文字都对应一个数字，表情也是文字所以也是如此。js编码使用`utf-16`所以每个字符串占16位也就是两个字节。能存的范围是`2^16=0-65535`。

而对于一些文字和表情，他们的存储空间超过65535个字节范围，遇到存储不下的情况就需要用两个16位存储也就是2^32的范围。

而一个16位的存储单位成为**码元**`Code Unit`，而一个文字可能占1个16位也有可能2个16位，这个称为**码点**`Code Point`，因此一个完整字符是**码点**

为什么输出结果是上面的情况？现在我们知道是因为上面访问的都是**码元**，而上面表情的码点都占了2个16位。

~~~js
const str = "🦌a😀😊🐟"
String.prototype.pointLength = function () {
    let length = 0
    for (let i = 0; i < this.length;){
        const point = this.codePointAt(i)
        i += point > 65535?2:1
        length++
    }
    return length
}
String.prototype.pointAt = function (index) {
    let current = 0
    let res = void 0
    for (let i = 0; i < this.length;){
        const point = this.codePointAt(i)
        if (current === index) {
            // 将码点转成字符
            res = String.fromCodePoint(point)
        }
        i += point > 65535 ? 2 : 1
        current++
    }
    return res
}
String.prototype.slice = function (start, end) { 
    let res = ''
    for (let i = start; i < end; i++){
        res += this.pointAt.call(this,i)
    }
    return res
}
console.log(str.pointLength())
console.log(str.pointAt(1))
console.log(str.slice(0,3))
输出结果
5
a
🦌a😀
~~~



## 2.如何记录用户信息-canvas

cookie存在被禁止或者跨域无法访问的问题

canvas会获取设备、操作系统、浏览器唯一标识进行三合一

~~~js
const uuid = ()=>{
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const txt = 'test'
    ctx.fillText(txt,10,10)
    //这个base64就存放这三合一标识，这里可以使用md5进行压缩或者crypto
    return canvas.toDataURL()
}
~~~

## 3.Ajax和fetch取消请求的方式

为什么需要取消请求？有时候对于一个接口短时间的重复调用该接口是没意义的。

### 3.1、fetch取消

`AbortController。signal`属性获取到它的关联对象的引用，当fetch请求初始化时，将信号作为选项传入，然后通过 `controller.abort();`就可以终止该请求

~~~js
const controller = new AbortController();
const signal = controller.signal;

const downloadBtn = document.querySelector(".download");
const abortBtn = document.querySelector(".abort");

downloadBtn.addEventListener("click", fetchVideo);

abortBtn.addEventListener("click", () => {
  controller.abort();
  console.log("Download aborted");
});

function fetchVideo() {
  fetch(url, { signal })
    .then((response) => {
      console.log("Download complete", response);
    })
    .catch((err) => {
      console.error(`Download error: ${err.message}`);
    });
}
~~~

### 3.2、Ajax取消

~~~js
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
xhr.open(method, url, true);

xhr.send();

if (OH_NOES_WE_NEED_TO_CANCEL_RIGHT_NOW_OR_ELSE) {
  xhr.abort();
}
~~~



## 4、页面更新自动刷新页面

如果用户长时间误操作，页面可能会更新，可以提示用户刷新页面

思路，比对script的src采用观察者模式，观察到页面变化重载页面。前端通过轮询去做这里使用的。

通过访问器暂停和启动对页面的观察。

通过代理实现单例模式。



~~~ts

import type { IOptions } from '../types'
declare const VERSION: string
const regSrc = /<script.*src=["'](?<src>[^"']+)/gm
class Updater {
  oldSrcList: string[]
  version: string
  url: string
  cb: IOptions['cb']
  time: number
  needUpdate: boolean
  lastTime: number
  #updateEvent: Event | null
  #stop: boolean
  #id: number
  constructor(options: IOptions | null) {
    this.#id = 0
    this.url = options?.url || '/'
    this.#updateEvent = null
    this.#stop = false
    this.initEvent()
    this.version = VERSION
    this.cb = options?.cb
    this.watch()
    this.oldSrcList = []
    this.lastTime = new Date().getTime()
    this.needUpdate = false
    this.time = options?.time || 5 * 1000 * 60
  }

  get stop() {
    return this.#stop
  }

  set stop(value) {
    if (typeof value !== 'boolean')
      console.warn('if you want to stop check please set stop with boolean')
    this.#stop = value
    if (this.#stop) {
      cancelIdleCallback(this.#id)
      window.removeEventListener('auto-update', this.handleAutoUpdate)
    }
    else {
      // 初始化事件
      this.initEvent()
      this.watch()
    }
  }

  watch = () => {
    this.#id = requestIdleCallback(() => {
      const now = new Date().getTime()
      if (now - this.lastTime >= this.time) {
        this.lastTime = now
        this.main()
      }
      else {
        this.watch()
      }
    })
  }

  handleAutoUpdate = () => {
    this.cb && this.cb()
    if (!this.cb) {
      requestAnimationFrame(() => {
        location.reload()
      })
    }
  }

  initEvent = () => {
    this.#updateEvent = new Event('auto-update')
    window.addEventListener('auto-update', this.handleAutoUpdate)
  }

  // 拉取html内容
  fetchFileContent = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      // 防止缓存加上时间戳
      fetch(`${this.url}?timestamp=${Date.now()}`).then(res => res.text()).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  checkChange = (res: Array<string>) => {
    if (this.oldSrcList.join('') === res.join('')) { this.needUpdate = false }
    else {
      this.oldSrcList = res
      this.needUpdate = true
    }
  }

  getScriptSrc = (content: string) => {
    const res = content.match(regSrc)
    if (res && res.length) {
      if (!this.oldSrcList.length)// 首次
        this.oldSrcList.push(...res)
      this.checkChange(res)
    }
    else {
      console.warn('don\'t find script src')
    }
  }

  checkUpdate = (): void => {
    if (!this.needUpdate) return
    this.#updateEvent && window.dispatchEvent(this.#updateEvent)
  }

  main = async () => {
    try {
      // 获取index.html的字符串
      const res = await this.fetchFileContent()
      // 解析字符串并保存
      this.getScriptSrc(res)
      // 检查是否需要更新
      this.checkUpdate()
      // 轮询
      this.watch()
    }
    catch (error) {
      console.warn(error)
    }
  }
}

// 单例
let instance: Updater | null = null
const proxyUpdater = new Proxy(Updater, {
  construct(Target, args: any[]) {
    const arg = {
      ...args[0],
    }
    if (!instance)
      instance = new Target(arg as IOptions)
    return instance
  },
})
export default proxyUpdater

~~~





## 5.用户输入法按enter会触发提交事件

[参考文章](https://www.zhangxinxu.com/wordpress/2023/02/js-enter-submit-compositionupdate/)







## Vuepress展示数学公式

在`config.js`中配置如下

~~~js
import katex from 'markdown-it-katex'
export default defineUserConfig({
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
        ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
    ],
    extendsMarkdown(md) {
        md.set({ html: true });
        md.use(katex);
    },
})
~~~





<CommentService/>