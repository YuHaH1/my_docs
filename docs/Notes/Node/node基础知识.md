---
lang: zh-CN
title: node基础知识
description: 关键功能
collapsible: true
---
# node基础知识

# 1.V8引擎

## 1.1、v8

### 1.1.1、V8的内存限制

一般后端语言中，基本的内存使用上没有什么限制**，然后node中通过js使用内存会发现，只能使用部分内存，64位系统约1.4GB， 32位系统约0.7GB。**如果我们读入内存一个2GB的文件，即使物理内存有32GB，但在这样单个Node进程的情况下，计算机的内存资源无法得到充足使用。



>
>
># 造成这个问题的原因是什么？
>
>

主要因为Node基于V8构建，所以Node中使用js对象基本上都是V8自己的方式进行分配和管理，V8的内存管理机制在浏览器场景下使用绰绰有余，但在Node中限制了开发者随心所欲使用大内存的想法。

### 1.1.2、V8的对象分配

V8中，对象都是通过堆来分配的，我们可以通过`process.memoryUsage()`来查看内存的使用情况。该函数返回值中heapTpal是申请到的堆内存，heapUsed是当前使用量。当我们声明变量并赋值的时候，所使用对象就在堆内存中。**如果堆的空闲空间不足以分配给新对象，会继续申请堆内存，直到堆的大小超过V8的限制。**

>
>
># 为何限制堆内存的大小？

1. 因为对于网页来说V8的限制值已经绰绰有余
2. 根本原因是垃圾回收机制的限制。（官方说法1.5GB的垃圾回收堆内存，V8需要50ms以上，做一次非增量式的垃圾回收甚至需要1s以上）。**而垃圾回收会引起JS线程暂停执行，在这样时间花销下，应用的性能和响应能力都会下降，这样后端和前端都无法接受**

>
>
># 如何解决内存的限制？
>
>**以下两个最大值需要在启动时就指定**

1. 使用命令node --max-old-space-size=1700 test.js //单位为MB  老生代的内存空间
2. node --max-new-space-size=1700 test.js//单位KB  新生代的内存空间



## 1.2、隐藏类

V8将解释后的js代码编译为机器码时会利用“隐藏类”。V8会将创建的对象和隐藏类关联起来追踪他们的属性特征。

~~~js
function Obj(){
    this.name = 'xx'
}
const a1 = new Obj('x1')
const a2 = new Obj('x2')
~~~

v8会在后台配置，让这两个实例共享相同的隐藏类，因为这两个实例共享同一个构造函数和原型。

对于共享隐藏类前提是不能动态控制属性,如下

~~~js
function Obj(){
    this.name = 'xx'
}
const a1 = new Obj('x1')
const a2 = new Obj('x2')
a1.age = 18
~~~

此时Obj实例对应不同的隐藏类，在可能的情况下我们要避免先创建再补充的动态属性赋值方式。







# 2.进程

>
>
># 单线程的好处

Node选型时决定在V8引擎上构建，就意味着它的模型与浏览器类似。我们的JS运行在单个进程的单个线程上，它带来的好处是程序状态单一，没有多线程情况下的锁和线程同步问题，操作系统在调度时也因为较少的上下文切换可以很好的提高CPU的使用率。

>
>
># 单线程带来的问题

1. Node进程只能利用一个核，如何充分利用多核CPU服务器？
2. 一旦单线程抛出异常没有被捕获将引起整个进程的崩溃，如何保证进程的健壮性和稳定性？

**实际上，Node并非真正的单线程架构，其自身由一定的I/O线程由底层libuv处理，这部分线程对于JS开发者是透明的**



## 2.1、服务器模型的变迁过程

同步-》复制进程-》多线程-》事件驱动

1. 同步：一次只能服务一个请求，所有请求按次序等待服务（基本淘汰，只在无并发要求应用中存在）
2. 复制：通过复制进程来服务更多请求，但是代价很高，因为进程复制过程中，需要复制进程内部的状态，对于每个连接都进行复制的话，相同状态在内存中存在多分，资源利用率低，并且由于要复制的数据多，启动比较慢。
   * 为了解决启动慢的问题：预复制被引入服务器模型中，即先复制一定数量的进程，同时将进程复用避免进程的创建、销毁带来的开销。但是一旦并发量高，内存会随着进程数量的增多而消耗殆尽。
3. 多线程：让一个线程服务一个请求。线程之间可以共享数据，解决了内存浪费问题，并且利用线程池可以减少创建和销毁线程的开销。但是多线程面临的并发问题只是比多进程略好，因为每个线程都拥有自己独立的堆栈，需要占用一定的内存空间。另外由于CPU核心在一个时刻只能做一件事，操作系统只能通过CPU切分时间片的方式，让线程轮流使用CPU资源，但是操作系统内核在切换线程的同时也要切换线程的上下文，当线程数量太多，事件会被消耗在上下文的切换中，因此高并发量，多线程还是无法做到强大的伸缩性。（Apache就是采用多线程/多进程模型实现，当并发量增长到上万时，内存耗用问题就暴露了出来，这就是C10K问题）
4. 事件驱动：Node和Nginx基于事件驱动方式实现。基于事件驱动的服务模型存在两个待解决的问题1.CPU利用率 2.进程的健壮性



## 2.2、多进程架构

面对单线程对多核利用率低的问题，我们可以启动多进程即可，理想状态下，进程各自利用一个CPU，以此实现多核CPU利用，而Node提供了child_process模块，并且提供了child_process.fork()函数来实现进程复制。

>
>
># 主从模式

~~~js
在worker.js文件中
var http = require('http')
http.createServer((req,res)=>{
    res.writeHead(200,{ 'Content-Type':'text/plain' })
    res.end('Hello World')
}).listen(Math.round((1+Math.random())*1000),'127.0.0.1')
//通过node worker.js启动它，它将会侦听1000-2000之间的随机端口
在master.js中
var fork = require('child_process').fork
var cpuLength = require('os').cpus()
for(let i = 0;i<cpuLength;i++) fork('./worker.js')
~~~

上面的代码采用了主从模式，该模式如下图

![](/Node/workers-1.png)

通过fork()复制的进程都是独立的进程，这个进程有独立而全新的V8实例。它需要至少30ms的启动时间和10MB的内存。**Node通过事件驱动的方式在单线程上解决了高并发的问题，这里启动多个进程只是为了充分利用CPU。**

### 2.2.1、创建子进程

在Node中创建子进程分为异步和同步

1. 异步进程

   * [`child_process.spawn()`]、[`child_process.fork()`]、[`child_process.exec()`] 和 [`child_process.execFile()`] 函数都遵循 Node.js API 惯用的异步编程模式。

     每个函数都返回 [`ChildProcess`] 实例。 这些实例实现了 Node.js [`EventEmitter`] API，允许父进程注册监听器函数，在子进程生命周期期间，当特定的事件发生时会调用这些函数。

     [`child_process.exec()`] 和 [`child_process.execFile()`] 函数可以额外指定一个可选的 `callback` 函数，当子进程结束时会被调用。

   * [`child_process.exec()`] 和 [`child_process.execFile()`] 之间的区别会因平台而不同。 在类 Unix 操作系统（Unix、 Linux、 macOS）上，[`child_process.execFile()`] 效率更高，因为它不需要衍生 shell。 **但在 Windows 上，`.bat` 和 `.cmd` 文件在没有终端的情况下是不可执行的，因此不能使用 [`child_process.execFile()`] 启动。 可以使用设置了 `shell` 选项的 [`child_process.spawn()`]、或使用 [`child_process.exec()`]、或衍生 `cmd.exe` 并将 `.bat` 或 `.cmd` 文件作为参数传入（也就是 `shell` 选项和 [`child_process.exec()`] 所做的工作）**。 如果脚本文件名包含空格，则需要加上引号。

   * ![image-20220811101017601](/Node/apis-1.png)

   * ![image-20220811101058790](/Node/apis-2.png)

   * 如果是JS文件通过execFile运行，它的首行要加上如下代码：`#！/usr/bin/env node`

### 2.2.2、进程间的通信

>
>
># 浏览器中web worker

在前端浏览器中,JS主线程和UI渲染引擎共用同一个线程，两者互相阻塞，长时间JS会造成UI停顿不响应。为了解决这个问题HTML5提出了Web Worker的API，允许创建工作线程并在后台运行，使得一些阻塞严重的计算不影响主线程的UI渲染。

~~~js
const worker = new Worker("worker.js")
worker.onmessage = function (event){
    document.getElementById('result').textContent = event.data
    if(event.data>30000) worker.terminate();
}
在worker.js中
var n = 1
label:while(true){
    n+=1
    for(let i = 2;i<=Math.sqrt(n);i+=1){
        if(n%i==0)continue label;
        postMessage(n)
    }
}
~~~

>
>
># 浏览器中多个tab标签页通信方式

1. 通过localstorage，一个标签页中添加修改，另一个标签页中进行监听storage事件即可。

   * ~~~js
     localStorage.setItem(msg,'hello')
     
     另一个标签页中
     window.onload = ()=>{
         window.addEventListener('storage',function(event){
             console.log(event.msg,event.newValue)
         })
     }
     ~~~

2. 利用Cookie+setInterval，一个标签页中设置Cookie另一个标签页轮询Cookie的变化

3. WebSocket通讯

   * WebSocket 是全双工（full-duplex）通信自然可以实现多个标签页之间的通信（服务器可以主动发数据给浏览器；浏览器也可以主动发数据给服务器）。WebSocket 是HTML 5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

4. html5浏览器的新特性sharedWorker

   * 普通的 webworker 直接使用 `new Worker()` 即可创建，这种 webworker 是当前页面专有的。然后还有种共享 worker(SharedWorker)，这种是可以多个标签页、iframe共同使用的。SharedWorker 可以被多个 window 共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

   * 首先新建一个is文件worker.js, 具体代码如下: .

     ```js
     // shareWorker 所要用到的js文件，不必打包到项目中，直接放到服务器即可
     
     let data = " ";
     let onconnect = function (event) {
       let port = event.ports[0];
       port.onmessage = function (e) {
         if (e.data === "get") {
           port.postMessage(data);
         } else {
           data = e.data;
         }
       };
     };
     
     try {
       var worker = new SharedWorker("worker.js");
       var getBtn = document.getElementById("get");
       var setBtn = document.getElementById("set");
       var txt = document.getElementById("txt");
       var log = document.getElementById("log");
     
       worker.port.addEventListener("message", function (e) {
         log.innerHTML = e.data;
         console.log(" --- 获取到数据 e.data --- ", e.data);
       });
     
       worker.port.start();
     
       setBtn.addEventListener(
         "click",
         function (e) {
           worker.port.postMessage(txt.value);
         },
         false
       );
     
       getBtn.addEventListener(
         "click",
         function (e) {
           worker.port.postMessage("get");
         },
         false
       );
     } catch (error) {
       console.log(" --- error --- ", error);
     }
     ```

># node中

~~~js
parent.js中
const cp = require('child_process')
const n = cp.fork(__dirname+'/sub.js')
n.on('message',(msg)=>{
    console.log('PARENT got message:',msg)
})
n.send({
    msg:'Hello I am Farther'
})
sub.js中
process.on('message', msg=>{
    console.log('CHILD got Message:',msg)
})
process.send({
    msg:'Hello I am Child '
})
~~~

### 2.2.3、进程通信的原理

Inter-Process Communication。![image-20220811103044926](/Node/structure-1.png)

进程通信目的是为了让不同进程互相访问资源协调工作。实现进程通信的技术有很多，eg：命名管道、匿名管道、socket、信号量、共享内存、消息队列、Domain Scoket等。Node实现进程通信用的管道技术Pipe，在Node中管道是个抽象层面的称呼，具体实现由libuv提供，在Windows下面由命名管道实现。

**父进程创建子进程之前会创建IPC通道并监听它，然后才真正创建子进程，并通过环境变量NODE_CHANNEL_FD告诉子进程这个IPC通道的文件描述符，子进程在启动过程中根据文件描述符连接这个已存在的IPC通道**

![image-20220811105004278](/Node/IPC.png)

父子进程的通信属于双向通信，**它们在操作系统内核中完成进程间的通信，不用经过网络层因此十分高效。**而子进程和父进程不能监听同一个端口号，**通常主进程监听主端口号如80，主进程对外接受所有网络请求，然后将请求分别代理到不同端口的进程上。**

![image-20220811105324794](/Node/talk-1.png)

#### 2.2.3.1、句柄

># 为什么会有句柄的出现？

通过代理可以避免不能重复监听的问题，甚至可以在代理进程上做适当的负载均衡，由于每个进程每接受一个连接就会用掉一个文件描述符，因此代理方案中客户端连接到代理进程，代理进程连接到工作进程的过程需要用掉两个文件描述符，而操作系统文件描述符是有限的，代理方案浪费掉一倍数量的文件描述符会影响系统扩展能力，为了解决以上问题Node引入了进程间发送句柄的功能。**使用句柄后意味着，主进程接收到socket请求后，将这个socket直接发给工作进程，而不是重新与工作进程之间建立新的scoket连接来转发数据。**





>
>
># 句柄是什么？

句柄是一种用来表示资源的引用，它内部包含了指向对象的文件描述符。eg：句柄可以表示一个服务端/客户端socket对象、一个UDP套接字、一个管道等

>
>
># 如何使用？

实际开发中，我们将服务器句柄发给子进程后，就可以关掉服务器的监听，让子进程来处理请求

~~~js
parent.js中
const cp = require('child_process')
const child1 = cp.fork('child.js')
const child2 = cp.fork('child.js')
const server = require('net').createServer()
server.listen(1337,()=>{
    child1.send('server',server)
    child2.send('server',server)
    server.close()关掉主进程的服务器监听
})
child.js中
const http = require('http')
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('handled by child ,pid is'+process.pid)
})
process.on('message',(m,tcp)=>{
    if(m=='server'){
        tcp.on('connection',(scoket)=>{
            server.emit('connection',sokcet)
        })
    }
})
~~~

![](/Node/talk-2.png)

可以发现多个子进程可以监听同一个端口并且没有Eaddrinuse异常发生了

#### 为什么多进程可以监听相同端口

因为独立启动的进程中，TCP服务端Socket套接字的文件描述符不同，此时监听相同端口会抛出异常。但对于send发送的句柄还原出来的服务，它们的文件描述符是相同的，所以监听相同端口不会引起异常。

### 集群

子进程对象除了send和message事件外还有

1. error：当子进程无法被复制创建、无法被杀死、无法发送消息时触发
2. exit：子进程退出时触发，如果子进程被kill方法杀死回调中第二个参数标识杀死进程时的信号
3. close：子进程标准输入输出流终止时触发，参数和exit相同
4. disconnect：父进程或子进程调用disconnect方法时触发



#### 负载均衡

多进程之间监听相同端口，使用户请求能够分散到多个进程上处理。

Node采用抢占式策略，哪个进程抢到哪个进程就服务。

在后续的版本升级为轮叫调度策略。轮叫调度工作方式由主进程接受连接，将其依次分发给工作进程。

#### 状态共享

Node进程中不适合存放太多数据来加重垃圾回收的负担。Node不允许多进程之间共享数据，但是实际业务中往往有一些需要共享的数据，例如配置。因此有一些的方案和机制实现进程之间共享。

1. 第三方数据存储：将数据存到数据库、磁盘、缓存服务中，所有工作进程启动时将其读入内存。
   1. 缺点：数据发生改变需要通知每个子进程，使得每个子进程内部状态得到更新。实现状态同步机制有两种
      1. 定时轮询（这种方式缺点很明显，1.数据没改变轮询没意义 2.轮询的时间设置很关键，太短会形成并发处理，太长数据更新不及时）
      2. 主动通知，当数据发生改变由主进程通知子进程。（这种方式本质上还是轮询，知识轮询的发起者由多个子进程变成主进程轮询然后通知子进程）

#### Cluster

cluster的本质是通过简单的主从模式，让每一个子进程做好一件事。通过child_process模块能够大幅提高Node的稳定性，但是主进程一旦出问题，所有子进程就失去管理。因此还需要结合监听日志来保障系统稳定性。

~~~js
const cluster = require('cluster')

cluster.setupMater({
    exec:"worker.js"
})
const cpus = require('os').cpus()
for(let i = 0;i<cpus;i++){
	cluster.fork()
}
//判断是工作进程还是主进程
'NODE_UNIQUE_ID' IN PROCESS.ENV === false
~~~



#### Cluster工作原理

`cluster`是`child_process`和net模块的组合。`cluster`启动时会在内部启动TCP服务，在`cluster.fork()`子进程时会将TCP服务端scoket的文件描述符发给工作进程，工作进程的环境变量存在`NODE_UNIQUE_ID`,如果工作进程存在listen侦听网络端口的调用，它将拿到该文件描述符，通过`SO_REUSEADDR`端口重用，从而实现多个子进程共享端口

在TCP编程中，当一个socket连接被关闭后，操作系统会将该连接使用的端口号保留一段时间，以确保任何后续传入的数据包都不会被误认为是该连接的数据包。这段时间称为“TIME_WAIT”状态，它通常持续几分钟。如果在此期间内尝试重新使用该端口号启动一个新的socket连接，就会导致“Address already in use”错误。为了避免这种情况，可以使用`SO_REUSEADDR`选项来启用端口重用。通过设置`SO_REUSEADDR`选项，可以在新的`socket`连接启动之前，允许操作系统立即重新使用该端口号。在Node.js中，可以通过设置socket的`SO_REUSEADDR`选项来启用端口重用。

~~~js
const net = require('net');

const server = net.createServer((socket) => {
  // 处理新的socket连接
});

// 启用SO_REUSEADDR选项
server.on('listening', () => {
  server.setReuseAddress(true);
});

server.listen(3000);
~~~

在上面的示例中，我们创建了一个TCP服务器，并设置了SO_REUSEADDR选项。当服务器开始监听端口时，会触发`listening`事件，我们在事件处理程序中通过调用`server.setReuseAddress(true)`来启用端口重用功能。需要注意的是，SO_REUSEADDR选项并不是在所有情况下都适用的。在某些情况下，使用该选项可能会导致数据包的混乱或安全问题。因此，在启用SO_REUSEADDR选项之前，应该仔细评估应用程序的需求和安全性，并确保了解该选项的工作原理和限制。



### 概念的解释

**什么是句柄**

在Node.js中，“句柄”（handle）通常是指一个可以被程序引用和操作的资源对象，例如文件、网络连接、进程等等。在底层实现中，句柄通常是一个整数或指针，它表示了系统中某个资源的唯一标识符。

**什么是scoket**

“socket”则是一种网络编程的概念，它指的是一个网络连接的端点。在Node.js中，一个socket通常是通过创建一个TCP或UDP服务器，并在服务器上监听一个端口来实现的。当客户端连接到该端口时，服务器会创建一个新的socket对象来代表这个连接。程序可以通过socket对象来读写网络数据，控制连接的状态等等。

因此，在Node.js中，一个socket通常也是一个句柄（handle），它代表了一个网络连接的资源对象。程序可以使用socket句柄来进行网络编程，实现高性能的网络应用。

**什么是文件描述符**

在Unix/Linux系统中，所有的I/O操作（包括网络I/O和文件I/O）都是通过文件描述符（file descriptor）来进行的。文件描述符是一个非负整数，它代表了一个打开的文件或socket连接。

在Node.js中，一个socket连接也是通过文件描述符来进行操作的。Node.js使用libuv库来实现底层I/O操作，libuv将每个socket连接封装成一个uv_stream_t结构体，其中包含了文件描述符。

当我们使用Node.js提供的网络API（如net、http等模块）创建socket连接时，程序会调用底层的系统调用（如socket()、connect()等函数）来创建和操作socket连接，这些系统调用会返回一个文件描述符，Node.js会将该文件描述符保存在对应的socket对象中。程序可以通过该socket对象来进行读写操作，底层实现会使用该文件描述符来进行I/O操作。

以下是一个示例，演示如何获取socket对象的文件描述符：

```js
const net = require('net');

const socket = net.createConnection(3000, 'localhost', () => {
  console.log('socket connected');
  const fd = socket._handle.fd;
  console.log('socket file descriptor:', fd);
});
```

在上面的示例中，我们使用`net.createConnection()`方法创建一个socket连接，并在连接成功后，获取了该socket连接的文件描述符。由于socket对象的底层实现是由Node.js的C++代码实现的，因此我们需要通过访问socket对象的`_handle`属性来获取底层的uv_stream_t结构体，然后从中获取文件描述符。





# 3.异步I/O

操作系统内核对于I/O只有两种方式：阻塞和非阻塞

>
>
># 阻I/O

特点：调用之后要等到系统内核层面完成所有操作后，调用才结束。eg：读取磁盘上的某个文件，系统内核在完成磁盘寻道、读取数据。复制数据到内存中后，这个调用才结束。

缺点：造成CPU等待I/O，浪费等待时间，CPU得不到充分利用。

>
>
># 非阻塞I/O

调用之后会立即返回结果，

操作系统对计算机进行了抽象，将所有的输入输出设备抽象为文件。内核在进行文件I/O操作时，通过文件描述符进行管理，**而文件描述符类似于应用程序和系统内核之间的凭证。应用程序如果需要I/O调用需要先打开文件描述符，然后根据文件描述符去实现文件数据的读写。阻塞I/O会完成整个获取数据的过程，而非阻塞I/O不带数据直接返回，要获取数据还需要通过文件描述符在再次读取。**

缺点:**由于完成的I/O并没有完成，立即返回的不是业务层期望的数据而是当前调用的状态，为了获取完整的数据，应用程序需要进行轮询。**

## 3.1、轮询技术

>
>
># 1.read：最原始、性能最低的一种，通过重复调用检查I/O状态来完成完整数据的读取。在得到最终数据之前，CPU一直耗用在等待上

![image-20220811132117722](/Node/structure-2.png)

>
>
># 2.select：在read基础上改进，通过对文件描述符上的事件状态来判定。

![image-20220811132210188](/Node/structure-3.png)

缺点：**select轮询采用一个1024长度的数组存储状态，因此最多同时检查1024个文件描述符。**

>
>
># 3.poll：采用链表方式避免数组长度的限制，并避免不需要的检查。但是当文件描述符多的时候，性能还是很低。

![image-20220811132341364](/Node/structure-4.png)

>
>
># 4.epoll：在Linux系统下效率最高的I/O事件通知机制，在进入沦胥的时候如果没检查到I/O事件将会休眠，直到事件发生将其唤醒。它利用事件通知、执行回调的方式而不是遍历查询，因此不会浪费CPU，执行效率最高。

![image-20220811132507320](/Node/structure-5.png)



总结：**轮询技术满足了非阻塞I/O确保获取完整数据的需求，但是对于应用程序仍然时同步，应用程序依然要等待I/O完全返回，所以还要花费很多时间等待，等待期间CPU要么处于遍历文件描述符的状态，要么用于休眠等待时间发生。**

## 3.2、异步I/O实现

完美的异步I/O是应用程序发起非阻塞调用，无需通过遍历，或者事件唤醒等方式轮询，可以直接处理下一个任务，只需要在I/O完成后通过信号或者回调将数据传递给应用程序。

现实中，是通过让部分线程进行阻塞或非阻塞I/O加轮询技术来完成获取数据，让一个线程进行计算处理，通过线程之间的通信将I/O得到的数据进行传递。



## 3.3、事件循环

在进程启动时，Node便会创建一个类似于死循环，没执行一次循环体的过程我们称为Tick。每个Tick的过程就是查看是否有事件待处理，如果有就取出事件及相关的回调函数，如果存在关联的回调函数就执行，然后进入下一个循环。如果没有事件处理就退出程序。事件循环机制是一个典型的生产者/消费者模型，异步I/O、网络请求都是事件的生产者。

### 3.2.1、观察者

>
>
># 在每个Tick的过程中，如何判断有事件需要处理？

每个事件循环都至少有一个观察者，只需要向观察者询问是否有处理的事件即可判断有无事件需要处理。观察者根据异步I/O或网络请求等事件的生产者那里取出事件并处理。在Windows下这个循环基于IOCP创建，Linux基于多线程创建

### 3.2.2、请求对象

>
>
># 从我们发出调用到回调函数被执行，js代码到系统内核之间发生了什么？

对于Node的异步I/O回调函数不由开发者来调用。事实上，从JS发起调用到内核执行完I/O操作的过程中会产生请求对象。JS层面的代码通过调用Node的核心模块，核心模块调用C++内建模块，内建模块通过libuv进行系统调用，这是Node的经典调用方式，

1. libuv作为封装层有两个平台的实现。实质上调用uv_fs_open方法，在该方法调用中会创建一个FSReqWrap的请求对象，从JS层传入的参数和当前方法都被封装到这个请求对象中
2. 对象包装完后在Windows下会调用QueueUserWorkItem()方法将FSReqWrap对象推入到线程池中等待执行。
3. 当线程池有可用线程就调用uv_fs_thread_proc()方法，至此JS调用立即返回，有JS层发起的异步调用第一决断就此结束，JS线程可以继续执行当前任务的后续操作，当前的I/O操作在线程池中等待执行，不管他是否阻塞I/O都不会影响到JS线程的后续执行，如此就达到了异步的目的。

### 3.2.3、执行回调

当组装好请求对象、送入I/O线程池等待执行是第一部分。回调通知是第二部分。

> # 什么时候通知回调呢？

当线程池中的I/O操作调用完毕后，会将获取的结果存储到req-》result属性上然后调用PostQueuedCompletionStatus()通知IOCP告知当前对象操作已经完成，该方法向ICOP提交执行状态并将线程归还线程池，通过该方法提交的状态，在每次Tick执行中会调用IOCP相关的GetQueuedCompletionStatus()检查线程池中是否有执行完的请求，如果有就将请求对象加入到I/O观察者队列中，然后当作事件处理。I/O观察和回调函数的行为就是取出请求对象的result属性作为参数，取出oncomplete_sym属性作为方法调用执行，达到调用js传入回调函数的目的。

![image-20220811161731063](/Node/structure-6.png)





## 3.4、非I/O的异步API



setTimeout、process.nextTick、setImmediate

优先级：

1. process.nextTick属于idle观察者
2. setImmediate属于check观察者
3. I/O观察者
4. （定时器需要动用红黑树，创建定时器对象和迭代等操作，setTimeout(fn,0)方式比较浪费性能）

==在具体体现上process.nextTick的回调函数存在数组中，setImmediate存在链表中。==

==在行为上，process.nextTick每轮循环中会将数组中的回调函数全部执行完，而setImmediate在每轮循环中执行链表的一个回调函数==

这样做的目的是为了保证每轮循环能够较快的执行结束，防止CPU占用过多而阻碍后续I/O调用





## 3.5、node的事件循环机制总结

在Node应用程序启动后并不会立即进入事件循环，而是先执行输入代码，从上到下执行同步代码，异步API交给C++维护线程执行，异步API的回调函数被注册到对应的事件队列中。当所有输入代码执行完成后开始进入事件循环

![image-20220811173213939](/Node/Event-loop.png)

**timers**：执行setTimeout() 和 setInterval()中到期的callback。

**pending callback**: 上一轮循环中有少数的I/O callback会被延迟到这一轮的这一阶段执行

**idle, prepare**：仅内部使用

==**poll**: 最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段==

**check**: 执行setImmediate的callback

**close callbacks**: 执行close事件的callback，例如socket.on('close'[,fn])、http.server.on('close, fn)



在每一个阶段都有事件队列，而nextTick的在微任务中的优先级最高，如果有nextTick会先执行，然后再执行其他微任务如promise.then finally等，



# 4.进程

Node使用V8引擎，JS运行在单个进程的单个线程上，好处在于没有多线程的锁、和线程同步问题，也没有操作系统调度时上下文切换的消耗。





<CommentService/>