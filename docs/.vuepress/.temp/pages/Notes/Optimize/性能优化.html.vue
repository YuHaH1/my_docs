<template><div><h1 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h1>
<h2 id="_1-如何提升首屏加载速度" tabindex="-1"><a class="header-anchor" href="#_1-如何提升首屏加载速度" aria-hidden="true">#</a> 1.如何提升首屏加载速度</h2>
<p><strong>减少首屏渲染时间的方法有很多，总的来讲可以分成两大部分 ：资源加载优化 和 页面渲染优化</strong></p>
<p><strong>1.什么是首屏时间？</strong></p>
<p>首屏时间（First Contentful Paint），指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容</p>
<p>首屏加载可以说是用户体验中<strong>最重要</strong>的环节</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>在页面渲染的过程，导致加载速度慢的因素可能如下：</p>
<ul>
<li>网络延时问题</li>
<li>资源文件体积是否过大</li>
<li>资源是否重复发送请求去加载了</li>
<li>加载脚本的时候，渲染内容堵塞了</li>
</ul>
</div>
<p>如果计算首屏加载时间</p>
<p>利用<code v-pre>performance.timing</code>提供的数据：</p>
<p>通过<code v-pre>DOMContentLoad</code>或者<code v-pre>performance</code>来计算出首屏时间</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 方案一：</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'DOMContentLoaded'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'first contentful painting'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 方案二：</span>
performance<span class="token punctuation">.</span><span class="token function">getEntriesByName</span><span class="token punctuation">(</span><span class="token string">"first-contentful-paint"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>startTime

<span class="token comment">// performance.getEntriesByName("first-contentful-paint")[0]</span>
<span class="token comment">// 会返回一个 PerformancePaintTiming的实例，结构如下：</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"first-contentful-paint"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">entryType</span><span class="token operator">:</span> <span class="token string">"paint"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">startTime</span><span class="token operator">:</span> <span class="token number">507.80000002123415</span><span class="token punctuation">,</span>
  <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2.解决方案</strong></p>
<p><strong>①分包</strong></p>
<p>常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加</p>
<p>在<code v-pre>vue-router</code>配置路由的时候，采用动态加载路由的形式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>     
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'Blogs'</span><span class="token punctuation">,</span>   
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ShowBlogs'</span><span class="token punctuation">,</span>    
    <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./components/ShowBlogs.vue'</span><span class="token punctuation">)</span> 
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件</p>
<p><strong>②静态资源本地缓存</strong></p>
<p>后端返回资源问题：</p>
<ul>
<li>采用<code v-pre>HTTP</code>缓存，设置<code v-pre>Cache-Control</code>，<code v-pre>Last-Modified</code>，<code v-pre>Etag</code>等响应头</li>
<li>采用<code v-pre>Service Worker</code>离线缓存</li>
</ul>
<p>前端合理利用<code v-pre>localStorage</code></p>
<p><strong>③UI框架按需加载</strong></p>
<p>在日常使用<code v-pre>UI</code>框架，例如<code v-pre>element-UI</code>、或者<code v-pre>antd</code>，我们经常性直接饮用整个<code v-pre>UI</code>库</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> ElementUI <span class="token keyword">from</span> <span class="token string">'element-ui'</span> Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但实际上我用到的组件只有按钮，分页，表格，输入与警告 所以我们要按需引用</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Button<span class="token punctuation">,</span> Input<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Table<span class="token punctuation">,</span> TableColumn<span class="token punctuation">,</span> MessageBox <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'element-ui'</span><span class="token punctuation">;</span> Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span> Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Input<span class="token punctuation">)</span> Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Pagination<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>④组件重复打包</strong></p>
<p>假设<code v-pre>A.js</code>文件是一个常用的库，现在有多个路由使用了<code v-pre>A.js</code>文件，这就造成了重复下载</p>
<p>解决方案：在<code v-pre>webpack</code>的<code v-pre>config</code>文件中，修改<code v-pre>CommonsChunkPlugin</code>的配置</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>minChunks: 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>minChunks</code>为3表示会把使用3次及以上的包抽离出来，放进公共依赖文件，避免了重复加载组件</p>
<p><strong>⑤图片压缩</strong></p>
<p>图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素</p>
<p>对于所有的图片资源，我们可以进行适当的压缩</p>
<p>对页面上使用到的<code v-pre>icon</code>，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻<code v-pre>http</code>请求压力。</p>
<p><strong>⑥GZIP压缩</strong></p>
<p>拆完包之后，我们再用<code v-pre>gzip</code>做一下压缩 安装<code v-pre>compression-webpack-plugin</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cnmp i compression-webpack-plugin -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code v-pre>vue.congig.js</code>中引入并修改<code v-pre>webpack</code>配置</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> CompressionPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'compression-webpack-plugin'</span><span class="token punctuation">)</span>

<span class="token function-variable function">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 为生产环境修改配置...</span>
            config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">'production'</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CompressionPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$|\.html$|\.css</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//匹配文件名</span>
                    <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">10240</span><span class="token punctuation">,</span> <span class="token comment">//对超过10k的数据进行压缩</span>
                    <span class="token literal-property property">deleteOriginalAssets</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">//是否删除原文件</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在服务器我们也要做相应的配置 如果发送请求的浏览器支持<code v-pre>gzip</code>，就发送给它<code v-pre>gzip</code>格式的文件 假设服务器是用<code v-pre>express</code>框架搭建的 只要安装一下<code v-pre>compression</code>就能使用</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> compression <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'compression'</span><span class="token punctuation">)</span> 
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">compression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// 在其他中间件使用之前调用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>⑦服务端渲染</strong></p>
<p>SSR（Server side ），也就是服务端渲染，组件或页面通过服务器生成html字符串，再发送到浏览器</p>
<p>从头搭建一个服务端渲染是很复杂的，<code v-pre>vue</code>应用建议使用<code v-pre>Nuxt.js</code>实现服务端渲染</p>
<p><strong>⑧DNF预解析</strong></p>
<p>如果您想要手动开启DNS预解析功能，可以在HTML文档中添加以下meta标签：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>x-dns-prefetch-control<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>on<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dns-prefetch<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>//example.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>&lt;meta&gt;</code>标签用于开启DNS预解析功能，<code v-pre>&lt;link&gt;</code>标签用于指定要预解析的域名。在这个例子中，<code v-pre>//example.com</code>表示要预解析的域名。</p>
<p>需要注意的是，DNS预解析功能可能会导致一些安全和隐私问题，例如DNS劫持和跟踪用户的浏览行为。因此，如果您要开启DNS预解析功能，请确保您信任要预解析的域名，并采取适当的安全措施。</p>
<p>当浏览器访问一个域名的时候，需要解析一次DNS，获得对应域名的ip地址。 在解析过程中，按照:</p>
<ul>
<li>浏览器缓存</li>
<li>系统缓存</li>
<li>路由器缓存</li>
<li>ISP(运营商)DNS缓存</li>
<li>根域名服务器</li>
<li>顶级域名服务器</li>
<li>主域名服务器</li>
</ul>
<p>的顺序逐步读取缓存，直到拿到IP地址。</p>
<p><code v-pre>dns-prefetch</code>就是在<strong>将解析后的IP缓存在系统中</strong>。这样，<code v-pre>dns-prefetch</code>就有效地缩短了DNS解析时间。因为，在本地操作系统做了DNS缓存，使得DNS在解析的过程中，提前在系统缓存中找到了对应IP。这样一来， 后续的解析步骤就不用执行了，进而也就缩短了DNS解析时间。</p>
<p>假如浏览器<strong>首次将一个域名解析为IP地址</strong>，并<strong>缓存至操作系统</strong>，那么下一次DNS解析时间可以低至<strong>0-1ms</strong>。倘若结果不缓存在系统，那么就需要读取<strong>路由器的缓存</strong>，进而后续的解析时间最小也要约<strong>15ms</strong>。如果路由器缓存也不存在，则需要读取<strong>ISP（运营商）DNS缓存</strong>，一般像<code v-pre>taobao.com</code>、<code v-pre>baidu.com</code>这些常见的域名，读取ISP（运营商）DNS缓存需要的时间在<strong>80-120ms</strong>，如果是不常见的域名，平均需要<strong>200-300ms</strong>。一般来说，大部分的网站到运营商这块都能找到IP。那也就是说，<code v-pre>dns-prefetch</code>可以给DNS解析过程带来15-300ms的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了</p>
<blockquote>
<p>浏览器缓存与DNS解析</p>
</blockquote>
<p>现代浏览器为了优化DNS解析，也设有了浏览器DNS缓存。每当在首次DNS解析后会对其IP进行缓存。至于缓存时长，每种浏览器都不一样，比如Chrome的过期时间是1分钟，在这个期限内不会重新请求DNS。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>每当Chrome浏览器启动的时候，就会自动的快速解析浏览器最近一次启动时记录的前10个域名。所以经常访问的网址就不存在DNS解析的延迟，进而打开速度更快。</p>
</div>
<p>而<code v-pre>dns-prefetch</code> 相当于在浏览器缓存之后，在本地操作系统中做了DNS缓存，个人理解，为的是给浏览器缓存做保障，尽量让DNS解析出本地，以此来做了又一层DNS解析优化。</p>
<p>一般来说，DNS在系统的缓存时间是大于浏览器的。</p>
<blockquote>
<p>TTL(Time-To-Live)，就是一条域名解析记录在DNS服务器中的存留时间</p>
</blockquote>
<ul>
<li><strong>浏览器DNS缓存的时间跟DNS服务器返回的TTL值无关</strong>, 它的缓存时间取决于浏览器自身设置。</li>
<li><strong>系统缓存会参考DNS服务器响应的TTL值，但是不完全等于TTL值</strong>。</li>
</ul>
<p>国内和国际上很多平台的TTL值都是以秒为单位的，很多的默认值都是3600，也就是默认缓存1小时。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>dns-prefetch</code>最大的缺点就是使用它太多,会导致过量的DNS解析，对网络是一种负担。</p>
</div>
<h2 id="_2-图片性能优化" tabindex="-1"><a class="header-anchor" href="#_2-图片性能优化" aria-hidden="true">#</a> 2.图片性能优化</h2>
<p><strong>①图片压缩</strong></p>
<p><strong>有损压缩</strong></p>
<p>有损压缩指在压缩文件大小的过程中，损失了一部分图片的信息，也即降低了图片的质量（即图片被压糊了），并且这种损失是不可逆的。常见的有损压缩手段是按照一定的算法将临近的像素点进行合并。压缩算法不会对图片所有的数据进行编码压缩，而是在压缩的时候，去除了人眼无法识别的图片细节。因此有损压缩可以在同等图片质量的情况下大幅降低图片的体积。例如 jpg 格式的图片使用的就是有损压缩。</p>
<p><strong>无损压缩</strong></p>
<p>无损压缩指的是在压缩图片的过程中，图片的质量没有任何损耗。我们任何时候都可以从无损压缩过的图片中恢复出原来的信息。压缩算法对图片的所有的数据进行编码压缩，能在保证图片的质量的同时降低图片的体积。例如 png、gif 使用的就是无损压缩。</p>
<p><strong>②雪碧图</strong></p>
<p>浏览器请求资源的时候，同源域名请求资源的时候有最大并发限制，chrome 为 6 个，就比如你的页面上有 10 个相同 CDN 域名小图片，那么需要发起 10 次请求去拉取，分两次并发。第一次并发请求回来后，发起第二次并发。如果你把 10 个小图片合并为一张大图片的画，那么只用一次请求即可拉取下来 10 个小图片的资源。减少服务器压力，减少并发，减少请求次数。</p>
<p><strong>③使用base64</strong></p>
<ul>
<li>提升性能: 网页上的每一个图片，都是需要消耗一个 http 请求下载而来的, 图片的下载始终都要向服务器发出请求，要是图片的下载不用向服务器发出请求，base64 可以随着 HTML 的下载同时下载到本地.减少 https 请求。</li>
<li>加密: 让用户一眼看不出图片内容 , 只能看到编码。</li>
<li>方便引用: 在多个文件同时使用某些图片时, 可以把图片转为 base64 格式的文件, 把样式放在全局中, 比如 common.css, 以后在用的时候就可以直接加类名, 二不需要多层找文件路径, 会提升效率</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。</p>
</div>
<p><strong>④使用CDN</strong></p>
<p>CDN 的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。</p>
<p><strong>⑤图片懒加载</strong></p>
<p>进入页面的时候，只请求可视区域的图片资源。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> imgs <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'img[data-src]'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rootMargin</span><span class="token operator">:</span> <span class="token string">'0px'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">entries<span class="token punctuation">,</span> self</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">entry</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>isIntersecting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> img <span class="token operator">=</span> entry<span class="token punctuation">.</span>target
      <span class="token keyword">let</span> src <span class="token operator">=</span> img<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>src
      <span class="token keyword">if</span> <span class="token punctuation">(</span>src<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        img<span class="token punctuation">.</span>src <span class="token operator">=</span> src
        img<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'data-src'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 解除观察</span>
      self<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span>

imgs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">image</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>⑥图片预加载</strong></p>
<p>将图片提前加载到本地缓存中，从而提升用户体验。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">preloader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>images<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> img1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> img2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> img3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    img1<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'http://domain.tld/path/to/image-001.gif'</span>
    img2<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'http://domain.tld/path/to/image-002.gif'</span>
    img3<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'http://domain.tld/path/to/image-003.gif'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">addLoadEvent</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> oldonload <span class="token operator">=</span> window<span class="token punctuation">.</span>onload
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window<span class="token punctuation">.</span>onload <span class="token operator">!=</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span>onload <span class="token operator">=</span> func
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>oldonload<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">oldonload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">addLoadEvent</span><span class="token punctuation">(</span>preloader<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


