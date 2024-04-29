<template><div><h1 id="golang" tabindex="-1"><a class="header-anchor" href="#golang" aria-hidden="true">#</a> golang</h1>
<h2 id="变量作用域" tabindex="-1"><a class="header-anchor" href="#变量作用域" aria-hidden="true">#</a> 变量作用域</h2>
<ul>
<li>局部作用域：代码块、函数内的</li>
<li>全局作用域：顶层作用域，代码块外的就是全局，如果变量名大写，则改变量整个程序都可以使用。</li>
</ul>
<h2 id="类型断言" tabindex="-1"><a class="header-anchor" href="#类型断言" aria-hidden="true">#</a> 类型断言</h2>
<p>golang的类型断言在变量后加上<code v-pre>.(type)</code>，如果类型断言与实际类型不一致会返回第二个参数bool代表是否成功</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> a inteface<span class="token punctuation">{</span><span class="token punctuation">}</span>
    b <span class="token operator">:=</span> <span class="token number">1</span>
    b <span class="token operator">=</span> a
    c<span class="token punctuation">,</span>ok <span class="token operator">:=</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>boolean<span class="token punctuation">)</span>
    <span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token operator">...</span> succcess
    <span class="token punctuation">}</span>
    <span class="token comment">// 简写</span>
    <span class="token keyword">if</span> c<span class="token punctuation">,</span>ok <span class="token operator">:=</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>boolean<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		<span class="token operator">...</span> succcess
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h2>
<p>默认情况发生错误panic程序会退出。golang中捕获错误采用如下方法，<code v-pre>defer</code>+<code v-pre>recover</code></p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">tes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">{</span>
            <span class="token comment">// </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token operator">+</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义错误" tabindex="-1"><a class="header-anchor" href="#自定义错误" aria-hidden="true">#</a> 自定义错误</h3>
<p>golang中自定义错误采用<code v-pre>errors.New</code>和<code v-pre>panic</code>函数</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制的细节" tabindex="-1"><a class="header-anchor" href="#流程控制的细节" aria-hidden="true">#</a> 流程控制的细节</h2>
<h3 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> switch</h3>
<ul>
<li><strong>穿透</strong>：golang的<code v-pre>switch</code>默认不会穿透，不需要像js一样在case内加上<code v-pre>break</code>，如果需要穿透加上<code v-pre>fallthrough</code></li>
<li>case后面可有多个值</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    a <span class="token operator">:=</span> <span class="token number">5</span>
    <span class="token keyword">switch</span> a<span class="token punctuation">{</span>
    	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">:</span>
        	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"ok1,2,3"</span><span class="token punctuation">)</span>
    	<span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span>
        	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"ok5"</span><span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
        	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"default"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以将<code v-pre>switch</code>当作<code v-pre>if else</code>分支</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    a <span class="token operator">:=</span> <span class="token number">5</span>
    <span class="token keyword">switch</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> a <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">:</span>
        	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"a = 5 true"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>Type Switch</code></p>
</blockquote>
<p>switch可以用来判断某个变量的实际类型</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">var</span> mapData <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span> k<span class="token punctuation">,</span>v <span class="token operator">:=</span> <span class="token keyword">range</span> mapData<span class="token punctuation">{</span>
        <span class="token keyword">switch</span> v<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span>
            <span class="token comment">//</span>
        	<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
            <span class="token comment">//</span>
            <span class="token keyword">case</span> <span class="token builtin">float64</span><span class="token punctuation">:</span>
            <span class="token comment">//</span>
            <span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">,</span><span class="token builtin">string</span><span class="token punctuation">:</span>
            <span class="token comment">//</span>
        	<span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<p>函数传递两种方式</p>
<ul>
<li>值传递</li>
<li>引用传递。</li>
</ul>
<p>引用传递效率高，因为只拷贝地址。对于引用类型，指针、slice切片、map、管道、chan、interface都属于引用类型。 值类型 int、float、bool、string、数组和结构体</p>
<h3 id="init函数" tabindex="-1"><a class="header-anchor" href="#init函数" aria-hidden="true">#</a> init函数</h3>
<p>每一个源文件都可以包含一个<code v-pre>init</code>函数，该函数将会在<code v-pre>main</code>函数之前被调用</p>
<h3 id="defer关键字" tabindex="-1"><a class="header-anchor" href="#defer关键字" aria-hidden="true">#</a> defer关键字</h3>
<p>defer使用场景主要是函数执行完毕后<strong>释放函数执行期间创建的资源</strong></p>
<p>当go执行到defer时，会将defer后的代码压入栈中，当函数执行完毕后会从栈中取出语句执行（<strong>语句中引用的值会做一个拷贝</strong>）。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span>b <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token builtin">int</span><span class="token punctuation">{</span>
    <span class="token comment">// 将println(a)   println(b)语句入栈，此时a，b值10，20被拷贝，</span>
    <span class="token keyword">defer</span> <span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>  <span class="token comment">//10</span>
    <span class="token keyword">defer</span> <span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>  <span class="token comment">//20</span>
    a<span class="token operator">++</span>  <span class="token comment">//11</span>
    b<span class="token operator">++</span>  <span class="token comment">//21</span>
    res <span class="token operator">:=</span> a <span class="token operator">+</span> b
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="打印操作" tabindex="-1"><a class="header-anchor" href="#打印操作" aria-hidden="true">#</a> 打印操作</h2>
<p>golang打印需要导入<code v-pre>fmt</code>包，如果需要详细打印信息需要符号<code v-pre>%#</code>,使用<code v-pre>%v</code>打印任何值,<code v-pre>%.2f</code>可以打印小数并展示到小数后两位</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>s <span class="token operator">:=</span> <span class="token string">"hello"</span>
f <span class="token operator">:=</span> <span class="token number">3.1415926</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"s=%v"</span><span class="token punctuation">,</span>s<span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%.2f"</span><span class="token punctuation">,</span>f<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="new和make的区别" tabindex="-1"><a class="header-anchor" href="#new和make的区别" aria-hidden="true">#</a> new和make的区别</h2>
<p>new函数不太常用，使用new函数得到的是一个类型的指针，并且该指针对应的值为该类型的零值。举个例子：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    b <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// *int</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">// *bool</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span>       <span class="token comment">// 0</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>b<span class="token punctuation">)</span>       <span class="token comment">// false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>var a *int</code>只是声明了一个指针变量a但是没有初始化，指针作为引用类型需要初始化后才会拥有内存空间，才可以给它赋值。应该按照如下方式使用内置的new函数对a进行初始化之后就可以正常对其赋值了：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">int</span>
    a <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token number">10</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>make也是用于内存分配的，区别于new，它只用于slice、map以及chan的内存创建，而且它返回的类型就是这三个类型本身，而不是他们的指针类型，因为这三种类型就是引用类型，所以就没有必要返回他们的指针了。make函数是无可替代的，我们在使用slice、map以及channel的时候，都需要使用make进行初始化，然后才可以对它们进行操作。</p>
<blockquote>
<h5 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h5>
</blockquote>
<ul>
<li>二者都是用来做内存分配的。</li>
<li>make只用于slice、map以及channel的初始化，返回的还是这三个引用类型本身；</li>
<li>而new用于类型的内存分配，并且内存对应的值为类型零值（初始值），返回的是指向类型的指针。</li>
</ul>
<h2 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h2>
<p>结构体相当于java、js的class</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> userInfo <span class="token keyword">struct</span><span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    age <span class="token builtin">int</span>
    hobby <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义结构体方法" tabindex="-1"><a class="header-anchor" href="#定义结构体方法" aria-hidden="true">#</a> 定义结构体方法</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>userInfo<span class="token punctuation">)</span> <span class="token function">resetPassword</span><span class="token punctuation">(</span>password <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    u<span class="token punctuation">.</span>password <span class="token operator">=</span> password
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>u userInfo<span class="token punctuation">)</span> <span class="token function">checkPassword</span><span class="token punctuation">(</span>password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> u<span class="token punctuation">.</span>password <span class="token operator">==</span> password
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结构体的实例化" tabindex="-1"><a class="header-anchor" href="#结构体的实例化" aria-hidden="true">#</a> 结构体的实例化</h3>
<p>我们还可以通过使用new关键字对结构体进行实例化，得到的是结构体的地址。 格式如下：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    <span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span>     <span class="token comment">//*main.person</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p2=%#v\n"</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span> <span class="token comment">//p2=&amp;main.person{name:"", city:"", age:0}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>只有当结构体实例化时，才会真正地分配内存。也就是必须实例化后才能使用结构体的字段。</p>
<p>结构体本身也是一种类型，我们可以像声明内置类型一样使用var关键字声明结构体类型。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    city <span class="token builtin">string</span>
    age  <span class="token builtin">int8</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> p1 person
    p1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"pprof.cn"</span>
    p1<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string">"北京"</span>
    p1<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p1=%v\n"</span><span class="token punctuation">,</span> p1<span class="token punctuation">)</span>  <span class="token comment">//p1={pprof.cn 北京 18}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p1=%#v\n"</span><span class="token punctuation">,</span> p1<span class="token punctuation">)</span> <span class="token comment">//p1=main.person{name:"pprof.cn", city:"北京", age:18}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>使用&amp;对结构体进行取地址操作相当于对该结构体类型进行了一次new实例化操作。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>p3 <span class="token operator">:=</span> <span class="token operator">&amp;</span>person<span class="token punctuation">{</span><span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> p3<span class="token punctuation">)</span>     <span class="token comment">//*main.person</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p3=%#v\n"</span><span class="token punctuation">,</span> p3<span class="token punctuation">)</span> <span class="token comment">//p3=&amp;main.person{name:"", city:"", age:0}</span>
p3<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"博客"</span>
p3<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">30</span>
p3<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string">"成都"</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p3=%#v\n"</span><span class="token punctuation">,</span> p3<span class="token punctuation">)</span> <span class="token comment">//p3=&amp;main.person{name:"博客", city:"成都", age:30}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结构体的初始化" tabindex="-1"><a class="header-anchor" href="#结构体的初始化" aria-hidden="true">#</a> 结构体的初始化</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    city <span class="token builtin">string</span>
    age  <span class="token builtin">int8</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> p4 person
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p4=%#v\n"</span><span class="token punctuation">,</span> p4<span class="token punctuation">)</span> <span class="token comment">//p4=main.person{name:"", city:"", age:0}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>使用键值对对结构体进行初始化时，键对应结构体的字段，值对应该字段的初始值。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>p5 <span class="token operator">:=</span> person<span class="token punctuation">{</span>
    name<span class="token punctuation">:</span> <span class="token string">"pprof.cn"</span><span class="token punctuation">,</span>
    city<span class="token punctuation">:</span> <span class="token string">"北京"</span><span class="token punctuation">,</span>
    age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p5=%#v\n"</span><span class="token punctuation">,</span> p5<span class="token punctuation">)</span> <span class="token comment">//p5=main.person{name:"pprof.cn", city:"北京", age:18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以对结构体指针进行键值对初始化，例如：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>p6 <span class="token operator">:=</span> <span class="token operator">&amp;</span>person<span class="token punctuation">{</span>
    name<span class="token punctuation">:</span> <span class="token string">"pprof.cn"</span><span class="token punctuation">,</span>
    city<span class="token punctuation">:</span> <span class="token string">"北京"</span><span class="token punctuation">,</span>
    age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p6=%#v\n"</span><span class="token punctuation">,</span> p6<span class="token punctuation">)</span> <span class="token comment">//p6=&amp;main.person{name:"pprof.cn", city:"北京", age:18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当某些字段没有初始值的时候，该字段可以不写。此时，没有指定初始值的字段的值就是该字段类型的零值。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>p7 <span class="token operator">:=</span> <span class="token operator">&amp;</span>person<span class="token punctuation">{</span>
    city<span class="token punctuation">:</span> <span class="token string">"北京"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p7=%#v\n"</span><span class="token punctuation">,</span> p7<span class="token punctuation">)</span> <span class="token comment">//p7=&amp;main.person{name:"", city:"北京", age:0}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>使用值的列表初始化</p>
<p>初始化结构体的时候可以简写，也就是初始化的时候不写键，直接写值：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>p8 <span class="token operator">:=</span> <span class="token operator">&amp;</span>person<span class="token punctuation">{</span>
    <span class="token string">"pprof.cn"</span><span class="token punctuation">,</span>
    <span class="token string">"北京"</span><span class="token punctuation">,</span>
    <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"p8=%#v\n"</span><span class="token punctuation">,</span> p8<span class="token punctuation">)</span> <span class="token comment">//p8=&amp;main.person{name:"pprof.cn", city:"北京", age:18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这种格式初始化时，需要注意：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    1.必须初始化结构体的所有字段。
    2.初始值的填充顺序必须与字段在结构体中的声明顺序一致。
    3.该方式不能和键值初始化方式混用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结构体标签-tag" tabindex="-1"><a class="header-anchor" href="#结构体标签-tag" aria-hidden="true">#</a> 结构体标签（Tag）</h3>
<p>Tag是结构体的元信息，可以在运行的时候通过反射的机制读取出来。</p>
<p>Tag在结构体字段的后方定义，由一对反引号包裹起来，具体的格式如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    `key1:"value1" key2:"value2"`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结构体标签由一个或多个键值对组成。键与值使用冒号分隔，值用双引号括起来。键值对之间使用一个空格分隔。 注意事项： 为结构体编写Tag时，必须严格遵守键值对的规则。结构体标签的解析代码的容错能力很差，一旦格式写错，编译和运行时都不会提示任何错误，通过反射也无法正确取值。例如不要在key和value之间添加空格。</p>
<p>例如我们为Student结构体的每个字段定义json序列化时使用的Tag：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">//Student 学生</span>
<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID     <span class="token builtin">int</span>    <span class="token string">`json:"id"`</span> <span class="token comment">//通过指定tag实现json序列化该字段时的key</span>
    Gender <span class="token builtin">string</span> <span class="token comment">//json序列化是默认使用字段名作为key</span>
    name   <span class="token builtin">string</span> <span class="token comment">//私有不能被json包访问</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    s1 <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
        ID<span class="token punctuation">:</span>     <span class="token number">1</span><span class="token punctuation">,</span>
        Gender<span class="token punctuation">:</span> <span class="token string">"女"</span><span class="token punctuation">,</span>
        name<span class="token punctuation">:</span>   <span class="token string">"pprof"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    data<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"json marshal failed!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"json str:%s\n"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token comment">//json str:{"id":1,"Gender":"女"}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="json操作" tabindex="-1"><a class="header-anchor" href="#json操作" aria-hidden="true">#</a> JSON操作</h2>
<p>JSON的键需要大写，如果想小写，则需要加上tag，例如下面的<code v-pre>json:age</code></p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> userInfo <span class="token keyword">struct</span><span class="token punctuation">{</span>
    Name <span class="token builtin">string</span>
    Age <span class="token builtin">int</span> <span class="token string">`json:age`</span>
    Hobby <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>序列化和反序列化对象</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/json"</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

a<span class="token operator">:=</span> userinfo<span class="token punctuation">{</span>Name<span class="token punctuation">:</span><span class="token string">"Yu"</span><span class="token punctuation">,</span>Age<span class="token punctuation">:</span><span class="token number">25</span><span class="token punctuation">,</span>Hobby<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"Golang"</span><span class="token punctuation">,</span><span class="token string">"TypeScript"</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
buf<span class="token punctuation">,</span>err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token comment">// 序列化后编程buf数组（16进制编码） 可以通过string(buf)转为字符串</span>
<span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
<span class="token keyword">var</span> b userInfo 
err <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span><span class="token operator">&amp;</span>b<span class="token punctuation">)</span>
<span class="token keyword">if</span> err<span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="日期操作" tabindex="-1"><a class="header-anchor" href="#日期操作" aria-hidden="true">#</a> 日期操作</h2>
<ul>
<li>两个时间相减 调用<code v-pre>Sub</code>方法</li>
<li>格式化时间不同于其他语言传入<code v-pre>YYMM</code>,需要传入固定时间<code v-pre>2006-01-02 15:04:05</code>进行格式化</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
    <span class="token string">"time"</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    now <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">// 获取现在时间</span>
    t <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">27</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token number">36</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>time<span class="token punctuation">.</span>UTC<span class="token punctuation">)</span> <span class="token comment">// 2023-03-27 01:25:36 +0000 UTC</span>
    t2 <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token number">2023.3</span><span class="token number">.27</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token number">36</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>time<span class="token punctuation">.</span>UTC<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Year</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>t<span class="token punctuation">.</span><span class="token function">Month</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>t<span class="token punctuation">.</span><span class="token function">Day</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>t<span class="token punctuation">.</span><span class="token function">Hour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>t<span class="token punctuation">.</span><span class="token function">Minute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//2023, March 27 1 25 </span>
    dif <span class="token operator">:=</span> t2<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token comment">// 时间相减</span>
    t<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">"2006-01-02 15:04:05"</span><span class="token punctuation">)</span> <span class="token comment">// 格式化时间</span>
    now<span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 当前时间戳</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="切片" tabindex="-1"><a class="header-anchor" href="#切片" aria-hidden="true">#</a> 切片</h2>
<blockquote>
<p>创建/初始化切片</p>
</blockquote>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">//1.声明切片</span>
   <span class="token keyword">var</span> s1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
   <span class="token keyword">if</span> s1 <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"是空"</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"不是空"</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 2.:=</span>
   s2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token comment">// 3.make()</span>
   <span class="token keyword">var</span> s3 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">,</span> s3<span class="token punctuation">)</span>
   <span class="token comment">// 4.初始化赋值</span>
   <span class="token keyword">var</span> s4 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s4<span class="token punctuation">)</span>
   s5 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s5<span class="token punctuation">)</span>
   <span class="token comment">// 5.从数组切片</span>
   arr <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
   <span class="token keyword">var</span> s6 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
   <span class="token comment">// 前包后不包</span>
   s6 <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">4</span><span class="token punctuation">]</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s6<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 通过make创建切片  创建了一个长度为2容量为5的切片</span>
<span class="token keyword">var</span> slice <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span>

<span class="token comment">// 初始化切片</span>
全局：
<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> slice0 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>start<span class="token punctuation">:</span>end<span class="token punctuation">]</span> 
<span class="token keyword">var</span> slice1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span>end<span class="token punctuation">]</span>        
<span class="token keyword">var</span> slice2 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>start<span class="token punctuation">:</span><span class="token punctuation">]</span>        
<span class="token keyword">var</span> slice3 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span> 
<span class="token keyword">var</span> slice4 <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>      <span class="token comment">//去掉切片的最后一个元素</span>
局部：
arr2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span>
slice5 <span class="token operator">:=</span> arr<span class="token punctuation">[</span>start<span class="token punctuation">:</span>end<span class="token punctuation">]</span>
slice6 <span class="token operator">:=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span>end<span class="token punctuation">]</span>        
slice7 <span class="token operator">:=</span> arr<span class="token punctuation">[</span>start<span class="token punctuation">:</span><span class="token punctuation">]</span>     
slice8 <span class="token operator">:=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>  
slice9 <span class="token operator">:=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">//去掉切片的最后一个元素</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>操作</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>s[n]</code></td>
<td>切片s中索引位置为n的项</td>
</tr>
<tr>
<td><code v-pre>s[:]</code></td>
<td>从切片s的索引0到<code v-pre>len(s)-1</code>处</td>
</tr>
<tr>
<td><code v-pre>s[start:]</code></td>
<td>从start到<code v-pre>len(s)-1</code></td>
</tr>
<tr>
<td><code v-pre>s[:end]</code></td>
<td>从0到end处</td>
</tr>
<tr>
<td><code v-pre>s[start:end]</code></td>
<td>从<code v-pre>start</code>到<code v-pre>end</code>处</td>
</tr>
<tr>
<td><code v-pre>s[start:end:max]</code></td>
<td>从<code v-pre>start</code>到<code v-pre>end cap=max-low</code>  <code v-pre>len=hight-low</code></td>
</tr>
<tr>
<td><code v-pre>len(s)</code></td>
<td>切片长度</td>
</tr>
<tr>
<td><code v-pre>cap(s)</code></td>
<td>切片</td>
</tr>
</tbody>
</table>
<blockquote>
<p>切片内存布局</p>
<p>读写操作实际目标是底层数组，只需注意索引号的差别</p>
</blockquote>
<p><img src="/Golang/slice.png" alt=""></p>
<h2 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作" aria-hidden="true">#</a> 文件操作</h2>
<h3 id="文件、目录是否存在" tabindex="-1"><a class="header-anchor" href="#文件、目录是否存在" aria-hidden="true">#</a> 文件、目录是否存在</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>path1 <span class="token operator">:=</span> <span class="token string">"xxxx/xxx"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于cap" tabindex="-1"><a class="header-anchor" href="#关于cap" aria-hidden="true">#</a> 关于cap</h3>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>超出原 slice.cap 限制，就会重新分配底层数组，即便原数组并未填满。</p>
</div>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    data <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
    s <span class="token operator">:=</span> data<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span>

    s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token comment">// 一次 append 两个值，超出 s.cap 限制。</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> data<span class="token punctuation">)</span>         <span class="token comment">// 重新分配底层数组，与原数组无关。</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 比对底层数组起始指针。</span>
<span class="token punctuation">}</span>
<span class="token comment">// [0 1 100 200] [0 1 2 3 4 0 0 0 0 0 0]</span>
<span class="token comment">// 0xc4200160f0 0xc420070060</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="go并发编程" tabindex="-1"><a class="header-anchor" href="#go并发编程" aria-hidden="true">#</a> Go并发编程</h2>
<p>go并发编程中有三个核心</p>
<ul>
<li>Goroutine <strong>协程</strong> 调用函数的时候在函数前加上<code v-pre>go</code>关键字即可</li>
<li>Channel</li>
<li>Sync</li>
</ul>
<h3 id="_1-1协程之间通信channel" tabindex="-1"><a class="header-anchor" href="#_1-1协程之间通信channel" aria-hidden="true">#</a> 1.1协程之间通信Channel</h3>
<p>提倡通过**通信共享内存（通道）**而不是共享内存实现通信（存在多个协程同时操作一个数据的情况）</p>
<p><img src="/Golang/routine.png" alt=""></p>
<h3 id="_1-2通道-通信共享内存" tabindex="-1"><a class="header-anchor" href="#_1-2通道-通信共享内存" aria-hidden="true">#</a> 1.2通道-通信共享内存</h3>
<p>通道分为两类</p>
<ul>
<li>有缓冲通道<code v-pre>make(chan int,通道大小example:2)</code>类似于快递格子，如果满了就没法放快递等待格子腾出来才行，典型的生产消费模型。</li>
<li>无缓冲通道<code v-pre>make(chan int)</code>,也被称为同步通道</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">CalSquare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	src <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	dest <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span>
		<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span> <span class="token punctuation">{</span>
			src <span class="token operator">&lt;-</span> i
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
		<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token keyword">range</span> src <span class="token punctuation">{</span>
			dest <span class="token operator">&lt;-</span> i <span class="token operator">*</span> i
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i<span class="token operator">:=</span> <span class="token keyword">range</span> dest <span class="token punctuation">{</span>
		<span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token number">0</span> <span class="token number">1</span> <span class="token number">4</span> <span class="token number">9</span> <span class="token number">16</span> <span class="token number">25</span> <span class="token number">36</span> <span class="token number">49</span> <span class="token number">64</span> <span class="token number">81</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3通信-共享内存" tabindex="-1"><a class="header-anchor" href="#_1-3通信-共享内存" aria-hidden="true">#</a> 1.3通信-共享内存</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">var</span> <span class="token punctuation">(</span>
	x <span class="token builtin">int64</span>
	lock sync<span class="token punctuation">.</span>Mutex
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">addWithLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">// 临界区资源上锁</span>
		x <span class="token operator">+=</span> <span class="token number">1</span>
		lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//释放临界区资源</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">addWithoutLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		x <span class="token operator">+=</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	x <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">addWithLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"addWithLock"</span><span class="token punctuation">,</span>x<span class="token punctuation">)</span>
	x <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">addWithoutLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"addWithoutLock"</span><span class="token punctuation">,</span>x<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
addWithLock <span class="token number">10000</span>
addWithoutLock <span class="token number">6550</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<h4 id="waitgroup" tabindex="-1"><a class="header-anchor" href="#waitgroup" aria-hidden="true">#</a> WaitGroup</h4>
</blockquote>
<p>之前防止主进程结束导致协程还没运行完就接触，我们采用<code v-pre>time.Sleep</code>,正确方式来了</p>
<p><img src="/Golang/waitGroup.png" alt=""></p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">helloRoutine</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"hello"</span> <span class="token operator">+</span> fmt<span class="token punctuation">.</span><span class="token function">Sprint</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">ManyGoWait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>j <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token function">helloRoutine</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">ManyGoWait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理" aria-hidden="true">#</a> 依赖管理</h2>
<p>Go依赖管理的演进GOPATH-&gt;GO Vendor -》Go Module</p>
<p>GOPATH和GO Vendor 都是采用源码副本方式管理依赖没有版本规则</p>
<p>依赖管理三要素：</p>
<ul>
<li>配置文件，描述依赖 go.mod</li>
<li>中心仓库管理依赖库 Proxy</li>
<li>本地工具 go get/go mod</li>
</ul>
<h3 id="gopath" tabindex="-1"><a class="header-anchor" href="#gopath" aria-hidden="true">#</a> GOPATH</h3>
<p><code v-pre>$GOPATH</code>工作区</p>
<ol>
<li>bin 项目编译的二进制文件</li>
<li>pkg 项目编译的中间产物，加速编译</li>
<li>src 项目源码</li>
</ol>
<p>这种管理方式，项目代码直接依赖src目录下的代码，然后通过<code v-pre>go get</code>下载最新包到src目录下</p>
<blockquote>
<h3 id="这种管理方式的缺点" tabindex="-1"><a class="header-anchor" href="#这种管理方式的缺点" aria-hidden="true">#</a> 这种管理方式的缺点</h3>
</blockquote>
<p>本地两个项目A,B  ；A和B依赖某一个PKG的不同版本，没法构建成功，无法实现多版本控制</p>
<h3 id="go-vendor" tabindex="-1"><a class="header-anchor" href="#go-vendor" aria-hidden="true">#</a> Go Vendor</h3>
<p>为了解决GOPATH的问题，该方式在项目目录下增加vendor文件，所有依赖包副本形式放在<code v-pre>项目根目录下/vendor</code>（如果没有找到就去<code v-pre>GOPATH</code>）,每个项目都引入一份依赖的副本就解决了依赖同包不同版本的问题</p>
<blockquote>
<h3 id="go-vendor问题" tabindex="-1"><a class="header-anchor" href="#go-vendor问题" aria-hidden="true">#</a> Go Vendor问题</h3>
</blockquote>
<p>如果A项目依赖pkg B和pkg C，而B和C同时依赖了pkg D的不同版本，我们无法控制其版本选择问题</p>
<p><img src="/Golang/vendor.png" alt=""></p>
<h3 id="go-module" tabindex="-1"><a class="header-anchor" href="#go-module" aria-hidden="true">#</a> Go Module</h3>
<p>通过<code v-pre>go.mod</code>文件管理依赖包版本，通过<code v-pre>go get/go mod</code>指令管理依赖包</p>
<blockquote>
<h4 id="go-mod的配置-类似于前端package-json" tabindex="-1"><a class="header-anchor" href="#go-mod的配置-类似于前端package-json" aria-hidden="true">#</a> go.mod的配置 类似于前端package.json</h4>
</blockquote>
<p><img src="/Golang/gomod.png" alt=""></p>
<blockquote>
<p>go mod工具</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>go mod init <span class="token comment">#初始化 创建go.mod文件，项目开始前的必备操作</span>
go mod download <span class="token comment">#下载模块到本地</span>
go mod tidy <span class="token comment">#增加需要的依赖，删除不需要的  每次提交代码前可以执行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="依赖分发proxy" tabindex="-1"><a class="header-anchor" href="#依赖分发proxy" aria-hidden="true">#</a> 依赖分发Proxy</h3>
<p>由于依赖一般放在github等代码托管平台，就会存在一些问题</p>
<ul>
<li>作者可能增删改软件的版本，无法保证构建稳定性</li>
<li>无法保证依赖可用性，作者可以删除</li>
<li>代码托管平台负载问题</li>
</ul>
<p>proxy会缓存原站的内容，版本也不会变。</p>
<p>当存在proxy项目依赖会先从proxy上查找，当proxy代理的地址没有时，就去direct源站</p>
<CommentService/><h2 id="反射" tabindex="-1"><a class="header-anchor" href="#反射" aria-hidden="true">#</a> 反射</h2>
<p>反射可以在函数运行时动态获取变量各种信息。通过反射可以修改变量值、调用关联的方法、获取结构体的信息等。</p>
<h2 id="go项目初始化" tabindex="-1"><a class="header-anchor" href="#go项目初始化" aria-hidden="true">#</a> go项目初始化</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>go mod init 名字
go mod tidy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装gorm</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>go get <span class="token parameter variable">-u</span> gorm.io/gorm
go get <span class="token parameter variable">-u</span> gorm.io/driver/sqlite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建models文件夹，该文件夹用于gorm创建表</p>
<h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h2>
<table>
<thead>
<tr>
<th style="text-align:left">标签</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>foreignKey</code></td>
<td style="text-align:left">Specifies the column name of the current model used as a foreign key in the join table.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>references</code></td>
<td style="text-align:left">Indicates the column name in the reference table that the foreign key of the join table maps to.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>polymorphic</code></td>
<td style="text-align:left">Defines the polymorphic type, typically the model name.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>polymorphicValue</code></td>
<td style="text-align:left">Sets the polymorphic value, usually the table name, if not specified otherwise.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>many2many</code></td>
<td style="text-align:left">Names the join table used in a many-to-many relationship.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>joinForeignKey</code></td>
<td style="text-align:left">Identifies the foreign key column in the join table that maps back to the current model’s table.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>joinReferences</code></td>
<td style="text-align:left">Points to the foreign key column in the join table that links to the reference model’s table.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>constraint</code></td>
<td style="text-align:left">Specifies relational constraints like <code v-pre>OnUpdate</code>, <code v-pre>OnDelete</code> for the association.</td>
</tr>
</tbody>
</table>
</div></template>


