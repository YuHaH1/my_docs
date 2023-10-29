import{_ as a,M as e,p as n,q as t,N as p,a1 as o}from"./framework-a97ca956.js";const l={},i=o(`<h1 id="服务器" tabindex="-1"><a class="header-anchor" href="#服务器" aria-hidden="true">#</a> 服务器</h1><p><strong>## 1.问题描述</strong></p><p>需求：监听文件变化自动将文件上传到服务器，但是需要配置服务器ssh 公匙列表</p><p>服务器查看匹配的公匙列表<code>cd ~/.ssh</code> 然后打开authorized_keys 这里面记录了对应的公钥，本地主机的公钥一般放在C/User/.ssh/id_rsa.pub。将本地的pub文件内容粘贴到authorized_keys 里面完成配置。</p><p>~~~shell</p><p>服务器查看匹配的公匙列表<code>cd ~/.ssh</code></p><p>cd ~/.ssh</p><p>文件authorized_keys 记录公钥列表</p><p>这个代码是将本地的dist上传到服务器的/data/my_docs文件夹中</p><p>scp -r E:\\360MoveData\\Users\\YR\\Desktop\\Blog\\docs.vuepress\\dist root@43.138.53.141:/data/my_docs</p><p>scp -r dist/ user@remote_host:/data</p><p>其中 -r是scp的一个选项-递归复制 是<code>user</code> 是您在远程服务器上的用户名:root，<code>remote_host</code> 是远程服务器的 IP 地址或主机名。请注意，命令中的路径应该是相对于当前目录的相对路径，因此我们在路径前面添加了 <code>dist/</code>。</p><p>~~~</p><h2 id="服务器搭建流程" tabindex="-1"><a class="header-anchor" href="#服务器搭建流程" aria-hidden="true">#</a> 服务器搭建流程</h2><p>1.使用SSH工具连接到你的云服务器，运行挂载命令：</p><p>2.执行宝塔安装命令</p><p>Centos安装命令：</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh https://download.bt.cn/install/install_6.0.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> install.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>Ubuntu/Deepin安装命令：</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">bash</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>Debian安装命令：</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> install.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>Fedora安装命令:</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh http://download.bt.cn/install/install_6.0.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>解析来宝塔安装软件即可</p><p>nginx查找命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="浏览器报错" tabindex="-1"><a class="header-anchor" href="#浏览器报错" aria-hidden="true">#</a> 浏览器报错</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Failed to load module script: Expected a JavaScript module script but the server responded with a MIME <span class="token builtin class-name">type</span> of <span class="token string">&quot;application/octet-stream&quot;</span><span class="token builtin class-name">.</span> Strict MIME <span class="token builtin class-name">type</span> checking is enforced <span class="token keyword">for</span> module scripts per HTML spec.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为nginx一开始没配置好（路由没重定向）却又使用缓存了，导致一直304没重新加载，清一下缓存重新加载保证nginx配置正确就行了。</p>`,30);function c(d,r){const s=e("CommentService");return n(),t("div",null,[i,p(s)])}const h=a(l,[["render",c],["__file","服务器.html.vue"]]);export{h as default};
