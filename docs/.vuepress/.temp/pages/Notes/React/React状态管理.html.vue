<template><div><h1 id="react状态管理" tabindex="-1"><a class="header-anchor" href="#react状态管理" aria-hidden="true">#</a> React状态管理</h1>
<table>
<thead>
<tr>
<th>特点</th>
<th>工具</th>
</tr>
</thead>
<tbody>
<tr>
<td>React自带</td>
<td>状态提升、Context</td>
</tr>
<tr>
<td>单项数据流</td>
<td>Flux、Redux</td>
</tr>
<tr>
<td>双向数据绑定</td>
<td>Mobx</td>
</tr>
<tr>
<td>原子型状态管理</td>
<td>Recoil、Jotai</td>
</tr>
<tr>
<td>异步操作密集型</td>
<td>Rxjs</td>
</tr>
</tbody>
</table>
<p><img src="/React/state_manager.png" alt=""></p>
<p><img src="/React/state_2.png" alt=""></p>
<h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h2>
<p>缺点</p>
<ol>
<li>难以追溯数据变化的情况</li>
<li>组件内部耦合度太高，不利于组件复用和单测</li>
<li>产生不必要的更新（比如：穿透memo和dependicies）</li>
<li>只能存储单一值，无法存储多个各自拥有消费者值的集合</li>
<li>无法细粒度区分组件依赖哪个Context</li>
<li>多个Context会存在层层嵌套问题</li>
</ol>
<p>使用场景：</p>
<p>不会频繁变更的多组件使用的数据，例如：主题色、省份、运营商列表</p>
<h2 id="redux" tabindex="-1"><a class="header-anchor" href="#redux" aria-hidden="true">#</a> Redux</h2>
<p>Flux，利用单向数据流进行状态管理</p>
<p>三个重要组成</p>
<ol>
<li>Action视图层发出的消息</li>
<li>Dispatcher派发者，接受Action执行回调</li>
<li>Store数据层存放状态 使用纯函数reducer更新state</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Redux中的状态是不可变的，也就是说每次状态发生变化时都会生成一个新的状态对象，而不是直接修改原始状态。这样做的好处是可以跟踪状态的历史记录，从而支持时间回溯。</p>
</div>
<h3 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式</h3>
<p>1.创建Store对象，并暴露出去，在创建 <code v-pre>src/app/store.js</code> 文件。从 <code v-pre>Redux Toolkit</code> 引入 <code v-pre>configureStore</code> API。我们从创建一个空的 Redux store 开始，并且导出它:</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> configureStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@reduxjs/toolkit'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">reducer</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.将创建的store对象注入</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">'react-dom'</span>
<span class="token keyword">import</span> <span class="token string">'./index.css'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App'</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">'./app/store'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-redux'</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Provider</span></span> <span class="token attr-name">store</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Provider</span></span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.创建slice、<strong>“slice” 是应用中单个功能的 Redux reducer 逻辑和 action 的集合</strong>（在该文件中从 Redux Toolkit 引入 <code v-pre>createSlice</code> API。）Redux 状态对象拆分为多个状态 “slice”。（可以理解为Vuex中的module）</p>
<ul>
<li>
<p><code v-pre>createSlice</code> 函数，它负责生成 action 类型字符串、action creator 函数和 action 对象的工作。我们只需要为这个 slice 定义一个名称，编写一个包含 reducer 函数的对象，它会自动生成相应的 action 代码。<code v-pre>name</code> 选项的字符串用作每个 action 类型的第一部分，每个 reducer 函数的键名用作第二部分。因此，<code v-pre>&quot;counter&quot;</code> 名称 + <code v-pre>&quot;increment&quot;</code> reducer 函数生成了一个 action 类型 <code v-pre>{type: &quot;counter/increment&quot;}</code>。</p>
</li>
<li>
<p><code v-pre>createSlice</code> 还需要我们为 reducer 传入初始状态值，以便在第一次调用时就有一个 <code v-pre>state</code>。即下面代码的<code v-pre>initialState</code>,它有一个从 0 开始的 <code v-pre>value</code> 字段。</p>
</li>
<li>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p><strong>不要尝试在 <code v-pre>createSlice</code> 之外更改任何数据！</strong></p>
</div>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createSlice <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@reduxjs/toolkit'</span>

<span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> counterSlice <span class="token operator">=</span> <span class="token function">createSlice</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'counter'</span><span class="token punctuation">,</span>
  initialState<span class="token punctuation">,</span>
  <span class="token literal-property property">reducers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它</span>
      <span class="token comment">// 并不是真正的改变状态值，因为它使用了 Immer 库</span>
      <span class="token comment">// 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的</span>
      <span class="token comment">// 不可变的状态</span>
      state<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>value <span class="token operator">-=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">incrementByAmount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>value <span class="token operator">+=</span> action<span class="token punctuation">.</span>payload
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 每个 case reducer 函数会生成对应的 Action creators</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> increment<span class="token punctuation">,</span> decrement<span class="token punctuation">,</span> incrementByAmount <span class="token punctuation">}</span> <span class="token operator">=</span> counterSlice<span class="token punctuation">.</span>actions

<span class="token keyword">export</span> <span class="token keyword">default</span> counterSlice<span class="token punctuation">.</span>reducer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.将slice Reducers添加到第一步创建的Sotre中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> configureStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@reduxjs/toolkit'</span>
<span class="token keyword">import</span> counterReducer <span class="token keyword">from</span> <span class="token string">'../features/counter/counterSlice'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">reducer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">counter</span><span class="token operator">:</span> counterReducer
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.组件中使用方式（用dispatch来派发<code v-pre>counterSlice.actions</code>身上的方法）</p>
<ul>
<li>当调用时<code v-pre>counterSlice.actions.increment()</code>等价于<code v-pre>{type: &quot;counter/increment&quot;}</code></li>
<li><code v-pre>useSelector</code>这个 hooks 让我们的组件从 Redux 的 store 状态树中提取它需要的任何数据。Redux会调用<code v-pre>store.getState()</code>将state传给我们</li>
<li>由于我们无法访问 store 本身，因此我们需要用 <code v-pre>useDispatch</code> 方法。</li>
</ul>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useSelector<span class="token punctuation">,</span> useDispatch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-redux'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> decrement<span class="token punctuation">,</span> increment <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./counterSlice'</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">'./Counter.module.css'</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">useSelector</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>counter<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
  <span class="token keyword">const</span> dispatch <span class="token operator">=</span> <span class="token function">useDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
          <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Increment value<span class="token punctuation">"</span></span>
          <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">></span></span><span class="token plain-text">
          Increment
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
          <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Decrement value<span class="token punctuation">"</span></span>
          <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">></span></span><span class="token plain-text">
          Decrement
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步代码" tabindex="-1"><a class="header-anchor" href="#异步代码" aria-hidden="true">#</a> 异步代码</h3>
<p>使用 thunk 需要在创建时将 <code v-pre>redux-thunk</code> <em>middleware</em>（一种 Redux 插件）添加到 Redux store 中。Redux Toolkit 的 <code v-pre>configureStore</code> 函数已经自动为我们配置好了，所以我们可以继续在这里使用 thunk。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 外部的 thunk creator 函数</span>
<span class="token keyword">const</span> <span class="token function-variable function">fetchUserById</span> <span class="token operator">=</span> <span class="token parameter">userId</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 内部的 thunk 函数</span>
  <span class="token keyword">return</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">dispatch<span class="token punctuation">,</span> getState</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// thunk 内发起异步数据请求</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> userAPI<span class="token punctuation">.</span><span class="token function">fetchById</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span>
      <span class="token comment">// 但数据响应完成后 dispatch 一个 action</span>
      <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">userLoaded</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果过程出错，在这里处理</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mobx" tabindex="-1"><a class="header-anchor" href="#mobx" aria-hidden="true">#</a> Mobx</h2>
<p>mobx不适合数据流复杂场景。</p>
<p><img src="/React/mobx.png" alt=""></p>
<h2 id="recoil" tabindex="-1"><a class="header-anchor" href="#recoil" aria-hidden="true">#</a> Recoil</h2>
<p>解决了local state和Context两个问题</p>
<ol>
<li>组件状态共享只能通过状态提升来实现，但这样可能导致重新渲染一颗巨大组件树</li>
<li>Context只能存储单一值，无法存储多个各自拥有消费者的值的集合</li>
</ol>
<p>Recoil的核心是Atom原子状态，通过Atom原子状态派生出衍生状态Selector,也能实现状态回溯</p>
<div class="language-react line-numbers-mode" data-ext="react"><pre v-pre class="language-react"><code>const textState = atom({
    key:'textState',
    default:''
})
function TextInput(){
    const [text,setText] = useRecoilState(textState)
    const onChange = (e)=&gt;{
		setText(e.target.value)
    }
    return(
    	&lt;div&gt;
            &lt;input type='text' value={text} onChange={onChange}&gt;&lt;/input&gt;
        &lt;/div&gt;
    )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现快照</p>
<div class="language-react line-numbers-mode" data-ext="react"><pre v-pre class="language-react"><code>function CountSnapshot(){
    const snapshotRef = useRef(null)
    const [count,setCount ] = useRecoilState(countAtom)
    const onSave = useRecoilCallback(({snapshot})=&gt;{
        snapshot.retain()
        snapshotRef.current = snapshot
    })
    const onRevoca = useRecoilCallback(({gotoSnapshot})=&gt;{
         snapshotRef.current &amp;&amp; gotoSnapshot(snapshotRef.current)
    })
    return (
        &lt;div&gt;
        	&lt;button onClick={onSave}&gt;保存快照&lt;/button&gt;
            &lt;button onClick={onRevoca}&gt;恢复快照&lt;/button&gt;
            &lt;button onClick={()=&gt;setCount((v)=&gt;v+1)}&gt;count加加 {count}&lt;/button&gt;
        &lt;/div&gt;
    )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现简单状态管理工具" tabindex="-1"><a class="header-anchor" href="#实现简单状态管理工具" aria-hidden="true">#</a> 实现简单状态管理工具</h2>
<div class="language-react line-numbers-mode" data-ext="react"><pre v-pre class="language-react"><code>export  default class CreateStore{
    constructor(reducer,initialState){
        this.currentReducer = reducer
        this.currentState = initialState
        this.listeners = []
        this.isDispatching = false
    }
    getState(){
        return this.currentState
    }
	subscriber(listener){
        this.listeners.push(listener)
        return function unsubscribe(){
			const index = this.listeners.indexOf(listener)
             this.listeners.splice(index,1)
        }
    }
    dispatch(action){
        try{
            this.isDispatching = true
            this.current = currentReducer(currentState,action)
        }finally{
            this.isDispatching = false
        }
        this.listeners.slice().forEach(listener=&gt;listener())
        return action
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为什么很多状态管理库会有以下规则-eg-不会直接修改state" tabindex="-1"><a class="header-anchor" href="#为什么很多状态管理库会有以下规则-eg-不会直接修改state" aria-hidden="true">#</a> 为什么很多状态管理库会有以下规则（eg:不会直接修改state）</h2>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>使你的代码可预测。当函数的输出仅根据输入参数计算时，更容易理解该代码的工作原理并对其进行测试。</li>
<li>另一方面，如果一个函数依赖于自身之外的变量，或者行为随机，你永远不知道运行它时会发生什么。</li>
<li>如果一个函数操作了其他对象，比如它的参数，这可能会意外地改变应用程序的工作方式。这可能是错误的常见来源，例如“我更新了我的状态，但现在我的视图没有在应该更新的时候更新！”</li>
</ul>
</div>
<h2 id="什么时候使用状态管理库" tabindex="-1"><a class="header-anchor" href="#什么时候使用状态管理库" aria-hidden="true">#</a> 什么时候使用状态管理库</h2>
<ul>
<li>应用程序的其他部分是否关心这些数据？</li>
<li>你是否需要能够基于这些原始数据创建进一步的派生数据？</li>
<li>是否使用相同的数据来驱动多个组件？</li>
<li>能够将这种状态恢复到给定的时间点（即时间旅行调试）对你是否有价值？（部分库实现）</li>
<li>是否要缓存数据（即，如果数据已经存在，则使用它的状态而不是重新请求它）？</li>
<li>你是否希望在热重载视图组件（交换时可能会丢失其内部状态）时保持此数据一致？</li>
</ul>
<CommentService/></div></template>


