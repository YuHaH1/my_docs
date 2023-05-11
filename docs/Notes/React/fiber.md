---
lang: zh-CN
title: Fiber
description: 介绍react 相关
collapsible: true
---

### Fiber解决了什么问题？

fiber出现之前，react的更新是会递归所有VNODE，由于JS占据主线程很长时间这导致用户的交互得不到响应，并且无法中断这个过程。而引入了fiber之后遍历DOM树可以中断并且能够断点恢复，fiber保存了diff阶段的工作进度，当遍历发生中断时，只要保留下当前节点的索引，断点是可以恢复的——因为每个节点都保持着对其父节点的索引。











### 什么是Fiber？

**React Fiber 本质上是为了解决 React 更新低效率的问题**

概念：Fiber也称为<u>**协程**</u>，协程可以理解为一个流程控制的让出机制即执行单元，在GO中协程是运行在线程上的，协程可以主动让出执行权交给另一个协程运行在当前线程上，这样做的好处弥补了将多线程占用内存的代价和来回切换线程的代价，<u>通过切换协程这样的代价小得多</u>。

React的Filber思想是，React渲染过程可以中断，并将控制权交给浏览器，在浏览器空闲时再继续渲染（这里并没有使用`requiestIdlecallback`，因为React调研过该API有时候会在20ms后执行，这会让用户觉得卡顿）React16使用`postmessage`+`requestAnimationFrame`实现类似于`requestidlecallback`的行为，React18使用`MessageChannel`实现.

浏览器一帧会做哪些？

![浏览器一帧](/React/react_fiber_frame.png)

### 任务优先级

目前 React 预定义了 5 个优先级

* `Immediate`(-1) - 这个优先级的任务会同步执行, 或者说要马上执行且不能中断
* `UserBlocking`(250ms) 这些任务一般是用户交互的结果, 需要即时得到反馈
* `Normal` (5s) 应对哪些不需要立即感受到的任务，例如网络请求
* `Low` (10s) 这些任务可以放后，但是最终应该得到执行. 例如分析通知
* `Idle` (没有超时时间) 一些没有必要做的任务 (e.g. 比如隐藏的内容), 可能会被饿死

> ### fiber为什么不使用Generator

Generator 不能在栈中间让出。比如你想在嵌套的函数调用中间让出, 首先你需要将这些函数都包装成Generator，另外这种栈中间的让出处理起来也比较麻烦，难以理解。除了语法开销，现有的生成器实现开销比较大，所以不如不用。

Generator 是有状态的, 很难在中间恢复这些状态。

> react如何中断任务的执行？

~~~js
// 1️⃣ performWork 会拿到一个Deadline，表示剩余时间
function performWork(deadline) {

  // 2️⃣ 循环取出updateQueue中的任务
  while (updateQueue.length > 0 && deadline.timeRemaining() > ENOUGH_TIME) {
    workLoop(deadline);
  }

  // 3️⃣ 如果在本次执行中，未能将所有任务执行完毕，那就再请求浏览器调度
  if (updateQueue.length > 0) {
    requestIdleCallback(performWork);
  }
}
// 保存当前的处理现场
let nextUnitOfWork: Fiber | undefined // 保存下一个需要处理的工作单元
let topWork: Fiber | undefined        // 保存第一个工作单元

function workLoop(deadline: IdleDeadline) {
  // updateQueue中获取下一个或者恢复上一次中断的执行单元
  if (nextUnitOfWork == null) {
    nextUnitOfWork = topWork = getNextUnitOfWork();
  }

  // 🔴 每执行完一个执行单元，检查一次剩余时间
  // 如果被中断，下一次执行还是从 nextUnitOfWork 开始处理
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    // 下文我们再看performUnitOfWork
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork, topWork);
  }

  // 提交工作，下文会介绍
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
}

~~~

### Fiber的数据结构

Fiber采用链表的方式，每个VDOM内部使用Fiber表示。

Fiber 包含的属性可以划分为 5 个部分:

* **结构信息** - Fiber 使用链表的形式来表示节点在树中的定位
* **节点类型信息** - tag表示节点的分类、type 保存具体的类型值，如div、MyComp
* **节点的状态** - 节点的组件实例、props、state等，它们将影响组件的输出
* **副作用** - 在 Reconciliation 过程中发现的'副作用'(变更需求)就保存在节点的`effectTag` 中(想象为打上一个标记). 那么怎么将本次渲染的所有节点副作用都收集起来呢？ 这里也使用了链表结构，在遍历过程中React会将所有有‘副作用’的节点都通过`nextEffect`连接起来
* **替身** - React 在 Reconciliation 过程中会构建一颗新的树(官方称为workInProgress tree，**WIP树**)，可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的**旧树**，React就是一边和旧树比对，一边构建WIP树的。 alternate 指向旧树的同等节点。





### Fiber工作阶段



1. **协调阶段**：可以认为是 Diff 阶段, **这个阶段可以被中断**, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'`副作用`(Effect)' . 以下生命周期钩子会在协调阶段被调用：

   * `constructor`
   * `static getDerivedStateFromProps`
   * `shouldComponentUpdate`
   * `render`

2. **提交阶段**：将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。**这个阶段必须同步执行，不能被打断**. 这些生命周期钩子在提交阶段被执行:

   * `getSnapshotBeforeUpdate()` 严格来说，这个是在进入 commit 阶段前调用
   * `componentDidMount`
   * `componentDidUpdate`
   * `componentWillUnmount`

   在协调阶段时间片如果用完就会让出控制权给浏览器。

   

   

### 提出问题

1. 为什么Vue不需要要引入Fiber呢？
   1. 个人理解：Vue的数据是响应式式的，更新粒度更细，能够知道哪里需要更新，并且Vue在编译时做了大量工作，例如静态提升，节点标记，类型标记等等。Vue想做的是极致的更新性能。因此不需要引入Fiber来任务分片。
   2. react的更新是自顶向下，该组件以及它的子组件全部需要渲染；所以当一个数据改变，react的组件渲染是很消耗性能的——父组件的状态更新了，所有的子组件得跟着一起渲染，它不能像vue一样，精确到当前组件的粒度。
2. 如何实现的断点恢复呢？
   1. react fiber这种数据结构采用链表数据结构使得节点可以回溯到其父节点，只要保留下中断的节点索引，就可以恢复之前的工作进度；
