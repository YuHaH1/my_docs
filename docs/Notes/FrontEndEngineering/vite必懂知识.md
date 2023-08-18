---
lang: zh-CN
title: vite必懂知识
description: 关键功能
collapsible: true
---
# vite必懂知识

https://cn.vitejs.dev/guide/文档地址

## Vite生命周期

![](/Vite/life.png)

![](/Vite/vite_structure.png)

生产环境不用esbuild原因是 esbuild不支持类型检查（因此Vite在生产构建要调用一次tsc），语法降级无法降级到es5

## 1.Vite的优势

相对于webpack来说，当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。**也就是说打包器要先构建整个应用然后在通过devserver将构建后的js、css、html提供给浏览器**。

Vite 通过在一开始将应用中的模块区分为 **依赖** 和 **源码** 两类，改进了开发服务器启动时间。

Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。借用官方的图,我们可以看到Vite是按需加载，传统的打包工具如`Webpack`是先解析依赖、打包构建再启动开发服务器，`Dev Server` 必须等待所有模块构建完成，当我们修改了 `bundle`模块中的一个子模块， 整个 `bundle` 文件都会重新打包然后输出。项目应用越大，启动时间越长。而`Vite`利用浏览器对`ESM`的支持，当 `import` 模块时，浏览器就会下载被导入的模块。先启动开发服务器，当代码执行到模块加载时再请求对应模块的文件,本质上实现了动态加载。灰色部分是暂时没有用到的路由，所有这部分不会参与构建过程。随着项目里的应用越来越多，增加`route`，也不会影响其构建速度。

![](/Vite/vite.png)

### Vite快在哪

Vite利用服务器原生支持ESM在服务端按需编译提供代码。

1.快速的冷启动: `No Bundle` + `esbuild` 预构建   dev server`

2.即时的模块热更新: 基于`ESM`的`HMR`，同时利用浏览器缓存策略提升速度 `HMR`

3.真正的按需加载: 利用浏览器`ESM`支持，实现真正的按需加载

接下来解释几个概念

::: tip

`ESM`的执行可以分为三个步骤：

* 构建: 确定从哪里下载该模块文件、下载并将所有的文件解析为模块记录

* 实例化: 将模块记录转换为一个模块实例，为所有的模块分配内存空间，依照导出、导入语句把模块指向对应的内存地址。

* 运行：运行代码，将内存空间填充

:::

::: tip

`Esbuild`是一个`JavaScript``  Bundler `打包和压缩工具，它提供了与`Webpack`、`Rollup`等工具相似的资源打包能力。可以将`JavaScript` 和`TypeScript`代码打包分发在网页上运行。但其打包速度却是其他工具的10～100倍。它提供了一些API：`Transform、build、context`https://esbuild.github.io/api/#overview详情看官方文档

:::

`Vite`其核心原理是利用浏览器现在已经支持`ES6`的`import`,碰见`import`就会发送一个`HTTP`请求去加载文件，`Vite`启动一个 `koa` 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以`ESM`格式返回返回给浏览器。`Vite`整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的`webpack`开发编译速度快出许多！同时，`Vite` 还利用`HTTP`加速整个页面的重新加载。设置响应头使得依赖模块(`dependency module`)进行强缓存，而源码文件通过设置 `304 Not Modified` 而变成可依据条件而进行更新。

## 2.HMR热更新

为什么需要HMR?HMR是什么？对于开发体验来说，我们在开发时修改了代码中的某处，如果我们要想看到效果怎么办？是不是要刷新以下浏览器？这样有什么后果？我们之前的状态全部被初始化。而热更新能够做到在不刷新浏览器的情况下，保持浏览器使用的是我们最新的代码，让开发者可以立即看到所做的更改在浏览器中的反应。

目前所有的打包工具实现热更新的思路都大同小异：主要是通过`WebSocket`创建浏览器和服务器的通信监听文件的改变，当文件被修改时，服务端发送消息通知客户端修改相应的代码，客户端对应不同的文件进行不同的操作的更新。

`Vite`整个热更新过程可以分成五步

1. 修改代码，vite server 监听到代码被修改
2. vite 计算出热更新的边界（即受到影响，需要进行更新的模块）
3. vite server 通过 websocket 告诉 vite client 需要进行热更新
4. 浏览器拉取修改后的模块
5. 执行热更新的代码

### 2.1、vite-client客户端

主要涉及两个api  `hot.dispose` 和 `hot.accept`

当我们修改内容的时候accept回调就会执行，并重新执行render函数来更新页面

~~~js
if (import.meta.hot) {
  // 调用的时候，调用的是老的模块的 accept 回调
  import.meta.hot.accept((mod) => {
    // 老的模块的 accept 回调拿到的是新的模块
    console.log('mod', mod);
    mod.render();
  });
}
~~~

`dispose`主要是做善后工作，老模块的定时器清理。

vite开发服务器会在index.html注入一个@vite/client的脚本，当访问index.html时就会拉取该脚本，该脚本会创建`websocket`

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
+  <script type="module" src="/@vite/client"></script>

    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app"></div>
</body>

<script type="module" src="./index.ts"></script>
</html>

~~~

~~~js
//监听服务端的消息
socket.addEventListener('message', async({data})=>{
        handleMessage(JSON.parse(data));
}
async function handleMessage(payload) {
    switch (payload.type) {
    case 'connected':
        console.debug(`[vite] connected.`);
        sendMessageBuffer();
        // proxy(nginx, docker) hmr ws maybe caused timeout,
        // so send ping package let ws keep alive.
        setInterval(()=>{
            // 每30秒进行一次心跳检测
            if (socket.readyState === socket.OPEN) {
                socket.send('{"type":"ping"}');
            }
        }
        , 30000);
        break;
    case 'update':
        notifyListeners('vite:beforeUpdate', payload);
        // 如果这是第一次更新，并且已经有一个错误覆盖，它意味着页面打开了现有的服务器编译错误，整个模块脚本加载失败(因为其中一个嵌套导入是500)。在这种情况下，正常的更新将不起作用，需要完全重新加载。
        if (isFirstUpdate && hasErrorOverlay()) {
            window.location.reload();
            return;
        } else {
            clearErrorOverlay();
            isFirstUpdate = false;
        }
        await Promise.all(payload.updates.map(async(update)=>{
            if (update.type === 'js-update') {
                return queueUpdate(fetchUpdate(update));
            }
            // css-update
            // 这只会在<link>引用的CSS文件更新时发送
            const {path, timestamp} = update;
            const searchUrl = cleanUrl(path);
            // 这里不能使用带有' [href*=] '的querySelector，因为链接可能使用相对路径，所以我们需要使用link。href获取包含检查的完整URL。
            const el = Array.from(document.querySelectorAll('link')).find((e)=>!outdatedLinkTags.has(e) && cleanUrl(e.href).includes(searchUrl));
            if (!el) {
                return;
            }
            const newPath = `${base}${searchUrl.slice(1)}${searchUrl.includes('?') ? '&' : '?'}t=${timestamp}`;
            // 我们将创建一个新的链接标记，而不是在现有标记上交换href。一旦加载了新的样式表，我们将删除现有的link标签。这就消除了在直接交换标签href时可能出现的Flash Of Unstyled Content（页面在加载时，由于CSS文件的延迟加载或下载速度缓慢，导致页面先以无样式的状态呈现（即未经过CSS修饰的原始状态），然后在CSS文件下载完成后，再重新渲染页面，出现样式突然改变的短暂闪烁效果。），因为新的样式表还没有加载。
            return new Promise((resolve)=>{
                const newLinkTag = el.cloneNode();
                newLinkTag.href = new URL(newPath,el.href).href;
                const removeOldEl = ()=>{
                    el.remove();
                    console.debug(`[vite] css hot updated: ${searchUrl}`);
                    resolve();
                }
                ;
                newLinkTag.addEventListener('load', removeOldEl);
                newLinkTag.addEventListener('error', removeOldEl);
                outdatedLinkTags.add(el);
                el.after(newLinkTag);
            }
            );
        }
        ));
        notifyListeners('vite:afterUpdate', payload);
        break;
    case 'custom':
        {
            notifyListeners(payload.event, payload.data);
            break;
        }
    case 'full-reload':
        notifyListeners('vite:beforeFullReload', payload);
        if (payload.path && payload.path.endsWith('.html')) {
            // 如果编辑了HTML文件，只有当浏览器当前在该页面上时才重新加载该页。
            const pagePath = decodeURI(location.pathname);
            const payloadPath = base + payload.path.slice(1);
            if (pagePath === payloadPath || payload.path === '/index.html' || (pagePath.endsWith('/') && pagePath + 'index.html' === payloadPath)) {
                location.reload();
            }
            return;
        } else {
            location.reload();
        }
        break;
    case 'prune':
        notifyListeners('vite:beforePrune', payload);
        // 利用dispose清除旧模块的副作用例如定时器
        payload.paths.forEach((path)=>{
            const fn = pruneMap.get(path);
            if (fn) {
                fn(dataMap.get(path));
            }
        }
        );
        break;
    case 'error':
        {
            notifyListeners('vite:error', payload);
            const err = payload.err;
            if (enableOverlay) {
                createErrorOverlay(err);
            } else {
                console.error(`[vite] Internal Server Error\n ${err.message}\n ${err.stack}`);
            }
            break;
        }
    default:
        {
            const check = payload;
            return check;
        }
    }
}
~~~

### 2.2、热更新边界

即一个文件被修改，vite会沿着依赖树向上找最近的一个可以热更新模块作为热更新边界，然后对其进行热更新。而对于没有上层可热更新的模块就会刷新页面，例如在vue项目中main.ts文件。当我改了vue中的style代码后浏览器拉取的结果

~~~js
import { createHotContext as __vite__createHotContext } from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/components/VirtualList.vue?vue&type=style&index=0&scoped=101d0ae3&lang.scss");
import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/@vite/client"
const __vite__id = "这个id是绝对路径"
const __vite__css = "@charset \"UTF-8\";\n.container[data-v-101d0ae3] {\n  width: var(--101d0ae3-props\\.style\\.width);\n  height: var(--101d0ae3-props\\.style\\.height);\n  background: var(--101d0ae3-props\\.style\\.background);\n}\n.container .scroll_container[data-v-101d0ae3]::-webkit-scrollbar {\n  width: 10px; /* 滚动条的宽度 */\n  background-color: #f5f5f5; /* 滚动条的背景颜色 */\n}\n.container .scroll_container[data-v-101d0ae3]::-webkit-scrollbar-thumb {\n  background-color: greenyellow; /* 滚动条拖动块的颜色 */\n}\n.container .scroll_container[data-v-101d0ae3] {\n  position: relative;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  width: 100%;\n  height: 100%;\n}\n.container .scroll_container .pillar[data-v-101d0ae3] {\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 0;\n  z-index: -1;\n  height: var(--101d0ae3-scroll_height);\n}\n.container .scroll_container .items[data-v-101d0ae3] {\n  height: 100%;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  right: 2px;\n  position: absolute;\n  box-sizing: border-box;\n}\n.container .scroll_container .items .item[data-v-101d0ae3] {\n  width: 100%;\n  line-height: calc(var(--101d0ae3-props\\.item_height) * 1px);\n  height: calc(var(--101d0ae3-props\\.item_height) * 1px);\n  box-sizing: border-box;\n}"
__vite__updateStyle(__vite__id, __vite__css)
import.meta.hot.accept()
export default __vite__css
import.meta.hot.prune(() => __vite__removeStyle(__vite__id))
~~~

## 3.预构建

Vite使用esbuild进行预构建。Vite将预编译后的文件缓存到`node_modules/.vite`文件夹下（一般是第三方依赖），由于预编译的文件已经被打包和优化过了，这样浏览器再加载这些文件的时候不需要再构建直接将预构建的文件给浏览器。

### 3.1预构建的意义

1. 为了兼容`commenJS`，我们知道Vite使用`ESM`，那么Vite必须将使用commenJS或UMD规范的依赖转成ESM
2. 模块之间有众多依赖关系，Vite将依赖关系转成单个模块来提高后续加载性能，说白了为了减少模块和请求数量。什么意思？例如，`lodsh-es`,当我们执行 `import { debounce } from 'lodash-es'` 时，浏览器同时发出 600 多个 HTTP 请求！尽管服务器在处理这些请求时没有问题，但大量的请求会在浏览器端造成网络拥塞，导致页面的加载速度相当慢。通过预构建 `lodash-es` 成为一个模块，我们就只需要一个 HTTP 请求了。

### 3.2如何进行预构建

**①依赖扫描**：找出第三方依赖，并进行键值对形式存储。然后将这些第三方依赖先进行构建。

vite从入口的 HTML 文件开始，根据模块的 import 依赖关系，可以连接成一颗模块依赖树。要扫描出所有的 bare import，就需要遍历整个依赖树，这就涉及到了**树的深度遍历**，我们只需要深度遍历所有树节点，**找出所有 import 语句，把 import 的模块记录下来**即可，对于第三方依赖会被记录，对于开发者的模块会继续进行遍历。

~~~json
{
"vue":"vite/node_modules/.pnpm/vue@3.2.37/node_modules/vue/dist/vue.runtime.esm-bundler.js"
}
~~~

**②打包依赖**：依赖扫描已经拿到了所有需要预构建的依赖信息，那接下来直接使用 esbuild 进行打包即可。

~~~js
import { build } from 'esbuild'

const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [ 'vue', 'lodash-es' ],
    bundle: true,
    format: 'esm',
    target: [
        "es2020",
        "edge88",
        "firefox78",
        "chrome87",
        "safari13"
    ],
    splitting: true,  // 该参数会自动进行代码分割，在多个 entry 入口之间共享的代码，会被分成单独共享文件（chunk 文件）
    plugins: [ /* some plugin */ ],
    // 省略其他配置
})
~~~

![](/Vite/vite2.png)

### 3.3路径替换

我们的裸模块使用的是Nodejs的模块查找方法（去node_modules中查找），而浏览器不理解，因此需要把`import vue`转成`import “/node_modules/.vite/deps/vue.js”`,这样浏览器在处理到import时会给vite服务器发送请求，请求该文件，然后vite服务器中间件处理后将模块给浏览器。



## 4.vite如何处理页面资源

所有的类 JS 模块（包括 Vue），CSS 模块，都会在 `transfrom` 中间件中进行处理

每个模块都会经过 `resolveId`、`load`、`transform` 三个流程，这三个流程，可以通过 [Vite 插件](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Fapi-plugin.html%23universal-hooks)去扩展，可以在这三个过程中做一些特殊处理

* `html` 处理中间件，通过调用插件的 `transformIndexHtml` 对 `html` 页面进行处理。
* `TS` 处理中间件，通过调用插件的 `resolveId`、`load`、`transform` 这三个钩子，对代码进行处理的

## 4.缓存机制

Vite并使用 HTTP 304 Not Modified 状态码来指示浏览器使用缓存的资源。这样可以避免不必要的资源下载和带宽消耗。

当浏览器请求一个静态资源时，Vite会在服务器端检查该资源是否已被缓存。如果该资源已被缓存，Vite会在响应头中设置 Last-Modified 和 `ETag` 两个字段，并使用 `HTTP 304 Not Modified` 状态码返回响应。这告诉浏览器可以使用缓存的资源，而无需重新下载该资源。.

在后续的请求中，浏览器会将 Last-Modified 和 ETag 字段的值与服务器端缓存的值进行比较，以判断资源是否已被修改。如果资源未被修改，Vite会返回 HTTP 304 Not Modified 状态码，告诉浏览器可以使用缓存的资源。如果资源已被修改，Vite会返回新的资源内容和响应码200 OK。

![](/Vite/vite3.png)

当修改文件后

![](/Vite/vite4.png)

## 5.总结

1. Vite开发环境利用esbuild进行预构建。（这也是Vite首屏加载慢的原因）
2. Vite利用浏览器原生esm，实现按需加载，在加载资源时用中间件拦截然后处理
3. Vite将静态资源进行缓存，并使用热更新。



## 6.Vite性能优化

构建分析

```js
// npm install rollup-plugin-visualizer -D
// vite.config.js
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // 将 visualizer 插件放到最后
    visualizer()
  ]
})
```

①分包 这里包括路由懒加载

②Treeshaking 

③gzip压缩

~~~js
// npm i vite-plugin-compression -D
// vite.config.js
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [viteCompression()]
})
~~~

④CDN

~~~js
// npm i vite-plugin-cdn-import -D
// vite.config.js
import { defineConfig } from 'vite'
import viteCDNPlugin from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    viteCDNPlugin({
      // 需要 CDN 加速的模块
      modules: [
        {
          name: 'lodash',
          var: '_',
          path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`
        }
      ]
    })
  ]
})

~~~

⑤图片压缩

~~~js
// npm i vite-plugin-imagemin -D
// vite.config.js
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
})

~~~





















<CommentService/>