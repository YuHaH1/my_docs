<template><div><h1 id="服务器相关问题" tabindex="-1"><a class="header-anchor" href="#服务器相关问题" aria-hidden="true">#</a> 服务器相关问题</h1>
<h2 id="_1-问题描述" tabindex="-1"><a class="header-anchor" href="#_1-问题描述" aria-hidden="true">#</a> 1.问题描述</h2>
<p>需求：监听文件变化自动将文件上传到服务器，但是需要配置服务器ssh 公匙列表</p>
<p>服务器查看匹配的公匙列表<code v-pre>cd ~/.ssh</code>  然后打开authorized_keys 这里面记录了对应的公钥，本地主机的公钥一般放在C/User/.ssh/id_rsa.pub。将本地的pub文件内容粘贴到authorized_keys 里面完成配置。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>服务器查看匹配的公匙列表<span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">cd</span> ~/.ssh<span class="token variable">`</span></span>
<span class="token builtin class-name">cd</span> ~/.ssh
文件authorized_keys 记录公钥列表

这个代码是将本地的dist上传到服务器的/data/my_docs文件夹中
<span class="token function">scp</span> <span class="token parameter variable">-r</span> E:<span class="token punctuation">\</span>360MoveData<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>YR<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>Blog<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>.vuepress<span class="token punctuation">\</span>dist root@43.138.53.141:/data/my_docs

<span class="token function">scp</span> <span class="token parameter variable">-r</span> dist/ user@remote_host:/data

其中 -r是scp的一个选项-递归复制 是<span class="token variable"><span class="token variable">`</span>user<span class="token variable">`</span></span> 是您在远程服务器上的用户名:root，<span class="token variable"><span class="token variable">`</span>remote_host<span class="token variable">`</span></span> 是远程服务器的 IP 地址或主机名。请注意，命令中的路径应该是相对于当前目录的相对路径，因此我们在路径前面添加了 <span class="token variable"><span class="token variable">`</span>dist/<span class="token variable">`</span></span>。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


