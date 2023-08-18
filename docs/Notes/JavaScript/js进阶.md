---
lang: zh-CN
title: js进阶
description: 关键功能
collapsible: true
---
# js进阶

## 1、隐式转换

<u>我们知道js式弱类型语言，这意味着当操作涉及不匹配的类型是否，它将允许隐式类型转换，而不是抛出一个错误。</u>

发生类型转换的情况如下：

* [`Date()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) 构造函数，当它收到一个不是 `Date` 实例的参数时——字符串表示日期字符串，而数值表示时间戳。
* [`+`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition) 运算符——如果运算对象是字符串，执行字符串串联；否则，执行数值相加。
* [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality) 运算符——如果一个运算对象是原始值，而另一个运算对象是对象（object），则该对象将转换为没有首选类型的原始值。

如果值已经是原始值，则此操作不会进行任何转换。对象按以下顺序调用它的 [`[@@toPrimitive]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)（将 hint 作为 `default`）、`valueOf()` 和 `toString()` 方法，将其转换为原始值。

::: tip

原始值转换会在 `toString()` 方法之前调用 `valueOf()` 方法，这与[强制数字类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_强制转换)的行为相似，但与[强制字符串类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#字符串强制转换)不同。

:::

### 1、Symbol.toPrimitive

**`Symbol.toPrimitive`** 是内置的 symbol 属性，其指定了一种接受首选类型并返回对象原始值的表示的方法。它被所有的[强类型转换制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制类型转换)算法优先调用。

在 `Symbol.toPrimitive` 属性（用作函数值）的帮助下，对象可以转换为一个原始值。该函数被调用时，会被传递一个字符串参数 `hint`，表示要转换到的原始值的预期类型。`hint` 参数的取值是 `"number"`、`"string"` 和 `"default"` 中的任意一个。

1、如果输入的值已经是一个原始值，则直接返回它

 2、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。

 3、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。

 4、否则，抛出TypeError异常。



### 2.对象和数组之间的类型转换

~~~js
console.log({} + []); // "[object Object]"
~~~

`{}` 和 `[]` 都没有 `[@@toPrimitive]()` 方法。因此会调用`valueOf`方法，而`valuieOf`返回对象自身，由于返回值还是对象，因此继续调用`toString`方法，`{}.toString()`返回`"[object Object]"`而`[].toString()`返回是空字符串

### 3.Number强制类型转换

* 对于 Number 则总是返回自己
* `undefined` 变成了 `NaN`。
* `null` 变成了 `0`。
* `true` 变成了 `1`；`false` 变成了 `0`。
* 如果它们包含数字字面量，字符串通过解析它们来转换。如果解析失败，返回的结果为`NaN`。与实际数字字面量相比，它们有一些细微的差别。
  * 忽略前导和尾随空格/行终止符。
  * 前导数值 `0` 不会导致该数值成为八进制文本（或在严格模式下被拒绝）。
  * `+` 和 `-` 允许在字符串的开头指示其符号。（在实际代码中，它们“看起来像”文字的一部分，但实际上是单独的一元运算符。）然而，该标志只能出现一次，不得后跟空格。
  * `Infinity` 和 `-Infinity` 被当作是字面量。在实际代码中，它们是全局变量。
  * 空字符串或仅空格字符串转换为 `0`。
  * 不允许使用[数字分隔符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators)。
* [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)，以防止意外的强制隐式转换损失精度。
* [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

### 4.强制类型转换遵循的规则

* [强制原始值转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制原始值转换)：`[@@toPrimitive]("default")` → `valueOf()` → `toString()`
* [强制数字类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#强制数字类型转换)、[强制 number 类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_强制转换)、[强制 BigInt 类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt#转化)：`[@@toPrimitive]("number")` → `valueOf()` → `toString()`
* [强制字符串类型转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#字符串强制转换)：`[@@toPrimitive]("string")` → `toString()` → `valueOf()`

在所有情况下，<u>`[@@toPrimitive]()` 如果存在，必须可调用并返回原始值</u>。

### 5.Object.is

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









<CommentService/>