import{_ as c,M as p,p as i,q as l,R as n,t as s,N as a,a1 as t}from"./framework-5866ffd3.js";const r="/React/state_manager.png",u="/React/state_2.png",d="/React/redux_state.gif",k="/React/mobx.png",v={},m=t('<h1 id="react状态管理" tabindex="-1"><a class="header-anchor" href="#react状态管理" aria-hidden="true">#</a> React状态管理</h1><table><thead><tr><th>特点</th><th>工具</th></tr></thead><tbody><tr><td>React自带</td><td>状态提升、Context</td></tr><tr><td>单项数据流</td><td>Flux、Redux</td></tr><tr><td>双向数据绑定</td><td>Mobx</td></tr><tr><td>原子型状态管理</td><td>Recoil、Jotai</td></tr><tr><td>异步操作密集型</td><td>Rxjs</td></tr></tbody></table><p><img src="'+r+'" alt=""></p><p><img src="'+u+'" alt=""></p><h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h2><p>缺点</p><ol><li>难以追溯数据变化的情况</li><li>组件内部耦合度太高，不利于组件复用和单测</li><li>产生不必要的更新（比如：穿透memo和dependicies）</li><li>只能存储单一值，无法存储多个各自拥有消费者值的集合</li><li>无法细粒度区分组件依赖哪个Context</li><li>多个Context会存在层层嵌套问题</li></ol><p>使用场景：</p><p>不会频繁变更的多组件使用的数据，例如：主题色、省份、运营商列表</p><h2 id="redux" tabindex="-1"><a class="header-anchor" href="#redux" aria-hidden="true">#</a> Redux</h2><p>Flux，利用单向数据流进行状态管理</p><p>三个重要组成</p><ol><li>Action视图层发出的消息</li><li>Dispatcher派发者，接受Action执行回调</li><li>Store数据层存放状态 使用纯函数reducer更新state</li></ol><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Redux中的状态是不可变的，也就是说每次状态发生变化时都会生成一个新的状态对象，而不是直接修改原始状态。这样做的好处是可以跟踪状态的历史记录，从而支持时间回溯。</p></div><p>Redux同步数据流图解</p><p><img src="'+d+'" alt=""></p><h3 id="redux基本使用" tabindex="-1"><a class="header-anchor" href="#redux基本使用" aria-hidden="true">#</a> Redux基本使用</h3><blockquote><h4 id="单例store" tabindex="-1"><a class="header-anchor" href="#单例store" aria-hidden="true">#</a> 单例Store</h4></blockquote>',18),b={href:"https://www.reduxjs.cn/understanding/thinking-in-redux/glossary#state",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,"Store身上的方法如下",-1),g={href:"https://www.reduxjs.cn/api/store#getstate",target:"_blank",rel:"noopener noreferrer"},y=n("code",null,"getState()",-1),w={href:"https://www.reduxjs.cn/api/store#dispatchaction",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"dispatch(action)",-1),x={href:"https://www.reduxjs.cn/api/store#subscribelistener",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"subscribe(listener)",-1),S={href:"https://www.reduxjs.cn/api/store#replacereducernextreducer",target:"_blank",rel:"noopener noreferrer"},R=n("code",null,"replaceReducer(nextReducer)",-1),j=n("blockquote",null,[n("p",null,[n("code",null,"const userStore = createStore(reducer,preloadedState?, enhancer?)")])],-1),A=n("code",null,"reducer",-1),D={href:"https://www.reduxjs.cn/understanding/thinking-in-redux/glossary#action",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.reduxjs.cn/understanding/thinking-in-redux/glossary#state",target:"_blank",rel:"noopener noreferrer"},E=n("li",null,[n("code",null,"preloadedState"),s("(any)初始state,如果没传递，则默认值采用reducer的返回值")],-1),I=n("code",null,"enhancer",-1),C=n("em",null,"(Function)",-1),T={href:"https://www.reduxjs.cn/api/applymiddleware",target:"_blank",rel:"noopener noreferrer"},O=n("code",null,"applyMiddleware()",-1),L={href:"https://www.reduxjs.cn/api/store#dispatchaction",target:"_blank",rel:"noopener noreferrer"},P={href:"https://www.reduxjs.cn/api/store#subscribelistener",target:"_blank",rel:"noopener noreferrer"},M=t(`<p>源码</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">createStore</span><span class="token generic class-name"><span class="token operator">&lt;</span>
    <span class="token constant">S</span><span class="token punctuation">,</span>
    <span class="token constant">A</span> <span class="token keyword">extends</span> Action<span class="token punctuation">,</span>
    Ext <span class="token keyword">extends</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    StateExt <span class="token keyword">extends</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    PreloadedState <span class="token operator">=</span> <span class="token constant">S</span>
<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
    reducer<span class="token operator">:</span> Reducer<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">,</span> PreloadedState<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    preloadedState<span class="token operator">?</span><span class="token operator">:</span> PreloadedState <span class="token operator">|</span> StoreEnhancer<span class="token operator">&lt;</span>Ext<span class="token punctuation">,</span> StateExt<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    enhancer<span class="token operator">?</span><span class="token operator">:</span> StoreEnhancer<span class="token operator">&lt;</span>Ext<span class="token punctuation">,</span> StateExt<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Store<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">,</span> StateExt<span class="token operator">&gt;</span> <span class="token operator">&amp;</span> Ext <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 边界判断代码去掉了
     */</span>
    <span class="token keyword">let</span> currentReducer <span class="token operator">=</span> reducer<span class="token comment">// 传入的reducer</span>
    <span class="token comment">// 当前状态 如果为undefined值为rudecer返回值</span>
    <span class="token keyword">let</span> currentState<span class="token operator">:</span> <span class="token constant">S</span> <span class="token operator">|</span> PreloadedState <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> preloadedState <span class="token keyword">as</span>
        <span class="token operator">|</span> PreloadedState
        <span class="token operator">|</span> <span class="token keyword">undefined</span>
    <span class="token keyword">let</span> currentListeners<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token punctuation">,</span> ListenerCallback<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> nextListeners <span class="token operator">=</span> currentListeners
    <span class="token keyword">let</span> listenerIdCounter <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> isDispatching <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token doc-comment comment">/**
     * 浅拷贝当前监听器，使用nextListeners作为临时列表。
     * 这可以防止在分派过程中围绕消费者调用订阅/退订的任何错误。
     * */</span>
    <span class="token keyword">function</span> <span class="token function">ensureCanMutateNextListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nextListeners <span class="token operator">===</span> currentListeners<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            nextListeners <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            currentListeners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>listener<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                nextListeners<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> listener<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 
     * <span class="token keyword">@returns</span> 当前状态树
     */</span>
    <span class="token keyword">function</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">S</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isDispatching<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
                <span class="token string">&#39;You may not call store.getState() while the reducer is executing. &#39;</span> <span class="token operator">+</span>
                <span class="token string">&#39;The reducer has already received the state as an argument. &#39;</span> <span class="token operator">+</span>
                <span class="token string">&#39;Pass it down from the top reducer instead of reading it from the store.&#39;</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> currentState <span class="token keyword">as</span> <span class="token constant">S</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**

     */</span>
    <span class="token keyword">function</span> <span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token function-variable function">listener</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> isSubscribed <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token comment">// 执行浅拷贝 拷贝监听器</span>
        <span class="token function">ensureCanMutateNextListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> listenerId <span class="token operator">=</span> listenerIdCounter<span class="token operator">++</span>
        nextListeners<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>listenerId<span class="token punctuation">,</span> listener<span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isSubscribed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>isDispatching<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            isSubscribed <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token function">ensureCanMutateNextListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            nextListeners<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>listenerId<span class="token punctuation">)</span>
            currentListeners <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">dispatch</span><span class="token punctuation">(</span>action<span class="token operator">:</span> <span class="token constant">A</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            isDispatching <span class="token operator">=</span> <span class="token boolean">true</span>
            currentState <span class="token operator">=</span> <span class="token function">currentReducer</span><span class="token punctuation">(</span>currentState<span class="token punctuation">,</span> action<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            isDispatching <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> listeners <span class="token operator">=</span> <span class="token punctuation">(</span>currentListeners <span class="token operator">=</span> nextListeners<span class="token punctuation">)</span>
        listeners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>listener <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">listener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> action
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">replaceReducer</span><span class="token punctuation">(</span>nextReducer<span class="token operator">:</span> Reducer<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> nextReducer <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        currentReducer <span class="token operator">=</span> nextReducer <span class="token keyword">as</span> <span class="token builtin">unknown</span> <span class="token keyword">as</span> Reducer<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">,</span> PreloadedState<span class="token operator">&gt;</span>
        <span class="token comment">//这个动作的效果与ActionTypes.INIT类似。</span>
        <span class="token comment">//同时存在于新旧rootReducer中的任何reducer</span>
        <span class="token comment">//将接收到之前的状态。这将有效地用旧状态树中的任何相关数据填充新状态树</span>
        <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> ActionTypes<span class="token punctuation">.</span><span class="token constant">REPLACE</span> <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token constant">A</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 这个方法实际上是监听整个状态数的变化。实际上就是subscribe</span>
    <span class="token keyword">function</span> <span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> outerSubscribe <span class="token operator">=</span> subscribe
        <span class="token keyword">return</span> <span class="token punctuation">{</span>

            <span class="token function">subscribe</span><span class="token punctuation">(</span>observer<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> observer <span class="token operator">!==</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> observer <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">function</span> <span class="token function">observeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">const</span> observerAsObserver <span class="token operator">=</span> observer <span class="token keyword">as</span> Observer<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>observerAsObserver<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 检测数据变化</span>
                        observerAsObserver<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

                <span class="token function">observeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">const</span> unsubscribe <span class="token operator">=</span> <span class="token function">outerSubscribe</span><span class="token punctuation">(</span>observeState<span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span> unsubscribe <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token punctuation">[</span>$$observable<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 创建store时，会先调用每个reducer以此得到初始状态</span>
    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> ActionTypes<span class="token punctuation">.</span><span class="token constant">INIT</span> <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token constant">A</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token punctuation">{</span>
        dispatch<span class="token operator">:</span> dispatch <span class="token keyword">as</span> Dispatch<span class="token operator">&lt;</span><span class="token constant">A</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
        subscribe<span class="token punctuation">,</span>
        getState<span class="token punctuation">,</span>
        replaceReducer<span class="token punctuation">,</span>
        <span class="token punctuation">[</span>$$observable<span class="token punctuation">]</span><span class="token operator">:</span> observable
    <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token builtin">unknown</span> <span class="token keyword">as</span> Store<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">,</span> StateExt<span class="token operator">&gt;</span> <span class="token operator">&amp;</span> Ext
    <span class="token keyword">return</span> store
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span>

<span class="token keyword">function</span> <span class="token function">todos</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;ADD_TODO&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span>action<span class="token punctuation">.</span>text<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>todos<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;Use Redux&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ADD_TODO&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Read the docs&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// [ &#39;Use Redux&#39;, &#39;Read the docs&#39; ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),N={class:"custom-container tip"},U=n("p",{class:"custom-container-title"},"TIP",-1),B={href:"https://www.reduxjs.cn/api/combinereducers",target:"_blank",rel:"noopener noreferrer"},F=n("code",null,"combineReducers",-1),V=n("li",null,[s("Redux state 通常是普通 JS 对象或者数组。如果 state 是普通对象，永远不要修改它！不可变更新需要复制每个级别的数据，通常使用对象扩展运算符（"),n("code",null,"return { ...state, ...newData }"),s("）。")],-1),J=n("li",null,[s("当 store 创建后，Redux 会 dispatch 一个 action 到 reducer 上，来用初始的 state 来填充 store。你不需要处理这个 action。但要记住，如果第一个参数也就是传入的 state 是 "),n("code",null,"undefined"),s(" 的话，reducer 应该返回初始的 state 值。")],-1),$={href:"https://www.reduxjs.cn/api/compose",target:"_blank",rel:"noopener noreferrer"},G=t(`<blockquote><p><code>combineReducers(reducers)</code></p></blockquote><p>随着应用变得越来越复杂，可以考虑将 [reducer 函数] 拆分成多个单独的函数，拆分后的每个函数负责独立管理 [state]的一部分。</p><p><strong>该函数相当于模块划分，避免创建多个store，而是维护多个reducer实现模块划分</strong></p><p>example</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// reducers/todos.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">todos</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;ADD_TODO&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span>action<span class="token punctuation">.</span>text<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// reducers/counter.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">counter</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;INCREMENT&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">case</span> <span class="token string">&#39;DECREMENT&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// reducers/index.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span>
<span class="token keyword">import</span> todos <span class="token keyword">from</span> <span class="token string">&#39;./todos&#39;</span>
<span class="token keyword">import</span> counter <span class="token keyword">from</span> <span class="token string">&#39;./counter&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  todos<span class="token punctuation">,</span>
  counter
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// App.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span>
<span class="token keyword">import</span> reducer <span class="token keyword">from</span> <span class="token string">&#39;./reducers/index&#39;</span>

<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// {</span>
<span class="token comment">//   counter: 0,</span>
<span class="token comment">//   todos: []</span>
<span class="token comment">// }</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ADD_TODO&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Use Redux&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// {</span>
<span class="token comment">//   counter: 0,</span>
<span class="token comment">//   todos: [ &#39;Use Redux&#39; ]</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>applyMiddleware(...middlewares)</code></p></blockquote><p>源码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token operator">...</span>middlewares<span class="token operator">:</span> Middleware<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="token punctuation">)</span><span class="token operator">:</span> StoreEnhancer<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token parameter">createStore</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> preloadedState</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> preloadedState<span class="token punctuation">)</span>
    <span class="token keyword">let</span> <span class="token literal-property property">dispatch</span><span class="token operator">:</span> <span class="token function-variable function">Dispatch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Dispatching while constructing your middleware is not allowed. &#39;</span> <span class="token operator">+</span>
          <span class="token string">&#39;Other middleware would not be applied to this dispatch.&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> <span class="token literal-property property">middlewareAPI</span><span class="token operator">:</span> MiddlewareAPI <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">getState</span><span class="token operator">:</span> store<span class="token punctuation">.</span>getState<span class="token punctuation">,</span>
      <span class="token function-variable function">dispatch</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">action<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span>action<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> chain <span class="token operator">=</span> middlewares<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=&gt;</span> <span class="token function">middleware</span><span class="token punctuation">(</span>middlewareAPI<span class="token punctuation">)</span><span class="token punctuation">)</span>
    dispatch <span class="token operator">=</span> compose<span class="token operator">&lt;</span><span class="token keyword">typeof</span> dispatch<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">...</span>chain<span class="token punctuation">)</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>dispatch<span class="token punctuation">)</span>
   <span class="token keyword">function</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>funcs<span class="token operator">:</span> Function<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>funcs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// infer the argument type so it is usable in inference down the line</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">arg</span><span class="token operator">:</span> <span class="token constant">T</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> arg
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>funcs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> funcs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> funcs<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>store<span class="token punctuation">,</span>
      dispatch
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),W=n("em",null,"middleware API",-1),z={href:"https://www.reduxjs.cn/api/store",target:"_blank",rel:"noopener noreferrer"},Y=n("code",null,"Store",-1),H={href:"https://www.reduxjs.cn/api/store#dispatchaction",target:"_blank",rel:"noopener noreferrer"},K=n("code",null,"dispatch",-1),Q={href:"https://www.reduxjs.cn/api/store#getState",target:"_blank",rel:"noopener noreferrer"},X=n("code",null,"getState",-1),Z=n("code",null,"next",-1),nn=n("code",null,"next(action)",-1),sn={href:"https://www.reduxjs.cn/api/store#dispatchaction",target:"_blank",rel:"noopener noreferrer"},an=n("code",null,"dispatch",-1),en=n("code",null,"next",-1),tn=n("code",null,"({ getState, dispatch }) => next => action",-1),pn=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> applyMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span>
<span class="token keyword">import</span> todos <span class="token keyword">from</span> <span class="token string">&#39;./reducers&#39;</span>

<span class="token keyword">function</span> <span class="token function">logger</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> getState<span class="token punctuation">,</span>dispatch <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token parameter">next</span> <span class="token operator">=&gt;</span> <span class="token parameter">action</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;will dispatch&#39;</span><span class="token punctuation">,</span> action<span class="token punctuation">)</span>

    <span class="token comment">// 调用 middleware 链中下一个 middleware 的 dispatch。</span>
    <span class="token keyword">const</span> returnValue <span class="token operator">=</span> <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;state after dispatch&#39;</span><span class="token punctuation">,</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 一般会是 action 本身，除非</span>
    <span class="token comment">// 后面的 middleware 修改了它。</span>
    <span class="token keyword">return</span> returnValue
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>todos<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;Use Redux&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ADD_TODO&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Understand the middleware&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// (middleware 将打印如下信息:)</span>
<span class="token comment">// will dispatch: { type: &#39;ADD_TODO&#39;, text: &#39;Understand the middleware&#39; }</span>
<span class="token comment">// state after dispatch: [ &#39;Use Redux&#39;, &#39;Understand the middleware&#39; ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redux-toolkit" tabindex="-1"><a class="header-anchor" href="#redux-toolkit" aria-hidden="true">#</a> Redux-Toolkit</h3><p>1.创建Store对象，并暴露出去，在创建 <code>src/app/store.js</code> 文件。从 <code>Redux Toolkit</code> 引入 <code>configureStore</code> API。我们从创建一个空的 Redux store 开始，并且导出它:</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> configureStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@reduxjs/toolkit&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">reducer</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.将创建的store对象注入</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&#39;react-dom&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&#39;./app/store&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-redux&#39;</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Provider</span></span> <span class="token attr-name">store</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Provider</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.创建slice、<strong>“slice” 是应用中单个功能的 Redux reducer 逻辑和 action 的集合</strong>（在该文件中从 Redux Toolkit 引入 <code>createSlice</code> API。）Redux 状态对象拆分为多个状态 “slice”。（可以理解为Vuex中的module）</p><ul><li><p><code>createSlice</code> 函数，它负责生成 action 类型字符串、action creator 函数和 action 对象的工作。我们只需要为这个 slice 定义一个名称，编写一个包含 reducer 函数的对象，它会自动生成相应的 action 代码。<code>name</code> 选项的字符串用作每个 action 类型的第一部分，每个 reducer 函数的键名用作第二部分。因此，<code>&quot;counter&quot;</code> 名称 + <code>&quot;increment&quot;</code> reducer 函数生成了一个 action 类型 <code>{type: &quot;counter/increment&quot;}</code>。</p></li><li><p><code>createSlice</code> 还需要我们为 reducer 传入初始状态值，以便在第一次调用时就有一个 <code>state</code>。即下面代码的<code>initialState</code>,它有一个从 0 开始的 <code>value</code> 字段。</p></li><li><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p><strong>不要尝试在 <code>createSlice</code> 之外更改任何数据！</strong></p></div></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createSlice <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@reduxjs/toolkit&#39;</span>

<span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> counterSlice <span class="token operator">=</span> <span class="token function">createSlice</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;counter&#39;</span><span class="token punctuation">,</span>
  initialState<span class="token punctuation">,</span>
  <span class="token literal-property property">reducers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// Redux Toolkit 允许我们在 reducers 写 &quot;可变&quot; 逻辑。它</span>
      <span class="token comment">// 并不是真正的改变状态值，因为它使用了 Immer 库</span>
      <span class="token comment">// 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的</span>
      <span class="token comment">// 不可变的状态</span>
      state<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>value <span class="token operator">-=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">incrementByAmount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>value <span class="token operator">+=</span> action<span class="token punctuation">.</span>payload
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 每个 case reducer 函数会生成对应的 Action creators</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> increment<span class="token punctuation">,</span> decrement<span class="token punctuation">,</span> incrementByAmount <span class="token punctuation">}</span> <span class="token operator">=</span> counterSlice<span class="token punctuation">.</span>actions

<span class="token keyword">export</span> <span class="token keyword">default</span> counterSlice<span class="token punctuation">.</span>reducer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.将slice Reducers添加到第一步创建的Sotre中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> configureStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@reduxjs/toolkit&#39;</span>
<span class="token keyword">import</span> counterReducer <span class="token keyword">from</span> <span class="token string">&#39;../features/counter/counterSlice&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">reducer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">counter</span><span class="token operator">:</span> counterReducer
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.组件中使用方式（用dispatch来派发<code>counterSlice.actions</code>身上的方法）</p><ul><li>当调用时<code>counterSlice.actions.increment()</code>等价于<code>{type: &quot;counter/increment&quot;}</code></li><li><code>useSelector</code>这个 hooks 让我们的组件从 Redux 的 store 状态树中提取它需要的任何数据。Redux会调用<code>store.getState()</code>将state传给我们</li><li>由于我们无法访问 store 本身，因此我们需要用 <code>useDispatch</code> 方法。</li></ul><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useSelector<span class="token punctuation">,</span> useDispatch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-redux&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> decrement<span class="token punctuation">,</span> increment <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./counterSlice&#39;</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./Counter.module.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">useSelector</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>counter<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
  <span class="token keyword">const</span> dispatch <span class="token operator">=</span> <span class="token function">useDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
          <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Increment value<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">&gt;</span></span><span class="token plain-text">
          Increment
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
          <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Decrement value<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">&gt;</span></span><span class="token plain-text">
          Decrement
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="createslice中reducers的用法" tabindex="-1"><a class="header-anchor" href="#createslice中reducers的用法" aria-hidden="true">#</a> createSlice中reducers的用法</h3></blockquote><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>如果 action 需要包含唯一 ID 或其他一些随机值，请始终先生成该随机值并将其放入 action 对象中。 <strong>Reducer 中永远不应该计算随机值</strong>，因为这会使结果不可预测。</p></div><p>Redux action 对象需要有一个 <code>type</code> 字段，它通常是一个描述性字符串，也可能包含其他字段，其中包含有关发生的事情的更多信息。按照惯例，我们通常将附加信息放在名为 <code>action.payload</code> 的字段中</p><ul><li>reduces中的reducer是个函数</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">reducers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// Redux Toolkit 允许我们在 reducers 写 &quot;可变&quot; 逻辑。它</span>
      <span class="token comment">// 并不是真正的改变状态值，因为它使用了 Immer 库</span>
      <span class="token comment">// 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的</span>
      <span class="token comment">// 不可变的状态</span>
      state<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>value <span class="token operator">-=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">incrementByAmount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>value <span class="token operator">+=</span> action<span class="token punctuation">.</span>payload
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>reduces中的reducer是个对象时（<strong>使用场景</strong>：需要从不同的组件 dispatch 相同的 action或者准备 payload 的逻辑很复杂） <code>createSlice</code> 允许我们在编写 reducer 时定义一个 <code>prepare</code> 函数。 <code>prepare</code> 函数可以接受多个参数，并运行需要的任何其他同步逻辑来决定哪些值进入 action 对象。然后它应该返回一个包含 <code>payload</code> 字段的对象。（返回对象还可能包含一个 <code>meta</code> 字段，可用于向 action 添加额外的描述性值，以及一个 <code>error</code> 字段，该字段应该是一个布尔值，指示此 action 是否表示某种错误。）<div class="custom-container warning"><p class="custom-container-title">WARNING</p><p><strong>action 和 state 应该只能包含普通的 JS 值，如对象、数组和基本类型。不要将类实例、函数或其他不可序列化的值放入 Redux！</strong>。</p></div></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> postsSlice <span class="token operator">=</span> <span class="token function">createSlice</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;posts&#39;</span><span class="token punctuation">,</span>
  initialState<span class="token punctuation">,</span>
  <span class="token literal-property property">reducers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">postAdded</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">reducer</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>action<span class="token punctuation">.</span>payload<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token parameter">title<span class="token punctuation">,</span> content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//同步逻辑的代码</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">payload</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token function">nanoid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//生成唯一id</span>
            title<span class="token punctuation">,</span>
            content
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// other reducers here</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="异步代码" tabindex="-1"><a class="header-anchor" href="#异步代码" aria-hidden="true">#</a> 异步代码</h3></blockquote><p>使用 thunk 需要在创建时将 <code>redux-thunk</code> <em>middleware</em>（一种 Redux 插件）添加到 Redux store 中。Redux Toolkit 的 <code>configureStore</code> 函数已经自动为我们配置好了，所以我们可以继续在这里使用 thunk。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 外部的 thunk creator 函数</span>
<span class="token keyword">const</span> <span class="token function-variable function">fetchUserById</span> <span class="token operator">=</span> <span class="token parameter">userId</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 内部的 thunk 函数</span>
  <span class="token keyword">return</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">dispatch<span class="token punctuation">,</span> getState</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h4></blockquote><ol><li>使用<code>configureStore </code>创建仓库实例，并将其注入到根组件</li><li>使用<code>createSlice</code>创建状态实例（初始化值，和reducer），并将状态实例<code>actions</code>对象暴露出去，该对象身上就是<code>reducers</code>，然后默认导出实例对象身上<code>reducer</code>将其配置到<code>configureStore</code>的<code>reducer</code>中</li><li>通过<code>useSelector</code>来获取仓库中的状态</li><li>通过<code>useDispatch</code>来派发事件，<code>useDispatch(传入createSlice中的 reducers里的方法名)</code></li></ol><h2 id="mobx" tabindex="-1"><a class="header-anchor" href="#mobx" aria-hidden="true">#</a> Mobx</h2><p>mobx不适合数据流复杂场景。</p><p><img src="`+k+'" alt=""></p><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><blockquote><p><code>makeObservable(target, annotations?, options?)</code></p><p>一般情况下，<code>makeObservable</code> 是在类的构造函数中调用的，并且它的第一个参数是 <code>this</code> 。</p></blockquote>',31),on=n("li",null,[n("code",null,"target"),s("任何 JavaScript 对象（包括类的实例）都可以作为 "),n("code",null,"target"),s(" 被传递给这个函数。")],-1),cn=n("code",null,"annotations",-1),ln={href:"https://zh.mobx.js.org/observable-state.html#%E5%8F%AF%E7%94%A8%E7%9A%84%E6%B3%A8%E8%A7%A3",target:"_blank",rel:"noopener noreferrer"},rn={href:"https://zh.mobx.js.org/enabling-decorators.html",target:"_blank",rel:"noopener noreferrer"},un=n("code",null,"annotations",-1),dn=n("li",null,[n("code",null,"options")],-1),kn=t(`<p>example</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> makeObservable<span class="token punctuation">,</span> observable<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> action<span class="token punctuation">,</span> flow <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span>

<span class="token keyword">class</span> <span class="token class-name">Doubler</span> <span class="token punctuation">{</span>
    value

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">makeObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> observable<span class="token punctuation">,</span>
            <span class="token literal-property property">double</span><span class="token operator">:</span> computed<span class="token punctuation">,</span>
            <span class="token literal-property property">increment</span><span class="token operator">:</span> action<span class="token punctuation">,</span>
            <span class="token literal-property property">fetch</span><span class="token operator">:</span> flow
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
    <span class="token punctuation">}</span>

    <span class="token keyword">get</span> <span class="token function">double</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>

    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token operator">++</span>
    <span class="token punctuation">}</span>

    <span class="token operator">*</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&quot;/api/value&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>makeAutoObservable</code></p><p>makeAutoObservable<code>就像是加强版的</code>makeObservable</p></blockquote><h2 id="recoil" tabindex="-1"><a class="header-anchor" href="#recoil" aria-hidden="true">#</a> Recoil</h2><p>解决了local state和Context两个问题</p><ol><li>组件状态共享只能通过状态提升来实现，但这样可能导致重新渲染一颗巨大组件树</li><li>Context只能存储单一值，无法存储多个各自拥有消费者的值的集合</li></ol><p>Recoil的核心是Atom原子状态，通过Atom原子状态派生出衍生状态Selector,也能实现状态回溯</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>const textState = atom({
    key:&#39;textState&#39;,
    default:&#39;&#39;
})
function TextInput(){
    const [text,setText] = useRecoilState(textState)
    const onChange = (e)=&gt;{
		setText(e.target.value)
    }
    return(
    	&lt;div&gt;
            &lt;input type=&#39;text&#39; value={text} onChange={onChange}&gt;&lt;/input&gt;
        &lt;/div&gt;
    )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现快照</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>function CountSnapshot(){
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现简单状态管理工具" tabindex="-1"><a class="header-anchor" href="#实现简单状态管理工具" aria-hidden="true">#</a> 实现简单状态管理工具</h2><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>export  default class CreateStore{
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为什么很多状态管理库会有以下规则-eg-不会直接修改state" tabindex="-1"><a class="header-anchor" href="#为什么很多状态管理库会有以下规则-eg-不会直接修改state" aria-hidden="true">#</a> 为什么很多状态管理库会有以下规则（eg:不会直接修改state）</h2><div class="custom-container tip"><p class="custom-container-title">TIP</p><ul><li>使你的代码可预测。当函数的输出仅根据输入参数计算时，更容易理解该代码的工作原理并对其进行测试。</li><li>另一方面，如果一个函数依赖于自身之外的变量，或者行为随机，你永远不知道运行它时会发生什么。</li><li>如果一个函数操作了其他对象，比如它的参数，这可能会意外地改变应用程序的工作方式。这可能是错误的常见来源，例如“我更新了我的状态，但现在我的视图没有在应该更新的时候更新！”</li></ul></div><h2 id="什么时候使用状态管理库" tabindex="-1"><a class="header-anchor" href="#什么时候使用状态管理库" aria-hidden="true">#</a> 什么时候使用状态管理库</h2><ul><li>应用程序的其他部分是否关心这些数据？</li><li>你是否需要能够基于这些原始数据创建进一步的派生数据？</li><li>是否使用相同的数据来驱动多个组件？</li><li>能够将这种状态恢复到给定的时间点（即时间旅行调试）对你是否有价值？（部分库实现）</li><li>是否要缓存数据（即，如果数据已经存在，则使用它的状态而不是重新请求它）？</li><li>你是否希望在热重载视图组件（交换时可能会丢失其内部状态）时保持此数据一致？</li></ul>`,16);function vn(mn,bn){const e=p("ExternalLinkIcon"),o=p("CommentService");return i(),l("div",null,[m,n("p",null,[s("Store 就是用来维持应用所有的 "),n("a",b,[s("state 树"),a(e)]),s(" 的一个对象。Store 不是类。它只是有几个方法的对象。")]),h,n("ul",null,[n("li",null,[n("a",g,[y,a(e)])]),n("li",null,[n("a",w,[f,a(e)])]),n("li",null,[n("a",x,[_,a(e)])]),n("li",null,[n("a",S,[R,a(e)])])]),j,n("ol",null,[n("li",null,[A,s(" *(Function)*是个函数接收连个参数，分别是当前的 state 树和要处理的 "),n("a",D,[s("action"),a(e)]),s("，返回新的 "),n("a",q,[s("state 树"),a(e)])]),E,n("li",null,[I,s(),C,s(": Store enhancer。你可以选择指定它以使用第三方功能，如middleware、时间旅行、持久化来增强 store。Redux 中唯一内置的 store enhander 是 "),n("a",T,[O,a(e)]),s("。")]),n("li",null,[s("返回值,保存了应用程序所有 state 的对象。改变 state 的惟一方法是 "),n("a",L,[s("dispatch action"),a(e)]),s("。你也可以 "),n("a",P,[s("subscribe"),a(e)]),s(" state 的变化，然后更新 UI。")])]),M,n("div",N,[U,n("ul",null,[n("li",null,[s("应用中不要创建多个 store！相反，使用 "),n("a",B,[F,a(e)]),s(" 来把多个 reducer 创建成一个根 reducer。")]),V,J,n("li",null,[s("要使用多个 store enhancer 的时候，你可能需要使用 "),n("a",$,[s("compose"),a(e)])])])]),G,n("p",null,[s("middlewares遵循 Redux "),W,s(" 的函数。每个 middleware 接受 "),n("a",z,[Y,a(e)]),s(" 的 "),n("a",H,[K,a(e)]),s(" 和 "),n("a",Q,[X,a(e)]),s(" 函数作为命名参数，并返回一个函数。")]),n("ul",null,[n("li",null,[s("该函数会被传入被称为 "),Z,s(" 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 "),nn,s("，或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store 的 "),n("a",sn,[an,a(e)]),s(" 方法作为 "),en,s(" 参数，并借此结束调用链。所以，middleware 的函数签名是 "),tn,s("。")])]),pn,n("ul",null,[on,n("li",null,[cn,s("将会为每一个成员映射 "),n("a",ln,[s("注解"),a(e)]),s("。需要注意的是，当使用 "),n("a",rn,[s("装饰器"),a(e)]),s(" 时，"),un,s(" 参数将会被忽略。")]),dn]),kn,a(o)])}const gn=c(v,[["render",vn],["__file","React状态管理.html.vue"]]);export{gn as default};
