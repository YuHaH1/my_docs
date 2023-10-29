<template><div><h1 id="nest" tabindex="-1"><a class="header-anchor" href="#nest" aria-hidden="true">#</a> Nest</h1>
<p>nest中的服务负责处理业务逻辑，service服务于模块要放到module中</p>
<h2 id="nest-cli" tabindex="-1"><a class="header-anchor" href="#nest-cli" aria-hidden="true">#</a> Nest CLI</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @nestjs/cli
// 升级最新版本
<span class="token function">npm</span> update <span class="token parameter variable">-g</span> @nestjs/cli
//创建项目
nest new 项目名 <span class="token parameter variable">-p</span> <span class="token function">pnpm</span>
// 查看帮助
nest <span class="token parameter variable">-h</span> 
// 使用tsc或者webpack打包代码
nest build
//启动开发服务
nest start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nest-generate命令" tabindex="-1"><a class="header-anchor" href="#nest-generate命令" aria-hidden="true">#</a> nest generate命令</h3>
<p>nest 命令可以生成controller service module等</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nest generate module test_module
nest generate controller test_module
nest generate <span class="token function">service</span> test_module
<span class="token comment"># 上面三条命令等于下面一条</span>
nest generate resource test_module

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该命令会创建一个test_module文件夹和文件然后加入以下代码</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestModuleModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后自动在AppModule里导入创建的module</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.module'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>TestModuleModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令创建的spec文件是测试文件</p>
<h2 id="http的5种数据传输方式" tabindex="-1"><a class="header-anchor" href="#http的5种数据传输方式" aria-hidden="true">#</a> HTTP的5种数据传输方式</h2>
<ul>
<li>url param（<code v-pre>http://fancyfish.top/123</code>,123就是参数）</li>
<li>query(<code v-pre>http://fancyfish.top/?name=余&amp;age=24</code>?后面就是数据，有特殊字符的一般客户端会用<code v-pre>encodeURIComponent(‘余’)编码</code>)</li>
<li>form-urlencoded（表单提交数据，放在body中，<code v-pre>content-type=application/x-www-form-urlencoded</code>）</li>
<li>form-data（<code v-pre>content-type=multipart/form-data</code>）</li>
<li>json（<code v-pre>content-type=application/json</code>）</li>
</ul>
<h3 id="nest获取参数方式" tabindex="-1"><a class="header-anchor" href="#nest获取参数方式" aria-hidden="true">#</a> nest获取参数方式</h3>
<p>1️⃣url param</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'api/test-module'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestModuleController</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">':id'</span><span class="token punctuation">)</span>
    <span class="token function">urlParam</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Param</span></span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>id<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> id
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端</span>
axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/test-module/123'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2️⃣query</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'api/test-module'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestModuleController</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">'find'</span><span class="token punctuation">)</span>
    <span class="token function">query</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span>name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">)</span>age<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token operator">+</span>age
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端</span>
axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/test-module/find'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>params<span class="token operator">:</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token string">'ads'</span><span class="token punctuation">,</span>age<span class="token operator">:</span><span class="token number">123</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3️⃣form urlencoded</p>
<p>Nest使用<code v-pre>@Body</code>装饰器</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">CreateUserDto</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
    id<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'api/test-module'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestModuleController</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">body</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>userInfo<span class="token operator">:</span>CreateUserDto<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/api/test-module'</span><span class="token punctuation">,</span>
	Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token string">'ads'</span><span class="token punctuation">,</span>age<span class="token operator">:</span><span class="token number">123</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
    headers<span class="token operator">:</span><span class="token punctuation">{</span><span class="token string-property property">'content-type'</span><span class="token operator">:</span><span class="token string">'application/x-wwww-form-urlencoded'</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4️⃣JSON</p>
<p>服务端都是用<code v-pre>@body</code>接收参数，<code v-pre>form urlencoded</code>和<code v-pre>json</code>都是从<code v-pre>body</code>取值，Nest内部会根据<code v-pre>content type</code>使用不同解析方式</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">CreateUserDto</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
    id<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'api/test-module'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestModuleController</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">body</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>userInfo<span class="token operator">:</span>CreateUserDto<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/api/test-module'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token string">'ads'</span><span class="token punctuation">,</span>age<span class="token operator">:</span><span class="token number">123</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5️⃣form data</p>
<p>Nest解析form data使用FileInterceptor的拦截器，用@UseInterceptors装饰器启用，然后通过@UploadedFiles取参数.服务端会将接收到的文件存放到根目录的uploads文件夹下</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AnyFilesInterceptor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/platform-express'</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">CreateUserDto</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
    id<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'api/test-module'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestModuleController</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span>‘file’<span class="token punctuation">)</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">UseInterceptors</span></span><span class="token punctuation">(</span><span class="token function">AnyFilesInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">{</span>dest<span class="token operator">:</span><span class="token string">'uploads/'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">body</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>userInfo<span class="token operator">:</span>CreateUserDto<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'ads'</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'123'</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'files1'</span><span class="token punctuation">,</span>fileInput<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/api/test-module'</span><span class="token punctuation">,</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>headers<span class="token operator">:</span><span class="token punctuation">{</span><span class="token string-property property">'content-type'</span><span class="token operator">:</span><span class="token string">'multipart/form-data'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http状态码" tabindex="-1"><a class="header-anchor" href="#http状态码" aria-hidden="true">#</a> HTTP状态码</h2>
<p>在Nestjs中HTTP状态码都在<code v-pre>@nestjs/common</code>中</p>
<ul>
<li><code v-pre>BadRequestException</code></li>
<li><code v-pre>UnauthorizedException</code></li>
<li><code v-pre>NotFoundException</code></li>
<li><code v-pre>ForbiddenException</code></li>
<li><code v-pre>NotAcceptableException</code></li>
<li><code v-pre>RequestTimeoutException</code></li>
<li><code v-pre>ConflictException</code></li>
<li><code v-pre>GoneException</code></li>
<li><code v-pre>HttpVersionNotSupportedException</code></li>
<li><code v-pre>PayloadTooLargeException</code></li>
<li><code v-pre>UnsupportedMediaTypeException</code></li>
<li><code v-pre>UnprocessableEntityException</code></li>
<li><code v-pre>InternalServerErrorException</code></li>
<li><code v-pre>NotImplementedException</code></li>
<li><code v-pre>ImATeapotException</code></li>
<li><code v-pre>MethodNotAllowedException</code></li>
<li><code v-pre>BadGatewayException</code></li>
<li><code v-pre>ServiceUnavailableException</code></li>
<li><code v-pre>GatewayTimeoutException</code></li>
<li><code v-pre>PreconditionFailedException</code></li>
</ul>
<h2 id="ioc-inverse-of-control" tabindex="-1"><a class="header-anchor" href="#ioc-inverse-of-control" aria-hidden="true">#</a> IOC（Inverse Of Control）</h2>
<p>反转控制，解决依赖关系痛点</p>
<p>后端系统中，会有很多对象：</p>
<ul>
<li>Controller 对象：接收 http 请求，调用 Service，返回响应</li>
<li>Service 对象：实现业务逻辑</li>
<li>Repository 对象：实现对数据库的增删改查</li>
</ul>
<p>Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息。在应用初始化的时候，需要理清依赖的先后关系，创建一大堆对象组合起来，还要保证不要多次 new，是不是很麻烦？解决这个痛点的方式就是 IOC（Inverse Of Control）。java 的 Spring 就实现了 IOC，Nest 也同样实现了。</p>
<p>IOC 机制是在 class 上标识哪些是可以被注入的，它的依赖是什么，然后从入口开始扫描这些对象和依赖，自动创建和组装对象。</p>
<p>Nest 里通过 @Controller 声明可以被注入的 controller，通过 @Injectable 声明可以被注入也可以注入别的对象的 provider，然后在 @Module 声明的模块里引入。</p>
<p>并且 Nest 还提供了 Module 和 Module 之间的 import，可以引入别的模块的 provider 来注入。</p>
<h2 id="service-providers" tabindex="-1"><a class="header-anchor" href="#service-providers" aria-hidden="true">#</a> Service=Providers</h2>
<p>提供者是Nest的一个基本概念。许多基本的Nest类可以被视为提供者——服务、存储库、工厂、助手等等。提供者的主要思想是它可以作为依赖注入，这意味着对象之间可以创建各种各样的关系，并且“连接”这些对象的功能可以在很大程度上委托给Nest运行时系统。</p>
<p><img src="/Nest/providers.png" alt=""></p>
<h3 id="创建服务" tabindex="-1"><a class="header-anchor" href="#创建服务" aria-hidden="true">#</a> 创建服务</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nest g <span class="token function">service</span> cats
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//cats.service.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Cat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./interfaces/cat.interface'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsService</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">readonly</span> cats<span class="token operator">:</span> Cat<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token function">create</span><span class="token punctuation">(</span>cat<span class="token operator">:</span> Cat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cats<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cat<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Cat<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cats<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//interfaces/cat.interface.tsJS</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  breed<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注册服务" tabindex="-1"><a class="header-anchor" href="#注册服务" aria-hidden="true">#</a> 注册服务</h3>
<p>现在我们已经定义了一个提供者(CatsService)，并且有了该服务的消费者(CatsController)，我们需要向Nest注册该服务，以便它可以执行注入。我们通过编辑模块文件(app.module.ts)并将服务添加到@Module装饰器的providers数组中来实现这一点。</p>
<p>我们的控制器一般处理路由，如果需要在控制器中注册服务如何做？在Moduel中将服务提供出去</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats/cats.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats/cats.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsService<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在controller中注入服务<code v-pre>private catsService: CatsService</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//cats.controller.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Post<span class="token punctuation">,</span> Body <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CreateCatDto <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./dto/create-cat.dto'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Cat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./interfaces/cat.interface'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'cats'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> catsService<span class="token operator">:</span> CatsService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">async</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> createCatDto<span class="token operator">:</span> CreateCatDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>catsService<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>createCatDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">async</span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Cat<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>catsService<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="optional-providers" tabindex="-1"><a class="header-anchor" href="#optional-providers" aria-hidden="true">#</a> Optional providers</h3>
<p>偶尔，您可能会有不需要解析的依赖项。例如，您的类可能依赖于配置对象，但如果没有传递，则应使用默认值。在这种情况下，依赖项成为可选的，此时缺少配置提供程序不会导致错误。要指出一个提供程序是可选的，可以在构造函数的签名中使用@Optional()装饰器。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> Optional<span class="token punctuation">,</span> Inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HttpService<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Optional</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token decorator"><span class="token at operator">@</span><span class="token function">Inject</span></span><span class="token punctuation">(</span><span class="token string">'HTTP_OPTIONS'</span><span class="token punctuation">)</span> <span class="token keyword">private</span> httpClient<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基于属性注入依赖" tabindex="-1"><a class="header-anchor" href="#基于属性注入依赖" aria-hidden="true">#</a> 基于属性注入依赖</h3>
<p>在一些非常特殊的情况下，基于属性的注入可能很有用。例如，如果您的顶级类依赖于一个或多个提供程序，那么通过在构造函数的子类中调用super()来传递它们是非常繁琐的。为了避免这种情况，你可以在属性级别使用@Inject()装饰器。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> Inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HttpService<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Inject</span></span><span class="token punctuation">(</span><span class="token string">'HTTP_OPTIONS'</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token keyword">readonly</span> httpClient<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务的循环依赖" tabindex="-1"><a class="header-anchor" href="#服务的循环依赖" aria-hidden="true">#</a> 服务的循环依赖</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// DddService.service.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CccService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./ccc.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DddService</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> cccService<span class="token operator">:</span> CccService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token function">ddd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cccService<span class="token punctuation">.</span><span class="token function">ccc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">+</span> <span class="token string">'ddd'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// CccService.service.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> DddService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./ddd.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CccService</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> dddService<span class="token operator">:</span> DddService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token function">ccc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">'ccc'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">eee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>dddService<span class="token punctuation">.</span><span class="token function">ddd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'eee'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决办法</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DddsService</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Inject</span></span><span class="token punctuation">(</span><span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> CccService<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> cccService<span class="token operator">:</span> CccService<span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CccService</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Inject</span></span><span class="token punctuation">(</span><span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DddService<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> dddService<span class="token operator">:</span> DddService<span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="module" tabindex="-1"><a class="header-anchor" href="#module" aria-hidden="true">#</a> Module</h2>
<p><img src="/Nest/Modules_1.png" alt=""></p>
<p>每个应用程序至少有一个模块，即根模块。根模块是Nest用来构建应用程序图的起点——这是Nest用来解析模块和提供者关系及依赖关系的内部数据结构。虽然非常小的应用程序理论上可能只有根模块，但这并不是典型的情况。我们要强调的是，强烈推荐使用模块作为组织组件的有效方法。因此，对于大多数应用程序，最终的体系结构将使用多个模块，每个模块。封装一组密切相关的功能。</p>
<p>模块是一个带@Module装饰器的类。@Module装饰器提供了Nest用来组织应用程序结构的元数据。</p>
<h3 id="feature-module功能模块" tabindex="-1"><a class="header-anchor" href="#feature-module功能模块" aria-hidden="true">#</a> Feature Module功能模块</h3>
<p><code v-pre>CatsController</code>属于<code v-pre>CatsService</code>同一应用程序域。由于它们密切相关，因此将它们移至功能模块中是有意义的。功能模块只是组织与特定功能相关的代码，保持代码组织并建立清晰的边界。这有助于我们管理复杂性并按照<a href="https://en.wikipedia.org/wiki/SOLID" target="_blank" rel="noopener noreferrer">可靠的<ExternalLinkIcon/></a>原则进行开发，特别是随着应用程序和/或团队规模的增长。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//cats/cats.module.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsService<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">//app.module.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats/cats.module'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CatsModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在文件中定义了<code v-pre>cats.module.ts</code>，并将与该模块相关的所有内容都移到了<code v-pre>cats</code>目录中。我们需要做的事是将此模块导入到根模块（文件<code v-pre>AppModule</code>中定义的 , <code v-pre>app.module.ts</code>）</p>
<p>目录结构如下</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>src
	cats
		dto
			create<span class="token operator">-</span>cat<span class="token punctuation">.</span>dto<span class="token punctuation">.</span>ts
		interfaces
			cat<span class="token punctuation">.</span>interface<span class="token punctuation">.</span>ts
		cats<span class="token punctuation">.</span>controller<span class="token punctuation">.</span>ts
		cats<span class="token punctuation">.</span>module<span class="token punctuation">.</span>ts
		cats<span class="token punctuation">.</span>service<span class="token punctuation">.</span>ts
	app<span class="token punctuation">.</span>module<span class="token punctuation">.</span>ts
main<span class="token punctuation">.</span>ts

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工厂函数" tabindex="-1"><a class="header-anchor" href="#工厂函数" aria-hidden="true">#</a> 工厂函数</h3>
<p>如果你的服务依赖另一个服务，那可以定义一个工厂函数，工厂函数的参数会接收其他服务。如下</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.module'</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">DBserver</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>TestModuleModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    AppService<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token string">'TestFactory'</span><span class="token punctuation">,</span>
      inject<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 该工厂函数需要用的服务注入进去</span>
      <span class="token function">useFactory</span><span class="token punctuation">(</span>injecters<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>injecters<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DBserver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模块共享" tabindex="-1"><a class="header-anchor" href="#模块共享" aria-hidden="true">#</a> 模块共享</h3>
<p><img src="/Nest/Shared_Module_1.png" alt=""></p>
<p>每个模块自动成为一个共享模块。一旦创建，它就可以被任何模块重用。假设我们想要在其他几个模块之间共享CatsService的一个实例。为了做到这一点，我们首先需要通过将其添加到模块的exports数组中来导出CatsService provider，如下所示:</p>
<p>如果A模块想使用B模块（主要是针对于B模块的服务），那B模块需要暴露出去自己的服务</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// cats.module.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsService<span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span> <span class="token punctuation">[</span>CatsService<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，任何导入CatsModule的模块都可以访问CatsService，并将与导入它的所有其他模块共享同一个实例。</p>
<h4 id="循环依赖" tabindex="-1"><a class="header-anchor" href="#循环依赖" aria-hidden="true">#</a> 循环依赖</h4>
<p>如果两个module之间互相导入,会报错</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//Amodule</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    imports<span class="token operator">:</span><span class="token punctuation">[</span>BModule<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//Bmodule</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    imports<span class="token operator">:</span><span class="token punctuation">[</span>AModule<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决办法转发模块</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//Amodule</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    imports<span class="token operator">:</span><span class="token punctuation">[</span>
    	<span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>BModule<span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//Bmodule</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    imports<span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>AModule<span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动态模块" tabindex="-1"><a class="header-anchor" href="#动态模块" aria-hidden="true">#</a> 动态模块</h3>
<p>什么是静态模块。Nest 将模块连接在一起所需的所有信息都已在主机和使用模块中声明。静态模块绑定，使用模块没有机会<strong>影响</strong>主机模块中提供程序的配置方式。为什么这很重要？</p>
<p><strong>什么是动态模块</strong>？考虑这样的情况：我们有一个通用模块，需要在不同的用例中表现不同。这类似于许多系统中的“插件”概念，其中通用设施需要进行一些配置才能被消费者使用。</p>
<p>Nest 模块系统包含一个名为 <strong>动态模块</strong> 的强大功能。 此功能使你能够轻松创建可自定义的模块，这些模块可以动态注册和配置提供程序。 动态模块 <strong>extend</strong> 返回的属性（而不是覆盖）<code v-pre>@Module()</code> 装饰器中定义的基本模块元数据。 这就是静态声明的 <code v-pre>Connection</code> 提供程序 <strong>and</strong> 和动态生成的存储库提供程序从模块中导出的方式。如果要在全局作用域内注册动态模块，请将 <code v-pre>global</code> 属性设置为 <code v-pre>true</code>。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//// config.module.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> DynamicModule<span class="token punctuation">,</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ConfigService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./config.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ConfigModule</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">register</span><span class="token punctuation">(</span>options<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token operator">:</span> DynamicModule <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      module<span class="token operator">:</span> ConfigModule<span class="token punctuation">,</span>
      providers<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          provide<span class="token operator">:</span> <span class="token string">'CONFIG_OPTIONS'</span><span class="token punctuation">,</span>
          useValue<span class="token operator">:</span> options<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        ConfigService<span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      exports<span class="token operator">:</span> <span class="token punctuation">[</span>ConfigService<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// config.service.ts</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> dotenv <span class="token keyword">from</span> <span class="token string">'dotenv'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> fs <span class="token keyword">from</span> <span class="token string">'fs'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> path <span class="token keyword">from</span> <span class="token string">'path'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> Inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> EnvConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./interfaces'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ConfigService</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">readonly</span> envConfig<span class="token operator">:</span> EnvConfig<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Inject</span></span><span class="token punctuation">(</span><span class="token string">'CONFIG_OPTIONS'</span><span class="token punctuation">)</span> <span class="token keyword">private</span> options<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> filePath <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">||</span> <span class="token string">'development'</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.env</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> envFile <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../../'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>folder<span class="token punctuation">,</span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>envConfig <span class="token operator">=</span> dotenv<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>envFile<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>envConfig<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 其他模块中动态使用</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ConfigModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./config/config.module'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>ConfigModule<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">{</span> folder<span class="token operator">:</span> <span class="token string">'./config'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们剩下的任务是以某种方式将<code v-pre>register()</code>步骤中的<code v-pre>options</code>对象注入到<code v-pre>ConfigService</code>中，当然，我们将使用<code v-pre>dependency injection</code>来完成它。这是一个关键点，所以一定要理解它。我们的<code v-pre>ConfigModule</code>提供了<code v-pre>ConfigService</code>。<code v-pre>ConfigService</code>又依赖于仅在运行时提供的<code v-pre>options</code>对象。因此，在运行时，我们需要首先将options对象绑定到Nest loC容器，然后将Nest注入到ConfigService中。记住，在自定义提供程序一章中，提供程序可以包含任何值，而不仅仅是服务，所以我们可以使用依赖注入来处理简单的<code v-pre>options object</code>。让我们首先处理将选项对象绑定到loC容器的问题。我们在静态<code v-pre>register()</code>方法中这样做。记住，我们正在动态地构造一个模块，模块的一个属性会访问它的提供商列表。我们需要做的是将options对象定义为一个提供者。这将使它可以注入到ConfigService中，我们将在下一步中利用它。在下面的代码中，请注意providers数组:</p>
<p>总结：动态模块相当于在我们的模块上绑定静态方法，通过调用该静态方法，返回一些模块。</p>
<h4 id="动态模块的默认标准" tabindex="-1"><a class="header-anchor" href="#动态模块的默认标准" aria-hidden="true">#</a> 动态模块的默认标准</h4>
<p>您可能已经在一些enestjs/包中看到了forRoot、register和forfeature等方法的使用，并且可能想知道这些方法的区别是什么。关于这一点没有硬性规定，但是enestjs/包尝试遵循这些指导原则:当创建一个带有:</p>
<ul>
<li>
<p><code v-pre>register</code>：用一次模块传一次配置，比如这次调用是 <code v-pre>BbbModule.register({aaa:1})</code>，下一次就是 <code v-pre>BbbModule.register({aaa:2})</code> 了。</p>
</li>
<li>
<p><code v-pre>forRoot</code>:配置一次模块用多次，比如 <code v-pre>XxxModule.forRoot({})</code> 一次，之后就一直用这个 Module，一般在 AppModule 里 import</p>
</li>
<li>
<p><code v-pre>forFeature</code>:用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。</p>
</li>
</ul>
<h3 id="全局模块" tabindex="-1"><a class="header-anchor" href="#全局模块" aria-hidden="true">#</a> 全局模块</h3>
<p>如果你必须在所有地方导入相同的模块集，它会变得乏味。 与 Nest 不同，<a href="https://angular.io/" target="_blank" rel="noopener noreferrer">Angular<ExternalLinkIcon/></a><code v-pre>providers</code> 是在全局作用域内注册的。 一旦定义，它们随处可用。 然而，Nest 将提供程序封装在模块作用域内。 如果不首先导入封装模块，则无法在其他地方使用模块的提供程序。当你想提供一组开箱即用的提供程序时（例如，助手、数据库连接等），请使用 <code v-pre>@Global()</code> 装饰器制作模块 <strong>global</strong>。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module<span class="token punctuation">,</span> Global <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats.service'</span><span class="token punctuation">;</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Global</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsService<span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span> <span class="token punctuation">[</span>CatsService<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>@Global()</code> 装饰器使模块具有全局作用域。 全局模块应注册为 <strong>只有一次</strong>，一般由根或核心模块注册。 在上面的示例中，<code v-pre>CatsService</code> 提供程序将无处不在，希望注入服务的模块将不需要在其导入数组中导入 <code v-pre>CatsModule</code>。</p>
<p>使用的时候不必<code v-pre>imports</code>引入了</p>
<h3 id="提供者injected" tabindex="-1"><a class="header-anchor" href="#提供者injected" aria-hidden="true">#</a> 提供者injected</h3>
<p>在NestJS中，&quot;injected providers&quot;（被注入的提供者）是指通过依赖注入（Dependency Injection）机制注入到类中的可重用对象或服务。通过将依赖项注入到类中，我们可以解决以下问题：</p>
<ol>
<li>代码重复：通过将公共逻辑封装在提供者中，我们可以在多个类中共享这些功能，避免了代码的重复编写。</li>
<li>松耦合：通过依赖注入，类与具体实现细节解耦，提高了代码的可维护性和可测试性。我们可以更容易地替换或模拟依赖项，以进行单元测试或集成测试。</li>
<li>可扩展性：通过注入提供者，我们可以轻松地扩展应用程序，添加新的功能或模块，而无需修改现有的类。</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>要使用 CLI 创建服务，只需执行 <code v-pre>nest g service cats</code> 命令即可。</p>
</div>
<p>提供者可以提供service也可提供一些数据。</p>
<p>提供服务eg：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Injectable<span class="token punctuation">,</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">DatabaseService</span> <span class="token punctuation">{</span>
  <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Data from database'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">AppService</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">readonly</span> databaseService<span class="token operator">:</span> DatabaseService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">getDataFromDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>databaseService<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">,</span> DatabaseService<span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 引入DatabaseService服务</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">AppController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">readonly</span> appService<span class="token operator">:</span> AppService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>appService<span class="token punctuation">.</span><span class="token function">getDataFromDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提供数据eg：（可以提供任意数据类型），引用的时候要使用  <code v-pre>@Inject(提供服务的的provide值) </code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.module'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>TestModuleModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    AppService<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token string">'TestFactory'</span><span class="token punctuation">,</span>
      inject<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token function">useFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">r</span><span class="token punctuation">(</span><span class="token string">'2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token string">'ProvideValue'</span><span class="token punctuation">,</span>
      useValue<span class="token operator">:</span> <span class="token string">'ProvideValue提供的数据'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token comment">//</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> Inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppService</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Inject</span></span><span class="token punctuation">(</span><span class="token string">'ProvideValue'</span><span class="token punctuation">)</span> <span class="token keyword">private</span> provideValue<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    <span class="token keyword">private</span> cs<span class="token operator">:</span> TestModuleService<span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
  <span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>provideValue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步服务提供" tabindex="-1"><a class="header-anchor" href="#异步服务提供" aria-hidden="true">#</a> 异步服务提供</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.module'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>TestModuleModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    AppService<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token string">'TestFactory'</span><span class="token punctuation">,</span>
      inject<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token function">useFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">r</span><span class="token punctuation">(</span><span class="token string">'2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> Controller</h2>
<p><strong>作用</strong>：控制器负责处理传入的请求并向客户端返回响应。控制器就是控制路由的，其目的是接收应用的特定请求。 <strong>routing</strong> 机制控制哪个控制器接收哪些请求。 通常，每个控制器都有不止一条路由，不同的路由可以执行不同的操作。</p>
<p>创建一个基本的控制器，要使用类和装饰器。装饰器将类与所需的元数据关联起来，并使Nest能够创建路由映射(将请求绑定到相应的控制器)。</p>
<p>提示为了快速创建带有内置验证的CRUD控制器，您可以使用CLI的CRUD生成器:<code v-pre>nest g resource [name]</code></p>
<h3 id="创建控制器" tabindex="-1"><a class="header-anchor" href="#创建控制器" aria-hidden="true">#</a> 创建控制器</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nest g controller cats
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>@Controller()</code> 装饰器，来定义一个基本控制器。 我们将指定 <code v-pre>cats</code> 的可选路由路径前缀。 在 <code v-pre>@Controller()</code> 装饰器中使用路径前缀可以让我们轻松地对一组相关路由进行分组，并最大限度地减少重复代码。 例如，我们可以选择将一组路由分组，这些路由管理与路由 <code v-pre>/cats</code> 下的猫实体的交互。 在这种情况下，我们可以在 <code v-pre>@Controller()</code> 装饰器中指定路径前缀 <code v-pre>cats</code>，这样我们就不必为文件中的每个路由重复该部分路径。</p>
<p><code v-pre>cats</code>将作为这个路由分组的公共前缀</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'cats'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'This action returns all cats'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>要使用 CLI 创建控制器，只需执行 <code v-pre>nest g controller [name]</code> 命令。</p>
</div>
<h3 id="注册控制器" tabindex="-1"><a class="header-anchor" href="#注册控制器" aria-hidden="true">#</a> 注册控制器</h3>
<p>在定义了上述控制器之后，Nest仍然不知道catscontroller存在，因此不会创建该类的实例。控制器总是属于一个模块，这就是我们在@Module()装饰器中包含控制器数组的原因。因为除了根模块AppModule之外，我们还没有定义任何其他模块，所以我们将用它来引入CatsController:</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//app.module.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CatsController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./cats/cats.controller'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>CatsController<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="请求和响应对象" tabindex="-1"><a class="header-anchor" href="#请求和响应对象" aria-hidden="true">#</a> 请求和响应对象</h3>
<p>处理程序通常需要访问客户端 <strong>request</strong> 的详细信息。 Nest 提供对底层平台请求对象的访问（默认为 Express）。 我们可以通过将 <code v-pre>@Req()</code> 装饰器添加到处理程序的签名来指示 Nest 注入它来访问请求对象。</p>
<p><strong>为了利用 <code v-pre>express</code> 类型（如下面的 <code v-pre>request: Request</code> 参数示例），安装 <code v-pre>@types/express</code> 包。</strong></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Req <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'express'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'cats'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Req</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> request<span class="token operator">:</span> Request<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'This action returns all cats'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="请求对象" tabindex="-1"><a class="header-anchor" href="#请求对象" aria-hidden="true">#</a> 请求对象</h4>
<p>处理程序通常需要访问客户端 <strong>request</strong> 的详细信息。 Nest 提供对底层平台 <a href="https://express.nodejs.cn/en/api.html#req" target="_blank" rel="noopener noreferrer">请求对象<ExternalLinkIcon/></a> 的访问（默认为 Express）。 我们可以通过将 <code v-pre>@Req()</code> 装饰器添加到处理程序的签名来指示 Nest 注入它来访问请求对象。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Req <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'express'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'cats'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Req</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> request<span class="token operator">:</span> Request<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'This action returns all cats'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求对象表示 HTTP 请求，并具有请求查询字符串、参数、HTTP 标头和正文的属性（阅读更多 <a href="https://express.nodejs.cn/en/api.html#req" target="_blank" rel="noopener noreferrer">此处<ExternalLinkIcon/></a>）。 在大多数情况下，没有必要手动获取这些属性。 我们可以使用开箱即用的专用装饰器，例如 <code v-pre>@Body()</code> 或 <code v-pre>@Query()</code>。 下面是提供的装饰器列表和它们代表的普通平台特定对象。</p>
<table>
<thead>
<tr>
<th><code v-pre>@Request(), @Req()</code></th>
<th><code v-pre>req</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>@Response(), @Res()</code>*****</td>
<td><code v-pre>res</code></td>
</tr>
<tr>
<td><code v-pre>@Next()</code></td>
<td><code v-pre>next</code></td>
</tr>
<tr>
<td><code v-pre>@Session()</code></td>
<td><code v-pre>req.session</code></td>
</tr>
<tr>
<td><code v-pre>@Param(key?: string)</code></td>
<td><code v-pre>req.params</code> / <code v-pre>req.params[key]</code></td>
</tr>
<tr>
<td><code v-pre>@Body(key?: string)</code></td>
<td><code v-pre>req.body</code> / <code v-pre>req.body[key]</code></td>
</tr>
<tr>
<td><code v-pre>@Query(key?: string)</code></td>
<td><code v-pre>req.query</code> / <code v-pre>req.query[key]</code></td>
</tr>
<tr>
<td><code v-pre>@Headers(name?: string)</code></td>
<td><code v-pre>req.headers</code> / <code v-pre>req.headers[name]</code></td>
</tr>
<tr>
<td><code v-pre>@Ip()</code></td>
<td><code v-pre>req.ip</code></td>
</tr>
<tr>
<td><code v-pre>@HostParam()</code></td>
<td><code v-pre>req.hosts</code></td>
</tr>
</tbody>
</table>
<h4 id="响应相关" tabindex="-1"><a class="header-anchor" href="#响应相关" aria-hidden="true">#</a> 响应相关</h4>
<p>1️⃣响应对象</p>
<p>为了与跨底层 HTTP 平台（例如 Express 和 Fastify）的类型兼容，Nest 提供了 <code v-pre>@Res()</code> 和 <code v-pre>@Response()</code> 装饰器。 <code v-pre>@Res()</code> 只是 <code v-pre>@Response()</code> 的别名。</p>
<p>当使用响应对象为了兼容底层HTTP平台(例如Express和fasttify)的类型，Nest提供了@Res()和@Response()装饰器。@Res()只是@Response()的别名。在使用它们时，应该为底层库(例如@types/express)导入类型。请注意，<strong>当方法处理程序中注入@Res()或@Response()时，当这样做时，你必须通过调用响应对象(例如，res. json(…)或者res.send(…)来发出某种响应，否则HTTP服务器将挂起。</strong></p>
<p>2️⃣状态码</p>
<p>默认情况下响应 <strong>状态码</strong> 始终为 <strong>200</strong>，但 POST 请求除外，其为 <strong>201</strong>。 我们可以通过在处理程序级别添加 <code v-pre>@HttpCode(...)</code> 装饰器来轻松更改此行为。</p>
<p>3️⃣响应头</p>
<p>要指定自定义响应标头，你可以使用 <code v-pre>@Header()</code> 装饰器或库特定的响应对象（并直接调用 <code v-pre>res.header()</code>）。</p>
<p>例如<code v-pre>@Header('Cache-Control', 'none')</code>从 <code v-pre>@nestjs/common</code> 包中导入 <code v-pre>Header</code>。</p>
<p>4️⃣重定向</p>
<p>要将响应重定向到特定 URL，你可以使用 <code v-pre>@Redirect()</code> 装饰器或库特定的响应对象（并直接调用 <code v-pre>res.redirect()</code>）。</p>
<p><code v-pre>@Redirect()</code> 有两个参数，<code v-pre>url</code> 和 <code v-pre>statusCode</code>，两者都是可选的。 如果省略，<code v-pre>statusCode</code> 的默认值为 <code v-pre>302</code> (<code v-pre>Found</code>)。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Redirect</span></span><span class="token punctuation">(</span><span class="token string">'https://nest.nodejs.cn'</span><span class="token punctuation">,</span> <span class="token number">301</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回值将覆盖传递给 <code v-pre>@Redirect()</code> 装饰器的任何参数。 例如：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">'docs'</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Redirect</span></span><span class="token punctuation">(</span><span class="token string">'https://nest.nodejs.cn'</span><span class="token punctuation">,</span> <span class="token number">302</span><span class="token punctuation">)</span>
<span class="token function">getDocs</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'version'</span><span class="token punctuation">)</span> version<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">&amp;&amp;</span> version <span class="token operator">===</span> <span class="token string">'5'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">'https://nest.nodejs.cn/v5/'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dto数据传输对象" tabindex="-1"><a class="header-anchor" href="#dto数据传输对象" aria-hidden="true">#</a> DTO数据传输对象</h2>
<p>但首先(如果你使用TypeScript)，我们需要确定DTO(数据传输对象)模式。DTO是定义如何通过网络发送数据的对象。我们可以通过使用TypeScript接口或简单的类来确定DTO模式。有趣的是，我们建议在这里使用类。为什么?类是JavaScript ES6标准的一部分，因此它们在编译后的JavaScript中被保存为真实的实体。另一方面，由于TypeScript接口在编译过程中被删除，所以Nest不能在运行时引用它们。这一点很重要，因为pipe等特性在运行时访问变量的元类型时启用了其他可能性。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//create-cat.dto.ts</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CreateCatDto</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  breed<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//cats.controller.ts</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> createCatDto<span class="token operator">:</span> CreateCatDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">'This action adds a new cat'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建dto的控制器" tabindex="-1"><a class="header-anchor" href="#创建dto的控制器" aria-hidden="true">#</a> 创建DTO的控制器</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Query<span class="token punctuation">,</span> Post<span class="token punctuation">,</span> Body<span class="token punctuation">,</span> Put<span class="token punctuation">,</span> Param<span class="token punctuation">,</span> Delete <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CreateCatDto<span class="token punctuation">,</span> UpdateCatDto<span class="token punctuation">,</span> ListAllEntities <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./dto'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'cats'</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">create</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> createCatDto<span class="token operator">:</span> CreateCatDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'This action adds a new cat'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> query<span class="token operator">:</span> ListAllEntities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">This action returns all cats (limit: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>query<span class="token punctuation">.</span>limit<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> items)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">':id'</span><span class="token punctuation">)</span>
  <span class="token function">findOne</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Param</span></span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span> id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">This action returns a #</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> cat</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Put</span></span><span class="token punctuation">(</span><span class="token string">':id'</span><span class="token punctuation">)</span>
  <span class="token function">update</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Param</span></span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span> id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> updateCatDto<span class="token operator">:</span> UpdateCatDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">This action updates a #</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> cat</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Delete</span></span><span class="token punctuation">(</span><span class="token string">':id'</span><span class="token punctuation">)</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Param</span></span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span> id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">This action removes a #</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> cat</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中间件" tabindex="-1"><a class="header-anchor" href="#中间件" aria-hidden="true">#</a> 中间件</h2>
<p><img src="/Nest/middleware.png" alt=""></p>
<p>Nest自定义中间件必须实现<code v-pre>NestMiddleware</code>,定义<code v-pre>use</code>方法。下面是具体实现方法以及全局中间件的定义方式。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> NestMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Request<span class="token punctuation">,</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'express'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyMiddleware</span> <span class="token keyword">implements</span> <span class="token class-name">NestMiddleware</span> <span class="token punctuation">{</span>
  <span class="token function">use</span><span class="token punctuation">(</span>req<span class="token operator">:</span> Request<span class="token punctuation">,</span> res<span class="token operator">:</span> Response<span class="token punctuation">,</span> <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'brefore'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'after'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 然后在Module中使用</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module<span class="token punctuation">,</span>MiddlewareConsumer<span class="token punctuation">,</span>NestModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>MyMiddleware<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./MyMiddleware'</span>


<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>AppService<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token keyword">implements</span> <span class="token class-name">NestModule</span><span class="token punctuation">{</span>
	<span class="token function">configure</span><span class="token punctuation">(</span>consumer<span class="token operator">:</span>MiddlewareConsumer<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">consumer</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>MyMiddleware<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forRoutes</span><span class="token punctuation">(</span><span class="token string">'*'</span><span class="token punctuation">)</span><span class="token comment">//全局中间件对所有路由都生效</span>
        <span class="token function">consumer</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>MyMiddleware<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forRoutes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span><span class="token string">'user*'</span><span class="token punctuation">,</span>method<span class="token operator">:</span>RequestMethod<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment">//对所有用户路由的GET请求生效</span>
    <span class="token punctuation">}</span>
     <span class="token function">consumer</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>MyMiddleware<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exclude</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span><span class="token string">'user'</span><span class="token punctuation">,</span>method<span class="token operator">:</span>RequestMethod<span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forRoutes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span><span class="token string">'hello'</span><span class="token punctuation">,</span>method<span class="token operator">:</span>RequestMethod<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment">//对所有hello路由生效并排除掉user路由</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="filter过滤器" tabindex="-1"><a class="header-anchor" href="#filter过滤器" aria-hidden="true">#</a> filter过滤器</h2>
<p>对错误进行捕获并返回自定义格式的内容。Exception Filter 是在 Nest 应用抛异常的时候，捕获它并返回一个对应的响应。比如路由找不到时返回 404；参数的错误返回 400；服务端报错时返回 500。</p>
<p>我们可以在控制器中抛出异常</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BadRequestException</span><span class="token punctuation">(</span><span class="token string">'缺少参数id'</span><span class="token punctuation">)</span>
<span class="token comment">/*客户端会收到
{
    "message":'缺少参数id',
    "error":"Bad Request",
    "statusCode":400
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过过滤器自定义异常处理。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nest g filter testFilter <span class="token parameter variable">--flat</span> --no-spec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ArgumentsHost<span class="token punctuation">,</span> BadRequestException<span class="token punctuation">,</span> Catch<span class="token punctuation">,</span> ExceptionFilter<span class="token punctuation">,</span> HttpException <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'express'</span><span class="token punctuation">;</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Catch</span></span><span class="token punctuation">(</span>BadRequestException<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">testFilter</span> <span class="token keyword">implements</span> <span class="token class-name">ExceptionFilter</span> <span class="token punctuation">{</span>
  <span class="token function">catch</span><span class="token punctuation">(</span>exception<span class="token operator">:</span> BadRequestException<span class="token punctuation">,</span> host<span class="token operator">:</span> ArgumentsHost<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token keyword">const</span> http <span class="token operator">=</span> host<span class="token punctuation">.</span><span class="token function">switchToHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> response <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">getResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span>Response<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> statusCode <span class="token operator">=</span> exception<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span>statusCode<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
       code<span class="token operator">:</span> statusCode<span class="token punctuation">,</span>
       message<span class="token operator">:</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">,</span>
       error<span class="token operator">:</span> <span class="token string">'Bad Request'</span><span class="token punctuation">,</span>
       xxx<span class="token operator">:</span> <span class="token number">111</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>catch(exception: 要捕获异常的类型)</code></p>
<p>由于过滤器会覆盖掉我们对ATO 管道的验证信息。因此需要做特殊处理</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ArgumentsHost<span class="token punctuation">,</span> BadRequestException<span class="token punctuation">,</span> Catch<span class="token punctuation">,</span> ExceptionFilter<span class="token punctuation">,</span> HttpException <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'express'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Catch</span></span><span class="token punctuation">(</span>HttpException<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HelloFilter</span> <span class="token keyword">implements</span> <span class="token class-name">ExceptionFilter</span> <span class="token punctuation">{</span>
  <span class="token function">catch</span><span class="token punctuation">(</span>exception<span class="token operator">:</span> HttpException<span class="token punctuation">,</span> host<span class="token operator">:</span> ArgumentsHost<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> http <span class="token operator">=</span> host<span class="token punctuation">.</span><span class="token function">switchToHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> response <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">getResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span>Response<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> statusCode <span class="token operator">=</span> exception<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> res <span class="token operator">=</span> exception<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token punctuation">{</span> message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    
    response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span>statusCode<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
       code<span class="token operator">:</span> statusCode<span class="token punctuation">,</span>
       message<span class="token operator">:</span> res<span class="token operator">?.</span>message<span class="token operator">?.</span>join <span class="token operator">?</span> res<span class="token operator">?.</span>message<span class="token operator">?.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span> <span class="token operator">:</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">,</span>
       error<span class="token operator">:</span> <span class="token string">'Bad Request'</span><span class="token punctuation">,</span>
       xxx<span class="token operator">:</span> <span class="token number">111</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义异常" tabindex="-1"><a class="header-anchor" href="#自定义异常" aria-hidden="true">#</a> 自定义异常</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ArgumentsHost<span class="token punctuation">,</span> Catch<span class="token punctuation">,</span> ExceptionFilter<span class="token punctuation">,</span> HttpStatus <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'express'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UnLoginException</span><span class="token punctuation">{</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>message<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Catch</span></span><span class="token punctuation">(</span>UnLoginException<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UnloginFilter</span> <span class="token keyword">implements</span> <span class="token class-name">ExceptionFilter</span> <span class="token punctuation">{</span>
  <span class="token function">catch</span><span class="token punctuation">(</span>exception<span class="token operator">:</span> UnLoginException<span class="token punctuation">,</span> host<span class="token operator">:</span> ArgumentsHost<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> response <span class="token operator">=</span> host<span class="token punctuation">.</span><span class="token function">switchToHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">getResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span>Response<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span>HttpStatus<span class="token punctuation">.</span><span class="token constant">UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      code<span class="token operator">:</span> HttpStatus<span class="token punctuation">.</span><span class="token constant">UNAUTHORIZED</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'fail'</span><span class="token punctuation">,</span>
      data<span class="token operator">:</span> exception<span class="token punctuation">.</span>message <span class="token operator">||</span> <span class="token string">'用户未登录'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
然后在<span class="token constant">APP</span> <span class="token keyword">module</span>注册
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.controller'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span>  <span class="token punctuation">{</span>UnloginFilter<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./x'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  controllers<span class="token operator">:</span> <span class="token punctuation">[</span>AppController<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
      AppService<span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
          provide<span class="token operator">:</span><span class="token constant">APP_FILTER</span><span class="token punctuation">,</span>
          useClass<span class="token operator">:</span>UnloginFilter
      <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token comment">// 然后在app 控制器中可以抛出异常</span>
<span class="token keyword">throw</span> <span class="token function">UnLoginException</span><span class="token punctuation">(</span><span class="token string">'用户暂未登录'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>总结</strong></p>
<ul>
<li>
<p>通过 @Catch 指定要捕获的异常，然后在 catch 方法里拿到异常信息，返回对应的响应。<strong>如果捕获的是 HttpException，要注意兼容下 ValidationPipe 的错误格式的处理。</strong></p>
</li>
<li>
<p>filter 可以通过 @UseFilters 加在 handler 或者 controller 上，也可以在 main.ts 用 app.useGlobalFilters 全局启用。</p>
</li>
<li>
<p>如果 filter 要注入其他 provider，就要通过 AppModule 里注册一个 token 为 APP_FILTER 的 provider 的方式。</p>
</li>
<li>
<p>此外，捕获的 Exception 也是可以自定义的。这样，我们就可以自定义异常和异常返回的响应格式了。</p>
</li>
</ul>
<h3 id="全局启用过滤器" tabindex="-1"><a class="header-anchor" href="#全局启用过滤器" aria-hidden="true">#</a> 全局启用过滤器</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.module'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>HelloFilter<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./testFilter.filter'</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
    app<span class="token punctuation">.</span><span class="token function">useGlobalFilters</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">testFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="局部启用过滤器" tabindex="-1"><a class="header-anchor" href="#局部启用过滤器" aria-hidden="true">#</a> 局部启用过滤器</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span>UseFilters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>HelloFilter<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./testFilter.filter'</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">UseFilters</span></span><span class="token punctuation">(</span>HelloFilter<span class="token punctuation">)</span><span class="token comment">//整个user路由过滤</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> cs<span class="token operator">:</span> TestModuleService<span class="token punctuation">,</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> appService<span class="token operator">:</span> AppService<span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">UseFilters</span></span><span class="token punctuation">(</span>HelloFilter<span class="token punctuation">)</span><span class="token comment">// user的get请求过滤</span>
  <span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>appService<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cs<span class="token punctuation">.</span><span class="token function">commonService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pip管道" tabindex="-1"><a class="header-anchor" href="#pip管道" aria-hidden="true">#</a> pip管道</h2>
<p><a href="https://docs.nestjs.com/pipes" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p><strong>管道是一个带有<code v-pre>@Injectable()</code>装饰器的类，它实现了<code v-pre>PipeTransform</code>接口</strong></p>
<p><strong>使用场景</strong>：对客户端参数做验证</p>
<p>Pipe 是在参数传给 handler 之前做一些验证和转换的，有 9 个内置的 Pipe 可以直接用。在 pipe 里可以拿到装饰器和 handler 参数的各种信息，基于这些来实现校验和转换就是很简单的事情了。Pipe 是在参数传给 handler 之前对参数做一些验证和转换的 class</p>
<p><strong>对于post请求需要使用ValidationPipe</strong></p>
<p>内置的 Pipe 有这些：它们都实现了 PipeTransform 接口：</p>
<ul>
<li>ParseIntPipe（将参数转为整数，如果传入不能parse的参数会报错）</li>
<li>ParseBoolPipe（将参数转为bool值）</li>
<li>ParseArrayPipe</li>
<li>ParseUUIDPipe</li>
<li>DefaultValuePipe</li>
<li>ParseEnumPipe</li>
<li>ParseFloatPipe</li>
<li>ParseFilePipe和ValidationPipe（详见下面）</li>
</ul>
<h3 id="指定管道转换失败的状态码" tabindex="-1"><a class="header-anchor" href="#指定管道转换失败的状态码" aria-hidden="true">#</a> 指定管道转换失败的状态码</h3>
<p>例如<code v-pre>ParseIntPipe</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">create</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ParseIntPipe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>errorHttpStatusCode<span class="token operator">:</span>HttpStatus<span class="token punctuation">.</span><span class="token constant">NOT_FOUND</span><span class="token punctuation">}</span><span class="token punctuation">)</span>age<span class="token operator">:</span><span class="token builtin">number</span> <span class="token punctuation">)</span><span class="token operator">:</span>age<span class="token punctuation">{</span>
    <span class="token keyword">return</span> age<span class="token operator">+</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果转换失败就会将状态码置为404</p>
<h3 id="在管道中抛异常" tabindex="-1"><a class="header-anchor" href="#在管道中抛异常" aria-hidden="true">#</a> 在管道中抛异常</h3>
<p>可以自己抛一个异常出来，然后让 exception filter 处理：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">test</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ParseIntPipe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">exceptionFactory</span><span class="token operator">:</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token operator">=></span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">MyFilter</span><span class="token punctuation">(</span><span class="token string">'xxx'</span><span class="token operator">+</span>msg<span class="token punctuation">,</span>HttpStatus<span class="token punctuation">.</span><span class="token constant">NOT_IMPLEMENTED</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> age<span class="token operator">:</span><span class="token builtin">string</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局管道" tabindex="-1"><a class="header-anchor" href="#全局管道" aria-hidden="true">#</a> 全局管道</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.module'</span><span class="token punctuation">;</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
    app<span class="token punctuation">.</span><span class="token function">useGlobalPipes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="管道验证参数例子" tabindex="-1"><a class="header-anchor" href="#管道验证参数例子" aria-hidden="true">#</a> 管道验证参数例子</h3>
<h4 id="装饰器验证" tabindex="-1"><a class="header-anchor" href="#装饰器验证" aria-hidden="true">#</a> 装饰器验证</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> class-validator class-transformer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">BaseContent</span><span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">MinLength</span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">MaxLength</span></span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    name<span class="token operator">:</span><span class="token builtin">string</span>
    
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Contains</span></span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span><span class="token comment">//id字段必须包含id</span>
    id<span class="token operator">:</span><span class="token builtin">string</span>
    
<span class="token punctuation">}</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
user<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">'sad'</span>
user<span class="token punctuation">.</span>id<span class="token operator">=</span><span class="token string">'id21213'</span>
<span class="token function">validate</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>errors<span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>errors<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="将参数数组每一项转成number" tabindex="-1"><a class="header-anchor" href="#将参数数组每一项转成number" aria-hidden="true">#</a> 将参数数组每一项转成Number</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">)</span>
<span class="token function">test</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'arr'</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ParseArrayPipe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>items<span class="token operator">:</span>Number<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    arr<span class="token operator">:</span><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定 item 的类型。这样就把数组每一项处理为 number 了。</p>
<h4 id="指定参数分隔符" tabindex="-1"><a class="header-anchor" href="#指定参数分隔符" aria-hidden="true">#</a> 指定参数分隔符</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">)</span>
<span class="token function">test</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'arr'</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ParseArrayPipe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>sperator<span class="token operator">:</span><span class="token string">''</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    arr<span class="token operator">:</span><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>url必须类似于localhost:3000/arr?arr=a..b..c，否则报错</p>
<h4 id="指定枚举参数" tabindex="-1"><a class="header-anchor" href="#指定枚举参数" aria-hidden="true">#</a> 指定枚举参数</h4>
<p>指定枚举参数有两个好处</p>
<ul>
<li>限制参数的取值范围</li>
<li>直接做类型转换，转换成枚举的类型（下面的123直接整型）</li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> ESeason<span class="token punctuation">{</span>
    <span class="token string">'1'</span><span class="token operator">=</span><span class="token string">'spring'</span><span class="token punctuation">,</span>
    <span class="token string">'2'</span><span class="token operator">=</span><span class="token string">'summer'</span><span class="token punctuation">,</span>
    <span class="token string">'3'</span><span class="token operator">=</span><span class="token string">'fall'</span><span class="token punctuation">,</span>
    <span class="token string">'4'</span><span class="token operator">=</span><span class="token string">'winter'</span>
    <span class="token string">'5'</span><span class="token operator">=</span><span class="token number">123</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">)</span>
<span class="token function">test</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'arr'</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ParseEnumPipe</span><span class="token punctuation">(</span>ESeason<span class="token punctuation">)</span><span class="token punctuation">)</span>
    arr<span class="token operator">:</span>ESeason
<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>url中必须携带枚举中的任意一个localhost:3000/arr/spring</p>
<h3 id="自定义管道" tabindex="-1"><a class="header-anchor" href="#自定义管道" aria-hidden="true">#</a> 自定义管道</h3>
<p>自己写一个 pipe 也很简单，就是实现 PipeTransform 接口的 transform 方法，它的返回值就是传给 handler 的值。</p>
<p>自己实现一个将参数转成整数的管道</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nest g pipe testPip <span class="token parameter variable">--flat</span> --no-spec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ArgumentMetadata<span class="token punctuation">,</span> Injectable<span class="token punctuation">,</span> PipeTransform <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TestPipPipe</span> <span class="token keyword">implements</span> <span class="token class-name">PipeTransform</span> <span class="token punctuation">{</span>
  <span class="token function">transform</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> metadata<span class="token operator">:</span> ArgumentMetadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//在handler中</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">'user/:id'</span><span class="token punctuation">)</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Query</span></span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">,</span>TestPipPipe<span class="token punctuation">)</span>age<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Param</span></span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">,</span>TestPipPipe<span class="token punctuation">)</span>id<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span>metadata<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//  123 {metatype:[Function:Number],type:'param',data:id}</span>

<span class="token comment">//  2333 {metatype:[Function:Number],type:'query',data:'age'}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>url：<code v-pre>localhost:3000/user/123?age=2333</code></p>
<h3 id="validationpipe" tabindex="-1"><a class="header-anchor" href="#validationpipe" aria-hidden="true">#</a> ValidationPipe</h3>
<p>post 请求的数据是通过 @Body 装饰器来取，并且要有一个 dto class 来接收：（dto就是一个类，定义前段传递的参数类型即可）</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserDTO</span><span class="token punctuation">{</span>
    username<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span>
    password<span class="token operator">:</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">)</span>
<span class="token function">create</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>user<span class="token operator">:</span>UserDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端传递的body就会打印出来</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果前端的username传递数字也可以接收，而这可能会导致后续逻辑出错，此时我们可以用<code v-pre>ValidationPipe</code> 验证DTO它需要两个依赖包：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclass-validator" target="_blank" rel="noopener noreferrer">class-validator<ExternalLinkIcon/></a> 包提供了基于装饰器声明的规则对对象做校验的功能;而 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclass-transformer" target="_blank" rel="noopener noreferrer">class-transformer<ExternalLinkIcon/></a> 则是把一个普通对象转换为某个 class 的实例对象的.</p>
<p>原理：<strong>我们声明了参数的类型为 dto 类，pipe 里拿到这个类，把参数对象通过 class-transformer 转换为 dto 类的对象，之后再用 class-validator 包来对这个对象做验证。</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> class-validator class-transformer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserDTO</span><span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">isString</span></span>
    username<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span>
    password<span class="token operator">:</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Post</span></span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">)</span>
<span class="token function">create</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">Body</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ValidationPipe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>user<span class="token operator">:</span>UserDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//前端传递的body就会打印出来</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="dto-data-transfer-object" tabindex="-1"><a class="header-anchor" href="#dto-data-transfer-object" aria-hidden="true">#</a> DTO（Data Transfer Object）</h4>
<p>DTO代表数据传输对象（Data Transfer Object）</p>
<p>DTO对象通常是只读的，不包含业务逻辑，主要用于数据的封装和传输。它可以包含与业务实体相对应的属性，但通常只包含必要的数据，以减少网络传输的开销，并且可以避免不必要的数据暴露。</p>
<h2 id="guards" tabindex="-1"><a class="header-anchor" href="#guards" aria-hidden="true">#</a> Guards</h2>
<p><strong>守卫是有<code v-pre>@injectable</code>装饰器的类，实现了CanActivate接口</strong></p>
<p><strong>使用场景</strong>：决定客户端请求是否交给某路由处理，一般用于做角色和权限验证。</p>
<p><strong>守卫相对于中间件区别</strong>:守卫可以访问<code v-pre>ExecutionContext</code>实例，因此可以确切知道接下来要执行什么。而中间件 next函数后并不知道接下来调用哪个处理程序。</p>
<p><strong>执行时机</strong>：guard在所有中间件之后执行，但在任何拦截器或pipe.之前执行</p>
<p>守卫需要返回布尔值决定是否接受该请求</p>
<h3 id="定义一个守卫" tabindex="-1"><a class="header-anchor" href="#定义一个守卫" aria-hidden="true">#</a> 定义一个守卫</h3>
<p><code v-pre>validateRequest</code>函数由自己定义根据请求<code v-pre>request</code>决定是否接收该请求。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> CanActivate<span class="token punctuation">,</span> ExecutionContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AuthGuard</span> <span class="token keyword">implements</span> <span class="token class-name">CanActivate</span> <span class="token punctuation">{</span>
  <span class="token function">canActivate</span><span class="token punctuation">(</span>
    context<span class="token operator">:</span> ExecutionContext<span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">|</span> Observable<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> request <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">switchToHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">validateRequest</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="控制器级别的守卫" tabindex="-1"><a class="header-anchor" href="#控制器级别的守卫" aria-hidden="true">#</a> 控制器级别的守卫</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> CanActivate<span class="token punctuation">,</span> ExecutionContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RolesGuard</span> <span class="token keyword">implements</span> <span class="token class-name">CanActivate</span> <span class="token punctuation">{</span>
  <span class="token function">canActivate</span><span class="token punctuation">(</span>
    context<span class="token operator">:</span> ExecutionContext<span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">|</span> Observable<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@UseGuards()装饰器是从@nestjs/common包中导入的。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> UseGuards <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">'cats'</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">UseGuards</span></span><span class="token punctuation">(</span>RolesGuard<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局守卫" tabindex="-1"><a class="header-anchor" href="#全局守卫" aria-hidden="true">#</a> 全局守卫</h3>
<p>全局守卫有两种方式</p>
<p>1️⃣这种方式无法在守卫构造函数中注入依赖</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// main.ts</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">useGlobalGuards</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RolesGuard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2️⃣如果需要使用其他依赖则推荐这种方式</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//app.module.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Module <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">APP_GUARD</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/core'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Module</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token constant">APP_GUARD</span><span class="token punctuation">,</span>
      useClass<span class="token operator">:</span> RolesGuard<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reflector和metadata" tabindex="-1"><a class="header-anchor" href="#reflector和metadata" aria-hidden="true">#</a> Reflector和Metadata</h2>
<p><strong>使用场景</strong>：注入角色权限，标注该路由的权限，守卫通过user参数，查询权限是否包含该路由的角色权限，有才放行。</p>
<p>Nest 的实现原理就是通过装饰器给 class 或者对象添加元数据，然后初始化的时候取出这些元数据，进行依赖的分析，然后创建对应的实例对象就可以了。</p>
<p>我们可以在控制器上加元数据，然后在守卫或拦截器里通过reflector取出来</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> UseFilters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TestModuleService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test_module/test_module.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> cs<span class="token operator">:</span> TestModuleService<span class="token punctuation">,</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> appService<span class="token operator">:</span> AppService<span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">UseGuards</span></span><span class="token punctuation">(</span>TestGuard<span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">useInterceptors</span></span><span class="token punctuation">(</span>TestInterceptor<span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">SetMetadata</span></span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'admin'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>appService<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cs<span class="token punctuation">.</span><span class="token function">commonService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">canActivate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reflector</span><span class="token punctuation">(</span><span class="token string">'roles'</span><span class="token punctuation">,</span>context<span class="token punctuation">.</span><span class="token function">getHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//['admin']</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Nest 的装饰器的实现原理就是 Reflect.getMetadata、Reflect.defineMetadata 这些 api。通过在 class、method 上添加 metadata，然后扫描到它的时候取出 metadata 来做相应的处理来完成各种功能。</p>
<p>Nest 的 Controller、Module、Service 等等所有的装饰器都是通过 Reflect.meatdata 给类或对象添加元数据的，然后初始化的时候取出来做依赖的扫描，实例化后放到 IOC 容器里。</p>
<p>实例化对象还需要构造器参数的类型，这个开启 ts 的 emitDecoratorMetadata 的编译选项之后， ts 就会自动添加一些元数据，也就是 design:type、design:paramtypes、design:returntype 这三个，分别代表被装饰的目标的类型、参数的类型、返回值的类型。</p>
<p>当然，reflect metadata 的 api 还在草案阶段，需要引入 reflect metadata 的包做 polyfill。</p>
<p>Nest 还提供了 @SetMetadata 的装饰器，可以在 controller 的 class 和 method 上添加 metadata，然后在 interceptor 和 guard 里通过 reflector 的 api 取出来。</p>
<p>理解了 metadata，nest 的实现原理就很容易搞懂了。</p>
<h2 id="nest服务端需要继承的依赖包" tabindex="-1"><a class="header-anchor" href="#nest服务端需要继承的依赖包" aria-hidden="true">#</a> Nest服务端需要继承的依赖包</h2>
<h3 id="swagger-集成" tabindex="-1"><a class="header-anchor" href="#swagger-集成" aria-hidden="true">#</a> Swagger 集成</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> @nestjs/swagger
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>DocumentBuilder<span class="token punctuation">,</span>SwaggerModule<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/swagger'</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@nestjs/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./app.module'</span><span class="token punctuation">;</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> swaggerOptions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">'nest api document'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span><span class="token string">'xxproject api document'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setVersion</span><span class="token punctuation">(</span><span class="token string">'1.0.0'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addBearerAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> ducoment <span class="token operator">=</span> 
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
    SwaggerModule<span class="token punctuation">.</span><span class="token function">createDocument</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span>swaggerOptions<span class="token punctuation">)</span>
    SwaggerModule<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token string">'doc'</span><span class="token punctuation">,</span>app<span class="token punctuation">,</span>document<span class="token punctuation">)</span>
    <span class="token comment">//然后打开localhost:3000/doc可以看到</span>
  <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


