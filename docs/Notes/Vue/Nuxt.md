---
lang: zh-CN
title: Nuxt
description: 关键功能
collapsible: true
---
# Nuxt

## 安装E:\360MoveData\Users\YR\Desktop\前端必会手写题\vue\dy_form\README.md

~~~shell
pnpm dlx nuxi@latest init <project-name>
~~~



## 渲染模式



### 传统服务端渲染

在过去传统开发中，页面渲染任务是由服务端完成的，服务器负责获取数据，拼装页面，客户端仅负责内容显示，使用这种方式的典型技术有 JSP、PHP、ASP.NET 等等。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a90439d0ba254842aa154b626cff7ccc~tplv-k3u1fbpfcp-jj-mark:2363:0:0:0:q75.awebp)



缺点：

* 服务器负载相对大
* 前后端混在一起，不利于维护



### 同构渲染

为了保证前端程序员能够使用熟悉的方式编写页面，即“同构渲染”，服务端渲染时，Nuxt 实际上是在服务器上执行 Vue，将我们编写的组件渲染为 HTML 并返回客户端。客户端激活时执行的 JS 实际上也是 Vue，它会重新接管文档，恢复数据和状态，使静态页面变得可交互，这一过程称为“注水(hydration)”。

可以看到，SSR 保留 CSR 优点的同时，还给用户提供了快速加载首屏的能力，这同时也解决了 SEO 问题。

缺点:

* 因为服务器和浏览器环境有差异，它们不能给开发者提供相同 API，例如，组件在服务端创建时就没有 mounted 钩子，因为根本没有挂载这一步，这导致不少组件库不能在服务端环境正常使用。
* 客户端才能运行的代码，如果在服务端执行会报错，例如调用`localstorage`。

### 静态站点生成

对于不会发生变化的页面，不会重新渲染。例如，用户每次访问相同页面时不会每次都重新渲染。**仅适合内容创建之后不经常变化的网站**



### 混合渲染

混合渲染是一种根据不同路由规则使用不同方式渲染的模式。这种方式综合了前面的静态站点和SEO和客户端渲染的优势。比如电商应用首页经常变动，适合服务端渲染，商品详情页则希望静态化；又比如 CMS 中 admin 部分不需要 SEO，则适合客户端渲染，而所有内容页则仅需要生成一次。



### 边缘渲染

过去，SSR 只能运行在 Node.js 环境，但是 Nuxt3 提供了跨平台支持，能够同时运行在 Node.js、Deno、Workers 等运行时环境。

这就给用户带来一种全新使用方式：边缘渲染 - edge-side rendering，这种方式能够在 CDN edge worker 环境下直接执行渲染，这样 Nuxt 应用能够运行在离用户更近的环境中，从而降低延迟和服务器花销。



## 路由

Nuxt中路由由文件系统进行控制，我们只需要在pages目录下定义.vue文件即可

例如1`/pages/about.vue`访问时`localhost:3000/about`即可跳转about路由

例如2`/pages/profile/index.vue`访问时`localhost:3000/profile`即可跳转profile路由

~~~txt
| pages/
---| about.vue
---| profile.vue
---| posts/
-----| [id].vue
~~~

我们需要在要展示路由的地方放一个`<NuxtPage/>`

### 路由导航

#### Navigation

`NuxtLink`类似于a标签。当`<NuxtLink>`进入客户端的视口时，Nuxt会自动提前预取链接页面的组件和有效载荷(生成的页面)，从而加快导航速度。

~~~vue
<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

~~~

#### 声明式导航

例如：

~~~vue
//
<script setup>
const router = useRouter()
</script>

<template>
  <button @click="$router.back()">Back</button>
</template>

~~~



这里的router和vue-router优点类似。

~~~ts
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })

// 基于history的API
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })

~~~









### 路由参数

①传递参数

文件名用占位符即可。

例如`/pages/user-[id].vue`传递参数时`router.push('/user-${Math.random() * 100).toFixed()}')`



②接收参数

~~~vue
<script setup lang="ts">
const route = useRoute()

// 当访问 /posts/1, route.params.id 为 1
console.log(route.params.id)
</script>
~~~



### 路由中间件Middleware（守卫）

但是，next有一个路由中间件的概念，它简化了导航保护的实现，并提供了更好的开发人员体验。

导航守卫示例：

~~~ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {
    return abortNavigation()
  }

  if (to.path !== 'login' && !isAuth) {
    return navigateTo('/login')
  }
})
~~~



路由中间件分三类：

* 匿名路由中间件：直接定义在使用他们的页面中。

  * ~~~vue
    <script setup lang="ts">
    definePageMeta({
      middleware: [
        function (to, from) {
          // Custom inline middleware
        },
        'auth',
      ],
    });
    </script>
    ~~~

* 命名路由中间件：放在`/middleware/`目录中，在页面使用时将异步自动加载。（路由中间件的名字会被标准化例如`someMiddleware->some-middleware`）。

* 全局路由中间件：位于`/middleware/`目录中且后缀名为.global，将在每次路由更改时自动运行。

例如

①定义中间件

~~~ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() 是一个验证用户是否被授权的示例方法
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
~~~

②在`/pages/dashboard.vue`页面中使用中间件

~~~vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <h1>Welcome to your dashboard</h1>
</template>
~~~

### 路由验证

相当于路由守卫，可以在决定是否跳转到特定路由。

路由验证方法接收一个`route`路由作为参数，并返回一个布尔值，如果返回false客户端将收到404我们也可以返回一个对象，包含`statusCode和statusMessage`来作为错误的回应消息。

例如：

~~~vue
<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // 检查id是否数字组成
    return /^\d+$/.test(route.params.id)
  }
})
</script>

~~~





## 组件



### 全局组件

Nuxt中全局组件，我们在`components/`目录下去定义的组件为全局组件

例如:

~~~txt
--components
	--Profile
		--index.vue
		--Header
			--index.vue
~~~

~~~vue
//我们使用的时候直接根据文件名作为组件名即可。
<template>
	<Profile/>
	<ProfileHeader>//多层级嵌套的组件直接拼接文件名
</template>
~~~



### layouts布局组件

①有什么用？

布局是围绕包含多个页面的通用用户界面的页面的包装器，例如页眉和页脚显示。布局是使用`<slot />`组件来显示页面内容的Vue文件。`layouts/default.vue`将作为默认使用的Vue布局文件。可以将自定义布局设置为页面元数据的一部分。

②规则：

* 布局组件的名字将被标准化例如`someLayout->some-layout`
* 如果页面没有指定使用的布局，默认使用`layouts/default.vue`
* 如果你的应用程序中只有一个布局，建议使用app.vue替代。

例如：

~~~vue
// /layouts/default.vue
<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
// /pages/index.vue
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
  </div>
</template>
// /pages/about.vue
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>

~~~







<CommentService/>