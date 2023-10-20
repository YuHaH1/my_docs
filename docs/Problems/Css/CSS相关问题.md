---
lang: zh-CN
title: CSS相关问题
description: 关键功能
collapsible: true
---
# CSS相关问题

## 1.多行文本溢出

方式①

~~~html
<head>
	<style>
        .container {
            width: 200px;
            height: 100px;
            background-color: #efefef;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5 ;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="p">
            From the age groups, we can see that the largest group of citizens is the group in the age between 20-29. People in this period have had their own career.In this society of ever-quickening pace, working with copmputer has become a fashion. Furthermore, they also use it to entertain themselves and find the right person. The group secondary to this group is in the age between 10-19. In this period, middle school students mostly use computer to play games and chat with others, people in college use it both to entertain themselves and learn what they need to learn. And amount of people in this period fall in love so they spend much on chatting with their beloved people. Top3 is in the age between 30-39. In this period, middle aged people have lost part of interest of playing games and the need of l
        </div>
    </div>
</body>
~~~

②方式二

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .text-container {
            width: 200px;
            height: 100px;
            background-color: #efefef;
            overflow: hidden;
            padding:0 10px;
        }
        .text-container::before{
            content: '';
            display: block;
            height: 80px;
        }
        .p{
            margin-top: -80px;  
        }
        .ellipsis{
            float: right;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-container">
            <div class="ellipsis">
                ...
            </div>
            <div class="p">
                From the age groups, we can see that the largest group of citizens is the group in the age between 20-29. People in this period have had their own career.In this society of ever-quickening pace, working with copmputer has become a fashion. Furthermore, they also use it to entertain themselves and find the right person. The group secondary to this group is in the age between 10-19. In this period, middle school students mostly use computer to play games and chat with others, people in college use it both to entertain themselves and learn what they need to learn. And amount of people in this period fall in love so they spend much on chatting with their beloved people. Top3 is in the age between 30-39. In this period, middle aged people have lost part of interest of playing games and the need of
            </div>
        </div>
    </div>
    <script>
        const p = document.querySelector('.p')
        const ellipsis = document.querySelector('.ellipsis')
        const textContainer = document.querySelector('.text-container')
        const {height:pHeight} = p.getBoundingClientRect()
        const {height:containerHeight} = textContainer.getBoundingClientRect()
        console.log(pHeight,containerHeight)
        const main = ()=>{
            if(pHeight>containerHeight){
                ellipsis.style.display = 'block'
            }else{
                ellipsis.style.display = 'none'
            }
        }
        main()
    </script>
</body>
</html>
~~~

## 2.移动端适配解决方案

### rem

rem是一个相对于页面根元素html的font-size的一个单位，举个例子，假如设置了根元素html的`font-size`为`12px`，那么，`1rem` 等于` 12px`。也就是说，rem的大小是会随着根元素html的`font-size`的改变而改变的。rem方案就是利用了这一点，根据不同的屏幕尺寸，来设置不同的根元素html的`font-size`的大小，以此来达到适配不同屏幕尺寸的目的。

例如：`750px`设计稿，如果设置某个div大小为`80px`大小，那转化为rem是多少呢？在将设备宽度分为10等分的情况下，`750/10 = 75`，`80/75=1.07rem`,开发中不可能每个大小有我们自己计算，因此需要使用插件自动帮我们做转换

推荐插件`postcss-pxtorem`,使用方式如下，在postcss的插件中进行配置，也可以`postcss.config.js`中导出配置。

~~~js
module.exports = {
    "plugins":{
        "postcss-pxtorem":{
            rootValue({file}){
                //rootValue可以是number可以是个函数，由于vant基于375设计稿，如果我们使用750设计稿，那尺寸大了一半，因此是vant的时候需要将rootValue设置一般
				return file.indexOf('vant')!== -1 ? 37.5 : 75// 这里根据设计图尺寸
            }, 
            proList:['*']//需要被转换的属性
        }
    }
}
~~~



### viewport

viewport是指视窗、视口，即浏览器用来显示网页的那部分区域。在移动端开发中，我们希望页面宽度和设备宽度一致，并把这个viewport称为ideal viewport（理想视口）。我们设置会在html文件中添加`viewport`元数据标签，就是为了得到一个我们需要的viewport。

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
~~~

* `name="viewport"`指定网页在移动端设备上的视口设置。（表述该元数据的作用，允许开发者控制移动设备上网页的显示方式，包括宽度、缩放级别和用户缩放行为，以适应不同的设备屏幕和提供更好的移动浏览体验。）
* `width=device-width`:视口的宽度将与设备的宽度相匹配，确保网页内容能够适应设备屏幕的宽度。
* `initial-scale=1`:使用 `initial-scale` 属性可以设置初始的缩放级别，将页面以原始大小显示,即不进行缩放。
* `maximum-scale=1`: 表示用户无法通过手势进行放大操作，将禁用缩放。
* `minimum-scale=1`: 表示用户无法通过手势进行缩小操作，将禁用缩放。
* `user-scalable=no`: 表示用户无法通过手势进行放大缩小操作，将禁用缩放。

viewport方案即是使用vw/vh作为样式单位。vw、vh将viewport分成了一百等份，1vw等于视口1%的宽度，1vh等于视口1%的高度。当我们的设计稿是750px时，1vw就等于7.5px。

例如：`750px`设计稿，如果设置某个div大小为`80px`大小，那转化为vw是多少呢？，`80/7.5=10.67vw`,开发中不可能每个大小有我们自己计算，因此需要使用插件自动帮我们做转换

`postcss-px-to-viewport`



~~~js
//该插件常用默认的配置选项
{
  unitToConvert: 'px',// 需要被转换的单位
  viewportWidth: 320,//视口宽度
  unitPrecision: 5,// vw最大单位 
  propList: ['*'],//如果不匹配属性前面加！例如 ['*', '!letter-spacing']字间距将不会转换
  viewportUnit: 'vw',// 期望单位
  fontViewportUnit: 'vw',// 字体的期望单位
  selectorBlackList: [],//忽略该列表内的选择器，不做转换
  minPixelValue: 1,// 最小像素边界
  mediaQuery: false,//媒体查询中是否替换px
  exclude: undefined,//哪些文件不做转换[/\/src\/node_modules/],正则或数组正则
  include: undefined,//哪些文件做转换include: /\/src\/mobile\//,正则或数组正则

}
module.exports = ({ file }) => {
  const vwUnit = file && file.indexOf('vant') !== -1 ? 375 : 750;
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: vwUnit, // 设计稿的宽度
        unitPrecision: 5, // 转换后的位数，即小数点位数
        viewportUnit: 'vw', // 转换成的视窗单位
        propList: ['*'], // 要进行转换的属性，如果某个属性不进行转换，只需在其前加个“!”即可
        selectorBlackList: [], // 不进行转换的选择器
        minPixelValue: 1, // 小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      },
    },
  };
};
~~~









<CommentService/>