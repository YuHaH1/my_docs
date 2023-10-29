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



## 4.JS原理-V8

JS使用运行时编译（Just In Time Compliation），这种方式是在运行过程中生成机器代码，而不是提前编译生成。而将JS转成机器语言并执行的就是JS引擎。AOT与JIT刚好相反，AOT先生成机器码在运行

这些引擎都是先通过解析器（parser）解析成抽象语法AST，然后通过解释器（interpreter）将AST编译成字节码，字节码是跨平台的中间表示（字节码与平台无关，能在不同操作系统上运行），字节码通过编译器（Compiler）生成机器代码。

总结：

* 解析器负责将代码解析成AST
* 解释器负责将AST编译成字节码并执行
* 编译器负责编译运行更高效的机器码

### V8

  V8是一个接收js代码，编译代码然后执行的C++程序，编译后的代码可以再多种操作系统多种处理器上运行。

V8主要做以下工作

* 编译执行JS代码，处理调用栈
* 内存分配
* 垃圾回收

V8 @version5.9版本没有解释器（不编译为字节码），使用两个编译器。执行流程如下：

* js解析器解析生成AST
* Full-codegen编译器1直接使用AS编译出机器码（Full-codegen是一个基准编译器，它生成的机器码是未被优化的机器码）
* 然后运行过程中通过Crankshaft优化编译器2来做代码优化，需要优化的代码重新解析生成AST，然后Crankshaft通过优化好的AST生成优化好的机器码

:::tip

这样设计有优缺点

优点如下：

* 没有了AST到字节码的转换时间，一定程度上提高浏览器执行JS的性能

缺点：

* 生成的机器码会占用大量内存。
* 缺少中间层机器码，无法实现一些优化策略。
* 这些编译器无法很好支持和优化JS新语法特性。

:::

V8新版本执行流程如下：

* 解析器生成AST
* 使用Igniton基准解析器，生成字节码（此时清除AST释放内存空间）
* 生成的字节码直接作为基准执行模型，（在代码不断运行过程中解释器收集可以优化代码的信息【例如变量类型、函数使用频率】）
* 优化编译器TruboFan根据上面收集的优化信息来编译出经过优化的机器码
* 如果收集了错误信息，会逆向将机器码回退成字节码，然后由解释器解释执行（例如sum函数求两数之和多次调用，用整型a,b，突然传入字符串和对象相加这时候机器码不知道如何处理就会进行deoptimizetion回退成字节码，由解释器解释执行）

:::tip

新版本的优点：

* 字节码生成速度远高于机器码，所以网页解析执行js速度更快。
* 生成优化机器码时，不需要重新编译。

:::

**V8使用的优化策略如下**

* 函数声明但未使用不会解析生成为AST
* 如果函数只被调用一次，则字节码直接被解释执行，不会对其进行优化编译
* 函数被调用多次，可能被标记为热点函数，可能会被编译成优化后的机器代码



### 解释型语言和编译型语言的区别

解释型语言和编译型语言是两种不同的编程语言类型，它们在代码**执行方式和性能方面**有所区别。

**解释型语言**：

* 解释型语言的代码在运行之前不需要经过编译器的处理。代码逐行地由解释器读取并执行。
* 解释型语言的代码是一行一行地解释执行的，每行代码都会在运行时被解释器翻译成机器代码并立即执行。
* 解释型语言的优点是开发过程中更加灵活，可以快速进行开发和调试，因为无需等待编译过程。
* 但是，解释型语言在执行时需要实时翻译和解释代码，因此通常比编译型语言的执行速度较慢。

**型语言**：

* 编译型语言的代码在运行之前需要经过编译器的处理。编译器将源代码一次性地转换成机器代码（或称为目标代码）。
* 编译过程将源代码转换成机器代码的输出文件，可以在以后的执行中直接被计算机处理，无需重新翻译。
* 编译型语言的执行速度通常比解释型语言更快，因为代码在运行之前已经被完全转换成机器代码。
* 编译型语言的缺点是开发过程中相对不够灵活，因为每次修改代码后都需要重新编译才能运行。

总结：

* 解释型语言在运行时逐行解释执行代码，开发灵活但执行速度相对较慢。
* 编译型语言在运行之前将代码转换成机器代码，执行速度较快但开发过程相对不够灵活。
* 选择使用哪种类型的语言取决于项目的需求，包括开发速度、执行速度和可移植性等方面的考虑。



### 字节码和机器码

**字节码：**

字节码（Bytecode）是一种中间表示形式，位于源代码和机器码之间。它是一种由特定虚拟机（如Java虚拟机）执行的低级指令集。

字节码通常是由源代码经过编译器转换生成的，它是一种平台无关的形式，可以在不同的硬件和操作系统上执行。字节码使用一组指令来描述源代码的操作和逻辑，并以二进制形式存储。

字节码相比于源代码和机器码更接近于高级编程语言，它的指令通常比机器码更简单易懂。字节码指令可以执行诸如赋值、算术运算、条件判断、循环等基本操作，以及调用函数、创建对象等高级操作。

字节码需要通过解释器或即时编译器（Just-In-Time Compiler）在运行时逐条解释或编译成机器码来执行。解释器逐条解释字节码指令并执行相应的操作，而即时编译器将字节码编译成机器码，然后执行编译后的机器码。字节码的执行方式取决于所使用的虚拟机及其实现。

字节码在跨平台和动态性方面具有优势。由于字节码是平台无关的，在不同的操作系统和硬件上都可以执行。此外，字节码的中间表示形式使得一些动态特性成为可能，例如动态类型检查、反射和动态加载等。

Java 虚拟机（JVM）是一个广为人知的使用字节码的例子。Java 源代码首先被编译为字节码，然后由 JVM 的解释器或即时编译器将字节码解释或编译成机器码，最终由计算机硬件执行。这种方式使得 Java 程序具有跨平台的能力。

**机器码：**

机器码（Machine Code）是一种由计算机硬件直接可以识别和执行的二进制指令集。它是最底层的指令形式，由CPU（中央处理器）直接执行。

机器码是特定于硬件平台的，不同的处理器和操作系统有不同的机器码格式。每个处理器都有其特定的指令集架构，机器码是按照该指令集架构编码的指令序列。

机器码指令是由一系列二进制位组成的，每个位对应于特定的硬件操作。例如，一个机器码指令可能用于将两个寄存器中的值相加，或者将数据从内存加载到寄存器中。

机器码的执行是由CPU直接执行的，CPU会按照指令的编码解析每条机器码指令，并执行相应的操作。CPU根据指令的操作码（opcode）来确定执行的具体操作，使用指令中的操作数（operand）来获取操作所需的数据。

由于机器码是直接操作底层硬件资源的指令集，它提供了最高的执行效率。机器码的执行速度较快，因为它是硬件平台的本地指令，可以直接与底层硬件交互。

机器码通常是由汇编器将汇编语言程序转换生成的。汇编语言是一种与机器码一一对应的文本表示形式，使用助记符和符号来代表不同的机器码指令。汇编器将汇编语言程序转换成机器码，使得程序可以直接在计算机硬件上执行。

总结起来，机器码是计算机硬件直接可以识别和执行的二进制指令集，它是最底层的指令形式。与高级编程语言和字节码相比，机器码更接近硬件操作，提供了最高的执行效率。



<CommentService/>