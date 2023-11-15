export const data = JSON.parse("{\"key\":\"v-66264868\",\"path\":\"/Notes/Vue/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.html\",\"title\":\"响应式原理\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"响应式原理\",\"description\":\"关键功能\",\"collapsible\":true},\"headers\":[{\"level\":2,\"title\":\"1.Vue2\",\"slug\":\"_1-vue2\",\"link\":\"#_1-vue2\",\"children\":[{\"level\":3,\"title\":\"数组的响应式\",\"slug\":\"数组的响应式\",\"link\":\"#数组的响应式\",\"children\":[]}]},{\"level\":2,\"title\":\"2.Vue3\",\"slug\":\"_2-vue3\",\"link\":\"#_2-vue3\",\"children\":[{\"level\":3,\"title\":\"1.Effect\",\"slug\":\"_1-effect\",\"link\":\"#_1-effect\",\"children\":[]},{\"level\":3,\"title\":\"2.Ref\",\"slug\":\"_2-ref\",\"link\":\"#_2-ref\",\"children\":[]},{\"level\":3,\"title\":\"3.Reactive\",\"slug\":\"_3-reactive\",\"link\":\"#_3-reactive\",\"children\":[]},{\"level\":3,\"title\":\"4.computed原理\",\"slug\":\"_4-computed原理\",\"link\":\"#_4-computed原理\",\"children\":[]},{\"level\":3,\"title\":\"5.watch原理\",\"slug\":\"_5-watch原理\",\"link\":\"#_5-watch原理\",\"children\":[{\"level\":4,\"title\":\"doWatch\",\"slug\":\"dowatch\",\"link\":\"#dowatch\",\"children\":[]},{\"level\":4,\"title\":\"traverse遍历函数\",\"slug\":\"traverse遍历函数\",\"link\":\"#traverse遍历函数\",\"children\":[]}]},{\"level\":3,\"title\":\"6.关于响应式中一些问题和解决思路\",\"slug\":\"_6-关于响应式中一些问题和解决思路\",\"link\":\"#_6-关于响应式中一些问题和解决思路\",\"children\":[{\"level\":4,\"title\":\"①如何收集当前依赖呢？\",\"slug\":\"_1如何收集当前依赖呢\",\"link\":\"#_1如何收集当前依赖呢\",\"children\":[]},{\"level\":4,\"title\":\"②为什么收集依赖不直接收集整个对象依赖而要建立对象的key和依赖直接关系？例如下面，为什么不将test的依赖全部放在一个数组中而是给name和age都用set存储对应依赖。\",\"slug\":\"_2为什么收集依赖不直接收集整个对象依赖而要建立对象的key和依赖直接关系-例如下面-为什么不将test的依赖全部放在一个数组中而是给name和age都用set存储对应依赖。\",\"link\":\"#_2为什么收集依赖不直接收集整个对象依赖而要建立对象的key和依赖直接关系-例如下面-为什么不将test的依赖全部放在一个数组中而是给name和age都用set存储对应依赖。\",\"children\":[]},{\"level\":4,\"title\":\"③如何避免在依赖收集和触发过程中栈溢出\",\"slug\":\"_3如何避免在依赖收集和触发过程中栈溢出\",\"link\":\"#_3如何避免在依赖收集和触发过程中栈溢出\",\"children\":[]},{\"level\":4,\"title\":\"④调度器\",\"slug\":\"_4调度器\",\"link\":\"#_4调度器\",\"children\":[]}]}]},{\"level\":2,\"title\":\"ReactiveEffect\",\"slug\":\"reactiveeffect\",\"link\":\"#reactiveeffect\",\"children\":[{\"level\":3,\"title\":\"依赖方法\",\"slug\":\"依赖方法\",\"link\":\"#依赖方法\",\"children\":[]}]}],\"git\":{\"updatedTime\":1698570598000,\"contributors\":[{\"name\":\"余瑞\",\"email\":\"1074121761@qq.com\",\"commits\":4}]},\"filePathRelative\":\"Notes/Vue/响应式原理.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
