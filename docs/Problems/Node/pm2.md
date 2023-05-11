---
lang: zh-CN
title: pm2
description: 关键功能
collapsible: true
---
# pm2

## 1.问题描述

在写Vuepress项目的时候，本地运行一个js脚本来监听dist文件变化，一旦dist文件发生变化自动上传到服务器。保证我服务器的文档一直是最新的。但这时候每次文件退出监听就关闭了，于是使用PM2做进程管理

解决方案

~~~shell
npm install -g pm2

pm2 start xx.js
~~~

关于pm2的更多详细信息看笔记 或官方地址：https://github.com/Unitech/pm2



<CommentService/>