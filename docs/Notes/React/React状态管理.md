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

Redux同步数据流图解

![](/React/redux_state.gif)

### Redux基本使用

> #### 单例Store

Store 就是用来维持应用所有的 [state 树](https://www.reduxjs.cn/understanding/thinking-in-redux/glossary#state) 的一个对象。Store 不是类。它只是有几个方法的对象。 

Store身上的方法如下

* [`getState()`](https://www.reduxjs.cn/api/store#getstate)
* [`dispatch(action)`](https://www.reduxjs.cn/api/store#dispatchaction)
* [`subscribe(listener)`](https://www.reduxjs.cn/api/store#subscribelistener)
* [`replaceReducer(nextReducer)`](https://www.reduxjs.cn/api/store#replacereducernextreducer)

> `const userStore = createStore(reducer,preloadedState?, enhancer?)`

1. `reducer` *(Function)*是个函数接收连个参数，分别是当前的 state 树和要处理的 [action](https://www.reduxjs.cn/understanding/thinking-in-redux/glossary#action)，返回新的 [state 树](https://www.reduxjs.cn/understanding/thinking-in-redux/glossary#state)
2. `preloadedState`(any)初始state,如果没传递，则默认值采用reducer的返回值
3. `enhancer` *(Function)*: Store enhancer。你可以选择指定它以使用第三方功能，如middleware、时间旅行、持久化来增强 store。Redux 中唯一内置的 store enhander 是 [`applyMiddleware()`](https://www.reduxjs.cn/api/applymiddleware)。
4. 返回值,保存了应用程序所有 state 的对象。改变 state 的惟一方法是 [dispatch action](https://www.reduxjs.cn/api/store#dispatchaction)。你也可以 [subscribe](https://www.reduxjs.cn/api/store#subscribelistener) state 的变化，然后更新 UI。

源码

~~~ts
export function createStore<
    S,
    A extends Action,
    Ext extends {} = {},
    StateExt extends {} = {},
    PreloadedState = S
>(
    reducer: Reducer<S, A, PreloadedState>,
    preloadedState?: PreloadedState | StoreEnhancer<Ext, StateExt> | undefined,
    enhancer?: StoreEnhancer<Ext, StateExt>
): Store<S, A, StateExt> & Ext {
    /**
     * 边界判断代码去掉了
     */
    let currentReducer = reducer// 传入的reducer
    // 当前状态 如果为undefined值为rudecer返回值
    let currentState: S | PreloadedState | undefined = preloadedState as
        | PreloadedState
        | undefined
    let currentListeners: Map<number, ListenerCallback> | null = new Map()
    let nextListeners = currentListeners
    let listenerIdCounter = 0
    let isDispatching = false

    /**
     * 浅拷贝当前监听器，使用nextListeners作为临时列表。
     * 这可以防止在分派过程中围绕消费者调用订阅/退订的任何错误。
     * */
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = new Map()
            currentListeners.forEach((listener, key) => {
                nextListeners.set(key, listener)
            })
        }
    }

    /**
     * 
     * @returns 当前状态树
     */
    function getState(): S {
        if (isDispatching) {
            throw new Error(
                'You may not call store.getState() while the reducer is executing. ' +
                'The reducer has already received the state as an argument. ' +
                'Pass it down from the top reducer instead of reading it from the store.'
            )
        }

        return currentState as S
    }

    /**

     */
    function subscribe(listener: () => void) {
        let isSubscribed = true
        // 执行浅拷贝 拷贝监听器
        ensureCanMutateNextListeners()
        const listenerId = listenerIdCounter++
        nextListeners.set(listenerId, listener)

        return function unsubscribe() {
            if (!isSubscribed) {
                return
            }
            if (isDispatching) {
                throw new Error()
            }
            isSubscribed = false
            ensureCanMutateNextListeners()
            nextListeners.delete(listenerId)
            currentListeners = null
        }
    }
    function dispatch(action: A) {
        try {
            isDispatching = true
            currentState = currentReducer(currentState, action)
        } finally {
            isDispatching = false
        }

        const listeners = (currentListeners = nextListeners)
        listeners.forEach(listener => {
            listener()
        })
        return action
    }

    function replaceReducer(nextReducer: Reducer<S, A>): void {
        if (typeof nextReducer !== 'function') {
            throw new Error()
        }

        currentReducer = nextReducer as unknown as Reducer<S, A, PreloadedState>
        //这个动作的效果与ActionTypes.INIT类似。
        //同时存在于新旧rootReducer中的任何reducer
        //将接收到之前的状态。这将有效地用旧状态树中的任何相关数据填充新状态树
        dispatch({ type: ActionTypes.REPLACE } as A)
    }

    // 这个方法实际上是监听整个状态数的变化。实际上就是subscribe
    function observable() {
        const outerSubscribe = subscribe
        return {

            subscribe(observer: unknown) {
                if (typeof observer !== 'object' || observer === null) {
                    throw new TypeError()
                }

                function observeState() {
                    const observerAsObserver = observer as Observer<S>
                    if (observerAsObserver.next) {
                        // 检测数据变化
                        observerAsObserver.next(getState())
                    }
                }

                observeState()
                const unsubscribe = outerSubscribe(observeState)
                return { unsubscribe }
            },

            [$$observable]() {
                return this
            }
        }
    }
    // 创建store时，会先调用每个reducer以此得到初始状态
    dispatch({ type: ActionTypes.INIT } as A)
    const store = {
        dispatch: dispatch as Dispatch<A>,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    } as unknown as Store<S, A, StateExt> & Ext
    return store
}
~~~



****

~~~js
import { createStore } from 'redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos, ['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})
console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]
~~~

::: tip

* 应用中不要创建多个 store！相反，使用 [`combineReducers`](https://www.reduxjs.cn/api/combinereducers) 来把多个 reducer 创建成一个根 reducer。
* Redux state 通常是普通 JS 对象或者数组。如果 state 是普通对象，永远不要修改它！不可变更新需要复制每个级别的数据，通常使用对象扩展运算符（`return { ...state, ...newData }`）。
* 当 store 创建后，Redux 会 dispatch 一个 action 到 reducer 上，来用初始的 state 来填充 store。你不需要处理这个 action。但要记住，如果第一个参数也就是传入的 state 是 `undefined` 的话，reducer 应该返回初始的 state 值。
* 要使用多个 store enhancer 的时候，你可能需要使用 [compose](https://www.reduxjs.cn/api/compose)

:::

> `combineReducers(reducers)`

随着应用变得越来越复杂，可以考虑将 [reducer 函数] 拆分成多个单独的函数，拆分后的每个函数负责独立管理 [state]的一部分。

**该函数相当于模块划分，避免创建多个store，而是维护多个reducer实现模块划分**

example

~~~js
// reducers/todos.js
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

// reducers/counter.js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// reducers/index.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})

// App.js
import { createStore } from 'redux'
import reducer from './reducers/index'

let store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
~~~

> `applyMiddleware(...middlewares)`

源码

~~~js
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch)
   function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args: any) =>a(b(...args))  )
}

    return {
      ...store,
      dispatch
    }
  }
}
~~~



middlewares遵循 Redux *middleware API* 的函数。每个 middleware 接受 [`Store`](https://www.reduxjs.cn/api/store) 的 [`dispatch`](https://www.reduxjs.cn/api/store#dispatchaction) 和 [`getState`](https://www.reduxjs.cn/api/store#getState) 函数作为命名参数，并返回一个函数。

* 该函数会被传入被称为 `next` 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 `next(action)`，或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store 的 [`dispatch`](https://www.reduxjs.cn/api/store#dispatchaction) 方法作为 `next` 参数，并借此结束调用链。所以，middleware 的函数签名是 `({ getState, dispatch }) => next => action`。

~~~js
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'

function logger({ getState,dispatch }) {
  return next => action => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger))

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})
// (middleware 将打印如下信息:)
// will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
// state after dispatch: [ 'Use Redux', 'Understand the middleware' ]
~~~





### Redux-Toolkit

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

> ### createSlice中reducers的用法

::: warning

如果 action 需要包含唯一 ID 或其他一些随机值，请始终先生成该随机值并将其放入 action 对象中。 **Reducer 中永远不应该计算随机值**，因为这会使结果不可预测。

:::

Redux action 对象需要有一个 `type` 字段，它通常是一个描述性字符串，也可能包含其他字段，其中包含有关发生的事情的更多信息。按照惯例，我们通常将附加信息放在名为 `action.payload` 的字段中

* reduces中的reducer是个函数

~~~js
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
~~~

* reduces中的reducer是个对象时（**使用场景**：需要从不同的组件 dispatch 相同的 action或者准备 payload 的逻辑很复杂）
  `createSlice` 允许我们在编写 reducer 时定义一个 `prepare` 函数。 `prepare` 函数可以接受多个参数，并运行需要的任何其他同步逻辑来决定哪些值进入 action 对象。然后它应该返回一个包含 `payload` 字段的对象。（返回对象还可能包含一个 `meta` 字段，可用于向 action 添加额外的描述性值，以及一个 `error` 字段，该字段应该是一个布尔值，指示此 action 是否表示某种错误。）
  ::: warning

  **action 和 state 应该只能包含普通的 JS 值，如对象、数组和基本类型。不要将类实例、函数或其他不可序列化的值放入 Redux！**。
  :::

~~~js
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
          //同步逻辑的代码
        return {
          payload: {
            id: nanoid(),//生成唯一id
            title,
            content
          }
        }
      }
    }
    // other reducers here
  }
})
~~~



> ### 异步代码

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



> #### 总结

1. 使用`configureStore `创建仓库实例，并将其注入到根组件
2. 使用`createSlice`创建状态实例（初始化值，和reducer），并将状态实例`actions`对象暴露出去，该对象身上就是`reducers`，然后默认导出实例对象身上`reducer`将其配置到`configureStore`的`reducer`中
3. 通过`useSelector`来获取仓库中的状态
4. 通过`useDispatch`来派发事件，`useDispatch(传入createSlice中的 reducers里的方法名)`



## Mobx

mobx不适合数据流复杂场景。

![](/React/mobx.png)

### 基本使用

> `makeObservable(target, annotations?, options?)`
>
>  一般情况下，`makeObservable` 是在类的构造函数中调用的，并且它的第一个参数是 `this` 。

* `target`任何 JavaScript 对象（包括类的实例）都可以作为 `target` 被传递给这个函数。 
* `annotations`将会为每一个成员映射 [注解](https://zh.mobx.js.org/observable-state.html#可用的注解)。需要注意的是，当使用 [装饰器](https://zh.mobx.js.org/enabling-decorators.html) 时，`annotations` 参数将会被忽略。
* `options`

example

~~~js
import { makeObservable, observable, computed, action, flow } from "mobx"

class Doubler {
    value

    constructor(value) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action,
            fetch: flow
        })
        this.value = value
    }

    get double() {
        return this.value * 2
    }

    increment() {
        this.value++
    }

    *fetch() {
        const response = yield fetch("/api/value")
        this.value = response.json()
    }
}
~~~

> `makeAutoObservable`
>
> makeAutoObservable` 就像是加强版的 `makeObservable



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



## Zustrand

[文档](https://docs.pmnd.rs/zustand/getting-started/introduction)

### 安装

~~~shell
pnpm install zustand
~~~



### 创建Store

#### 基本数据类型state

~~~ts
import { create } from 'zustand'

type State = {
  firstName: string
  lastName: string
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}
const usePersonStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))


~~~

组件中

~~~tsx
function App() {
  const firstName = usePersonStore((state) => state.firstName)
  const updateFirstName = usePersonStore((state) => state.updateFirstName)

  return (
    <main>
      <label>
        First name
        <input
          // Update the "firstName" state
          onChange={(e) => updateFirstName(e.currentTarget.value)}
          value={firstName}
        />
      </label>

      <p>
        Hello, <strong>{firstName}!</strong>
      </p>
    </main>
  )
}
~~~

#### 嵌套对象的state

```jsx
import { create } from 'zustand'

const useCountStore = create((set) => ({
  nested: { count: 0 },
  inc: () =>
    set((state) => ({
      nested: { ...state.nested, count: state.nested.count + 1 },
    })),
}))
```



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