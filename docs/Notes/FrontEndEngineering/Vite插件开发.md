---
lang: zh-CN
title: Vite插件开发
description: 关键功能
collapsible: true
---
# Vite插件开发

## DNS预解析插件

### 1.初始化项目

~~~shell
pnpm add vite typescript @mistjs/tsconfig-vue eslint @mistjs/eslint-config-vue tsup vitest @vitejs/plugin-vue vue vite-plugin-inspect -D
~~~

* vite核心包，用于开发vite插件
* @types/node：node的类型声明
* typescript：ts类型声明
*  @mistjs/tsconfig-vue:ts配置文件
* eslint:代码检查
* @mistjs/eslint-config-vue：eslint配置文件
* vite-plugin-inspect:插件调试
* @vitejs/plugin-vue:vite的vue插件
* tsup：基于rooup的构建工具，构建插件包

定义script脚本

~~~json
{
  "name": "vite-plugin-dns-prefetch",
  "version": "1.1.1",
  "description": "a plugin of dns-prefetch",
  "module": "dist/main.mjs",
  "types": "dist/main.d.ts",
  "main": "dist/main.js",
  "scripts": {
    "dev:eg": "vite dev vite-project",
    "build:eg": "vite build vite-project",
    "preview:eg": "vite preview vite-project",
    "build": "tsup",
    "release": "bumpp",
    "changelog":"changelogen --output CHANGELOG.md"
  },
  "files": [
    "dist"
  ],
  "keywords": [
    "vite-plugin-dns-prefetch",
    "dns-prefetch",
    "prefetch"
  ],
  "author": "fancy_fish",
  "license": "ISC",
  "devDependencies": {
    "@mistjs/eslint-config-vue": "^0.0.5",
    "@mistjs/tsconfig-vue": "^1.1.2",
    "@types/node": "^20.1.7",
    "@vitejs/plugin-vue": "^4.2.3",
    "changelogen": "^0.5.3",
    "eslint": "^8.40.0",
    "node-html-parser": "^6.1.5",
    "tsup": "^6.7.0",
    "typescript": "^5.0.4",
    "url-regex": "^5.0.0",
    "vite": "^4.3.7",
    "vite-plugin-inspect": "^0.7.26",
    "vitest": "^0.31.0",
    "vue": "^3.3.2"
  }
}

~~~

tsup的配置

~~~ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/main.ts', // 入口
  ],
  dts: true, // 生成dist
  clean: true,
  format: ['cjs', 'esm'],
})
~~~

tsconfig.json

~~~json
{
    "extends": "@mistjs/tsconfig-vue",
    "compilerOptions": {
        "moduleResolution":"node",
        "isolatedModules":false
    }
}
~~~

eslintrc

~~~json
{
    "extends": "@mistjs/eslint-config-vue"
}
~~~

文件目录

![](/Vite/plugin.png)

### 2.思路

1. dns预解析只需要在生产环境中使用，因此插件配置`apply:’build’`
2. 解析用户文件中包含https的url
3. 在transformIndexHtml钩子的head里添加`<link rel="dns-prefetch" href="${url}"/>`即可

### 3.用户自定义扩展

1. `limit`:限制最多添加多少个dns预解析，太多对网络也是负担，这里默认是10个
2. `parseFile`：解析哪些文件，数组类型，例如指定`’.ts’|’.js’`
3. `excludeDnsPrefetchUrl`:对于哪些url不采用预解析（一些大家可能经常访问的url本身就在缓存里了就没必要预解析了）
4. `addDnsUrl`：用户也可以直接添加一些URL进行预解析。













<CommentService/>