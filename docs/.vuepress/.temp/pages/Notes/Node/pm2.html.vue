<template><div><h1 id="pm2" tabindex="-1"><a class="header-anchor" href="#pm2" aria-hidden="true">#</a> pm2</h1>
<p><a href="https://pm2.keymetrics.io/docs/usage/quick-start/" target="_blank" rel="noopener noreferrer">PM2 - 文档地址<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>pm2是什么？</p>
</div>
<p>PM2（Process Manager 2）是一个流行的 Node.js 进程管理工具，它可以帮助您管理和监控 Node.js 应用程序的运行，包括启动、停止、重启、监视和自动缩放等功能。PM2 是一个开源项目，可以在 Linux、macOS 和 Windows 等操作系统上运行。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>pm2有哪些特点？</p>
</div>
<ul>
<li>多进程管理：PM2 可以启动多个进程来处理请求，从而提高 Node.js 应用程序的性能和可靠性。</li>
<li>自动重启：如果应用程序崩溃或停止，PM2 可以自动重启应用程序，以确保应用程序的连续运行。</li>
<li>日志管理：PM2 可以将应用程序的日志输出到标准输出、文件或远程日志服务，以便对应用程序进行监视和分析。</li>
<li>远程部署：PM2 可以使用 SSH 和 Git 等协议来远程部署应用程序，简化部署和升级流程。</li>
<li>监控和自动缩放：PM2 可以监视应用程序的 CPU 和内存使用情况，并根据预设的规则自动增加或减少进程数量，以适应不同的负载情况。</li>
</ul>
<p>pm2启动后的信息展示</p>
<p><img src="/Node/pm2-1.png" alt="pm2启动后的信息展示"></p>
<h2 id="pm2的常用命令" tabindex="-1"><a class="header-anchor" href="#pm2的常用命令" aria-hidden="true">#</a> pm2的常用命令</h2>
<ul>
<li><code v-pre>pm2 start app.js</code>：启动应用程序。同理<code v-pre>restart</code></li>
<li><code v-pre>pm2 stop app.js</code>：停止应用程序。同理<code v-pre>restart</code></li>
<li><code v-pre>pm2 restart app.js</code>：重启应用程序。<code v-pre>pm2 restart all</code>重启所有应用<code v-pre>pm2 restart a1 a2 a3</code>重启指定name的应用</li>
<li><code v-pre>pm2 logs</code>：实时查看应用程序的日志。</li>
<li><code v-pre>pm2 status</code>：查看应用程序的状态。</li>
<li><code v-pre>pm2 monit</code>：监视应用程序的 CPU 和内存使用情况。</li>
<li><code v-pre>pm2 scale app.js 2</code>：将应用程序的进程数量扩展到 2 个。</li>
<li><code v-pre>pm2 delete app.js</code>：删除应用程序。</li>
<li><code v-pre>pm2 ls|status|list</code>列出所有应用程序的状态</li>
<li><code v-pre> pm2 monit</code>仪表盘中监控应用状态信息</li>
<li><code v-pre>pm2 plus</code>会提供web网页的仪表盘服务</li>
<li><code v-pre>pm2 delete</code>停止并且删掉一个应用</li>
<li><code v-pre>pm2 show </code>展示应用程序的元信息</li>
</ul>
<h2 id="pm2的配置文件" tabindex="-1"><a class="header-anchor" href="#pm2的配置文件" aria-hidden="true">#</a> pm2的配置文件</h2>
<p>PM2支持 js/yaml/json配置文件</p>
<p>json文件如下：我们可以通过<code v-pre>pm2 start pm2.config.json</code>来启动PM2.5</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-app"</span><span class="token punctuation">,</span> <span class="token comment">//用于在 PM2 中标识应用程序。</span>
  <span class="token property">"script"</span><span class="token operator">:</span> <span class="token string">"app.js"</span><span class="token punctuation">,</span><span class="token comment">//应用程序的启动脚本路径。可以是一个相对路径或绝对路径。</span>
  <span class="token property">"instances"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span><span class="token comment">//应用程序的进程数量，可以是一个数字或 "max"。如果设置为 "max"，则会根据 CPU 核心数自动分配进程数量。</span>
  <span class="token property">"exec_mode"</span><span class="token operator">:</span> <span class="token string">"cluster"</span><span class="token punctuation">,</span><span class="token comment">//应用程序的运行模式，可以是 "fork" 或 "cluster"。如果设置为 "fork"，则每个进程都是一个独立的子进程；如果设置为 "cluster"，则使用 Node.js 的集群模块来运行进程。  ---这里可以看node基础知识笔记</span>
  <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token comment">//应用程序的环境变量。可以指定一个对象，其中每个属性都是一个环境变量的名称和值。这些环境变量将在应用程序启动时传递给 Node.js 进程。</span>
    <span class="token property">"NODE_ENV"</span><span class="token operator">:</span> <span class="token string">"production"</span><span class="token punctuation">,</span>
    <span class="token property">"PORT"</span><span class="token operator">:</span> <span class="token number">3000</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>js文件如下：启动同理json</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">apps</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"my-app"</span>
    <span class="token literal-property property">script</span>    <span class="token operator">:</span> <span class="token string">"api.js"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">instances</span> <span class="token operator">:</span> <span class="token string">"max"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">exec_mode</span> <span class="token operator">:</span> <span class="token string">"cluster"</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
启动多个进程
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">apps</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span>   <span class="token operator">:</span> <span class="token string">"limit worker"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">script</span> <span class="token operator">:</span> <span class="token string">"./worker.js"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">args</span>   <span class="token operator">:</span> <span class="token string">"limit"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"server"</span><span class="token punctuation">,</span> <span class="token string">"client"</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//当server和client文件夹发生改变就重启进程</span>
    <span class="token literal-property property">watch_delay</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span><span class="token comment">//指定监听的间隔</span>
    <span class="token literal-property property">ignore_watch</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"node_modules"</span><span class="token punctuation">,</span> <span class="token string">"client/img"</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//忽略监听这些文件</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span>   <span class="token operator">:</span> <span class="token string">"rotate worker"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">script</span> <span class="token operator">:</span> <span class="token string">"./worker.js"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">args</span>   <span class="token operator">:</span> <span class="token string">"rotate"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">max_memory_restart</span><span class="token operator">:</span> <span class="token string">'300M'</span><span class="token comment">//当内存占用超过300M就会重启进程</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pm2配置选项" tabindex="-1"><a class="header-anchor" href="#pm2配置选项" aria-hidden="true">#</a> PM2配置选项</h2>
<ul>
<li><code v-pre>watch</code>：用于监视应用程序文件的变化，并在文件修改时自动重启应用程序。可以指定一个布尔值或字符串数组。如果设置为 true，则监视整个应用程序目录；如果设置为一个字符串数组，则监视数组中指定的文件或目录。</li>
<li><code v-pre>log_date_format</code>：用于指定日志输出的日期格式。可以是一个字符串，例如 &quot;YYYY-MM-DD HH:mm:ss&quot;。</li>
<li><code v-pre>error_file</code> 和 <code v-pre>out_file</code>：用于指定应用程序的错误日志和输出日志的文件路径。可以是一个相对路径或绝对路径。</li>
<li><code v-pre>pid_file</code>：用于指定应用程序的 PID 文件路径。可以是一个相对路径或绝对路径。</li>
<li><code v-pre>interpreter</code>：用于指定 Node.js 解释器的路径。默认情况下，PM2 会使用系统中的 Node.js 解释器。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>例如-》
pm2 start python-app.py <span class="token parameter variable">--watch</span>  
pm2 start binary-file -- <span class="token parameter variable">--port</span> <span class="token number">1520</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pm2的重启进程方式" tabindex="-1"><a class="header-anchor" href="#pm2的重启进程方式" aria-hidden="true">#</a> PM2的重启进程方式</h2>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>module.exports = <span class="token punctuation">{</span>
  apps <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    name   <span class="token operator">:</span> <span class="token string">"limit worker"</span><span class="token punctuation">,</span>
    script <span class="token operator">:</span> <span class="token string">"./worker.js"</span><span class="token punctuation">,</span>
    args   <span class="token operator">:</span> <span class="token string">"limit"</span><span class="token punctuation">,</span>
    watch<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"server"</span><span class="token punctuation">,</span> <span class="token string">"client"</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//当server和client文件夹发生改变就重启进程</span>
    watch_delay<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span><span class="token comment">//指定监听的间隔</span>
    ignore_watch <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"node_modules"</span><span class="token punctuation">,</span> <span class="token string">"client/img"</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//忽略监听这些文件</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    name   <span class="token operator">:</span> <span class="token string">"rotate worker"</span><span class="token punctuation">,</span>
    script <span class="token operator">:</span> <span class="token string">"./worker.js"</span><span class="token punctuation">,</span>
    args   <span class="token operator">:</span> <span class="token string">"rotate"</span><span class="token punctuation">,</span>
    max_memory_restart<span class="token operator">:</span> '300M'<span class="token comment">//当内存占用超过300M就会重启进程</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
    name   <span class="token operator">:</span> <span class="token string">"rotate worker"</span><span class="token punctuation">,</span>
    script <span class="token operator">:</span> <span class="token string">"./worker.js"</span><span class="token punctuation">,</span>
    args   <span class="token operator">:</span> <span class="token string">"rotate"</span><span class="token punctuation">,</span>
    restart_delay<span class="token operator">:</span> <span class="token number">3000</span><span class="token comment">//自动重启的延迟时间</span>
  <span class="token punctuation">}</span> <span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
    name   <span class="token operator">:</span> <span class="token string">"rotate worker"</span><span class="token punctuation">,</span>
    script <span class="token operator">:</span> <span class="token string">"./worker.js"</span><span class="token punctuation">,</span>
    args   <span class="token operator">:</span> <span class="token string">"rotate"</span><span class="token punctuation">,</span>
   autorestart<span class="token operator">:</span> <span class="token boolean">false</span><span class="token comment">//禁止自动重启 === pm2 start app.js --no-autorestart</span>
  <span class="token punctuation">}</span> 
 <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="pm2的集群模式" tabindex="-1"><a class="header-anchor" href="#pm2的集群模式" aria-hidden="true">#</a> pm2的集群模式</h1>
<p>集群模式能够做什么？能够让Node应用程序在所有可用CPU上扩展（无需修改代码的情况下），这大大提高应用程序的性能和可靠性。pm2的集群模式使用Nojs提供的<code v-pre>Cluster</code>模块-》详见Node基础知识</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>按cup数量启动集群模式的进程
pm2 start app.js <span class="token parameter variable">-i</span> max 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>PM2 的集群模式是一种多进程模型，可以通过将多个 Node.js 进程绑定在同一个端口上来处理更高的并发请求。当一个请求到来时，PM2 会将请求转发给其中一个进程来处理，从而提高了 Node.js 应用程序的性能和可靠性。</p>
<p>在 PM2 集群模式中，有一个主进程和多个工作进程。主进程是一个特殊的进程，用于管理和监控工作进程的运行状态。工作进程是实际处理请求的进程，它们可以共享同一个端口并协同工作。</p>
<ol>
<li>当您使用 PM2 启动应用程序时，PM2 主进程会启动多个工作进程，并将它们绑定在同一个端口上，例如 3000 端口。</li>
<li>当一个请求到达 3000 端口时，操作系统会将请求转发给其中一个工作进程来处理。如果该工作进程已经在处理其他请求，请求将在队列中等待，直到有空闲的工作进程可用。</li>
<li>当一个工作进程崩溃或停止时，PM2 主进程会自动重启该工作进程，以确保应用程序的连续运行。</li>
</ol>
<p>通过这种方式，PM2 集群模式可以提高 Node.js 应用程序的性能和可靠性，同时还可以提供更好的负载均衡和故障恢复能力。</p>
<h1 id="pm2的fork模式" tabindex="-1"><a class="header-anchor" href="#pm2的fork模式" aria-hidden="true">#</a> pm2的Fork模式</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pm2 start app.js --exec-mode fork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 PM2 的 Fork 模式下，每个应用程序都在一个独立的 Node.js 子进程中运行。在这种模式下，PM2 主进程会启动一个或多个子进程来运行应用程序，并监视子进程的运行状态，以确保应用程序的连续运行。</p>
<ol>
<li>当您使用 PM2 启动应用程序时，PM2 主进程会启动一个 Node.js 子进程，并将应用程序的启动脚本传递给子进程。</li>
<li>子进程会加载应用程序的代码，并在子进程中运行应用程序。</li>
<li>子进程会将应用程序的输出日志发送给 PM2 主进程，以便在 PM2 控制台中显示和管理。</li>
<li>当一个子进程崩溃或停止时，PM2 主进程会自动重启该子进程，以确保应用程序的连续运行。</li>
</ol>
<p>通过这种方式，PM2 Fork 模式可以帮助您简化 Node.js 应用程序的部署和管理，同时还可以提供更好的可靠性和稳定性。</p>
<p>请注意，在 PM2 Fork 模式下，每个应用程序都运行在独立的子进程中，并且每个子进程都占用一个 CPU 核心。如果您的系统具有多个 CPU 核心，您可以考虑使用 PM2 Cluster 模式来提高应用程序的性能和可靠性。</p>
<p>要在 PM2 中使用 Fork 模式，您可以将 PM2 配置文件中的 <code v-pre>exec_mode</code> 属性设置为 &quot;fork&quot;，例如：</p>
<h1 id="pm2对比cluster和fork" tabindex="-1"><a class="header-anchor" href="#pm2对比cluster和fork" aria-hidden="true">#</a> pm2对比cluster和fork</h1>
<p>PM2 的 Fork 模式和 Cluster 模式是两种不同的多进程模型，它们在应用程序的部署和管理方式、性能特征、可靠性和可扩展性等方面有所不同。</p>
<p>以下是 Fork 模式和 Cluster 模式之间的主要区别：</p>
<ol>
<li>运行模式：在 Fork 模式下，每个应用程序都在一个独立的 Node.js 子进程中运行；在 Cluster 模式下，多个 Node.js 进程可以绑定在同一个端口上来处理更高的并发请求。</li>
<li>进程数量：在 Fork 模式下，每个应用程序只有一个进程；在 Cluster 模式下，可以根据 CPU 核心数来设置多个进程，以提高应用程序的性能和可靠性。</li>
<li>内存占用：在 Fork 模式下，每个应用程序都占用独立的内存空间；在 Cluster 模式下，多个进程共享同一个内存空间，可以更好地利用系统资源。</li>
<li>负载均衡：在 Fork 模式下，没有内置的负载均衡机制；在 Cluster 模式下，PM2 可以使用 Node.js 的集群模块来实现负载均衡，以确保请求被均匀分配给不同的进程。</li>
<li>可靠性：在 Fork 模式下，每个应用程序的崩溃或停止会影响整个应用程序的运行；在 Cluster 模式下，如果一个进程崩溃或停止，其他进程可以继续处理请求，以确保应用程序的连续运行。</li>
</ol>
<p>Fork 模式适用于单核 CPU 或需要独立管理每个应用程序的情况，而 Cluster 模式适用于多核 CPU 或需要处理更高并发请求的情况。在选择模式时，您应该根据应用程序的需求和环境来选择最适合的模式，以提高应用程序的性能、可靠性和可扩展性。</p>
<CommentService/></div></template>


