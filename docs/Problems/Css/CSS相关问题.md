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







<CommentService/>