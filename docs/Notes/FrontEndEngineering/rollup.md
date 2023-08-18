---
lang: zh-CN
title: rollup
description: 关键功能
collapsible: true
---
# rollup

[Rollup官方文档](https://cn.rollupjs.org/introduction/ )

## 1.安装Rollup

~~~shell
pnpm install rollup -D
~~~

## 2.Rollup命令行打包

编译成立即执行函数

~~~shell
# 编译为包含自执行函数（'iife'）的 <script>。
rollup main.js --file bundle.js --format iife
~~~

打包成cjs （将main.js以commenjs规范打包成bundle.js）

~~~shell
# 编译为一个 CommonJS 模块 ('cjs')
rollup main.js --file bundle.js --format cjs
~~~

浏览器和Node（将main.js以umd格式打包到bundle.js并声明全局变量名myBundle）

~~~shell
# UMD 格式需要一个包名
rollup main.js --file bundle.js --format umd --name "myBundle"
~~~

1. `-c`-> `--config`后面跟配置文件路径
2. `-o`->`--file`输出的文件名
3. `--dir`当使用代码分割功能实现惰性动态加载（其中某些导入的模块仅在执行函数后加载）Rollup 将使用动态导入创建一个仅在需要时加载的单独块。为了让 Rollup 知道在哪里放置第二个`chunk`此时使用
4. `-e`->`--external`排除需要被bundle的模块



## 3.Rollup集成typescript

`Rollup`可以使用其他语言编写配置文件，比如 TypeScript。为此，安装相应的 Rollup 插件，例如 `@rollup/plugin-typescript`，并使用 [`--configPlugin`](https://cn.rollupjs.org/command-line-interface/#configplugin-plugin) 选项：

~~~shell
rollup --config rollup.config.ts --configPlugin typescript
~~~



## 4.常用配置选项

### external

用于指定不需要打包成bundle的模块

1. ~~~js
   	external: [
   		'some-externally-required-library',
   		fileURLToPath(
   			new URL(
   				'src/some-local-file-that-should-not-be-bundled.js',
   				import.meta.url
   			)
   		),
   		/node_modules/
   	]
   ~~~

### input

指定 bundle 的入口文件。如果值为一个入口文件的数组或一个将名称映射到入口文件的对象，那么它们将被打包到单独的输出 chunks。除非使用 [`output.file`](https://cn.rollupjs.org/configuration-options/#output-file) 选项，否则生成的 chunk 名称将遵循 [`output.entryFileNames`](https://cn.rollupjs.org/configuration-options/#output-entryfilenames) 选项设置。

当选项的值使用对象形式时，可以通过在名称中添加 `/` 来将入口文件放入不同的子文件夹。以下例子将根据 `entry-a.js` 和 `entry-b/index.js`，产生至少两个入口 chunks，即 `index.js`文件将输出在 `entry-b` 文件夹中：

~~~js
// rollup.config.js
export default {
  input: {
    a: 'src/main-a.js',
    'b/index': 'src/main-b.js'
  },
  output: {
    ...,
    entryFileNames: 'entry-[name].js'
  }
};
~~~

### output

#### dir和file

该选项用于指定所有生成的 chunk 被放置在哪个目录中。如果生成一个以上的 chunk，那么这个选项是必需的。否则，可以使用 `file` 选项来代替。

~~~js
output:[
    {
        dir:'bundle.js'
        ...
    }
]
也可以用file替代
output:[
    {
        file:'dist/bundle.js'
        ...
    }
]
~~~

#### format

该选项用于指定生成的 bundle 的格式。满足以下其中之一：

* `amd` – 异步模块加载，适用于 RequireJS 等模块加载器
* `cjs` – CommonJS，适用于 Node 环境和其他打包工具（别名：`commonjs`）
* `es` – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 `<script type=module>` 标签的浏览器。（别名：`esm`，`module`）
* `iife` – 自执行函数，适用于 `<script>` 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。
* `umd` – 通用模块定义规范，同时支持 `amd`，`cjs` 和 `iife`
* `system` – SystemJS 模块加载器的原生格式（别名：`systemjs`）



#### generatedCode

代码降级

* `"es5"`：不能使用 ES2015+ 的特性，比如箭头函数，不能使用引号包裹的预留词汇作为属性名。
* `"es2015"`：使用任意 ES2015 之前的 JavaScript 特性。

`output.generatedCode.arrowFunctions`

| 类型： | `boolean`                                                    |
| -----: | ------------------------------------------------------------ |
|  CLI： | `--generatedCode.arrowFunctions`/`--no-generatedCode.arrowFunctions` |
| 默认： | `false`                                                      |

该选项表示是否为自动生成的代码片段使用箭头函数。请注意，在某些地方，比如模块封装器，Rollup 会继续生成用小括号封装的常规函数，因为在一些 JavaScript 引擎中，这些函数会提供 [明显更好的性能](https://v8.dev/blog/preparser#pife)。

:::tip

小括号封装的常规函数为什么能获得更好的性能？

通过急切解析和编译 立即执行函数，V8 引擎可以更早地得知哪些函数在启动过程中是需要的，从而避免了不必要的预解析。但是也会带来一定的内存开销。

:::

`output.generatedCode.constBindings`
将var替换成const

| 类型： | `boolean`                                                    |
| -----: | ------------------------------------------------------------ |
|  CLI： | `--generatedCode.constBindings`/`--no-generatedCode.constBindings` |
| 默认： | `false`                                                      |



#### minifyInternalExports

| 类型： | `boolean`                                                    |
| -----: | ------------------------------------------------------------ |
|  CLI： | `--minifyInternalExports`/`--no-minifyInternalExports`       |
| 默认： | 在 `es`、`system` 格式下或者 `output.compact` 值为 `true` 的情况下值为 `true`，否则为 `false` |

默认情况下，在 `es`、`system` 格式下或者 `output.compact` 值为 `true` 的情况下该选项值为 `true`，这意味着 Rollup 会尝试把内部变量导出为单个字母的变量，以便更好地压缩代码。



#### SourcemapFile

| 类型： | `string`                                |
| -----: | --------------------------------------- |
|  CLI： | `--sourcemapFile <file-name-with-path>` |

该选项用于指定生成 sourcemap 文件的位置。如果是一个绝对路径，那么 sourcemap 文件中的所有 `sources` 文件路径都相对于该路径。`map.file` 属性是 `sourcemapFile` 的基本名称，因为 sourcemap 文件一般是和其构建后的 bundle 处于同一目录。

如果 `output` 设置了值，那么 `sourcemapFile` 不是必须的，这种情况下，它的值会通过输出文件名中添加“.map”推断出来。

### cahe

使用该设置，Rollup 将只会对改变的模块重新分析，从而加速观察模式中后续的构建。





## 5.插件开发

固定格式

* 插件应该有一个明确的名称，并以`rollup-plugin-`作为前缀。
* 在`package.json`中包含`rollup-plugin`关键字。
* 插件应该被测试，我们推荐 [mocha](https://github.com/mochajs/mocha) 或 [ava](https://github.com/avajs/ava)，它们支持 Promise。
* 可能的话，使用异步方法，例如 `fs.readFile` 而不是 `fs.readFileSync`
* 用英文文档描述你的插件。
* 确保如果适当，你的插件输出正确的源映射。
* 如果插件使用“虚拟模块”（例如用于辅助函数），请使用`\0`前缀模块 ID。这可以防止其他插件尝试处理它。

~~~js
export default function myPlugin(){
    return {
        name:'my-plugin',//插件的名称将在警告和错误中出现
        resolveId ( source ) {
      if (source === 'virtual-module') {
        // 这表示 rollup 不应询问其他插件或
        // 从文件系统检查以找到此 ID
        return source;
      }
      return null; // 其他ID应按通常方式处理
    },
    load ( id ) {
      if (id === 'virtual-module') {
        // "virtual-module"的源代码
        return 'export default "This is virtual!"';
      }
      return null; // 其他ID应按通常方式处理
    }
        
    }
}
// rollup.config.js
import myPlugin from './rollup-plugin-my-example.js';
export default ({
  input: 'virtual-module', // 由我们的插件解析
  plugins: [myPlugin()],
  output: [{
    file: 'bundle.js',
    format: 'es'
  }]
});
~~~

### 一些常用声明周期钩子

buildEnd钩子

|       类型： | `(error?: Error) => void`                                    |
| -----------: | ------------------------------------------------------------ |
|       类别： | async, parallel                                              |
| 上一个钩子： | [`moduleParsed`](https://cn.rollupjs.org/plugin-development/#moduleparsed)、[`resolveId`](https://cn.rollupjs.org/plugin-development/#resolveid) 或 [`resolveDynamicImport`](https://cn.rollupjs.org/plugin-development/#resolvedynamicimport) |
| 下一个钩子： | 输出生成阶段的 [`outputOptions`](https://cn.rollupjs.org/plugin-development/#outputoptions)，因为这是构建阶段的最后一个钩子 |

在 Rollup 完成产物但尚未调用 `generate` 或 `write` 之前调用；也可以返回一个 Promise。如果在构建过程中发生错误，则将其传递给此钩子。

[buildStart](https://cn.rollupjs.org/plugin-development/#buildstart)

这个钩子使用在获取用户选项

|       类型： | `(options: InputOptions) => void`                            |
| -----------: | ------------------------------------------------------------ |
|       类别： | async, parallel                                              |
| 上一个钩子： | [`options`](https://cn.rollupjs.org/plugin-development/#options) |
| 下一个钩子： | 并行解析每个入口点的 [`resolveId`](https://cn.rollupjs.org/plugin-development/#resolveid) |

在每个 `rollup.rollup` 构建上调用。当你需要访问传递给 `rollup.rollup()` 的选项时，建议使用此钩子，因为它考虑了所有 [`options`](https://cn.rollupjs.org/plugin-development/#options) 钩子的转换，并且还包含未设置选项的正确默认值。

transform

|       类型: | `(code: string, id: string) => TransformResult`              |
| ----------: | ------------------------------------------------------------ |
|       类别: | async, sequential                                            |
| 上一个钩子: | [`load`](https://cn.rollupjs.org/plugin-development/#load)，用于加载当前处理的文件。如果使用缓存并且该模块有一个缓存副本，则为 [`shouldTransformCachedModule`](https://cn.rollupjs.org/plugin-development/#shouldtransformcachedmodule)，如果插件为该钩子返回了 `true` |
| 下一个钩子: | [`moduleParsed`](https://cn.rollupjs.org/plugin-development/#moduleparsed)，一旦文件已被处理和解析 |

可用于转换单个模块。为了避免额外的解析开销，例如此钩子已经使用 `this.parse` 生成了 AST，此钩子可以选择性地返回一个 `{ code, ast, map }` 对象。

:::tip

在观察模式下或明确使用缓存时，当重新构建时，此钩子的结果会被缓存，仅当模块的 `code` 发生更改或上次触发此钩子时添加了通过 `this.addWatchFile` 添加的文件时，才会再次触发该模块的钩子。

:::







<CommentService/>