---
lang: zh-CN
title: Vue内置组件
description: 关键功能
collapsible: true
---
# Vue内置组件

## 1.Transition组件

实现原理：在元素被挂载前，将动效添加到该DOM上，当元素卸载时，先将动效执行完再卸载。

~~~css
.enter-from{
    transform:translateX(200px)
}
.enter-to{
	transform:translateX(0)
}
.enter-active{
    transition:transform 1s ease-in-out
}
~~~

::: tip

由于浏览器会在当前帧绘制DOM，因此`enter-to`的样式会绘制出来而不会绘制`enter-form`，解决办法是将移除`enter-from`添加`enter-to`的动效放在下一帧去执行这里利用`requestAnimationFrame`，。然后监听`transitionend`动效结束事件，结束后移除`enter-to`和`enter-active`

:::

~~~js
el.classList.add('enter-from')
el.classList.add('enter-active')
document.body.appendChild(el)
// 嵌套是因为有时候requestAnimationFrame会在当前帧执行，这样的话动效会直接合并显示不出来enter-from的效果了
requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
        el.classList.remove('enter-from')
        el.classList.add('enter-to')
    })
})
~~~



Vue提供三个钩子`beforeEnter，enter，leave`钩子

在挂载元素之前的时候判断是否VNode需要过渡，如果需要就执行`vnode.transition.beforeEnter`,挂载后会调用`enter`钩子，卸载元素的时候执行`leave`

## 2.KeepAlive组件

KeepAlive原理

* 该组件会给默认插槽缓存下来
* 并注入`deactivated`和`activate`两个钩子
* 在VNode身上设置`shouldKeepAlive`，在卸载组件时调用`deactivate`方法
* 如果VNode已经被缓存了就会被添加上`KeptAlive`标记，渲染器在看到该属性会执行`activate`激活

对于deactivate和activate，Vue会创建一个隐藏容器，在deactivate时将VNode放到容器中，

~~~js
deactivate ->move(vnode,storageContainer)
activate -> move(vnode,storageContainer,anchor)
~~~



源码当页面创建时初始化缓存的变量

~~~ts
  created() {
    this.cache = Object.create(null)
    this.keys = []
  },
~~~

当页面挂载后缓存VNode并观察用户是否传入了include/exclude

~~~ts
mounted() {
    this.cacheVNode()
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
~~~

每当数据更新都执行方法中的cacheVNode

~~~ts
updated() {
    this.cacheVNode()
},
~~~

cacheVNode源码

~~~ts
  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance
        }
        keys.push(keyToCache)
        // prune oldest entry    当缓存的节点>最大缓存容量就删除
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },
~~~

render方法

* `render`中出路`include`和`exclude`逻辑判断默认情况`KeepAlive`会缓存所有内部组件，但用户可以指定哪些不被缓存或者只缓存哪些组件。

  `include`和`exclude`是正则/组件名/数组[组件名]，会根据该内容来匹配组件名

~~~ts
  render() {
      // 取出默认插槽的子节点
    const slot = this.$slots.default
    // 取默认插槽的根节点
    const vnode = getFirstComponentChild(slot)
    // 取根节点选项
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
        //取出name，如果存在会和include和exclude进行比对
      const name = _getComponentName(componentOptions)
      const { include, exclude } = this
      // 这里条件符合的都是exclude的，这些VNode直接渲染不进行缓存
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }
	// 缓存key
      const { cache, keys } = this
      const key =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key
      // 保持该虚拟DOM是最新的
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        remove(keys, key)
        keys.push(key)
      } else {
        // delay setting the cache until update
     	// 会在挂载和更新钩子触发时缓存
        this.vnodeToCache = vnode
        this.keyToCache = key
      }

      // @ts-expect-error can vnode.data can be undefined
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
~~~

match比较

~~~ts
function matches(
  pattern: string | RegExp | Array<string>,
  name: string
): boolean {
  if (isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}
~~~

KeepAlive使用字典，键存vnode的type，值是Vnode。**缓存会设置一个阈值，防止当该VNode没缓存时，一直设置新缓存，占大量内存。**

LRU，最近一次访问算法。通过设置max为缓存的最大容量。当容量满了后开始修剪，最近访问的不会删除，移除最长时间没有使用的缓存。

得到根节点的方法

~~~ts
export function getFirstComponentChild(
  children?: Array<VNode>
): VNode | undefined {
  if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

~~~

得到组件名的方法

~~~ts
export function getComponentName(options: ComponentOptions) {
  return options.name || options.__name || options._componentTag
}
~~~















<CommentService/>