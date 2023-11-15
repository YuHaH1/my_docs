---
lang: zh-CN
title: docker基础知识
description: 关键功能
collapsible: true
---
# docker基础知识

docker是什么？

docker是一个应用打包、分发、部署的工具，可以理解为一个轻量虚拟机，它提供应用程序需要的运行环境

docker的优点

  1. docker相比虚拟机轻量的多。
  2. 方便升级和扩容。
  3. 采用内核级虚拟技术大大节省cpu和内存占用。

## 1.docker的安装

我是一台CentOS7的服务器 。

~~~shell
1.yum install docker
中间输入 y确认 


service docker start


输入docker version查看信息
[root@VM-8-10-centos ~]# docker version
Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.
Version:      3.3.1
API Version:  3.3.1
Go Version:   go1.16.7
Built:        Wed Nov 10 05:23:56 2021
OS/Arch:      linux/amd64

~~~

~~~shell
如果报错  
Failed to start docker.service: Unit docker.service not found.
删除原有的podman-docker并输入准确的安装指令，指定docker版本类型进行安装
dnf remove podman
安装需要的软件包
yum install -y yum-utils device-mapper-persistent-data lvm2
更新一下镜像源
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
安装docker-ce
yum install docker-ce
~~~



windows安装

https://www.docker.com/get-started/ 下载地址

~~~shell
wsl --install -d Ubuntu
安装后会让你输入用户名密码 在输入用户名时，如果一直显示参考对象类型不支持尝试的操作，
管理员权限打开Powershell，输入如下命令:
netsh winsock reset
然后重新输入即可 
我的账号fancyyu
~~~



[WSL2Linux内核](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)

### Win10安装docker

1. Win10 版本号为 2004（内部版本19041或更高）即可，如果低于此版本可使用 Windows 10 易升工具手动升级。下载 Windows 10 易升工具：[更新最新win10](https://www.microsoft.com/zh-cn/software-download/windows10)

2. ~~~shell
   wsl --install
   wsl --update
   wsl --shutdown
   ~~~





## 2.docker核心

 1. 镜像：镜像是一个模版，一个镜像可以创建多个容器。镜像把我们能够运行的源代码配置环境和第三方依赖包全部打包。
 3. 容器：容器可以理解为镜像的实例，一个容器运行一个服务，我们通过docker客户端创建的运行实例就是容器
 4. 仓库：分为公库和私库，docker hub是最大的docker镜像公库







## 3.docker 镜像操作指令

**启动docker**

```shell
systemctl start docker
```

**关闭docker**

```shell
systemctl stop docker
```

**重启docker**

```shell
systemctl restart docker
```

**查看docker 运行状态**

------如果是在运行中 输入命令后 会看到绿色的active

```shell
systemctl status docker
```

**查看自己服务器中docker 镜像列表**

```shell
docker images
```

**搜索镜像**

```shell
docker search 镜像名
//搜索stars》9000的镜像
docker search --filter=STARS=9000 mysql  STARS >9000 mysql 
```

**拉取镜像** 不加tag(版本号) 即拉取docker仓库中 该镜像的最新版本latest 加:tag 则是拉取指定版本

```shell
docker pull 镜像名 
docker pull 镜像名:tag
```

**运行镜像** 

```shell
docker run 镜像名
docker run 镜像名:Tag
//例如 拉取nginx
docker pull nginx
docker run nginx
```

**删除镜像** ------当前镜像没有被任何容器使用才可以删除

~~~shel
#删除一个
docker rmi -f 镜像名/镜像ID

#删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

#删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)
~~~

**保存镜像**，将我们的镜像保存为tar 压缩文件这样方便镜像转移和保存 ,然后可以在任何一台安装了docker的服务器上 加载这个镜像

~~~shell
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字

docker save tomcat -o /myimg.tar
~~~

**加载镜像**

~~~shell
docker load -i 镜像保存文件位置
~~~

**提交一个镜像**

我们运行的容器可能在镜像的基础上做了一些修改，有时候我们希望保存起来，封装成一个更新的镜像，这时候我们就需要使用 commit 命令来构建一个新的镜像

```shell
docker commit -m="提交信息" -a="作者信息" 容器名/容器ID 提交后的镜像名:Tag
```





## 4.docker容器指令

**查看正在运行容器列表**

```shell
docker ps
```

**查看所有容器** -----包含正在运行 和已停止的

```shell
docker ps -a
```

**运行一个容器**

```shell
# -it 表示与容器进行交互式启动 -d 表示可后台运行容器 （守护式运行）  --name 给要运行的容器 起的名字  /bin/bash  交互路径
docker run -it -d --name 要取的别名 镜像名:Tag /bin/bash 
```



**容器端口与服务器端口映射**

命令：

```shell
-p 宿主机端口:容器端口
docker run -it -d --name redis002 -p 8888:6379 redis:5.0.5 /bin/bash

```

**进入容器**：有时候，我们需要进入容器内部，修改其配置文件，那么如何才能进入容器内呢？

~~~shell
#方式一
docker exec -it 容器名/容器ID /bin/bash
#进入 前面的 redis001容器   
docker exec -it redis001 /bin/bash
#方式二
docker attach 容器名/容器ID

~~~

**退出容器**

~~~shell
#-----直接退出  未添加 -d(持久化运行容器) 时 执行此参数 容器会被关闭  
exit
# 优雅退出 --- 无论是否添加-d 参数 执行此命令容器都不会被关闭
Ctrl + p + q

~~~

**停止容器**

~~~shell
docker stop 容器ID/容器名
~~~

**重启容器**

~~~shell
docker restart 容器ID/容器名
~~~

**启动容器**

~~~shell
docker start 容器ID/容器名
~~~

**kill 容器**

~~~shell
docker kill 容器ID/容器名
~~~

**容器文件拷贝** —无论容器是否开启 都可以进行拷贝

~~~shell
#docker cp 容器ID/名称:文件路径  要拷贝到外部的路径   |     要拷贝到外部的路径  容器ID/名称:文件路径
#从容器内 拷出
docker cp 容器ID/名称: 容器内路径  容器外路径
#从外部 拷贝文件到容器内
docker  cp 容器外路径 容器ID/名称: 容器内路径
~~~

**查看容器日志**

```shell
docker logs -f --tail=要查看末尾多少行 默认all 容器ID
```

**更换容器名**

```shell
docker rename 容器ID/容器名 新容器名
```









## 5.docker实战



~~~dockerfile
FROM nginx:latest
LABEL Author fancy_fish
COPY dist /usr/share/nginx/html
静态网站的部署
~~~



## 6.docker需要了解的内容

**每一个 Docker容器都是独立和安全的应用平台（我们可以理解为，每一个docker容器都相当于在我们的服务器上占用资源然后开辟了属于自己的一个空间（也可以理解为服务器））——也就是说每个容器之间环境都是隔离的**如果外部想要访问容器，那必须得让容器中的端口与宿主机的端口建立联系绑定起来，这个正式的概念叫做` 容器端口映射`。宿主机每个端口都是一个，8888端口被redis002容器绑定了，那么其他所有的容器都不可以使用8888这个端口了!!!



## 7.Docker拷贝文件

本地拷贝到容器目录

可以看到容器就会多一个html11的目录

~~~shell
docker cp  ~/nginx-html nginx1:/usr/share/nginx/html11
~~~

容器目录拷贝到本地

~~~shell
docker cp  nginx1:/usr/share/nginx/html ~/nginx-html
~~~







## Docker配置nginx

1. 拉nginx镜像

   1. ~~~shell
      docker pull nginx:latest
      ~~~

   2. `docker run` 会返回一个容器的 hash：

      ![](/Docker/hash.png)

2. 运行nginx容器

   1. ~~~shell
      docker run --name nginx-test2 -p 80:80 -v /tmp/aaa:/usr/share/nginx/html:ro -e KEY1=VALUE1 -d nginx:latest 
      # :ro表示只读  :rw表示可以写入
      ~~~

   2. -p 是端口映射

      -v 是指定数据卷挂载目录

      -e 是指定环境变量

      -d 是后台运行



## Dockerfile

自己制作镜像可以自动化。

只要在 dockerfile 里声明要做哪些事情，docker build 的时候就会根据这个 dockerfile 来自动化构建出一个镜像来。

~~~dockerfile
FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
~~~

这些指令的含义如下：

* FROM：基于一个基础镜像来修改
* WORKDIR：指定当前工作目录
* COPY：把容器外的内容复制到容器内
* EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
* RUN：在容器内执行命令
* CMD：容器启动的时候执行的命令

我们先通过 FROM 继承了 node 基础镜像，里面就有 npm、node 这些命令了。通过 WORKDIR 指定当前目录。然后通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录。之后通过 RUN 执行 npm install，全局安装 http-server。通过 EXPOSE 指定要暴露的端。CMD 指定容器跑起来之后执行的命令，这里就是执行 http-server 把服务跑起来。













<CommentService/>