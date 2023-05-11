import{_ as n,M as e,p as a,q as i,N as d,a1 as r}from"./framework-5866ffd3.js";const l={},c=r(`<h1 id="docker基础知识" tabindex="-1"><a class="header-anchor" href="#docker基础知识" aria-hidden="true">#</a> docker基础知识</h1><p>docker是什么？</p><p>docker是一个应用打包、分发、部署的工具，可以理解为一个轻量虚拟机，它提供应用程序需要的运行环境</p><p>docker的优点</p><ol><li>docker相比虚拟机轻量的多。</li><li>方便升级和扩容。</li><li>采用内核级虚拟技术大大节省cpu和内存占用。</li></ol><h2 id="_1-docker的安装" tabindex="-1"><a class="header-anchor" href="#_1-docker的安装" aria-hidden="true">#</a> 1.docker的安装</h2><p>我是一台CentOS7的服务器 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.yum <span class="token function">install</span> <span class="token function">docker</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-docker核心" tabindex="-1"><a class="header-anchor" href="#_2-docker核心" aria-hidden="true">#</a> 2.docker核心</h2><ol><li>镜像：镜像是一个模版，一个镜像可以创建多个容器。镜像把我们能够运行的源代码配置环境和第三方依赖包全部打包。</li><li>容器：容器可以理解为镜像的实例，一个容器运行一个服务，我们通过docker客户端创建的运行实例就是容器</li><li>仓库：分为公库和私库，docker hub是最大的docker镜像公库</li></ol><h2 id="_3-docker-镜像操作指令" tabindex="-1"><a class="header-anchor" href="#_3-docker-镜像操作指令" aria-hidden="true">#</a> 3.docker 镜像操作指令</h2><p><strong>启动docker</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start <span class="token function">docker</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关闭docker</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop <span class="token function">docker</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重启docker</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看docker 运行状态</strong></p><p>------如果是在运行中 输入命令后 会看到绿色的active</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看自己服务器中docker 镜像列表</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>搜索镜像</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> search 镜像名
搜索stars》9000的镜像
<span class="token function">docker</span> search <span class="token parameter variable">--filter</span><span class="token operator">=</span>STARS<span class="token operator">=</span><span class="token number">9000</span> mysql  STARS <span class="token operator">&gt;</span><span class="token number">9000</span> mysql 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>拉取镜像</strong> 不加tag(版本号) 即拉取docker仓库中 该镜像的最新版本latest 加:tag 则是拉取指定版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull 镜像名 
<span class="token function">docker</span> pull 镜像名:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行镜像</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run 镜像名
<span class="token function">docker</span> run 镜像名:Tag
例如 拉取nginx
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-docker需要了解的内容" tabindex="-1"><a class="header-anchor" href="#_6-docker需要了解的内容" aria-hidden="true">#</a> 6.docker需要了解的内容</h2><p><strong>每一个 Docker容器都是独立和安全的应用平台（我们可以理解为，每一个docker容器都相当于在我们的服务器上占用资源然后开辟了属于自己的一个空间（也可以理解为服务器））——也就是说每个容器之间环境都是隔离的</strong>如果外部想要访问容器，那必须得让容器中的端口与宿主机的端口建立联系绑定起来，这个正式的概念叫做<code> 容器端口映射</code>。宿主机每个端口都是一个，8888端口被redis002容器绑定了，那么其他所有的容器都不可以使用8888这个端口了!!!</p>`,73);function o(t,p){const s=e("CommentService");return a(),i("div",null,[c,d(s)])}const v=n(l,[["render",o],["__file","docker基础知识.html.vue"]]);export{v as default};
