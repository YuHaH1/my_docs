---
lang: zh-CN
title: vue版本迭代
description: 关键功能
collapsible: true
---
## vue3.3

该版本主要优化了开发体验，https://blog.vuejs.org/posts/vue-3-3描述

### 1.setup语法糖和ts开发体验改进

#### 宏中的导入和复杂类型支持

之前and的类型参数位置使用的类型`defineProps`仅限`defineEmits`于本地类型，只支持类型字面量和接口。这是因为 Vue 需要能够分析 props 接口上的属性，以便生成相应的运行时选项。

此限制现已在 3.3 中解决。编译器现在可以解析导入的类型，并支持一组有限的复杂类型：

```vue
<script setup lang="ts">
import type { Props } from './foo'

// imported + intersection type
defineProps<Props & { extraProp?: string }>()
</script>
```

请注意，复杂类型支持是基于 AST 的，因此不是 100% 全面的。不支持某些需要实际类型分析的复杂类型，例如条件类型。您可以对单个 props 的类型使用条件类型，但不能对整个 props 对象使用。

### 2.通用组件

使用的组件`<script setup>`现在可以通过属性接受通用类型参数`generic`：

~~~vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
~~~

works的值`generic`与 TypeScript 中的参数列表 between 完全相同`<...>`。例如，您可以使用多个参数、`extends`约束、默认类型和引用导入类型：

```vue
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

此功能以前需要明确选择加入，但现在在最新版本的 volar / vue-tsc 中默认启用。

### 3.defineEmits

以前，for 的类型参数`defineEmits`仅支持调用签名语法：在类型文字中，键是事件名称，值是指定附加参数的数组类型。

```TS
// BEFORE
const emit = defineEmits<{
  (e: 'foo', id: number): void
  (e: 'bar', name: string, ...rest: any[]): void
}>()
// AFTER
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
```



### 4.defineSlots

~~~vue
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
</script>
~~~

`defineSlots()`只接受类型参数，不接受运行时参数。类型参数应该是类型字面量，其中属性键是插槽名称，值是插槽函数。该函数的第一个参数是插槽期望接收的道具，其类型将用于模板中的插槽道具。的返回值`defineSlots`与从 返回的插槽对象相同`useSlots`。

### 5.defineProps

解构赋值不会破坏其响应式

~~~vue
<script setup>
import { watchEffect } from 'vue'

const { msg = 'hello' } = defineProps(['msg'])

watchEffect(() => {
  // accessing `msg` in watchers and computed getters
  // tracks it as a dependency, just like accessing `props.msg`
  console.log(`msg is: ${msg}`)
})
</script>

<template>{{ msg }}</template>
~~~

### 6.defineModel-双向绑定的v-model

以前，对于支持双向绑定的组件`v-model`，它需要声明一个 `prop` 和`update:propName`在它打算更新 prop 时发出相应的事件：

~~~vue
<!-- AFTER -->
<script setup>
const modelValue = defineModel()
console.log(modelValue.value)
</script>

<template>
  <input v-model="modelValue" />
</template>
~~~

### 7.defineOptions

新defineOptions宏允许直接在 中声明组件选项`<script setup>`，而不需要单独的`<script>`块：

~~~vue
//before
<script >
export default{ inheritAttrs: false }
</script>
//after
<script setup>
defineOptions({ inheritAttrs: false })
</script>
~~~

### 8.toRef和toValue

提升了`toRef`调用效率，`toRef`和`toValue`类似于`ref`和`unref`最大区别在于特殊的处理`getter`上

~~~ts
// 等价ref(1)
toRef(1)
// creates a readonly ref that calls the getter on .value access
toRef(() => props.foo)
const newRef = toRef(()=>props.foo)
//当我们使用newRef 就会调用toRef的回调，这个类似计算属性，但是相比计算属性来说，它不需要计算，效率相对高一些
// 返回现有的引用
toRef(existingRef)

// toValue 
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1
//最大变化就是我们的自定义hooks可以接受getter作为响应数据源
//以前我们传数据给自定义hook
useFeature(computed(() => props.foo))
useFeature(toRef(props, 'foo'))
//现在直接
useFeature(() => props.foo)
~~~



## Vue3.4

### 解析器
3.4版本解析器速度提升2倍，提高了 SFC 构建性能。
之前版本Vue 使用递归下降解析器，该解析器依赖于许多正则表达式和前瞻搜索。新的解析器使用基于htmlparser2中的标记生成器的状态机标记生成器，它仅迭代整个模板字符串一次。
### 响应式上
3.4 还对响应式系统进行了重大重构，目标是提高计算属性的重新计算效率。

```javascript
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // logs true

count.value = 2 // logs true again
```
1. 之前版本的watchEffect每次count.value更改都会触发回调，即使计算结果保持不变。通过 3.4 后的优化，现在仅当计算结果实际发生更改时才会触发回调。
2. 多个计算的依赖 dep 更改仅触发同步效果一次。
3. Array shift, unshift,splice方法仅触发一次同步效果。

### defineModel
defineModel是一个新的`<script setup>`宏，旨在简化支持v-model，并在 3.4 中它还为v-model修饰符的使用提供了更好的支持。
**使用说明**
```javascript
//  1.声明一个modelValue的属性，消费父组件v-model绑定的值
const model = defineModel()
// 可以携带options
const model = defineModel({ type: String })

// 现在直接修改值.value即可，相当于调用了emits "update:modelValue" 
model.value = 'hello'

// 声明父组件绑定的v-model:count='xxx'
const count = defineModel('count')
// 2。定义type和默认值
const count = defineModel('count', { type: Number, default: 0 })
// 3.如果我们想获取v-model添加的修饰符，子组件中可以解构出来，第二个参数就是修饰符
const [modelValue, modelModifiers] = defineModel()
// 父组件v-model.trim='xxxx' 子组件eg:  modelModifiers.trim

//4.当存在修饰符时，我们可能需要在读取或将其同步回父元素时对其值进行转换。我们可以通过使用get和set转换器选项来实现这一点:
const [modelValue, modelModifiers] = defineModel({
  // get() 可以省略
  set(value) {
    // 如果trim修饰符存在就将值去掉作用空格返回同步回父组件
    if (modelModifiers.trim) {
      return value.trim()
    }
    return value
  }
})
```
### v-bind同名缩写

```typescript
const id = ref('23213')
const name = ref('name')
<Test :id :name>
```

主要的更新就是以上这些了～



<CommentService/>