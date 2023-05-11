---
lang: zh-CN
title: linux常用指令
description: 关键功能
collapsible: true
---
# linux常用指令

## 文件相关命令

### 切换目录、

~~~shell
cd
cd ~ #进入 "home" 目录
cd - #进入上一次工作路径
~~~



### 查看目录

~~~shell
#查看当前工作目录路径
pwd
pwd -P #查看软链接的实际路径

#查看目录  
ls   
ls -a 列出目录所有文件，包含以.开始的隐藏文件
ls -A 列出除.及..的其它文件
ls -r 反序排列
ls -t 以文件修改时间排序
ls -S 以文件大小排序
ls -h 以易读大小显示
ls -l 除了文件名之外，还将文件的权限、所有者、文件大小等信息详细列出来
~~~



### 创建目录

~~~shell
#创建目录
mkdir 目录名
mkdir -p 目录名 #如果该目录不存在则创建
~~~



### 删除文件/目录



~~~shell
rm 删除一个目录中的一个或多个文件或目录，如果没有使用 -r 选项，则 rm 不会删除目录。如果使用 其来删除文件，通常仍可以将该文件恢复原状。
rm [-选项] 文件/目录
rm -i *.log 删除任何 .log 文件，删除前逐一询问确认：
rm -rf test 删除 test 子目录及子目录中所有档案删除，并且不用一一确认：.
rm -- -f*  删除以 -f 开头的文件

rmdir  从一个目录中删除一个或多个子目录项，删除某目录时也必须具有对其父目录的写权限。不能删除非空目录~！！！
rmdir -p a

~~~



### 移动文件/重命名

移动文件或修改文件名，根据第二参数类型（如目录，则移动文件；如为文件则重命令该文件）。

当第二个参数为目录时，第一个参数可以是多个以空格分隔的文件或目录，然后移动第一个参数指定的多个文件到第二个参数指定的目录中。

~~~shell
mv test.log test1.txt # 将文件 test.log 重命名为 test1.txt
mv llog1.txt log2.txt log3.txt /test3# 将文件 log1.txt,log2.txt,log3.txt 移动到根的 test3 目录中

mv -i log1.txt log2.txt# 将文件 file1 改名为 file2，如果 file2 已经存在，则询问是否覆盖！！
mv * ../ # 移动当前文件夹下的所有文件到上一级目录
~~~



### 复制文件

将源文件复制至目标文件，或将多个源文件复制至目标目录。

注意：命令行复制，如果目标文件已经存在会提示是否覆盖，而在 shell 脚本中，如果不加 -i 参数，则不会提示，而是直接覆盖！

~~~shell
-i 提示
-r 复制目录及目录内所有项目
-a 复制的文件与原文件时间一样

cp -ai a.txt test# 复制 a.txt 到 test 目录下，保持原文件时间，如果原文件存在提示是否覆盖。

cp -s a.txt link_a.txt # 为 a.txt 建立一个链接（快捷方式）
~~~



### cat命令

cat命令有三个功能

1.一次显示整个文件:

```shell
cat filename
```

2.从键盘创建一个文件:并直接进入编辑模式 如果文件已经存在直接进入文件编辑

```shell
cat > filename   #参数-n 加行号
```

3.将几个文件合并为一个文件:

```shell
cat file1 file2 > file3
```



### 查找文件

~~~shell
# find在指定目录下查找
find path -name testfile
find /  -name nginx
find /  -name nginx* #模糊匹配 
find /  -mmin -20  #最近20分钟内修改的文件
find /  -mtime -1  #最近1天内修改的文件

# linux系统每天至少自动扫描一次文件，将结果保存到数据库，locate查的是数据库(/var/lib/mlocate/mlocate.db)记录。locate查询比find要快，但最新文件如果在数据库中没有记录,是需要手动更新（updatedb）
locate  nginx 

# which从环境变量文件（/etc/profile）中的path目录中查找，且which找的都是可执行文件。
which nginx

# 与which类似查询可执行文件，whereis查询更多，会查找出相关的man文件
whereis nginx
~~~

### 解压和压缩

用来压缩和解压文件。tar 本身不具有压缩功能，只具有打包功能，有关压缩及解压是调用其它的功能来完成。

弄清两个概念：打包和压缩。打包是指将一大堆文件或目录变成一个总的文件；压缩则是将一个大的文件通过一些压缩算法变成一个小文件

**常用参数：**

```shell
-c 建立新的压缩文件
-f 指定压缩文件
-r 添加文件到已经压缩文件包中
-u 添加改了和现有的文件到压缩包中
-x 从压缩包中抽取文件
-t 显示压缩文件中的内容
-z 支持gzip压缩
-j 支持bzip2压缩
-Z 支持compress解压文件
-v 显示操作过程


tar -cvf log.tar 1.txt 2.txt  将1.txt和2.txt打包成 tar 包
tar -cvf *.txt 将全部txt打包成 tar 包


解压

1、tar  -zxv  -f  aa.tar.gz     把aa.tar.gz 解压缩到当前目录

2、tar  -zxv  -f  aa.tar.gz    -C   /bb     把aa.tar.gz 解压缩到/bb目录下

```



## 进程相关命令



### 查看进程状态

~~~shell
ps aux | grep 指定进程 #查看指定进程的信息（可以是指定进程名、PID）

ps 命令：显示当前用户的进程信息。常用参数有：

ps -ef：列出所有进程，包括系统进程。
ps aux：列出所有进程，包括其他用户的进程。
ps -u username：列出指定用户的进程。

top动态地显示系统中各个进程的资源占用情况，包括 CPU 占用率、内存占用率等等。


``pgrep` 命令用于通过进程名或者其他属性查找进程 ID。
例如，输入命令 pgrep -u root sshd 可以查找 root 用户下的 sshd 进程 ID：
~~~



### 杀进程

`kill`和`killall`的区别：

1. `kill`根据PID来杀死进程, `killall`根据进程名来杀死进程
2. 由于PID是唯一的，所以`kill`只能杀死一个进程；由于一个进程名可能对应多个进程，所以`killall`可以将多个进程名为name的进程杀死

~~~shell
kill pid杀死进程
kill -9 pid强制杀死进程
killall name杀死进程名为name的进程
~~~

## 网络操作



### `ping`：测试与另一台主机的网络连接。

`ping` 命令用于测试与另一台主机的网络连接。它会发送 ICMP 回显请求消息到目标主机，并等待目标主机返回 ICMP 回显响应消息。通过观察响应时间和丢包率等信息，可以了解网络连接的质量和稳定性。基本语法：

```shell
ping [options] destination
```

参数说明：

* `options`：可选参数，用于指定一些选项，例如 `-c` 指定发送的回显请求次数、`-i` 指定发送回显请求的时间间隔等等。
* `destination`：目标主机的 IP 地址或域名。

例如，测试与目标主机 `example.com` 的网络连接：

```shell
ping www.baidu.com
```



### `ssh`：远程登录到另一台主机。

`ssh` 命令用于远程登录到另一台主机。它可以在安全的加密通道上执行命令和操作远程文件系统。基本语法：

```shell
ssh [options] user@hostname
```

* `options`：可选参数，用于指定一些选项，例如 `-p` 指定 SSH 端口号、`-i` 指定 SSH 私钥文件等等。
* `user`：远程主机上的用户名。
* `hostname`：远程主机的 IP 地址或域名。

例如，远程登录到目标主机 `example.com`：

```shell
ssh user@example.com
```





### `wget` 或 `curl`：下载网络资源。

`wget` 和 `curl` 命令都用于下载网络资源，例如文件、网页等等。它们可以通过 HTTP、HTTPS、FTP 等协议下载文件，并支持断点续传、代理服务器、身份验证等功能。

基本语法：

```shell
wget [options] URL
curl [options] URL
```

参数说明：

* `options`：可选参数，用于指定一些选项，例如 `-O` 指定保存的文件名、`-c` 指定断点续传等等。
* `URL`：下载资源的 URL 地址。

例如，使用 `wget` 命令下载 URL 为 `http://example.com/file.zip` 的文件：

```shell
wget http://example.com/file.zip
```

使用 `curl` 命令下载同样的文件：

```shell
curl -O http://example.com/file.zip
```

注意：`wget` 和 `curl` 命令使用时需要注意文件下载的版权问题和服务器的访问权限等问题。



### `scp`：远程复制文件。

`scp` 是 Linux 系统中常用的远程复制文件命令，用于在不同的主机之间安全地复制文件和目录。以下是 `scp` 命令的介绍：

```shell
scp [options] [source] [destination]
```

参数说明：

* `options`：可选参数，用于指定一些选项，例如 `-P` 指定端口号、`-r` 递归复制目录等等。
* `source`：源文件或目录的路径，可以是本地文件或远程文件。
* `destination`：目标路径，可以是本地路径或远程路径。

例如，将本地 `/home/user/file.txt` 文件复制到远程主机 `example.com` 的 `/tmp` 目录下：

```shell
scp /home/user/file.txt user@example.com:/tmp
```

将远程主机 `example.com` 的 `/tmp` 目录下的 `file.txt` 文件复制到本地 `/home/user` 目录下：

```shell
scp user@example.com:/tmp/file.txt /home/user
```

递归复制目录：如果需要复制整个目录，可以使用 `-r` 参数，例如：

```shell
scp -r /home/user/dir user@example.com:/tmp
```

这将把本地 `/home/user/dir` 目录及其下的所有文件和子目录复制到远程主机 `example.com` 的 `/tmp` 目录下。

使用端口号：如果远程主机的 SSH 端口不是默认的 `22` 端口，可以使用 `-P` 参数指定端口号，例如：

```shell
scp -P 2222 /home/user/file.txt user@example.com:/tmp
```

这会将本地 `/home/user/file.txt` 文件复制到远程主机 `example.com` 的 `/tmp` 目录下，并使用 `2222` 端口进行连接。

注意：使用 `scp` 命令时，需要确保本地和远程主机都有 SSH 服务，并且具有正确的权限和设置。


<CommentService/>