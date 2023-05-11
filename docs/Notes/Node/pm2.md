---
lang: zh-CN
title: pm2基本使用
description: pm2基本知识
collapsible: true
---
# pm2

[PM2 - 文档地址](https://pm2.keymetrics.io/docs/usage/quick-start/)

::: tip

pm2是什么？

:::

PM2（Process Manager 2）是一个流行的 Node.js 进程管理工具，它可以帮助您管理和监控 Node.js 应用程序的运行，包括启动、停止、重启、监视和自动缩放等功能。PM2 是一个开源项目，可以在 Linux、macOS 和 Windows 等操作系统上运行。

::: tip

pm2有哪些特点？

:::

* 多进程管理：PM2 可以启动多个进程来处理请求，从而提高 Node.js 应用程序的性能和可靠性。
* 自动重启：如果应用程序崩溃或停止，PM2 可以自动重启应用程序，以确保应用程序的连续运行。
* 日志管理：PM2 可以将应用程序的日志输出到标准输出、文件或远程日志服务，以便对应用程序进行监视和分析。
* 远程部署：PM2 可以使用 SSH 和 Git 等协议来远程部署应用程序，简化部署和升级流程。
* 监控和自动缩放：PM2 可以监视应用程序的 CPU 和内存使用情况，并根据预设的规则自动增加或减少进程数量，以适应不同的负载情况。

pm2启动后的信息展示

![pm2启动后的信息展示](/Node/pm2-1.png)



## pm2的常用命令

* `pm2 start app.js`：启动应用程序。同理`restart`
* `pm2 stop app.js`：停止应用程序。同理`restart`
* `pm2 restart app.js`：重启应用程序。`pm2 restart all`重启所有应用`pm2 restart a1 a2 a3`重启指定name的应用
* `pm2 logs`：实时查看应用程序的日志。
* `pm2 status`：查看应用程序的状态。
* `pm2 monit`：监视应用程序的 CPU 和内存使用情况。
* `pm2 scale app.js 2`：将应用程序的进程数量扩展到 2 个。
* `pm2 delete app.js`：删除应用程序。
* `pm2 ls|status|list`列出所有应用程序的状态
* ` pm2 monit`仪表盘中监控应用状态信息
* `pm2 plus`会提供web网页的仪表盘服务
* `pm2 delete`停止并且删掉一个应用
* `pm2 show `展示应用程序的元信息









## pm2的配置文件

PM2支持 js/yaml/json配置文件

json文件如下：我们可以通过`pm2 start pm2.config.json`来启动PM2.5

~~~json
{
  "name": "my-app", //用于在 PM2 中标识应用程序。
  "script": "app.js",//应用程序的启动脚本路径。可以是一个相对路径或绝对路径。
  "instances": 2,//应用程序的进程数量，可以是一个数字或 "max"。如果设置为 "max"，则会根据 CPU 核心数自动分配进程数量。
  "exec_mode": "cluster",//应用程序的运行模式，可以是 "fork" 或 "cluster"。如果设置为 "fork"，则每个进程都是一个独立的子进程；如果设置为 "cluster"，则使用 Node.js 的集群模块来运行进程。  ---这里可以看node基础知识笔记
  "env": {//应用程序的环境变量。可以指定一个对象，其中每个属性都是一个环境变量的名称和值。这些环境变量将在应用程序启动时传递给 Node.js 进程。
    "NODE_ENV": "production",
    "PORT": 3000
  }
}
~~~

js文件如下：启动同理json

~~~js
module.exports = {
  apps : [{
    name:"my-app"
    script    : "api.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}
启动多个进程
module.exports = {
  apps : [{
    name   : "limit worker",
    script : "./worker.js",
    args   : "limit",
    watch: ["server", "client"],//当server和client文件夹发生改变就重启进程
    watch_delay: 1000,//指定监听的间隔
    ignore_watch : ["node_modules", "client/img"],//忽略监听这些文件
  },{
    name   : "rotate worker",
    script : "./worker.js",
    args   : "rotate",
    max_memory_restart: '300M'//当内存占用超过300M就会重启进程
  }]
}
~~~





## PM2配置选项

* `watch`：用于监视应用程序文件的变化，并在文件修改时自动重启应用程序。可以指定一个布尔值或字符串数组。如果设置为 true，则监视整个应用程序目录；如果设置为一个字符串数组，则监视数组中指定的文件或目录。
* `log_date_format`：用于指定日志输出的日期格式。可以是一个字符串，例如 "YYYY-MM-DD HH:mm:ss"。
* `error_file` 和 `out_file`：用于指定应用程序的错误日志和输出日志的文件路径。可以是一个相对路径或绝对路径。
* `pid_file`：用于指定应用程序的 PID 文件路径。可以是一个相对路径或绝对路径。
* `interpreter`：用于指定 Node.js 解释器的路径。默认情况下，PM2 会使用系统中的 Node.js 解释器。

~~~shell
例如-》
pm2 start python-app.py --watch  
pm2 start binary-file -- --port 1520
~~~

## PM2的重启进程方式

~~~json
module.exports = {
  apps : [{
    name   : "limit worker",
    script : "./worker.js",
    args   : "limit",
    watch: ["server", "client"],//当server和client文件夹发生改变就重启进程
    watch_delay: 1000,//指定监听的间隔
    ignore_watch : ["node_modules", "client/img"],//忽略监听这些文件
  },{
    name   : "rotate worker",
    script : "./worker.js",
    args   : "rotate",
    max_memory_restart: '300M'//当内存占用超过300M就会重启进程
  },
        {
    name   : "rotate worker",
    script : "./worker.js",
    args   : "rotate",
    restart_delay: 3000//自动重启的延迟时间
  } ,
            {
    name   : "rotate worker",
    script : "./worker.js",
    args   : "rotate",
   autorestart: false//禁止自动重启 === pm2 start app.js --no-autorestart
  } 
 ]
}
~~~







# pm2的集群模式

集群模式能够做什么？能够让Node应用程序在所有可用CPU上扩展（无需修改代码的情况下），这大大提高应用程序的性能和可靠性。pm2的集群模式使用Nojs提供的`Cluster`模块-》详见Node基础知识

~~~shell
按cup数量启动集群模式的进程
pm2 start app.js -i max 
~~~

PM2 的集群模式是一种多进程模型，可以通过将多个 Node.js 进程绑定在同一个端口上来处理更高的并发请求。当一个请求到来时，PM2 会将请求转发给其中一个进程来处理，从而提高了 Node.js 应用程序的性能和可靠性。

在 PM2 集群模式中，有一个主进程和多个工作进程。主进程是一个特殊的进程，用于管理和监控工作进程的运行状态。工作进程是实际处理请求的进程，它们可以共享同一个端口并协同工作。

1. 当您使用 PM2 启动应用程序时，PM2 主进程会启动多个工作进程，并将它们绑定在同一个端口上，例如 3000 端口。
2. 当一个请求到达 3000 端口时，操作系统会将请求转发给其中一个工作进程来处理。如果该工作进程已经在处理其他请求，请求将在队列中等待，直到有空闲的工作进程可用。
3. 当一个工作进程崩溃或停止时，PM2 主进程会自动重启该工作进程，以确保应用程序的连续运行。

通过这种方式，PM2 集群模式可以提高 Node.js 应用程序的性能和可靠性，同时还可以提供更好的负载均衡和故障恢复能力。



# pm2的Fork模式

~~~shell
pm2 start app.js --exec-mode fork
~~~



在 PM2 的 Fork 模式下，每个应用程序都在一个独立的 Node.js 子进程中运行。在这种模式下，PM2 主进程会启动一个或多个子进程来运行应用程序，并监视子进程的运行状态，以确保应用程序的连续运行。

1. 当您使用 PM2 启动应用程序时，PM2 主进程会启动一个 Node.js 子进程，并将应用程序的启动脚本传递给子进程。
2. 子进程会加载应用程序的代码，并在子进程中运行应用程序。
3. 子进程会将应用程序的输出日志发送给 PM2 主进程，以便在 PM2 控制台中显示和管理。
4. 当一个子进程崩溃或停止时，PM2 主进程会自动重启该子进程，以确保应用程序的连续运行。

通过这种方式，PM2 Fork 模式可以帮助您简化 Node.js 应用程序的部署和管理，同时还可以提供更好的可靠性和稳定性。

请注意，在 PM2 Fork 模式下，每个应用程序都运行在独立的子进程中，并且每个子进程都占用一个 CPU 核心。如果您的系统具有多个 CPU 核心，您可以考虑使用 PM2 Cluster 模式来提高应用程序的性能和可靠性。

要在 PM2 中使用 Fork 模式，您可以将 PM2 配置文件中的 `exec_mode` 属性设置为 "fork"，例如：



# pm2对比cluster和fork

PM2 的 Fork 模式和 Cluster 模式是两种不同的多进程模型，它们在应用程序的部署和管理方式、性能特征、可靠性和可扩展性等方面有所不同。

以下是 Fork 模式和 Cluster 模式之间的主要区别：

1. 运行模式：在 Fork 模式下，每个应用程序都在一个独立的 Node.js 子进程中运行；在 Cluster 模式下，多个 Node.js 进程可以绑定在同一个端口上来处理更高的并发请求。
2. 进程数量：在 Fork 模式下，每个应用程序只有一个进程；在 Cluster 模式下，可以根据 CPU 核心数来设置多个进程，以提高应用程序的性能和可靠性。
3. 内存占用：在 Fork 模式下，每个应用程序都占用独立的内存空间；在 Cluster 模式下，多个进程共享同一个内存空间，可以更好地利用系统资源。
4. 负载均衡：在 Fork 模式下，没有内置的负载均衡机制；在 Cluster 模式下，PM2 可以使用 Node.js 的集群模块来实现负载均衡，以确保请求被均匀分配给不同的进程。
5. 可靠性：在 Fork 模式下，每个应用程序的崩溃或停止会影响整个应用程序的运行；在 Cluster 模式下，如果一个进程崩溃或停止，其他进程可以继续处理请求，以确保应用程序的连续运行。

Fork 模式适用于单核 CPU 或需要独立管理每个应用程序的情况，而 Cluster 模式适用于多核 CPU 或需要处理更高并发请求的情况。在选择模式时，您应该根据应用程序的需求和环境来选择最适合的模式，以提高应用程序的性能、可靠性和可扩展性。



<CommentService/>