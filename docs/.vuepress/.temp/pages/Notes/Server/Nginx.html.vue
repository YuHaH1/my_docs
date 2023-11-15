<template><div><h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1>
<h2 id="nginx基础" tabindex="-1"><a class="header-anchor" href="#nginx基础" aria-hidden="true">#</a> nginx基础</h2>
<h3 id="_1-常用命令" tabindex="-1"><a class="header-anchor" href="#_1-常用命令" aria-hidden="true">#</a> 1.常用命令</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-v</span> <span class="token comment">#查看版本</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx  <span class="token comment">#输出linux进程、</span>
nginx <span class="token comment">#启动nginx进程</span>
nginx <span class="token parameter variable">-s</span> reload <span class="token comment">#重载配置</span>
nginx <span class="token parameter variable">-s</span> stop <span class="token comment"># 停止进程</span>
nginx <span class="token parameter variable">-t</span> <span class="token comment"># 检查是否有语法错误，以及配置文件地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-nginx的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-nginx的配置文件" aria-hidden="true">#</a> 2.nginx的配置文件</h3>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment"># 用户组的设置 windows上不生效如果指定具体用户和用户组会报错</span>
<span class="token directive"><span class="token keyword">user</span>  www www</span><span class="token punctuation">;</span>
<span class="token comment"># 开启进程数量根据CPU数量</span>
<span class="token directive"><span class="token keyword">worker_processes</span> auto</span><span class="token punctuation">;</span>
<span class="token comment"># 错误日志</span>
<span class="token directive"><span class="token keyword">error_log</span>  /www/wwwlogs/nginx_error.log  crit</span><span class="token punctuation">;</span>
<span class="token comment"># 指定 Nginx 进程 ID 文件的位置。</span>
<span class="token directive"><span class="token keyword">pid</span>        /www/server/nginx/logs/nginx.pid</span><span class="token punctuation">;</span>
<span class="token comment"># 设置 worker 进程打开文件描述符的最大数量。</span>
<span class="token directive"><span class="token keyword">worker_rlimit_nofile</span> <span class="token number">51200</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">stream</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">log_format</span> tcp_format <span class="token string">'<span class="token variable">$time_local|</span><span class="token variable">$remote_addr|</span><span class="token variable">$protocol</span>|<span class="token variable">$status</span>|<span class="token variable">$bytes_sent|</span><span class="token variable">$bytes_received|</span><span class="token variable">$session_time|</span><span class="token variable">$upstream_addr|</span><span class="token variable">$upstream_bytes_sent|</span><span class="token variable">$upstream_bytes_received|</span><span class="token variable">$upstream_connect_time</span>'</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 指定 TCP/UDP 访问日志文件的位置和格式。</span>
    <span class="token directive"><span class="token keyword">access_log</span> /www/wwwlogs/tcp-access.log tcp_format</span><span class="token punctuation">;</span>
    <span class="token comment"># 指定 TCP/UDP 错误日志文件的位置。</span>
    <span class="token directive"><span class="token keyword">error_log</span> /www/wwwlogs/tcp-error.log</span><span class="token punctuation">;</span>
    <span class="token comment"># 包含 tcp 目录下所有以 .conf 结尾的文件。</span>
    <span class="token directive"><span class="token keyword">include</span> /www/server/panel/vhost/nginx/tcp/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># 定义一个 events 块，用于配置事件模型和连接数量。</span>
<span class="token directive"><span class="token keyword">events</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>
        <span class="token comment">#单个进程最大连接数</span>
        <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">51200</span></span><span class="token punctuation">;</span>
        <span class="token comment"># 默认开启，开启后nginx的多个worker将会以穿行方式来处理。只有一个worker会被唤起，其他worker继续睡眠。</span>
        <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token comment"># 用于配置 HTTP 服务器。</span>
<span class="token directive"><span class="token keyword">http</span></span><span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">include</span> my_docs.conf</span><span class="token punctuation">;</span>
	<span class="token comment"># 该文件定义了 MIME 类型和文件扩展名之间的映射关系。</span>
     <span class="token directive"><span class="token keyword">include</span> mime.types</span><span class="token punctuation">;</span>
     <span class="token comment"># 用于实现 Web 应用防火墙功能。</span>
        
     <span class="token comment">#调用操作系统读写减少上下文切换</span>
     <span class="token directive"><span class="token keyword">sendfile</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
	<span class="token comment">#include luawaf.conf;</span>
	<span class="token comment"># 包含名为 proxy.conf 的配置文件，用于配置反向代理。</span>
	<span class="token directive"><span class="token keyword">include</span> proxy.conf</span><span class="token punctuation">;</span>
	<span class="token comment"># 指定默认的 MIME 类型。</span>
     <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_names_hash_bucket_size</span> <span class="token number">512</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">large_client_header_buffers</span> <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">50m</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">sendfile</span>   <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">tcp_nopush</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
	   <span class="token comment"># 设置 keepalive 连接的超时时间。</span>
        <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">60</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">tcp_nodelay</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_connect_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_send_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_read_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_buffer_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_buffers</span> <span class="token number">4</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_busy_buffers_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_temp_file_write_size</span> <span class="token number">256k</span></span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">fastcgi_intercept_errors</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
	   <span class="token comment"># 开启 gzip 压缩，并配置相关参数。</span>
        <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_min_length</span>  <span class="token number">1k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_buffers</span>     <span class="token number">4</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">2</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_types</span>     text/plain application/javascript application/x-javascript text/javascript text/css application/xml</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_proxied</span>   expired no-cache no-store private auth</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_disable</span>   <span class="token string">"MSIE [1-6]\."</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">limit_conn_zone</span> <span class="token variable">$binary_remote_addr</span> zone=perip:10m</span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">limit_conn_zone</span> <span class="token variable">$server_name</span> zone=perserver:10m</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">server</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">888</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span> phpmyadmin</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm index.php</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span>  /www/server/phpmyadmin</span><span class="token punctuation">;</span>

        <span class="token comment">#error_page   404   /404.html;</span>
        <span class="token directive"><span class="token keyword">include</span> enable-php.conf</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\.(js|css)?$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">12h</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ /\.</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">access_log</span>  /www/wwwlogs/access.log</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">include</span> /www/server/panel/vhost/nginx/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-反向代理" tabindex="-1"><a class="header-anchor" href="#_3-反向代理" aria-hidden="true">#</a> 3.反向代理</h3>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>什么是正向代理？</p>
</div>
<p>​		当客户端访问一台服务器有障碍，访问不到的时候，这时候就可以找一台可以访问到该服务器的另外一台服务器去代替他去访问，这台代替他去访问的服务器称之为代理服务器。然后客户端就可以把请求发送给代理服务器，然后通过代理服务器去访问目标服务器。由代理服务器将目标服务器的返回数据返回给客户端，客户端可以清楚目标服务器的地址，但是目标服务器并不清楚来自哪个客户端，他只知道来自哪个代理服务器。所以，正向代理可以屏蔽或者说隐藏掉客户端的信息。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>什么是反向代理？</p>
</div>
<p>从代理中我们得知代理服务器是给客户端做代理的，他和客户端是一伙的。而反向代理呢其实就是和正向代理反过来，他和服务器是一伙的，它屏蔽掉了服务器的信息，经常用在多台服务器的分布式部署上，像一些大的网站，由于访问人数很多，就需要多台服务器来解决人数多的问题，这时这些服务器就由一个反向代理服务器来代理，客户端发来请求，先由反向代理服务器，然后按一定的规则分发到明确的服务器，而客户端不知道是哪台服务器。常常用nginx来作反向代理。</p>
<p>Nginx反向代理的配置语法，反向代理中的常用指令：</p>
<div class="language-cobol line-numbers-mode" data-ext="cobol"><pre v-pre class="language-cobol"><code>proxy_pass 
proxy_set_header #该指令用来设置被代理服务器地址，可以是主机名称、IP地址加端口号形式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>反向代理解决跨域具体看笔记<RouterLink to="/Interview/Browser/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3%E9%9D%A2%E7%BB%8F.html">跨域</RouterLink></p>
</div>
<h3 id="_4-history路由404" tabindex="-1"><a class="header-anchor" href="#_4-history路由404" aria-hidden="true">#</a> 4.history路由404</h3>
<p>报错原因：我们的服务器是根据页面路由，去按路径寻找资源的。我们打包好的web站点只有一个html页面，不存在其他资源目录下的html，服务器找不到对应页面所以才报404。而hash路由锚点后的路径会被忽略。</p>
<p>解决方案</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code> <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常见的变量：</p>
<ul>
<li>$uri当前请求的URI，但不包含？后的参数</li>
<li>$args当前请求参数即？后的参数</li>
<li>$arg_xxx当前请求里某个参数xxx是参数名字</li>
<li>$http_xxx当前请求的xxx头部对应值</li>
<li>$request_uri浏览器发起的不做任何修改的请求url中的path如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111</li>
</ul>
<h3 id="_5-负载均衡" tabindex="-1"><a class="header-anchor" href="#_5-负载均衡" aria-hidden="true">#</a> 5.负载均衡</h3>
<p>upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。</p>
<ul>
<li>默认轮询方式进行负载均衡。（单纯使用轮询无法保持会话，一个服务器返给了客户端cookie其他服务器并没有该session信息）</li>
</ul>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://node</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>指定权重</li>
</ul>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code>    <span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001 weight=3</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002 weight=2</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003 weight=1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不常用的负载均衡策略</p>
<ul>
<li>ip_hash：根据客户端ip地址转发同一台服务器</li>
<li>last_conn：最少连接访问（很少用，有时候有的服务器是我们特地设置低权重的）</li>
<li>url_hash：根据用户指定url定向流量转发请求（将请求url生成hash，相同的hash转发到同一个服务器，例如可能出现注册和登陆接口打到不同服务器。通常访问固定资源，且不在同一服务上，这种情况使用。）</li>
<li>fait：根据后端服务响应时间转发请求</li>
</ul>
<p>相关最小配置项功能</p>
<ul>
<li><code v-pre>fail_timeout</code> backup故障等待超时时间.在nginx中，<code v-pre>fail_timeout</code>是指在一个给定时间段内，<u><strong>如果某个后端服务器（如Upstream）无法响应请求，nginx将会将其标记为故障状态，并且不再将新的请求发送到该服务器。</strong></u><code v-pre>fail_timeout</code>参数用于指定在将该服务器标记为故障状态后，nginx应该等待多长时间来重新尝试将请求发送到该服务器。例如，如果您将<code v-pre>fail_timeout</code>设置为10秒，则在某个后端服务器在10秒内无法响应请求时，nginx将将其标记为故障状态，并且在10秒内不会再将新的请求发送到该服务器。在10秒之后，nginx将重新尝试将请求发送到该服务器。如果该服务器仍然无法响应请求，则nginx将再次将其标记为故障状态，并继续等待<code v-pre>fail_timeout</code>时间，然后再次尝试将请求发送到该服务器。</li>
</ul>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001 fail_timeout=60</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002 fail_timeout=20</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003 backup</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>down</code>加了该属性的服务器不参与负载均衡，相当于下线</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001 down</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002 fail_timeout=20</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003 backup</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>backup</code>备用机当没有机器能用时请求会打到该IP上</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001 down</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002 down</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003 backup</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_6-动静分离" tabindex="-1"><a class="header-anchor" href="#_6-动静分离" aria-hidden="true">#</a> 6.动静分离</h3>
<p>动静分离主要是为了让服务器专门负责处理业务请求。而静态资源交给nginx，减少服务器压力。</p>
<p>动静分离适合中小型企业。主要是因为中小型网站并发量不高，且需要分离的静态资源不多。而大型企业类似于淘宝，用户上传的资源就比较多（买家秀 买家秀等）。</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">8082</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://localhost:3022</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> ~* \.(js|css|pdf|pnf|jpg|svg)$</span> <span class="token punctuation">{</span>
        <span class="token comment"># 将该站的js|css|图片文件放到root指定目录下</span>
        <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-urlrewrite" tabindex="-1"><a class="header-anchor" href="#_8-urlrewrite" aria-hidden="true">#</a> 8.URLRewrite</h3>
<p>重写url可以隐藏我们实际访问服务器的物理地址，提高安全性</p>
<p>例如</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code>    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">rewrite</span> ^/rewrite.html$ /api/agg break</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://localhost:3022</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/Nginx/rewrite_res.png" alt=""></p>
<p>服务端</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/agg'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token number">12321312312</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标记说明</p>
<ul>
<li><code v-pre>last</code>：本条规则匹配完成后继续向下匹配新的<code v-pre>location</code> URI规则</li>
<li><code v-pre>break</code>: 本条规则匹配完成即终止，不再向后匹配规则</li>
<li><code v-pre>redirect</code>：返回302临时重定向，浏览器会显示跳转后的URI地址</li>
<li><code v-pre>permanent</code>：返回301永久重定向，浏览器地址栏会显示跳转后的URL地址</li>
</ul>
<h3 id="_7-代码压缩" tabindex="-1"><a class="header-anchor" href="#_7-代码压缩" aria-hidden="true">#</a> 7.代码压缩</h3>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code>
<span class="token comment">#user  nobody;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>


<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    	<span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    	<span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    	<span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    	<span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">gzip_types</span> text/plain text/css application/javascript application/json</span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">10</span></span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">5</span></span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_proxied</span> any</span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_disable</span> <span class="token string">"msie6"</span></span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_buffers</span> <span class="token number">16</span> <span class="token number">8k</span></span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    		<span class="token directive"><span class="token keyword">listen</span> <span class="token number">8088</span></span><span class="token punctuation">;</span>
    		<span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    		<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
      			<span class="token directive"><span class="token keyword">root</span> E:vue\vite-build\dist</span><span class="token punctuation">;</span>
      			<span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
      			<span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
     			<span class="token directive"><span class="token keyword">gzip_static</span>  <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    		<span class="token punctuation">}</span>
 	 <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>gzip on;</code>：开启 Gzip 压缩。</li>
<li><code v-pre>gzip_types</code>：指定需要压缩的文件类型。在示例中，我们指定了常见的文本文件类型和 JavaScript、JSON 文件类型。</li>
<li><code v-pre>gzip_min_length</code>：设置压缩文件的最小大小。在示例中，我们将最小大小设置为 1024 字节。</li>
<li><code v-pre>gzip_comp_level</code>：设置压缩级别。在示例中，我们将压缩级别设置为 5。</li>
<li><code v-pre>gzip_proxied</code>：指定在代理服务器上启用压缩的条件。在示例中，我们设置为 <code v-pre>any</code> 来允许任何代理服务器上的压缩。</li>
<li><code v-pre>gzip_vary</code>：为代理缓存服务指定 Vary 头。在示例中，我们设置为 <code v-pre>on</code> 来告知代理缓存服务器根据 Accept-Encoding 头来提供适当的压缩版本。</li>
<li><code v-pre>gzip_disable</code>：禁用压缩的用户代理。在示例中，我们禁用了 &quot;msie6&quot;。</li>
<li><code v-pre>gzip_buffers</code>：设置用于压缩的缓冲区大小。</li>
<li><code v-pre>gzip_http_version</code>：指定使用的 HTTP 协议版本。</li>
</ul>
<h3 id="_9-防盗链referer" tabindex="-1"><a class="header-anchor" href="#_9-防盗链referer" aria-hidden="true">#</a> 9.防盗链Referer</h3>
<p>使用场景:某些资源不希望被外站引用时。</p>
<p>当我们访问网站资源，请求头不会有<code v-pre>Referer</code>，在后续访问相同资源浏览器会携带<code v-pre>Referer</code>字段，该字段记录了用户的站点。以便于服务端验证用户是否是非法请求。（当首次访问和后续访问站点不一致时）</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code>   <span class="token directive"><span class="token keyword">location</span> ~* \.(js|css|pdf|pnf|jpg|svg)$</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">valid_referers</span>  192.168.1.1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 将该站的js|css|图片资源放到root指定目录下</span>
        <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再访问</p>
<p><img src="/Nginx/referer.png" alt=""></p>
<p><code v-pre>valid_referers</code>  后可以配置一些属性如下：</p>
<ul>
<li>none：检测Referer头 域不存在的情况</li>
<li><code v-pre>block</code>：检测Referer头域的值被防火墙或者代理服务器删除/伪装的情况。</li>
<li><code v-pre>server_names</code>设置一个或多URL，检测Referer头域是否是这些URL中的一个 ，例如上面的<code v-pre>192.168.1.1</code>/域名</li>
</ul>
<h3 id="_10-location-后的匹配" tabindex="-1"><a class="header-anchor" href="#_10-location-后的匹配" aria-hidden="true">#</a> 10.location 后的匹配</h3>
<ul>
<li>
<p>location 和路径之间加了个 =，代表精准匹配，也就是只有完全相同的 url 才会匹配这个路由。当访问localhost/user/的时候会匹配该路由</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> = /user/</span><span class="token punctuation">{</span>
	return 200 "1231231 success"
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>不带 = 代表根据前缀匹配，后面可以是任意路径。例如: 当url= <code v-pre>localhost/user/index2.html</code></p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /user</span><span class="token punctuation">{</span>
	return 200 $uri <span class="token comment"># 这里的 $uri 是取当前路径。 /user/index2.html</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>然后如果想支持正则，就可以加个 <code v-pre>~</code>。如果让正则不区分大小写加<code v-pre>*</code></p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> ~ \.(js|jpg|css|png|svg)$</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">location</span> ~* \.(js|jpg|css|png|svg)$</span><span class="token punctuation">{</span> <span class="token comment">#不区分大小写</span>
    <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>如果想提高<code v-pre>location</code>优先级可以加<code v-pre>^~</code></p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> ^~ /user</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span> <span class="token string">'高优先级'</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">location</span> ~* /user/.*\.html$</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span> <span class="token variable">$uri</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>**优先级顺序：**<strong>精确匹配<code v-pre>（=）</code> &gt; 高优先级前缀匹配<code v-pre>（^~）</code> &gt; 正则匹配<code v-pre>（~/~*）</code> &gt; 普通前缀匹配<code v-pre>(/)</code></strong></p>
<h4 id="root和alias区别" tabindex="-1"><a class="header-anchor" href="#root和alias区别" aria-hidden="true">#</a> root和alias区别</h4>
<p>同样是<code v-pre> /222/xxx/yyy.html</code>:</p>
<p>如果是用 root 的配置，会把整个 uri 作为路径拼接在后面。也就是会查找<code v-pre>/dddd/222/xxx/yyy.html</code>文件。</p>
<p>如果是 alias 配置，它会把去掉<code v-pre>/222</code>之后的部分路径拼接在后面。也就是会查找 <code v-pre>/dddd/xxx/yyy.html </code>文件。也就是 我们 <strong>root 和 alias 的区别就是拼接路径时是否包含匹配条件的路径。</strong></p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /222</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">alias</span> /dddd</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">location</span> /222</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span> /dddd</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx高级" tabindex="-1"><a class="header-anchor" href="#nginx高级" aria-hidden="true">#</a> nginx高级</h2>
<h3 id="集群化" tabindex="-1"><a class="header-anchor" href="#集群化" aria-hidden="true">#</a> 集群化</h3>
<p>集群式的方案指的是每个服务器后端代码要一致</p>
<h3 id="分布式" tabindex="-1"><a class="header-anchor" href="#分布式" aria-hidden="true">#</a> 分布式</h3>
<p>多个服务器提供提供不同服务</p>
<h3 id="nginx如何会话保持" tabindex="-1"><a class="header-anchor" href="#nginx如何会话保持" aria-hidden="true">#</a> nginx如何会话保持</h3>
<p>什么是会话保持?就是保存用户状态信息，例如登录态</p>
<p>有哪些方式能够维持?如下：</p>
<ol>
<li>Nginx
<ol>
<li><code v-pre>ip_hash</code></li>
<li>其他hash例如 <code v-pre>$cookie_jseeeionid</code></li>
<li>其他hash例如<code v-pre> $request_uri</code></li>
</ol>
</li>
<li>lua对nginx进行二次开发，高级定制</li>
<li>后端<code v-pre>Redis</code> + <code v-pre>SpringSession</code>(该框架会将用户session存到redis中)</li>
</ol>
<h4 id="ip-hash保持会话" tabindex="-1"><a class="header-anchor" href="#ip-hash保持会话" aria-hidden="true">#</a> ip_hash保持会话</h4>
<p><strong>原理</strong>：这种方式会根据用户ip地址生成一个hash，然后根据服务器数量进行取余，根据余数决定该用户的请求打到哪个服务器。</p>
<p><strong>应用场景</strong>：中小项目，快速扩容。</p>
<p><strong>不适用的场景</strong>如下：</p>
<ol>
<li>不适合局域网里运行的项目，例如企业内部Erp，学校考试系统等等</li>
<li>一些关键操作需要下一步下一步（例如银行转账），不能出现服务器宕机，会话丢失的情况。</li>
</ol>
<p><strong>ip_hash缺点如下</strong>：</p>
<ol>
<li><strong>IP集中，流量倾斜</strong>由于学校，大公司没公网IP用户可能共用一个IP地址，导致大量请求取得一个hash值，然后请求集中到某个服务器上，造成流量倾斜（。</li>
<li>后端服务器宕机，用户会话消失</li>
</ol>
<p><strong>实现方式</strong>：</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> testip_hash</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:2022</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3033</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="request-uri保持会话" tabindex="-1"><a class="header-anchor" href="#request-uri保持会话" aria-hidden="true">#</a> request_uri保持会话</h4>
<p><strong>原理</strong>：访问相同url时会转发到固定的服务器上。</p>
<p><strong>使用场景</strong>如下：</p>
<ol>
<li>不持支cookie，将sessionid放到url中</li>
<li>对于一些资源的请求，例如请求一些电影/音乐的url固定打到某个服务器上</li>
</ol>
<p><strong>实现方式</strong>：</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> test_request_hash</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">hash</span>     <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:2022</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3033</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cookie-jsessionid保持会话" tabindex="-1"><a class="header-anchor" href="#cookie-jsessionid保持会话" aria-hidden="true">#</a> cookie_jsessionid保持会话</h4>
<p><strong>原理</strong>：让nginx对服务器下发的cookie做hash</p>
<ol>
<li>当登陆系统时，服务端下发一个文件给客户端</li>
<li>下次请求客户端会携带该文件</li>
</ol>
<p><strong>优点</strong>：</p>
<ol>
<li>相比上面的ip_hash可以在局域网中保持会话</li>
<li>也不会造成流量倾斜（固定用户转发到固定的服务器）</li>
</ol>
<p><strong>实现方式</strong>：</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> api_serve</span><span class="token punctuation">{</span>  
    <span class="token directive"><span class="token keyword">hash</span>  <span class="token variable">$cookie_token</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3044 weight=2 max_fails=2 fail_timeout=30s</span> <span class="token punctuation">;</span> 
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3033 weight=1 max_fails=2 fail_timeout=30s</span> <span class="token punctuation">;</span>   
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>这个<code v-pre>$cookie_</code>下划线后面的内容和后端协商定义，nginx会读取cookie中下划线后的这个Name，将他的Value哈希</p>
</div>
<p><img src="/Nginx/cookie_hash.png" alt=""></p>
<h3 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a> Keep-alive</h3>
<p>长连接选项，开启前每次发送请求都要建立TCP连接</p>
<h4 id="客户端配置keep-alive" tabindex="-1"><a class="header-anchor" href="#客户端配置keep-alive" aria-hidden="true">#</a> 客户端配置Keep-alive</h4>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">65</span> <span class="token number">65</span></span><span class="token punctuation">;</span><span class="token comment"># 超过这个时间没有活动 keepalive失效</span>
    <span class="token directive"><span class="token keyword">keepalive_time</span> <span class="token number">1h</span></span><span class="token punctuation">;</span><span class="token comment">#默认的tcp连接总时长，超时后失效</span>
    <span class="token directive"><span class="token keyword">send_timeout</span> <span class="token number">60</span></span><span class="token punctuation">;</span><span class="token comment">#默认60s，时间不要太短。注意：系统中如果有耗时操作超过send_timeout指定时间，会强制断开连接。（发送请求后到得到回复之前的时间就是sendtimeout）</span>
    <span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">1000</span></span><span class="token punctuation">;</span><span class="token comment">#一个tcp复用中可以并发接收的请求个数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对上游服务器keep-alive" tabindex="-1"><a class="header-anchor" href="#对上游服务器keep-alive" aria-hidden="true">#</a> 对上游服务器Keep-alive</h4>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> api_serve</span><span class="token punctuation">{</span>  
    <span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">100</span></span><span class="token punctuation">;</span>  
    <span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">1000</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3044 weight=2 max_fails=2 fail_timeout=30s</span> <span class="token punctuation">;</span> 
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3033 weight=1 max_fails=2 fail_timeout=30s</span> <span class="token punctuation">;</span>   
<span class="token punctuation">}</span>  
<span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span> <span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">""</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://api_serve</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx缓冲区配置" tabindex="-1"><a class="header-anchor" href="#nginx缓冲区配置" aria-hidden="true">#</a> Nginx缓冲区配置</h3>
<p>缓冲：每次使用完都会将该缓冲区内数据清除下次循环使用</p>
<p>缓存：每次都会将数据存储到缓存区，并不会清除</p>
<ul>
<li><code v-pre>client_body_buffer_size</code>:客户端请求中的body缓冲区大小</li>
<li><code v-pre>client_body_temp_path</code>:磁盘存储位置</li>
<li><code v-pre>client_max_body_size</code>:客户端发送最大body数据限制（请求头Content-length标记数据大小），如果超过限制报413（请求实体太大）</li>
<li><code v-pre>client_body_timeout</code>:客户端和服务端建立连接后发送request body的超时时间，如果客户端指定时间内没发送任何内容Nginx返回408请求超时</li>
<li><code v-pre>client_header_timeout</code>:客户端向服务端发送完整request header的超时时间，如果客户端指定时间没发送完整header Nginx返回408</li>
</ul>
<h3 id="获取用户真实ip地址" tabindex="-1"><a class="header-anchor" href="#获取用户真实ip地址" aria-hidden="true">#</a> 获取用户真实IP地址</h3>
<p>上有服务器获取IP时，不做处理获取的IP为nginx虚拟主机的，想要获取用户真实IP有如下方法</p>
<ul>
<li>
<p>Nginx将真实IP地址写入header中，供服务端读取</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="gzip压缩" tabindex="-1"><a class="header-anchor" href="#gzip压缩" aria-hidden="true">#</a> GZIP压缩</h3>
<p>有两种常用压缩算法</p>
<ul>
<li>GZIP</li>
<li>BR</li>
</ul>
<p>响应头中的一些标识：</p>
<ul>
<li><code v-pre>Content-Encoding</code>压缩格式</li>
<li><code v-pre>Transfer-Encoding</code>传输格式</li>
</ul>
<p><strong>Nginx - GZIP动态压缩和静态压缩的区别</strong>：</p>
<ol>
<li>动态压缩：
<ul>
<li>对象：动态压缩是指对动态生成的内容进行压缩。这些内容通常是由后端应用程序（如动态网页、API 响应等）生成的，并且每次请求可能会有不同的内容。</li>
<li>压缩方式：在动态压缩中，Nginx 通过使用 gzip 模块或其他相关模块，根据客户端请求的 Accept-Encoding 头部，将动态生成的内容进行压缩。Nginx 在将压缩后的内容发送给客户端之前，会将内容进行压缩，并设置相应的 Content-Encoding 头部，指示内容已被压缩。</li>
</ul>
</li>
<li>静态压缩：
<ul>
<li>对象：静态压缩是指对事先存在的静态文件进行压缩。这些文件通常是网站的静态资源，如 HTML、CSS、JavaScript、图像文件等。</li>
<li>压缩方式：在静态压缩中，Nginx 通过使用 gzip_static 模块或其他相关模块，在将静态文件发送给客户端之前，先检查是否存在对应的压缩文件（如以 .gz 扩展名的文件）。如果存在压缩文件并且客户端支持压缩，Nginx 会直接发送压缩文件，从而减少传输大小和提高传输速度。<strong>这种方式支持高级特性sendfile</strong></li>
</ul>
</li>
</ol>
<h4 id="gzip动态压缩配置" tabindex="-1"><a class="header-anchor" href="#gzip动态压缩配置" aria-hidden="true">#</a> GZIP动态压缩配置</h4>
<p>GZIP缺点：开启后无法使用Nginx高级特性之sendfile</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>

    <span class="token comment">#gzip on;</span>
    <span class="token comment">#gzip_comp_level 5; 压缩等级1-9，压缩等级太高解压缩速度越慢，占用CPU越高</span>
    <span class="token comment">#gzip_min_length 256; 最小文件大小，小于这个大小的文件不做压缩</span>
    <span class="token comment">#gzip_types  text/plain application/x-javascript application/xml text/css; 对某些文件类型去压缩</span>
    <span class="token comment">#gzip_proxied any;无条件启用压缩，一般不做配置</span>
    <span class="token comment">#gzip_vary on; 可不做配置</span>
    <span class="token comment">#gzip_disable "msie6";</span>
    <span class="token comment">#gzip_buffers 16 8k;</span>
    <span class="token comment">#gzip_http_version 1.1;支持最低http版本号</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="gzip静态压缩配置" tabindex="-1"><a class="header-anchor" href="#gzip静态压缩配置" aria-hidden="true">#</a> GZIP静态压缩配置</h4>
<p><a href="https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p>GZIP将静态资源文件压缩好，Nginx在磁盘上找.gz的静态文件通过sendfile方式传递给客户端。</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#gzip on;</span>
    <span class="token directive"><span class="token keyword">gunzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span><span class="token comment">#对于不支持解压的，nginx会解压后给客户端</span>
    <span class="token directive"><span class="token keyword">gzip_static</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#gzip_comp_level 5; 压缩等级1-9，压缩等级太高解压缩速度越慢，占用CPU越高</span>
    <span class="token comment">#gzip_min_length 256; 最小文件大小，小于这个大小的文件不做压缩</span>
    <span class="token comment">#gzip_types  text/plain application/x-javascript application/xml text/css; 对某些文件类型去压缩</span>
    <span class="token comment">#gzip_proxied any;无条件启用压缩，一般不做配置</span>
    <span class="token comment">#gzip_vary on; 可不做配置</span>
    <span class="token comment">#gzip_disable "msie6";</span>
    <span class="token comment">#gzip_buffers 16 8k;</span>
    <span class="token comment">#gzip_http_version 1.1;支持最低http版本号</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="brotli压缩" tabindex="-1"><a class="header-anchor" href="#brotli压缩" aria-hidden="true">#</a> Brotli压缩</h3>
<p>Brotli是谷歌开源的一种新型压缩算法，Brotli压缩比Gzip压缩性能更好。开启Brotli压缩功能后，CDN节点会对资源进行智能压缩后返回，缩小传输文件大小，提升文件传输效率，减少带宽消耗。</p>
<h4 id="sendfile原理" tabindex="-1"><a class="header-anchor" href="#sendfile原理" aria-hidden="true">#</a> sendfile原理</h4>
<p><strong>优点</strong></p>
<p>通过使用 sendfile，Nginx 可以利用操作系统的功能，将文件内容从磁盘读取到内核空间，并直接通过网络发送给客户端，省去了数据在用户空间和内核空间之间的复制过程。这种零拷贝的机制大大减少了 CPU 和内存的开销，提高了数据传输的效率和性能。当启用 gzip 动态压缩时，Nginx 在发送压缩后的响应数据之前需要先将数据压缩到内存中，然后才能使用 sendfile 将数据发送给客户端。这意味着在启用动态压缩的情况下，无法直接使用 sendfile 来发送压缩后的响应文件，而是需要使用替代的发送方式。）</p>
<p>在不使用sendfile传输文件会采用的过程：</p>
<p><img src="/Nginx/send_file.png" alt=""></p>
<ol>
<li>客户端请求文件：当客户端发送一个请求来获取某个文件时，Nginx 接收到该请求并开始处理。</li>
<li>打开文件：Nginx 使用系统调用（如 open）打开请求的文件，并获取文件的文件描述符（File Descriptor）。</li>
<li>读取文件内容：Nginx 通过文件描述符从磁盘读取文件的内容，并将数据复制到用户空间的读取缓冲区。</li>
<li>数据复制：Nginx 将从文件读取的数据从读取缓冲区复制到内存中的发送缓冲区。</li>
<li>网络发送：Nginx 使用普通的网络发送操作将发送缓冲区中的数据发送到网络。</li>
<li>完成发送：一旦发送完成，Nginx 关闭文件描述符，并根据需要继续处理其他请求。</li>
</ol>
<p>在这个过程中，文件的内容首先被读取到用户空间的读取缓冲区，然后再复制到内存中的发送缓冲区，最后通过普通的网络发送操作发送给客户端。相比于 sendfile 机制，这种方式涉及了数据在用户空间和内核空间之间的复制，因此会增加额外的 CPU 和内存开销。</p>
<p><strong>sendfile为什么可以直接传输？</strong></p>
<ol>
<li>零拷贝（Zero-copy）：sendfile 机制利用了零拷贝技术，它允许数据在内核空间和网络栈之间进行传输，而无需在用户空间和内核空间之间进行数据复制。这意味着文件数据可以直接从磁盘读取到内核空间的发送缓冲区，然后直接发送给网络，避免了不必要的数据复制过程，提高了传输效率。</li>
<li>文件描述符（File Descriptor）：sendfile 使用文件描述符来标识要传输的文件。文件描述符是操作系统内核为每个打开的文件分配的唯一标识符。通过将文件描述符传递给 sendfile 系统调用，操作系统内核可以直接从文件系统中读取文件内容，并将其传输到网络中。</li>
<li>高效的内核调度：操作系统内核能够高效地调度磁盘和网络操作，以最大程度地利用硬件资源。通过直接将文件内容传输到网络，内核可以更好地管理磁盘和网络之间的数据流，从而提高传输效率。</li>
</ol>
<p><strong>零拷贝技术的工作原理：</strong></p>
<ol>
<li>文件描述符传递：当使用 sendfile 进行文件传输时，Nginx 将源文件的文件描述符和目标网络连接的文件描述符传递给操作系统内核。</li>
<li>内核空间读取：操作系统内核使用源文件的文件描述符和指定的发送偏移和大小参数，直接在内核空间中定位到文件的相应位置，并将文件内容读取到内核空间的发送缓冲区。</li>
<li>零拷贝传输：一旦文件内容被读取到内核空间的发送缓冲区，操作系统内核就可以直接将数据发送到网络，而无需将数据从内核空间复制到用户空间。</li>
</ol>
<p><strong>读取磁盘内容发到远程服务器的过程</strong></p>
<ol>
<li>磁盘中读取目标文件内容拷贝到内核缓冲区 （第一次拷贝）</li>
<li>CPU再把内核缓冲区的数据复制到用户空间的缓冲区 （第二次拷贝）</li>
<li>然后在应用程序中调write方法，将用户空间缓冲区的数据拷贝到内核下的Socket buffer里（第三次拷贝）</li>
<li>然后将Socket buffer的数据复制到网卡缓冲区 （第四次拷贝）</li>
<li>最后网卡缓冲区将数据复制到目标服务器上</li>
</ol>
<p><u>存在的问题</u>：</p>
<ol>
<li>用户空间-》内核空间拷贝 和 内核空间-》用户空间的拷贝浪费性能</li>
<li>用户空间和内核空间切换会带来CPU上下文切换，影响CPU性能</li>
</ol>
<p><strong>零拷贝原理</strong>：省略掉两次多余拷贝过程将数据从内核空间缓冲区直接拷贝到Socket buffer</p>
<h3 id="资源合并ssi" tabindex="-1"><a class="header-anchor" href="#资源合并ssi" aria-hidden="true">#</a> 资源合并SSI</h3>
<p>SSI（Server Side Includes）是一种服务器端技术，用于在网页中包含其他文件的内容。Nginx 支持 SSI 功能的主要作用和优点如下：</p>
<ol>
<li>模块化内容组合：SSI 允许将多个组件和片段组合成一个完整的网页。通过使用 <code v-pre>&lt;!--#include --&gt;</code> 指令，可以在网页中嵌入其他文件的内容，如页眉、页脚、导航栏等。这样可以简化网页的维护和管理，使结构更清晰。</li>
<li>动态内容更新：SSI 允许将动态内容嵌入静态网页中。通过使用 <code v-pre>&lt;!--#echo --&gt;</code> 或 <code v-pre>&lt;!--#set --&gt;</code> 等指令，可以在网页中显示动态生成的内容，如当前时间、访问计数等。这样可以在不修改整个网页的情况下更新特定部分的内容。</li>
<li>提高可重用性：通过将公共组件和部分独立为单独的文件，可以在多个页面中重复使用。当需要更新这些组件时，只需修改相应的文件，而不需要逐个修改每个包含该组件的页面。</li>
<li>简化网页维护：使用 SSI 可以将网页内容分成多个文件，使得网页的维护更加灵活和可控。当需要修改某个组件时，只需修改相应的文件，而无需修改所有包含该组件的网页。</li>
<li>减少带宽消耗：SSI 允许在服务器端进行内容组合和处理，减少了客户端请求的数据量。这可以降低带宽消耗，并提高网页的加载速度。</li>
</ol>
<p><a href="https://nginx.org/en/docs/http/ngx_http_ssi_module.html" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p>简单配置示例</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">ssi</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> ~* \.(js|css|pdf|pnf|jpg|svg)$</span> <span class="token punctuation">{</span>
        <span class="token comment"># 将该站的js|css|图片资源放到root指定目录下</span>
        <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件夹目录</p>
<p><img src="/Nginx/ssi_dir.png" alt=""></p>
<p>写模板html</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>footer.html
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">color</span><span class="token punctuation">:</span>blueviolet<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    ssi:---- footer.....footervfooterfooter
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
header.html
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    ssi:----header.....headerheaderheaderheaderheaderheader
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>index.html文件入口中填入模板文件地址<code v-pre> &lt;!--# include file=&quot;xxx.html&quot; --&gt;</code></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/svg+xml<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/vite.svg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Vite + Vue<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/assets/index-ba0f51e4.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modulepreload<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/assets/vue-vendor-aac3cfc3.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modulepreload<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/assets/utils-a1a55e9c.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modulepreload<span class="token punctuation">"</span></span> <span class="token attr-name">crossorigin</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/assets/vue-utils-9a80809b.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/assets/index-f20ba052.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!--# include file="header.html" --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!--# include file="footer.html" --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果展示</p>
<p><img src="/Nginx/ssi_res.png" alt=""></p>
<p>SSI配置和SSI模板配置参考文档</p>
<h2 id="实战问题解决" tabindex="-1"><a class="header-anchor" href="#实战问题解决" aria-hidden="true">#</a> 实战问题解决</h2>
<h3 id="nginx解决跨域" tabindex="-1"><a class="header-anchor" href="#nginx解决跨域" aria-hidden="true">#</a> nginx解决跨域</h3>
<p>前端配置环境</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code> <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"vite --host"</span>
  ➜  Local<span class="token operator">:</span>   http<span class="token operator">:</span><span class="token comment">//localhost:5173/</span>
  ➜  Network<span class="token operator">:</span> http<span class="token operator">:</span><span class="token comment">//10.102.217.233:5173/</span>
  ➜  Network<span class="token operator">:</span> http<span class="token operator">:</span><span class="token comment">//172.30.96.1:5173/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前端</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">axios.get('http://127.0.0.1:8088/api/user').then(res</span> =></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">console.log(res)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>)<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后端</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> compression <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'compression'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">3033</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/user'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Example app listening on port </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">8088</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> 127.0.0.1</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span>  http://127.0.0.1:5173</span><span class="token punctuation">;</span>
        <span class="token comment"># 配置HMR websocket协议</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Upgrade <span class="token variable">$http_upgrade</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">"upgrade"</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarder-For
        <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> /api</span> <span class="token punctuation">{</span>
        <span class="token comment"># 如果后端接口没有api前缀 则加上rewrite 例如后端接口app.get('/user',...)</span>
        <span class="token comment"># 前端请求不变http://127.0.0.1:8088/api/user</span>
        <span class="token comment"># rewrite ^/api/(.*)$ /$1 break;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span>  http://127.0.0.1:3033</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarder-For
        <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="bff解决跨域" tabindex="-1"><a class="header-anchor" href="#bff解决跨域" aria-hidden="true">#</a> bff解决跨域</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> compression <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'compression'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'axios'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">3022</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">compression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">setHeaders</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res<span class="token punctuation">,</span> filePath</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>filePath<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">'.gz'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Content-Encoding'</span><span class="token punctuation">,</span> <span class="token string">'gzip'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            res<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Content-Type'</span><span class="token punctuation">,</span> <span class="token string">'application/gzip'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/agg'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'http://127.0.0.1:3033/api/user'</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">聚合接口</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> result<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> result<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Example app listening on port </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> api_serve</span><span class="token punctuation">{</span>  
   <span class="token comment"># 30s内检查心跳发送两次包，未回复就代表该机器宕机，请求分发权重比为1:2   </span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3044 weight=2 max_fails=2 fail_timeout=30s</span> <span class="token punctuation">;</span> 
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:3033 weight=1 max_fails=2 fail_timeout=30s</span> <span class="token punctuation">;</span>   

<span class="token punctuation">}</span>  
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">8088</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> 127.0.0.1</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span>  http://127.0.0.1:5173</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span> <span class="token comment"># $host是nginx内置变量，表示客户端请求的主机名。</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span><span class="token comment"># $remote_addr是nginx内置变量，表示客户端的IP地址。</span>
        <span class="token comment"># 这条指令将会将请求的X-Forwarded-For字段设置为客户端的IP地址，并$proxy_add_x_forwarded_for是nginx内置变量，表示代理服务器的IP地址。</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarder-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> /api</span> <span class="token punctuation">{</span>
        <span class="token comment"># 请求交给名为api_serve的upstream上  </span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://api_serve</span><span class="token punctuation">;</span>  
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarder-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx灰度系统" tabindex="-1"><a class="header-anchor" href="#nginx灰度系统" aria-hidden="true">#</a> nginx灰度系统</h3>
<p><strong>灰度系统是什么？</strong></p>
<p>软件开发一般不会上来就是最终版本，而是会一个版本一个版本的迭代。新版本上线前都会经过测试，但就算这样，也不能保证上线了不出问题。所以，在公司里上线新版本代码一般都是通过灰度系统。灰度系统可以把流量划分成多份，一份走新版本代码，一份走老版本代码。</p>
<p><strong>举例子</strong></p>
<p>比如做了一个新功能，但是不确定是否稳定，就灰度20%，看下有没有线上问题；改了一个按钮，不知道用户是不是喜欢，就只让20%的用户能看到新按钮，看下点击率有没有显著下降。用户在访问到网站的时候，先通过Nginx，Nginx选择用户访问老站点还是新站点</p>
<p><strong>ngxin配置示例</strong></p>
<p>如果包含 version=1.0 的 cookie，那就走 version1.0_server 的服务，有 version=2.0 的 cookie 就走 version2.0_server 的服务，否则，走默认的。cookie带上version如果是2.0就会将请求打到3001服务器上</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> version1.0_server</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.1.6:3000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token directive"><span class="token keyword">upstream</span> version2.0_server</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.1.6:3001</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">upstream</span> default</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.1.6:3000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">set</span> <span class="token variable">$group</span> <span class="token string">"default"</span></span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$http_cookie</span> ~* <span class="token string">"version=1.0"</span>)</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$group</span> version1.0_server</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$http_cookie</span> ~* <span class="token string">"version=2.0"</span>)</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$group</span> version2.0_server</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">location</span> ^~ /api</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">rewrite</span> ^/api/(.*)$ /<span class="token variable">$1</span> break</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://<span class="token variable">$group</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


