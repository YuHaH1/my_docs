---
lang: zh-CN
title: React状态管理
description: 关键功能
collapsible: true
---
# React状态管理

| 特点           | 工具              |
| -------------- | ----------------- |
| React自带      | 状态提升、Context |
| 单项数据流     | Flux、Redux       |
| 双向数据绑定   | Mobx              |
| 原子型状态管理 | Recoil、Jotai     |
| 异步操作密集型 | Rxjs              |

![](/React/state_manager.png)

![](/React/state_2.png)

## Context

缺点

1. 难以追溯数据变化的情况
2. 组件内部耦合度太高，不利于组件复用和单测
3. 产生不必要的更新（比如：穿透memo和dependicies）
4. 只能存储单一值，无法存储多个各自拥有消费者值的集合
5. 无法细粒度区分组件依赖哪个Context
6. 多个Context会存在层层嵌套问题

使用场景：

不会频繁变更的多组件使用的数据，例如：主题色、省份、运营商列表



## Redux

Flux，利用单向数据流进行状态管理

三个重要组成

1. Action视图层发出的消息
2. Dispatcher派发者，接受Action执行回调
3. Store数据层存放状态 使用纯函数reducer更新state

::: tip

Redux中的状态是不可变的，也就是说每次状态发生变化时都会生成一个新的状态对象，而不是直接修改原始状态。这样做的好处是可以跟踪状态的历史记录，从而支持时间回溯。

:::



### 使用方式

1.创建Store对象，并暴露出去，在创建 `src/app/store.js` 文件。从 `Redux Toolkit` 引入 `configureStore` API。我们从创建一个空的 Redux store 开始，并且导出它:

~~~jsx
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {}
})
~~~

2.将创建的store对象注入

~~~jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
~~~

3.创建slice、**“slice” 是应用中单个功能的 Redux reducer 逻辑和 action 的集合**（在该文件中从 Redux Toolkit 引入 `createSlice` API。）Redux 状态对象拆分为多个状态 “slice”。（可以理解为Vuex中的module）

*  `createSlice` 函数，它负责生成 action 类型字符串、action creator 函数和 action 对象的工作。我们只需要为这个 slice 定义一个名称，编写一个包含 reducer 函数的对象，它会自动生成相应的 action 代码。`name` 选项的字符串用作每个 action 类型的第一部分，每个 reducer 函数的键名用作第二部分。因此，`"counter"` 名称 + `"increment"` reducer 函数生成了一个 action 类型 `{type: "counter/increment"}`。

* `createSlice` 还需要我们为 reducer 传入初始状态值，以便在第一次调用时就有一个 `state`。即下面代码的`initialState`,它有一个从 0 开始的 `value` 字段。

* ::: warning
  **不要尝试在 `createSlice` 之外更改任何数据！**

  :::

~~~js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0
  }
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
~~~

4.将slice Reducers添加到第一步创建的Sotre中

~~~js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
~~~

5.组件中使用方式（用dispatch来派发`counterSlice.actions`身上的方法）

* 当调用时`counterSlice.actions.increment()`等价于`{type: "counter/increment"}`
* `useSelector`这个 hooks 让我们的组件从 Redux 的 store 状态树中提取它需要的任何数据。Redux会调用`store.getState()`将state传给我们
*  由于我们无法访问 store 本身，因此我们需要用 `useDispatch` 方法。

~~~jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
~~~

### 异步代码

使用 thunk 需要在创建时将 `redux-thunk` *middleware*（一种 Redux 插件）添加到 Redux store 中。Redux Toolkit 的 `configureStore` 函数已经自动为我们配置好了，所以我们可以继续在这里使用 thunk。

~~~js
// 外部的 thunk creator 函数
const fetchUserById = userId => {
  // 内部的 thunk 函数
  return async (dispatch, getState) => {
    try {
      // thunk 内发起异步数据请求
      const user = await userAPI.fetchById(userId)
      // 但数据响应完成后 dispatch 一个 action
      dispatch(userLoaded(user))
    } catch (err) {
      // 如果过程出错，在这里处理
    }
  }
}
~~~







## Mobx

mobx不适合数据流复杂场景。

![](/React/mobx.png)









## Recoil

解决了local state和Context两个问题

1. 组件状态共享只能通过状态提升来实现，但这样可能导致重新渲染一颗巨大组件树
2. Context只能存储单一值，无法存储多个各自拥有消费者的值的集合

Recoil的核心是Atom原子状态，通过Atom原子状态派生出衍生状态Selector,也能实现状态回溯

~~~react
const textState = atom({
    key:'textState',
    default:''
})
function TextInput(){
    const [text,setText] = useRecoilState(textState)
    const onChange = (e)=>{
		setText(e.target.value)
    }
    return(
    	<div>
            <input type='text' value={text} onChange={onChange}></input>
        </div>
    )
}
~~~

实现快照

~~~react
function CountSnapshot(){
    const snapshotRef = useRef(null)
    const [count,setCount ] = useRecoilState(countAtom)
    const onSave = useRecoilCallback(({snapshot})=>{
        snapshot.retain()
        snapshotRef.current = snapshot
    })
    const onRevoca = useRecoilCallback(({gotoSnapshot})=>{
         snapshotRef.current && gotoSnapshot(snapshotRef.current)
    })
    return (
        <div>
        	<button onClick={onSave}>保存快照</button>
            <button onClick={onRevoca}>恢复快照</button>
            <button onClick={()=>setCount((v)=>v+1)}>count加加 {count}</button>
        </div>
    )
}
~~~

## 实现简单状态管理工具



~~~react
export  default class CreateStore{
    constructor(reducer,initialState){
        this.currentReducer = reducer
        this.currentState = initialState
        this.listeners = []
        this.isDispatching = false
    }
    getState(){
        return this.currentState
    }
	subscriber(listener){
        this.listeners.push(listener)
        return function unsubscribe(){
			const index = this.listeners.indexOf(listener)
             this.listeners.splice(index,1)
        }
    }
    dispatch(action){
        try{
            this.isDispatching = true
            this.current = currentReducer(currentState,action)
        }finally{
            this.isDispatching = false
        }
        this.listeners.slice().forEach(listener=>listener())
        return action
    }
}
~~~

## 为什么很多状态管理库会有以下规则（eg:不会直接修改state）

::: tip

* 使你的代码可预测。当函数的输出仅根据输入参数计算时，更容易理解该代码的工作原理并对其进行测试。
* 另一方面，如果一个函数依赖于自身之外的变量，或者行为随机，你永远不知道运行它时会发生什么。
* 如果一个函数操作了其他对象，比如它的参数，这可能会意外地改变应用程序的工作方式。这可能是错误的常见来源，例如“我更新了我的状态，但现在我的视图没有在应该更新的时候更新！”

::: 

## 什么时候使用状态管理库

* 应用程序的其他部分是否关心这些数据？
* 你是否需要能够基于这些原始数据创建进一步的派生数据？
* 是否使用相同的数据来驱动多个组件？
* 能够将这种状态恢复到给定的时间点（即时间旅行调试）对你是否有价值？（部分库实现）
* 是否要缓存数据（即，如果数据已经存在，则使用它的状态而不是重新请求它）？
* 你是否希望在热重载视图组件（交换时可能会丢失其内部状态）时保持此数据一致？



<CommentService/>