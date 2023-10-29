import{_ as s,M as a,p as e,q as t,N as p,a1 as o}from"./framework-a97ca956.js";const c={},i=o(`<h1 id="浏览器相关面经" tabindex="-1"><a class="header-anchor" href="#浏览器相关面经" aria-hidden="true">#</a> 浏览器相关面经</h1><h2 id="_1-如何解决跨域" tabindex="-1"><a class="header-anchor" href="#_1-如何解决跨域" aria-hidden="true">#</a> 1.如何解决跨域</h2><p>什么是跨域？跨域是指浏览器限制了来自不同源（<u>协议、域名或端口</u>）的Web应用程序之间的访问。由于同源策略，Web浏览器通常只允许脚本从与包含它的文档具有相同源的服务器加载和发送数据。</p><h3 id="_1-jsonp" tabindex="-1"><a class="header-anchor" href="#_1-jsonp" aria-hidden="true">#</a> 1.JSONP</h3><p>利用<code>HTML</code>的<code>script</code>标签没有跨域限制，通过动态创建<code>script</code>标签，将<code>src</code>作为服务器的地址，由服务器返回一个回调并接收参数。前提前后端共同定义好回调的名字,浏览器会将服务端给的响应内容作为JavaScript代码执行。通过指定回调函数名，服务器端可以将数据封装在回调函数中返回给客户端，从而实现跨域数据传输。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token literal-property property">cb</span><span class="token operator">:</span>show<span class="token punctuation">}</span>
    <span class="token keyword">const</span> request <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;script&quot;</span><span class="token punctuation">)</span>
    request<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;http://localhost:3000&#39;</span><span class="token operator">+</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token parameter">server_data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">getElmentById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>textContent <span class="token operator">=</span> server_data
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-后端设置cors" tabindex="-1"><a class="header-anchor" href="#_2-后端设置cors" aria-hidden="true">#</a> 2.后端设置CORS</h3><p>如果服务器端在响应头中设置了<code>&quot;Access-Control-Allow-Origin&quot;:&quot;*&quot;</code>，无法种cookie一般不会用这种方式，可以指定地址会相对安全。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">&quot;Access-Control-Allow-Origin&quot;</span><span class="token operator">:</span><span class="token string">&quot;*&quot;</span>
    <span class="token property">&quot;Access-Control-Allow-Origin&quot;</span><span class="token operator">:</span><span class="token string">&quot;http:xxxx&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-proxy代理" tabindex="-1"><a class="header-anchor" href="#_3-proxy代理" aria-hidden="true">#</a> 3.proxy代理</h3><p>在vite.config.js中可以开启代理服务器，服务器和服务器之间不存在跨域，让代理服务器请求拿数据然后给我们。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">server</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">proxy</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span><span class="token punctuation">{</span>
                <span class="token literal-property property">target</span><span class="token operator">:</span><span class="token string">&quot;跨域的地址:http://localhost:8888&quot;</span><span class="token punctuation">,</span>
                <span class="token function-variable function">rewrite</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-nginx代理" tabindex="-1"><a class="header-anchor" href="#_4-nginx代理" aria-hidden="true">#</a> 4.nginx代理</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>在跨域请求中，浏览器会发送一个预检请求（Preflight Request），使用OPTIONS方法向目标服务器发送一个“试探性”的请求，以确定实际请求是否安全、合法和允许。在这个试探性请求中，浏览器会附带一些额外的请求头信息，例如<code>Origin</code>、<code>Access-Control-Request-Method</code>和<code>Access-Control-Request-Headers</code>等。</p><p>如果目标服务器允许跨域访问，就会返回一个包含CORS相关响应头的响应，例如<code>Access-Control-Allow-Origin</code>、<code>Access-Control-Allow-Methods</code>和<code>Access-Control-Allow-Headers</code>等。如果目标服务器不允许跨域访问，就会返回一个错误的响应，浏览器会拒绝实际的跨域请求。</p></div><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">8888</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Origin&#39;</span> <span class="token string">&#39;https://localhost:8000&#39;</span></span><span class="token punctuation">;</span>  <span class="token comment"># 允许https://localhost:8000跨域访问</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Methods&#39;</span> <span class="token string">&#39;GET, POST, OPTIONS&#39;</span></span><span class="token punctuation">;</span>  <span class="token comment"># 允许的请求方法</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Headers&#39;</span> <span class="token string">&#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;</span></span><span class="token punctuation">;</span>  <span class="token comment"># 允许的请求头</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = <span class="token string">&#39;OPTIONS&#39;</span>)</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Origin&#39;</span> <span class="token string">&#39;https://localhost:8000&#39;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Methods&#39;</span> <span class="token string">&#39;GET, POST, OPTIONS&#39;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Headers&#39;</span> <span class="token string">&#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Max-Age&#39;</span> <span class="token number">1728000</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Content-Type&#39;</span> <span class="token string">&#39;text/plain charset=UTF-8&#39;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Content-Length&#39;</span> <span class="token number">0</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">204</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function l(r,d){const n=a("CommentService");return e(),t("div",null,[i,p(n)])}const k=s(c,[["render",l],["__file","浏览器相关面经.html.vue"]]);export{k as default};
