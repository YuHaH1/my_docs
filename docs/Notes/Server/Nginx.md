---
lang: zh-CN
title: Nginx
description: 关键功能
collapsible: true
---
# Nginx

## 1.常用命令

~~~shell
nginx -v #查看版本
ps -ef | grep nginx  #输出linux进程、
nginx #启动nginx进程
nginx -s reload #重载配置
nginx -s stop # 停止进程
nginx -t # 检查是否有语法错误，以及配置文件地址
~~~

## 2.nginx的配置文件

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

## 3.反向代理

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

## 4.history路由404

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

## 5.负载均衡


upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。

::: tip

轮询方式进行负载均衡

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

:::

::: tip

指定权重

~~~nginx
    upstream  node {
        server 127.0.0.1:9001 weight=3;
        server 127.0.0.1:9002 weight=2;
        server 127.0.0.1:9003 weight=1;
    }
~~~

:::

::: tip

 fail_timeout backup故障等待超时时间.在nginx中，`fail_timeout`是指在一个给定时间段内，<u>**如果某个后端服务器（如Upstream）无法响应请求，nginx将会将其标记为故障状态，并且不再将新的请求发送到该服务器。**</u>`fail_timeout`参数用于指定在将该服务器标记为故障状态后，nginx应该等待多长时间来重新尝试将请求发送到该服务器。例如，如果您将`fail_timeout`设置为10秒，则在某个后端服务器在10秒内无法响应请求时，nginx将将其标记为故障状态，并且在10秒内不会再将新的请求发送到该服务器。在10秒之后，nginx将重新尝试将请求发送到该服务器。如果该服务器仍然无法响应请求，则nginx将再次将其标记为故障状态，并继续等待`fail_timeout`时间，然后再次尝试将请求发送到该服务器。

~~~nginx
upstream  node {
	server 127.0.0.1:9001 fail_timeout=60;
 	server 127.0.0.1:9002 fail_timeout=20;
 	server 127.0.0.1:9003 backup;
}
~~~

:::







<CommentService/>