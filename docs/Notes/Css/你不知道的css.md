---
lang: zh-CN
title: 你不知道的css
description: 关键功能
collapsible: true
---
# 你不知道的css



## 文字不允许选中

~~~css

user-select:none

~~~



## Houdini

Houdini 是一组底层 API，它们公开了 CSS 引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展 CSS。Houdini 是一组 API，它们使开发人员可以直接访问[CSS 对象模型](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model) （CSSOM），使开发人员可以编写浏览器可以解析为 CSS 的代码，从而创建新的 CSS 功能，而无需等待它们在浏览器中本地实现。	

Houdini的优点

* 当样式改变时 Houdini 相比行内样式的方式能够能够更快的解析。
* 一个 CSS Houdini 的特性就是 [Worklet (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Worklet)。在它的帮助下，你可以通过引入一行 JavaScript 代码来引入配置化的组件，从而创建模块式的 CSS。不依赖任何前置处理器、后置处理器或者 JavaScript 框架。



### CSS属性

1️⃣注册自定义属性

--注册的属性是自定义属性，只有被`var()`使用的自定义属性才是css变量

普通自定义属性声明，可以看到CSS自定义属性无法声明他的类型，自定义属性只不过是个字符串。

~~~css
:root{
	--main-color:#fff;
}
~~~

CSS Houdini 对CSS自定义属性进行了扩展 CSS Houdini有两种声明属性方式 

~~~css
CSS.registerProperty({
    name:'--main-color',
    syntax:'<color>',
    inhertis:false,
    initialValue:'#fff'
})
// 方式二
@property --main-color{
    syntax:'<color>';
    initial-value:#fff;
    inherits:false;
}
~~~

2️⃣自定义属性作用域

一般放在`:root和html`选择器中的自定义属性是全局的，html权重小于root.



### var函数

1️⃣var支持回退

var函数可以传入一个css自定义属性，并且var函数支持回退，也就是默认值（当var函数引用了一个未定义的自定义属性就会采用第二个参数作为引用的值）。

~~~css
:root{
    --main-color:#fff;
}
.test{
    color:var(--main,'red')
}
~~~

2️⃣var可以嵌套

~~~
.box{
	background-color:var(--a,var(--b))
}
~~~

#### JS操作

1️⃣设置自定义属性

普通CSS自定义属性的操作

我们除了可以使用`--var`注册一个css自定义属性还可以通过js的`style.setProperty`动态注册一个自定义属性。例如`div.style.setProperty('--main-color','#fff')`执行完这个脚本后会在标签上添加style属性例如`<div style="--main-color:#fff"></div>`

Houdini操作

在JS中我们可以使用以下方式来注册一个自定义属性

~~~js
CSS.registerProperty({
    name:'--main-color',
    syntax:'<color>',
    inherits:true,
    initialValue:'#fff'
})
~~~

2️⃣获取自定义属性的值

~~~js
getComputedStyle(document.documentElement).getPropertyValue('--main-color')
~~~







<CommentService/>