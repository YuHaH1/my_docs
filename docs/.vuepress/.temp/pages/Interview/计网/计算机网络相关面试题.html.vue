<template><div><h1 id="计算机网络相关面试题" tabindex="-1"><a class="header-anchor" href="#计算机网络相关面试题" aria-hidden="true">#</a> 计算机网络相关面试题</h1>
<h1 id="_1-resiful-api规范" tabindex="-1"><a class="header-anchor" href="#_1-resiful-api规范" aria-hidden="true">#</a> 1.RESIFUL-API规范</h1>
<p>API设计规范：</p>
<ol>
<li>将一切数据视做资源</li>
<li>利用HTTP请求方式，描述对资源的操作（增删改查）</li>
<li>通过HTP响应状态码，描述对资源的操作结果</li>
</ol>
<p>希望达到的效果是看到URL知道是什么</p>
<ol>
<li>看URL知道是什么资源</li>
<li>看Method知道要对资源进行什么操作</li>
<li>看Response Code知道操作是否成功</li>
</ol>
<p>Method规范：</p>
<ol>
<li>GET读取资源</li>
<li>POST创建资源</li>
<li>PUT更新资源</li>
<li>PATCH局部更新</li>
<li>DELETE删除资源</li>
</ol>
</div></template>


