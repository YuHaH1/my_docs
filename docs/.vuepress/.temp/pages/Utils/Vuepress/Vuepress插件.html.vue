<template><div><h1 id="vuepress插件" tabindex="-1"><a class="header-anchor" href="#vuepress插件" aria-hidden="true">#</a> Vuepress插件</h1>
<h2 id="_1-评论插件" tabindex="-1"><a class="header-anchor" href="#_1-评论插件" aria-hidden="true">#</a> 1.评论插件</h2>
<p>https://plugin-comment2.vuejs.press/zh/</p>
<p>该插件适用于vuepress2版本</p>
<p>1.安装</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress-plugin-comment2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.配置</p>
<p>仓库配置这里以Github 和Giscushttps://giscus.app/zh-CN为例</p>
<p>配置评论功能要求：</p>
<p>1.仓库公开</p>
<p>2.安装giscusapphttps://github.com/apps/giscus</p>
<p>3.在仓库中开启Discussions功能</p>
<p><img src="/Vuepress/setting1.png" alt="开启Discussions"></p>
<p>然后我们在Giscus中会得到下面的其中前四个data配置到该插件配置选项中即可</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"https://giscus.app/client.js"</span>
        data<span class="token operator">-</span>repo<span class="token operator">=</span><span class="token string">""</span>
        data<span class="token operator">-</span>repo<span class="token operator">-</span>id<span class="token operator">=</span><span class="token string">""</span>
        data<span class="token operator">-</span>category<span class="token operator">=</span><span class="token string">"Announcements"</span>
        data<span class="token operator">-</span>category<span class="token operator">-</span>id<span class="token operator">=</span><span class="token string">""</span>
        data<span class="token operator">-</span>mapping<span class="token operator">=</span><span class="token string">"title"</span>
        data<span class="token operator">-</span>strict<span class="token operator">=</span><span class="token string">"0"</span>
        data<span class="token operator">-</span>reactions<span class="token operator">-</span>enabled<span class="token operator">=</span><span class="token string">"1"</span>
        data<span class="token operator">-</span>emit<span class="token operator">-</span>metadata<span class="token operator">=</span><span class="token string">"0"</span>
        data<span class="token operator">-</span>input<span class="token operator">-</span>position<span class="token operator">=</span><span class="token string">"bottom"</span>
        data<span class="token operator">-</span>theme<span class="token operator">=</span><span class="token string">"preferred_color_scheme"</span>
        data<span class="token operator">-</span>lang<span class="token operator">=</span><span class="token string">"zh-CN"</span>
        crossorigin<span class="token operator">=</span><span class="token string">"anonymous"</span>
        async<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> commentPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress-plugin-comment2"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">commentPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token comment">// your options</span>
            provider<span class="token operator">:</span> <span class="token string">"Giscus"</span><span class="token punctuation">,</span>
            comment<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//启用评论功能</span>
            repo<span class="token operator">:</span> <span class="token string">'YuHaH1/my_docs'</span><span class="token punctuation">,</span>
            repoId<span class="token operator">:</span> <span class="token string">'xx'</span><span class="token punctuation">,</span>
            category<span class="token operator">:</span> <span class="token string">'Announcements'</span><span class="token punctuation">,</span>
            categoryId<span class="token operator">:</span> <span class="token string">'xx'</span><span class="token punctuation">,</span>
            mapping<span class="token operator">:</span> <span class="token string">'title'</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


