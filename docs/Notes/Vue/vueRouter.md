---
lang: zh-CN
title: vueRouter
description: 关键功能
collapsible: true
---
# vueRouter4

## 1.路由模式

api 更新

` mode:history ->createWebHistory `

 `mode: hash->createWebHistroy`

`mode：abstract->createMemoryHistory`

**① history模式**

利用了 HTML5 `History Interface` 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。由于改变了地址, 刷新时会按照修改后的地址请求后端, **需要后端配置处理, 将地址访问做映射**, 否则会404

为什么会出现404？第一次发请求，浏览器默认会在url后面加个 ’ / ',访问到服务器的index.html文件，随后返index.html文件给浏览器，浏览器拿到数据后开始渲染，渲染发现index.html文件里有外链的js和css ，发起第二次请求拿到某个js文件，拿到js文件后发现发现js文件里有个逻辑，没有登录就跳转到login页，刷新后就表示直接去服务器中找login页面，服务里面是没有login页面的，所以就会跳转404报错而hash模式用#号隔开，浏览器发送请求时服务器会忽略#后面的内容因此不会404

nginx解决方案

~~~nginx
location / {
    try_files $uri $uri/ /index.html;
}
~~~

对于histroy如何监听路由变化？每当 history 对象出现变化时，就会触发 popstate 事件。

::: tip

仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件; 只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。页面第一次加载的时候，浏览器不会触发popstate事件。 使用的时候，可以为popstate事件指定回调函数，回调函数的参数是一个 event 事件对象，它的 state 属性指向当前的 state 对象。

:::

**②hash模式**

比如这个 URL：http://www.fancyyu.top/#/hello，hash 的值为 #/hello。它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。 换句话说，# 后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。
		浏览器地址栏散列值的变化（包括浏览器的前进、后退）会触发`window.location.hash`值的变化，从而触发`onhashchange`事件；

`③abstract模式`一般用于服务端渲染， - 不修改 url ，路由地址在内存中，**但页面刷新会重新回到首页**。











## 2.编程式导航

**①命名路由**：实现路径和name的解耦（这样产品经理让你改路径不会影响页面的正常跳转啦 :tada:）

~~~ts
import { RouteRecordRaw, createRouter } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/layout.vue')
    }
]
~~~

路由跳转方式①

~~~vue
<router-link :to="{name:'home'}">go to home</router-link>
~~~

方式②

~~~vue
<template>
  <div class="main">
    appa
    {{ name }}
    <router-link :to="{name:'home'}">go to home</router-link>
    <button @click="tologin">go to login</button>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const tologin = (url:string) => {
    //方式1直接传递url
  router.push('/login')
    //方式2对象方式
    router.push({
        name:'login'
    })
}
</script>

~~~



`router.go`前进 `router.back`回退





## 3.去除历史记录

给`router-link`加`replace`属性  编程式导航 `router.replace`即可

~~~vue
<template>
  <div class="main">
    <router-link replace :to="{name:'home'}">go to home</router-link>

    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const tologin = (url:string) => {
  router.replace({
    name:'login'
  })
}


</script>

~~~



## 4.路由传参

**方式①query**：路径上会显示参数

~~~ts
router.push({
    name: 'login',
    query: {
      name: 'fancy',
      age:16
    }
  })
此时的路径上http://localhost:8888/login?name=fancy&age=16
取参数
const route = useRoute
const query = route.query
~~~

**方式②params**：参数存在内从中，页面刷新参数丢失

~~~ts
router.push({
    name: 'login',
    params: {
      name: 'fancy',
      age:16
    }
  })
取参数
const route = useRoute
const query = route.params
~~~

**方式③动态路由参数**

~~~ts
const routes: Array<RouteRecordRaw> = [
    {
        path: '/home/:id',
        name: 'home',
        component: () => import('../views/layout.vue')
    }
]
router.push({
    name: 'home',
    params: {
      id:123456
    }
  })
取参数
router.params.id
路径http://localhost:8888/home/123456
~~~



## 5.嵌套路由

父级路由要给一个`router-view`出口

~~~ts
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        children: [
            {
                path: 'children',
                name: 'children',
                component: () => import('../views/children.vue')
            }
        ]
    }
]

~~~

## 6.命名视图





## 7.重定向 

方式①字符串  `redirect: '/login/children2',`

~~~ts
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        redirect: '/login/children2',
        children: [
            {
                path: 'children',
                name: 'children',
                component: () => import('../views/children.vue')
            },
            {
                path: 'children2',
                name: 'children',
                component: () => import('../views/children2.vue')
            },

        ]
    },
        
        
const tologin = (url:string) => {
  router.push({
    name: 'login',//会跳转到children2
  })
}       
~~~

**方式②函数**

~~~ts
redirect: to => {
   return '/login/children'
},
~~~

**重定向传参**

~~~ts
redirect: to => {
   return {
       path:'/login/children',
       query:{
           name:'xxx'
       }
   }
},
~~~





## 8.守卫-中间件

**①前置守卫**

~~~js
const whiteList = ['/home', '']

router.beforeEach((to, from, next) => {
    if (!hasToken) {//没登陆 
        next({ name: 'Login' })
    } else if(!whiteList.includes(to.path)){//不在白名单
        next('/')
    } else {
        if (to.name === 'login') {
            next(from.path)
        }
        next()
    }
})
~~~

**②后置守卫**

这些钩子不会接受 `next` 函数也不会改变导航本身，它们也反映了 [navigation failures](https://router.vuejs.org/zh/guide/advanced/navigation-failures.html) 作为第三个参数。

可以做进度条

~~~js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
~~~

~~~js
//进度条案例
import {createApp,createVNode,render} from 'vue'
import Process from 'xxx/Process.vue'
const processVnode = createVNode(Process)
render(processVnode,document.body)

router.beforeEach((to, from, next) => {
   processVnode.component?.exposed?.startProcess()//该方法从组件disexpose暴露出来
})
router.afterEach((to, from, failure) => {
   processVnode.component?.exposed?.endProcess()//该方法从组件disexpose暴露出来
})
~~~



**③全局解析守卫**

它在**每次导航**时都会触发，不同的是，解析守卫刚好会在导航被确认之前、**所有组件内守卫和异步路由组件被解析之后**调用。`router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

~~~js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
~~~

## 9.路由元信息+路由过渡效果



~~~ts
declare module 'vue-router' {
    interface RouteMeta{
        transition_name,
        keepLive：boolean
    }
}

{
        path: '/home/:id',
        name: 'home',
        component: () => import('../views/layout.vue'),
        meta:{
			transition_name:'animate_fadeIn'
        }
}

~~~



~~~vue
<template>
  <div class="main">
    <router-view #default="{route,Component}">
      <transition :enter-active-class="'animate__animated '+ route.meta.transition">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>
~~~

Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡。我们可以添加一个 key 属性来强制过渡。这也允许你在相同路由上使用不同的参数触发过渡：

~~~js
<router-view v-slot="{ Component, route }">
  <transition name="fade">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>
~~~



## 10.滚动行为

`scrollBehavior`记录当前页面滚动位置，第三个参数`position`如果不存在值为null

~~~js
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: (to, from, position) => {
        if (position) {
            return
        }
        return {
            top: 0
        }
    }
})
~~~



## 11.动态路由

动态路由基于`router.addRoute`和`router.removeRoute()`这两个api实现。他们会将要添加的路由注册入路由表内。

使用场景：后台管理系统的角色权限上-》即每个角色能看到的路由菜单是不同的。这种实现方式实际上有多种。以下提供思路

**实现权限控制方式①**：在路由元信息上添加一个`roles`作为权限标识。这种方式好处在于后端省事了。。。但是缺点还是很明显的1.注册加载所有的路由（即使用户没有该路由权限）2.菜单信息写死在前端，更改不便  3.菜单和路由耦合在一起，不是所有路由都是菜单，这种方式我们要区分菜单还需要做判断

~~~js
const routerMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'directivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }]
  }]
~~~

**方式②**：前端只将无需权限的路由注册，需要权限验证的路由在用户登录后通过`addRoutes`动态添加路由

~~~js
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true //用户是admin直接放行
  if (!permissionRoles) return true //该路由不需要权限直接放行
    // 用户的权限rolse 是否拥有路由信息要求的权限
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
// 白名单
const whiteList = ['/login', '/authredirect']

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() 
    } else {
        // 当前用户如果还没拉取用户信息 则取拉去
      if (store.getters.roles.length === 0) { 
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) 
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {//没登陆
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 进度条
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 进度条
})
~~~



还有其他方式例如1.name对应，后端传来路由name，前端验证找不到对应name即没权限2.路由菜单全部交给后端返回



















<CommentService/>