---
lang: zh-CN
title: babel
description: 关键功能
collapsible: true
---
# babel

[文档](https://babel.dev/docs/)

**babel是什么？**babel是转移器（高级代码编译成高级代码），转译 esnext、typescript、flow 等到目标环境支持的 js

**使用场景：**

* 代码转换，例如小程序转译工具 taro，就是基于 babel 的 api 来实现的。
* 例如，函数插桩，在代码中插入一些其他代码（埋点，自动国际化）



## babel的编译流程

1. parse：遍历源码转成AST
2. transform：遍历AST，调用各种transform对AST增删改
3. generate：将AST打印成目标代码并生成sourcemap





## AST结点

babel的AST结点很多例如：

* Literal：字面量的意思，例如`const a = false`这个false就是一个布尔字面量。字面量分很多类，例如模板字面量（模板字符串），数字字面量，字符串字面量等等
* identifier：标识符，例如变量名属性名和参数名等
* statement：语句例如循环，条件语句都是
* Declaration：执行逻辑在声明遍历，函数，class，import，export。
* experssion：表达式，例如`1+2`
* class: 就是专门为类服务的AST结点。
* Modules，esm的模块。包括import export



## babelAPI

 babel 的编译流程分为三步：parse、transform、generate，每一步都暴露了一些 api 出来。

* parse 阶段有`@babel/parser`，功能是把源码转成 AST
* transform 阶段有 `@babel/traverse`，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 `@babel/types` 了，当需要批量创建 AST 的时候可以使用 `@babel/template` 来简化 AST 创建逻辑。
* generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 `@babel/generator` 包
* 中途遇到错误想打印代码位置的时候，使用 `@babel/code-frame` 包
* babel 的整体功能通过 `@babel/core` 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset。



### @babel/parse

主要基于acorn和acorn-jsx，扩展了很多语法，可以支持 es next（现在支持到 es2020）、jsx、flow、typescript 等语法的解析。

它提供了有两个 api：parse 和 parseExpression。两者都是把源码转成 AST，不过 parse 返回的 AST 根节点是 File（整个 AST），parseExpression 返回的 AST 根节点是是 Expression（表达式的 AST），粒度不同。

* `babelParser.parse(code,[options])`

* `babelParser.parseExpression(code,[options])`

options参数

* **allowImportExportEverywhere**：允许import和export不出现在顶层
* **plugins**数组类型，接收希望启用的插件















<CommentService/>