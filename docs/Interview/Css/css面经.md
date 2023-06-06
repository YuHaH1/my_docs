---
lang: zh-CN
title: css面经
description: 关键功能
collapsible: true
---
# css面经

## 1.隐藏元素的方法

~~~css
{
    opacity:0;
    visibility: hidden;
    display:none;
    transform移出视口
}
~~~

opacity和visibility都只是隐藏元素，元素依旧占位；**1.visibility隐藏的元素仍能够响应点击事件，而opacity的元素无法响应鼠标事件。2.Opacity属性可以被子元素继承，而Visibility属性不会被子元素继承。**

display元素已经不占位了









<CommentService/>