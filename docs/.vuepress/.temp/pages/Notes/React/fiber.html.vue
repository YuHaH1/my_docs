<template><div><h3 id="fiber解决了什么问题" tabindex="-1"><a class="header-anchor" href="#fiber解决了什么问题" aria-hidden="true">#</a> Fiber解决了什么问题？</h3>
<p>fiber出现之前，react的更新是会递归所有VNODE，由于JS占据主线程很长时间这导致用户的交互得不到响应，并且无法中断这个过程。而引入了fiber之后遍历DOM树可以中断并且能够断点恢复，fiber保存了diff阶段的工作进度，当遍历发生中断时，只要保留下当前节点的索引，断点是可以恢复的——因为每个节点都保持着对其父节点的索引。</p>
<h3 id="什么是fiber" tabindex="-1"><a class="header-anchor" href="#什么是fiber" aria-hidden="true">#</a> 什么是Fiber？</h3>
<p><strong>React Fiber 本质上是为了解决 React 更新低效率的问题</strong></p>
<p>概念：Fiber也称为<u><strong>协程</strong></u>，协程可以理解为一个流程控制的让出机制即执行单元，在GO中协程是运行在线程上的，协程可以主动让出执行权交给另一个协程运行在当前线程上，这样做的好处弥补了将多线程占用内存的代价和来回切换线程的代价，<u>通过切换协程这样的代价小得多</u>。</p>
<p>React的Filber思想是，React渲染过程可以中断，并将控制权交给浏览器，在浏览器空闲时再继续渲染（这里并没有使用<code v-pre>requiestIdlecallback</code>，因为React调研过该API有时候会在20ms后执行，这会让用户觉得卡顿）React16使用<code v-pre>postmessage</code>+<code v-pre>requestAnimationFrame</code>实现类似于<code v-pre>requestidlecallback</code>的行为，React18使用<code v-pre>MessageChannel</code>实现.</p>
<p>浏览器一帧会做哪些？</p>
<p><img src="/React/react_fiber_frame.png" alt="浏览器一帧"></p>
<h3 id="任务优先级" tabindex="-1"><a class="header-anchor" href="#任务优先级" aria-hidden="true">#</a> 任务优先级</h3>
<p>目前 React 预定义了 5 个优先级</p>
<ul>
<li><code v-pre>Immediate</code>(-1) - 这个优先级的任务会同步执行, 或者说要马上执行且不能中断</li>
<li><code v-pre>UserBlocking</code>(250ms) 这些任务一般是用户交互的结果, 需要即时得到反馈</li>
<li><code v-pre>Normal</code> (5s) 应对哪些不需要立即感受到的任务，例如网络请求</li>
<li><code v-pre>Low</code> (10s) 这些任务可以放后，但是最终应该得到执行. 例如分析通知</li>
<li><code v-pre>Idle</code> (没有超时时间) 一些没有必要做的任务 (e.g. 比如隐藏的内容), 可能会被饿死</li>
</ul>
<blockquote>
<h3 id="fiber为什么不使用generator" tabindex="-1"><a class="header-anchor" href="#fiber为什么不使用generator" aria-hidden="true">#</a> fiber为什么不使用Generator</h3>
</blockquote>
<p>Generator 不能在栈中间让出。比如你想在嵌套的函数调用中间让出, 首先你需要将这些函数都包装成Generator，另外这种栈中间的让出处理起来也比较麻烦，难以理解。除了语法开销，现有的生成器实现开销比较大，所以不如不用。</p>
<p>Generator 是有状态的, 很难在中间恢复这些状态。</p>
<blockquote>
<p>react如何中断任务的执行？</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 1️⃣ performWork 会拿到一个Deadline，表示剩余时间</span>
<span class="token keyword">function</span> <span class="token function">performWork</span><span class="token punctuation">(</span><span class="token parameter">deadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token comment">// 2️⃣ 循环取出updateQueue中的任务</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>updateQueue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token constant">ENOUGH_TIME</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">workLoop</span><span class="token punctuation">(</span>deadline<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 3️⃣ 如果在本次执行中，未能将所有任务执行完毕，那就再请求浏览器调度</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>updateQueue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>performWork<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 保存当前的处理现场</span>
<span class="token keyword">let</span> <span class="token literal-property property">nextUnitOfWork</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token comment">// 保存下一个需要处理的工作单元</span>
<span class="token keyword">let</span> <span class="token literal-property property">topWork</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">undefined</span>        <span class="token comment">// 保存第一个工作单元</span>

<span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">deadline</span><span class="token operator">:</span> IdleDeadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// updateQueue中获取下一个或者恢复上一次中断的执行单元</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextUnitOfWork <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nextUnitOfWork <span class="token operator">=</span> topWork <span class="token operator">=</span> <span class="token function">getNextUnitOfWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 🔴 每执行完一个执行单元，检查一次剩余时间</span>
  <span class="token comment">// 如果被中断，下一次执行还是从 nextUnitOfWork 开始处理</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token constant">ENOUGH_TIME</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 下文我们再看performUnitOfWork</span>
    nextUnitOfWork <span class="token operator">=</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>nextUnitOfWork<span class="token punctuation">,</span> topWork<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 提交工作，下文会介绍</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pendingCommit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">commitAllWork</span><span class="token punctuation">(</span>pendingCommit<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fiber的数据结构" tabindex="-1"><a class="header-anchor" href="#fiber的数据结构" aria-hidden="true">#</a> Fiber的数据结构</h3>
<p>Fiber采用链表的方式，每个VDOM内部使用Fiber表示。</p>
<p>Fiber 包含的属性可以划分为 5 个部分:</p>
<ul>
<li><strong>结构信息</strong> - Fiber 使用链表的形式来表示节点在树中的定位</li>
<li><strong>节点类型信息</strong> - tag表示节点的分类、type 保存具体的类型值，如div、MyComp</li>
<li><strong>节点的状态</strong> - 节点的组件实例、props、state等，它们将影响组件的输出</li>
<li><strong>副作用</strong> - 在 Reconciliation 过程中发现的'副作用'(变更需求)就保存在节点的<code v-pre>effectTag</code> 中(想象为打上一个标记). 那么怎么将本次渲染的所有节点副作用都收集起来呢？ 这里也使用了链表结构，在遍历过程中React会将所有有‘副作用’的节点都通过<code v-pre>nextEffect</code>连接起来</li>
<li><strong>替身</strong> - React 在 Reconciliation 过程中会构建一颗新的树(官方称为workInProgress tree，<strong>WIP树</strong>)，可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的<strong>旧树</strong>，React就是一边和旧树比对，一边构建WIP树的。 alternate 指向旧树的同等节点。</li>
</ul>
<h3 id="fiber工作阶段" tabindex="-1"><a class="header-anchor" href="#fiber工作阶段" aria-hidden="true">#</a> Fiber工作阶段</h3>
<ol>
<li>
<p><strong>协调阶段</strong>：可以认为是 Diff 阶段, <strong>这个阶段可以被中断</strong>, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'<code v-pre>副作用</code>(Effect)' . 以下生命周期钩子会在协调阶段被调用：</p>
<ul>
<li><code v-pre>constructor</code></li>
<li><code v-pre>static getDerivedStateFromProps</code></li>
<li><code v-pre>shouldComponentUpdate</code></li>
<li><code v-pre>render</code></li>
</ul>
</li>
<li>
<p><strong>提交阶段</strong>：将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。<strong>这个阶段必须同步执行，不能被打断</strong>. 这些生命周期钩子在提交阶段被执行:</p>
<ul>
<li><code v-pre>getSnapshotBeforeUpdate()</code> 严格来说，这个是在进入 commit 阶段前调用</li>
<li><code v-pre>componentDidMount</code></li>
<li><code v-pre>componentDidUpdate</code></li>
<li><code v-pre>componentWillUnmount</code></li>
</ul>
<p>在协调阶段时间片如果用完就会让出控制权给浏览器。</p>
</li>
</ol>
<h3 id="双缓存" tabindex="-1"><a class="header-anchor" href="#双缓存" aria-hidden="true">#</a> 双缓存</h3>
<p><img src="/React/fiber_tree.png" alt=""></p>
<p>拿当前树和workInProgress树对比，对比完成后将workInProgressTree交付</p>
<h3 id="提出问题" tabindex="-1"><a class="header-anchor" href="#提出问题" aria-hidden="true">#</a> 提出问题</h3>
<ol>
<li>为什么Vue不需要要引入Fiber呢？
<ol>
<li>个人理解：Vue的数据是响应式式的，更新粒度更细，能够知道哪里需要更新，并且Vue在编译时做了大量工作，例如静态提升，节点标记，类型标记等等。Vue想做的是极致的更新性能。因此不需要引入Fiber来任务分片。</li>
<li>react的更新是自顶向下，该组件以及它的子组件全部需要渲染；所以当一个数据改变，react的组件渲染是很消耗性能的——父组件的状态更新了，所有的子组件得跟着一起渲染，它不能像vue一样，精确到当前组件的粒度。</li>
</ol>
</li>
<li>如何实现的断点恢复呢？
<ol>
<li>react fiber这种数据结构采用链表数据结构使得节点可以回溯到其父节点，只要保留下中断的节点索引，就可以恢复之前的工作进度；</li>
</ol>
</li>
</ol>
<CommentService/></div></template>


