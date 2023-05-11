<template><div><h1 id="linux常用指令" tabindex="-1"><a class="header-anchor" href="#linux常用指令" aria-hidden="true">#</a> linux常用指令</h1>
<h2 id="文件相关命令" tabindex="-1"><a class="header-anchor" href="#文件相关命令" aria-hidden="true">#</a> 文件相关命令</h2>
<h3 id="切换目录、" tabindex="-1"><a class="header-anchor" href="#切换目录、" aria-hidden="true">#</a> 切换目录、</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span>
<span class="token builtin class-name">cd</span> ~ <span class="token comment">#进入 "home" 目录</span>
<span class="token builtin class-name">cd</span> - <span class="token comment">#进入上一次工作路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看目录" tabindex="-1"><a class="header-anchor" href="#查看目录" aria-hidden="true">#</a> 查看目录</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看当前工作目录路径</span>
<span class="token builtin class-name">pwd</span>
<span class="token builtin class-name">pwd</span> <span class="token parameter variable">-P</span> <span class="token comment">#查看软链接的实际路径</span>

<span class="token comment">#查看目录  </span>
<span class="token function">ls</span>   
<span class="token function">ls</span> <span class="token parameter variable">-a</span> 列出目录所有文件，包含以.开始的隐藏文件
<span class="token function">ls</span> <span class="token parameter variable">-A</span> 列出除.及<span class="token punctuation">..</span>的其它文件
<span class="token function">ls</span> <span class="token parameter variable">-r</span> 反序排列
<span class="token function">ls</span> <span class="token parameter variable">-t</span> 以文件修改时间排序
<span class="token function">ls</span> <span class="token parameter variable">-S</span> 以文件大小排序
<span class="token function">ls</span> <span class="token parameter variable">-h</span> 以易读大小显示
<span class="token function">ls</span> <span class="token parameter variable">-l</span> 除了文件名之外，还将文件的权限、所有者、文件大小等信息详细列出来
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建目录" tabindex="-1"><a class="header-anchor" href="#创建目录" aria-hidden="true">#</a> 创建目录</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建目录</span>
<span class="token function">mkdir</span> 目录名
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> 目录名 <span class="token comment">#如果该目录不存在则创建</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除文件-目录" tabindex="-1"><a class="header-anchor" href="#删除文件-目录" aria-hidden="true">#</a> 删除文件/目录</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">rm</span> 删除一个目录中的一个或多个文件或目录，如果没有使用 <span class="token parameter variable">-r</span> 选项，则 <span class="token function">rm</span> 不会删除目录。如果使用 其来删除文件，通常仍可以将该文件恢复原状。
<span class="token function">rm</span> <span class="token punctuation">[</span>-选项<span class="token punctuation">]</span> 文件/目录
<span class="token function">rm</span> <span class="token parameter variable">-i</span> *.log 删除任何 .log 文件，删除前逐一询问确认：
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token builtin class-name">test</span> 删除 <span class="token builtin class-name">test</span> 子目录及子目录中所有档案删除，并且不用一一确认：.
<span class="token function">rm</span> -- -f*  删除以 <span class="token parameter variable">-f</span> 开头的文件

<span class="token function">rmdir</span>  从一个目录中删除一个或多个子目录项，删除某目录时也必须具有对其父目录的写权限。不能删除非空目录~！！！
<span class="token function">rmdir</span> <span class="token parameter variable">-p</span> a

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="移动文件-重命名" tabindex="-1"><a class="header-anchor" href="#移动文件-重命名" aria-hidden="true">#</a> 移动文件/重命名</h3>
<p>移动文件或修改文件名，根据第二参数类型（如目录，则移动文件；如为文件则重命令该文件）。</p>
<p>当第二个参数为目录时，第一个参数可以是多个以空格分隔的文件或目录，然后移动第一个参数指定的多个文件到第二个参数指定的目录中。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mv</span> test.log test1.txt <span class="token comment"># 将文件 test.log 重命名为 test1.txt</span>
<span class="token function">mv</span> llog1.txt log2.txt log3.txt /test3<span class="token comment"># 将文件 log1.txt,log2.txt,log3.txt 移动到根的 test3 目录中</span>

<span class="token function">mv</span> <span class="token parameter variable">-i</span> log1.txt log2.txt<span class="token comment"># 将文件 file1 改名为 file2，如果 file2 已经存在，则询问是否覆盖！！</span>
<span class="token function">mv</span> * <span class="token punctuation">..</span>/ <span class="token comment"># 移动当前文件夹下的所有文件到上一级目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复制文件" tabindex="-1"><a class="header-anchor" href="#复制文件" aria-hidden="true">#</a> 复制文件</h3>
<p>将源文件复制至目标文件，或将多个源文件复制至目标目录。</p>
<p>注意：命令行复制，如果目标文件已经存在会提示是否覆盖，而在 shell 脚本中，如果不加 -i 参数，则不会提示，而是直接覆盖！</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token parameter variable">-i</span> 提示
<span class="token parameter variable">-r</span> 复制目录及目录内所有项目
<span class="token parameter variable">-a</span> 复制的文件与原文件时间一样

<span class="token function">cp</span> <span class="token parameter variable">-ai</span> a.txt <span class="token builtin class-name">test</span><span class="token comment"># 复制 a.txt 到 test 目录下，保持原文件时间，如果原文件存在提示是否覆盖。</span>

<span class="token function">cp</span> <span class="token parameter variable">-s</span> a.txt link_a.txt <span class="token comment"># 为 a.txt 建立一个链接（快捷方式）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cat命令" tabindex="-1"><a class="header-anchor" href="#cat命令" aria-hidden="true">#</a> cat命令</h3>
<p>cat命令有三个功能</p>
<p>1.一次显示整个文件:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> filename
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.从键盘创建一个文件:并直接进入编辑模式 如果文件已经存在直接进入文件编辑</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> filename   <span class="token comment">#参数-n 加行号</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.将几个文件合并为一个文件:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> file1 file2 <span class="token operator">></span> file3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查找文件" tabindex="-1"><a class="header-anchor" href="#查找文件" aria-hidden="true">#</a> 查找文件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># find在指定目录下查找</span>
<span class="token function">find</span> path <span class="token parameter variable">-name</span> testfile
<span class="token function">find</span> /  <span class="token parameter variable">-name</span> nginx
<span class="token function">find</span> /  <span class="token parameter variable">-name</span> nginx* <span class="token comment">#模糊匹配 </span>
<span class="token function">find</span> /  <span class="token parameter variable">-mmin</span> <span class="token parameter variable">-20</span>  <span class="token comment">#最近20分钟内修改的文件</span>
<span class="token function">find</span> /  <span class="token parameter variable">-mtime</span> <span class="token parameter variable">-1</span>  <span class="token comment">#最近1天内修改的文件</span>

<span class="token comment"># linux系统每天至少自动扫描一次文件，将结果保存到数据库，locate查的是数据库(/var/lib/mlocate/mlocate.db)记录。locate查询比find要快，但最新文件如果在数据库中没有记录,是需要手动更新（updatedb）</span>
<span class="token function">locate</span>  nginx 

<span class="token comment"># which从环境变量文件（/etc/profile）中的path目录中查找，且which找的都是可执行文件。</span>
<span class="token function">which</span> nginx

<span class="token comment"># 与which类似查询可执行文件，whereis查询更多，会查找出相关的man文件</span>
<span class="token function">whereis</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解压和压缩" tabindex="-1"><a class="header-anchor" href="#解压和压缩" aria-hidden="true">#</a> 解压和压缩</h3>
<p>用来压缩和解压文件。tar 本身不具有压缩功能，只具有打包功能，有关压缩及解压是调用其它的功能来完成。</p>
<p>弄清两个概念：打包和压缩。打包是指将一大堆文件或目录变成一个总的文件；压缩则是将一个大的文件通过一些压缩算法变成一个小文件</p>
<p><strong>常用参数：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token parameter variable">-c</span> 建立新的压缩文件
<span class="token parameter variable">-f</span> 指定压缩文件
<span class="token parameter variable">-r</span> 添加文件到已经压缩文件包中
<span class="token parameter variable">-u</span> 添加改了和现有的文件到压缩包中
<span class="token parameter variable">-x</span> 从压缩包中抽取文件
<span class="token parameter variable">-t</span> 显示压缩文件中的内容
<span class="token parameter variable">-z</span> 支持gzip压缩
<span class="token parameter variable">-j</span> 支持bzip2压缩
<span class="token parameter variable">-Z</span> 支持compress解压文件
<span class="token parameter variable">-v</span> 显示操作过程


<span class="token function">tar</span> <span class="token parameter variable">-cvf</span> log.tar <span class="token number">1</span>.txt <span class="token number">2</span>.txt  将1.txt和2.txt打包成 <span class="token function">tar</span> 包
<span class="token function">tar</span> <span class="token parameter variable">-cvf</span> *.txt 将全部txt打包成 <span class="token function">tar</span> 包


解压

<span class="token number">1</span>、tar  <span class="token parameter variable">-zxv</span>  <span class="token parameter variable">-f</span>  aa.tar.gz     把aa.tar.gz 解压缩到当前目录

<span class="token number">2</span>、tar  <span class="token parameter variable">-zxv</span>  <span class="token parameter variable">-f</span>  aa.tar.gz    <span class="token parameter variable">-C</span>   /bb     把aa.tar.gz 解压缩到/bb目录下

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进程相关命令" tabindex="-1"><a class="header-anchor" href="#进程相关命令" aria-hidden="true">#</a> 进程相关命令</h2>
<h3 id="查看进程状态" tabindex="-1"><a class="header-anchor" href="#查看进程状态" aria-hidden="true">#</a> 查看进程状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> 指定进程 <span class="token comment">#查看指定进程的信息（可以是指定进程名、PID）</span>

<span class="token function">ps</span> 命令：显示当前用户的进程信息。常用参数有：

<span class="token function">ps</span> -ef：列出所有进程，包括系统进程。
<span class="token function">ps</span> aux：列出所有进程，包括其他用户的进程。
<span class="token function">ps</span> <span class="token parameter variable">-u</span> username：列出指定用户的进程。

top动态地显示系统中各个进程的资源占用情况，包括 CPU 占用率、内存占用率等等。


`<span class="token variable"><span class="token variable">`</span>pgrep<span class="token variable">`</span></span> 命令用于通过进程名或者其他属性查找进程 ID。
例如，输入命令 pgrep <span class="token parameter variable">-u</span> root sshd 可以查找 root 用户下的 sshd 进程 ID：
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="杀进程" tabindex="-1"><a class="header-anchor" href="#杀进程" aria-hidden="true">#</a> 杀进程</h3>
<p><code v-pre>kill</code>和<code v-pre>killall</code>的区别：</p>
<ol>
<li><code v-pre>kill</code>根据PID来杀死进程, <code v-pre>killall</code>根据进程名来杀死进程</li>
<li>由于PID是唯一的，所以<code v-pre>kill</code>只能杀死一个进程；由于一个进程名可能对应多个进程，所以<code v-pre>killall</code>可以将多个进程名为name的进程杀死</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">kill</span> pid杀死进程
<span class="token function">kill</span> <span class="token parameter variable">-9</span> pid强制杀死进程
<span class="token function">killall</span> name杀死进程名为name的进程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络操作" tabindex="-1"><a class="header-anchor" href="#网络操作" aria-hidden="true">#</a> 网络操作</h2>
<h3 id="ping-测试与另一台主机的网络连接。" tabindex="-1"><a class="header-anchor" href="#ping-测试与另一台主机的网络连接。" aria-hidden="true">#</a> <code v-pre>ping</code>：测试与另一台主机的网络连接。</h3>
<p><code v-pre>ping</code> 命令用于测试与另一台主机的网络连接。它会发送 ICMP 回显请求消息到目标主机，并等待目标主机返回 ICMP 回显响应消息。通过观察响应时间和丢包率等信息，可以了解网络连接的质量和稳定性。基本语法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ping</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> destination
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数说明：</p>
<ul>
<li><code v-pre>options</code>：可选参数，用于指定一些选项，例如 <code v-pre>-c</code> 指定发送的回显请求次数、<code v-pre>-i</code> 指定发送回显请求的时间间隔等等。</li>
<li><code v-pre>destination</code>：目标主机的 IP 地址或域名。</li>
</ul>
<p>例如，测试与目标主机 <code v-pre>example.com</code> 的网络连接：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ping</span> www.baidu.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ssh-远程登录到另一台主机。" tabindex="-1"><a class="header-anchor" href="#ssh-远程登录到另一台主机。" aria-hidden="true">#</a> <code v-pre>ssh</code>：远程登录到另一台主机。</h3>
<p><code v-pre>ssh</code> 命令用于远程登录到另一台主机。它可以在安全的加密通道上执行命令和操作远程文件系统。基本语法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> user@hostname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>options</code>：可选参数，用于指定一些选项，例如 <code v-pre>-p</code> 指定 SSH 端口号、<code v-pre>-i</code> 指定 SSH 私钥文件等等。</li>
<li><code v-pre>user</code>：远程主机上的用户名。</li>
<li><code v-pre>hostname</code>：远程主机的 IP 地址或域名。</li>
</ul>
<p>例如，远程登录到目标主机 <code v-pre>example.com</code>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> user@example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="wget-或-curl-下载网络资源。" tabindex="-1"><a class="header-anchor" href="#wget-或-curl-下载网络资源。" aria-hidden="true">#</a> <code v-pre>wget</code> 或 <code v-pre>curl</code>：下载网络资源。</h3>
<p><code v-pre>wget</code> 和 <code v-pre>curl</code> 命令都用于下载网络资源，例如文件、网页等等。它们可以通过 HTTP、HTTPS、FTP 等协议下载文件，并支持断点续传、代理服务器、身份验证等功能。</p>
<p>基本语法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> URL
<span class="token function">curl</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> URL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明：</p>
<ul>
<li><code v-pre>options</code>：可选参数，用于指定一些选项，例如 <code v-pre>-O</code> 指定保存的文件名、<code v-pre>-c</code> 指定断点续传等等。</li>
<li><code v-pre>URL</code>：下载资源的 URL 地址。</li>
</ul>
<p>例如，使用 <code v-pre>wget</code> 命令下载 URL 为 <code v-pre>http://example.com/file.zip</code> 的文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> http://example.com/file.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>curl</code> 命令下载同样的文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-O</span> http://example.com/file.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：<code v-pre>wget</code> 和 <code v-pre>curl</code> 命令使用时需要注意文件下载的版权问题和服务器的访问权限等问题。</p>
<h3 id="scp-远程复制文件。" tabindex="-1"><a class="header-anchor" href="#scp-远程复制文件。" aria-hidden="true">#</a> <code v-pre>scp</code>：远程复制文件。</h3>
<p><code v-pre>scp</code> 是 Linux 系统中常用的远程复制文件命令，用于在不同的主机之间安全地复制文件和目录。以下是 <code v-pre>scp</code> 命令的介绍：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">scp</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>source<span class="token punctuation">]</span> <span class="token punctuation">[</span>destination<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数说明：</p>
<ul>
<li><code v-pre>options</code>：可选参数，用于指定一些选项，例如 <code v-pre>-P</code> 指定端口号、<code v-pre>-r</code> 递归复制目录等等。</li>
<li><code v-pre>source</code>：源文件或目录的路径，可以是本地文件或远程文件。</li>
<li><code v-pre>destination</code>：目标路径，可以是本地路径或远程路径。</li>
</ul>
<p>例如，将本地 <code v-pre>/home/user/file.txt</code> 文件复制到远程主机 <code v-pre>example.com</code> 的 <code v-pre>/tmp</code> 目录下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">scp</span> /home/user/file.txt user@example.com:/tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将远程主机 <code v-pre>example.com</code> 的 <code v-pre>/tmp</code> 目录下的 <code v-pre>file.txt</code> 文件复制到本地 <code v-pre>/home/user</code> 目录下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">scp</span> user@example.com:/tmp/file.txt /home/user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>递归复制目录：如果需要复制整个目录，可以使用 <code v-pre>-r</code> 参数，例如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">scp</span> <span class="token parameter variable">-r</span> /home/user/dir user@example.com:/tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将把本地 <code v-pre>/home/user/dir</code> 目录及其下的所有文件和子目录复制到远程主机 <code v-pre>example.com</code> 的 <code v-pre>/tmp</code> 目录下。</p>
<p>使用端口号：如果远程主机的 SSH 端口不是默认的 <code v-pre>22</code> 端口，可以使用 <code v-pre>-P</code> 参数指定端口号，例如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">scp</span> <span class="token parameter variable">-P</span> <span class="token number">2222</span> /home/user/file.txt user@example.com:/tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这会将本地 <code v-pre>/home/user/file.txt</code> 文件复制到远程主机 <code v-pre>example.com</code> 的 <code v-pre>/tmp</code> 目录下，并使用 <code v-pre>2222</code> 端口进行连接。</p>
<p>注意：使用 <code v-pre>scp</code> 命令时，需要确保本地和远程主机都有 SSH 服务，并且具有正确的权限和设置。</p>
<CommentService/></div></template>


