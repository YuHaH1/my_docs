---
lang: zh-CN
title: Vue生命周期
description: 关键功能
collapsible: true
---
# Vue生命周期

## Vue2生命周期

Vue的生命周期初始化在initMixin中完成

src/core/instancec/init.ts

~~~ts
export function initMixin(Vue: typeof Component) {
  Vue.prototype._init = function (options?: Record<string, any>) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (__DEV__ && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true
    // avoid instances from being observed
    vm.__v_skip = true
    // effect scope
    vm._scope = new EffectScope(true /* detached */)
    vm._scope._vm = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options as any)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (__DEV__) {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate', undefined, false /* setContext */)
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (__DEV__ && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
~~~

* 先初始化生命周期的基本配置

  * ~~~ts
      vm._watcher = null
      vm._inactive = null
      vm._directInactive = false
      vm._isMounted = false
      vm._isDestroyed = false
      vm._isBeingDestroyed = false
    ~~~

* 初始化事件，收集`onClick`例如这样的事件

* 初始化`Render`，给每个组件绑定好各自的上下文

* 调用`beforeCreate`钩子

* 初始化注入，给注入的数据变成响应式，

  * ~~~ts
    export function initInjections(vm: Component) {
      const result = resolveInject(vm.$options.inject, vm)
      if (result) {
        toggleObserving(false)
        Object.keys(result).forEach(key => {
          /* istanbul ignore else */
          if (__DEV__) {
            defineReactive(vm, key, result[key], () => {
              warn(
                `Avoid mutating an injected value directly since the changes will be ` +
                  `overwritten whenever the provided component re-renders. ` +
                  `injection being mutated: "${key}"`,
                vm
              )
            })
          } else {
            defineReactive(vm, key, result[key])
          }
        })
        toggleObserving(true)
      }
    }
    ~~~

  *  `toggleObserving(false)`避免被观察进行响应式代理，对于注入的数据只需要`definedReactive`，不会挂载`Observer`实例

  * ~~~ts
     if (
        shouldObserve &&
        (ssrMockReactivity || !isServerRendering()) &&
        (isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value.__v_skip /* ReactiveFlags.SKIP */ &&
        !isRef(value) &&
        !(value instanceof VNode)
      ) {
        return new Observer(value, shallow, ssrMockReactivity)
      }
    ~~~

* 初始化状态，这里会初始化`props`、`methods`、`computed`、`watch`等选项

  * ~~~ts
    export function initState(vm: Component) {
      const opts = vm.$options
      if (opts.props) initProps(vm, opts.props)
    
      // Composition API
      initSetup(vm)
    
      if (opts.methods) initMethods(vm, opts.methods)
      if (opts.data) {
        initData(vm)
      } else {
        const ob = observe((vm._data = {}))
        ob && ob.vmCount++
      }
      if (opts.computed) initComputed(vm, opts.computed)
      if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
      }
    }
    ~~~

* 初始化生产者，

  * ~~~ts
    export function initProvide(vm: Component) {
      const provideOption = vm.$options.provide
      if (provideOption) {
        const provided = isFunction(provideOption)
          ? provideOption.call(vm)
          : provideOption
        if (!isObject(provided)) {
          return
        }
        const source = resolveProvided(vm)
        // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
        // iterate the keys ourselves.
        const keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          Object.defineProperty(
            source,
            key,
            Object.getOwnPropertyDescriptor(provided, key)!
          )
        }
      }
    }
    ~~~

* 初始化完成调用`created`钩子

* 然后开始挂载调用vm.$mount

  * ~~~ts
    // public mount method
    Vue.prototype.$mount = function (
      el?: string | Element,
      hydrating?: boolean
    ): Component {
      el = el && inBrowser ? query(el) : undefined
      return mountComponent(this, el, hydrating)
    }
    ~~~

  * ~~~ts
    export function mountComponent(
      vm: Component,
      el: Element | null | undefined,
      hydrating?: boolean
    ): Component {
      vm.$el = el
      if (!vm.$options.render) {
        // @ts-expect-error invalid type
        vm.$options.render = createEmptyVNode
        if (__DEV__) {
          /* istanbul ignore if */
          if (
            (vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
            vm.$options.el ||
            el
          ) {
            warn(
              'You are using the runtime-only build of Vue where the template ' +
                'compiler is not available. Either pre-compile the templates into ' +
                'render functions, or use the compiler-included build.',
              vm
            )
          } else {
            warn(
              'Failed to mount component: template or render function not defined.',
              vm
            )
          }
        }
      }
      callHook(vm, 'beforeMount')
    
      let updateComponent
      /* istanbul ignore if */
      if (__DEV__ && config.performance && mark) {
        updateComponent = () => {
          const name = vm._name
          const id = vm._uid
          const startTag = `vue-perf-start:${id}`
          const endTag = `vue-perf-end:${id}`
    
          mark(startTag)
          const vnode = vm._render()
          mark(endTag)
          measure(`vue ${name} render`, startTag, endTag)
    
          mark(startTag)
          vm._update(vnode, hydrating)
          mark(endTag)
          measure(`vue ${name} patch`, startTag, endTag)
        }
      } else {
        updateComponent = () => {
          vm._update(vm._render(), hydrating)
        }
      }
    
      const watcherOptions: WatcherOptions = {
        before() {
          if (vm._isMounted && !vm._isDestroyed) {
            callHook(vm, 'beforeUpdate')
          }
        }
      }
    
      if (__DEV__) {
        watcherOptions.onTrack = e => callHook(vm, 'renderTracked', [e])
        watcherOptions.onTrigger = e => callHook(vm, 'renderTriggered', [e])
      }
    
      // we set this to vm._watcher inside the watcher's constructor
      // since the watcher's initial patch may call $forceUpdate (e.g. inside child
      // component's mounted hook), which relies on vm._watcher being already defined
      new Watcher(
        vm,
        updateComponent,
        noop,
        watcherOptions,
        true /* isRenderWatcher */
      )
      hydrating = false
    
      // flush buffer for flush: "pre" watchers queued in setup()
      const preWatchers = vm._preWatchers
      if (preWatchers) {
        for (let i = 0; i < preWatchers.length; i++) {
          preWatchers[i].run()
        }
      }
    
      // manually mounted instance, call mounted on self
      // mounted is called for render-created child components in its inserted hook
      if (vm.$vnode == null) {
        vm._isMounted = true
        callHook(vm, 'mounted')
      }
      return vm
    }
    ~~~

* 我们可以看到在上面`$mount`的时候定义了一个`watcherOptions.before`函数，该函数会在更新之前触发

  * ~~~ts
    function flushSchedulerQueue() {
      currentFlushTimestamp = getNow()
      flushing = true
      let watcher, id
    
    	// 排序按组件顺序父-》子
      queue.sort(sortCompareFn)
    
      // do not cache length because more watchers might be pushed
      // as we run existing watchers
      for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        if (watcher.before) {
          watcher.before()
        }
        id = watcher.id
        has[id] = null
        watcher.run()
        // in dev build, check and stop circular updates.
        if (__DEV__ && has[id] != null) {
          circular[id] = (circular[id] || 0) + 1
          if (circular[id] > MAX_UPDATE_COUNT) {
            warn(
              'You may have an infinite update loop ' +
                (watcher.user
                  ? `in watcher with expression "${watcher.expression}"`
                  : `in a component render function.`),
              watcher.vm
            )
            break
          }
        }
      }
    
      // keep copies of post queues before resetting state
      const activatedQueue = activatedChildren.slice()
      const updatedQueue = queue.slice()
    
      resetSchedulerState()
    
      // call component updated and activated hooks
      callActivatedHooks(activatedQueue)
      callUpdatedHooks(updatedQueue)
      cleanupDeps()
    
      // devtool hook
      /* istanbul ignore if */
      if (devtools && config.devtools) {
        devtools.emit('flush')
      }
    }
      callUpdatedHooks(updatedQueue)
    function callUpdatedHooks(queue: Watcher[]) {
      let i = queue.length
      while (i--) {
        const watcher = queue[i]
        const vm = watcher.vm
        if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'updated')
        }
      }
    }
    
    ~~~

* 当组件卸载时会调用`$destroy`，卸载时判断有没有`keepAlive`有的话旧调用`deactivate`钩子了

  * ~~~ts
      destroy(vnode: MountedComponentVNode) {
        const { componentInstance } = vnode
        if (!componentInstance._isDestroyed) {
          if (!vnode.data.keepAlive) {
            componentInstance.$destroy()
          } else {
            deactivateChildComponent(componentInstance, true /* direct */)
          }
        }
      }  
    Vue.prototype.$destroy = function () {
        const vm: Component = this
        if (vm._isBeingDestroyed) {
          return
        }
        callHook(vm, 'beforeDestroy')
        vm._isBeingDestroyed = true
        // remove self from parent
        const parent = vm.$parent
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
          remove(parent.$children, vm)
        }
        // teardown scope. this includes both the render watcher and other
        // watchers created
        vm._scope.stop()
        // remove reference from data ob
        // frozen object may not have observer.
        if (vm._data.__ob__) {
          vm._data.__ob__.vmCount--
        }
        // call the last hook...
        vm._isDestroyed = true
        // invoke destroy hooks on current rendered tree
        vm.__patch__(vm._vnode, null)
        // fire destroyed hook
        callHook(vm, 'destroyed')
        // turn off all instance listeners.
        vm.$off()
        // remove __vue__ reference
        if (vm.$el) {
          vm.$el.__vue__ = null
        }
        // release circular reference (#6759)
        if (vm.$vnode) {
          vm.$vnode.parent = null
        }
      }
    ~~~

  * 

​	







































<CommentService/>