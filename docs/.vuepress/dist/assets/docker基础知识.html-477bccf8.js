import{_ as r,M as l,p as c,q as o,R as n,t as s,N as e,a1 as a}from"./framework-f7ec573f.js";const t="/Docker/hash.png",p={},u=a(`<h1 id="docker基础知识" tabindex="-1"><a class="header-anchor" href="#docker基础知识" aria-hidden="true">#</a> docker基础知识</h1><p>docker是什么？</p><p>docker是一个应用打包、分发、部署的工具，可以理解为一个轻量虚拟机，它提供应用程序需要的运行环境</p><p>docker的优点</p><ol><li>docker相比虚拟机轻量的多。</li><li>方便升级和扩容。</li><li>采用内核级虚拟技术大大节省cpu和内存占用。</li></ol><h2 id="_1-docker的安装" tabindex="-1"><a class="header-anchor" href="#_1-docker的安装" aria-hidden="true">#</a> 1.docker的安装</h2><p>我是一台CentOS7的服务器 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.yum <span class="token function">install</span> <span class="token function">docker</span>
中间输入 y确认 


<span class="token function">service</span> <span class="token function">docker</span> start


输入docker version查看信息
<span class="token punctuation">[</span>root@VM-8-10-centos ~<span class="token punctuation">]</span><span class="token comment"># docker version</span>
Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.
Version:      <span class="token number">3.3</span>.1
API Version:  <span class="token number">3.3</span>.1
Go Version:   go1.16.7
Built:        Wed Nov <span class="token number">10</span> 05:23:56 <span class="token number">2021</span>
OS/Arch:      linux/amd64

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>如果报错  
Failed to start docker.service: Unit docker.service not found.
删除原有的podman-docker并输入准确的安装指令，指定docker版本类型进行安装
dnf remove <span class="token function">podman</span>
安装需要的软件包
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
更新一下镜像源
<span class="token function">sudo</span> yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
安装docker-ce
yum <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>windows安装</p><p>https://www.docker.com/get-started/ 下载地址</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>wsl <span class="token parameter variable">--install</span> <span class="token parameter variable">-d</span> Ubuntu
安装后会让你输入用户名密码 在输入用户名时，如果一直显示参考对象类型不支持尝试的操作，
管理员权限打开Powershell，输入如下命令:
netsh winsock reset
然后重新输入即可 
我的账号fancyyu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),v={href:"https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package",target:"_blank",rel:"noopener noreferrer"},m=n("h3",{id:"win10安装docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#win10安装docker","aria-hidden":"true"},"#"),s(" Win10安装docker")],-1),b={href:"https://www.microsoft.com/zh-cn/software-download/windows10",target:"_blank",rel:"noopener noreferrer"},k=a(`<li><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>wsl <span class="token parameter variable">--install</span>
wsl <span class="token parameter variable">--update</span>
wsl <span class="token parameter variable">--shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),h=a(`<h2 id="_2-docker核心" tabindex="-1"><a class="header-anchor" href="#_2-docker核心" aria-hidden="true">#</a> 2.docker核心</h2><ol><li>镜像：镜像是一个模版，一个镜像可以创建多个容器。镜像把我们能够运行的源代码配置环境和第三方依赖包全部打包。</li><li>容器：容器可以理解为镜像的实例，一个容器运行一个服务，我们通过docker客户端创建的运行实例就是容器</li><li>仓库：分为公库和私库，docker hub是最大的docker镜像公库</li></ol><h2 id="_3-docker-镜像操作指令" tabindex="-1"><a class="header-anchor" href="#_3-docker-镜像操作指令" aria-hidden="true">#</a> 3.docker 镜像操作指令</h2><p><strong>启动docker</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>关闭docker</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>重启docker</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看docker 运行状态</strong></p><p>------如果是在运行中 输入命令后 会看到绿色的active</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看自己服务器中docker 镜像列表</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>搜索镜像</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> search 镜像名
//搜索stars》9000的镜像
<span class="token function">docker</span> search <span class="token parameter variable">--filter</span><span class="token operator">=</span>STARS<span class="token operator">=</span><span class="token number">9000</span> mysql  STARS <span class="token operator">&gt;</span><span class="token number">9000</span> mysql 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>拉取镜像</strong> 不加tag(版本号) 即拉取docker仓库中 该镜像的最新版本latest 加:tag 则是拉取指定版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull 镜像名 
<span class="token function">docker</span> pull 镜像名:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行镜像</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run 镜像名
<span class="token function">docker</span> run 镜像名:Tag
//例如 拉取nginx
<span class="token function">docker</span> pull nginx
<span class="token function">docker</span> run nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除镜像</strong> ------当前镜像没有被任何容器使用才可以删除</p><div class="language-shel line-numbers-mode" data-ext="shel"><pre class="language-shel"><code>#删除一个
docker rmi -f 镜像名/镜像ID

#删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

#删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>保存镜像</strong>，将我们的镜像保存为tar 压缩文件这样方便镜像转移和保存 ,然后可以在任何一台安装了docker的服务器上 加载这个镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> save 镜像名/镜像ID <span class="token parameter variable">-o</span> 镜像保存在哪个位置与名字

<span class="token function">docker</span> save tomcat <span class="token parameter variable">-o</span> /myimg.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>加载镜像</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> load <span class="token parameter variable">-i</span> 镜像保存文件位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>提交一个镜像</strong></p><p>我们运行的容器可能在镜像的基础上做了一些修改，有时候我们希望保存起来，封装成一个更新的镜像，这时候我们就需要使用 commit 命令来构建一个新的镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;提交信息&quot;</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;作者信息&quot;</span> 容器名/容器ID 提交后的镜像名:Tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-docker容器指令" tabindex="-1"><a class="header-anchor" href="#_4-docker容器指令" aria-hidden="true">#</a> 4.docker容器指令</h2><p><strong>查看正在运行容器列表</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看所有容器</strong> -----包含正在运行 和已停止的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>运行一个容器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -it 表示与容器进行交互式启动 -d 表示可后台运行容器 （守护式运行）  --name 给要运行的容器 起的名字  /bin/bash  交互路径</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> 要取的别名 镜像名:Tag /bin/bash 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>容器端口与服务器端口映射</strong></p><p>命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-p</span> 宿主机端口:容器端口
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> redis002 <span class="token parameter variable">-p</span> <span class="token number">8888</span>:6379 redis:5.0.5 /bin/bash

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>进入容器</strong>：有时候，我们需要进入容器内部，修改其配置文件，那么如何才能进入容器内呢？</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#方式一</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> 容器名/容器ID /bin/bash
<span class="token comment">#进入 前面的 redis001容器   </span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis001 /bin/bash
<span class="token comment">#方式二</span>
<span class="token function">docker</span> attach 容器名/容器ID

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>退出容器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#-----直接退出  未添加 -d(持久化运行容器) 时 执行此参数 容器会被关闭  </span>
<span class="token builtin class-name">exit</span>
<span class="token comment"># 优雅退出 --- 无论是否添加-d 参数 执行此命令容器都不会被关闭</span>
Ctrl + p + q

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>停止容器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> stop 容器ID/容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>重启容器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> restart 容器ID/容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>启动容器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> start 容器ID/容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>kill 容器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">kill</span> 容器ID/容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>容器文件拷贝</strong> —无论容器是否开启 都可以进行拷贝</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#docker cp 容器ID/名称:文件路径  要拷贝到外部的路径   |     要拷贝到外部的路径  容器ID/名称:文件路径</span>
<span class="token comment">#从容器内 拷出</span>
<span class="token function">docker</span> <span class="token function">cp</span> 容器ID/名称: 容器内路径  容器外路径
<span class="token comment">#从外部 拷贝文件到容器内</span>
<span class="token function">docker</span>  <span class="token function">cp</span> 容器外路径 容器ID/名称: 容器内路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看容器日志</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span>要查看末尾多少行 默认all 容器ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>更换容器名</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rename</span> 容器ID/容器名 新容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-docker实战" tabindex="-1"><a class="header-anchor" href="#_5-docker实战" aria-hidden="true">#</a> 5.docker实战</h2><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> nginx:latest</span>
<span class="token instruction"><span class="token keyword">LABEL</span> Author fancy_fish</span>
<span class="token instruction"><span class="token keyword">COPY</span> dist /usr/share/nginx/html</span>
静态网站的部署
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-docker需要了解的内容" tabindex="-1"><a class="header-anchor" href="#_6-docker需要了解的内容" aria-hidden="true">#</a> 6.docker需要了解的内容</h2><p><strong>每一个 Docker容器都是独立和安全的应用平台（我们可以理解为，每一个docker容器都相当于在我们的服务器上占用资源然后开辟了属于自己的一个空间（也可以理解为服务器））——也就是说每个容器之间环境都是隔离的</strong>如果外部想要访问容器，那必须得让容器中的端口与宿主机的端口建立联系绑定起来，这个正式的概念叫做<code> 容器端口映射</code>。宿主机每个端口都是一个，8888端口被redis002容器绑定了，那么其他所有的容器都不可以使用8888这个端口了!!!</p><h2 id="_7-docker拷贝文件" tabindex="-1"><a class="header-anchor" href="#_7-docker拷贝文件" aria-hidden="true">#</a> 7.Docker拷贝文件</h2><p>本地拷贝到容器目录</p><p>可以看到容器就会多一个html11的目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span>  ~/nginx-html nginx1:/usr/share/nginx/html11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>容器目录拷贝到本地</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span>  nginx1:/usr/share/nginx/html ~/nginx-html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker配置nginx" tabindex="-1"><a class="header-anchor" href="#docker配置nginx" aria-hidden="true">#</a> Docker配置nginx</h2><ol><li><p>拉nginx镜像</p><ol><li><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull nginx:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>docker run</code> 会返回一个容器的 hash：</p><p><img src="`+t+`" alt=""></p></li></ol></li><li><p>运行nginx容器</p><ol><li><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> nginx-test2 <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-v</span> /tmp/aaa:/usr/share/nginx/html:ro <span class="token parameter variable">-e</span> <span class="token assign-left variable">KEY1</span><span class="token operator">=</span>VALUE1 <span class="token parameter variable">-d</span> nginx:latest 
<span class="token comment"># :ro表示只读  :rw表示可以写入</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>-p 是端口映射</p><p>-v 是指定数据卷挂载目录</p><p>-e 是指定环境变量</p><p>-d 是后台运行</p></li></ol></li></ol><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> Dockerfile</h2><p>自己制作镜像可以自动化。</p><p>只要在 dockerfile 里声明要做哪些事情，docker build 的时候就会根据这个 dockerfile 来自动化构建出一个镜像来。</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> node:latest</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token instruction"><span class="token keyword">RUN</span> npm config set registry https://registry.npmmirror.com/</span>

<span class="token instruction"><span class="token keyword">RUN</span> npm install -g http-server</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;http-server&quot;</span>, <span class="token string">&quot;-p&quot;</span>, <span class="token string">&quot;8080&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些指令的含义如下：</p><ul><li>FROM：基于一个基础镜像来修改</li><li>WORKDIR：指定当前工作目录</li><li>COPY：把容器外的内容复制到容器内</li><li>EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080</li><li>RUN：在容器内执行命令</li><li>CMD：容器启动的时候执行的命令</li></ul><p>我们先通过 FROM 继承了 node 基础镜像，里面就有 npm、node 这些命令了。通过 WORKDIR 指定当前目录。然后通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录。之后通过 RUN 执行 npm install，全局安装 http-server。通过 EXPOSE 指定要暴露的端。CMD 指定容器跑起来之后执行的命令，这里就是执行 http-server 把服务跑起来。</p>`,76);function g(f,x){const i=l("ExternalLinkIcon"),d=l("CommentService");return c(),o("div",null,[u,n("p",null,[n("a",v,[s("WSL2Linux内核"),e(i)])]),m,n("ol",null,[n("li",null,[n("p",null,[s("Win10 版本号为 2004（内部版本19041或更高）即可，如果低于此版本可使用 Windows 10 易升工具手动升级。下载 Windows 10 易升工具："),n("a",b,[s("更新最新win10"),e(i)])])]),k]),h,e(d)])}const w=r(p,[["render",g],["__file","docker基础知识.html.vue"]]);export{w as default};
