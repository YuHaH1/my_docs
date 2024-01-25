---
lang: zh-CN
title: js面经
description: 关键功能
collapsible: true
---
# js面经



## 1.为什么0.1+0.2不等于0.3

原因：

1. JS内部计算是二进制进行，因此十进制要转为二进制

   1. 十进制怎么转二进制？整数除2取余然后逆序排列得到的0，1。小数转二进制会不断*2然后取整，再将整数部分顺序排列。

      ~~~js
      8/2 = 4  ...0
      4/2 = 2  ...0
      2/2 = 1  ...0
      1/2 = 0  ...1   结果->1000
      
      小数
      0.1 * 2 = 0.2 ...0
      0.2 * 2 = 0.4 ...0
      0.4 * 2 = 0.8 ...0
      0.8 * 2 = 1.6 ...1
      0.6 * 2 = 1.2 ...1  结果 0.00011 0011 0011 0011.....
      0.2 * 2 = 0.4 ...接下来无限循环
      ~~~

2. Number类型使用IEEE754标准64位存储，这意味着会分配**64位存储空间**并**以科学计数法**的方式存储。 64位存储空间分三个部分,第1位符号位（0正1负），后11位指数位（固定1023这个是IEEE754标准计算得到），剩余52位小数位。由于是无限循环因此截取保留52位，0舍1入向前进位，于是这里发生**第一次精度丢失**。

   ![](/javaScript/sign1.png)

3. 64位双精度数值相加，相加后小数部分变成53位，0舍1入向前进位，于是这里发生**第二次精度丢失**。

4. 然后再转10禁止就成了0.3000…..4

因此总结，①js二进制处理使用IEE754双精度浮点数存储，它的存储位有限。②过程中两次精度丢失一次存储时，一次相加时。



## 2.如何跨页通讯

**方式①**：本地存储，接收方通过监听`storage`事件即可，发送端直接`localstorage.setItem`

优点：兼容性好   缺点：1.如果存储的值已存在并且未发生改变就不会触发 2.必须同源

~~~js
window.addEventListener('storage', function (e) {
            console.log(e)
})
window.onstorage = e => {
            console.log(e)
}
~~~

**方式②**`sharedworker`

缺点：需要一个worker进程作为中介转发消息

~~~js
//页面1
const worker = new SharedWorker('./shared_worker.js')
worker.port.start()
worker.port.postMessage('--这是发送端通过sharedworker发送的消息')
//页面2
const worker = new SharedWorker('./shared_worker.js')
worker.port.start()
worker.port.onmessage = e => {
       console.log(`接收端收到${e.data}`)
}
//shared_worker.js
// 存储所有的端口
const ports = []
self.onconnect = e => {
    // 获取当前页面端口并启动
    let port = e.ports[0]
    port.start()

    ports.push(port)
    // 给所有的port发消息
    port.addEventListener('message', e => {
        for (let p of ports) {
            p.postMessage(e.data)
        }
    })
}
~~~

**方式③**`window.open`如果父子窗口满足“[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)”，你可以通过这个引用访问新窗口的属性或方法。

::: tip

调用`window.open()`方法以后，远程 URL 不会被立即载入，载入过程是异步的。（实际加载这个 URL 的时间推迟到当前脚本块执行结束之后。窗口的创建和相关资源的加载异步地进行。）

:::

缺点：只能在旧页面发送消息  被打开的页面监听消息。

~~~js

this.device = window.open('./index2.html')
setTimeout(() => {
     this.device.postMessage('--这是发送端通过window.open发送的消息')
}, 3000);

//other page
window.addEventListener('message', e => {
      console.log(`接收端收到${e.data}`)
})
window.onmessage = e => {
      console.log(`接收端收到${e.data}`)
}
~~~

**方式④****`BroadcastChannel`** 接口代理了一个命名频道，可以让指定 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin) 下的任意 [browsing context](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context) 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 [`message`](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/message_event) 事件，消息可以广播到所有监听了该频道的 `BroadcastChannel` 对象。

~~~js
const boradcastchannel = new BroadcastChannel('.channel')
boradcastchannel.postMessage('--这是发送端通过BoradcastChannel发送的消息')

//ohter page
channel = new BroadcastChannel('.channel');
channel.onmessage = e => {
     console.log(e)
}
~~~

**方式⑤**websocket 需要后端支持







## 3.promise、生成器和async、awiat

### 手写标准promise

这个promise和官方基本一样，按照Promise A+规范实现

~~~js
class My_Promise {
    #REJECTED = 'rejected';
    #FULFILLED = 'fulfilled';
    #PENDING = 'pending';
    constructor(fn) {
        this.status = this.#PENDING;
        this.value = undefined;
        this.handlers = []
       	// 执行回调
        this.execute(fn)
        this[Symbol.toStringTag] = 'Promise'
    }
    execute(fn) {
        try {
            把我们定义的resolve和reject传入，
            fn(this._resolve, this._reject)
        } catch (error) {
            如果报错直接给reject
            this._reject(error)
        }
    }
    #changStatus = (status, value) => {
        this.value = value
        this.status = status
        this.#run()
    }
    _resolve = (value) => {
        if (this.status !== this.#PENDING) return
        this.#changStatus(this.#FULFILLED, value)
    }
    _reject = (reason) => {
        if (this.status !== this.#PENDING) return
        this.#changStatus(this.#REJECTED, reason)
    }
    then = (fulfilledCallback, rejectCallback) => {
        //如果promise内部回调fn是异步then会先执行，因此将then用作收集回调的函数即可，后续状态改变再执行回调（状态会在resolve/reject时改变）
        return new My_Promise((resolve, reject) => {
            this.handlers.push({
                fulfilledCallback,
                rejectCallback,
                resolve,
                reject,
            })
            // 如果是同步就直接运行
            this.#run()
        })
    }
    // 检查是否是 promise 
    #check_Promise = (value) => value && Object.prototype.toString.call(value).slice(8, -1) === 'Promise' && typeof value?.then === 'function'
    #MICROTASKING = (cb, callback, reject, resolve) => {
        const mo = new MutationObserver((e) => { cb(callback, reject, resolve) })
        const div = document.createElement('div')
        mo.observe(div, {
            characterDataOldValue: true,
            childList: true,
            subtree: true
        })
        div.textContent = 1
        setTimeout(() => {
            mo.disconnect()
        }, 1000)
    }
    #runThen = (callback, resolve, reject) => {
        const reject_or_rejected = this.status === this.#FULFILLED ? resolve : reject
        try {
            // 如果then方法传来的是函数就执行
            if (typeof callback === 'function') {
                const res = callback(this.value)
                //如果then的回调执行结果是promise则调用then并将resolve，reject传入
                if (this.#check_Promise(res)) {
                    res.then(resolve, reject)
                } else {
                //如果不是promise直接将回调结果resolve/reject
                    reject_or_rejected(res)
                }
            } else {//如果不是函数就透传 把之前的结果值返回
                resolve(this.value)
            }
        } catch (error) {
            // 回调报错直接reject
            reject(error)
        }
    }
    #run = () => {
        // 做一个判断即可 异步fn这里的状态一开始肯定是pending
        if (this.status === this.#PENDING) return
        while (this.handlers.length) {
            const { fulfilledCallback,
                rejectCallback,
                resolve,
                reject } = this.handlers.shift()
            if (this.status === this.#FULFILLED) {//成功状态
                // 模拟微任务
                this.#MICROTASKING(this.#runThen, fulfilledCallback, resolve, reject)
            } else {//拒绝状态.
                this.#MICROTASKING(this.#runThen, rejectCallback, resolve, reject)
            }
        }
    }
    catch = (rejectCallback) => {
        return this.then(undefined, rejectCallback)
    }
    finally = (finallyCallback) => {//finallyCallback不接受参数 
        return this.then((res) => {
            finallyCallback()
        }, err => {
            finallyCallback()
        })
    }
    // 由于静态方法无法访问实例和实例属性 因此这里造一个实例然后实例.#check_Promise(value)
    static resolve = (value) => {
        let _resolve = null
        let _reject = null
        const p = new My_Promise((resolve, reject) => {
            _resolve = resolve
            _reject = reject
        })
        if (p.#check_Promise(value)) {
            value.then(_resolve, _reject)
        } else {
            _resolve(value)
        }
        return p
    }
    // reject 无论reason是什么直接reject
    static reject = (reason) => {
        return new My_Promise((resolve, reject) => {
            reject(reason)
        })
    }
}
export { My_Promise }
~~~

### 模拟实现async await

~~~js
 // 定义了一个promise，用来模拟异步请求，作用是传入参数++
        function getNum(num) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1)
                }, 1000)
            })
        }
        function getNum1(num) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(2)
                }, 1000)
            })
        }
        // 接受一个数组 这里就不做类型校验了
        const my_asyn = (fns) => {
            function* generator() {
                while (fns.length) {
                    const f = fns.shift();
                    yield f()
                }
            }
            function run() {
                const gen = generator()
                const { value, done } = gen.next()
                if (!done) {
                    value.then(res => {
                        console.log(res)
                        run()
                    }).catch(err => {
                        throw err
                    })
                }

            }
            run()
        }
        my_asyn([getNum, getNum1])
~~~

### 并发控制

可以通过`pnpm i concurrency-control_fancy_fish`下载使用

~~~js
        /*任务调度器，实现最多两个的并发请求限制*/
        class Schedule {
            constructor(limit = 2) {
                this.tasks = []//任务队列
                this.$Max = limit//最大值
                this.running_count = 0//统计执行个数
            }
            add(tasks) {
                return new Promise((resolve, reject) => {
                    this.tasks.push({
                        task: tasks,
                        resolve,
                        reject
                    })
                    this.execute()
                })
            }
            execute() {
                if (this.tasks.length && this.running_count < this.$Max) {
                    this.running_count++
                    const { task, resolve, reject } = this.tasks.shift()
                    task().then(res => {
                        // console.log(res)
                        resolve(res)

                    }).catch(err => {
                        reject(err)
                    }).finally(() => {
                        this.running_count--
                        this.execute()
                    })
                }
            }
        }
        const scheddule = new Schedule(3)
        scheddule.add(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(1)
                }, 1000);
            })
        }).then(res => {
            console.log(res)
        })
        scheddule.add(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2)
                }, 1000);
            })
        }).then(res => {
            console.log(res)
        })
        scheddule.add(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(3)
                }, 1000);
            })
        }).then(res => {
            console.log(res)
        })
        scheddule.add(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(4)
                }, 1000);
            })
        }).then(res => {
            console.log(res)
        })
        scheddule.add(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(5)
                }, 1000);
            })
        }).then(res => {
            console.log(res)
        })
~~~

## 4.使用void 0代替 undefined

`undefined`是`window`的一个只读属性，如果在块级作用域中我们声明了一个变量undefined并访问，这时候我们给某变量赋值为`undefined`就会是`undefined`变量的值.

避免大型项目中出现问题使用`void 0`代替

~~~js
function test(){
    const undefined = 1
    const a = undefined // 1
}
~~~

## 5.如何检查是否发生内存泄漏

使用Chrome开发者工具的Memory面板进行检查。在Chrome浏览器中，可以打开开发者工具，切换到Performance面板，启动Memory功能，并进行一段时间的操作，然后停止Stop，查看JS Heap蓝色的线条走向，如果一直升高说明可能存在内存泄漏的问题。

![](/javaScript/memory.png)



## 6.为什么typeof null是对象

在[判断数据类型](https://so.csdn.net/so/search?q=判断数据类型&spm=1001.2101.3001.7020)时，是根据机器码低位标识来判断的，而`null`的机器码标识为全`0`，而对象的机器码低位标识为`000`。所以`typeof null`的结果被误判为`Object`

| 数据类型 | 机器码标识对象 |
| -------- | -------------- |
| (Object) | 000            |
| 整数     | 1              |
| 浮点数   | 010            |
| 字符串   | 100            |
| 布尔     | 110            |
| `null`   | 全为0          |



## 7.类class

~~~js
class A {
    constructor() {}
    toString() {}
    toValue() {}
    test = ()=>{}
}
// 等同于
function A () {
    // constructor
};
const a = new A()
A.prototype.toString = function() {};
A.prototype.toValue = function() {};
a.test = ()=>{}
~~~



## 8.深拷贝



~~~js
        const obj = {
            name:'深拷贝',
            job:[1,2,3],
            info:{address:'China'},
            test:()=>true,
            a:new Set()
        }
        function deepClone(obj){
            const type = (o)=>Object.prototype.toString.call(o).slice(8,-1)
            const baseType = ['String', 'Number','Boolean','Null','Undefined','BigInt']
            function _deepClone(_target){
                if( baseType.includes(type(_target))){
                    return _target
                }
                let res = null
                if(type(_target) === 'Array'){
                    res = []
                    for(key in _target){
                        if(Object.prototype.hasOwnProperty.call(_target,key)){
                            res[key] = _deepClone(_target[key])
                        }
                    }
                }
                if(type(_target) === 'Object'){
                    res = {}
                    for(key in _target){
                        if(Object.prototype.hasOwnProperty.call(_target,key)){
                            res[key] = _deepClone(_target[key])
                        }
                    }
                }
                if(type(_target)==='Function'){
                    res = function(){ 
                        return _target.call(this)
                    }
                }
                // ....... 这里建议用策略模式 毕竟还有Map Set Reg Date。。。
                return res
            }
            return _deepClone(obj) 
        }
        const newObj = deepClone(obj)
        for(let key in obj){
            console.log(key,obj[key] === newObj[key],newObj)
        }
~~~









## 10.手写Promise.all和翻转二叉树

~~~js


/**
 * 实现翻转二叉树
 * 例如
 *  a
 * / \
 * b c
 * 转为
 *  a
 * / |
 * c b
 */
const invertTree = function (root) {
    if (!root) {
        return
    }
    [root.left, root.right] = [root?.right, root?.left]
    invertTree(root.left)
    invertTree(root.right)
    return root
}
const input = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 3,
                left: null,
                right: null,
            },
            right: {
                val: 4,
                left: null,
                right: null,
            },
        },
        right: {
            val: 5,
            left: {
                val: 6,
                left: null,
                right: null,
            },
            right: {
                val: 7,
                left: null,
                right: null,
            },
        }
}
~~~



~~~js
// promise.all
Promise._all = function (promises) {
    return new Promise((r, j) => {
        const result = []
        promises.forEach((pro, index) => {
            Promise.resolve(pro).then(res => {
                result[index] = res
                if ( index === promises.length-1) {
                    r(result)
                }
            }).catch(err => {
                j(err)
            })
        })
    })
}



~~~



## 有限状态机

有限状态机（Finite State Machine，FSM）是一种抽象的计算模型，用于描述具有有限个状态和在这些状态之间进行转换的系统。它是一种数学模型，可用于建模和分析各种计算机程序、协议、自动控制系统等。

有限状态机由以下几个要素组成：

1. 状态（States）：系统可以处于的不同状态。每个状态表示系统在某个特定时间点的特定条件和属性。
2. 转换（Transitions）：状态之间的转换规则。当满足某些条件时，系统可以从一个状态转移到另一个状态。
3. 事件（Events）：触发状态转换的外部或内部事件。事件可以是用户输入、传感器信号、计时器触发等。
4. 动作（Actions）：与状态转换相关联的操作或行为。在状态转换发生时，可以执行特定的动作。

## 防抖和节流

~~~js
        // 防抖
        function debounce(fn, delay = 500) {
            let timer = null
            return function () {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => fn.call(this, ...arguments), delay)
            }
        }
btn.addEventListener('click', debounce((a) => console.log('防抖', a)))
        // 节流
        function throttle(fn, delay = 500) {
            let timer = null
            return function () {
                if (!timer) {
                    fn.call(this, ...arguments)
                    timer = setTimeout(() => {
                        clearTimeout(timer)
                        timer = null
                    }, delay)
                }
            }
        }
document.addEventListener('scroll', throttle(() => console.log('节流'),1000))
~~~



## 如何给onclick添加多个点击事件？

思路：

1. 用集合维护事件列表
2. 在定义onclick之前保存一下之前，判断有没有旧事件，如果有就保存旧事件。这里我使用立即执行函数给集合中加入之前绑定的事件。
3. 在最新的事件中去遍历触发。
4. `traveser`做保护，防止栈溢出。

~~~js
        const test = document.querySelector('.test')
        const events = new Set()
        test.onclick = function(){
            console.log('old')
        }
        test.onclick = function collector(fn) {
            const oldEvent = test.onclick;
            oldEvent  && events.add(oldEvent)
            return function (traverse) {
                traverse && events.forEach(event=>{
                    event.call(this,'testtt')
                })
                fn.call(this);
            };
        }(()=>console.log('new1'))
        test.onclick = function collector(fn) {
            const oldEvent = test.onclick;
            oldEvent  && events.add(oldEvent)
            return function (traverse) {
                traverse && events.forEach(event=>{
                    event.call(this)
                })
                fn.call(this);
            };
        }(()=>console.log('new2'))
        test.onclick = function collector(fn) {
            const oldEvent = test.onclick;
            oldEvent  && events.add(oldEvent)
            return function (traverse) {
                events.forEach(event=>{
                    event.call(this)
                })
                fn.call(this);
            };
        }(()=>console.log('new3'))
~~~







<CommentService/>