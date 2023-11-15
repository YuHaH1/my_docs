---
lang: zh-CN
title: CSS相关问题
description: 关键功能
collapsible: true
---
# CSS相关问题

## 1.多行文本溢出

方式①

~~~html
<head>
	<style>
        .container {
            width: 200px;
            height: 100px;
            background-color: #efefef;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5 ;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="p">
            From the age groups, we can see that the largest group of citizens is the group in the age between 20-29. People in this period have had their own career.In this society of ever-quickening pace, working with copmputer has become a fashion. Furthermore, they also use it to entertain themselves and find the right person. The group secondary to this group is in the age between 10-19. In this period, middle school students mostly use computer to play games and chat with others, people in college use it both to entertain themselves and learn what they need to learn. And amount of people in this period fall in love so they spend much on chatting with their beloved people. Top3 is in the age between 30-39. In this period, middle aged people have lost part of interest of playing games and the need of l
        </div>
    </div>
</body>
~~~

②方式二

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .text-container {
            width: 200px;
            height: 100px;
            background-color: #efefef;
            overflow: hidden;
            padding:0 10px;
        }
        .text-container::before{
            content: '';
            display: block;
            height: 80px;
        }
        .p{
            margin-top: -80px;  
        }
        .ellipsis{
            float: right;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-container">
            <div class="ellipsis">
                ...
            </div>
            <div class="p">
                From the age groups, we can see that the largest group of citizens is the group in the age between 20-29. People in this period have had their own career.In this society of ever-quickening pace, working with copmputer has become a fashion. Furthermore, they also use it to entertain themselves and find the right person. The group secondary to this group is in the age between 10-19. In this period, middle school students mostly use computer to play games and chat with others, people in college use it both to entertain themselves and learn what they need to learn. And amount of people in this period fall in love so they spend much on chatting with their beloved people. Top3 is in the age between 30-39. In this period, middle aged people have lost part of interest of playing games and the need of
            </div>
        </div>
    </div>
    <script>
        const p = document.querySelector('.p')
        const ellipsis = document.querySelector('.ellipsis')
        const textContainer = document.querySelector('.text-container')
        const {height:pHeight} = p.getBoundingClientRect()
        const {height:containerHeight} = textContainer.getBoundingClientRect()
        console.log(pHeight,containerHeight)
        const main = ()=>{
            if(pHeight>containerHeight){
                ellipsis.style.display = 'block'
            }else{
                ellipsis.style.display = 'none'
            }
        }
        main()
    </script>
</body>
</html>
~~~

## 2.移动端适配解决方案

### rem

rem是一个相对于页面根元素html的font-size的一个单位，举个例子，假如设置了根元素html的`font-size`为`12px`，那么，`1rem` 等于` 12px`。也就是说，rem的大小是会随着根元素html的`font-size`的改变而改变的。rem方案就是利用了这一点，根据不同的屏幕尺寸，来设置不同的根元素html的`font-size`的大小，以此来达到适配不同屏幕尺寸的目的。

例如：`750px`设计稿，如果设置某个div大小为`80px`大小，那转化为rem是多少呢？在将设备宽度分为10等分的情况下，`750/10 = 75`，`80/75=1.07rem`,开发中不可能每个大小有我们自己计算，因此需要使用插件自动帮我们做转换

推荐插件`postcss-pxtorem`,使用方式如下，在postcss的插件中进行配置，也可以`postcss.config.js`中导出配置。

~~~js
module.exports = {
    "plugins":{
        "postcss-pxtorem":{
            rootValue({file}){
                //rootValue可以是number可以是个函数，由于vant基于375设计稿，如果我们使用750设计稿，那尺寸大了一半，因此是vant的时候需要将rootValue设置一般
				return file.indexOf('vant')!== -1 ? 37.5 : 75// 这里根据设计图尺寸
            }, 
            proList:['*']//需要被转换的属性
        }
    }
}
~~~



### viewport

viewport是指视窗、视口，即浏览器用来显示网页的那部分区域。在移动端开发中，我们希望页面宽度和设备宽度一致，并把这个viewport称为ideal viewport（理想视口）。我们设置会在html文件中添加`viewport`元数据标签，就是为了得到一个我们需要的viewport。

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
~~~

* `name="viewport"`指定网页在移动端设备上的视口设置。（表述该元数据的作用，允许开发者控制移动设备上网页的显示方式，包括宽度、缩放级别和用户缩放行为，以适应不同的设备屏幕和提供更好的移动浏览体验。）
* `width=device-width`:视口的宽度将与设备的宽度相匹配，确保网页内容能够适应设备屏幕的宽度。
* `initial-scale=1`:使用 `initial-scale` 属性可以设置初始的缩放级别，将页面以原始大小显示,即不进行缩放。
* `maximum-scale=1`: 表示用户无法通过手势进行放大操作，将禁用缩放。
* `minimum-scale=1`: 表示用户无法通过手势进行缩小操作，将禁用缩放。
* `user-scalable=no`: 表示用户无法通过手势进行放大缩小操作，将禁用缩放。

viewport方案即是使用vw/vh作为样式单位。vw、vh将viewport分成了一百等份，1vw等于视口1%的宽度，1vh等于视口1%的高度。当我们的设计稿是750px时，1vw就等于7.5px。

例如：`750px`设计稿，如果设置某个div大小为`80px`大小，那转化为vw是多少呢？，`80/7.5=10.67vw`,开发中不可能每个大小有我们自己计算，因此需要使用插件自动帮我们做转换

`postcss-px-to-viewport`



~~~js
//该插件常用默认的配置选项
{
  unitToConvert: 'px',// 需要被转换的单位
  viewportWidth: 320,//视口宽度
  unitPrecision: 5,// vw最大单位 
  propList: ['*'],//如果不匹配属性前面加！例如 ['*', '!letter-spacing']字间距将不会转换
  viewportUnit: 'vw',// 期望单位
  fontViewportUnit: 'vw',// 字体的期望单位
  selectorBlackList: [],//忽略该列表内的选择器，不做转换
  minPixelValue: 1,// 最小像素边界
  mediaQuery: false,//媒体查询中是否替换px
  exclude: undefined,//哪些文件不做转换[/\/src\/node_modules/],正则或数组正则
  include: undefined,//哪些文件做转换include: /\/src\/mobile\//,正则或数组正则

}
module.exports = ({ file }) => {
  const vwUnit = file && file.indexOf('vant') !== -1 ? 375 : 750;
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: vwUnit, // 设计稿的宽度
        unitPrecision: 5, // 转换后的位数，即小数点位数
        viewportUnit: 'vw', // 转换成的视窗单位
        propList: ['*'], // 要进行转换的属性，如果某个属性不进行转换，只需在其前加个“!”即可
        selectorBlackList: [], // 不进行转换的选择器
        minPixelValue: 1, // 小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      },
    },
  };
};
~~~



## 3.原子化CSS



### 原子化css原理

参考：https://antfu.me/posts/reimagine-atomic-css-zh

制作原子化 CSS 的传统方案其实就是提供所有你可能需要用到的 CSS 工具。例如，你可能会用预处理器（这里选用的是 SCSS）生成如下代码：

~~~scss
// .scss
@for $i from 1 through 10 {
  .m-#{$i} {
    margin: $i / 4 rem;
  }
}
//编译结果
.m-1 { margin: 0.25 rem; }
.m-2 { margin: 0.5 rem; }
/* ... */
.m-10 { margin: 2.5 rem; }
~~~

用这种方法的情况下，你不能使用除了 1 到 10 之外的边距，而且，即使你只使用了其中一条 CSS 规则，但还是要为其余几条规则的文件体积买单。如果之后你还想支持不同的 margin 方向，使用比如 `mt` 代表 `margin-top`，`mb` 代表 `margin-bottom` 等，加上这 4 个方向以后，你的 CSS 大小会变成原来的 5 倍。如果再有使用到像 `:hover` 和 `:focus` 这样的伪类时，体积还会得更变大。以此类推，每多加一个工具类，往往意味着你 CSS 文件的大小也会随之增加。这也就是为什么传统的 Tailwind 生成的 CSS 文件会有数 MB 的大小。

为了解决这个问题，Tailwind 通过使用 [PurgeCSS](https://purgecss.com/) 来扫描你的大包产物并删除你不需要的规则。**可以理解为css的tree shaking**这得以使其在生产环境中 CSS 文件缩减为几 KB。然而，请注意，这个清除操作仅在生成构建下有效，而开发环境下仍要使用包含了所有规则巨大的 CSS 文件。这在`Webpack `中表现可能并不明显，但在 Vite 中却有着巨大的影响，毕竟其他内容的加载都非常迅捷。既然生成再清除的方法存在局限性，那是否有更好的解决方案？

#### 按需生成

传统方案流程图

![](/CSS/unocss.png)

传统方案，会先生成一大堆css代码，然后再扫描我们代码，之后使用`PurgeCss`进行`Tree shaking`，可以看出来，明显的缺点就是产生了扫描代码和treeshaking的消耗。

按需分配的流程图

![](/CSS/unocss1.png)

这种方法可以为你节省浪费的计算开销和传输成本，同时可以灵活地实现预生成无法实现的动态需求,并可以同时在开发和生产中使用，提供了一致的开发体验，使得 HMR (热更新) 更加高效。

步骤：

①先扫描我们的源代码，vue，html

~~~js
import { promises as fs } from 'node:fs'
import glob from 'fast-glob'

// 通常这个是可以配置的
const include = ['src/**/*.{jsx,tsx,vue,html}']

async function scan() {
  const files = await glob(include)

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    // 将文件内容传递给生成器并配对 class 的使用情况
  }
}
await scan()
// 扫描会在构建/服务器启动前完成
await buildOrStartDevServer()
~~~

②为了实现HMR开启一个文件监听器，监听文件是否变化，当发生变化就将新的内容传递给生成器，并触发HMR事件，通过Webscoket拿到最新代码

~~~js
import chokidar from 'chokidar'
chokidar.watch(include).on('change', (event, path) => {
  // 重新读取文件
  const content = await fs.readFile(file, 'utf8')
  // 将新的内容重新传递给生成器
  // 清除 CSS 模块的缓存并触发 HMR 事件
})
~~~





### TailwindCSS打包体积大

`TailwindCSS`提供了大量的工具类（utility classes）。这些工具类涵盖了广泛的样式需求，例如布局、颜色、字体、边框等等。然而，这种设计方式也导致了生成的CSS文件相对较大的问题。因为`TwindCSS`会将所有的工具类都编译进最终的CSS文件中，无论你是否实际使用了它们。这意味着即使你只使用了其中几个工具类，也会包含所有的工具类定义，从而增加了文件的大小。

#### Tailwindcss原理

它基于 postcss 来扫描 CSS 文件，生成 AST（抽象语法树）再通过一系列的转换，最后构建出一份完整的工具类 CSS。在开发的时候，Tailwind 其实不知道你会写出什么样的工具类，比如这个页面你突然发现要加一个 `mr-8`，总不能每次保存文件的时候重新生成样式，所以目前 Tailwind 是先全量生成一份完整的 CSS，包含了 `mr-1` - `mr-8` 供你使用的。

#### TailwindCSS的配置

参考文档https://tailwindcss.com/docs/guides/vite

①安装

~~~shell
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
~~~

②配置`tailwind.config.js`

~~~js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
~~~

③在全局css文件中，为每个Tailwind的图层添加“tailwind”指令到你的主CSS文件。

~~~css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

④运行CLI工具扫描模板文件中的类并构建CSS。

~~~shell
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
~~~



#### 压缩

在`tailwind.config.js`中进行压缩

```js
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],

};
```

官网也有提到，这项名为 `purge CSS` 的功能，底层是使用了 purgecss[5] 这个库。

这个库并不是只供 Tailwind CSS 使用，它最简单的使用只需要提供一个 `html` 入口，还有一份样式文件，就会自动帮你找出项目中使用到的那部分 CSS的结果。

尝试一下这个库，先写一个 `index.html`，里面只使用 `hello` 这个样式：

```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div class="hello">Hello</div>
  </body>
</html>
```

再写一个 `index.css`，里面故意多写一个没用的 `useless` 类：

```
.hello {
  text-align: center;
}

.useless {
  margin: 8px;
}
```

然后根据 Github 里的用法，写一段构建脚本：

```
const PurgeCSS = require("purgecss").default;

(async () => {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: ["index.html"],
    css: ["index.css"],
  });

  console.log(purgeCSSResults);
})();
```

控制台打印出如下结果：

```
[{ css: ".hello {\n  text-align: center;\n}", file: "index.css" }];
```

完美的清除掉了 `useless` 类。它的设计和框架无关，所以各个框架也可以基于这个工具封装自己的上层工具。比如 vue-cli-plugin-purgecss，可以用来在 Vue 中清理你没有使用到的样式。

而它的实现也不复杂，只是在 `postcss` 配置中加了一个 plugin，再配合 `purgeCSS` 提供的自定义提取功能把 `.vue` 文件中的 `<style></style>` 整个删除掉，这样就可以找到使用到了哪些样式。`/templates/postcss.config.js`:

```js
const IN_PRODUCTION = process.env.NODE_ENV === "production";
cosnt pure = require("@fullhuman/postcss-purgecss")
module.exports = {
  plugins: [
    IN_PRODUCTION &&
      pure({
        // Vue 项目中，样式一般都出现在 .vue 文件里
        content: [`./public/**/*.html`, `./src/**/*.vue`],
        defaultExtractor(content) {
          // 排除 <style> 标签中匹配的样式
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ""
          );
          return (
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
          );
        },
      }),
  ],
};
```

先用正则去除掉 `style` 标签里写的样式，排除干扰，再从剩余部分提取可能用到的类名。

### Unocss

css原子化引擎

#### 配置

①安装

~~~shell
pnpm add -D unocss
~~~

②在`vite.config.js`中配置

~~~js
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
~~~

③在主文件入口中引入

~~~js
// main.ts
import 'uno.css';
import 'virtual:uno.css'
~~~

## 4.双飞翼布局

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
        }

        * {
            margin: 0;
            padding: 0;
        }

        header {
            height: 80px;
            width: 100%;
            background-color: green;
        }
        .container{
            height: calc(100% - 160px);
        
            display: flex;
        }
        main{
            min-width: 500px;
            flex: 1;
        }
        .left ,.right{
            width: 200px;
        }
        .left{
            background-color: blue;
        }
        .right{
            background-color: purple;
        }
        footer{
            height: 80px;
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: skyblue;
        }
    </style>
</head>

<body>

    <header></header>
    <div class="container">
        <aside class="left"></aside>
        <main></main>
        <aside class="right"> </aside>
    </div>

    <footer></footer>

</body>

</html>
~~~

## 5.多行文本溢出

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .text-container {
            width: 200px;
            height: 100px;
            background-color: #efefef;
            overflow: hidden;
            /* /* display: -webkit-box; */

            /* -webkit-box-orient: vertical;
            -webkit-line-clamp: 5 ;  */
            padding: 0 10px;
        }

        .text-container::before {
            content: '';
            display: block;
            height: 80px;
        }

        .p {
            margin-top: -80px;
        }

        .ellipsis {
            float: right;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="text-container">
            <div class="ellipsis">
                ...
            </div>
            <div class="p">
                From the age groups, we can see that the largest group of citizens is the group in the age between
                20-29. People in this period have had their own career.In this society of ever-quickening pace, working
                with copmputer has become a fashion. Furthermore, they also use it to entertain themselves and find the
                right person. The group secondary to this group is in the age between 10-19. In this period, middle
                school students mostly use computer to play games and chat with others, people in college use it both to
                entertain themselves and learn what they need to learn. And amount of people in this period fall in love
                so they spend much on chatting with their beloved people. Top3 is in the age between 30-39. In this
                period, middle aged people have lost part of interest of playing games and the need of l
            </div>
        </div>

    </div>

</body>

</html>
~~~







<CommentService/>