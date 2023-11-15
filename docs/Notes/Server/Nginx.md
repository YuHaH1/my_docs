---
lang: zh-CN
title: Nginx
description: 关键功能
collapsible: true
---
# Nginx



## nginx基础

### 1.常用命令

~~~shell
nginx -v #查看版本
ps -ef | grep nginx  #输出linux进程、
nginx #启动nginx进程
nginx -s reload #重载配置
nginx -s stop # 停止进程
nginx -t # 检查是否有语法错误，以及配置文件地址
~~~

### 2.nginx的配置文件

~~~nginx
# 用户组的设置 windows上不生效如果指定具体用户和用户组会报错
user  www www;
# 开启进程数量根据CPU数量
worker_processes auto;
# 错误日志
error_log  /www/wwwlogs/nginx_error.log  crit;
# 指定 Nginx 进程 ID 文件的位置。
pid        /www/server/nginx/logs/nginx.pid;
# 设置 worker 进程打开文件描述符的最大数量。
worker_rlimit_nofile 51200;

stream {
    log_format tcp_format '$time_local|$remote_addr|$protocol|$status|$bytes_sent|$bytes_received|$session_time|$upstream_addr|$upstream_bytes_sent|$upstream_bytes_received|$upstream_connect_time';
    # 指定 TCP/UDP 访问日志文件的位置和格式。
    access_log /www/wwwlogs/tcp-access.log tcp_format;
    # 指定 TCP/UDP 错误日志文件的位置。
    error_log /www/wwwlogs/tcp-error.log;
    # 包含 tcp 目录下所有以 .conf 结尾的文件。
    include /www/server/panel/vhost/nginx/tcp/*.conf;
}
# 定义一个 events 块，用于配置事件模型和连接数量。
events
    {
        use epoll;
        #单个进程最大连接数
        worker_connections 51200;
        # 默认开启，开启后nginx的多个worker将会以穿行方式来处理。只有一个worker会被唤起，其他worker继续睡眠。
        multi_accept on;
    }
# 用于配置 HTTP 服务器。
http{
	include my_docs.conf;
	# 该文件定义了 MIME 类型和文件扩展名之间的映射关系。
     include mime.types;
     # 用于实现 Web 应用防火墙功能。
        
     #调用操作系统读写减少上下文切换
     sendfile on;
	#include luawaf.conf;
	# 包含名为 proxy.conf 的配置文件，用于配置反向代理。
	include proxy.conf;
	# 指定默认的 MIME 类型。
     default_type  application/octet-stream;

        server_names_hash_bucket_size 512;
        client_header_buffer_size 32k;
        large_client_header_buffers 4 32k;
        client_max_body_size 50m;

        sendfile   on;
        tcp_nopush on;
	   # 设置 keepalive 连接的超时时间。
        keepalive_timeout 60;
        tcp_nodelay on;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 256k;
		fastcgi_intercept_errors on;
	   # 开启 gzip 压缩，并配置相关参数。
        gzip on;
        gzip_min_length  1k;
        gzip_buffers     4 16k;
        gzip_http_version 1.1;
        gzip_comp_level 2;
        gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
        gzip_vary on;
        gzip_proxied   expired no-cache no-store private auth;
        gzip_disable   "MSIE [1-6]\.";

        limit_conn_zone $binary_remote_addr zone=perip:10m;
		limit_conn_zone $server_name zone=perserver:10m;

        server_tokens off;
        access_log off;

server
    {
        listen 888;
        server_name phpmyadmin;
        index index.html index.htm index.php;
        root  /www/server/phpmyadmin;

        #error_page   404   /404.html;
        include enable-php.conf;

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log  /www/wwwlogs/access.log;
    }
include /www/server/panel/vhost/nginx/*.conf;
}


~~~

### 3.反向代理

::: tip

什么是正向代理？

:::

​		当客户端访问一台服务器有障碍，访问不到的时候，这时候就可以找一台可以访问到该服务器的另外一台服务器去代替他去访问，这台代替他去访问的服务器称之为代理服务器。然后客户端就可以把请求发送给代理服务器，然后通过代理服务器去访问目标服务器。由代理服务器将目标服务器的返回数据返回给客户端，客户端可以清楚目标服务器的地址，但是目标服务器并不清楚来自哪个客户端，他只知道来自哪个代理服务器。所以，正向代理可以屏蔽或者说隐藏掉客户端的信息。

::: tip

什么是反向代理？

:::

从代理中我们得知代理服务器是给客户端做代理的，他和客户端是一伙的。而反向代理呢其实就是和正向代理反过来，他和服务器是一伙的，它屏蔽掉了服务器的信息，经常用在多台服务器的分布式部署上，像一些大的网站，由于访问人数很多，就需要多台服务器来解决人数多的问题，这时这些服务器就由一个反向代理服务器来代理，客户端发来请求，先由反向代理服务器，然后按一定的规则分发到明确的服务器，而客户端不知道是哪台服务器。常常用nginx来作反向代理。

Nginx反向代理的配置语法，反向代理中的常用指令：

```cobol
proxy_pass 
proxy_set_header #该指令用来设置被代理服务器地址，可以是主机名称、IP地址加端口号形式。
```

::: tip

反向代理解决跨域具体看笔记[跨域](../../Interview/Browser/浏览器相关面经.md)  

:::

### 4.history路由404

报错原因：我们的服务器是根据页面路由，去按路径寻找资源的。我们打包好的web站点只有一个html页面，不存在其他资源目录下的html，服务器找不到对应页面所以才报404。而hash路由锚点后的路径会被忽略。

解决方案

~~~nginx
 try_files $uri $uri/ /index.html;
~~~

常见的变量：

* $uri当前请求的URI，但不包含？后的参数
* $args当前请求参数即？后的参数
* $arg_xxx当前请求里某个参数xxx是参数名字
* $http_xxx当前请求的xxx头部对应值
* $request_uri浏览器发起的不做任何修改的请求url中的path如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111

### 5.负载均衡


upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。

* 默认轮询方式进行负载均衡。（单纯使用轮询无法保持会话，一个服务器返给了客户端cookie其他服务器并没有该session信息）


~~~nginx
upstream  node {
    server 127.0.0.1:9001;
    server 127.0.0.1:9002;
    server 127.0.0.1:9003;
}
location / {
    proxy_pass http://node;
}
~~~

* 指定权重


~~~nginx
    upstream  node {
        server 127.0.0.1:9001 weight=3;
        server 127.0.0.1:9002 weight=2;
        server 127.0.0.1:9003 weight=1;
    }
~~~

不常用的负载均衡策略

* ip_hash：根据客户端ip地址转发同一台服务器
* last_conn：最少连接访问（很少用，有时候有的服务器是我们特地设置低权重的）
* url_hash：根据用户指定url定向流量转发请求（将请求url生成hash，相同的hash转发到同一个服务器，例如可能出现注册和登陆接口打到不同服务器。通常访问固定资源，且不在同一服务上，这种情况使用。）
* fait：根据后端服务响应时间转发请求

相关最小配置项功能

*  `fail_timeout` backup故障等待超时时间.在nginx中，`fail_timeout`是指在一个给定时间段内，<u>**如果某个后端服务器（如Upstream）无法响应请求，nginx将会将其标记为故障状态，并且不再将新的请求发送到该服务器。**</u>`fail_timeout`参数用于指定在将该服务器标记为故障状态后，nginx应该等待多长时间来重新尝试将请求发送到该服务器。例如，如果您将`fail_timeout`设置为10秒，则在某个后端服务器在10秒内无法响应请求时，nginx将将其标记为故障状态，并且在10秒内不会再将新的请求发送到该服务器。在10秒之后，nginx将重新尝试将请求发送到该服务器。如果该服务器仍然无法响应请求，则nginx将再次将其标记为故障状态，并继续等待`fail_timeout`时间，然后再次尝试将请求发送到该服务器。

  ~~~nginx
  upstream  node {
  	server 127.0.0.1:9001 fail_timeout=60;
   	server 127.0.0.1:9002 fail_timeout=20;
   	server 127.0.0.1:9003 backup;
  }
  ~~~

* `down`加了该属性的服务器不参与负载均衡，相当于下线

  ~~~nginx
  upstream  node {
  	server 127.0.0.1:9001 down;
   	server 127.0.0.1:9002 fail_timeout=20;
   	server 127.0.0.1:9003 backup;
  }
  ~~~

* `backup`备用机当没有机器能用时请求会打到该IP上

  ~~~nginx
  upstream  node {
  	server 127.0.0.1:9001 down;
   	server 127.0.0.1:9002 down;
   	server 127.0.0.1:9003 backup;
  }



### 6.动静分离

动静分离主要是为了让服务器专门负责处理业务请求。而静态资源交给nginx，减少服务器压力。

动静分离适合中小型企业。主要是因为中小型网站并发量不高，且需要分离的静态资源不多。而大型企业类似于淘宝，用户上传的资源就比较多（买家秀 买家秀等）。

~~~nginx
server {
    listen  8082;
    server_name localhost;
    location / {
        proxy_pass http://localhost:3022;
    }
    location ~* \.(js|css|pdf|pnf|jpg|svg)$ {
        # 将该站的js|css|图片文件放到root指定目录下
        root html;
    }
}     
~~~



### 8.URLRewrite

重写url可以隐藏我们实际访问服务器的物理地址，提高安全性

例如

~~~nginx
    location / {
        rewrite ^/rewrite.html$ /api/agg break;
        proxy_pass http://localhost:3022;
    }
~~~

![](/Nginx/rewrite_res.png)

服务端

~~~js
app.get('/api/agg', async (req, res) => {

    res.send({
        msg: 123,
        code: 200,
        data: 12321312312
    })
})
~~~



标记说明

* `last`：本条规则匹配完成后继续向下匹配新的`location` URI规则
* `break`: 本条规则匹配完成即终止，不再向后匹配规则
* `redirect`：返回302临时重定向，浏览器会显示跳转后的URI地址
* `permanent`：返回301永久重定向，浏览器地址栏会显示跳转后的URL地址







### 7.代码压缩



~~~nginx

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    	include       mime.types;
    	default_type  application/octet-stream;
    	sendfile        on;
    	keepalive_timeout  65;
	gzip on;
	gzip_types text/plain text/css application/javascript application/json;
  	gzip_min_length 10;
  	gzip_comp_level 5;
  	gzip_proxied any;
  	gzip_vary on;
  	gzip_disable "msie6";
  	gzip_buffers 16 8k;
  	gzip_http_version 1.1;
  	server {
    		listen 8088;
    		server_name localhost;
    		location / {
      			root E:vue\vite-build\dist;
      			index index.html;
      			try_files $uri $uri/ /index.html;
     			gzip_static  on;
    		}
 	 }
    
}
~~~

* `gzip on;`：开启 Gzip 压缩。
* `gzip_types`：指定需要压缩的文件类型。在示例中，我们指定了常见的文本文件类型和 JavaScript、JSON 文件类型。
* `gzip_min_length`：设置压缩文件的最小大小。在示例中，我们将最小大小设置为 1024 字节。
* `gzip_comp_level`：设置压缩级别。在示例中，我们将压缩级别设置为 5。
* `gzip_proxied`：指定在代理服务器上启用压缩的条件。在示例中，我们设置为 `any` 来允许任何代理服务器上的压缩。
* `gzip_vary`：为代理缓存服务指定 Vary 头。在示例中，我们设置为 `on` 来告知代理缓存服务器根据 Accept-Encoding 头来提供适当的压缩版本。
* `gzip_disable`：禁用压缩的用户代理。在示例中，我们禁用了 "msie6"。
* `gzip_buffers`：设置用于压缩的缓冲区大小。
* `gzip_http_version`：指定使用的 HTTP 协议版本。



### 9.防盗链Referer

使用场景:某些资源不希望被外站引用时。

当我们访问网站资源，请求头不会有`Referer`，在后续访问相同资源浏览器会携带`Referer`字段，该字段记录了用户的站点。以便于服务端验证用户是否是非法请求。（当首次访问和后续访问站点不一致时）

~~~nginx
   location ~* \.(js|css|pdf|pnf|jpg|svg)$ {
        valid_referers  192.168.1.1;
        if ($invalid_referer) {
            return 403;
        }

        # 将该站的js|css|图片资源放到root指定目录下
        root html;
    }
    
~~~

然后再访问

![](/Nginx/referer.png)

`valid_referers`  后可以配置一些属性如下：

* none：检测Referer头 域不存在的情况
* `block`：检测Referer头域的值被防火墙或者代理服务器删除/伪装的情况。
* `server_names`设置一个或多URL，检测Referer头域是否是这些URL中的一个 ，例如上面的`192.168.1.1`/域名

### 10.location 后的匹配

* location 和路径之间加了个 =，代表精准匹配，也就是只有完全相同的 url 才会匹配这个路由。当访问localhost/user/的时候会匹配该路由

  ~~~nginx
  location = /user/{
  	return 200 "1231231 success"
  }
  ~~~

* 不带 = 代表根据前缀匹配，后面可以是任意路径。例如: 当url= `localhost/user/index2.html`

  ~~~nginx
  location /user{
  	return 200 $uri # 这里的 $uri 是取当前路径。 /user/index2.html
  }
  ~~~

* 然后如果想支持正则，就可以加个 `~`。如果让正则不区分大小写加`*`

  ~~~nginx
  location ~ \.(js|jpg|css|png|svg)${
      root html;
  }
  location ~* \.(js|jpg|css|png|svg)${ #不区分大小写
      root html;
  }
  ~~~

* 如果想提高`location`优先级可以加`^~`

  ~~~nginx
  location ^~ /user{
      return 200 '高优先级';
  }
  location ~* /user/.*\.html${
      return 200 $uri;
  }
  ~~~

**优先级顺序：****精确匹配`（=）` > 高优先级前缀匹配`（^~）` > 正则匹配`（~/~*）` > 普通前缀匹配`(/)`**



#### root和alias区别

同样是` /222/xxx/yyy.html`:

如果是用 root 的配置，会把整个 uri 作为路径拼接在后面。也就是会查找` /dddd/222/xxx/yyy.html `文件。

如果是 alias 配置，它会把去掉` /222 `之后的部分路径拼接在后面。也就是会查找 `/dddd/xxx/yyy.html `文件。也就是 我们 **root 和 alias 的区别就是拼接路径时是否包含匹配条件的路径。**

~~~nginx
location /222 {
    alias /dddd;
}

location /222 {
    root /dddd;
}
~~~











## nginx高级

### 集群化

集群式的方案指的是每个服务器后端代码要一致 

### 分布式

多个服务器提供提供不同服务

### nginx如何会话保持

什么是会话保持?就是保存用户状态信息，例如登录态

有哪些方式能够维持?如下：

1. Nginx
   1. `ip_hash`
   2. 其他hash例如 `$cookie_jseeeionid`
   3. 其他hash例如` $request_uri`
2. lua对nginx进行二次开发，高级定制
3. 后端`Redis` + `SpringSession`(该框架会将用户session存到redis中)



#### ip_hash保持会话

**原理**：这种方式会根据用户ip地址生成一个hash，然后根据服务器数量进行取余，根据余数决定该用户的请求打到哪个服务器。

**应用场景**：中小项目，快速扩容。

**不适用的场景**如下：

1. 不适合局域网里运行的项目，例如企业内部Erp，学校考试系统等等
2. 一些关键操作需要下一步下一步（例如银行转账），不能出现服务器宕机，会话丢失的情况。

**ip_hash缺点如下**：

1. **IP集中，流量倾斜**由于学校，大公司没公网IP用户可能共用一个IP地址，导致大量请求取得一个hash值，然后请求集中到某个服务器上，造成流量倾斜（。
2. 后端服务器宕机，用户会话消失

**实现方式**：

~~~nginx
upstream testip_hash{
    ip_hash;
    server 127.0.0.1:2022;
    server 127.0.0.1:3033;
}
~~~

#### request_uri保持会话

**原理**：访问相同url时会转发到固定的服务器上。

**使用场景**如下：

1. 不持支cookie，将sessionid放到url中
2. 对于一些资源的请求，例如请求一些电影/音乐的url固定打到某个服务器上

**实现方式**：

~~~nginx
upstream test_request_hash{
    hash     $request_uri;
    server 127.0.0.1:2022;
    server 127.0.0.1:3033;
}
~~~



#### cookie_jsessionid保持会话

**原理**：让nginx对服务器下发的cookie做hash

1. 当登陆系统时，服务端下发一个文件给客户端
2. 下次请求客户端会携带该文件

**优点**：

1. 相比上面的ip_hash可以在局域网中保持会话
2. 也不会造成流量倾斜（固定用户转发到固定的服务器）

**实现方式**：

~~~nginx
upstream api_serve{  
    hash  $cookie_token;
    server 127.0.0.1:3044 weight=2 max_fails=2 fail_timeout=30s ; 
    server 127.0.0.1:3033 weight=1 max_fails=2 fail_timeout=30s ;   
}  
~~~

::: tip

这个`$cookie_`下划线后面的内容和后端协商定义，nginx会读取cookie中下划线后的这个Name，将他的Value哈希

:::

![](/Nginx/cookie_hash.png)

### Keep-alive

长连接选项，开启前每次发送请求都要建立TCP连接

#### 客户端配置Keep-alive

~~~nginx
http{
    keepalive_timeout 65 65;# 超过这个时间没有活动 keepalive失效
    keepalive_time 1h;#默认的tcp连接总时长，超时后失效
    send_timeout 60;#默认60s，时间不要太短。注意：系统中如果有耗时操作超过send_timeout指定时间，会强制断开连接。（发送请求后到得到回复之前的时间就是sendtimeout）
    keepalive_requests 1000;#一个tcp复用中可以并发接收的请求个数
}
~~~



#### 对上游服务器Keep-alive

~~~nginx
upstream api_serve{  
    keepalive 100;  
    keepalive_requests 1000;
    server 127.0.0.1:3044 weight=2 max_fails=2 fail_timeout=30s ; 
    server 127.0.0.1:3033 weight=1 max_fails=2 fail_timeout=30s ;   
}  
server{
    listen 80;
    server_name localhost;
    location /{
        proxy_http_version 1.1 ;
        proxy_set_header Connection "";
        proxy_pass http://api_serve;
    }
}
~~~



### Nginx缓冲区配置

缓冲：每次使用完都会将该缓冲区内数据清除下次循环使用

缓存：每次都会将数据存储到缓存区，并不会清除

* `client_body_buffer_size`:客户端请求中的body缓冲区大小
* `client_body_temp_path`:磁盘存储位置
* `client_max_body_size`:客户端发送最大body数据限制（请求头Content-length标记数据大小），如果超过限制报413（请求实体太大）
* `client_body_timeout`:客户端和服务端建立连接后发送request body的超时时间，如果客户端指定时间内没发送任何内容Nginx返回408请求超时
* `client_header_timeout`:客户端向服务端发送完整request header的超时时间，如果客户端指定时间没发送完整header Nginx返回408

### 获取用户真实IP地址

上有服务器获取IP时，不做处理获取的IP为nginx虚拟主机的，想要获取用户真实IP有如下方法

* Nginx将真实IP地址写入header中，供服务端读取

  ~~~nginx
  server{
      proxy_set_header X-Forwarded-For $remote_addr;
  }
  ~~~



### GZIP压缩

有两种常用压缩算法

* GZIP
* BR

响应头中的一些标识：

* `Content-Encoding`压缩格式
* `Transfer-Encoding`传输格式

**Nginx - GZIP动态压缩和静态压缩的区别**：

1. 动态压缩：
   * 对象：动态压缩是指对动态生成的内容进行压缩。这些内容通常是由后端应用程序（如动态网页、API 响应等）生成的，并且每次请求可能会有不同的内容。
   * 压缩方式：在动态压缩中，Nginx 通过使用 gzip 模块或其他相关模块，根据客户端请求的 Accept-Encoding 头部，将动态生成的内容进行压缩。Nginx 在将压缩后的内容发送给客户端之前，会将内容进行压缩，并设置相应的 Content-Encoding 头部，指示内容已被压缩。
2. 静态压缩：
   * 对象：静态压缩是指对事先存在的静态文件进行压缩。这些文件通常是网站的静态资源，如 HTML、CSS、JavaScript、图像文件等。
   * 压缩方式：在静态压缩中，Nginx 通过使用 gzip_static 模块或其他相关模块，在将静态文件发送给客户端之前，先检查是否存在对应的压缩文件（如以 .gz 扩展名的文件）。如果存在压缩文件并且客户端支持压缩，Nginx 会直接发送压缩文件，从而减少传输大小和提高传输速度。**这种方式支持高级特性sendfile**

#### GZIP动态压缩配置

GZIP缺点：开启后无法使用Nginx高级特性之sendfile

~~~nginx
http {

    #gzip on;
    #gzip_comp_level 5; 压缩等级1-9，压缩等级太高解压缩速度越慢，占用CPU越高
    #gzip_min_length 256; 最小文件大小，小于这个大小的文件不做压缩
    #gzip_types  text/plain application/x-javascript application/xml text/css; 对某些文件类型去压缩
    #gzip_proxied any;无条件启用压缩，一般不做配置
    #gzip_vary on; 可不做配置
    #gzip_disable "msie6";
    #gzip_buffers 16 8k;
    #gzip_http_version 1.1;支持最低http版本号
}

~~~

#### GZIP静态压缩配置

[文档](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html)

GZIP将静态资源文件压缩好，Nginx在磁盘上找.gz的静态文件通过sendfile方式传递给客户端。

~~~nginx
http {
    #gzip on;
    gunzip on;#对于不支持解压的，nginx会解压后给客户端
    gzip_static on;
    #gzip_comp_level 5; 压缩等级1-9，压缩等级太高解压缩速度越慢，占用CPU越高
    #gzip_min_length 256; 最小文件大小，小于这个大小的文件不做压缩
    #gzip_types  text/plain application/x-javascript application/xml text/css; 对某些文件类型去压缩
    #gzip_proxied any;无条件启用压缩，一般不做配置
    #gzip_vary on; 可不做配置
    #gzip_disable "msie6";
    #gzip_buffers 16 8k;
    #gzip_http_version 1.1;支持最低http版本号
}

~~~

### Brotli压缩

Brotli是谷歌开源的一种新型压缩算法，Brotli压缩比Gzip压缩性能更好。开启Brotli压缩功能后，CDN节点会对资源进行智能压缩后返回，缩小传输文件大小，提升文件传输效率，减少带宽消耗。





#### sendfile原理

**优点**

通过使用 sendfile，Nginx 可以利用操作系统的功能，将文件内容从磁盘读取到内核空间，并直接通过网络发送给客户端，省去了数据在用户空间和内核空间之间的复制过程。这种零拷贝的机制大大减少了 CPU 和内存的开销，提高了数据传输的效率和性能。当启用 gzip 动态压缩时，Nginx 在发送压缩后的响应数据之前需要先将数据压缩到内存中，然后才能使用 sendfile 将数据发送给客户端。这意味着在启用动态压缩的情况下，无法直接使用 sendfile 来发送压缩后的响应文件，而是需要使用替代的发送方式。）

在不使用sendfile传输文件会采用的过程：

![](/Nginx/send_file.png)

1. 客户端请求文件：当客户端发送一个请求来获取某个文件时，Nginx 接收到该请求并开始处理。
2. 打开文件：Nginx 使用系统调用（如 open）打开请求的文件，并获取文件的文件描述符（File Descriptor）。
3. 读取文件内容：Nginx 通过文件描述符从磁盘读取文件的内容，并将数据复制到用户空间的读取缓冲区。
4. 数据复制：Nginx 将从文件读取的数据从读取缓冲区复制到内存中的发送缓冲区。
5. 网络发送：Nginx 使用普通的网络发送操作将发送缓冲区中的数据发送到网络。
6. 完成发送：一旦发送完成，Nginx 关闭文件描述符，并根据需要继续处理其他请求。

在这个过程中，文件的内容首先被读取到用户空间的读取缓冲区，然后再复制到内存中的发送缓冲区，最后通过普通的网络发送操作发送给客户端。相比于 sendfile 机制，这种方式涉及了数据在用户空间和内核空间之间的复制，因此会增加额外的 CPU 和内存开销。

**sendfile为什么可以直接传输？**

1. 零拷贝（Zero-copy）：sendfile 机制利用了零拷贝技术，它允许数据在内核空间和网络栈之间进行传输，而无需在用户空间和内核空间之间进行数据复制。这意味着文件数据可以直接从磁盘读取到内核空间的发送缓冲区，然后直接发送给网络，避免了不必要的数据复制过程，提高了传输效率。
2. 文件描述符（File Descriptor）：sendfile 使用文件描述符来标识要传输的文件。文件描述符是操作系统内核为每个打开的文件分配的唯一标识符。通过将文件描述符传递给 sendfile 系统调用，操作系统内核可以直接从文件系统中读取文件内容，并将其传输到网络中。
3. 高效的内核调度：操作系统内核能够高效地调度磁盘和网络操作，以最大程度地利用硬件资源。通过直接将文件内容传输到网络，内核可以更好地管理磁盘和网络之间的数据流，从而提高传输效率。

**零拷贝技术的工作原理：**

1. 文件描述符传递：当使用 sendfile 进行文件传输时，Nginx 将源文件的文件描述符和目标网络连接的文件描述符传递给操作系统内核。
2. 内核空间读取：操作系统内核使用源文件的文件描述符和指定的发送偏移和大小参数，直接在内核空间中定位到文件的相应位置，并将文件内容读取到内核空间的发送缓冲区。
3. 零拷贝传输：一旦文件内容被读取到内核空间的发送缓冲区，操作系统内核就可以直接将数据发送到网络，而无需将数据从内核空间复制到用户空间。

**读取磁盘内容发到远程服务器的过程**

1. 磁盘中读取目标文件内容拷贝到内核缓冲区 （第一次拷贝）
2. CPU再把内核缓冲区的数据复制到用户空间的缓冲区 （第二次拷贝）
3. 然后在应用程序中调write方法，将用户空间缓冲区的数据拷贝到内核下的Socket buffer里（第三次拷贝）
4. 然后将Socket buffer的数据复制到网卡缓冲区 （第四次拷贝）
5. 最后网卡缓冲区将数据复制到目标服务器上

<u>存在的问题</u>：

1. 用户空间-》内核空间拷贝 和 内核空间-》用户空间的拷贝浪费性能
2. 用户空间和内核空间切换会带来CPU上下文切换，影响CPU性能

**零拷贝原理**：省略掉两次多余拷贝过程将数据从内核空间缓冲区直接拷贝到Socket buffer







### 资源合并SSI

SSI（Server Side Includes）是一种服务器端技术，用于在网页中包含其他文件的内容。Nginx 支持 SSI 功能的主要作用和优点如下：

1. 模块化内容组合：SSI 允许将多个组件和片段组合成一个完整的网页。通过使用 `<!--#include -->` 指令，可以在网页中嵌入其他文件的内容，如页眉、页脚、导航栏等。这样可以简化网页的维护和管理，使结构更清晰。
2. 动态内容更新：SSI 允许将动态内容嵌入静态网页中。通过使用 `<!--#echo -->` 或 `<!--#set -->` 等指令，可以在网页中显示动态生成的内容，如当前时间、访问计数等。这样可以在不修改整个网页的情况下更新特定部分的内容。
3. 提高可重用性：通过将公共组件和部分独立为单独的文件，可以在多个页面中重复使用。当需要更新这些组件时，只需修改相应的文件，而不需要逐个修改每个包含该组件的页面。
4. 简化网页维护：使用 SSI 可以将网页内容分成多个文件，使得网页的维护更加灵活和可控。当需要修改某个组件时，只需修改相应的文件，而无需修改所有包含该组件的网页。
5. 减少带宽消耗：SSI 允许在服务器端进行内容组合和处理，减少了客户端请求的数据量。这可以降低带宽消耗，并提高网页的加载速度。

[文档地址](https://nginx.org/en/docs/http/ngx_http_ssi_module.html)

简单配置示例

~~~nginx

server {
    listen  80;
    server_name localhost;
    location / {
        ssi on;
        root html;
        index index.html index.htm;
    }
    location ~* \.(js|css|pdf|pnf|jpg|svg)$ {
        # 将该站的js|css|图片资源放到root指定目录下
        root html;
    }
}     
~~~

文件夹目录

![](/Nginx/ssi_dir.png)

写模板html

~~~html
footer.html
<div style="color:blueviolet;">
    ssi:---- footer.....footervfooterfooter
</div>
header.html
<div style="color: red;">
    ssi:----header.....headerheaderheaderheaderheaderheader
</div>

~~~

index.html文件入口中填入模板文件地址` <!--# include file="xxx.html" -->`

~~~html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + Vue</title>
  <script type="module" crossorigin src="/assets/index-ba0f51e4.js"></script>
  <link rel="modulepreload" crossorigin href="/assets/vue-vendor-aac3cfc3.js">
  <link rel="modulepreload" crossorigin href="/assets/utils-a1a55e9c.js">
  <link rel="modulepreload" crossorigin href="/assets/vue-utils-9a80809b.js">
  <link rel="stylesheet" href="/assets/index-f20ba052.css">
</head>

<body>
  <!--# include file="header.html" -->
  <div id="app"></div>
  <!--# include file="footer.html" -->
</body>

</html>
~~~

结果展示

![](/Nginx/ssi_res.png)

SSI配置和SSI模板配置参考文档





## 实战问题解决

### nginx解决跨域

前端配置环境

~~~json
 "dev": "vite --host"
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.102.217.233:5173/
  ➜  Network: http://172.30.96.1:5173/
~~~

前端

~~~nginx
axios.get('http://127.0.0.1:8088/api/user').then(res => {
    console.log(res);
});
~~~

后端

~~~js
const express = require('express');
const compression = require('compression')
const path = require('path');
const app = express()
const port = 3033

app.get('/api/user', (req, res) => {
    res.send({
        msg: 123,
        code: 200
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
~~~

nginx

~~~nginx
server {
    listen  8088;
    server_name 127.0.0.1;
    location / {
        proxy_pass  http://127.0.0.1:5173;
        # 配置HMR websocket协议
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarder-For
        $proxy_add_x_forwarded_for;
    }
    location /api {
        # 如果后端接口没有api前缀 则加上rewrite 例如后端接口app.get('/user',...)
        # 前端请求不变http://127.0.0.1:8088/api/user
        # rewrite ^/api/(.*)$ /$1 break;
        proxy_pass  http://127.0.0.1:3033;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarder-For
        $proxy_add_x_forwarded_for;
    }
}    
~~~



#### bff解决跨域

~~~js
const express = require('express');
const compression = require('compression')
const axios = require('axios');
const path = require('path');
const app = express()
const port = 3022
app.use(compression())
app.use(express.static(path.join(__dirname, '../dist'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.gz')) {
            res.set('Content-Encoding', 'gzip');
            res.set('Content-Type', 'application/gzip');
        }
    },
}))
app.get('/api/agg', async (req, res) => {
    const result = await axios.get('http://127.0.0.1:3033/api/user')
    console.log(`聚合接口`, result.data)
    res.send({
        msg: 123,
        code: 200,
        data: result.data
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
~~~



### 负载均衡

~~~nginx
upstream api_serve{  
   # 30s内检查心跳发送两次包，未回复就代表该机器宕机，请求分发权重比为1:2   
    server 127.0.0.1:3044 weight=2 max_fails=2 fail_timeout=30s ; 
    server 127.0.0.1:3033 weight=1 max_fails=2 fail_timeout=30s ;   

}  
server {
    listen  8088;
    server_name 127.0.0.1;
    location / {
        proxy_pass  http://127.0.0.1:5173;
        proxy_set_header Host $host; # $host是nginx内置变量，表示客户端请求的主机名。
        proxy_set_header X-Real-IP $remote_addr;# $remote_addr是nginx内置变量，表示客户端的IP地址。
        # 这条指令将会将请求的X-Forwarded-For字段设置为客户端的IP地址，并$proxy_add_x_forwarded_for是nginx内置变量，表示代理服务器的IP地址。
        proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;
    }
    location /api {
        # 请求交给名为api_serve的upstream上  
        proxy_pass http://api_serve;  
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;
    }
}
~~~



### nginx灰度系统

**灰度系统是什么？**

软件开发一般不会上来就是最终版本，而是会一个版本一个版本的迭代。新版本上线前都会经过测试，但就算这样，也不能保证上线了不出问题。所以，在公司里上线新版本代码一般都是通过灰度系统。灰度系统可以把流量划分成多份，一份走新版本代码，一份走老版本代码。

**举例子**

比如做了一个新功能，但是不确定是否稳定，就灰度20%，看下有没有线上问题；改了一个按钮，不知道用户是不是喜欢，就只让20%的用户能看到新按钮，看下点击率有没有显著下降。用户在访问到网站的时候，先通过Nginx，Nginx选择用户访问老站点还是新站点

**ngxin配置示例**

如果包含 version=1.0 的 cookie，那就走 version1.0_server 的服务，有 version=2.0 的 cookie 就走 version2.0_server 的服务，否则，走默认的。cookie带上version如果是2.0就会将请求打到3001服务器上

~~~nginx
upstream version1.0_server {
    server 192.168.1.6:3000;
}
 
upstream version2.0_server {
    server 192.168.1.6:3001;
}

upstream default {
    server 192.168.1.6:3000;
}

set $group "default";
if ($http_cookie ~* "version=1.0"){
    set $group version1.0_server;
}

if ($http_cookie ~* "version=2.0"){
    set $group version2.0_server;
}

location ^~ /api {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://$group;
}
~~~







<CommentService/>