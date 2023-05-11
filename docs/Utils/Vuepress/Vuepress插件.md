---
lang: zh-CN
title: Vuepress插件
description: 关键功能
collapsible: true
---
# Vuepress插件

## 1.评论插件

https://plugin-comment2.vuejs.press/zh/ 

该插件适用于vuepress2版本

1.安装

~~~shell
pnpm add -D vuepress-plugin-comment2
~~~

2.配置

仓库配置这里以Github 和Giscushttps://giscus.app/zh-CN为例

配置评论功能要求：

1.仓库公开 

 2.安装giscusapphttps://github.com/apps/giscus

3.在仓库中开启Discussions功能

![开启Discussions](/Vuepress/setting1.png)

然后我们在Giscus中会得到下面的其中前四个data配置到该插件配置选项中即可

~~~js
<script src="https://giscus.app/client.js"
        data-repo=""
        data-repo-id=""
        data-category="Announcements"
        data-category-id=""
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
~~~



~~~ts
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
            // your options
            provider: "Giscus",
            comment: true, //启用评论功能
            repo: 'YuHaH1/my_docs',
            repoId: 'xx',
            category: 'Announcements',
            categoryId: 'xx',
            mapping: 'title'
	}),
  ],
};

~~~





























<CommentService/>