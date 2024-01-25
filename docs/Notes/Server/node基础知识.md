---
lang: zh-CN
title: node基础知识
description: 关键功能
collapsible: true
---
# node基础知识

## 1.V8引擎

1.1、v8

JS使用运行时编译（Just In Time Compliation），这种方式是在运行过程中生成机器代码，而不是提前编译生成。而将JS转成机器语言并执行的就是JS引擎。AOT与JIT刚好相反，AOT先生成机器码在运行

这些引擎都是先通过解析器（parser）解析成抽象语法AST，然后通过解释器（interpreter）将AST编译成字节码，字节码是跨平台的中间表示（字节码与平台无关，能在不同操作系统上运行），字节码通过编译器（Compiler）生成机器代码。

总结：

* 解析器负责将代码解析成AST
* 解释器负责将AST编译成字节码并执行
* 编译器负责编译运行更高效的机器码

### V8编译原理

①Blink（谷歌浏览器的渲染引擎，基于webkit分支开发）主要负责HTML DOM CSS 渲染，嵌入V8引擎，执行js，计算样式和布局，嵌入合成器，绘制图形。Blink 拿到`html`代码分析，找到`script`代码交给V8引擎解析，注意Blink是通过流的形式传给V8的。

> 通过以流的形式传输数据，Blink可以逐步接收和处理来自网络的字节流，并在需要时将相应的数据传递给V8引擎执行。这种流式处理方式使得浏览器可以在数据到达的同时并行处理不同的任务，提高了页面的加载速度和用户体验

②**Scanner扫描器**：扫描器进行词法分析，生成tokens，eg：

~~~js
var testName = 'test'
Token::VAR：表示关键字"var"。
Token::WHITESPACE：表示空格字符。
Token::IDENTIFIER：表示标识符"testName"。
Token::WHITESPACE：表示空格字符。
Token::ASSIGN：表示赋值符号"="。
Token::WHITESPACE：表示空格字符。
Token::STRING：表示字符串"'test'"。
~~~

③**Parser解析器**:将 `tokens` 转化为 `AST` 抽象语法树

④**PreParse预解析**：在 JavaScript 代码执行之前对代码进行可选的预处理。预解析器的存在是为了提高代码的执行效率。V8 引擎采用了**延迟解析（Lazy Parsing）的策略**，它的原理是**只解析当前需要的内容，而把其他内容推迟到函数被调用时再进行解析**。这样可以减少不必要的解析工作，提高网页的运行效率。eg:

~~~js
function Parent(){
    function Child(){
       ... 
    }
}
//在Parent函数调用之前，只会对Parent内容进行解析，而child会在Parent调用时才进行解析。
~~~

通过延迟解析的方式，**V8 引擎可以避免解析和编译未被执行的函数**，节省了不必要的时间和资源开销，提高了 JavaScript 代码的执行效率。

⑤**Ignition解释器**：将AST抽象语法树 转化成 `字节码(bytecode)`

⑥**TurboFan编译器**：将字节码转换成不同平台所需要的`机器码` 能让我们的CPU识别。



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



#### 字节码的作用

1. 有良好的跨平台优势
2. 代码安全性：字节码作为中间表示形式，可以提供一定的代码安全性。字节码相对于源代码或机器码来说更难以理解和修改，可以提供一定程度的代码保护。
3. 当js代码执行了一些错误的操作，eg：`const a = 'as',b=1, c = a*b`会从机器码回退到字节码。
4. 快速启动和解析：将代码转换为字节码可以比直接生成机器码更快速地进行启动和解析。字节码通常具有更简单的格式和结构，可以更快地被引擎加载和解释执行。
5. 动态优化：现代的JavaScript引擎通常具有即时编译（JIT）功能，可以将热点代码编译成高效的机器码。通过首先将代码转换为字节码，引擎可以更好地进行动态优化和编译，根据实际执行情况生成最优的机器码。这种方式可以在运行时根据代码的实际执行情况进行优化，而不需要提前生成固定的机器码。



### V8执行流程

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

**编译型语言**：

* 编译型语言的代码在运行之前需要经过编译器的处理。编译器将源代码一次性地转换成机器代码（或称为目标代码）。
* 编译过程将源代码转换成机器代码的输出文件，可以在以后的执行中直接被计算机处理，无需重新翻译。
* 编译型语言的执行速度通常比解释型语言更快，因为代码在运行之前已经被完全转换成机器代码。
* 编译型语言的缺点是开发过程中相对不够灵活，因为每次修改代码后都需要重新编译才能运行。

总结：

* 解释型语言在运行时逐行解释执行代码，开发灵活但执行速度相对较慢。
* 编译型语言在运行之前将代码转换成机器代码，执行速度较快但开发过程相对不够灵活。
* 选择使用哪种类型的语言取决于项目的需求，包括开发速度、执行速度和可移植性等方面的考虑。

### V8的内存限制

一般后端语言中，基本的内存使用上没有什么限制**，然后node中通过js使用内存会发现，只能使用部分内存，64位系统约1.4GB， 32位系统约0.7GB。**如果我们读入内存一个2GB的文件，即使物理内存有32GB，但在这样单个Node进程的情况下，计算机的内存资源无法得到充足使用。



>
>
># 造成这个问题的原因是什么？
>
>

主要因为Node基于V8构建，所以Node中使用js对象基本上都是V8自己的方式进行分配和管理，V8的内存管理机制在浏览器场景下使用绰绰有余，但在Node中限制了开发者随心所欲使用大内存的想法。

### V8的对象分配

V8中，对象都是通过堆来分配的，我们可以通过`process.memoryUsage()`来查看内存的使用情况。该函数返回值中heapTpal是申请到的堆内存，heapUsed是当前使用量。当我们声明变量并赋值的时候，所使用对象就在堆内存中。**如果堆的空闲空间不足以分配给新对象，会继续申请堆内存，直到堆的大小超过V8的限制。**

>
>
># 为何限制堆内存的大小？

1. 因为对于网页来说V8的限制值已经绰绰有余
2. 根本原因是垃圾回收机制的限制。（官方说法1.5GB的垃圾回收堆内存，V8需要50ms以上，做一次非增量式的垃圾回收甚至需要1s以上）。**而垃圾回收会引起JS线程暂停执行，在这样时间花销下，应用的性能和响应能力都会下降，这样后端和前端都无法接受**

>
>
># 如何解决内存的限制？
>
>**以下两个最大值需要在启动时就指定**

1. 使用命令node --max-old-space-size=1700 test.js //单位为MB  老生代的内存空间
2. node --max-new-space-size=1700 test.js//单位KB  新生代的内存空间







### 隐藏类

[V8隐藏类文档](https://v8.dev/docs/hidden-classes)

[V8隐藏类解读文档](https://hijiangtao.github.io/2018/06/17/Shapes-ICs/)

静态语言中，当创建类型后，就不能再次改变了，属性可以通过固定的偏移量来访问，但在js中却不是，对象的属性的类型、值等信息是可以随时改变的，也就是说运行的时候才能拿到最后的属性内存偏移量，V8为了提升对象的属性获取性能，设计了Hidden Class 隐藏类的概念，每一个对象都有对应的隐藏类，**但JS是动态语言，我们不能预先知道类因此当每次对象的属性发生改变时，V8会动态更新对应的内存偏移量更新到隐藏类中**。V8会将创建的对象和隐藏类关联起来追踪他们的属性特征。每个隐藏类都有一个编号（`map id`），用于唯一标识该隐藏类。

~~~js
function Obj(){
    this.name = 'xx'
}
const a1 = new Obj('x1')
const a2 = new Obj('x2')
~~~

v8会在后台配置，让这两个实例共享相同的隐藏类，因为这两个实例共享同一个构造函数和原型。对于共享隐藏类前提是不能动态控制属性,如下

~~~js
function Obj(){
    this.name = 'xx'
}
const a1 = new Obj('x1')
const a2 = new Obj('x2')
a1.age = 18
~~~

此时Obj实例对应不同的隐藏类，在可能的情况下我们要避免先创建再补充的动态属性赋值方式。

#### 为什么有隐藏类？

因为在JavaScript中，对象可以动态地添加、删除和修改属性，这使得确定对象的结构和类型变得困难。为了解决这个问题，V8引擎引入了隐藏类的概念。隐藏类可以被看作是对象的内部表示，它描述了对象的属性和属性值的布局。V8引擎通过观察对象的创建和属性访问模式，推断出隐藏类，并将相似的对象归为同一隐藏类。当多个对象共享相同的隐藏类时，它们的属性布局也是相同的，这样就可以对它们进行高效的优化

V8使用内联缓存（Inline Caches，ICs）来实现隐藏类的机制。内联缓存是一种缓存机制，用于加速属性的访问操作。当代码中访问对象的属性时，内联缓存会检查对象的隐藏类，并根据隐藏类的布局进行快速的属性访问。



#### V8隐藏类的结构

V8将隐藏类称为Map，学术论文称为隐藏类。**隐藏类中存储了对象属性数量和对象原型的引用**。

![](https://v8.dev/_img/fast-properties/hidden-class.png)

我们可以看到在JS对象中，第一个字段指向隐藏类。

* `Map`：隐藏类本身。它是对象中的第一个指针值，因此可以轻松比较两个对象是否具有相同的类。
* `DescriptorArray`：此类具有的属性的完整列表以及有关它们的信息。在某些情况下，属性值甚至在此数组中。
* `TransitionArray``Map`：从该地图到同级地图的“边”数组。每条边都是一个属性名称，并且应该被视为“如果我要将具有此名称的属性添加到当前类，我会转换到哪个类？”

例如：

~~~js
function Peak(name, height, extra) {
  this.name = name;
  this.height = height;
  if (isNaN(extra)) {
    this.experience = extra;
  } else {
    this.prominence = extra;
  }
}

m1 = new Peak("Matterhorn", 4478, 1040);
m2 = new Peak("Wendelstein", 1838, "good");
m2.cost = "one arm, one leg";
~~~

![V8](https://v8.dev/_img/docs/hidden-classes/drawing-five.svg)

每一个蓝色块都是一个map，每个map都会有一个与该map的对象相关联的属性列表，它描述了每个属性的地址。当传入一个数字Map3指向的就是对象的隐藏类。我们可以从Memory控制台中看到以下：![](/Node/hidden-class.png)

![](/Node/hidden-class2.png)

![](/Node/hidden-class3.png)

* 我们可以看到，peak内的三个对象属性被放到了`descriptors`数组中，而后来代码运行添加的属性被放到了后备属性仓库`back_pointer`中。

* 我们还可以看到属性都加了`const`，因为从V8引擎分析来看，构造函数之后没有再修改过属性了，也就是说在初始化后，属性就不变了，可以被视为常量。

* `cost`属性为什么标记的是p0呢，因为对象中没有空间让他直接存储了，它不能直接存储在对象中，而是存储在`backing store`中的`properties`的索引0处。

  ~~~txt
  d8> %DebugPrint(m2);
  DebugPrint: 0x2f9488e9: [JS_OBJECT_TYPE]
   - map: 0x219473fd <Map(HOLEY_ELEMENTS)> [FastProperties]
   - prototype: 0x2f94876d <Object map = 0x21947335>
   - elements: 0x419421a1 <FixedArray[0]> [HOLEY_ELEMENTS]
   - properties: 0x2f94aecd <PropertyArray[3]> {
      0x419446f9: [String] in ReadOnlySpace: #name: 0x237125e1
          <String[11]: #Wendelstein> (const data field 0)
      0x23712581: [String] in OldSpace: #height:
          1838 (const data field 1)
      0x23712865: [String] in OldSpace: #experience: 0x237125f9
          <String[4]: #good> (const data field 2)
      0x23714515: [String] in OldSpace: #cost: 0x23714525
          <String[16]: #one arm, one leg>
          (const data field 3) properties[0]
   }
   ...
  {name: "Wendelstein", height: 1, experience: "good", cost: "one arm, one leg"}d8>
  ~~~

* 我们可以看到从图中看到map1,map2,map3都指向`DescriptorArray1`.对于Map1只知道`DescriptorArray1`中的`name`属性，Map2只知道`DescriptorArray1`中的`name`和`height`这种共享比较节省内存。

* 对于Map3，如果添加了`experience`则从Map2过度到Map4,如果添加了`prominence`，则从Map2过度到Map3。

* **TransitionArray**用于记录隐藏类这颗树的分叉信息





#### 过渡链和树

在 JavaScript 程序中，多个对象具有相同的键值属性是非常常见的。这些对象都具有相同的形状。

~~~js
const object1 = { x: 1, y: 2 };
const object2 = { x: 3, y: 4 };
//访问具有相同形状对象的相同属性也很常见：
function logX(object) {
	console.log(object.x);
	//          ^^^^^^^^
}
logX(object1);
logX(object2);
~~~

考虑到这一点，JavaScript 引擎可以根据对象的形状（隐藏类）来优化对象的属性获取。它是这么实现的。

![](https://hijiangtao.github.io/assets/in-post/2018-06-17-Shapes-ICs-12.svg)

> **注意**添加属性的顺序会影响隐藏类。例如，`{ x: 4, y: 5 }`的结果不同于`{ y: 5, x: 4 }`。

如果我们给对象添加属性会发生什么？例如：

~~~js
const object = {};
object.x = 5;
object.y = 6;
~~~

![](https://hijiangtao.github.io/assets/in-post/2018-06-17-Shapes-ICs-14.svg)

每次添加新属性，对象隐藏类都会发生变化，V8会创建一颗`transition tree`将隐藏类连在一起，类似于链表结构。当我们将属性`a`添加到`object`这个空对象时，V8知道要使用哪个隐藏类。如果我们以相同顺序添加相同属性，会共享隐藏类。

该对象在初始化时没有任何属性，因此它指向一个空的 shape。下一个语句为该对象添加值为 `5` 的属性 `“x”`，所以 JavaScript 引擎转向一个包含属性 `“x”` 的 Shape，并向 `JSObject` 的第一个偏移量为0处添加了一个值 `5`。 接下来一个语句添加了一个属性 `'y'`，引擎便转向另一个包含 `'x'` 和 `'y'` 的 Shape，并将值 `6` 附加到 `JSObject`（位于偏移量 `1` 处）。每个 Shape 只需要知道它引入的新属性。 例如在此例中，我们不必在最后一个 Shape 中存储关于 `'x'` 的信息，因为它可以在更早的链上被找到。要做到这一点，**每一个 Shape 都会与其之前的 Shape 相连**。

**V8为了快速查找一个对象的属性值，在第一次访问隐藏类时，会记录偏移量，下次再读取该属性值时，只要隐藏类和以前相同就直接根据上次缓存的偏移量拿到值，省略了属性信息查找的过程。**

如果我们创建了一个不同属性呢？例如：

~~~js
const object2 = {}
object2.a = 1
object2.d = 2
~~~

此时V8会为新的隐藏类创建一个单独的分支类似于树的结构。

![](https://v8.dev/_img/fast-properties/transition-trees.png)

总结三点：

* 相同结构的对象（创建属性顺序也要一致）共享隐藏类
* 默认情况下，每个新添加的命名属性都会创建一个新的隐藏类
* 添加数组索引属性不会创建新的隐藏类



#### 快慢属性（内属性和外属性）



**整数索引和命名属性区别**：

~~~js
 {a: "foo", b: "bar"} //命名属性
 ["foo", "bar"] //整数索引  相当于"0":"foo", "1":"bar"
~~~

上面的例子在js内存中长什么样呢？如图所示：![](https://v8.dev/_img/fast-properties/jsobject.png)

①命名属性存放在Properties中 ②整数索引的属性存放在Elements中。③Elements可以是数组结构，也可以是字典。 ④每个js对象都有一个隐藏类，该隐藏类保存了对象形状信息。

V8支持直接在对象本上存储内属性（也就是快属性）

[文档](https://v8.dev/blog/fast-properties)

**快属性**：线性数据结构的读取速度更快（读取复杂度为 O(1)），因此将存储在线性结构中的命名属性称为`快属性`。

**慢属性**：倘若一个对象频繁地增删属性，而 V8 还维持原来的线性结构存储的话，插入和删除的复杂度都为 O(n)，**会耗费大量的时间、内存在维护隐藏类和 Descriptor Array上**。为了减少这部分开销，V8 将这些本来会存储在线性结构中的快属性降级为`慢属性`。此时原本用于存储属性元信息的 Descriptor Array 被置空，转而将信息存储到 properties 内部维护的一个字典（称为 *Properties Dictionary*）中，这样对对象的增删属性操作便不需更新 HiddenClass 了。但这也意味着 V8 内部的`内联缓存`不会生效，所以这种属性被称为慢属性。

~~~js
const foo = function () {
    this.name = '132131';
    this.height = 123123;
    this.prominence = 123213123123213;
    this.prominence1 = 123213123123213;
    this.prominence2 = 123213123123213;
    this.prominence3 = '123213123123213';
    this.prominence4 = '123213123123213';
    this.prominence5 = 123213123123213;
    this.prominence6 = 123213123123213;
    this.experience = 12312314;
    this.prominence11 = 123213123123213;
    this.prominence12 = 123213123123213;
    this['1'] = '1'
    this['2'] = '2'
    this['3'] = '3'
    this['4'] = '4'
    this.prominence = 123213123123213;
}
const test = new foo()
~~~

如上代码内存如图所示：![](/Node/fast-slow-p.png)

总结：

* 对象快属性直接存放在对象身上，提供最快访问速度。
* 快属性存储在属性存储中，所有元信息存储在隐藏类的描述数组中。
* 慢属性存在Properties字典中，元信息不再通过隐藏类共享。
* 慢属性增删速度快，但访问速度慢。

#### V8松弛跟踪

[文档](https://v8.dev/blog/slack-tracking)

松弛跟踪是一种赋予新对象初始尺寸大于其实际使用尺寸的方法，因此它们可以快速添加新属性。然后，经过一段时间后，将未使用的空间返回给系统。因为JavaScript没有静态类。系统永远做不到"看一眼"你有多少属性。引擎一个接一个地执行它们。例如：

~~~js
function Peak(name, height) {
  this.name = name;
  this.height = height;
}
const m1 = new Peak('Matterhorn', 4478);
~~~

你可能认为引擎已经具备了运行良好所需的一切——毕竟你已经告诉它对象有两个属性。然而，V8真的不知道接下来会发生什么。这个对象m1可以传递给另一个函数，给它增加10个属性。

#### 总结

1. 每个js对象都有一个隐藏类。隐藏类会随着我们代码动态变化。
2. **隐藏类用于追踪对象属性的形状。**它记录了对象属性数量、属性类型等，以进行访问属性优化。
3. 当我们创建对象并给对象添加属性时，隐藏类也会动态变化。（js会根据对象的形状，优化属性访问速度，**相同形状的对象会指向同一个隐藏类**）
4. 如果两个对象创建属性顺序一样时，会共享同一个隐藏类。**否则隐藏类会创建分支，并用过渡链在存储分支信息。**
5. 当给对象添加属性时，默认是快属性，直接挂载在对象身上，提供最快的访问速度。属性超过10个的时候就变成慢属性，对于命名属性会存放到Properties上，对于整型的属性会放到Elements上。
6. 慢属性，访问时会慢一点，因为多了一层中间的查询层，需要查询Properties再查看其偏移量，找到对应的值。（V8做了优化，如果前后隐藏类没有发生变化，会缓存这个偏移量下次访问就快了，例如`const obj = {a:123}`,我们访问obj身上属性a，只需要obj的地址加上偏移量就能瞬间找到该属性值）







### V8数组

V8 中的快慢数组，了解数组全填充还是带孔、快慢数组、快慢转化、动态扩缩容等等。其实很多语言底层都采用类似的处理方式，比如：Golang中切片的append操作就涉及扩容处理。

①数组分类：

* 全填充数组：如果一个数组中所有位置均有值，我们称之为`全填充`（**Packed**）数组；
* 带孔数组：若某些位置在初始化时未定义（如 `const arr = [1, , 3]` 中的 arr[1]），或定义后被删除（delete，如上述例子），称之为`带孔`（**Holey**）数组。

~~~js
const o = ['a', 'b', 'c']
console.log(o[1])          // 'b'

delete o[1]
console.log(o[1])          // undefined
o.__proto__ = { 1: 'B' }
console.log(o[0])          // 'a'
console.log(o[1])          // 'B'   但如何确定要访问原型链？？
console.log(o[2])          // 'c'
console.log(o[3])  
~~~

一开始数组 o 是 packed 的，所以访问 o[1] 时可以直接获取值，而不需要访问原型。

而行 4：`delete o[1]` 为数组引入了一个孔洞（`the_hole`），用于标记不存在的属性，同时又行 6 为 o 定义了原型上的 1 属性，当再次获取 o[1] 时会**穿孔**进而继续往原型链上查询。原型链上的查询是昂贵的。

* 快数组
* 慢数组

~~~js
const arr = [1, 2, 3]
arr[1999] = 1999
~~~

这个例子中，在行 1 声明完毕后 arr 是一个全填充的数组，但在行 2 马上又定义索引 1999 处值为 1999，此时如果为 arr 创建一个长度为 2000 的完整数组来存储这样的稀疏数据将会非常占用内存，为了应对这种情况，V8 会将数组降级为`慢数组`，创建一个字典来存储`「键、值、描述符」`（**key、value、descriptor**） 三元组。这就是 `Object.defineProperty(object, key, descriptor)` API 同样会做的事情。

:::tip

鉴于我们没有办法在 JavaScript 的 API 层面让 V8 找到 HiddenClass 并存储对应的 descriptor 信息，所以当使用 `Object.defineProperty` 自定义 key、value、descriptor 时，V8 都会使用慢属性，对应到数组中就是慢数组。

`Object.defineProperty` 是 Vue 2 的核心 API，当对象或数组很庞大时，不可避免地导致访问速度下降，这是底层原理决定的。

快数组就是以空间换时间的方式，申请了大块连续内存，提高了执行效率。

慢数组以时间换空间，不必申请连续的空间，节省了内存，但需要付出效率变差的代价。

:::

快模式：数组实现的是 V8 里一个叫 `FixedArray` 的类，它在内存中是**连续的空间**，直接通过索引读写值，非常快。如果有 push 或 pop 操作，它会动态地扩容或收缩。

慢模式：如前文所介绍，V8 创建了一个字典（`HashTable`）来记录映射关系，其中索引的整数值即是字典的键。

#### 快慢数组转化

* 如果快数组扩容后的容量是原来的 **3 倍以上**，意味着它比 `HashTable` 形式存储占用更大的内存，快数组会转换为慢数组
* 如果快数组新增的索引与原来最大索引的差值大于 1024，快数组会被转换会慢数组



#### 动态扩容

**在原占用空间 old_capacity 的基础上增加一半（old_capacity >> 1 右移 1 位表示除 2，再相加得原空间 1.5 倍），再加上 16**

例如

~~~js
const arr = [1,2,3,4]
arr.push(5)
//old_capacity = 4，new_capacity = 4 + 4 >> 1 + 16 = 22，得出 [1, 2, 3, 4, 5] 的容量为 22 个字节，V8 向操作系统申请一块连续大小为 22 字节的内存空间，随后将老数据copy，再新将新增元素写入。
~~~



#### 缩容

当数组元素减少（如 pop）后，如果数组容量大于等于 length 的 2 倍，则进行容量调整，使用 `RightTrimFixedArray` 函数，计算出需要释放的空间大小，做好标记，等待 GC 回收；如果数组容量小于 length 的 2 倍，则用 holes 对象填充。



### V8Array.sort

 V8默认将元素转换成字符串，然后按照UTF-16码元值升序排序，V8对于长度小于10的数组采用插入排序

对于



## 2.进程

>
>
># 单线程的好处

Node选型时决定在V8引擎上构建，就意味着它的模型与浏览器类似。我们的JS运行在单个进程的单个线程上，它带来的好处是程序状态单一，没有多线程情况下的锁和线程同步问题，操作系统在调度时也因为较少的上下文切换可以很好的提高CPU的使用率。

>
>
># 单线程带来的问题

1. Node进程只能利用一个核，如何充分利用多核CPU服务器？
2. 一旦单线程抛出异常没有被捕获将引起整个进程的崩溃，如何保证进程的健壮性和稳定性？

**实际上，Node并非真正的单线程架构，其自身由一定的I/O线程由底层libuv处理，这部分线程对于JS开发者是透明的**



## 2.1、服务器模型的变迁过程

同步-》复制进程-》多线程-》事件驱动

1. 同步：一次只能服务一个请求，所有请求按次序等待服务（基本淘汰，只在无并发要求应用中存在）
2. 复制：通过复制进程来服务更多请求，但是代价很高，因为进程复制过程中，需要复制进程内部的状态，对于每个连接都进行复制的话，相同状态在内存中存在多分，资源利用率低，并且由于要复制的数据多，启动比较慢。
   * 为了解决启动慢的问题：预复制被引入服务器模型中，即先复制一定数量的进程，同时将进程复用避免进程的创建、销毁带来的开销。但是一旦并发量高，内存会随着进程数量的增多而消耗殆尽。
3. 多线程：让一个线程服务一个请求。线程之间可以共享数据，解决了内存浪费问题，并且利用线程池可以减少创建和销毁线程的开销。但是多线程面临的并发问题只是比多进程略好，因为每个线程都拥有自己独立的堆栈，需要占用一定的内存空间。另外由于CPU核心在一个时刻只能做一件事，操作系统只能通过CPU切分时间片的方式，让线程轮流使用CPU资源，但是操作系统内核在切换线程的同时也要切换线程的上下文，当线程数量太多，事件会被消耗在上下文的切换中，因此高并发量，多线程还是无法做到强大的伸缩性。（Apache就是采用多线程/多进程模型实现，当并发量增长到上万时，内存耗用问题就暴露了出来，这就是C10K问题）
4. 事件驱动：Node和Nginx基于事件驱动方式实现。基于事件驱动的服务模型存在两个待解决的问题1.CPU利用率 2.进程的健壮性



## 2.2、多进程架构

面对单线程对多核利用率低的问题，我们可以启动多进程即可，理想状态下，进程各自利用一个CPU，以此实现多核CPU利用，而Node提供了child_process模块，并且提供了child_process.fork()函数来实现进程复制。

>
>
># 主从模式

~~~js
在worker.js文件中
var http = require('http')
http.createServer((req,res)=>{
    res.writeHead(200,{ 'Content-Type':'text/plain' })
    res.end('Hello World')
}).listen(Math.round((1+Math.random())*1000),'127.0.0.1')
//通过node worker.js启动它，它将会侦听1000-2000之间的随机端口
在master.js中
var fork = require('child_process').fork
var cpuLength = require('os').cpus()
for(let i = 0;i<cpuLength;i++) fork('./worker.js')
~~~

上面的代码采用了主从模式，该模式如下图

![](/Node/workers-1.png)

通过fork()复制的进程都是独立的进程，这个进程有独立而全新的V8实例。它需要至少30ms的启动时间和10MB的内存。**Node通过事件驱动的方式在单线程上解决了高并发的问题，这里启动多个进程只是为了充分利用CPU。**

### 2.2.1、创建子进程

在Node中创建子进程分为异步和同步

1. 异步进程

   * [`child_process.spawn()`]、[`child_process.fork()`]、[`child_process.exec()`] 和 [`child_process.execFile()`] 函数都遵循 Node.js API 惯用的异步编程模式。

     每个函数都返回 [`ChildProcess`] 实例。 这些实例实现了 Node.js [`EventEmitter`] API，允许父进程注册监听器函数，在子进程生命周期期间，当特定的事件发生时会调用这些函数。

     [`child_process.exec()`] 和 [`child_process.execFile()`] 函数可以额外指定一个可选的 `callback` 函数，当子进程结束时会被调用。

   * [`child_process.exec()`] 和 [`child_process.execFile()`] 之间的区别会因平台而不同。 在类 Unix 操作系统（Unix、 Linux、 macOS）上，[`child_process.execFile()`] 效率更高，因为它不需要衍生 shell。 **但在 Windows 上，`.bat` 和 `.cmd` 文件在没有终端的情况下是不可执行的，因此不能使用 [`child_process.execFile()`] 启动。 可以使用设置了 `shell` 选项的 [`child_process.spawn()`]、或使用 [`child_process.exec()`]、或衍生 `cmd.exe` 并将 `.bat` 或 `.cmd` 文件作为参数传入（也就是 `shell` 选项和 [`child_process.exec()`] 所做的工作）**。 如果脚本文件名包含空格，则需要加上引号。

   * ![image-20220811101017601](/Node/apis-1.png)

   * ![image-20220811101058790](/Node/apis-2.png)

   * 如果是JS文件通过execFile运行，它的首行要加上如下代码：`#！/usr/bin/env node`

### 2.2.2、进程间的通信

>
>
># 浏览器中web worker

在前端浏览器中,JS主线程和UI渲染引擎共用同一个线程，两者互相阻塞，长时间JS会造成UI停顿不响应。为了解决这个问题HTML5提出了Web Worker的API，允许创建工作线程并在后台运行，使得一些阻塞严重的计算不影响主线程的UI渲染。

~~~js
const worker = new Worker("worker.js")
worker.onmessage = function (event){
    document.getElementById('result').textContent = event.data
    if(event.data>30000) worker.terminate();
}
在worker.js中
var n = 1
label:while(true){
    n+=1
    for(let i = 2;i<=Math.sqrt(n);i+=1){
        if(n%i==0)continue label;
        postMessage(n)
    }
}
~~~

>
>
># 浏览器中多个tab标签页通信方式

1. 通过localstorage，一个标签页中添加修改，另一个标签页中进行监听storage事件即可。

   * ~~~js
     localStorage.setItem(msg,'hello')
     
     另一个标签页中
     window.onload = ()=>{
         window.addEventListener('storage',function(event){
             console.log(event.msg,event.newValue)
         })
     }
     ~~~

2. 利用Cookie+setInterval，一个标签页中设置Cookie另一个标签页轮询Cookie的变化

3. WebSocket通讯

   * WebSocket 是全双工（full-duplex）通信自然可以实现多个标签页之间的通信（服务器可以主动发数据给浏览器；浏览器也可以主动发数据给服务器）。WebSocket 是HTML 5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

4. html5浏览器的新特性sharedWorker

   * 普通的 webworker 直接使用 `new Worker()` 即可创建，这种 webworker 是当前页面专有的。然后还有种共享 worker(SharedWorker)，这种是可以多个标签页、iframe共同使用的。SharedWorker 可以被多个 window 共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

   * 首先新建一个is文件worker.js, 具体代码如下: .

     ```js
     // shareWorker 所要用到的js文件，不必打包到项目中，直接放到服务器即可
     
     let data = " ";
     let onconnect = function (event) {
       let port = event.ports[0];
       port.onmessage = function (e) {
         if (e.data === "get") {
           port.postMessage(data);
         } else {
           data = e.data;
         }
       };
     };
     
     try {
       var worker = new SharedWorker("worker.js");
       var getBtn = document.getElementById("get");
       var setBtn = document.getElementById("set");
       var txt = document.getElementById("txt");
       var log = document.getElementById("log");
     
       worker.port.addEventListener("message", function (e) {
         log.innerHTML = e.data;
         console.log(" --- 获取到数据 e.data --- ", e.data);
       });
     
       worker.port.start();
     
       setBtn.addEventListener(
         "click",
         function (e) {
           worker.port.postMessage(txt.value);
         },
         false
       );
     
       getBtn.addEventListener(
         "click",
         function (e) {
           worker.port.postMessage("get");
         },
         false
       );
     } catch (error) {
       console.log(" --- error --- ", error);
     }
     ```

># node中

~~~js
parent.js中
const cp = require('child_process')
const n = cp.fork(__dirname+'/sub.js')
n.on('message',(msg)=>{
    console.log('PARENT got message:',msg)
})
n.send({
    msg:'Hello I am Farther'
})
sub.js中
process.on('message', msg=>{
    console.log('CHILD got Message:',msg)
})
process.send({
    msg:'Hello I am Child '
})
~~~

### 2.2.3、进程通信的原理

Inter-Process Communication。![image-20220811103044926](/Node/structure-1.png)

进程通信目的是为了让不同进程互相访问资源协调工作。实现进程通信的技术有很多，eg：命名管道、匿名管道、socket、信号量、共享内存、消息队列、Domain Scoket等。Node实现进程通信用的管道技术Pipe，在Node中管道是个抽象层面的称呼，具体实现由libuv提供，在Windows下面由命名管道实现。

**父进程创建子进程之前会创建IPC通道并监听它，然后才真正创建子进程，并通过环境变量NODE_CHANNEL_FD告诉子进程这个IPC通道的文件描述符，子进程在启动过程中根据文件描述符连接这个已存在的IPC通道**

![image-20220811105004278](/Node/IPC.png)

父子进程的通信属于双向通信，**它们在操作系统内核中完成进程间的通信，不用经过网络层因此十分高效。**而子进程和父进程不能监听同一个端口号，**通常主进程监听主端口号如80，主进程对外接受所有网络请求，然后将请求分别代理到不同端口的进程上。**

![image-20220811105324794](/Node/talk-1.png)

#### 2.2.3.1、句柄

># 为什么会有句柄的出现？

通过代理可以避免不能重复监听的问题，甚至可以在代理进程上做适当的负载均衡，由于每个进程每接受一个连接就会用掉一个文件描述符，因此代理方案中客户端连接到代理进程，代理进程连接到工作进程的过程需要用掉两个文件描述符，而操作系统文件描述符是有限的，代理方案浪费掉一倍数量的文件描述符会影响系统扩展能力，为了解决以上问题Node引入了进程间发送句柄的功能。**使用句柄后意味着，主进程接收到socket请求后，将这个socket直接发给工作进程，而不是重新与工作进程之间建立新的scoket连接来转发数据。**





>
>
># 句柄是什么？

句柄是一种用来表示资源的引用，它内部包含了指向对象的文件描述符。eg：句柄可以表示一个服务端/客户端socket对象、一个UDP套接字、一个管道等

>
>
># 如何使用？

实际开发中，我们将服务器句柄发给子进程后，就可以关掉服务器的监听，让子进程来处理请求

~~~js
parent.js中
const cp = require('child_process')
const child1 = cp.fork('child.js')
const child2 = cp.fork('child.js')
const server = require('net').createServer()
server.listen(1337,()=>{
    child1.send('server',server)
    child2.send('server',server)
    server.close()关掉主进程的服务器监听
})
child.js中
const http = require('http')
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('handled by child ,pid is'+process.pid)
})
process.on('message',(m,tcp)=>{
    if(m=='server'){
        tcp.on('connection',(scoket)=>{
            server.emit('connection',sokcet)
        })
    }
})
~~~

![](/Node/talk-2.png)

可以发现多个子进程可以监听同一个端口并且没有Eaddrinuse异常发生了

#### 为什么多进程可以监听相同端口

因为独立启动的进程中，TCP服务端Socket套接字的文件描述符不同，此时监听相同端口会抛出异常。但对于send发送的句柄还原出来的服务，它们的文件描述符是相同的，所以监听相同端口不会引起异常。

### 集群

子进程对象除了send和message事件外还有

1. error：当子进程无法被复制创建、无法被杀死、无法发送消息时触发
2. exit：子进程退出时触发，如果子进程被kill方法杀死回调中第二个参数标识杀死进程时的信号
3. close：子进程标准输入输出流终止时触发，参数和exit相同
4. disconnect：父进程或子进程调用disconnect方法时触发



#### 负载均衡

多进程之间监听相同端口，使用户请求能够分散到多个进程上处理。

Node采用抢占式策略，哪个进程抢到哪个进程就服务。

在后续的版本升级为轮叫调度策略。轮叫调度工作方式由主进程接受连接，将其依次分发给工作进程。

#### 状态共享

Node进程中不适合存放太多数据来加重垃圾回收的负担。Node不允许多进程之间共享数据，但是实际业务中往往有一些需要共享的数据，例如配置。因此有一些的方案和机制实现进程之间共享。

1. 第三方数据存储：将数据存到数据库、磁盘、缓存服务中，所有工作进程启动时将其读入内存。
   1. 缺点：数据发生改变需要通知每个子进程，使得每个子进程内部状态得到更新。实现状态同步机制有两种
      1. 定时轮询（这种方式缺点很明显，1.数据没改变轮询没意义 2.轮询的时间设置很关键，太短会形成并发处理，太长数据更新不及时）
      2. 主动通知，当数据发生改变由主进程通知子进程。（这种方式本质上还是轮询，知识轮询的发起者由多个子进程变成主进程轮询然后通知子进程）

#### Cluster

cluster的本质是通过简单的主从模式，让每一个子进程做好一件事。通过child_process模块能够大幅提高Node的稳定性，但是主进程一旦出问题，所有子进程就失去管理。因此还需要结合监听日志来保障系统稳定性。

~~~js
const cluster = require('cluster')

cluster.setupMater({
    exec:"worker.js"
})
const cpus = require('os').cpus()
for(let i = 0;i<cpus;i++){
	cluster.fork()
}
//判断是工作进程还是主进程
'NODE_UNIQUE_ID' IN PROCESS.ENV === false
~~~



#### Cluster工作原理

`cluster`是`child_process`和net模块的组合。`cluster`启动时会在内部启动TCP服务，在`cluster.fork()`子进程时会将TCP服务端scoket的文件描述符发给工作进程，工作进程的环境变量存在`NODE_UNIQUE_ID`,如果工作进程存在listen侦听网络端口的调用，它将拿到该文件描述符，通过`SO_REUSEADDR`端口重用，从而实现多个子进程共享端口

在TCP编程中，当一个socket连接被关闭后，操作系统会将该连接使用的端口号保留一段时间，以确保任何后续传入的数据包都不会被误认为是该连接的数据包。这段时间称为“TIME_WAIT”状态，它通常持续几分钟。如果在此期间内尝试重新使用该端口号启动一个新的socket连接，就会导致“Address already in use”错误。为了避免这种情况，可以使用`SO_REUSEADDR`选项来启用端口重用。通过设置`SO_REUSEADDR`选项，可以在新的`socket`连接启动之前，允许操作系统立即重新使用该端口号。在Node.js中，可以通过设置socket的`SO_REUSEADDR`选项来启用端口重用。

~~~js
const net = require('net');

const server = net.createServer((socket) => {
  // 处理新的socket连接
});

// 启用SO_REUSEADDR选项
server.on('listening', () => {
  server.setReuseAddress(true);
});

server.listen(3000);
~~~

在上面的示例中，我们创建了一个TCP服务器，并设置了SO_REUSEADDR选项。当服务器开始监听端口时，会触发`listening`事件，我们在事件处理程序中通过调用`server.setReuseAddress(true)`来启用端口重用功能。需要注意的是，SO_REUSEADDR选项并不是在所有情况下都适用的。在某些情况下，使用该选项可能会导致数据包的混乱或安全问题。因此，在启用SO_REUSEADDR选项之前，应该仔细评估应用程序的需求和安全性，并确保了解该选项的工作原理和限制。



### 概念的解释

**什么是句柄**

在Node.js中，“句柄”（handle）通常是指一个可以被程序引用和操作的资源对象，例如文件、网络连接、进程等等。在底层实现中，句柄通常是一个整数或指针，它表示了系统中某个资源的唯一标识符。

**什么是scoket**

“socket”则是一种网络编程的概念，它指的是一个网络连接的端点。在Node.js中，一个socket通常是通过创建一个TCP或UDP服务器，并在服务器上监听一个端口来实现的。当客户端连接到该端口时，服务器会创建一个新的socket对象来代表这个连接。程序可以通过socket对象来读写网络数据，控制连接的状态等等。

因此，在Node.js中，一个socket通常也是一个句柄（handle），它代表了一个网络连接的资源对象。程序可以使用socket句柄来进行网络编程，实现高性能的网络应用。

**什么是文件描述符**

在Unix/Linux系统中，所有的I/O操作（包括网络I/O和文件I/O）都是通过文件描述符（file descriptor）来进行的。文件描述符是一个非负整数，它代表了一个打开的文件或socket连接。

在Node.js中，一个socket连接也是通过文件描述符来进行操作的。Node.js使用libuv库来实现底层I/O操作，libuv将每个socket连接封装成一个uv_stream_t结构体，其中包含了文件描述符。

当我们使用Node.js提供的网络API（如net、http等模块）创建socket连接时，程序会调用底层的系统调用（如socket()、connect()等函数）来创建和操作socket连接，这些系统调用会返回一个文件描述符，Node.js会将该文件描述符保存在对应的socket对象中。程序可以通过该socket对象来进行读写操作，底层实现会使用该文件描述符来进行I/O操作。

以下是一个示例，演示如何获取socket对象的文件描述符：

```js
const net = require('net');

const socket = net.createConnection(3000, 'localhost', () => {
  console.log('socket connected');
  const fd = socket._handle.fd;
  console.log('socket file descriptor:', fd);
});
```

在上面的示例中，我们使用`net.createConnection()`方法创建一个socket连接，并在连接成功后，获取了该socket连接的文件描述符。由于socket对象的底层实现是由Node.js的C++代码实现的，因此我们需要通过访问socket对象的`_handle`属性来获取底层的uv_stream_t结构体，然后从中获取文件描述符。





## 3.异步I/O

操作系统内核对于I/O只有两种方式：阻塞和非阻塞

>
>
># 阻I/O

特点：调用之后要等到系统内核层面完成所有操作后，调用才结束。eg：读取磁盘上的某个文件，系统内核在完成磁盘寻道、读取数据。复制数据到内存中后，这个调用才结束。

缺点：造成CPU等待I/O，浪费等待时间，CPU得不到充分利用。

>
>
># 非阻塞I/O

调用之后会立即返回结果，

操作系统对计算机进行了抽象，将所有的输入输出设备抽象为文件。内核在进行文件I/O操作时，通过文件描述符进行管理，**而文件描述符类似于应用程序和系统内核之间的凭证。应用程序如果需要I/O调用需要先打开文件描述符，然后根据文件描述符去实现文件数据的读写。阻塞I/O会完成整个获取数据的过程，而非阻塞I/O不带数据直接返回，要获取数据还需要通过文件描述符在再次读取。**

缺点:**由于完成的I/O并没有完成，立即返回的不是业务层期望的数据而是当前调用的状态，为了获取完整的数据，应用程序需要进行轮询。**

### 3.1、轮询技术

>
>
># 1.read：最原始、性能最低的一种，通过重复调用检查I/O状态来完成完整数据的读取。在得到最终数据之前，CPU一直耗用在等待上

![image-20220811132117722](/Node/structure-2.png)

>
>
># 2.select：在read基础上改进，通过对文件描述符上的事件状态来判定。

![image-20220811132210188](/Node/structure-3.png)

缺点：**select轮询采用一个1024长度的数组存储状态，因此最多同时检查1024个文件描述符。**

>
>
># 3.poll：采用链表方式避免数组长度的限制，并避免不需要的检查。但是当文件描述符多的时候，性能还是很低。

![image-20220811132341364](/Node/structure-4.png)

>
>
># 4.epoll：在Linux系统下效率最高的I/O事件通知机制，在进入沦胥的时候如果没检查到I/O事件将会休眠，直到事件发生将其唤醒。它利用事件通知、执行回调的方式而不是遍历查询，因此不会浪费CPU，执行效率最高。

![image-20220811132507320](/Node/structure-5.png)



总结：**轮询技术满足了非阻塞I/O确保获取完整数据的需求，但是对于应用程序仍然时同步，应用程序依然要等待I/O完全返回，所以还要花费很多时间等待，等待期间CPU要么处于遍历文件描述符的状态，要么用于休眠等待时间发生。**

### 3.2、异步I/O实现

完美的异步I/O是应用程序发起非阻塞调用，无需通过遍历，或者事件唤醒等方式轮询，可以直接处理下一个任务，只需要在I/O完成后通过信号或者回调将数据传递给应用程序。

现实中，是通过让部分线程进行阻塞或非阻塞I/O加轮询技术来完成获取数据，让一个线程进行计算处理，通过线程之间的通信将I/O得到的数据进行传递。



### 3.3、事件循环

在进程启动时，Node便会创建一个类似于死循环，没执行一次循环体的过程我们称为Tick。每个Tick的过程就是查看是否有事件待处理，如果有就取出事件及相关的回调函数，如果存在关联的回调函数就执行，然后进入下一个循环。如果没有事件处理就退出程序。事件循环机制是一个典型的生产者/消费者模型，异步I/O、网络请求都是事件的生产者。

3.2.1、观察者

>
>
># 在每个Tick的过程中，如何判断有事件需要处理？

每个事件循环都至少有一个观察者，只需要向观察者询问是否有处理的事件即可判断有无事件需要处理。观察者根据异步I/O或网络请求等事件的生产者那里取出事件并处理。在Windows下这个循环基于IOCP创建，Linux基于多线程创建

### 3.2.2、请求对象

>
>
># 从我们发出调用到回调函数被执行，js代码到系统内核之间发生了什么？

对于Node的异步I/O回调函数不由开发者来调用。事实上，从JS发起调用到内核执行完I/O操作的过程中会产生请求对象。JS层面的代码通过调用Node的核心模块，核心模块调用C++内建模块，内建模块通过libuv进行系统调用，这是Node的经典调用方式，

1. libuv作为封装层有两个平台的实现。实质上调用uv_fs_open方法，在该方法调用中会创建一个FSReqWrap的请求对象，从JS层传入的参数和当前方法都被封装到这个请求对象中
2. 对象包装完后在Windows下会调用QueueUserWorkItem()方法将FSReqWrap对象推入到线程池中等待执行。
3. 当线程池有可用线程就调用uv_fs_thread_proc()方法，至此JS调用立即返回，有JS层发起的异步调用第一决断就此结束，JS线程可以继续执行当前任务的后续操作，当前的I/O操作在线程池中等待执行，不管他是否阻塞I/O都不会影响到JS线程的后续执行，如此就达到了异步的目的。

### 3.2.3、执行回调

当组装好请求对象、送入I/O线程池等待执行是第一部分。回调通知是第二部分。

> # 什么时候通知回调呢？

当线程池中的I/O操作调用完毕后，会将获取的结果存储到req-》result属性上然后调用PostQueuedCompletionStatus()通知IOCP告知当前对象操作已经完成，该方法向ICOP提交执行状态并将线程归还线程池，通过该方法提交的状态，在每次Tick执行中会调用IOCP相关的GetQueuedCompletionStatus()检查线程池中是否有执行完的请求，如果有就将请求对象加入到I/O观察者队列中，然后当作事件处理。I/O观察和回调函数的行为就是取出请求对象的result属性作为参数，取出oncomplete_sym属性作为方法调用执行，达到调用js传入回调函数的目的。

![image-20220811161731063](/Node/structure-6.png)





### 3.4、非I/O的异步API



setTimeout、process.nextTick、setImmediate

优先级：

1. process.nextTick属于idle观察者
2. setImmediate属于check观察者
3. I/O观察者
4. （定时器需要动用红黑树，创建定时器对象和迭代等操作，setTimeout(fn,0)方式比较浪费性能）

==在具体体现上process.nextTick的回调函数存在数组中，setImmediate存在链表中。==

==在行为上，process.nextTick每轮循环中会将数组中的回调函数全部执行完，而setImmediate在每轮循环中执行链表的一个回调函数==

这样做的目的是为了保证每轮循环能够较快的执行结束，防止CPU占用过多而阻碍后续I/O调用





### 3.5、node的事件循环机制总结

在Node应用程序启动后并不会立即进入事件循环，而是先执行输入代码，从上到下执行同步代码，异步API交给C++维护线程执行，异步API的回调函数被注册到对应的事件队列中。当所有输入代码执行完成后开始进入事件循环

![image-20220811173213939](/Node/Event-loop.png)

**timers**：执行setTimeout() 和 setInterval()中到期的callback。

**pending callback**: 上一轮循环中有少数的I/O callback会被延迟到这一轮的这一阶段执行

**idle, prepare**：仅内部使用

==**poll**: 最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段==

**check**: 执行setImmediate的callback

**close callbacks**: 执行close事件的callback，例如socket.on('close'[,fn])、http.server.on('close, fn)



在每一个阶段都有事件队列，而nextTick的在微任务中的优先级最高，如果有nextTick会先执行，然后再执行其他微任务如promise.then finally等，













<CommentService/>