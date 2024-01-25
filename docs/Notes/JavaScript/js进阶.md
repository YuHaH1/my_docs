---
lang: zh-CN
title: js进阶
description: 关键功能
collapsible: true
---
# js进阶

## 1、隐式转换

<u>我们知道js式弱类型语言，这意味着当操作涉及不匹配的类型，它将允许隐式类型转换，而不是抛出一个错误。</u>



::: tip

原始值转换会在 `toString()` 方法之前调用 `valueOf()` 方法，这与[强制数字类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_强制转换)的行为相似，但与[强制字符串类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#字符串强制转换)不同。

:::

### 1、Symbol.toPrimitive

**`Symbol.toPrimitive`** 是内置的 symbol 属性，其指定了一种接受首选类型并返回对象原始值的表示的方法。它被所有的[强类型转换制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制类型转换)算法优先调用。

在 `Symbol.toPrimitive` 属性（用作函数值）的帮助下，对象可以转换为一个原始值。该函数被调用时，会被传递一个字符串参数 `hint`，表示要转换到的原始值的预期类型。`hint` 参数的取值是 `"number"`、`"string"` 和 `"default"` 中的任意一个。

**对于`hint==='default'`发生类型转换的情况如下：**

* [`Date()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) 构造函数，当它收到一个不是 `Date` 实例的参数时——字符串表示日期字符串，而数值表示时间戳。
* [`+`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition) 运算符——如果运算对象是字符串，执行字符串串联；否则，执行数值相加。
* [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality) 运算符——如果一个运算对象是原始值，而另一个运算对象是对象（object），则该对象将转换为没有首选类型的原始值。

如果值已经是原始值，则此操作不会进行任何转换。对象按以下顺序调用它的 [`[@@toPrimitive]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)（将 hint 作为 `default`）、`valueOf()` 和 `toString()` 方法，将其转换为原始值。

**对于`hint===’number’`则执行强制数字类型转换算法**

对于数字类型有两类：number和BigInt

* `number`强转，执行`Number()`
  * 

**对于`hint===’string’`用于强制字符串类型转换算法**

* 使用`String()`强转

:::tip

`[Symbol.toPrimitive](hint)`由引擎调用，那什么时候`hint`为`number`，`string`或`default`呢

~~~js
const object1 = {
  [Symbol.toPrimitive](hint) {
      console.log(hint)
  },
};
// 当执行 +object1    hint = number
// 当执行 `${obj2}`   hint = string
// 其余情况 hint=default
~~~

:::



### 2.隐式转换示例

~~~js
console.log({} + []); // "[object Object]"
~~~

`{}` 和 `[]` 都没有 `[@@toPrimitive]()` 方法。因此会调用`valueOf`方法，而`valuieOf`返回对象自身，由于返回值还是对象，因此继续调用`toString`方法，`{}.toString()`返回`"[object Object]"`而`[].toString()`返回是空字符串

~~~js
{} + {} 
//NAN
({} + {})
'[object Object][object Object]'
~~~

第一次看到这个结果我懵了，想不到原因，最后查看资料，发现JavaScript 把第一个 `{}` 解释成了一个空的代码块（code block）并忽略了它。 `NaN` 其实是表达式 `+{}` 计算的结果 (`+` 加号以及第二个 `{}`)。 你在这里看到的 `+` 加号并不是运算符「加法」，而是一个一元运算符，作用是将它后面的操作数转换成数字，和 `Number()` 函数完全一样。为什么第一个 `{}` 会被解析成代码块（code block）呢？ 因为整个输入被解析成了一个语句：如果左大括号出现在一条语句的开头，则这个左大括号会被解析成一个代码块的开始。

~~~js
{} + []
0
/*转换流程如下
+[]
[].valueOf()//不是原始值
[].toString()
Number([].toString())  
Number("")
0
*/
~~~

~~~js
[1,2]+[3,4]
//'1,23,4'
//[1,2].toString()+[3,4].toString() = '1,2'+'3,4'
~~~



### 3.Number强制类型转换

Number()操作如下：
* Number 将按原样返回

* undefined 转换为 NaN。

* null 转换为 0。

* true 转换为 1；false 转换为 0。

* 字符串将被假定为包含数字字面量，并通过解析它们来转换。解析失败会得到 NaN。与实际数字字面量相比，它们有一些细微的差别：

  * 前导和尾随的空格/换行符会被忽略。
  * 前导的数字 0 不会导致该数值成为八进制字面量（或在严格模式下被拒绝）。

    +  -允许出现在字符串的开头以指示其符号。（在实际代码中，它们“看起来像”文字的一部分，但实际上是独立的一元运算符。）然而，该标志只能出现一次，并且后面不能跟空格。
    + Infinity 和 -Infinity 被当作是字面量。在实际代码中，它们是全局变量。空字符串或仅包含空格的字符串转换为 0。不允许使用数字分隔符。

* [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

* 对象首先通过按顺序调用它们的 [`[@@toPrimitive]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)（使用 `"number"` 提示）、`valueOf()` 和 `toString()` 方法将其[转换为原始值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制原始值转换)。然后将得到的原始值转换为数字。

### 4.String强转规则

* 字符串按原样返回。
* undefined 转换成 "undefined"。
* null 转换成 "null"。
* true 转换成 "true"；false 转换成 "false"。
* 使用与 toString(10) 相同的算法转换数字。
* 使用与 toString(10) 相同的算法转换 BigInt。
* Symbol 抛出 TypeError。
* 对于对象，首先，通过依次调用其 [@@toPrimitive]()（hint 为 "string"）、toString() 和 valueOf() 方法将其转换为原始值。然后将生成的原始值转换为一个字符串。



### 5.强制类型转换遵循的规则总结

* [强制原始值转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制原始值转换)：如果值已经是原始值，则此操作不会进行任何转换。
* 对象的强转：对象将依次调用它的 `[@@toPrimitive]()`（将 `default` 作为 hint 值）、`valueOf()` 和 `toString()` 方法，将其转换为原始值。
* [强制数字类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制数字类型转换)、[强制 number 类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_强制转换)、[强制 BigInt 类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt#转化)：`[@@toPrimitive]("number")` → `valueOf()` → `toString()`
* [强制字符串类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#字符串强制转换)：`[@@toPrimitive]("string")` → `toString()` → `valueOf()`

在所有情况下，<u>`[@@toPrimitive]()` 如果存在，必须可调用并返回原始值</u>，否则报错`TypeError`。

### 6.Object.is

`Object.is()` 确定两个值是否为相同值。如果以下其中一项成立，则两个值相同：

* 都是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
* 都是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)
* 都是 `true` 或者都是 `false`
* 都是长度相同、字符相同、顺序相同的字符串
* 都是相同的对象（意味着两个值都引用了内存中的同一对象）
* 都是 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 且具有相同的数值
* 都是 [symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 且引用相同的 symbol 值
* 都是数字且
  * 都是 `+0`
  * 都是 `-0`
  * 都是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  * 都有相同的值，非零且都不是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)



## 2、尾调用-尾递归

尾调用是指函数作为另一个函数的最后一条语句被调用，就像这样.

~~~js
function doSomething() {
    return doSomethingElse();
}
~~~

ES5中在执行 doSomethingElse 函数的时候会新增一个栈帧，doSomething对应的栈帧会被保留在内存中，当存在循环调用时就容易出现程序问题，比如栈溢出等不可预期的错误。

如果满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧；

```js
"use strict";

// 可以被优化
function doSomething(){
    ／／优化后
    return doSomethingElse();
}

// 无法优化，必须在返回值后添加其他操作
function doSomething(){
    return 1+doSomethingElse();
}

// 无法优化，调用不在尾部
function doSomething(){
    var result = doSomethingElse();
    return result;
}

// 无法优化，func为闭包
function doSomething(){
    var num=1, func = () => num;
    return func();
}


```

乘阶

~~~js
'use strict';
// 无优化 会一直创建栈帧
function factorial(n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
// 优化后
function factorial_opt(n, p=1) {
    if (n <= 1)~ {
        return 1 * p;
    } else {
        let result = n * p
        return factorial_opt(n - 1, result)
    }
}

~~~

斐波那契数列

~~~js
// 一般的实现方式
function fibonacci(n) {
    if(n==0 || n == 1)
        return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// 尾调用优化后
'use strict'
function fibonacci_opt(n, current = 0, next = 1) {
    if(n <= 1) {
        return next
    }
    return fibonacci_opt(n - 1, next, next+current)
}

fibonacci_opt(5)

~~~





## 3.事件总线

~~~ts
export type EventObj = { [event: string]: Array<Function> };

// 全部事件存储map
export const appEventObjMap = new Map<String, EventObj>();

// eventBus 事件中心
export class EventBus {
  private id: string;
  private eventObj: EventObj;

  constructor(id: string) {
    this.id = id;
    this.$clear();
    if (!appEventObjMap.get(this.id)) {
      appEventObjMap.set(this.id, {});
    }
    this.eventObj = appEventObjMap.get(this.id);
  }

  // 监听事件
  public $on(event: string, fn: Function): EventBus {
    const cbs = this.eventObj[event];
    if (!cbs) {
      this.eventObj[event] = [fn];
      return this;
    }
    if (!cbs.includes(fn)) cbs.push(fn);
    return this;
  }

  /** 任何$emit都会导致监听函数触发，第一个参数为事件名，后续的参数为$emit的参数 */
  public $onAll(fn: (event: string, ...args: Array<any>) => any): EventBus {
    return this.$on('ALL_EVENT', fn);
  }

  // 一次性监听事件
  public $once(event: string, fn: Function): void {
    const on = function (...args: Array<any>) {
      this.$off(event, on);
      fn(...args);
    }.bind(this);
    this.$on(event, on);
  }

  // 取消监听
  public $off(event: string, fn: Function): EventBus {
    const cbs = this.eventObj[event];
    if (!event || !cbs || !cbs.length) {
      console.warn('no event');
      return this;
    }

    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }

  // 取消监听$onAll
  public $offAll(fn: Function): EventBus {
    return this.$off('ALL_EVENT', fn);
  }

  // 发送事件
  public $emit(event: string, ...args: Array<any>): EventBus {
    let cbs = [];
    let allCbs = [];

    appEventObjMap.forEach((eventObj) => {
      if (eventObj[event]) cbs = cbs.concat(eventObj[event]);
   		 if (eventObj['ALL_EVENT']) allCbs = allCbs.concat(eventObj['ALL_EVENT']);

    if (!event || (cbs.length === 0 && allCbs.length === 0)) {
      console.warn(`no envent ${event} `);
    } else {
      try {
        for (let i = 0, l = cbs.length; i < l; i++) cbs[i](...args);
        for (let i = 0, l = allCbs.length; i < l; i++) allCbs[i](event, ...args);
      } catch (e) {
        error(e);
      }
    }
    return this;
  }

  // 清空当前所有的监听事件
  public $clear(): EventBus {
    const eventObj = appEventObjMap.get(this.id) ?? {};
    const events = Object.keys(eventObj);
    events.forEach((event) => delete eventObj[event]);
    return this;
  }
}
~~~







## 4.拖拽

~~~ts
import { type Ref, onMounted, onUnmounted } from 'vue'
export default function useDrag(containerRef: Ref<HTMLElement>, contentRef?: Ref<HTMLElement | null>) {
    let move = false
    let x, y, containerHeight, containerWidth
    function mouseDownHandle(e) {
        [x, y, containerHeight, containerWidth] = [e.offsetX, e.offsetY, containerRef.value?.offsetHeight, containerRef.value?.offsetWidth]
        move = true
        document.addEventListener('mousemove', mouseMoveHandle)
        document.addEventListener('mouseup', mouseUpHandle)
    }
    function mouseMoveHandle(e) {
        // 剩余留白空间
        const restHeight = window.innerHeight - containerHeight
        const restWidth = window.innerWidth - containerWidth
        // 鼠标位置和盒子边界之间的距离
        let div_top = e.clientY - y
        let div_left = e.clientX - x
        // Math.max(0, div_top)取盒子在视口内的值，如果div_top为负数就取值0 Math.min(Math.max(0, div_top), restHeight)//最大边界不超过restHeight
        let containerTop = Math.min(Math.max(0, div_top), restHeight), containerLeft = Math.min(Math.max(0, div_left), restWidth)
        if (move) {
            containerRef.value!.style.left = containerLeft + 'px'
            containerRef.value!.style.top = containerTop + 'px'
        }
    }
    function mouseUpHandle(e) {
        move = false
    }
    onMounted(() => {
        containerRef.value?.addEventListener('mousedown', mouseDownHandle)
    })
    onUnmounted(() => {
        containerRef.value?.removeEventListener('mousedown', mouseDownHandle)
        document.removeEventListener('mousemove', mouseMoveHandle)
        document.removeEventListener('mouseup', mouseUpHandle)
    })


}
~~~







<CommentService/>