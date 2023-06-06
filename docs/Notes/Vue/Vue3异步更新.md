---
lang: zh-CN
title: Vue3异步更新
description: 关键功能
collapsible: true
---
# Vue3异步更新

Vue3的异步更新由`scheduler`调度程序执行具体任务，以保证生命周期和组件渲染的正确性。

Vue3中scheduler维护三个队列`pre/queue/ post`

|          | Pre队列                | queue队列                        | Post队列               |
| -------- | ---------------------- | -------------------------------- | ---------------------- |
| 队列作用 | 执行组件更新之前的任务 | 执行组件更新时的任务             | 执行组件更新之后的任务 |
| 出队方式 | 先进先出               | 允许插队，按任务id从小大排列执行 | 按任务id从小大排列执行 |



## pre队列任务

这个队列的任务只有`watch`和`watchEffect`，当它两没有指定`{post}`时默认就是pre

~~~ ts
function doWatch() {
  ...
  let scheduler: EffectScheduler
  if (flush === 'sync') {
    scheduler = job as any // the scheduler function gets called directly
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
  } else {
    // default: 'pre'
    # watch和watchEffect的回调默认是pre任务
    job.pre = true
    if (instance) job.id = instance.uid
    scheduler = () => queueJob(job)
  }
  ...
}
~~~











<CommentService/>