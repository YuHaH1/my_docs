---
lang: zh-CN
title: Sass基本语法
description: 关键功能
collapsible: true
---

# Sass

## 1、@extend

一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。

~~~scss
.a{
        width: 100px;
        height: 100px;
        background-color: greenyellow;
 }
.b{
        @extend .a;
        background-color: orangered;//覆盖.a继承来的背景色
}
结果-》
.b[data-v-5d9daadb] {
    background-color: orangered;
}

<style>
.a[data-v-5d9daadb], .b[data-v-5d9daadb] {
    width: 100px;
    height: 100px;
    background-color: greenyellow;--这个被覆盖掉
~~~

## 2、@if  @else if @else

当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码：

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
-》
p {
  border: 1px solid;
}
if else if else
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
p {
  color: green; }
```

## 3、循环@for @while

> ##### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：*当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值*。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
这里的i 1 2 3 。如果使用from  to 这里的i 就是1 2 不包含end
```

> ##### @while

`@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。例如：

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```



## 4、@each

each相当于for in，能够遍历一个列表。

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

~~~scss
@each $var in -1,-2,-3{
    .item#{$var}{
        color:red;
    }
}
这里的$var 就是-1 -2 -3

~~~

![](/Sass/for_each.png)

## 5、**<u>Mixin混合</u>** @include引入混合

混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 `.float-left`。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）：

~~~scss
@mixin center_hover{
    &:hover{
        display: flex;
        justify-content: center;
        align-content: center;
        color: yellow;
    }
}
 .a{
        @include center_hover();
        width: 100px;
        height: 100px;
        background-color: greenyellow;
}
.b{
        @extend .a;
        background-color: orangered;
    }
~~~

![](/Sass/mixin_include.gif)

### 5.1、混入传参

参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号：

~~~scss
@mixin center_hover($bgc,$tx){
    &:hover{
        display: flex;
        justify-content: center;
        align-content: center;
        color: $bgc;
        transform: translateX($tx);
    }
}
.a{
        @include center_hover(gray,10px);
    	也可以写成关键词参数 @include center_hover($bgc:gray,$tx:10px);
        width: 100px;
        height: 100px;
        background-color: greenyellow;
    }
    .b{
        @extend .a;
        background-color: orangered;
    }
~~~

### 5.2、向混入中导入内容@content

<u>类似于插槽</u>

在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 `@content` 标志的地方：

~~~scss
@mixin content_margin(){
    @content;
}
@include content_margin{
    .a{
        margin: 20px;
    }
}
 .a{
        @include content_margin();
    }
~~~

## 6、函数指令@function

~~~scss
@function computed_width($n){
    @return $n*100px 
}

 width: computed_width(7); ->700px
~~~





## 7、关键词

### 7.1、插值语句`#{}`

`#{}`插值语句：通过 `#{}` 插值语句可以在选择器或属性名中使用变量：

1. ```scss
   $name: foo;
   $attr: border;
   p.#{$name} {
     #{$attr}-color: blue;
   }
   ```

### 7.2、父级元素选择器&

&`参考当前元素的父元素选择器，当父元素不存在`&`将为null

如果父元素是`a`,下面代码就是`a:hover`

~~~scss
&:hover{
	color:red;
}
~~~

## 8.数据类型

### 8.1、数组

~~~scss
$list:(1px,2px,5px,6px)
~~~

`nth` 函数可以直接访问数组中的某一项；`join` 函数可以将多个数组连接在一起；`append` 函数可以在数组中添加新值；而 `@each` 指令能够遍历数组中的每一项。

~~~scss
nth(列表,index)
$colors: red, green, blue;
background-color: nth($colors, 2); // 输出 green


join()
$list1: 1, 2, 3;
$list2: a, b, c;
$list3: join($list1, $list2, "-"); // 输出 1-a, 2-b, 3-c如果未提供分隔符 `$separator`，则默认使用逗号作为分隔符。

$list3: join($list1, $list2); // 输出 1, 2, 3, a, b, c


$colors: red, green, blue;
$font-sizes: 12px, 14px, 16px;

@each $color in $colors {
  @each $font-size in $font-sizes {
    $class-name: join(nth($color, 1), nth($font-size, 1), "-");
    .#{$class-name} {
      color: $color;
      font-size: $font-size;
    }
  }
}
结果
 .red-12px、.red-14px 和 .red-16px，以及类似的类 .green-12px、.green-14px 和 .green-16px 和 .blue-12px、.blue-14px 和 .blue-16px。
~~~



### 8.2、对象Maps

~~~scss
$map: (key1: value1, key2: value2, key3: value3);

//map-get函数用于查找键值
$colors: (
  red: #ff0000,
  green: #00ff00,
  blue: #0000ff
);

background-color: map-get($colors, red); // 输出 #ff0000

//map-merge函数用于map和新加的键值融合
$map1: (
  a: 1,
  b: 2
);

$map2: (
  b: 3,
  c: 4
);

$map3: merge($map1, $map2); // 输出 (a: 1, b: 3, c: 4)
函数也可以将映射与其他数据类型（例如列表、字符串等）合并。

$map: (
  a: 1,
  b: 2
);
$list: (3, 4);
$string: "hello";

$merged: merge($map, $list, $string); // 输出 (a: 1, b: 2, 1: 3, 2: 4, 3: h, 4: e, 5: l, 6: l, 7: o)


//@each命令可添加样式到一个map中的每个键值对。
$colors: (
  red: #ff0000,
  green: #00ff00,
  blue: #0000ff
);

$font-sizes: (
  small: 12px,
  medium: 14px,
  large: 16px
);

@each $color, $color-value in $colors {
  @each $font-size, $font-size-value in $font-sizes {
    $class-name: "#{$color}-#{$font-size}";
    .$class-name {
      color: $color-value;
      font-size: $font-size-value;
    }
  }
}
编译后的结果
 .red-small、.red-medium、.red-large、.green-small、.green-medium、.green-large、.blue-small、.blue-medium 和 .blue-large。
~~~









## 9.综合示例

①简化媒体查询

~~~scss
@devices-settings(
    'phone':
        (320px,
        480px)
    ,
    'pad':
        (481px,
        768px,)
    ,
    'notebook':
        (769px,
        1024px,)
    ,
    'desktop':
        (1025px,
        1200px)
    ,
    'tv':1201px
)
@mixin respond-to($device){
    $device-setting : map-get($devices-settings,$device);
    @if type-of($device-setting) == 'list'{
    	@min : nth($device-setting,1);
        @max : nth($device-setting,2);
        @media(min-width:$min) and (max-width:$max){
            @content
        }
    }
    @else{
        @media(min-width:$device-setting){
            @content
        }
    }
}
.test{
    @include respond-to('phone'){
    	height:50px
	}	
}
~~~









<CommentService/>