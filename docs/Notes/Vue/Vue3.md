---
lang: zh-CN
title: Vue3
description: 关键功能
collapsible: true
---
# Vue3

## Vue3做了哪些优化

 1. 响应式上vue3基于proxy，vue2基于defineproperty。
 2. vue3组件树树结构打平，vue3引入一个概念“区块”，内部结构是稳定的一个部分可被称之为一个区块。每一个块都会追踪其所有带更新类型标记的后代节点 (不只是直接子节点)。
```html
<div> <!-- root block -->
  <div>...</div>         <!-- 不会追踪 -->
  <div :id="id"></div>   <!-- 要追踪 -->
  <div>                  <!-- 不会追踪 -->
    <div>{{ bar }}</div> <!-- 要追踪 -->
  </div>
</div>
```
将会打平为一个数组，仅包含所有动态的后代节点。当这个组件需要重渲染时，只需要遍历这个打平的树而非整棵树。这也就是我们所说的树结构打平，这大大减少了我们在虚拟 DOM 协调时需要遍历的节点数量。模板中任何的静态部分都会被高效地略过。（v-if 和 v-for 指令会创建新的区块节点）
```javascript
div (block root)
- div 带有 :id 绑定
- div 带有 {{ bar }} 绑定
```

 3. vue3更新了类型标记，对于单个有动态绑定的元素来说，可以在编译时推断出大量信息，在为这些元素生成渲染函数时，Vue 在 vnode 创建调用中直接编码了每个元素所需的更新类型。
```html
<!-- 仅含 class 绑定 -->
<div :class="{ active }"></div>
```
将会被编译成如下所示
```javascript
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", {
      class: _normalizeClass({ active: _ctx.active })
    }, null, 2 /* CLASS类型标记 */),
    _createElementVNode("input", {
      id: _ctx.id,
      value: _ctx.value
    }, null, 8 /* PROPS类型标记 */, ["id", "value"]),
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT类型标记 */)
  ], 64 /* STABLE_FRAGMENT */))
}
// 渲染器会使用位运算检查标记来确定执行哪个对应操作
if (vnode.patchFlag & PatchFlags.CLASS /* 2 */) {
  // 更新节点的 CSS class
}
```

 3. vue3预字符串化（当有多个连续的静态节点，这些静态节点会直接通过 innerHTML 来挂载。同时还会在初次挂载后缓存相应的 DOM 节点。如果这部分内容在应用中其他地方被重用，那么将会使用原生的 cloneNode() 方法来克隆新的 DOM 节点，这会非常高效。）
```html
<div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div>{{ dynamic }}</div>
</div>
```
将会被编译成如下所示

```javascript
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div>", 5)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```

 3. vue3加入了静态提升等优化手段，并优化了编译器，加快了sfc的变异速度。
例如下面的html

```html
<div>
  <div>foo</div> <!-- hoisted -->
  <div>bar</div> <!-- hoisted -->
  <div>{{ dynamic }}</div>
</div>
```
将会被编译成如下所示
```javascript
import { createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createElementVNode("div", null, "foo", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createElementVNode("div", null, "bar", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    _createCommentVNode(" hoisted "),
    _hoisted_2,
    _createCommentVNode(" hoisted "),
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```

  3. vue3引入了自定义渲染器，将渲染和平台解耦，拥有更好的跨平台特性。（例如uniapp使用vue2需要改动源码）。
  4. vue3利用组合式api实现逻辑复用。（利于tree shaking，Vue2中很多方法挂载到了实例中导致没有使用也会被打包；逻辑清晰vue2利用混入实现逻辑复用导致代码维护相对复杂）
  5. vue3代码采用Monorepo的方式去维护，可以更方便扩展和维护项目对于框架开发者。
  6. vue2采用双端diff，vue3采用首尾比较，用最长递增子序列算法快速找到需要移动节点的位置，有更好的性能。
  7. vue3支持多根节点（vue3组件中出现多个根节点，则会自动创建fragment节点把组件中的根节点作为自己的children，在patch时如果发现fragment则会开始遍历children）。
  8. 缓存内联事件处理函数例如`@click=falg = !flag`。避免造成不必要的组件更新（每次重新渲染，组件都会创建一个全新的props对象，同时props对象中的该内联事件函数也是全新的函数。这导致渲染器对组件进行更新造成额外的性能开销）。
 9. `v-once`指令会缓存全部或部分虚拟结点，避免组件更新重新创建虚拟DOM以及无意义的Diff操作。




## react和vue区别

 1. react没有vue这样细粒度的更新，因此当视图的数据发生变化react会进行全量更新，由于js单线程，这种全量更新会占用主线程，导致浏览器无法响应客户的行为。react采用fiber架构，通过链表结构存储数据，利用树形结构组织fiber节点，每个fiber节点都可以作为一个执行单元。react划分任务优先级，优先响应用户行为，实现了类似于协程的效果。
 2. Vue在渲染过程中，会跟踪每一个组件的依赖关系，以组件的粒度进行重新渲染，不需要便利渲染整个组件树；

1. 响应式用proxy，并采用懒劫持的方式。

2. style中可以用`v-bind()`绑定响应式数据。

3. diff算法采用最长递增子序列效率更高。 

   







## 同构渲染

当首次访问或者刷新页面时，整个页面的内容是在服务端完成渲染的，浏览器最终得到的是渲染好的 HTML 页面。但是该页面是纯静态的，这意味着用户还不能与页面进行任何交互，因为整个应用程序的脚本还没有加载和执行。

第一次请求之后客户端 JavaScript 资源加载完毕后，会进行激活操作，这里的激活就是我们在 Vue.js 中常说的 “hydration”。激活包含两部分工作内容。

* **Vue.js 在当前页面已经渲染的 DOM 元素以及 Vue.js 组件所渲染的虚拟 DOM 之间建立联系。**
* **Vue.js 从 HTML 页面中提取由服务端序列化后发送过来的数据，用以初始化整个 Vue.js 应用程序。**

激活完成后，整个应用程序已经完全被 Vue.js 接管为 CSR 应用程序了。后续操作都会按照 CSR 应用程序的流程来执行。当然，如果刷新页面，仍然会进行服务端渲染，然后再进行激活，如此往复。



<CommentService/>