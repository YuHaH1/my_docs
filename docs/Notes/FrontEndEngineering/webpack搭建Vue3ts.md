---
lang: zh-CN
title: Webpack搭建Vue3ts
description: 关键功能
collapsible: true
---
# 搭建Vue3ts



## 1.搭建项目目录

1. src存放源代码

2. public存放静态资源

3. `pnpm init`初始化`package.json`

4. `tsc --init`初始化`ts.config.json`

5. 创建`env.d.ts`声明文件

   ~~~ts
   //这样main.ts引入vue文件ts就不会报错了
   declare module "*.vue" {
       import { DefineComponent } from "vue"
       const component: DefineComponent<{}, {}, any>
       export default component
   }
   
   
   declare module '*.svg'
   declare module '*.png'
   declare module '*.jpg'
   declare module '*.jpeg'
   declare module '*.gif'
   declare module '*.bmp'
   declare module '*.tiff'
   
   ~~~

   



## 2.安装plugins

~~~shell
#1.webpack相关依赖
pnpm add webpack webpack-cli webpack-dev-server
#2.html自动引入
pnpm add html-webpack-plugin
#3.DefinePlugin定义全局变量这里要配置proces.env.NODE_ENV,很多包依赖了这个全局变量，不配置会报错
#Vue警告-Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.
const { Configuration, DefinePlugin } = require('webpack')
new DefinePlugin({
                "process.env": {
                    ...env
                },
                '__VUE_OPTIONS_API__': true,
                '__VUE_PROD_DEVTOOLS__': false
}),
# 4.分析打包体积使用的时候new webpackBundleAnalyzer.BundleAnalyzerPlugin()
#（vite中可视化插件时 rollup-plugin-visualizer）import {visualizer}from 'rollup-plugin-visualizer'  visualizer({open:true})
pnpm install webpack-bundle-analyzer --save-dev
# 5.
pnpm i -D @swc/core swc-loader

~~~





## 3.安装loaders



~~~shell
# 识别vue文件
pnpm add vue-loader@next @vue/compiler-sfc
# 解析样式文件
pnpm add css-loader style-loader sass-loader node-sass
# 解析ts 
pnpm add typescript ts-loader
# postcss
pnpm add -D postcss postcss-loader autoprefixer
# 图片压缩
pnpm add -D image-webpack-loader
# babel
pnpm add -D @babel/core @babel/preset-env babel-loader @babel/preset-typescript
~~~











## 4.配置webpack.config.js



~~~js
const { Configuration, DefinePlugin } = require('webpack')
const path = require('path')
// plugins
const htmlWebpackPlugin = require("html-webpack-plugin")
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/**
 * @type {Configuration}
 */
const port = 8888

const wbConfig = (env, argv) => {
    console.log(env)
    return {
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : 'eval',
        entry: './src/main.ts',
        output: {
            clean: true,
            filename: '[hash:8].js',
            path: path.resolve(__dirname, './dist')
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(process.cwd(), 'tsconfig.json'),
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            ]
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
            extensions: ['.vue', '.js', 'ts']
        },
        devServer: {
            port,
            open: true,
            /* 启动HMR热更新 */
            hot: true,
            proxy: {
                /* 一旦devServer(port:8888)服务器接收到 ^/api/xxx 的请求,就会把请求转发到另外一个服务器(target)上 */
                "/api": {
                    target: `http://localhost:${port}`,
                    /* 路径重写(代理时发送到target的请求去掉/api前缀) */
                    pathRewrite: {
                        "^/api": ""
                    }
                }
            }
        },
        plugins: [
            new htmlWebpackPlugin({
                template: './public/index.html'
            }),
            new VueLoaderPlugin(),
            new DefinePlugin({
                "process.env": {
                    ...env
                },
                '__VUE_OPTIONS_API__': true,
                '__VUE_PROD_DEVTOOLS__': false
            }),
            new webpackBundleAnalyzer.BundleAnalyzerPlugin(),
            new MiniCssExtractPlugin()
        ],

    }
}

module.exports = wbConfig
~~~



## 5.性能分析工具

~~~shell
pnpm install webpack-bundle-analyzer -D
pnpm i speed-measure-webpack-plugin -D

~~~

~~~js

const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
plugins: [
    new SpeedMeasureWebpackPlugin(),
    new webpackBundleAnalyzer.BundleAnalyzerPlugin(),
]
~~~









## 6.性能优化

### 生产环境优化



1.不打包Vue，但是这种方式有个缺点需要外链引入vue，如果用户网不好这种方式首屏加载很慢

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

~~~js
externals: {
        vue: 'Vue'
}
~~~



2.css压缩

~~~shell
pnpm install css-minimizer-webpack-plugin --save-dev
~~~

~~~js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new webpackBundleAnalyzer.BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin()
    ],
~~~

![](/Webpack/result1.png)  ![](/Webpack/result2.png)



3.代码分割

~~~js
optimization: {
     splitChunks: {
                minSize: 20000,// 形成一个新代码块最小的体积
                maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
      }
},
~~~



### 开发环境优化

1.压缩CompressionPlugin

~~~js
new CompressionPlugin({
                test: /\.js$|\.html$|\.css|\.ts/, //匹配文件名
                threshold: 10240, //对超过10k的数据进行压缩
})
~~~















<CommentService/>