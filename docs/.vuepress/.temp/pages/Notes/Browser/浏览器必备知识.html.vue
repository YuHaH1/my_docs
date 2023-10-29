<template><div><h1 id="浏览器必备知识" tabindex="-1"><a class="header-anchor" href="#浏览器必备知识" aria-hidden="true">#</a> 浏览器必备知识</h1>
<h2 id="_1-输入url会发生什么" tabindex="-1"><a class="header-anchor" href="#_1-输入url会发生什么" aria-hidden="true">#</a> 1.输入URL会发生什么？</h2>
<h3 id="_1-域名解析" tabindex="-1"><a class="header-anchor" href="#_1-域名解析" aria-hidden="true">#</a> 1.域名解析</h3>
<p>https://facyfish.top/Notes</p>
<ul>
<li>协议：<code v-pre>https</code></li>
<li>域名：<code v-pre>fancyfish.top</code></li>
<li>路径：<code v-pre>Notes</code></li>
<li>端口-隐藏：<code v-pre>443</code></li>
<li>锚点：<code v-pre>#comments</code></li>
<li>参数：<code v-pre>?a=123</code></li>
</ul>
<p>域名解析目的是什么？将域名解析成IP</p>
<p>如何解析？</p>
<p>1.浏览器缓存：浏览器会按照一定的频率缓存 DNS 记录。</p>
<p>2.操作系统缓存：如果浏览器缓存中找不到需要的 DNS 记录，那就去操作系统中找。</p>
<p>3.路由缓存：路由器也有 DNS 缓存。</p>
<p>4.ISP 的 DNS 服务器：ISP 是互联网服务提供商(Internet Service Provider)的简称，ISP 有专门的 DNS 服务器应对 DNS 查询请求。</p>
<p>根服务器：ISP 的 DNS 服务器还找不到的话，它就会向根服务器发出请求，进行递归查询</p>
<p>顶级域名服务器</p>
<p>权威域名服务器<strong>但是如果设置了CDN，前面的没找到不会找这里而是去只能DNS去找</strong></p>
<p><img src="/Browser/browser1.png" alt=""></p>
<ol>
<li>递归查询：我们的浏览器、操作系统、路由器都会缓存一些URL对应的IP地址，统称为DNS高速缓存。这是为了加快DNS解析速度，使得不必每次都到根域名服务器中去查询。</li>
<li>迭代查询：局部的DNS服务器并不会自己向其他服务器进行查询，而是把能够解析该域名的服务器IP地址返回给客户端，客户端会不断的向这些服务器进行查询，直到查询到了位置，迭代的话只会帮你找到相关的服务器，然后说我现在比较忙，你自己去找吧。</li>
</ol>
<h3 id="cdn优化方案" tabindex="-1"><a class="header-anchor" href="#cdn优化方案" aria-hidden="true">#</a> CDN优化方案</h3>
<p>CDN（Content Delivery Network）优化是指通过优化CDN的配置和使用方式来提高网站的性能和可靠性。下面是一些CDN优化的建议：</p>
<p>1.选择适合自己的CDN供应商：不同的CDN供应商在性能、功能、价格等方面都有所不同，因此应该根据自己的需求选择适合自己的CDN供应商。</p>
<p>2.使用多个CDN：使用多个CDN可以提高网站的可靠性和性能，因为这样可以避免单一点故障，并减少延迟和带宽瓶颈。</p>
<p>3.合理配置CDN缓存时间：合理配置CDN缓存时间可以减少请求次数和延迟，提高网站性能。但是，缓存时间太长会导致内容更新缓慢，缓存时间太短则会增加请求次数和延迟。</p>
<p>4.使用HTTP/2协议：HTTP/2可以提高网站性能，因为它支持多路复用、头部压缩、二进制传输等功能，可以减少请求次数和延迟。</p>
<p>5.启用CDN的Gzip压缩：启用CDN的Gzip压缩可以减少传输数据的大小，从而减少带宽使用和延迟。</p>
<h4 id="域名解析的优化" tabindex="-1"><a class="header-anchor" href="#域名解析的优化" aria-hidden="true">#</a> 域名解析的优化</h4>
<p><strong>1.使用dns-prefetch</strong></p>
<p>大型网站，有多个不同服务器资源的情况下，都可采取DNS预解析，提前解析，减少页面卡顿。使用域名预解析这里可以查看性能优化的笔记</p>
<p>2.<strong>DNS负载均衡</strong></p>
<p>当一个网站有多个服务器地址时，在应答DNS查询的时候，DNS服务器会对每个查询返回不同的解析结果，也就是返回不同的IP地址，从而把访问引导到不同的服务器上去，来达到负载均衡的目的。例如可以根据每台机器的负载量，或者该机器距离用户的地理位置距离等等条件。</p>
<h3 id="_2-发送tcp请求" tabindex="-1"><a class="header-anchor" href="#_2-发送tcp请求" aria-hidden="true">#</a> 2.发送TCP请求</h3>
<h4 id="_1-tcp三次握手" tabindex="-1"><a class="header-anchor" href="#_1-tcp三次握手" aria-hidden="true">#</a> 1.TCP三次握手</h4>
<p><strong>客户端发送一个带 SYN=1，Seq=X 的数据包到服务器端口</strong>（第一次握手，由浏览器发起，告诉服务器我要发送请求了）</p>
<p><strong>服务器发回一个带 SYN=1， ACK=X+1， Seq=Y 的响应包以示传达确认信息</strong>（第二次握手，由服务器发起，告诉浏览器我准备接受了，你赶紧发送吧）</p>
<p><strong>客户端再回传一个带 ACK=Y+1， Seq=Z 的数据包，代表“握手结束”</strong>（第三次握手，由浏览器发送，告诉服务器，我马上就发了，准备接受吧）</p>
<p>三次握手的原因：<strong>为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误</strong>”。</p>
<h3 id="_3-发送http请求" tabindex="-1"><a class="header-anchor" href="#_3-发送http请求" aria-hidden="true">#</a> 3.发送http请求</h3>
<p>请求html、css、js然后根据html生成dom树，css-&gt;cssom树 将dom+cssom结合生成渲染树，然后根据渲染树开始布局，布局完成后渲染页面，遇到js资源会阻塞css和html的解析与渲染。完成选然后释放TCP连接</p>
<h2 id="_2-cookie" tabindex="-1"><a class="header-anchor" href="#_2-cookie" aria-hidden="true">#</a> 2.Cookie</h2>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>跨站和跨域的概念————————</p>
<p>​	1.跨站 ：顶级域名和二级域名相同的为同站eg：<code v-pre>b.a.com   c.a.com</code></p>
<p>​	2.跨域 ：协议、域名、端口任何一个不同都属于跨域</p>
</div>
<p>Cookie 使基于<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview#http_%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%EF%BC%8C%E6%9C%89%E4%BC%9A%E8%AF%9D%E7%9A%84" target="_blank" rel="noopener noreferrer">无状态<ExternalLinkIcon/></a>的 HTTP 协议记录稳定的状态信息成为了可能。</p>
<p>cookie的删除操作<code v-pre>document.cookie=‘key=；max-age=-1’</code></p>
<h3 id="cookie基本属性" tabindex="-1"><a class="header-anchor" href="#cookie基本属性" aria-hidden="true">#</a> cookie基本属性</h3>
<p><code v-pre>httpOnly</code>设置了就无法通过js获取和操作改cookie，只能由服务端在set-cookie中设置</p>
<p><code v-pre>secure</code>只能用https协议传输</p>
<p><img src="/Browser/cookie.png" alt=""></p>
<p><code v-pre>Domain</code></p>
<p>​	1.中不携带协议和端口；</p>
<p>​	2.带<code v-pre>.</code>的domain标识该cookie可以作用域当前域及其子域（例如我在<code v-pre>a.com</code>中种下一个<code v-pre>cookie</code>设它的<code v-pre>domain</code>为<code v-pre>.a.com</code>,我在sub.a.com中就会存在该cookie）</p>
<p>​	3.如果新增cookie时没有带domain那么该cookie只作用域当前域，如果设置了<code v-pre>domain=a.com</code>那么实际它的域是<code v-pre>.a.com</code></p>
<p>​	4.子域设置的cookie可以在父域获取到。例如我在<code v-pre>sub.a.com</code>设置域 <code v-pre>domain=a.com</code>那么我在<code v-pre>a.com</code>就能看到该cookie</p>
<p><code v-pre>path</code></p>
<p>如果设置了cookie <code v-pre>path=/a</code>那么只有路径/a的时候才有该cookie，例如a.com/a</p>
<p><code v-pre>expires</code>和<code v-pre>max-age</code></p>
<p>expires指定时间失效</p>
<p>max-age多少秒后失效  <strong>max-age优先级更高</strong></p>
<p>如果设置为负值标识立即删除该cookie。如果一个cookie没有设置过期时间则默认是会话cookie当关闭浏览器就会删除。</p>
<p><code v-pre>samesite</code></p>
<p>取值在None Lax Strict之中，<u>只有在跨站请求才会起作用</u>。</p>
<ul>
<li>None表示无论是否跨站都会发送cookie</li>
<li>Strict跨站不携带cookie</li>
<li>Lax默认值，部分跨站情况下携带（a标签，预加载，get表单，iframe，AJAX，Image中会发送cookie）</li>
</ul>
<h2 id="浏览器原理" tabindex="-1"><a class="header-anchor" href="#浏览器原理" aria-hidden="true">#</a> 浏览器原理</h2>
<p>浏览器分为</p>
<ol>
<li>用户界面展示工具栏之外的用户界面内容</li>
<li>浏览器引擎：用户界面和渲染引擎之间传递数据
<ol>
<li>数据存储持久层</li>
</ol>
</li>
<li>渲染引擎：渲染页面（下面还有很多模块）
<ol>
<li>网络请求模块</li>
<li>js解释器，解析执行js</li>
</ol>
</li>
</ol>
<p>我们往往把渲染引擎称为浏览器的内核例如Safari的Webkit 谷歌的Blink ，IE的Trident</p>
<h3 id="浏览器的架构" tabindex="-1"><a class="header-anchor" href="#浏览器的架构" aria-hidden="true">#</a> 浏览器的架构</h3>
<p>早起浏览器采用单进程架构：</p>
<ul>
<li>一个进程中有页面线程负责渲染和展示</li>
<li>JS线程执行js代码</li>
<li>其他线程</li>
</ul>
<p>单进程的问题：</p>
<ul>
<li>一个线程的崩溃导致整个进程出问题</li>
<li>不安全，浏览器之间可以共享数据，JS线程能访问进程内的数据</li>
<li>运行效率低。每个线程负责工作太多</li>
</ul>
<hr>
<p>现代浏览器采用多进程架构：</p>
<ul>
<li>缓存进程：缓存数据例如cookie</li>
<li>浏览器进程：控制工具栏以及负责与浏览器的其他进程协调工作</li>
<li>网络进程：发起接收网络请求</li>
<li>GPU进程：负责浏览器页面渲染</li>
<li>插件进程：Flash插件，不是Chrome中的扩展</li>
<li>渲染进程：标签业内的所有内容</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Chrome有四种进程模型</p>
<ul>
<li>Process-per-site-instance：（默认情况，会为用户访问的每个站点实例创建一个渲染进程，这样可以确保来自不同站点的页面是独立呈现的，且对同一站点的访问也是彼此隔离的<strong>也就是访问不同站点，和同一站点不同页面都会创建新进程</strong>）
<ul>
<li>优点：这种模型的优点是当一个站点的进程崩溃时，其它站点的进程不会受到影响，且进程之间相互隔离。拥有高安全性和稳定性。</li>
<li>缺点：这种模型的缺点是如果打开了大量的站点，那么将会消耗大量的系统资源。</li>
</ul>
</li>
<li>Process-per-site：（这个模型与上述模型相似，但是不考虑标签页或窗口的数量，而是为每个不同站点创建一个独立的进程。这意味着<strong>同一个站点的所有标签页和窗口都在同一个进程中运行</strong>。）
<ul>
<li>优点：这种模型在资源共享和性能方面可能更有效</li>
<li>缺点：但隔离性相对较差。</li>
</ul>
</li>
<li>Process-per-tab：（每个标签页都在独立的进程中运行）</li>
<li>Single process：（单进程模型是一种简单的模型，整个浏览器所有的标签页和窗口都在一个进程中运行。）
<ul>
<li>优点：是资源消耗较低</li>
<li>缺点：隔离性较差，且一个标签页的崩溃可能导致整个浏览器崩溃。</li>
</ul>
</li>
</ul>
</div>
<h3 id="输入url浏览器内部会做什么" tabindex="-1"><a class="header-anchor" href="#输入url浏览器内部会做什么" aria-hidden="true">#</a> 输入URL浏览器内部会做什么</h3>
<p>1️⃣判断输入的是URL还是关键字，</p>
<ul>
<li>如果是URL则连接服务器获取数据</li>
<li>如果是关键词，浏览器使用默认配置搜索引擎查询</li>
</ul>
<p>2️⃣网络线程获取到数据后，会通过<code v-pre>SafeBrowsing</code>来检查站点是否是恶意站点，如果是会展示警告页面。安全校验通过就会通知UI线程</p>
<p>3️⃣UI线程创建一个渲染器进程来渲染页面，此时浏览器进程通过IPC管道将数据（html、css、js）传递给渲染器进程</p>
<p>4️⃣渲染器进程会分配资源</p>
<ul>
<li>主线程将<code v-pre>html解析</code>成DOM树，解析过程中遇到css和图片资源就下载或从缓存中直接加载且这个过程不会阻止<code v-pre>html解析</code>，如果遇到的是JS脚本就暂停html解析和渲染（防止js更改DOM）</li>
<li>然后解析css确定Dom节点计算样式根据css资源生成cssom树</li>
<li>然后将DOM树和CSSOM树结合形成render树</li>
<li>接下来建立布局树Layer树，需要知道每个节点放到页面哪个位置（设置了display：none的不会出现在布局树上），还需要知道按什么顺序绘制（不能根据DOM树的顺序结构绘制，因为有的节点设置了z-index ）</li>
<li>（知道了文档绘制顺序后需要将信息转成像素点，这个行为被称为<strong>栅格化</strong>，【早期栅格化，只栅格化用户可视区域的内容，但如果快速滚动会出现展示延迟问题。目前采用合成的方式，将页面分为多个图层，对图层进行栅格化】）主线程将Layer tree传递给合成器线程，然后合成器线程将每个图层栅格化，由于图层可能很大如果直接栅格化整个图层会影响性能，因此<strong>合成器将他们切分为许多图块，然后将图块发给栅格化线程，栅格线程栅格化每个图块并存储到GP中，当所有图块栅格化完成后合成器线程将收集的“draw quads”图块信息（该信息记录了图块的内存位置和该图块在页面中哪个位置被绘制），根据图块信息合成器线程会生成一个合成器帧，然后通过IPC将该帧传给浏览器进程，然后浏览器进程将合成器帧给GPU，由GPU绘制页面，此时就能看到页面了，当滚动页面会生成新的合成器帧然后再给到GPU绘制</strong></li>
</ul>
<p>总结：</p>
<ol>
<li>解析html生成DOM树</li>
<li>解析CSS生成CSSOM树</li>
<li>将DOM Tree+CSSOM Tree结合生成渲染树（布局树）</li>
<li>然后计算节点位置，计算渲染顺序</li>
<li>合成器线程划分图层，将每个图层分成图块，然后栅格化每个图块</li>
<li>图块栅格化完成后，合成器线程将收集的图块信息生成一个合成器帧，将该帧给浏览器进程再给GPU</li>
<li>然后GPU绘制渲染我们看到的页面</li>
</ol>
<h3 id="重排和重绘" tabindex="-1"><a class="header-anchor" href="#重排和重绘" aria-hidden="true">#</a> 重排和重绘</h3>
<p>当元素尺寸位置发生变化会重新进行样式计算，也就是上面的第二个步骤之后的会重新执行</p>
<p>重绘只会重新绘制性能消耗小</p>
<p>CSS属性Transform直接运行在合成器线程和栅格线程中不会影响主线程的执行，因此对性能有帮助</p>
<CommentService/></div></template>


