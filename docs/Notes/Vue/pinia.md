---
lang: zh-CN
title: pinia
description: 关键功能
collapsible: true
---
# pinia

## 为什么vue3放弃vuex4

1. pinia比较轻量，只有1kb左右
2. 良好的TS支持
3. 使用更简单方便，不需要像Vuex一样，如果数据过多通常分模块管理。而pinia每个store都是独立的
4. pinia支持插件扩展自身功能
5. pinia放弃mutation，action支持同步和异步
6. 服务器端渲染支持
7. 开发工具支持
   * 跟踪动作、突变的时间表
   * 商店出现在使用它们的组件中
   * 时间旅行和更容易的调试
8. 热模块更换
   * 在不重新加载页面的情况下修改您的商店
   * 在开发时保持任何现有状态



## 1.定义一个模块商店

https://pinia.vuejs.org/core-concepts/

### 1.1、对象方式定义商店

在深入研究核心概念之前，我们需要知道存储是使用定义的`defineStore()`，并且它需要一个**唯一的**名称，作为第一个参数传递：

这个*名称*，也称为*id*，是必要的，Pania 使用它来将商店连接到 devtools。将返回的函数命名为*use...*是可组合项之间的约定，以使其使用习惯。

与 Vue 的 Options API 类似，也可以传递带有`state`、`actions`和`getters`属性的 Options 对象。

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

==如果解构使用商店定义的属性会失去响应式，因为state是用reactive，因此解构会导致失去响应式==

```js
import { storeToRefs } from 'pinia'//可以使用这个api来保持响应式
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ 解构会破坏响应式
    const { name, doubleCount } = store
    //保持响应式
    const { name, doubleCount } = storeToRefs(store)

    name // "eduardo"
    doubleCount // 2

    return {
      // will always be "eduardo"
      name,
      // will always be 2
      doubleCount,
      // this one will be reactive
      doubleValue: computed(() => store.doubleCount),
    }
  },
})

```

### 1.2、函数的方式定义商店

还有另一种可能的语法来定义商店。与 Vue Composition API 的[setup 函数](https://vuejs.org/api/composition-api-setup.html)类似，我们可以传入一个定义响应式属性和方法的函数，并返回一个包含我们想要公开的属性和方法的对象。

```js
import { ref } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})

```

在*设置商店*中：

* `ref()`s 成为`state`属性
* `computed()`变成`getters`
* `function()`变成`actions`



### 2.状态

在 Pinia 中，状态被定义为返回初始状态的函数。这允许 Pinia 在服务器端和客户端工作。

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```



>
>
># 关于state状态操作
>
>1. 重置状态
>
>  * ```js
>    const store = useStore()
>    store.$reset()
>    ```



### 2.1、修改状态的多种方式

>
>
># 直接修改
>
>默认情况下，您可以通过`store`实例访问状态来直接读取和写入状态：

~~~js
const store = useStore()
store.counter++
~~~

>
>
># 通过`$patch`方法。`state`它允许您对部分对象同时应用多个更改：

```js
store.$patch({
  counter: store.counter + 1,
  age: 120,
  name: 'DIO',
})
```

但是，使用这种语法应用某些突变确实很难或代价高昂：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。正因为如此，该`$patch`方法还接受一个函数来对这种难以用补丁对象应用的突变进行分组：

```
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

### 2.2、订阅状态

用来监测数据变化

你可以通过 store 的方法观察状态及其变化`$subscribe()`，类似于 Vuex 的[subscribe 方法](https://vuex.vuejs.org/api/#subscribe)。`$subscribe()`与常规相比使用的优点`watch()`是*订阅*只会在*补丁*后触发一次（例如，使用上面的函数版本时）。

默认情况下，*状态订阅*绑定到添加它们的组件（如果存储在组件的内部`setup()`）。意思是，**当组件被卸载时，它们将被自动删除**。如果要在组件卸载后保留它们，请`{ detached: true }`作为第二个参数传递以从当前组件中*分离**状态订阅：*

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$subscribe((mutation,state)=>{
    	
    }, { detached: true })

    // ...
  },
}
//参数mutation
{type: 'patch function', storeId: 'count', events: Array(3)}
events: (3) [{…}, {…}, {…}]
storeId: "count"
type: "patch function" //如果是直接修改state中内容，type就是direct ，如果是$patch对象式就是'patch object' 如果是$patch函数式'patch function'
[[Prototype]]: Object
//events是修改的数据对象

```

类似于watch

~~~js
watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
~~~

## 3.getters

大多数时候，getter 只会依赖状态，但是，他们可能需要使用其他 getter。因此，我们可以在定义常规函数时访问整个*store 实例，***但需要定义返回类型的类型（在 TypeScript 中）**。这是由于 TypeScript 中的一个已知限制，**不会影响使用箭头函数定义的 getter，也不会影响不使用的 getter**：`this`**`this`**

```tsx
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.counter * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    },
  },
})
```

### 3.1、访问getters内部其他计算属性

与计算属性一样，您可以组合多个 getter。通过 访问任何其他吸气剂`this`。即使您不使用 TypeScript，您也可以使用[JSDoc](https://jsdoc.app/tags-returns.html)提示您的 IDE 类型：

```ts
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 类型是自动推断出来的，因为我们没有使用" this " 
    doubleCount: (state) => state.counter * 2,
    // here we need to add the type ourselves (using JSDoc in JS). We can also
    // use this to document the getter
    /**
     * Returns the counter value times two plus one.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
  },
})
```

### 3.2、将参数传递给 

==请注意，执行此操作时，**getter 不再缓存**，它们只是您调用的函数。但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但应该证明性能更高：==

*Getter*只是在幕后*计算*的属性，因此不可能将任何参数传递给它们。但是，您可以从*getter*返回一个函数以接受任何参数：

```ts
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

```vue
<script>
export default {
  setup() {
    const store = useStore()
    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

我们可以在函数内部自己做缓存来提高性能

```ts
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

### 3.3、访问其他商店的getters

要使用其他存储 getter，您可以直接在*getter*内部*使用它*：

```ts
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
      localData
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## 4.actions

### 4.1、访问其他商店操作

要使用另一个商店，您可以直接在*action*内部*使用它*：

```
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

### 4.2、用法与setup()

您可以直接调用任何操作作为 store 的方法：

```
export default {
  setup() {
    const store = useStore()

    store.randomizeCounter()
  },
}
```

### 4.3、订阅行为

可以用 观察动作及其结果`store.$onAction()`。传递给它的回调在操作本身之前执行。`after`处理承诺并允许您在操作解决后执行功能。以类似的方式，`onError`允许您在操作抛出或拒绝时执行函数。这些对于在运行时跟踪错误很有用，类似于[Vue 文档中的这个技巧](https://v3.vuejs.org/guide/tooling/deployment.html#tracking-runtime-errors)。

这是一个在运行操作之前和它们解决/拒绝之后记录的示例。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now()
    // this will trigger before an action on `store` is executed
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// manually remove the listener
unsubscribe()
```



```javascript
<script setup>
	import { useUsers } from '...'
	const store = useUsers()
	store.registerUser()//可以直接调用

</script>
```

### 4.4、订阅$onAction

订阅操作默认情况下绑定到添加他的组件。这就意味着当组件卸载，订阅会自动被删除，但如果第二个参数传递为true则会将该订阅与组件分离。（即组件卸载该订阅依然存在）

```javascript
//新建一个测试仓库
import { defineStore } from 'pinia'
export const testStore = defineStore('test', {
    state() {
        return {
            count:1
        }
    },
    actions: {
        testOnAction(id) {
            this.count++
            console.log(this.count)
            return Promise.resolve('这是testOnAction返回的值')
        },
        testOnAction2(...args) {
            console.log(...args)
            return Promise.reject('这是testOnAction222错误返回的值')
        }

    }
})
//在setup的语法糖里	
import { testStore } from '../../pinia/modules/test'
const myTestStore = testStore()

store.$onAction(({
  name,
  store,
  args,
  after,
  onError
})=>{
	if(name==='testOnAction'){
		after((reject)=>{
			//这里可以执行一些操作
		})
	}
	//onError钩子类似一个错误级中间件，当函数抛出promise的失败状态就会调用
  onError((error)=>{
    console.log(error)
  })
})
store.testOnAction(1)
store.testOnAction2(1,2,3,45)
```

({ name,store, args,after, onError }）
![在这里插入图片描述](/Vue/pinia.png)$onAction函数接受一个回调函数，**该回调函数内部的代码会先于actions函数调用前执行**，以下是\$onAction中回调函数的参数介绍。
name当该仓库中的某个actions函数被调用，name是被调用函数的名字。
store是当前仓库实例,就是myTestStore
args是actions中某个被调用函数接受的实参，是个数组类型
after是个钩子函数，内部接受要给回调函数，该回调函数接受一个参数result，当actions中的函数返回了一个promise成功的返回值，result可以接受到，如果actions里的函数没有返回值则result则为undefined。**after钩子函数会在actions中的函数被调用后执行**
onError是个钩子函数，如果做过服务端的小伙伴肯定知道错误级中间件，onError同样接受一个回调函数，该回调函数接受一个error参数，该参数是actions内部函数中返回promise失败传的参数。**如果actions内部函数返回了promise失败状态onError就会执行**

## 5.插件

由于低级 API，Pania 商店可以完全扩展。以下是您可以执行的操作列表：

* 向商店添加新属性
* 定义商店时添加新选项
* 向商店添加新方法
* 包装现有方法
* 更改甚至取消操作
* [实现像本地存储](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)这样的副作用
* **仅适用**于特定商店

插件被添加到 pinia 实例中`pinia.use()`。最简单的例子是通过返回一个对象为所有商店添加一个静态属性：

```js
import { createPinia } from 'pinia'
// add a property named `secret` to every store that is created after this plugin is installed
// this could be in a different file
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// give the plugin to pinia
pinia.use(SecretPiniaPlugin)
```



<CommentService/>