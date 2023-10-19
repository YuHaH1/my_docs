---
lang: zh-CN
title: shell脚本
description: 关键功能
collapsible: true
---
# shell脚本

shell脚本可以写一些自动化工具，简化运维人员的工作。

## 变量

### 变量的声明

变量声明规则如下：

* 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
* 中间不能有空格，可以使用下划线 **_**。
* 不能使用标点符号。
* 不能使用bash里的关键字（可用help命令查看保留关键字）

~~~shell
#!/bin/bash
name="xxx"
~~~

引用变量

~~~shell
#!/bin/bash
# 简写
echo $name
# 全写如下
echo ${name}
~~~

声明只读变量

~~~shell
#!/bin/bash
password="123456"
readonly password
~~~

删除变量

* unset 命令不能删除只读变量。

~~~shell
unset password
~~~





### 变量的类型

运行shell时，会同时存在三种变量：

* **1) 局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
* **2) 环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
* **3) shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

#### 字符串

1.字符串：字符串可以用单引号，也可以用双引号，也可以不用引号。

~~~shell
str='this is a string'
~~~

* 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
* 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

2.双引号字符串

~~~shell
your_name="runoob"
str="Hello, I know you are \"$your_name\"! \n"
echo -e $str
~~~

* 双引号里可以有变量
* 双引号里可以出现转义字符

#### 拼接字符串

~~~shell
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1

# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
# 输出结果
hello, runoob ! hello, runoob !
hello, runoob ! hello, ${your_name} !
~~~



#### 获取字符串长度

~~~shell
string="abcd"
echo ${#string}   # 输出 4 变量为字符串时，${#string} 等价于 ${#string[0]}:
~~~



#### 截取字符串

以下实例从字符串第 **2** 个字符开始截取 **4** 个字符：

~~~shell
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo
~~~

**注意**：第一个字符的索引值为 **0**。



#### 查找字符串

查找字符 **i** 或 **o** 的位置(哪个字母先出现就计算哪个)：

~~~shell
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
~~~

**注意：** 以上脚本中 **`** 是反引号，而不是单引号 **'**。

### 数组

在 Shell 中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：

~~~shell
array_name=(value0 value1 value2 value3)
# or
array_name=(
value0
value1
value2
value3
)
# or
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen

~~~



#### 读取数组元素

* ` ${数组名[下标]}`

* 使用 **@** 或 ***** 可以获取数组中的所有元素

~~~shell
1. valuen=${array_name[n]}
2. echo ${array_name[@]}
~~~



#### 读取数组长度

获取数组长度的方法与获取字符串长度的方法相同

~~~shell
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
length=${#array_name[n]}
~~~

#### 关联数组

Bash 支持关联数组，可以使用任意的字符串、或者整数作为下标来访问数组元素。

关联数组使用 **[declare](https://www.runoob.com/linux/linux-comm-declare.html)** 命令来声明，语法格式如下：`declare -A array_name`

关联数组的键是唯一的。以下实例我们创建一个关联数组 **arr**，并创建不同的键值：

~~~shell
declare -A arr=(["google"]="www.google.com" ["runoob"]="www.runoob.com" ["taobao"]="www.taobao.com")
# 我们也可以先声明一个关联数组，然后再设置键和值：
declare -A arr
arr["google"]="www.google.com"
arr["runoob"]="www.runoob.com"
arr["taobao"]="www.taobao.com"
~~~

通过键来访问关联数组的元素：

~~~shell
echo ${arr["runoob"]}
~~~

在数组前加一个感叹号 **!** 可以获取数组的所有键，例如：

~~~shell
declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"

echo "数组的键为: ${!site[*]}"
echo "数组的键为: ${!site[@]}"

数组的键为: google runoob taobao
数组的键为: google runoob taobao
~~~

## 运算符

Shell 和其他编程语言一样，支持多种运算符，包括：

* 算数运算符
* 关系运算符
* 布尔运算符
* 字符串运算符
* 文件测试运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。expr 是一款表达式计算工具，使用它能完成表达式的求值操作。



### 算术运算符

Shell 和其他编程语言一样，支持多种运算符，包括：

* 算数运算符
* 关系运算符
* 布尔运算符
* 字符串运算符
* 文件测试运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

例如，两个数相加(**注意使用的是反引号 \**`\** 而不是单引号 \**'\****)：



下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明                                          | 举例                          |
| :----- | :-------------------------------------------- | :---------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| *      | 乘法                                          | `expr $a \* $b` 结果为  200。 |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=$b 把变量 b 的值赋给 a。    |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ \$a == \$b ] 返回 false。   |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ \$a != \$b ] 返回 true。    |

### 关系运算符

l -> letter

g -> greater

t -> than

e -> equal

n -> not

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明                                                  | 举例                         |
| :----- | :---------------------------------------------------- | :--------------------------- |
| -eq    | 检测两个数是否相等，相等返回 true。                   | `[ $a -eq $b ]` 返回 false。 |
| -ne    | 检测两个数是否不相等，不相等返回 true。               | `[ $a -ne $b ]` 返回 true。  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true。     | `[ $a -gt $b ]` 返回 false。 |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true。     | `[ $a -lt $b ] `返回 true。  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true。 | `[ $a -ge $b ]` 返回 false。 |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true。 | `[ $a -le $b ]` 返回 true。  |



### 布尔运算符

下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明                                                | 举例                                     |
| :----- | :-------------------------------------------------- | :--------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。                  |
| -o     | 或运算，有一个表达式为 true 则返回 true。           | [ $a -lt 20 -o $b -gt 100 ] 返回 true。  |
| -a     | 与运算，两个表达式都为 true 才返回 true。           | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

~~~shell
a=10
b=20
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a == $b: a 等于 b"
# 10 != 20 : a 不等于 b 
~~~



### 逻辑运算符

以下介绍 Shell 的逻辑运算符，假定变量 a 为 10，变量 b 为 20:

| 运算符 | 说明       | 举例                                        |
| :----- | :--------- | :------------------------------------------ |
| &&     | 逻辑的 AND | `[[ $a -lt 100 && $b -gt 100 ]] `返回 false |
| \|\|   | 逻辑的 OR  | `[[ $a -lt 100 || $b -gt 100 ]] `返回 true  |

~~~shell
a=10
b=20

if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
# 返回 false
~~~



### 字符串运算符

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

| 运算符 | 说明                                         | 举例                     |
| :----- | :------------------------------------------- | :----------------------- |
| =      | 检测两个字符串是否相等，相等返回 true。      | [ $a = $b ] 返回 false。 |
| !=     | 检测两个字符串是否不相等，不相等返回 true。  | [ $a != $b ] 返回 true。 |
| -z     | 检测字符串长度是否为0，为0返回 true。        | [ -z $a ] 返回 false。   |
| -n     | 检测字符串长度是否不为 0，不为 0 返回 true。 | [ -n "$a" ] 返回 true。  |
| $      | 检测字符串是否不为空，不为空返回 true。      | [ $a ] 返回 true。       |

~~~shell
#!/bin/bash

a="abc"
b="efg"

if [ $a = $b ]
then
   echo "$a = $b : a 等于 b"
else
   echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ -n "$a" ]
then
   echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi
if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
abc = efg: a 不等于 b
abc != efg : a 不等于 b
-z abc : 字符串长度不为 0
-n abc : 字符串长度不为 0
abc : 字符串不为空
~~~

### 文件运算符

文件测试运算符用于检测 Unix 文件的各种属性。属性检测描述如下：

| 操作符  | 说明                                                         | 举例                        |
| :------ | :----------------------------------------------------------- | :-------------------------- |
| -b file | 检测文件是否是块设备文件，如果是，则返回 true。              | `[ -b $file ] `返回 false。 |
| -c file | 检测文件是否是字符设备文件，如果是，则返回 true。            | `[ -c $file ] `返回 false。 |
| -d file | 检测文件是否是目录，如果是，则返回 true。                    | `[ -d $file ]` 返回 false。 |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | `[ -f $file ] `返回 true。  |
| -g file | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | `[ -g $file ]` 返回 false。 |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | `[ -k $file ]` 返回 false。 |
| -p file | 检测文件是否是有名管道，如果是，则返回 true。                | `[ -p $file ]` 返回 false。 |
| -u file | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | `[ -u $file ] `返回 false。 |
| -r file | 检测文件是否可读，如果是，则返回 true。                      | `[ -r $file ] `返回 true。  |
| -w file | 检测文件是否可写，如果是，则返回 true。                      | `[ -w $file ] `返回 true。  |
| -x file | 检测文件是否可执行，如果是，则返回 true。                    | `[ -x $file ]` 返回 true。  |
| -s file | 检测文件是否为空（文件大小是否大于0），不为空返回 true。     | `[ -s $file ]` 返回 true。  |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true。          | `[ -e $file ]` 返回 true。  |

~~~shell
#!/bin/bash
file="/var/www/runoob/test.sh"
if [ -r $file ]
then
   echo "文件可读"
else
   echo "文件不可读"
fi
if [ -w $file ]
then
   echo "文件可写"
else
   echo "文件不可写"
fi
if [ -x $file ]
then
   echo "文件可执行"
else
   echo "文件不可执行"
fi
if [ -f $file ]
then
   echo "文件为普通文件"
else
   echo "文件为特殊文件"
fi
if [ -d $file ]
then
   echo "文件是个目录"
else
   echo "文件不是个目录"
fi
if [ -s $file ]
then
   echo "文件不为空"
else
   echo "文件为空"
fi
if [ -e $file ]
then
   echo "文件存在"
else
   echo "文件不存在"
fi

文件可读
文件可写
文件可执行
文件为普通文件
文件不是个目录
文件不为空
文件存在

~~~



## 流程控制

### 条件判断

**if**

* 末尾的 fi 就是 if 倒过来拼写，后面还会遇到类似的。

~~~shell
if 【condition】
then
    command1 
    command2
    ...
    commandN 
fi

if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
~~~

**if else-if else**

~~~shell
if 【condition1】
then
    command1
elif 【condition2 】
then 
    command2
else
    commandN
fi
~~~

如果使用 **((...))** 作为判断语句，大于和小于可以直接使用 **>** 和 **<**。

```shell
if (( a > b )); then
    ...
fi
```

**case**

~~~shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
~~~



~~~shell
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
输入 1 到 4 之间的数字:
你输入的数字为:
3
你选择了 3

#!/bin/sh

site="nhooo"

case "$site" in
   "nhooo") echo "基础教程网" 
   ;;
   "google") echo "Google 搜索" 
   ;;
   "taobao") echo "淘宝网" 
   ;;
esac
~~~





### 循环

在循环过程中，有时候需要在未达到循环结束条件时强制跳出循环，Shell 使用两个命令来实现该功能：**break** 和 **continue**。

**for**

与其他编程语言类似，Shell支持for循环。

for循环一般格式为：

```shell
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
# eg
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

**while**

~~~shell
while condition
do
    command
done

int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
~~~

**until**

until 循环执行一系列命令直至条件为 true 时停止。

until 循环与 while 循环在处理方式上刚好相反。

一般 while 循环优于 until 循环，但在某些时候—也只是极少数情况下，until 循环更加有用。

until 语法格式:

~~~shell
#!/bin/bash

a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
~~~



## 函数



~~~shell
#!/bin/bash

demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
~~~

定义一个带有`return`函数

~~~shell
#!/bin/bash


funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? "
这个函数会对输入的两个数字进行相加运算...
输入第一个数字: 
1
输入第二个数字: 
2
两个数字分别为 1 和 2 !
输入的两个数字之和为 3 
~~~



### 函数参数

在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 `$n` 的形式来获取参数的值，例如，`$1`表示第一个参数，`$2`表示第二个参数...

~~~shell
#!/bin/bash


funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
~~~

## 模块化

和其他语言一样，Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。

~~~shell
. filename   # 注意点号(.)和文件名中间有一空格
# or
source filename
~~~



~~~shell
#------------est1.sh 代码如下：

#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

url="http://www.runoob.com"
#-----------test2.sh 代码如下：

#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

#使用 . 号来引用test1.sh 文件
. ./test1.sh

# 或者使用以下包含文件代码
# source ./test1.sh

echo "菜鸟教程官网地址：$url"
~~~

## Shell脚本参数

我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：**$n**。**n** 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……其中 **$0 为执行的文件名（包含文件路径）**

~~~shell
#!/bin/bash

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";

$ chmod +x test.sh 
$ ./test.sh 1 2 3
Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
~~~



| 参数处理 | 说明                                                         |
| -------- | :----------------------------------------------------------- |
| $#       | 传递到脚本的参数个数                                         |
| $*       | 以一个单字符串显示所有向脚本传递的参数。 如"\$*"用「"」括起来的情况、以"$\1 \$2 … \$n"的形式输出所有参数。 |
| $$       | 脚本运行的当前进程ID号                                       |
| $!       | 后台运行的最后一个进程的ID号                                 |
| $@       | 与\$*相同，但是使用时加引号，并在引号中返回每个参数。 如"\$@"用「"」括起来的情况、以"\$1" "\$2" … "\$n" 的形式输出所有参数。 |
| $-       | 显示Shell使用的当前选项，与[set命令](https://www.runoob.com/linux/linux-comm-set.html)功能相同。 |
| $?       | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |

~~~shell
echo "参数个数为：$#";
echo "传递的参数作为一个字符串显示：$*";
# res
# 参数个数为：3
# 传递的参数作为一个字符串显示：1 2 3
~~~

\$* 与 \$@ 区别：

* 相同点：都是引用所有参数。
* 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

~~~shell
#!/bin/bash
echo "-- \$* 演示 ---"
for i in "$*"; do
    echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
    echo $i
done

-- $* 演示 ---
1 2 3
-- $@ 演示 ---
1
2
3
~~~









<CommentService/>