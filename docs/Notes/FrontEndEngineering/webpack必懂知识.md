---
lang: zh-CN
title: webpack必懂知识
description: 关键功能
collapsible: true
---
# webpack必懂知识

## 1.打包原理

![](/Webpack/webpack1.png)

打包的步骤

1.初始化阶段：

1. **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
2. **创建编译器对象**：用上一步得到的参数创建 `Compiler` 对象
3. **初始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
4. **开始编译**：执行 `compiler` 对象的 `run` 方法
5. **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilition.addEntry` 将入口文件转换为 `dependence` 对象

2.构建阶段：

1. **编译模块(make)**：根据 `entry` 对应的 `dependence` 创建 `module` 对象，调用 `loader` 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理
2. **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 **依赖关系图**

3.生成阶段：

1. **输出资源(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
2. **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

::: tip

`Entry`：编译入口，webpack 编译的起点

`Compiler`：编译管理器，webpack 启动后会创建 `compiler` 对象，该对象一直存活知道结束退出

`Compilation`：单次编辑过程的管理器，比如 `watch = true` 时，运行过程中只有一个 `compiler` 但每次文件变更触发重新编译时，都会创建一个新的 `compilation` 对象

`Dependence`：依赖对象，webpack 基于该类型记录模块间依赖关系

`Module`：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的

`Chunk`：编译完成准备输出时，webpack 会将 `module` 按特定的规则组织成一个一个的 `chunk`，这些 `chunk` 某种程度上跟最终输出一一对应

`Loader`：资源内容转换器，其实就是实现从内容 A 转换 B 的转换器

`Plugin`：webpack构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程

:::

### 1.1、初始化阶段

初始化阶段会做哪些？

将 `process.args + webpack.config.js` 合并成用户配置

调用 `validateSchema` 校验配置

调用 `getNormalizedWebpackOptions + applyWebpackOptionsBaseDefaults` 合并出最终配置

创建 `compiler` 对象

遍历用户定义的 `plugins` 集合，执行插件的 `apply` 方法

调用 `new WebpackOptionsApply().process` 方法，加载各种内置插件



### 1.2、构建阶段

构建阶段从 `entry` 开始递归解析资源与资源的依赖，在 `compilation` 对象内逐步构建出 `module` 集合以及 `module` 之间的依赖关系

调用 `handleModuleCreate` ，根据文件类型构建 `module` 子类

调用 [loader-runner](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Floader-runner) 仓库的 `runLoaders` 转译 `module` 内容，通常是从各类资源类型转译为 JavaScript 文本

调用 [acorn](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Facorn) 将 JS 文本解析为AST

遍历 AST，触发各种钩子

1. 在 `HarmonyExportDependencyParserPlugin` 插件监听 `exportImportSpecifier` 钩子，解读 JS 文本对应的资源依赖
2. 调用 `module` 对象的 `addDependency` 将依赖对象加入到 `module` 依赖列表中

AST 遍历完毕后，调用 `module.handleParseResult` 处理模块依赖

对于 `module` 新增的依赖，调用 `handleModuleCreate` ，控制流回到第一步

所有依赖都解析完毕后，构建阶段结束

总结如下-》

* 构建阶段会读取源码，解析为 AST 集合。
* Webpack 读出 AST 之后仅遍历 AST 集合；babel 则对源码做等价转换
* Webpack 遍历 AST 集合过程中，识别 `require/ import` 之类的导入语句，确定模块对其他资源的依赖关系



### 1.3、生成阶段

开始执行 `compilation.seal` 函数：完成从 `module` 到 `chunks` 的转化

```javascript
javascript复制代码// 取自 webpack/lib/compiler.js 
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
      // ...
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, err => {
        // ...
        this.hooks.finishMake.callAsync(compilation, err => {
          // ...
          process.nextTick(() => {
            compilation.finish(err => {
              **compilation.seal**(err => {...});
            });
          });
        });
      });
    });
  }
```













## 2.如何实现的分包





## 3.webpack的缓存机制









## 3.loader和plugin



### 3.1、plugin

插件通常是一个带有 `apply` 函数的类：`apply` 函数运行时会得到参数 `compiler` ，以此为起点可以调用 `hook` 对象注册各种钩子回调，例如： `compiler.hooks.make.tapAsync` ，这里面 `make` 是钩子名称，`tapAsync` 定义了钩子的调用方式，webpack 的插件架构基于这种模式构建而成，插件开发者可以使用这种模式在钩子回调中，插入特定代码。webpack 各种内置对象都带有 `hooks` 属性，比如 `compilation` 对象：

```javascript
class SomePlugin {
    apply(compiler) {
    }
}
```

常用的钩子

`compiler.hooks.compilation` ：

* 时机：启动编译创建出 compilation 对象后触发
* 参数：当前编译的 compilation 对象
* 示例：很多插件基于此事件获取 compilation 实例

`compiler.hooks.make`：

* 时机：正式开始编译时触发
* 参数：同样是当前编译的 `compilation` 对象
* 示例：webpack 内置的 `EntryPlugin` 基于此钩子实现 `entry` 模块的初始化

`compilation.hooks.optimizeChunks` ：

* 时机： `seal` 函数中，`chunk` 集合构建完毕后触发
* 参数：`chunks` 集合与 `chunkGroups` 集合
* 示例： `SplitChunksPlugin` 插件基于此钩子实现 `chunk` 拆分优化

`compiler.hooks.done`：

* 时机：编译完成后触发
* 参数： `stats` 对象，包含编译过程中的各类统计信息
* 示例： `webpack-bundle-analyzer` 插件基于此钩子实现打包分析



### 3.2、loader

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS 文件！

loader 的职责不外乎是将内容 A 转化为内容 B，但是在具体用法层面还挺多讲究的，有 pitch、pre、post、inline 等概念用于应对各种场景。

**1.loader的配置**

~~~js
module.exports = {
  module: {
    rules: [
      { test: /.ts$/, use: 'ts-loader' },
    ],
  },
};
~~~

**2.loader的执行顺序**

* 相同优先级的 loader 执行顺序为：`从右到左，从下到上`。

~~~js
module.exports = {
  module: {
    rules: [
      { test: /.less$/, use: ['style-loader','css-loader','less-loader'] },
    ],
  },
};
~~~

**3.loader结构**

当只有一个 loader 应用于资源文件时，它接收源码作为参数，输出转换后的 js 代码。

~~~js
module.exports = function loader (source) {
    return source;
}
~~~

#### pitch

`pitch` 是 loader 上的一个方法，它的作用是阻断 loader 链。

```js
// loaders/simple-loader-with-pitch.js
const loader = function (source) {  
    console.log('normal excution');   
    return source;
}
loader.pitch =  function() { 
    console.log('pitching graph');
}
// loader上的pitch方法，非必须
module.exports = loader
```

webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 去执行。

![](/Webpack/loader.png)





## 4.性能分析工具

①添加 `profile = true` 配置：

~~~js
// webpack.config.js
module.exports = {
  // ...
  profile: true
}
~~~

②运行编译命令，并添加 `--json` 参数，参数值为最终生成的统计文件名，然后https://mshustov.github.io/webpack-deps-tree/static/打开生成的json文件可以看到一些详细信息

~~~json
npx webpack --json=stats.json
~~~

* `modules`：本次打包处理的所有模块列表，内容包含模块的大小、所属 `chunk`、构建原因、依赖模块等，特别是 `modules.profile` 属性，包含了构建该模块时，解析路径、编译、打包、子模块打包等各个环节所花费的时间，非常有用；
* `chunks`：构建过程生成的 `chunks` 列表，数组内容包含 `chunk` 名称、大小、包含了哪些模块等；
* `assets`：编译后最终输出的产物列表、文件路径、文件大小等；
* `entrypoints`：entry 列表，包括动态引入所生产的 entry 项也会包含在这里面；
* `children`：子 Compiler 对象的性能数据，例如 `extract-css-chunk-plugin` 插件内部就会调用 [compilation.createChildCompiler](https://link.juejin.cn/?target=https%3A%2F%2Fgithub1s.com%2Ffaceyspacey%2Fextract-css-chunks-webpack-plugin%2Fblob%2FHEAD%2Fsrc%2Floader.js%23L82) 函数创建出子 Compiler 来做 CSS 抽取的工作。

③statoscope也是一个非常强大的可视化分析工具，主要提供如下功能：

* 完整的依赖关系视图，涵盖 modules/chunks/assets/entrypoints/packages 维度；
* entrypoints/chunks/packages/module 体积分析；
* 重复包检测；
* 多份 `stats` 数据对比；

~~~shell
pnpm add -D @statoscope/webpack-plugin
~~~

~~~js
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

module.exports = {
  ...
  plugins: [new StatoscopeWebpackPlugin()],
};

~~~

④Webpack Bundle Analyzer

~~~shell
pnpm add -D webpack-bundle-analyzer
~~~

~~~js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  ...
  plugins: [new BundleAnalyzerPlugin()],
};
也可以直接打开json
npx webpack-bundle-analyzer ./stats.json
~~~

⑤Webpack Visualizer

[Webpack Visualizer](https://link.juejin.cn/?target=https%3A%2F%2Fchrisbateman.github.io%2Fwebpack-visualizer%2F) 是一个在线分析工具，可用于检测、可视化 Webpack 产物的构成模块。有两种用法，一是将 `stats.json` 文件上传到在线 [页面](https://link.juejin.cn/?target=https%3A%2F%2Fchrisbateman.github.io%2Fwebpack-visualizer%2F)；二是使用 `webpack-visualizer-plugin` 生成统计页面，用法：

~~~shell
pnpm add —D webpack-visualizer-plugin
~~~

~~~js
// webpack.config.js
const VisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = {
  // ...
  plugins: [
    new Visualizer({
      filename: './stats.html'
    })
  ],
}
//...
~~~

⑥Webpack Dashboard

[webpack-dashboard](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-dashboard) 是一个命令行可视化工具，能够在编译过程中实时展示编译进度、模块分布、产物信息等，用法：

1. 安装依赖：

```shell
pnpm add -D webpack-dashboard
```

1. 注册插件：

```js
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  // ...
  plugins: [new DashboardPlugin()],
};
```

1. 注意了，需要用 `webpack-dashboard` 命令启动编译：

```bash
# 打包
npx webpack-dashboard -- webpack
# Dev Server
npx webpack-dashboard -- webpack-dev-server
# 运行 Node 程序
npx webpack-dashboard -- node index.js
```

之后，就可以在命令行看到一个漂亮的可视化界面：

## 5、性能优化之开发环境性能

### 1.持久化缓存

Webpack5 会将首次构建出的 Module、Chunk、ModuleGraph 等对象序列化后保存到硬盘中，后面再运行的时候，就可以跳过许多耗时的编译动作，直接复用缓存数据。

仅仅需要在 Webpack5 中设置 `cache.type = 'filesystem'` 即可开启。

* `cache.type`：缓存类型，支持 `'memory' | 'filesystem'`，需要设置为 `filesystem` 才能开启持久缓存；

* `cache.cacheDirectory`：缓存文件路径，默认为 `node_modules/.cache/webpack` ；

* `cache.buildDependencies`：额外的依赖文件，当这些文件内容发生变化时，缓存会完全失效而执行完整的编译构建，通常可设置为各种配置文件，如下：

  * ~~~js
    module.exports = {
      cache: {
        type: 'filesystem',
        buildDependencies: {
          config: [
              // 当下面文件变化会重新编译构建
            path.join(__dirname, 'webpack.dll_config.js'),
            path.join(__dirname, '.babelrc')
          ],
        },
      },
    }
    ~~~

* `cache.managedPaths`：受控目录，Webpack 构建时会跳过新旧代码哈希值与时间戳的对比，直接使用缓存副本，默认值为 `['./node_modules']`；

* `cache.profile`：是否输出缓存处理过程的详细日志，默认为 `false`；

* `cache.maxAge`：缓存失效时间，默认值为 `5184000000` 。

### 2.并行构建

①使用 HappyPack

[HappyPack](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Famireh%2Fhappypack) 能够将耗时的**文件加载**（Loader）操作拆散到多个子进程中并发执行，子进程执行完毕后再将结果合并回传到 Webpack 进程，从而提升构建性能。不过，HappyPack 的用法稍微有点难以理解，需要同时：

* 使用 `happypack/loader` 代替原本的 Loader 序列；
* 使用 `HappyPack` 插件注入代理执行 Loader 序列的逻辑。

1. 安装依赖：

```Bash
pnpm add -D happypack
```

1. 将原有 `loader` 配置替换为 `happypack/loader`，如：

```JavaScript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "happypack/loader",
        // 原始配置如：
        // use: [
        //  {
        //      loader: 'babel-loader',
        //      options: {
        //          presets: ['@babel/preset-env']
        //      }
        //  },
        //  'eslint-loader'
        // ]
      },
    ],
  },
};
```

1. 创建 `happypack` 插件实例，并将原有 loader 配置迁移到插件中，完整配置：

```JavaScript
const HappyPack = require("happypack");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "happypack/loader",
        // 原始配置如：
        // use: [
        //  {
        //      loader: 'babel-loader',
        //      options: {
        //          presets: ['@babel/preset-env']
        //      }
        //  },
        //  'eslint-loader'
        // ]
      },
    ],
  },
  plugins: [
    new HappyPack({
      // 将原本定义在 `module.rules.use` 中的 Loader 配置迁移到 HappyPack 实例中
      loaders: [
        {
          loader: "babel-loader",
          option: {
            presets: ["@babel/preset-env"],
          },
        },
        "eslint-loader",
      ],
    }),
  ],
```



②thread-loader

~~~bash
pnpm add -D thread-loader
~~~

Thread-loader 还提供了一系列用于控制并发逻辑的配置项，包括：

* `workers`：子进程总数，默认值为 `require('os').cpus() - 1`；
* `workerParallelJobs`：单个进程中并发执行的任务数；
* `poolTimeout`：子进程如果一直保持空闲状态，超过这个时间后会被关闭；
* `poolRespawn`：是否允许在子进程关闭后重新创建新的子进程，一般设置为 `false` 即可；
* `workerNodeArgs`：用于设置启动子进程时，额外附加的参数。

Thread-loader 也同样面临着频繁的子进程创建、销毁所带来的性能问题，为此，Thread-loader 提供了 `warmup` 接口用于前置创建若干工作子进程，降低构建时延，

~~~js
const threadLoader = require("thread-loader");

threadLoader.warmup(
  {
    // 可传入上述 thread-loader 参数
    workers: 2,
    workerParallelJobs: 50,
  },
  [
    // 子进程中需要预加载的 node 模块
    "babel-loader",
    "babel-preset-es2015",
    "sass-loader",
  ]
);
~~~

### 3.懒编译

Webpack 5.17.0 之后引入实验特性 [lazyCompilation](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fexperiments%2F%23experimentslazycompilation)，用于实现 `entry` 或异步引用模块的**按需编译**，这是一个非常实用的新特性！

~~~js
// webpack.config.js
module.exports = {
  // ...
  experiments: {
    lazyCompilation: true,
  },
};
~~~

启动 `lazyCompilation` 后，代码中通过异步引用语句如 `import('./xxx')` 导入的模块（以及未被访问到的 `entry`）都不会被立即编译，而是直到页面正式请求该模块资源（例如切换到该路由）时才开始构建，效果与 Vite 相似，能够极大提升冷启速度。

此外，`lazyCompilation` 支持如下参数：

* `backend`： 设置后端服务信息，一般保持默认值即可；
* `entries`：设置是否对 `entry` 启动按需编译特性；
* `imports`：设置是否对异步模块启动按需编译特性；
* `test`：支持正则表达式，用于声明对那些异步模块启动按需编译特性。

### 4.开发模式禁用产物优化

* 确保 `mode='development'` 或 `mode = 'none'`，关闭默认优化策略；
* `optimization.minimize` 保持默认值或 `false`，关闭代码压缩；
* `optimization.concatenateModules` 保持默认值或 `false`，关闭模块合并；
* `optimization.splitChunks` 保持默认值或 `false`，关闭代码分包；
* `optimization.usedExports` 保持默认值或 `false`，关闭 Tree-shaking 功能；

### 5.搜小watch监控返回

通常情况下前端项目中部分资源并不会频繁更新，例如 `node_modules` ，此时可以设置 `watchOptions.ignored` 属性忽略这些文件，例如：

~~~js
// webpack.config.js
module.exports = {
  //...
  watchOptions: {
    ignored: /node_modules/
  },
};
~~~

### 6.source-map

`source-map` 是一种将经过编译、压缩、混淆的代码映射回源码的技术，它能够帮助开发者迅速定位到更有意义、更结构化的源码中，方便调试。不过，`source-map` 操作本身也有很大构建性能开销，建议读者根据实际场景慎重选择最合适的 `source-map` 方案。

针对 `source-map` 功能，Webpack 提供了 `devtool` 选项，可以配置 `eval`、`source-map`、`cheap-source-map` 等值，不考虑其它因素的情况下，最佳实践：

* 开发环境使用 `eval` ，确保最佳编译速度；

* 生产环境使用 `source-map`，获取最高质量。





## 6、性能优化之生产环境性能

### 1.分包

SplitChunksPlugin，由于 Webpack4 开始已经内置支持 `SplitChunksPlugin` ，我们不需要额外安装依赖，直接修改 [optimization.splitChunks](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimizationsplitchunks) 配置项即可实现自定义的分包策略：

* SplitChunksPlugin 支持根据 Module 路径、Module 被引用次数、Chunk 大小、Chunk 请求数等决定是否对 Chunk 做进一步拆解，这些决策都可以通过 optimization.splitChunks 相应配置项调整定制，基于这些能力我们可以实现：

  * 单独打包某些特定路径的内容，例如 node_modules 打包为 vendors；
  * 单独打包使用频率较高的文件；

* SplitChunksPlugin 还提供了 optimization.splitChunks.cacheGroup 概念，用于对不同特点的资源做分组处理，并为这些分组设置更有针对性的分包规则；

* SplitChunksPlugin 还内置了 default 与 defaultVendors 两个 cacheGroup，提供一些开箱即用的分包特性：

  * node_modules 资源会命中 defaultVendors 规则，并被单独打包；
  * 只有包体超过 20kb 的 Chunk 才会被单独打包；
  * 加载 Async Chunk 所需请求数不得超过 30；
  * 加载 Initial Chunk 所需请求数不得超过 30。

  `chunks` 调整作用范围，该配置项支持如下值：

  * 字符串 `'all'` ：对 Initial Chunk 与 Async Chunk 都生效，建议优先使用该值；
  * 字符串 `'initial'` ：只对 Initial Chunk 生效；
  * 字符串 `'async'` ：只对 Async Chunk 生效；
  * 函数 `(chunk) => boolean` ：该函数返回 `true` 时生效；

  限制分包体积

  * `minSize`： 超过这个尺寸的 Chunk 才会正式被分包；
  * `maxSize`： 超过这个尺寸的 Chunk 会尝试进一步拆分出更小的 Chunk；
  * `maxAsyncSize`： 与 `maxSize` 功能类似，但只对异步引入的模块生效；
  * `maxInitialSize`： 与 `maxSize` 类似，但只对 `entry` 配置的入口模块生效；
  * `enforceSizeThreshold`： 超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 Size 限制。

  限制分包数量：在 `minChunks` 基础上，为防止最终产物文件数量过多导致 HTTP 网络请求数剧增，反而降低应用性能，Webpack 还提供了 `maxInitialRequest/maxAsyncRequest` 配置项，用于限制分包数量：

  * `maxInitialRequest`：用于设置 Initial Chunk 最大并行请求数；
  * `maxAsyncRequests`：用于设置 Async Chunk 最大并行请求数。

  缓存组：用于为不同文件组设置不同的规则，例如：

  * ~~~js
    module.exports = {
      //...
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                minChunks: 1,
                minSize: 0
            }
          },
        },
      },
    };
    //所有命中 vendors.test 规则的模块都会被归类 vendors 分组，优先应用该组下的 minChunks、minSize 等分包配置。
    ~~~

  * `test`：接受正则表达式、函数及字符串，所有符合 `test` 判断的 Module 或 Chunk 都会被分到该组；

  * `type`：接受正则表达式、函数及字符串，与 `test` 类似均用于筛选分组命中的模块，区别是它判断的依据是文件类型而不是文件名，例如 `type = 'json'` 会命中所有 JSON 文件；

  * `idHint`：字符串型，用于设置 Chunk ID，它还会被追加到最终产物文件名中，例如 `idHint = 'vendors'` 时，输出产物文件名形如 `vendors-xxx-xxx.js` ；

  * `priority`：数字型，用于设置该分组的优先级，若模块命中多个缓存组，则优先被分到 `priority` 更大的组。



~~~js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // ...
      // 设定引用次数超过 2 的模块才进行分包
      minChunks: 2
      maxInitialRequest：2//用于设置 Initial Chunk 最大并行请求数；
	  maxAsyncRequests：2//用于设置 Async Chunk 最大并行请求数。
    },
  },
}

~~~



### 2.压缩

#### js压缩

Webpack5.0 后默认使用 Terser 作为 JavaScript 代码压缩器，简单用法只需通过 `optimization.minimize` 配置项开启压缩功能即可。

Terser 支持许多压缩 [配置](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fterser%2Fterser%23compress-options)：

* `dead_code`：是否删除不可触达的代码 —— 也就是所谓的死代码；
* `booleans_as_integers`：是否将 Boolean 值字面量转换为 0、1；
* `join_vars`：是否合并连续的变量声明，如 `var a = 1; var b = 2;` 合并为 `var a=1,b=2;`

多数情况下使用默认 Terser 配置即可，必要时也可以手动创建 [terser-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fterser-webpack-plugin) 实例并传入压缩配置实现更精细的压缩功能，例如：

~~~js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            reduce_vars: true,
            pure_funcs: ["console.log"],
          },
          // ...
        },
      }),
    ],
  },
};

~~~

::: tip

提示：示例中的 `minimize` 用于控制是否开启压缩，只有 `minimize = true'` 时才会调用 `minimizer` 声明的压缩器数组（没错，这是数组形式）执行压缩操作。

:::

[terser-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fterser-webpack-plugin) 插件并不只是 Terser 的简单包装，它更像是一个代码压缩功能骨架，底层还支持使用 SWC、UglifyJS、ESBuild 作为压缩器，使用时只需要通过 `minify` 参数切换即可，例如：

~~~js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        // `terserOptions` 将被传递到 `swc` (`@swc/core`) 工具
        // 具体配置参数可参考：https://swc.rs/docs/config-js-minify
        terserOptions: {},
      }),
    ],
  },
};
TerserPlugin 内置如下压缩器：

TerserPlugin.terserMinify：依赖于 terser 库；
TerserPlugin.uglifyJsMinify：依赖于 uglify-js，需要手动安装 yarn add -D uglify-js；
TerserPlugin.swcMinify：依赖于 @swc/core，需要手动安装 yarn add -D @swc/core；
TerserPlugin.esbuildMinify：依赖于 esbuild，需要手动安装 yarn add -D esbuild。
另外，terserOptions 配置也不仅仅专供 terser 使用，而是会透传给具体的 minifier，因此使用不同压缩器时支持的配置选项也会不同。
~~~



#### css压缩

 CssMinimizerWebpackPlugin

1. 安装依赖：

```bash
yarn add -D css-minimizer-webpack-plugin
```

1. 修改 Webpack 配置：

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /.css$/,
        // 注意，这里用的是 `MiniCssExtractPlugin.loader` 而不是 `style-loader`
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置
      "...",
      new CssMinimizerPlugin(),
    ],
  },
  // 需要使用 `mini-css-extract-plugin` 将 CSS 代码抽取为单独文件
  // 才能命中 `css-minimizer-webpack-plugin` 默认的 `test` 规则
  plugins: [new MiniCssExtractPlugin()],
};
```

这里的配置逻辑，一是使用 `mini-css-extract-plugin` 将 CSS 代码抽取为单独的 CSS 产物文件，这样才能命中 `css-minimizer-webpack-plugin` 默认的 `test` 逻辑；二是使用 `css-minimizer-webpack-plugin` 压缩 CSS 代码

* `CssMinimizerPlugin.cssnanoMinify`：默认值，使用 [cssnano](https://link.juejin.cn/?target=https%3A%2F%2Fcssnano.co%2F) 压缩代码，不需要额外安装依赖；
* `CssMinimizerPlugin.cssoMinify`：使用 [csso](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcss%2Fcsso) 压缩代码，需要手动安装依赖 `yarn add -D csso`；
* `CssMinimizerPlugin.cleanCssMinify`：使用 [clean-css](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fclean-css%2Fclean-css) 压缩代码，需要手动安装依赖 `yarn add -D clean-css`；
* `CssMinimizerPlugin.esbuildMinify`：使用 [ESBuild](https://link.juejin.cn/?target=https%3A%2F%2Fesbuild.github.io%2F) 压缩代码，需要手动安装依赖 `yarn add -D esbuild`；
* `CssMinimizerPlugin.parcelCssMinify`：使用 [parcel-css](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fparcel-bundler%2Fparcel-css) 压缩代码，需要手动安装依赖 `yarn add -D` `@parcel/css`。
* 其中 `parcel-css` 与 `ESBuild` 压缩性能相对较佳

#### HTML压缩

[html-minimizer-plugin](https://github.com/terser/html-minifier-terser#options-quick-reference)

[HtmlMinimizerWebpackPlugin](https://webpack.js.org/plugins/html-minimizer-webpack-plugin/)

现代 Web 应用大多会选择使用 React、Vue 等 MVVM 框架，这衍生出来的一个副作用是原生 HTML 的开发需求越来越少，HTML 代码占比越来越低，所以大多数现代 Web 项目中其实并不需要考虑为 HTML 配置代码压缩工作流。不过凡事都有例外，某些场景如 SSG 或官网一类偏静态的应用中就存在大量可被优化的 HTML 代码，为此社区也提供了一些相关的工程化工具，例如 `html-minifier-terser`。

1. 安装依赖：

```csharp
yarn add -D html-minimizer-webpack-plugin
```

1. 修改 Webpack 配置，如：

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      // Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置
      "...",
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          // 折叠 Boolean 型属性
          collapseBooleanAttributes: true,
          // 使用精简 `doctype` 定义
          useShortDoctype: true,
          // ...
        },
      }),
    ],
  },
  plugins: [
    // 简单起见，这里我们使用 `html-webpack-plugin` 自动生成 HTML 演示文件
    new HtmlWebpackPlugin({
      templateContent: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>webpack App</title>
      </head>
      <body>
        <input readonly="readonly"/>
        <!-- comments -->
        <script src="index_bundle.js"></script>
      </body>
    </html>`,
    }),
  ],
};
```



## 7.sourcemap

[Sourcemap 协议](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k%2Fedit%23heading%3Dh.qz3o9nc69um5) 最初由 Google 设计并率先在 Closure Inspector 实现，它的主要作用就是将经过压缩、混淆、合并的产物代码还原回未打包的原始形态，帮助开发者在生产环境中精确定位问题发生的行列位置

在 Webpack 内部，这段生成 Sourcemap 映射数据的逻辑并不复杂，一句话总结：在 [processAssets](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompilation-hooks%2F%23processassets) 钩子遍历产物文件 `assets` 数组，调用 `webpack-sources` 提供的 `map` 方法，最终计算出 `asset` 与源码 `originSource` 之间的映射关系。

这个过程真正的难点在于 「如何计算映射关系」，因此本文会展开详细讲解 Sourcemap 映射结构与 VLQ 编码规则，以及 Webpack 提供的 `devtool` 配置项的详细用法。

Sourcemap 最初版本生成的 `.map` 文件非常大，体积大概为编译产物的 10 倍；V2 之后引入 Base64 编码等算法，将之减少 20% ~ 30%；而最新版本 V3 又在 V2 基础上引入 VLQ 算法，体积进一步压缩了 50%。

这一系列进化造就了一个效率极高的 Sourcemap 体系，但伴随而来的则是较为复杂的 `mappings` 编码规则。V3 版本 Sourcemap 文件由三部分组成:

* 开发者编写的原始代码；
* 经过 Webpack 压缩、转化、合并后的产物，且产物中必须包含指向 Sourcemap 文件地址的 `//# sourceMappingURL=https://xxxx/bundle.js.map` 指令；
* 记录原始代码与经过工程化处理代码之间位置映射关系 Map 文件。

页面初始运行时只会加载编译构建产物，直到特定事件发生 —— 例如在 Chrome 打开 Devtool 面板时，才会根据 `//# sourceMappingURL` 内容自动加载 Map 文件，并按 Sourcemap 协议约定的映射规则将代码重构还原回原始形态，这既能保证终端用户的性能体验，又能帮助开发者快速还原现场，提升线上问题的定位与调试效率。





## 8.原理

Webpack 之所以能够应对 Web 场景下极度复杂、多样的构建需求，关键就在于其健壮、扩展性极强的插件架构，而插件架构的精髓又在于其灵活多变的 Hook 体系。Webpack 的插件体系是一种基于 [Tapable](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Ftapable) 实现的强耦合架构，它在特定时机触发钩子时会附带上足够的上下文信息，插件定义的钩子回调中，能也只能与这些上下文背后的数据结构、接口交互产生 side effect，进而影响到编译状态和后续流程。





<CommentService/>