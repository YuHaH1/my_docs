---
lang: zh-CN
title: JS必会APIs
description: 关键功能
collapsible: true
---
# JS必会APIs

## 1.IntersectionObserver视口交叉状态检测

`IntersectionObserver`提供了一种异步观察目标元素与其祖先元素或顶级文档[视口](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport)（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。

当一个 `IntersectionObserver` 对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦 `IntersectionObserver` 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。

1. 实例身上的属性

   1. root：测试交叉时，用作边界盒的[元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)或[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)。如果构造函数未传入 `root` 或其值为`null`，则默认使用顶级文档的视口。
   2. rootMargin：计算交叉时添加到根[边界盒 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box)的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用**像素**（`px`）或**百分比**（`%`）来表达，默认值为 “0px 0px 0px 0px”。
   3. thresholds：一个包含阈值的列表，按升序排列，列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知（Notification）。如果构造器未传入值，则默认值为 0。

2. 实例方法

   1. [`IntersectionObserver.disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/disconnect)使 `IntersectionObserver` 对象停止监听目标。

   2. [`IntersectionObserver.observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/observe)使 `IntersectionObserver` 开始监听一个目标元素。

   3. [`IntersectionObserver.takeRecords()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/takeRecords)返回所有观察目标的 [`IntersectionObserverEntry`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry) 对象数组。

   4. [`IntersectionObserver.unobserve()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/unobserve)使 `IntersectionObserver` 停止监听特定目标元素。

      

      

~~~js
export const Intersection = (name) => {
    const img = document.querySelectorAll(name)
    let index = 0
    const options = {
        threshold: [0],//threshold：属性决定相交比例为多少时，触发回调函数。取值为 0 ~ 1，或者 0 ~ 1的数组。
        rootMargin: "0px",//rootMargin： 类似于 CSS 的 margin 属性。用来缩小或扩大 rootBounds，从而影响相交的触发 
        root: null,//root：设置监视器的根节点，不传则默认为视口。
    }
    /*
        entries的属性
        time：发生相交到相应的时间，毫秒。
        rootBounds：根元素矩形区域的信息，如果没有设置根元素则返回null，图中蓝色部分区域。
        boundingClientRect：目标元素的矩形区域的信息，图中黑色边框的区域。
        intersectionRect：目标元素与视口（或根元素）的交叉区域的信息，图中蓝色方块和粉红色方块相交的区域。
        isIntersecting：目标元素与根元素是否相交
        intersectionRatio：目标元素与视口（或根元素）的相交比例。
        target：目标元素。
    */
    const iso = new IntersectionObserver(entries => {
        const timer = null
        entries.forEach(v => {
            if (v.isIntersecting) {
                index++
                v.target.setAttribute('src', `./image/image${index}.jpg`)
                iso.unobserve(v.target)
            }
        })
    }, options)

    // 开启观察
    img.forEach(element => {
        iso.observe(element)
    });
}
~~~







## 2.剪贴板Clipboard

该 API 被设计用来取代使用 [`document.execCommand()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand) 的剪贴板访问方式。

1.`document.execCommand()`实现

~~~js

// 复制文本
function copyText(text) {
  // 创建一个临时的文本输入框
  const input = document.createElement('input');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  // 执行复制命令
  document.execCommand('copy');
  // 删除临时文本输入框
  document.body.removeChild(input);
}

// 粘贴文本
function pasteText() {
  // 创建一个临时的文本输入框
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.focus();
  // 执行粘贴命令
  document.execCommand('paste');
  const text = input.value;
  // 删除临时文本输入框
  document.body.removeChild(input);
  return text;
}
~~~

2.clipboard实现

::: warning

使用前必须focus聚焦在文档内，否则报错Uncaught (in promise) DOMException: Document is not focused。控制台触发就不行

:::

~~~js
复制
navigator.clipboard.writeText(text);
粘贴
const clipboardData = await navigator.clipboard.readText();
~~~



## 3.requestAnimationFrame

**`window.requestAnimationFrame()`** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，**该回调函数会在浏览器下一次重绘之前执行。**

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

该方法会返回一个id可以用于[`window.cancelAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)取消

~~~ts
const id = requestAnimationFrame((DOMHighResTimeStamp:number) => id:number{
            // 它表示 requestAnimationFrame() 开始执行回调函数的时刻。
            console.log(DOMHighResTimeStamp);
})
~~~

该API的优点：

* CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。
* 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。





## 4.requestIdleCallback

一帧的生命周期

![](/javaScript/frame.png)

假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调

方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间`timeout`，则有可能为了在超时前执行函数而打乱执行顺序。

::: warning

如果该回调任务必须执行，需要设置timeout防止超时，因此该函数一般用于执行低优先级的任务

:::

该函数返回一个 ID，可以把它传入 [`Window.cancelIdleCallback()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback) 方法来结束回调。

~~~ts
const id = requestIdleCallback((IdleDeadline:{didTimeout:boolean,timeRemaining:()=>number}) => {
            console.log(IdleDeadline)
        }, {
            timeout: 2000
        })
~~~

回调接收一个IdleDeadline参数对象，该对象的timeRemaining表示剩余多少闲置时间，如果 idle period 已经结束，则它的值是 0。你的回调函数 (传给 requestIdleCallback 的函数) 可以重复的访问这个属性用来判断当前线程的闲置时间是否可以在结束前执行更多的任务。

## 5.Web Workers

Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。此外，他们可以使用[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)执行 I/O (尽管`responseXML`和`channel`属性总是为空)。一旦创建，一个 worker 可以将消息发送到创建它的 JavaScript 代码，通过将消息发布到该代码指定的事件处理程序（反之亦然）。本文提供了有关使用 Web Worker 的详细介绍。

### 规则：

1. 一个 worker 是使用一个构造函数创建的一个对象 (e.g. [`Worker('xxx.js')`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker)) 运行一个命名的 JavaScript 文件 - 这个文件包含将在工作线程中运行的代码; workers 运行在另一个全局上下文中，不同于当前的[`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window). 因此，在 [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 内通过 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)获取全局作用域  将返回错误。<u>想要访问全局上下文用</u>`self`关键字

2. worker内无法直接操纵DOM

3. workers和主线程数据使用postMessage方法发送消息

4. 终止规则两种方法 1.`worker实例.terminate()` 2.workers调用自己的`close()`关闭

5. 监听消息`onmessage`

6. <u>在主页面与 worker 之间传递的数据是通过**拷贝**，而不是共享来完成的。传递给 `worker` 的对象需要经过序列化，接下来在另一端还需要反序列化。页面与 `worker` **不会共享同一个实例**，最终的结果就是在每次通信结束时生成了数据的**一个副本**。</u>

7. 错误处理当 worker 出现运行中错误时，它的 `onerror` 事件处理函数会被调用。它会收到一个扩展了 `ErrorEvent` 接口的名为 `error`的事件。我们可以通过以下错误信息找到错误原因：

   1. `message`可读性良好的错误消息。

   2. `filename`发生错误的脚本文件名。

   3. `lineno`发生错误时所在脚本文件的行号。

      

      

#### 使用场景

1. 。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。
2. 加密数据 有些加解密的算法比较复杂，或者在加解密很多数据的时候，这会非常耗费计算资源，导致UI线程无响应，因此这是使用Web Worker的好时机，使用Worker线程可以让用户更加无缝的操作UI。 预取数据
3. 有时候为了提升数据加载速度，可以提前使用Worker线程获取数据，因为Worker线程是可以是用 XMLHttpRequest 的。 预渲染在某些渲染场景下，比如渲染复杂的canvas的时候需要计算的效果比如反射、折射、光影、材料等，这些计算的逻辑可以使用Worker线程来执行，也可以使用多个Worker线程。
4.  复杂数据处理场景某些检索、排序、过滤、分析会非常耗费时间，这时可以使用Web Worker来进行，不占用主线程。
5.  预加载图片有时候一个页面有很多图片，或者有几个很大的图片的时候，如果业务限制不考虑懒加载，也可以使用Web Worker来加载图片。

::: warning:

虽然使用worker线程不会占用主线程，但是启动worker会比较耗费资源。此外 主线程中使用XMLHttpRequest在请求过程中浏览器另开了一个异步http请求线程，但是交互过程中还是要消耗主线程资源

:::



#### 代码展示

**主进程代码示例**

~~~js
const worker = new Worker("worker.js")

worker.onmessage = function (event) {

  console.log('主进程监听消息', event)

}

worker.postMessage(`这是一条主进程给worker的消息${document}`)
~~~



**workers代码示例**

~~~js
\* Worker 内部如果要加载其他脚本，

\* 有一个专门的方法importScripts()。 importScripts('script1.js');

\* 该方法可以同时加载多个脚本importScripts('script1.js', 'script2.js');

*/
importScripts('./other_script.js')
const worker_data = {
    a: 123
}
onmessage = function (ev) {
    console.log('worker监听消息', ev)
}
postMessage(`${JSON.stringify(worker_data)}`)
~~~

#### 共享worker

一个共享 worker 可以被多个脚本使用——即使这些脚本正在被不同的 window、iframe 或者 worker 访问。

::: danger

1.  如果共享 worker 可以被多个浏览上下文调用，所有这些浏览上下文必须属于同源（相同的协议，主机和端口号）。

:::

生成一个新的共享 worker 与生成一个专用 worker 非常相似，只是构造器的名字不同index.html 和 index2.html——生成共享 worker 的代码如下：

```
const shareWorker = new SharedWorker('worker.js');
```

<u></u>

##### 规则

1. 一个非常大的区别在于，与一个共享 worker 通信必须通过端口对象——》一个确切的打开的端口供脚本与 worker 通信（在专用 worker 中这一部分是隐式进行的）。
2. 在传递消息之前，端口连接必须被显式的打开，打开方式是使用 onmessage 事件处理函数或者 start() 方法。start() 方法的调用只在一种情况下需要，那就是消息事件addEventListener() 方法被使用。
3. worker进程中使用 `onconnect` 事件处理函数来执行代码。

##### 代码展示

~~~js
index.html - 1
    <script>
        /*
        * Worker 内部如果要加载其他脚本，
        * 有一个专门的方法importScripts()。 importScripts('script1.js');
        * 该方法可以同时加载多个脚本importScripts('script1.js', 'script2.js');
        */

        const worker = new SharedWorker("worker.js")
        worker.port.onmessage = function (event) {
            console.log('主进程1监听消息', event)
        }

        worker.port.postMessage(`这是一条主进程1给worker的消息`)

    </script>

~~~

~~~js
index.html - 2

    <script>
        /*
        * Worker 内部如果要加载其他脚本，
        * 有一个专门的方法importScripts()。 importScripts('script1.js');
        * 该方法可以同时加载多个脚本importScripts('script1.js', 'script2.js');
        */

        const worker = new SharedWorker("worker.js")
        worker.port.onmessage = function (event) {
            console.log('主进程2监听消息', event)
        }

        worker.port.postMessage(`这是一条主进程2给worker的消息`)

    </script>

~~~

~~~js
worker

onconnect = function (e) {
    //使用事件的 ports 属性来获取端口并存储在变量中。
    var port = e.ports[0];

    port.onmessage = function (e) {
        console.log(e);
        var workerResult = 'Result: ' + e.data;
        port.postMessage(workerResult);
    }
}
~~~





## 6.PWA-渐进式 Web 应用

**优点：**PWA 是可被发现、易安装、可链接、独立于网络、渐进式、可重用、响应性和安全的。关于这些含义的细节

**PWA能实现哪些功能？**1.添加主屏幕 2.推送消息通知 3.离线使用应用 4.可共享URL分享给他人

### PWA的架构

渲染网站主要有两种方法 - 在服务器上或在客户端上。它们都有其优点和缺点，你可以适当地混合使用这两种方法

* 服务器端渲染（SSR）的意思是在服务器上渲染网页，因此首次加载会更快，但是在不同页面之间导航都需要下载新的 HTML 内容。它的跨浏览器兼容性良好，但代价是页间加载时间延长，也就是总体感知上的性能降低：每加载一个页面，都需要一个服务器请求往返的时间。
* 客户端渲染（CSR）允许在导航到不同页面时几乎立即在浏览器中更新网站，但在开始时需要更多的初始下载和客户端上的额外渲染。首次访问时网站速度较慢，但后续访问速度要快得多。

最流行的是“App Shell”概念，它完全按照上述方式混用 SSR 和 CSR；此外还遵循“离线优先”方法，这个我们将在后续文章中详细解释，也会在示例应用程序中使用。我们还会简要提及另一种涉及[Streams API](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)的新方法



### 添加主屏幕

**规则：**

1. 应用通过 HTTPS 提供服务——Web 正朝着更加安全的方向发展，包括 A2HS 在内的许多现代 Web 技术都将仅工作在安全的环境中。
2. 从 HTML 头链接具有正确字段的 manifest 文件。
3. 有合适的图标可显示在主屏幕上。(ui需要定制尺寸)
4. Chrome 浏览器还要求该应用程序注册一个 Service Worker（这样在离线状态下就也可以运行）。

::: tip

#### manifest文件配置

**manifest**:Web manifest 以标准 JSON 格式编写，应放置在应用程序目录中的某个位置（最好是在根目录中）

html中需要引入该文件:tada: 

~~~html
<link rel="manifest" href="manifest.webmanifest">
~~~



:::

* `background_color`：指定在某些应用程序上下文中使用的背景色。与 A2HS 最相关的一个是在点击主屏幕上的应用程序图标并首次开始加载时显示的初始屏幕（目前仅在通过 Chrome 将应用添加到主屏幕时显示）。
* `display`：指定应如何显示应用。为了使它看起来像一个应用程序而非网页，这里应该填写像是 `fullscreen` （根本不显示任何 UI）或 `standalone`（与前者非常相似，但是状态栏这样的系统级 UI 元素可能是可见的）的值。
* `icons`：指定在不同位置（例如，在任务切换器上或更重要的是在主屏幕上）表示应用程序时浏览器使用的图标。我们的演示中仅包含一个。(<u>请注意，每个图标对象中的 `type` 成员都指定了该图标的 MIME 类型，因此浏览器可以快速读取该图标的类型，并在不支持此类型时将其忽略并采用其他图标。</u>)
* `name`/`short_name`：这些字段提供了在不同位置表示应用程序时要显示的应用程序名称。`name` 提供完整的应用名称。`short_name` 则是当没有足够的空间显示全名时，提供的缩写名称。如果您的应用程序名称特别长，建议您同时提供两者。
* `start_url`：提供启动添加到主屏幕应用程序时应加载的资源的路径。请注意，这必须是一个相对 manifest 指向网站主页的相对路径。另请注意，Chrome 需要这条字段才能显示安装标语，而 Firefox 即使没有这条字段也会显示用于添加到主屏的含加号的主页图标。

```json
{
    "name": "js13kGames Progressive Web App",
    "short_name": "js13kPWA",
    "description": "Progressive Web App that lists games submitted to the A-Frame category in the js13kGames 2017 competition.",
    "icons": [
        {
            "src": "icons/icon-32.png",
            "sizes": "32x32",
            "type": "image/png"
        },
        {
            "src": "icons/icon-64.png",
            "sizes": "64x64",
            "type": "image/png"
        },
        {
            "src": "icons/icon-96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "icons/icon-128.png",
            "sizes": "128x128",
            "type": "image/png"
        },
        {
            "src": "icons/icon-168.png",
            "sizes": "168x168",
            "type": "image/png"
        },
        {
            "src": "icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/icon-256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "start_url": "./index.html",
    "display": "fullscreen",
    "theme_color": "#B12A34",
    "background_color": "#B12A34"
}

```

为了使应用离线运行，你必须使用 [Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 来离线存储资源，如果需要，还可以使用 [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 或 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 来存储其数据。



#### JS触发时间添加到主屏幕



~~~js
    <button id="btn">添加主屏幕</button>
    <script>
        const btn = document.getElementById('btn')
        window.addEventListener('beforeinstallprompt', (e) => {
            // 防止 Chrome 67 及更早版本自动显示安装提示
            e.preventDefault();
            // 稍后再触发此事件 将事件对象存储在 deferredPrompt 变量中，以便以后可以用于执行实际安装。之后使用 beforeinstallprompt 事件对象（存储在 deferredPrompt 中）上可用的 prompt() 方法触发显示安装提示。
            deferredPrompt = e;
            // 更新 UI 以提醒用户可以将 App 安装到桌面
            btn.style.display = 'block';

            btn.addEventListener('click', (e) => {
                // 隐藏显示 A2HS 按钮的界面
                btn.style.display = 'none';
                // 显示安装提示
                deferredPrompt.prompt();
                // 等待用户反馈
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                     //将 deferredPrompt 设置为 null，因为不再需要它。
                    deferredPrompt = null;
                });
            });
        });

~~~



## 7.PWA离线工作-Service Worker

Service Worker 是浏览器和网络之间的虚拟代理。它们终于解决了前端开发人员多年来一直在努力解决的一些问题，其中最值得关注的是，<u>解决了如何正确缓存网站资源并使其在离线时可用的问题。</u>

Service workers 非常强大，<u>因为他们可以控制网络请求、修改网络请求、返回缓存的自定义响应，或者合成响应。</u>





### Service Worker生命周期

https://github.com/mdn/pwa-examples/tree/main/js13kpwa缓存展示

1. 注册:主进程中注册，注册完成后，sw.js 文件会自动下载、安装，然后激活。

   1. ~~~js
      if('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
      };
      ~~~

2. 安装:在 `install` 的监听函数中，我们可以初始化缓存并添加离线应用时所需的文件

   1. ~~~js
      self.addEventListener('install', function(e) {
        console.log('[Service Worker] Install');
          //ExtendableEvent.waitUntil() 方法告诉事件分发器该事件仍在进行。这个方法也可以用于检测进行的任务是否成功。在服务工作线程中，这个方法告诉浏览器事件一直进行，直至 promise 解决，浏览器不应该在事件中的异步操作完成之前终止服务工作线程。这里就是在缓存操作完成后才能终止服务工作线程在此之前将服务工作线程保持在 installing阶段
        e.waitUntil(
            -》缓存操作
          caches.open(cacheName).then(function(cache) {
                console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
          })
        );
      });
      
      ~~~

   2. 缓存操作-》首先，创建一个存储缓存名字的变量，App Shell 所需的文件记录

      ~~~js
      var cacheName = '缓存名字xxx';
      var appShellFiles = [//需要缓存的文件
        '/pwa-examples/js13kpwa/',
        '/pwa-examples/js13kpwa/index.html',
        '/pwa-examples/js13kpwa/app.js',
        '/pwa-examples/js13kpwa/style.css',
        '/pwa-examples/js13kpwa/fonts/graduate.eot',
        '/pwa-examples/js13kpwa/fonts/graduate.ttf',
        '/pwa-examples/js13kpwa/fonts/graduate.woff',
        '/pwa-examples/js13kpwa/favicon.ico',
        '/pwa-examples/js13kpwa/img/js13kgames.png',
        '/pwa-examples/js13kpwa/img/bg.png',
        '/pwa-examples/js13kpwa/icons/icon-32.png',
        '/pwa-examples/js13kpwa/icons/icon-64.png',
        '/pwa-examples/js13kpwa/icons/icon-96.png',
        '/pwa-examples/js13kpwa/icons/icon-128.png',
        '/pwa-examples/js13kpwa/icons/icon-168.png',
        '/pwa-examples/js13kpwa/icons/icon-192.png',
        '/pwa-examples/js13kpwa/icons/icon-256.png',
        '/pwa-examples/js13kpwa/icons/icon-512.png'
      ];
      
      ~~~

      

3. 激活：`activate` 事件，它的用法跟 `install` 事件相同。这个事件通常用来删除那些我们已经不需要的文件或者做一些清理工作。

   1. 清理不需要的缓存

      ~~~js
      self.addEventListener('activate', function(e) {
        e.waitUntil(
          caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
              if(cacheName.indexOf(key) === -1) {
                return caches.delete(key);
              }
            }));
          })
        );
      });
      
      ~~~

      

4. 响应请求：`fetch` 事件对我们很有用，它在每次应用发起 HTTP 请求的时候被触发。这个事件对我们来说非常有用，它允许我们拦截请求并对请求作出自定义的响应。

   1. ~~~js
      self.addEventListener('fetch', function(e) {
          console.log('service worker 请求的url-》'+e.request.url);
      });
      
      ~~~

   2. 实际使用——》当缓存存在时，我们使用缓存来提供服务，而不重新请求数据。不管当前应用是在线还是离线，我们都这么做。当请求的文件不在缓存中时，我们会在响应之前将数据添加到缓存中。

      ~~~js
      self.addEventListener('fetch', function(e) {
          //e.respondWith 方法将会接管响应控制，它会作为服务器和应用之间的代理服务。它允许我们对每一个请求作出我们想要的任何响应：Service Worker 会处理这一切，从缓存中获取这些数据，并在需要的情况下对它们进行修改。
        e.respondWith(
            //检查给定的 Request 是否是 CacheStorage 对象跟踪的任何 Cache 对象的键，并返回一个 resolve 为该匹配的 Promise .
          caches.match(e.request).then(function(r) {
                console.log('[Service Worker] Fetching resource: '+e.request.url);
              //如果缓存中没有就发请求然后缓存
            return r || fetch(e.request).then(function(response) {
                      return caches.open(cacheName).then(function(cache) {
                cache.put(e.request, response.clone());
                return response;
              });
            });
          })
        );
      });
      
      ~~~

      





#### caches对象

<u>在 Service Worker 中使用 [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 将不会有效果，所以使用 Cache API 作为替代。</u>

全局的 **`caches`** 只读属性返回与当前上下文紧密相关的 [`CacheStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage) 对象。此对象激活了诸如存储用于离线使用的资源，并生成对请求的自定义响应等功能。

[`CacheStorage.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/open)

返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，resolve 为匹配 `cacheName` （如果不存在则创建一个新的 cache）的 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象

[`CacheStorage.delete()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/delete)

查找匹配 `cacheName` 的 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象，如果找到，则删除 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象并返回一个 resolve 为 true 的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 。如果没有找到 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象，则返回 `false`.

[`CacheStorage.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/keys)

返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，它将使用一个包含与 [`CacheStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage) 追踪的所有命名 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象对应字符串的数组来 resolve. 使用该方法迭代所有 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象的列表。

[`CacheStorage.match()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/match)

检查给定的 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 是否是 [`CacheStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage) 对象跟踪的任何 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象的键，并返回一个 resolve 为该匹配的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) .

[`CacheStorage.has()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/has)

如果存在与 `cacheName` 匹配的 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象，则返回一个 resolve 为 true 的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) .



#### 更新service worker

我们存放在缓存名称中的版本号是这个问题的关键

~~~js
var cacheName = 'js13kPWA-v1';

~~~

当我们把版本号更新到 v2，Service Worker 会将我们所有的文件（包括那些新的文件）添加到一个新的缓存中。

~~~js
contentToCache.push('/pwa-examples/js13kpwa/icons/icon-32.png');

// ...

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('js13kPWA-v2').then(function(cache) {
      return cache.addAll(contentToCache);
    })
  );
});

~~~



这个时候一个新的 Service Worker 会在后台被安装，而旧的 Service Worker 仍然会正常运行，直到没有任何页面使用到它为止，这时候新的 Service Worker 将会被激活，然后接管所有的页面。



## 8.PWA-消息推送和通知

https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API推送API

https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API通知API



### 1.请求授权

最好通过一些引导用户的事件去触发

~~~js
Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
 });
~~~

用户的授权的结果有三种，default（默认）、granted（允许）或者 denied（拒绝），当用户没有做出选择的时候，授权结果会返回 default，      另外两种结果分别在用户选择了允许或者拒绝的时候返回。一旦用户选择授权，这个授权结果对通知 API 和推送 API 两者都有效。





### 2.创建通知

在授权之后可以创建通知消息

~~~js
 function noti() {
            Notification.requestPermission().then(function (result) {
                if (result === 'granted') {
                    randomNotification();
                }
                if (result === 'denied') {
                    noti()
                }
                console.log(result);
            });
        }
        noti()
        function randomNotification() {
            var notifTitle = '这是通知标题';
            var notifBody = '通知内容';
            var notifImg = './bgc.png';
            var options = {
                body: notifBody,
                icon: notifImg
            }
            var notif = new Notification(notifTitle, options);
            setTimeout(randomNotification, 30000);
        }


~~~

![image-20230508185124595](/javaScript/notification.png)

### 3.消息推送

在 Service Worker 内部，存在一个消息推送服务订阅机制。

```js
registration.pushManager.getSubscription() .then( /* ... */ );
```

为了能够接收到推送的消息，我们需要在 Service Worker 文件里面监听 [`push` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/push_event) 事件：这些数据被接收后，将会以通知的方式立刻展现给用户，例如提醒用户一些待办事项，或者让用户知道 App 有了新内容。

```
self.addEventListener('push', function(e) { /* ... */ });
```



demo:

~~~js
// Register a Service Worker.
navigator.serviceWorker.register('service-worker.js');

navigator.serviceWorker.ready
.then(function(registration) {
  // 用PushManager获取用户对服务端推送服务的订阅 
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
//如果用户已经完成订阅，我们直接返回 subscription 对象并且跳转到订阅部分。如果没有，我们会初始化一个新的 subscription 对象：
    if (subscription) {
      return subscription;
    }

//App 会从服务器请求一个公钥并且把响应结果转化成文本，最后它还需要转化成一个 Uint8Array（为了兼容 Chrome）。
    const response = await fetch('./vapidPublicKey');
    const vapidPublicKey = await response.text();
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

//App 现在可以使用 PushManager 来订阅新用户。这个方法支持传递两个参数：第一个是 userVisibleOnly: true，意思是发送给用户的所有通知对他们都是可见的，第二个是 applicationServerKey，这个参数包含我们之前从服务端取得并转化的 VAPID key。
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}).then(function(subscription) {
// 首先使用 fetch 将 subscription 以 JSON 的方式发送给服务器。
  fetch('./register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscription
    }),
  });

  document.getElementById('doIt').onclick = function() {
    const payload = document.getElementById('notification-payload').value;
    const delay = document.getElementById('notification-delay').value;
    const ttl = document.getElementById('notification-ttl').value;

//当按钮被点击的时候，fetch 会请求服务器根据给定的参数发送通知，payload 参数包含通知里面要显示的文本，delay 参数定义了通知将会延迟展示的秒数，ttl 是 time-to-live 的缩写，用来设置通知在服务器上的存活时间，依然是以秒为单位。
    fetch('./sendNotification', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription,
        payload: payload,
        delay: delay,
        ttl: ttl,
      }),
    });
  };

});

~~~

服务端

~~~js
// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const webPush = require("web-push");
//web-push 模块被用来配置 VAPID 密钥，如果没有的话，还可以生成一个。
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
      "environment variables. You can use the following ones:"
  );
  console.log(webPush.generateVAPIDKeys());
  return;
}
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://example.com/",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);
// 一个模块定义并导出了所有应用需要处理的路由：获取 VAPID 公钥、注册、发送通知等等。你可以看到来自 index.js 的 payload, delay 和ttl 变量在这里被用到了。
module.exports = function (app, route) {
  app.get(route + "vapidPublicKey", function (req, res) {
    res.send(process.env.VAPID_PUBLIC_KEY);
  });

  app.post(route + "register", function (req, res) {
    // A real world application would store the subscription info.
    res.sendStatus(201);
  });

  app.post(route + "sendNotification", function (req, res) {
    const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
      TTL: req.body.ttl,
    };

    setTimeout(function () {
      webPush
        .sendNotification(subscription, payload, options)
        .then(function () {
          res.sendStatus(201);
        })
        .catch(function (error) {
          console.log(error);
          res.sendStatus(500);
        });
    }, req.body.delay * 1000);
  });
};
~~~

service——worker

~~~js
//它做的就只是监听 push (en-US) 事件，创建 payload 变量，这个变量包含了来自 event.data 的文本（如果 data 是空的，就设置成 "no payload" 字符串），然后一直等到通知推送给用户为止。
self.addEventListener('push', function(event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // 支持ArrayBuffer, Blob, JSON 这些数据
  const payload = event.data ? event.data.text() : 'no data';
  // 保持推送状态直到接收到服务端的推送
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: payload,
    })
  );
});
~~~



## 9.MutationOberver

[`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。

语法：

1. 该构造函数接收一个回调函数

   1. ~~~js
      const mo = new MutationObserver(callback)
      ~~~

2. 回调函数接收两个参数：一个是描述所有被触发改动的 [`MutationRecord`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord) 对象数组，另一个是调用该函数的 `MutationObserver` 对象。

3. 该实例身上有三个方法

   1. [`disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/disconnect)阻止 `MutationObserver` 实例继续接收的通知，直到再次调用其 [`observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe) 方法，该观察者对象包含的回调函数都不会再被调用。
   2. [`observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)配置 `MutationObserver` 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。
   3. [`takeRecords()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/takeRecords)从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 [`MutationRecord`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord) 对象的新 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 中。

4. observe必须要指定配置观察什么变动，每当观察带的配置变动就会触发回调的执行

   1. ```ts
      // 观察器的配置（需要观察什么变动）
      interface IObserverConfig {
          subtree: boolean  //监听以target为根节点的整个子树及其子树的属性，
          childList: boolean //监听target节点发生的节点新增或删除（如果subtree为true整个子树都生效）
          attributes: boolean //监听节点属性值的变化  默认为true 但一旦声明characterDataOldValue|attributeFilter默认值就变为false
          attributeFilter: string[] | undefined // 声明一个属性名数组用于监听。不过不声明默认任何属性变化都触发回调
          attributeOldValue: boolean // 记录上一次被监听节点的属性变化
          characterData: boolean // 监听target节点上的所有字符变化 默认值true  如果声明了characterDataOldValue默认值false
          characterDataOldValue: boolean // 记录上一个被监听节点中发生的文本变化 默认false
      }
      MutationObserver {}
      [[Prototype]]
      
      MutationObserver
      disconnect
      
      ƒ disconnect()
      observe
      
      ƒ observe()
      takeRecords
      
      ƒ takeRecords()
      ```

5. 代码展示

   1. ~~~js
      <body>
          <ul id="ul">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
          </ul>
          <button id="btn">aaa</button>
          <script>
      
              const btn = document.getElementById('btn')
              const ul = document.getElementById('ul')
              const children = []
              const callback = (MutationRecord, MutationObserver) => {
                  MutationRecord.forEach((mutation) => {
                      console.log(mutation, MutationObserver);
                  })
              }
              const mo = new MutationObserver(callback)
              const observeConfig = {
                  subtree: true,
                  childList: true,
              }
              mo.observe(ul, observeConfig)
              btn.onclick = function (e) {
                  if (!children.length) {
                      for (const iterator of ul.children) {
                          children.push(iterator.cloneNode())
                          break
                      }
                  }
                  ul.children.length ? ul.removeChild(...ul.children) : ul.appendChild(...children)
                  Promise.resolve().then(res => mo.disconnect())
              }
          </script>
      </body>
      ~~~







## 10.存储相关IndexedDB

indexedDB有什么用？解决了什么问题？**虽然 [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 在存储较少量的数据很有用，但对于存储更大量的结构化数据来说力不从心。IndexedDB 的主要设计目标之一就是允许大量数据可以被存储以供离线使用。可以在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。**

什么是IndexedDB？**IndexedDB 是一个基于 JavaScript 的面向对象数据库。**

有什么特点？**接口是异步的且支持事务（要么全部成功 要么全部失败）**

使用IndexedDB我们需要了解一些前置知识：

::: tip

1.存储限制

:::

浏览器的最大存储空间是动态的——它取决于您的硬盘大小。 

**全局限制**为可用磁盘空间的 50％。在 Firefox 中，一个名为 Quota Manager 的内部浏览器工具会跟踪每个源用尽的磁盘空间，并在必要时删除数据。

因此，如果您的硬盘驱动器是 500GB，那么浏览器的总存储容量为 250GB。如果超过此范围，则会发起称为**源回收**的过程，删除整个源的数据，直到存储量再次低于限制。删除源数据没有只删一部分的说法——因为这样可能会导致不一致的问题。

还有另一个限制称为**组限制**——这被定义为全局限制的 20％，但它至少有 10 MB，最大为 2GB。每个源都是一组（源组）的一部分。每个 eTLD+1 域都有一个组。例如：

* `mozilla.org`——组 1，源 1
* `www.mozilla.org`——组 1，源 2
* `joe.blogs.mozilla.org`——组 1，源 3
* `firefox.com` ——组 2，源 4

在这个组中，`mozilla.org`、`www.mozilla.org`和`joe.blogs.mozilla.org`可以聚合使用最多 20％的全局限制。firefox.com 单独最多使用 20％。

**解释以下组限制**：组限制实际上是对同一个域名下的多个源的存储空间进行限制，以避免其中一个源占用过多的存储空间影响其他源的正常使用。而源限制则是对每个单独的源的存储空间进行限制，以避免该源占用过多的存储空间影响自身的使用和其他源的使用。



### 如何使用

1. 兼容性判断

   ~~~js
   if (!window.indexedDB) {
       window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
   }
   ~~~

   

2. 打开数据库,并创建一个对象仓库。（当你创建一个新的数据库或者增加已存在的数据库的版本号， `onupgradeneeded` 事件会被触发，[IDBVersionChangeEvent ](https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent) 对象会作为参数传递给绑定在 `db `上的`onversionchange` 事件处理函数，你应该在此创建该版本需要的对象仓库）

   ~~~js
   //该 open 方法接受第二个参数，就是数据库的版本号。数据库的版本决定了数据库架构，即数据库的对象仓库（object store）和他的结构。如果数据库不存在，open 操作会创建该数据库，然后 onupgradeneeded 事件被触发，你需要在该事件的处理函数中创建数据库模式。如果数据库已经存在，但你指定了一个更高的数据库版本，会直接触发 onupgradeneeded 事件，允许你在处理函数中更新数据库模式。
   // 打开我们的数据库open 函数的结果是一个 IDBDatabase 对象的实例 。
   const request = window.indexedDB.open("MyTestDatabase");
   //open 请求不会立即打开数据库或者开始一个事务。对 open() 函数的调用会返回一个我们可以作为事件来处理的包含 result（成功的话）或者错误值的 IDBOpenDBRequest  对象。在 IndexedDB 中的大部分异步方法做的都是同样的事情 - 返回一个包含 result 或错误的 IDBRequest (en-US) 对象。
   
   
   // 该事件仅在较新的浏览器中实现了
   request.onupgradeneeded = function(event) {
     // 保存 IDBDataBase 接口
     const db = event.target.result;
   
     // 为该数据库创建一个对象仓库
     const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
   };
   ~~~

   尝试创建一个与已存在的对象仓库重名（或删除一个不存在的对象仓库）会抛出错误。如果 `onupgradeneeded`事件成功执行完成，打开数据库请求的 `onsuccess` 处理函数会被触发。

3. 添加成功和失败处理函数

   ~~~js
   db.onerror = function(event) {
     // Do something with request.errorCode!
   };
   request.onsuccess = function (event) {
               db = event.target.result;
               console.log(db)
   };
   ~~~

   

4. 启动一个事务，并发送一个请求来执行一些数据库操作，像增加或提取数据等。

   ~~~js
   let db = null
   const request = indexedDB.open(dbName, 2);
   request.onupgradeneeded = function (event) {
       db = event.target.result;
       var objectStore = db.createObjectStore("customers", { keyPath: "custom_info" });
   }
   ~~~

简单的例子

~~~js
        const dbName = "my_test_db";
        var request = indexedDB.open(dbName, 2);
        let db = null
        request.onerror = function (event) {
            // 错误处理
            console.log(event)
        };

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            // 建立一个对象仓库来存储我们客户的相关信息，我们选择 custom_info 作为键路径（key path）
            // 因为 ssn 可以保证是不重复的
            var objectStore = db.createObjectStore("customers", { keyPath: "custom_info" });

            // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
            objectStore.createIndex("name", "name", { unique: false });

            // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
            objectStore.createIndex("email", "email", { unique: true });

            // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
            objectStore.transaction.oncomplete = function (event) {
                // 将数据保存到新创建的对象仓库
                const customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
                customerData.forEach(function (customer) {
                    customerObjectStore.add(customer);
                });
            };
        };
~~~

::: tip

`onupgradeneeded` 是我们唯一可以修改数据库结构的地方。在这里面，我们可以创建和删除对象存储空间以及构建和删除索引。但是该方法只有创建新的数据库和更新版本时才会调用。如果我们操作已存在的数据库需要在`onsuccess`事件中取`e.target.result`

:::

### 实例方法

#### createObjectStore

该方法相当于创建了一张表。该方法创建并返回一个新的ObjectStore 

> ###### 参数

1. name

   被创建的 object store 的名称。name可以是空。这个name可以理解为表名

2. optionalParameters（可选）

   ~~~ts
   optionalParameters = {
       //指定对象仓库中每个对象的主键（primary key）的名称或路径，类型为字符串或字符串数组。如果不指定，则使用自增长的整数作为主键。。
       keyPath:undefined | string | string[]
       //指定是否使用自增长的整数作为主键。如果为 true，则表示使用自增长的整数作为主键，如果为 false，则表示不使用自增长的整数作为主键。默认为 false。
       autoIncrement:boolean
   }
   ~~~

3. 返回值

   新创建的 object store 对象。表实例对象



#### deleteObjectStore

**`eleteObjectStore()`** 方法从 [`IDBDatabase`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase) 中销毁指定名称的对象存储，及这个对象存储所包含的任何索引。

参数 name

~~~js
var dbName = "sampleDB";
var dbVersion = 2;
var request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = function(e) {
  var db = request.result;
  if (e.oldVersion < 1) {
    db.createObjectStore("store1");
  }

  if (e.oldVersion < 2) {
    db.deleteObjectStore("store1");
    db.createObjectStore("store2");
  }

};
~~~

#### transaction

该方法返回一个事务对象，通过该对象我们可以进行增删改查,事务提供了三种模式：`readonly`、`readwrite` 和 `versionchange`。

> ###### 参数
>
> 1.`storeNames：string | string[]`
>
> 2.`mode?:'readonly'|'readwrite'|'readwriteflush'` 默认只读
>
> 3.`durability?:'default'|'strict'|'relaxed'`默认default 
>
> durability 提倡用relaxed对于临时数据  strict更重视数据安全的情况下使用

~~~ts

        const dbName = "my_test_db";
        var request = indexedDB.open(dbName, 2);
        let db = null
        request.onerror = function (event) {
            // 错误处理
            console.log(event)
        };
        request.onupgradeneeded = function (event) {
            db = event.target.result;
            // 建立一个对象仓库来存储我们客户的相关信息，我们选择 custom_info 作为键路径（key path）
            // 因为 ssn 可以保证是不重复的
            var objectStore = db.createObjectStore("customers", { keyPath: "custom_info" });

            // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
            const transaction = db.transaction('customers')
            const transactions = db.transaction(db.objectStoreNames)
            console.log(transaction)

        };
~~~



### 增 删 改 查

~~~js

    <script>
        const dbName = "my_test_db";
        var request = indexedDB.open(dbName, 2);
        let db = null
        request.onerror = function (event) {
            // 错误处理
            console.log(event)
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            // 对象仓库  
            const customers_store = db.transaction('customers', 'readwrite').objectStore("customers");
            // 查数据
            const get_res = customers_store.get(2)
            get_res.onerror = function (event) {
                // 错误处理！
                console.log('出错了')
            };
            get_res.onsuccess = function (event) {
                // 对 request.result 做些操作！
                console.log(get_res.result);
            };
            // // 插入数据
            // const add_res = customers_store.add({ email: 'xxxx@qq.com', age: 26, name: 'fancy' });

            // add_res.onerror = function (event) {
            //     // 错误处理！
            //     console.log('出错了', event)
            // };
            // add_res.onsuccess = function (event) {
            //     // 对 request.result 做些操作！
            //     console.log(add_res.result);
            // };

            // 修改数据
            // const put_res = customers_store.put({
            //     user_id: 1,
            //     email: '1074121761.163.com'
            // })
            // put_res.onerror = function (event) {
            //     // 错误处理！
            //     console.log('出错了')
            // };
            // put_res.onsuccess = function (event) {
            //     // 对 request.result 做些操作！
            //     console.log(put_res.result);
            // };
            // 删除数据
            // const delete_res = customers_store.delete(1)
            // delete_res.onerror = function (event) {
            //     // 错误处理！
            //     console.log('出错了')
            // };
            // delete_res.onsuccess = function (event) {
            //     // 对 request.result 做些操作！
            //     console.log(delete_res.result);
            // };

            // 在所有数据添加完毕后的处理
            customers_store.oncomplete = function (event) {
                // alert("All done!");
            };
            customers_store.onerror = function (event) {
                // 不要忘记错误处理！
                console.log('事务错误', event)
            };
        };
    </script>


~~~



#### add

::: tip

add() 方法的调用时，对象仓库中不能存在相同键的对象。如果你想修改一个已存在的条目，或者你不关心该数据是否已存在，你可以使用 put() 方法

:::



#### put

~~~js
var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
var request = objectStore.get(1);
request.onerror = function(event) {
  // 错误处理
};
request.onsuccess = function(event) {
  // 获取我们想要更新的数据
  var data = event.target.result;

  // 更新你想修改的数据
  data.age = 42;

  // 把更新过的对象放回数据库
  var requestUpdate = objectStore.put(data);
   requestUpdate.onerror = function(event) {
     // 错误处理
   };
   requestUpdate.onsuccess = function(event) {
     // 完成，数据已更新！
   };
};

~~~









#### delete





#### get

这里只用到一个对象仓库，你可以只传该对象仓库的名字作为参数，而不必传一个列表。并且，你只需读取数据，所以不需要 `readwrite` 事务。不指定事务模式来调用 `transaction` 你会得到一个 `readonly` 事务。另外一个微妙的地方在于你并没有保存请求对象到变量中。因为 DOM 事件把请求作为他的目标（target），你可以使用该事件来获取 `result` 属性。

~~~js
db.transaction("customers").objectStore("customers").get("余瑞").onsuccess = function(event) {
  alert("Name for SSN 444-44-4444 is " + event.target.result.name);
};
~~~



#### getAll

这个getALL方式和上面的游标查询结果相同。

~~~js
objectStore.getAll().onsuccess = function(event) {
  alert("Got all customers: " + event.target.result);
};
~~~







#### getAllKeys

检索对象存储中与指定参数匹配的所有对象的记录键。如果没给参数则给出所有对象的记录键。

~~~js
getAllKeys()
getAllKeys(query)
getAllKeys(query, count)



~~~

| 名称  | 描述                                                         |
| :---- | :----------------------------------------------------------- |
| query | 要查询的键或IDBKeyRange。如果不传递任何信息，则默认为选择此对象存储中的所有记录的键范围。 |
| count | 指定如果找到多个值要返回的值的数量。如果它小于0或大于2^32 - 1，则会抛出TypeError异常。 |

#### 使用索引

如果你想要通过姓名来查找一个客户，那么，你将需要在数据库中迭代所有的主键 直到你找到正确的那个。以这种方式来查找将会非常的慢，相反你可以使用索引。

~~~js
// 首先，确定你已经在 request.onupgradeneeded 中创建了索引：
// objectStore.createIndex("name", "name");
// 否则你将得到 DOMException。
var index = objectStore.index("name");

index.get("Donna").onsuccess = function(event) {
  alert("Donna's SSN is " + event.target.result.ssn);
};

~~~





#### 使用游标

使用 `get()` 要求你知道你想要检索哪一个键。如果你想要遍历对象存储空间中的所有值，那么你可以使用游标。看起来会像下面这样：

~~~js
var objectStore = db.transaction("customers").objectStore("customers");

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    console.log("Name for SSN " + cursor.key + " is " + cursor.value.name);
    cursor.continue();
  }
  else {
    console.log('遍历完毕')
  }
};
~~~

`openCursor()` 函数需要几个参数。首先，你可以使用一个 key range 对象来限制被检索的项目的范围。第二，你可以指定你希望进行迭代的方向。在上面的示例中，我们在以升序迭代所有的对象。游标成功的回调有点特别。游标对象本身是请求的 `result` （上面我们使用的是简写形式，所以是 `event.target.result`）。然后实际的 key 和 value 可以根据游标对象的 `key` 和 `value` 属性被找到。如果你想要保持继续前行，那么你必须调用游标上的 `continue()` 。当你已经到达数据的末尾时（或者没有匹配 `openCursor()` 请求的条目）你仍然会得到一个成功回调，但是 `result` 属性是 `undefined`。

::: warning

查看游标的 `value` 属性会带来性能消耗，因为对象是被懒生成的。

:::

如果你需要访问带有给定 `name` 的所有的记录你可以使用一个游标。你可以在索引上打开两个不同类型的游标。一个常规游标映射索引属性到对象存储空间中的对象。一个键索引映射索引属性到用来存储对象存储空间中的对象的键。不同之处被展示如下：

~~~js
index.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name，就像 "Bill", 然后 cursor.value 是整个对象。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};

index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name，就像 "Bill", 然后 cursor.value 是那个 SSN。
    // 没有办法可以得到存储对象的其余部分。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value);
    cursor.continue();
  }
};

~~~

指定游标的范围和方向：

如果你想要限定你在游标中看到的值的范围，你可以使用一个 key range 对象然后把它作为第一个参数传给 `openCursor()` 或是 `openKeyCursor()`。你可以构造一个只允许一个单一 key 的 key range，或者一个具有下限或上限，或者一个既有上限也有下限。边界可以是“闭合的”（也就是说 key range 包含给定的值）或者是“开放的”（也就是说 key range 不包括给定的值）。这里是它如何工作的：

~~~js
// 仅匹配 "Donna"
var singleKeyRange = IDBKeyRange.only("Donna");
// 匹配所有超过“Bill”的，包括“Bill”
var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");
// 匹配所有超过“Bill”的，但不包括“Bill”
var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);
// 匹配所有不超过“Donna”的，但不包括“Donna”
var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);
// 匹配所有在“Bill”和“Donna”之间的，但不包括“Donna”
var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);
// 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor 的第一个参数
//切换方向是通过传递 prev 到 openCursor(boundKeyRange,'prev') 方法来实现的：如果你只是想改变遍历的方向，而不想对结果进行筛选，你只需要给第一个参数传入 null。
index.openCursor(boundKeyRange).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // 当匹配时进行一些操作
    cursor.continue();
  }
};
~~~

**去重**如果你想要在游标在索引迭代过程中过滤出重复的，你可以传递 `nextunique` （或 `prevunique` 如果你正在向后寻找）作为方向参数。当 `nextunique` 或是 `prevunique` 被使用时，被返回的那个总是键最小的记录。

~~~js
index.openKeyCursor(null, IDBCursor.nextunique).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
~~~







## —元素/样式相关APIs—

### 1.getComputedStyle

`Window.getComputedStyle()`方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值。私有的 CSS 属性值可以通过对象提供的 API 或通过简单地使用 CSS 属性名称进行索引来访问。

~~~js
element
用于获取计算样式的Element。

pseudoElt 可选
指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
let style = window.getComputedStyle(element, [pseudoElt]);
返回的style是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。

 const result = getComputedStyle(h3, '::after').content;
~~~

::: tip

**返回的对象与从元素的 [`style`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/style) 属性返回的对象具有相同的类型;然而，两个对象具有不同的目的。从`getComputedStyle`返回的对象是只读的，可以用于检查元素的样式（包括由一个`<style>`元素或一个外部样式表设置的那些样式）。`elt.style`对象应用于在特定元素上设置样式。**

:::

### 2.animate

`Element`接口的 **`animate()`** 方法是创建一个新的 [`Animation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Animation) 的便捷方法，将它应用于元素，然后运行动画。它将返回一个新建的 [`Animation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Animation) 对象实例

**①使用方式**

~~~js
某元素.animate(keyframes,options)
~~~

**②参数**

`1.keyframes`一个由多个关键帧的属性和值组成的对象所构成的`数组`。这是[`getKeyframes()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/getKeyframes)方法返回的规范格式。

~~~ts
keyframes:[] | object
element.animate([
  { // from
    opacity: 0,
    color: "#fff"
  },
  { // to
    opacity: 1,
    color: "#000"
  }
], 2000);
element.animate([ { opacity: 1 },
                  { opacity: 0.1, offset: 0.7 },
                  { opacity: 0 } ],
                2000);
 //offset 的值必须是在 [0.0, 1.0] 这个区间内，且须升序排列。
 //并非所有的关键帧都需要设置 offset。没有指定 offset 的关键帧将与相邻的关键帧均匀间隔。 可以通过提供easing过渡来给指定关键帧之间应用过渡效果，如下所示
element.animate([ { opacity: 1, easing: 'ease-out' },
                  { opacity: 0.1, easing: 'ease-in' },
                  { opacity: 0 } ],
                2000);

~~~

对象格式关键帧

~~~js
element.animate({
  opacity: [ 0, 1 ],          // [ from, to ]
  color:   [ "#fff", "#000" ] // [ from, to ]
}, 2000);
element.animate({
  opacity: [ 0, 0.9, 1 ],
  offset: [ 0, 0.8 ], // [ 0, 0.8, 1 ] 的简写
  easing: [ 'ease-in', 'ease-out' ],
}, 2000);

~~~

`2.options`**代表动画持续时间的整数**（以毫秒为单位），或者一个包含一个或多个时间属性（在 [`KeyframeEffect()` options 参数](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyframeEffect/KeyframeEffect#参数)和下方列出）的对象：.

`3.id` 可选在 `animate()` 里可作为唯一标识的属性：一个用来引用动画的字符串。

示例

~~~js
  test.value.animate([
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' },
  ], {
  easing: 'steps(7, end)',
  direction: "reverse",
  duration: 2000,
  playbackRate: 1,
  iterations: Infinity
})
~~~

![](/javaScript/animate1.gif)

## 事件Api



### Event

接口表示在 DOM 中出现的事件。我们可以通过`Event`创建并返回一个 `Event` 对象。

~~~ts
interface IEventinit{
    bubbles?:boolean  默认false表示该事件是否冒泡。
    cancelable?:boolean 默认值为 false，表示该事件能否被取消。
    composed?:boolean 默认值为 false，指示事件是否会在影子 DOM 根节点之外触发侦听器。
}

const my_event = new Event(typeArg:'string',eventinit:IEventinit)
~~~

**①创建一个事件**

~~~ts
const ev = new Event('my_event')
// 事件可以在任何元素触发
document.dispatchEvent(ev);

~~~

#### 实例属性

`1.bubbles` 返回一个布尔值，表明当前事件是否会向 DOM 树上层元素冒泡。

~~~js
var bool = event.bubbles;
~~~

`2.cancelable`表明该事件是否可以被取消，即事件是否可以像从未发生一样被阻止

~~~js
event.cancelbale 
if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
}
~~~

`3.composed`用来指示该事件是否可以从 Shadow DOM 传递到一般的 DOM。如果返回的 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 值为 `true`，表明当事件到达 shadow DOM 的根节点（也就是 shadow DOM 中事件开始传播的第一个节点）时，事件可以从 shadow DOM 传递到一般 DOM。当然，事件要具有可传播性，即该事件的 [`bubbles`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/bubbles) 属性必须为 `true`。你也可以通过调用 [`composedPath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composedPath) 来查看事件从 shadow DOM 传播到普通 DOM 的路径。

`4.currentTarget`只读属性 **`currentTarget`** 表示的，标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 [`Event.target`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target) 则是事件触发的元素。

`5.defaultPrevented`返回一个布尔值，表明当前事件是否调用了 [`event.preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)方法。

`6.isTrusted`是一个只读属性，它是一个布尔值（[`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)）。当事件是由用户行为生成的时候，这个属性的值为 `true` ，而当事件是由脚本创建、修改、通过 [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent) 派发的时候，这个属性的值为 `false` 。

`7.eventPhase`表示事件流当前处于哪一个阶段,[事件阶段常量](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase#事件阶段常量).列出了不同的执行阶段

## 网络监控API

### 1.navigator.connection

**`Navigator.connection`** 是只读的，提供一个 [`NetworkInformation`](https://developer.mozilla.org/zh-CN/docs/Web/API/NetworkInformation) 对象来获取设备的网络连接信息。例如用户设备的当前带宽或连接是否被计量，这可以用于基于用户的连接来选择高清晰度内容或低清晰度内容。

返回设备正在与网络进行通信的连接类型。它将是以下值之一：

~~~js
// rtt延迟     donwnlink带宽
navigator.connection
NetworkInformation {onchange: null, effectiveType: '4g', rtt: 150, downlink: 10, saveData: false}


~~~

**2.navigator.online**

判断是否在线，boolean类型

**3.事件**

**online** 和 **offline**

~~~js
//在线-》离线会触发
window.addEventListener('offline',()=>{})
//离线-》在线会触发
window.addEventListener('online',()=>{})
//网络类型的改变
navigator.connection.addEventListener('change',()=>{})
~~~





## 性能监控API

Performance API 提供了重要的内置指标，并能够将你自己的测量结果添加到浏览器的性能时间线（performance timeline）中。性能时间线使用高精度的时间戳，且可以在开发者工具中显示。

[文档地址](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)

对于前端监控来说需要采集的指标有

**RUM** **(Real User Monitoring) 指标**，包括 FP, TTI, FCP, FMP, FID, MPFID。

**Navigation Timing**，包括 DNS, TCP, DOM 解析等阶段的指标。

**JS Error**，解析后可以细分为运行时异常、以及静态资源异常。

**请求状态码**，采集上报后，可以分析请求异常等信息。

Level2的指标

![](/javaScript/perform.png)

对于`performance.timing`指标由于精度不够将来会废弃，

### RUM指标采集

**真实用户性能指标**也就是上文有所提及的 RUM 以及平台自己扩展的一些额外的指标，包括以下指标：

* **首次绘制时间（** **FP** **）** ：即 First Paint，为首次渲染的时间点。

* **首次内容绘制时间（** **FCP** **）** ：即 First Contentful Paint，为首次有内容渲染的时间点。

* **首次有效绘制时间（** **FMP** **）** ：用户启动页面加载与页面呈现首屏之间的时间。

* **首次交互时间（** **FID** **）** ：即 First Input Delay，记录页面加载阶段，用户首次交互操作的延时时间。FID 指标影响用户对页面交互性和响应性的第一印象。

* **交互中最大延时（** **MPFID** **）** ：页面加载阶段，用户交互操作可能遇到的最大延时时间。

* **完全可交互时间（TTI**）：即 Time to interactive，记录从页面加载开始，到页面处于完全可交互状态所花费的时间。

* **首次加载** **跳出率**：第一个页面完全加载前用户跳出率。

* **慢开比**：完全加载耗时超过 5s 的 PV 占比。

### timing

测量TCP握手时间(connectEnd - connectStart)

测量DNS查找时间(domainLookupEnd - domainLookupStart)

测量重定向时间(redirectEnd - redirectStart)

测量请求时间(responseStart - requestStart)

测量TLS协商时间(requestStart - secureConnectionStart)

测量获取时间(没有重定向)(responseEnd - fetchStart)

测量ServiceWorker处理时间(fetchStart - workerStart)

检查内容是否被压缩(decodedBodySize不应该是encodedBodySize)

检查本地缓存是否被命中(transferSize应该是0)

检查是否使用了现代和快速的协议(nextHopProtocol应该是HTTP/2或HTTP/3)

检查正确的资源是否被渲染阻塞(renderBlockingStatus)



## 网络请求API

### 1、XMLHttpRequests

语法-》`new XMLHttpRequest();`

~~~js
const request = new XMLHttpRequest(objParameters);
objParameters
有两个属性可以设置：
mozAnon
布尔值：将此属性设置为 true 将使浏览器在获取资源时不暴露自身来源和用户凭据。最重要的是，这意味着只有明确添加使用 setRequestHeader 才会发送 Cookies。
mozSystem
布尔值：将此属性设置为 true 允许建立跨站点的连接，而无需服务器选择使用（Cross-Origin Resource Sharing 跨域资源共享）*。必须同时将参数 mozAnon 设置为 true，即不能与 Cookie 或其他用户凭据同时发送。仅限于在 privileged (reviewed) apps 起效（译者注：此句原文 This only works in privileged (reviewed) apps;）；在 Firefox 上任何网页加载后不起作用（译者注：此句原文 it does not work on arbitrary webpages loaded in Firefox.）。
~~~

#### 实例属性

1.`readyState`

| 值   | 状态               | 描述                                                |
| :--- | :----------------- | :-------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中；`responseText` 属性已经包含部分数据。       |
| `4`  | `DONE`             | 下载操作已完成。                                    |

2.status

浏览器状态码，一般由服务器指定。

3.response

如果请求尚未完成或未成功，则取值是 `null`。因此只能在raadyState值为4时才能获取到类型

~~~js
const url = 'somePage.html'; // 一个本地页面

function load(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  }
  xhr.open('GET', url, true);
  xhr.send('');
}
~~~

4.statusText

这个属性包含了返回状态对应的文本信息，例如"OK"或是"Not Found"。如果请求的状态[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)的值为"UNSENT"或者"OPENED"，则这个属性的值将会是一个空字符串。如果服务器未明确指定一个状态文本信息，则`statusText`的值将会被自动赋值为"OK"。

5.timeout

代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。

6.upload

返回一个xhrUpload对象，用来表示上传进度。

可以被绑定在 upload 对象上的事件监听器如下：

| 事件          | 相应属性的信息类型               |
| :------------ | :------------------------------- |
| `onloadstart` | 获取开始                         |
| `onprogress`  | 数据传输进行中                   |
| `onabort`     | 获取操作终止                     |
| `onerror`     | 获取失败                         |
| `onload`      | 获取成功                         |
| `ontimeout`   | 获取操作在用户规定的时间内未完成 |
| `onloadend`   | 获取完成（不论成功与否）         |

#### 实例方法

* `abort`取消请求

* `getAllResponseHeaders()`返回请求头

* `open`初始化一个新创建的请求，或重新初始化一个请求。

  * ~~~js
    xhrReq.open(method, url);
    xhrReq.open(method, url, async);
    xhrReq.open(method, url, async, user);
    xhrReq.open(method, url, async, user, password);
    ~~~

  * async一个可选的布尔参数，表示是否异步执行操作，默认为 true。如果值为 false，send() 方法直到收到答复前不会返回。如果 true，已完成事务的通知可供事件监听器使用。如果 multipart 属性为 true 则这个必须为 true，否则将引发异常。

  * user可选的用户名用于认证用途；默认为 `null`

  * password可选的密码用于认证用途，默认为 `null`。

* `send`用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。

  * ~~~js
    XMLHttpRequest.send(body)
    ~~~



#### 事件

* `loadstart`当程序开始加载时，loadstart 事件将被触发。这个事件可以被 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 调用
* `load`请求完成的时候会触发`load` 事件
* `loadend`在一个资源的加载进度停止之后被触发 (例如，在已经触发“error”，“abort”或“load”事件之后)
* `process`请求接收到数据的时候被周期性触发。
*  `readystatechange`这个方法不该用于同步的 requests 对象**当一个 `XMLHttpRequest` 请求被 abort() 方法取消时，其对应的 `readystatechange` 事件不会被触发。**
* `timeout`超时触发

~~~js
xhr.addEventListener('loadstart', handleEvent);
xhr.addEventListener('load', handleEvent);
xhr.addEventListener('loadend', handleEvent);
xhr.addEventListener('progress', handleEvent);
xhr.addEventListener('error', handleEvent);
xhr.addEventListener('abort', handleEvent);
xhr.addEventListener('readystatechange', handleEvent);
xhr.addEventListener('timeout', handleEvent);
~~~

### 2、Fetch

#### fetch（）

它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象。

~~~js
fetch(input[, init]);
~~~

* 一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 字符串，包含要获取资源的 URL。一些浏览器会接受 `blob:` 和 `data:` 作为 schemes.
* 一个 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 对象。

*init* 可选，一个配置项对象，包括所有对请求的设置。可选的参数有：

* `method`: 请求使用的方法，如 `GET`、`POST`。
* `headers`: 请求的头信息，形式为 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 的对象或包含 [`ByteString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值的对象字面量。
* `body`: 请求的 body 信息：可能是一个 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、`BufferSource`、[`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)、[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 或者 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
* `mode`: 请求的模式，如 `cors`、`no-cors` 或者 `same-origin`。
* `credentials`: 请求的 credentials，如 `omit`、`same-origin` 或者 `include`。为了在当前域名内自动发送 cookie，必须提供这个选项，从 Chrome 50 开始，这个属性也可以接受 `FederatedCredential `实例或是一个 `PasswordCredential`实例。
* `cache`: 请求的 cache 模式：`default`、 `no-store`、 `reload` 、 `no-cache`、 `force-cache` 或者 `only-if-cached`。
* `redirect`: 可用的 redirect 模式：`follow` (自动重定向), `error` (如果产生重定向将自动终止并且抛出一个错误），或者 `manual` (手动处理重定向)。在 Chrome 中默认使用 `follow`（Chrome 47 之前的默认值是 `manual`）。
* `referrer`: 一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 可以是 `no-referrer`、`client` 或一个 URL。默认是 `client`。
* `referrerPolicy`: 指定了 HTTP 头部 referer 字段的值。可能为以下值之一：`no-referrer`、 `no-referrer-when-downgrade`、`origin`、`origin-when-cross-origin`、 `unsafe-url`。



#### Headers

**Headers** 接口允许对 HTTP 请求和响应头执行各种操作。

~~~js
fetch(url, {
    method:'post',
    body:'uname=lisi&pwd=123',
    headers:{
        'Content-Type':'application/x-www-form=urlencoded'
    }
}).then(function(data){
    return data.text();
}).then(function(data){
    console.log(data);
})
~~~









### 3、navigator.sendBeacon

`navigator.sendBeacon`是为了解决当前页面卸载期间无法保证数据发送到服务端。

在没有`sendBeacon`之前通过以下方式解决页面卸载还能传输数据。

* 页面卸载时同步使用ajxa发送请求，等服务端返回数据再卸载页面，缺点很明显，阻碍页面卸载。

* ~~~js
  window.addEventListener('beforeunload', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/log', false); // 第三个参数指定为 false，表示使用同步请求
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = { 
      userId: 123,
      eventType: 'pageView',
      pageUrl: location.href,
      timestamp: Date.now()
    };
    xhr.send(JSON.stringify(data));
  });
  ~~~

* 创建Image对象，将要传输的数据作为查询参数传递到服务器，服务器返回一个空白图片，这样就可以在页面卸载时异步传输数据。**这种方式不会阻塞页面卸载过程，但只支持 GET 请求，且只能传输较小的数据。**

* ~~~js
  function sendAnalyticsData(data) {
    var img = new Image();
    img.src = '/analytics?' + encodeURIComponent(data);
  }
  window.addEventListener('beforeunload', function() {
    var data = { 
      userId: 123,
      eventType: 'pageView',
      pageUrl: location.href,
      timestamp: Date.now()
    };
    sendAnalyticsData(JSON.stringify(data));
  });
  ~~~

* LocalStorage：将要传输的数据存储在 LocalStorage 中，然后在下一个页面加载时读取数据并发送到服务器。这种方式可以在页面卸载时异步传输数据，但需要额外的代码维护，且只能传输较小的数据，且可能会受到 LocalStorage 容量限制。

* ~~~js
  function sendFormData(data) {
    localStorage.setItem('formData', JSON.stringify(data));
    localStorage.setItem('formSubmitTime', Date.now());
  }
  
  window.addEventListener('beforeunload', function() {
    var data = { 
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'HelloWorld!'
    };
    sendFormData(data);
  });
  
  // 在下一个页面加载时发送数据
  window.addEventListener('load', function() {
    var formData = localStorage.getItem('formData');
    var formSubmitTime = localStorage.getItem('formSubmitTime');
    if (formData && formSubmitTime) {
      var data = JSON.parse(formData);
      data.submitTime = parseInt(formSubmitTime);
      sendDataToServer(data);
      localStorage.removeItem('formData');
      localStorage.removeItem('formSubmitTime');
    }
  });
  
  function sendDataToServer(data) {
    // 发送数据到服务器的代码
  }
  ~~~

  

输到服务器，避免在卸载页面时丢失数据。它是基于浏览器提供的 navigator.sendBeacon() 方法实现的，支持发送一些简单的数据，如日志数据、统计数据等。

使用 sendBeacon 的优点是**它可以在页面卸载时异步传输数据，而且不会阻塞页面卸载过程**，因此可以避免在卸载页面时因为数据传输而延迟卸载，提高用户体验。此外，sendBeacon 还可以在网络连接不稳定的情况下保证数据的可靠传输。

发送数据时，需要传入一个 URL 和一个包含数据的 Blob 或 ArrayBuffer 对象。如果传入的数据太大，可能会被浏览器截断或被服务器拒绝，因此建议只传输一些简单的数据。`data` 参数是将要发送的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)、[`ArrayBufferView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)、[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 或 [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 类型的数据。

~~~js
var data = { name: "John", age: 30 };
var blob = new Blob([JSON.stringify(data)], { type: "application/json" });
navigator.sendBeacon("/log", blob);
~~~

::: tip

sendBeacon 方法仅支持 POST 请求

:::



### ajax和fetch区别

`fetch()`使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

`fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。

`fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

### SSE长连接

SSE利用长连接特性，在客户端和服务端之间建立一条持久化链接，并通过这条连接实现服务器向客户端实时数据推送

特点：客户端第一次发送请求后续由服务端推送消息，

~~~js
/*configuration 可选
为配置新连接提供选项。可选项是：
withCredentials，默认为 false，指示 CORS 是否应包含凭据 ( credentials )。
*/
const sse = new EventSource(url,configuration)
sse.addEvenlistener('事件名称默认message,服务端可以设置',e=>{
	console.log(e.data)
})
~~~

与 WebSocket 不同的是，服务器发送事件是单向的。数据信息只能从服务端到发送到客户端（如用户的浏览器）。当不需要以消息形式将数据从客户端发送到服务器时，这使它们成为绝佳的选择。

实例身上默认有三个监听事件  `error message open` ，有一个`close`方法，有一个**`readyState`** 属性

~~~js
const evtSource = new EventSource("sse.php");
/*
0 — connecting
1 — open
2 — closed
*/
console.log(evtSource.readyState);
~~~





<CommentService/>