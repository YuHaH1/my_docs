---
lang: zh-CN
title: vue-loader初探
description: 关键功能
collapsible: true
---
# vue-loader初探

## 1.vue-loader

vue-loader使用vue/complier-sfc包中的compiler来解析模板、脚本和样式，

~~~ javascript
const compiler = require('vue/complier-sfc')
module.exports = function(source){
    const loaderContext = this
    const {context,resourcePath,resourceQuery}
    const {descriptor} = compiler.parse(source)//descriptor描述是一个解析后的对象
    const {script} = descriptor
    const code = []
    const stringifyRequest = loaderContext.utils.contextify(
   		context,
        resourcePath+resourceQuery
    )
    srcipt && code.push(`import script from ${}`)
}
~~~



~~~js
export default function loader(
  this: webpack.loader.LoaderContext,
  source: string
) {
    const loaderContext = this
   ....... 
    }
~~~

vueloader做了什么：

1.  如果VueLoaderPlugin插件没有安装的情况下报错，==这个插件动态的添加loader处理从vue文件分割出来的js html css代码==

    1. ![](/Vue/vueloader1.png)
    2. pitcher处理js 其他的处理html  css，最终重新定义loader的rules

2. 得出请求的路径 例如 import APP from './APP.vue'  ./APP.vue

3. 取出参数

4. 环境判断 生产环境？ node环境？

5. 解析内容将 vue文件 模板 脚本 样式拆分成对象放到descriptor中

6. MAP结构缓存描述符

   1. ~~~js
      import * as fs from 'fs'
      import type { SFCDescriptor } from 'vue/compiler-sfc'
      import { parse } from 'vue/compiler-sfc'
      
      const cache = new Map<string, SFCDescriptor>()
      
      export function setDescriptor(filename: string, entry: SFCDescriptor) {
        cache.set(cleanQuery(filename), entry)
      }
      
      export function getDescriptor(filename: string): SFCDescriptor {
        filename = cleanQuery(filename)
        if (cache.has(filename)) {
          return cache.get(filename)!
        }
        const source = fs.readFileSync(filename, 'utf-8')
        const { descriptor } = parse(source, {
          filename,
          sourceMap: true,
        })
        cache.set(filename, descriptor)
        return descriptor
      }
      
      function cleanQuery(str: string) {
        const i = str.indexOf('?')
        return i > 0 ? str.slice(0, i) : str
      }
      
      ~~~

   2. getDescriptor这个函数只会在描述符之后调用，如果没有命中cache缓存可能是由于加载器在单独的线程中运行。处理这件事唯一办法直接从磁盘读取该文件

7. 拿文件路径并生成hash作为id-》热重载  当文件内容变化重新生成新的hash

8. 查看是否包含scoped已经热重载功能是否需要 。（生产环境node或者选项hotReload=false都不需要以及这三个条件其中一个为真descriptor.script || descriptor.scriptSetup || descriptor.template）

9.  const propsToAttach: [string, string][] = [] 定义变量，给脚本添加额外属性来为Tree-shaking做准备

10. 分割vue文件 script  template  style，提取参数。

    1. ~~~js
       const query = `?vue&type=script${attrsQuery}${resourceQuery}`
          const query = `?vue&type=template${idQuery}${scopedQuery}${tsQuery}${attrsQuery}${resourceQuery}`
             const query = `?vue&type=style&index=${i}${idQuery}${inlineQuery}${attrsQuery}${resourceQuery}`
       ~~~

11. 将生成的hash id放到css元素上

    1. ~~~js
       if (hasScoped) {
          propsToAttach.push([`__scopeId`, `"data-v-${id}"`])
        }
       ~~~

12. 暴漏文件名利于devtools工具

    1. ~~~js
       // Expose filename. This is used by the devtools and Vue runtime warnings.
         if (!isProduction) {
           // Expose the file's full path in development, so that it can be opened
           // from the devtools.
            //开发环境下暴露文件的全路径，以便于可以从开发工具中直接打开该文件
           propsToAttach.push([
             `__file`,
             JSON.stringify(rawShortFilePath.replace(/\\/g, '/')),
           ])
         } else if (options.exposeFilename) {
            //生产环境，库可以选择在生产版本中公开其组件的文件名。出于安全原因，在生产环境中只暴露文件的basename。
           propsToAttach.push([`__file`, JSON.stringify(path.basename(resourcePath))])
         }
       ~~~

13. 添加TreeShake代码

    1. ~~~js
       //如果propsToAttach存在，添加else代码来Tree  shaking
        /**
         * 但我们可以通过 __PURE__
            注释来帮忙 terser。它给一个语句标记为没有副作用。就这样一个简单的改变就能够使下面的代码被 tree - shake 
            但仍然会有一些引入的问题，需要对其进行评估，因为它们产生了副作用。
            为了解决这个问题，我们需要在 package.json 中添加 "sideEffects" 属性。
            它类似于 __PURE__但是作用于模块的层面，而不是代码语句的层面。
            它表示的意思是(指"sideEffects" 属性)：“如果被标记为无副作用的模块没有被直接导出使用，
            打包工具会跳过进行模块的副作用分析评估。”。
        */
        // finalize
        if (!propsToAttach.length) {
          code += `\n\nconst __exports__ = script;`
        } else {
          code += `\n\nimport exportComponent from ${exportHelperPath}`
          code += `\nconst __exports__ = /*#__PURE__*/exportComponent(script, [${propsToAttach
            .map(([key, val]) => `['${key}',${val}]`)
            .join(',')}])`
        }
       ~~~

14. 添加热重载代码

    1. ~~~js
       //添加热重载的代码
         if (needsHotReload) {
           code += genHotReloadCode(id, templateRequest)
         }
       ~~~

15. attrsToQuery这个函数主要用于获取用户传入的参数并忽略用户传入的内置使用的属性const ignoreList = ['id', 'index', 'src', 'type']



总结：==vue-loader主要做的就是解析Vue文件，分别生成js css html，并分别进行相对应的处理。并做热更新和摇树的优化操作。==



## 2.VueLoaderPlugin

在使用Vueloader的时候必须要在webpack.config.js的plugins中注册该插件。

这个插件的作用主要是将Vue分割出来的js html css都有对应的loader去处理。



<CommentService/>