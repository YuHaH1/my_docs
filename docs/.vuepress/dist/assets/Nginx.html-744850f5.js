import{_ as c,M as s,p as l,q as o,R as n,t as a,N as e,V as d,a1 as i}from"./framework-a97ca956.js";const r={},u=i(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1><h2 id="_1-常用命令" tabindex="-1"><a class="header-anchor" href="#_1-常用命令" aria-hidden="true">#</a> 1.常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-v</span> <span class="token comment">#查看版本</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx  <span class="token comment">#输出linux进程、</span>
nginx <span class="token comment">#启动nginx进程</span>
nginx <span class="token parameter variable">-s</span> reload <span class="token comment">#重载配置</span>
nginx <span class="token parameter variable">-s</span> stop <span class="token comment"># 停止进程</span>
nginx <span class="token parameter variable">-t</span> <span class="token comment"># 检查是否有语法错误，以及配置文件地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-nginx的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-nginx的配置文件" aria-hidden="true">#</a> 2.nginx的配置文件</h2><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 用户组的设置 windows上不生效如果指定具体用户和用户组会报错</span>
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
    <span class="token directive"><span class="token keyword">log_format</span> tcp_format <span class="token string">&#39;<span class="token variable">$time_local|</span><span class="token variable">$remote_addr|</span><span class="token variable">$protocol</span>|<span class="token variable">$status</span>|<span class="token variable">$bytes_sent|</span><span class="token variable">$bytes_received|</span><span class="token variable">$session_time|</span><span class="token variable">$upstream_addr|</span><span class="token variable">$upstream_bytes_sent|</span><span class="token variable">$upstream_bytes_received|</span><span class="token variable">$upstream_connect_time</span>&#39;</span></span><span class="token punctuation">;</span>
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
        <span class="token directive"><span class="token keyword">gzip_disable</span>   <span class="token string">&quot;MSIE [1-6]\\.&quot;</span></span><span class="token punctuation">;</span>

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

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(js|css)?$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">12h</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ /\\.</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">access_log</span>  /www/wwwlogs/access.log</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">include</span> /www/server/panel/vhost/nginx/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-反向代理" tabindex="-1"><a class="header-anchor" href="#_3-反向代理" aria-hidden="true">#</a> 3.反向代理</h2><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>什么是正向代理？</p></div><p>​ 当客户端访问一台服务器有障碍，访问不到的时候，这时候就可以找一台可以访问到该服务器的另外一台服务器去代替他去访问，这台代替他去访问的服务器称之为代理服务器。然后客户端就可以把请求发送给代理服务器，然后通过代理服务器去访问目标服务器。由代理服务器将目标服务器的返回数据返回给客户端，客户端可以清楚目标服务器的地址，但是目标服务器并不清楚来自哪个客户端，他只知道来自哪个代理服务器。所以，正向代理可以屏蔽或者说隐藏掉客户端的信息。</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>什么是反向代理？</p></div><p>从代理中我们得知代理服务器是给客户端做代理的，他和客户端是一伙的。而反向代理呢其实就是和正向代理反过来，他和服务器是一伙的，它屏蔽掉了服务器的信息，经常用在多台服务器的分布式部署上，像一些大的网站，由于访问人数很多，就需要多台服务器来解决人数多的问题，这时这些服务器就由一个反向代理服务器来代理，客户端发来请求，先由反向代理服务器，然后按一定的规则分发到明确的服务器，而客户端不知道是哪台服务器。常常用nginx来作反向代理。</p><p>Nginx反向代理的配置语法，反向代理中的常用指令：</p><div class="language-cobol line-numbers-mode" data-ext="cobol"><pre class="language-cobol"><code>proxy_pass 
proxy_set_header #该指令用来设置被代理服务器地址，可以是主机名称、IP地址加端口号形式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,12),v={class:"custom-container tip"},k=n("p",{class:"custom-container-title"},"TIP",-1),m=i(`<h2 id="_4-history路由404" tabindex="-1"><a class="header-anchor" href="#_4-history路由404" aria-hidden="true">#</a> 4.history路由404</h2><p>报错原因：我们的服务器是根据页面路由，去按路径寻找资源的。我们打包好的web站点只有一个html页面，不存在其他资源目录下的html，服务器找不到对应页面所以才报404。而hash路由锚点后的路径会被忽略。</p><p>解决方案</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code> <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常见的变量：</p><ul><li>$uri当前请求的URI，但不包含？后的参数</li><li>$args当前请求参数即？后的参数</li><li>$arg_xxx当前请求里某个参数xxx是参数名字</li><li>$http_xxx当前请求的xxx头部对应值</li><li>$request_uri浏览器发起的不做任何修改的请求url中的path如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111</li></ul><h2 id="_5-负载均衡" tabindex="-1"><a class="header-anchor" href="#_5-负载均衡" aria-hidden="true">#</a> 5.负载均衡</h2><p>upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>轮询方式进行负载均衡</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://node</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>指定权重</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>    <span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001 weight=3</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002 weight=2</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003 weight=1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>fail_timeout backup故障等待超时时间.在nginx中，<code>fail_timeout</code>是指在一个给定时间段内，<u><strong>如果某个后端服务器（如Upstream）无法响应请求，nginx将会将其标记为故障状态，并且不再将新的请求发送到该服务器。</strong></u><code>fail_timeout</code>参数用于指定在将该服务器标记为故障状态后，nginx应该等待多长时间来重新尝试将请求发送到该服务器。例如，如果您将<code>fail_timeout</code>设置为10秒，则在某个后端服务器在10秒内无法响应请求时，nginx将将其标记为故障状态，并且在10秒内不会再将新的请求发送到该服务器。在10秒之后，nginx将重新尝试将请求发送到该服务器。如果该服务器仍然无法响应请求，则nginx将再次将其标记为故障状态，并继续等待<code>fail_timeout</code>时间，然后再次尝试将请求发送到该服务器。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span>  node</span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9001 fail_timeout=60</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9002 fail_timeout=20</span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server</span> 127.0.0.1:9003 backup</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,11);function b(w,_){const p=s("RouterLink"),t=s("CommentService");return l(),o("div",null,[u,n("div",v,[k,n("p",null,[a("反向代理解决跨域具体看笔记"),e(p,{to:"/Interview/Browser/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3%E9%9D%A2%E7%BB%8F.html"},{default:d(()=>[a("跨域")]),_:1})])]),m,e(t)])}const y=c(r,[["render",b],["__file","Nginx.html.vue"]]);export{y as default};
