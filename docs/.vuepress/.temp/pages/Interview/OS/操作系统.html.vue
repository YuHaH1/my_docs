<template><div><h1 id="操作系统" tabindex="-1"><a class="header-anchor" href="#操作系统" aria-hidden="true">#</a> 操作系统</h1>
<p><img src="/OS/OS3.png" alt=""></p>
<p>OS是为了让多道程序能有条不紊、高效运行</p>
<p>处理机管理功能</p>
<ul>
<li>进程控制：创建进程时分配资源，结束进程时回收进程所占资源</li>
<li>进程同步：协调多进程之间的运行，有以下两种方式1.进程互斥，进程在对临界资源（共享的资源，如内存、文件、网络连接等，这些资源被称为临界资源）访问时互斥。2.进程同步，相互合作完成共同任务的进程间，由同步机构对他们的执行次序协调，常用信号量机制。</li>
<li>进程通信：进程之间合作任务时往往需要交换信息。</li>
</ul>
<p>信号量机制是什么？</p>
<p>​	信号量通常由一个整数值和一个等待队列组成。整数值表示当前可用的资源数量，等待队列用于存储等待访问资源的进程。当一个进程需要访问资源时，它会申请一个信号量，并尝试将信号量的值减1。如果信号量的值大于等于0，则说明有可用的资源，进程可以继续执行；否则，进程需要等待，直到有其它进程释放资源，将信号量的值增加1，并通知等待队列中的一个或多个进程可以访问资源。</p>
<h2 id="_1、进程相关" tabindex="-1"><a class="header-anchor" href="#_1、进程相关" aria-hidden="true">#</a> 1、进程相关</h2>
<p><strong>什么是进程什么是线程？</strong></p>
<ul>
<li>进程-》进程是对正在运行的程序的抽象-》是系统进行资源分配和调度的最小单位</li>
<li>进程是程序的<u>一次执行</u>，即程序实例</li>
</ul>
<p><strong>进程结构</strong></p>
<ul>
<li>控制块（PCB）：进程的唯一标识相当于ID</li>
<li>数据段：进程地址空间中存储全局变量、静态变量和动态分配的内存等数据的部分</li>
<li>程序段：存放文本区域，同一应用程序多个进程之间可以共享程序段。</li>
</ul>
<h3 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h3>
<p>线程是轻量级的，它们比进程更容易创建、销毁和切换，因为它们不需要像进程那样创建和维护独立的地址空间。线程之间的切换比进程之间的切换更快，因为线程之间共享进程的地址空间和其他资源，不需要进行完全的上下文切换。</p>
<p><strong>什么是线程？</strong></p>
<ul>
<li>可以理解为轻量级进程。</li>
<li>是进程中的一条执行路径，无法单独存在。</li>
<li>是操作系统运算调度的最小单位</li>
</ul>
<p><strong>线程的特点</strong></p>
<ul>
<li>可并发执行</li>
<li>共享进程的资源：共享进程的全局变量、静态变量和动态分配的内存等资源。</li>
<li>系统开销相比进程小得多</li>
</ul>
<p><strong>线程之间的通信方式</strong></p>
<ul>
<li>共享内存，由于共享进程的内存，因此可以通过访问同一块内存实现数据共享和通信。</li>
<li>消息队列：线程将消息发送到一个队列里，另一个线程从队列中读消息。</li>
<li>管道：基于流的通信，在线程之间创建管道传输数据。</li>
</ul>
<h4 id="用户级线程" tabindex="-1"><a class="header-anchor" href="#用户级线程" aria-hidden="true">#</a> 用户级线程</h4>
<p>对于用户级线程，操作系统是无感知的，因此线程做的操作操作系统是看不到的，只任务是进程做的。</p>
<p>操作系统看不到的线程，用户空间实现的线程就是用户级线程，即线程控制块在用户空间。</p>
<p>这类线程由用户态库去管路TCB线程控制块，线程的调度由线程库完成。</p>
<p><strong>缺点</strong></p>
<p>​	1.如果OS将该进程变成等待状态，进程及其线程都无法执行。</p>
<p>​	2.某一个用户线程发出系统资源请求，整个进程都会等待。</p>
<p>​	3.如果用户线程不主动交出CPU执行权，它所在的进程中的线程将无法执行。</p>
<p>​	4.由于时间片分配给进程，因此在多线程执行时，每个线程得到的时间片较少，执行会较慢。</p>
<h4 id="内核级线程" tabindex="-1"><a class="header-anchor" href="#内核级线程" aria-hidden="true">#</a> 内核级线程</h4>
<p>操作系统管理的线程就是内核级线程，即内核空间实现的线程，线程控制块在内核空间。</p>
<p>线程控制块TCB放在内核中，线程的创建、终止和管理由操作系统的内核来完成。那么进程主要就完成资源的管理，PCB会管理一个TCBlist，在调度的时候由进程来调度。</p>
<p>时间片分给线程，线程所在的进程会获得更多CPU时间。</p>
<p>优点在于某个内核线程发起系统调用被阻塞不会影响其他内核线程运行。</p>
<p>缺点：</p>
<p>​	1.每次切换都要有一次用户态到内核态的切换，开销会很大。</p>
<h4 id="轻量级进程" tabindex="-1"><a class="header-anchor" href="#轻量级进程" aria-hidden="true">#</a> 轻量级进程</h4>
<p>内核支持用户线程，即内核线程和用户线程结合的方式。由内核线程来支持控制轻量级线程。效率会更高。</p>
<h3 id="进程如何运行的" tabindex="-1"><a class="header-anchor" href="#进程如何运行的" aria-hidden="true">#</a> 进程如何运行的</h3>
<p><strong><u>1.进程状态</u></strong></p>
<p>​	<strong>生命周期</strong></p>
<p>​		创建、运行、等待、唤醒、结束</p>
<p>​			创建由三个事件引起1.系统初始化 2.用户请求创建新进程 3.正在运行的进程执行了创建进程的系统调用</p>
<p>​			等待由进程自己决定，等待就是就绪态，不占用CPU资源</p>
<p>​			唤醒三个事件引起1.当被阻塞进程需要资源可以满足时2.被阻塞进程等待事件到达 3.该进程的PCB插入到就绪队列时，<strong>进程只能被操作系统/别的进程唤醒</strong>。</p>
<p>​			结束四种情况1、正常退出 2.错误时进程自己退出 3.致命错误导致强制被杀 4.被其他进程强制杀掉</p>
<p>​	<strong>状态变化</strong></p>
<p><img src="/OS/OS1.png" alt=""></p>
<ul>
<li>
<p>创建态:进程产生出来后执行一个程序</p>
</li>
<li>
<p>就绪态：进程创建并完成初始化后进入就绪态（这种状态一般很快就会转为运行态）/OS根据调度算法例如时间片，将正在运行的进程变成就绪态</p>
</li>
<li>
<p>运行态：当进程等待某个事件到来时，例如资源得到响应，或者OS调度</p>
</li>
<li>
<p>阻塞态：进程运行期间需要某个资源时</p>
</li>
<li>
<p>结束态：程序完成或因错误退出就会由OS作为结束处理</p>
</li>
</ul>
<p>​	<strong>进程挂起</strong></p>
<p>​			挂起：就是将进程从内存转到外存，会有以下情况 1.阻塞到阻塞的挂起：进程需要更多内存资源时。 2.就绪到就绪的挂起：当存在高优先级阻塞进程和低优先级就绪进程时，OS会选择挂起低优先级就绪进程。 3.当高优先级阻塞挂起进程因事件进入就绪挂起状态OS会将运行进程转到就绪挂起状态 4.阻塞挂起的进程因事件变成就绪挂起</p>
<p>​			阻塞挂起状态：等带某个事件出现</p>
<p>​			就绪挂起状态：进程在外存，但只要进入内存就可以直接运行</p>
<p>​			激活、解挂时就会将进程从外存转到内存去执行</p>
<p>​			状态队列：就绪队列、阻塞队列。当状态发生改变，它的PCB从一个状态队列脱离加入另一个状态队列</p>
<p>2.进程上下文切换</p>
<p><img src="/OS/OS2.png" alt=""></p>
<p>当进程切换上下文时需要保存信息到进程控制块中TCB，这样下次再运行时可以直接恢复这些要使用的资源</p>
<p>切换什么？1.寄存器，（程序寄存器，栈指针寄存器（该寄存器知道变量位置和调用关系））</p>
<p>我们希望进程上下文切换的开销越小越好</p>
<h3 id="进程调度算法" tabindex="-1"><a class="header-anchor" href="#进程调度算法" aria-hidden="true">#</a> 进程调度算法</h3>
<p>协调I/O繁忙进程和CPU繁忙进程（当进程在I/O操作时，意味着进程大量时间是空闲的在等待资源，因此协调I.O进程，充分利用CPU资源很重要）</p>
<p>调度算法根据一些指标去调度 ：CPU使用率（CPU处于繁忙状态所占时间比）、吞吐量（单位时间内完成的进程数量）、周转时间（一个进程从初始化到结束所花时间）、等待时间（进程在就绪队列中的总时间）、响应时间（从一个请求被提交到产生第一次响应所花费的总时间）</p>
<p><strong>通过哪些方法能够充分利用CPU？</strong></p>
<p>​	减少响应时间：及时处理用户的输入并尽快将结果提供给用户</p>
<p>​	减少平均响应时间的波动：在交互系统中，可预测性比高差异低平均更重要</p>
<p>​	增加吞吐量：1.减少操作系统开销，上下文切换2。高效利用CPU I/O设备</p>
<p>​	减少等待时间：减少进程等待时间</p>
<p>调度算法有哪些？</p>
<ul>
<li>FCFS先来先服务
<ul>
<li>优点就是简单</li>
<li>缺点：1.平均等待时间波动大2.花时间少的任务可能排在队列后面3.CPU密集进程会导致I/O设备闲置时,I/O密集型进程也在等待</li>
</ul>
</li>
<li>SPN短进程优先</li>
<li>HRRN最高响应比有限</li>
<li>轮询</li>
<li>多级反馈队列</li>
<li>公平共享调度</li>
</ul>
<h3 id="进程之间如何通信" tabindex="-1"><a class="header-anchor" href="#进程之间如何通信" aria-hidden="true">#</a> 进程之间如何通信</h3>
<ol>
<li>管道（Pipe）：管道是一种半双工的通信方式，数据只能单向流动。在父子进程之间，可以使用管道进行通信。管道分为匿名管道和命名管道，匿名管道只能在父子进程之间使用，而命名管道可以在不同进程之间使用。</li>
<li>共享内存（Shared Memory）：共享内存是一种高效的进程间通信方式，不同进程可以通过共享同一块内存区域来实现数据的交换。共享内存可以通过操作系统提供的共享内存API来实现，也可以使用第三方库来简化操作。</li>
<li>消息队列（Message Queue）：消息队列是一种异步的通信方式，不同进程可以通过向消息队列中发送消息来实现数据的交换。消息队列可以实现进程之间的解耦，从而提高系统的并发性能。消息队列可以通过操作系统提供的消息队列API来实现，也可以使用第三方库来简化操作。</li>
<li>信号（Signal）：信号是一种异步的通信方式，进程可以向其他进程发送信号以通知其发生了某些事件。例如，进程可以向另一个进程发送SIGINT信号以请求其停止运行。信号可以通过操作系统提供的信号API来实现。</li>
<li>套接字（Socket）：套接字是一种全双工的通信方式，不同进程可以通过套接字在网络中进行通信。套接字可以实现不同计算机之间的进程间通信，因此被广泛应用于分布式系统中。套接字可以通过操作系统提供的套接字API来实现，也可以使用第三方库来简化操作。</li>
</ol>
<p>以node为例下面是进程通信方式演示</p>
<p>1.标准输入输出流的方式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 父进程</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> spawn <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建子进程</span>
<span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token function">spawn</span><span class="token punctuation">(</span><span class="token string">'node'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'child.js'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 监听子进程的输出</span>
child<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received data from child: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 向子进程发送消息</span>
child<span class="token punctuation">.</span>stdin<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'Hello, child!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ---------子进程（child.js）</span>
process<span class="token punctuation">.</span>stdin<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received data from parent: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  process<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'Hello, parent!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.管道的方式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 父进程</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> spawn <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建管道</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> Readable<span class="token punctuation">,</span> Writable <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'stream'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> parentReadable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Readable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> childWritable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Writable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建子进程</span>
<span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token function">spawn</span><span class="token punctuation">(</span><span class="token string">'node'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'child.js'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">stdio</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'pipe'</span><span class="token punctuation">,</span> <span class="token string">'pipe'</span><span class="token punctuation">,</span> <span class="token string">'inherit'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将管道连接到子进程的标准输入输出流</span>
parentReadable<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>child<span class="token punctuation">.</span>stdin<span class="token punctuation">)</span><span class="token punctuation">;</span>
child<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>childWritable<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 监听子进程的输出</span>
childWritable<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received data from child: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 向子进程发送消息</span>
parentReadable<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'Hello, child!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">// 子进程（child.js）</span>
process<span class="token punctuation">.</span>stdin<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received data from parent: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  process<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'Hello, parent!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


