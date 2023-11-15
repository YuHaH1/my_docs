---
lang: zh-CN
title: flutter
description: 关键功能
collapsible: true
---
# flutter

## 1.安装

①[windows安装地址](https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.13.9-stable.zip)

**请注意** 请勿将 Flutter 安装在需要高权限的文件夹内，例如 C:\Program Files\。

②配置国内镜像：在flutter安装目录下的`packages\flutter_tools\gradle`，修改`flutter.gradle`文件：

~~~text
repositories {
   // google()
   // jcenter()
   maven{ url 'https://maven.aliyun.com/repository/google' }
   maven{ url 'https://maven.aliyun.com/repository/jcenter' }
   maven{ url 'http://maven.aliyun.com/nexus/content/groups/public'}
}
~~~

③环境变量配置，在当前用户的Path中增加flutter的bin目录地址例如`D:\flutter\flutter_windows_3.13.9-stable\flutter\bin`

同时增加两个环境变量

~~~txt
FLUTTER_STORAGE_BASE_URL
https://storage.flutter-io.cn

PUB_HOSTED_URL
https://pub.flutter-io.cn
~~~

④ 设置 Android 开发环境

[下载地址](https://developer.android.google.cn/studio?hl=zh-cn)

安装完成后 进入android_tools中安装sdk

##  Flutter目录结构

* 文件`lib/main.dart`为入口文件
* 主函数`void main(){}`

## 3.Dart

如果会ts，dart很容易。

[dart在线测试](https://dart.cn/#try-dart)

Dart 是一种针对客户端优化的语言，可在任何平台上开发快速的应用程序。其目标是为多平台开发提供最高效的编程语言，并为应用程序框架搭配了 [灵活的运行时执行平台](https://dart.cn/overview#platform)。Dart 语言是类型安全的；它使用静态类型检查来确保变量的值 **始终** 与变量的静态类型相匹配，但由于 Dart 支持类型推断，类型注释仍是可选的

### 变量

#### 类型推断

①可以用 `var` 来定义变量，而不用显式指定它们的类型。由于其支持类型推断，因此大多数变量的类型会由它们的初始化内容决定：

~~~dart
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg'
};
~~~

②当变量类型是动态类型（可能发生变化时），我们可以指定为对象类型Object

~~~dart
void main() {
  Object name = '123';
  name='yu';
  print(name);
}
~~~

#### 空值安全

①Null safety是为了防止无意设置的空变量而导致的错误。使用空值安全，Dart将在编译时检测

什么意思呢？例如我们声明了一个`a`变量为`null`，然后我们调用该变量身上的方法，在其它语言可能出现运行时错误，不会有编译提示。Dart会在编译时禁止这些操作。例如：

~~~dart
void main() {
  String? name;
  name.abs();
  print(name);
}
~~~

![](/Flutter/dart_var1.png)

②Dart中不能调用空值类型的方法和属性。

③当一个变量为空值类型时，默认值就是null

~~~dart
void main() {
  int? lineCount;
  print(lineCount == null);
}
//true
~~~

④如果我们想使用非空变量的属性和方法则必须在使用之前进行赋值

~~~dart
void main() {
  double? lineCount;
  lineCount = 0.1;
  print(lineCount.abs());
}
~~~

#### late变量

通常，Dart的控制流分析可以在使用非空变量之前检测到何时将其设置为非空值有时分析会失败。两种常见的情况是顶级变量和实例变量:Dart通常无法确定它们是否已设置，因此不会尝试。如果你确定一个变量是在使用之前设置的，但Dart不同意，你可以通过将变量标记为late来修复这个错误:

:::warning

​	如果在使用之前，没有赋值一个late变量，会发生运行时错误

:::

使用场景：**当一个变量可能不会使用时，可可以惰性初始化，初始化器会在第一次使用时运行。**例如：只有在使用到`content`时dart才会调用`readTheFile`方法

~~~dart
late String content = readTheFile()
~~~

#### final和const变量

①区别

1. 可以在运行时初始化：`final`关键字允许在运行时初始化常量，而`const`关键字要求在编译时就能确定常量的值。这意味着，`final`关键字可以在运行时根据条件或计算结果来初始化常量，而`const`关键字只能使用编译时已知的常量值。
2. 值的不可变性：`final`变量可以是**表达式的结果**。使用`const`声明的变量是不可变的常量，其值必须为已知的常量。

②例子

~~~dart
void main() {
  final int finalNumber = 10;
  const int constNumber = 20;

  // final变量可以在运行时初始化
  final int finalSum = finalNumber + constNumber;
  print(finalSum);  // 输出：30

  // const变量必须在编译时初始化
  // const int constSum = finalNumber + constNumber;  // 错误：编译时常量必须是编译时常量的子表达式

  final List<int> finalList = [1, 2, 3];
  // finalList = [4, 5, 6];  // 错误：final变量的值不可变
  finalList[0] = 4;  // 可以修改final变量引用的对象的属性
  print(finalList);  // 输出：[4, 2, 3]

  // const List<int> constList = [1, 2, 3];
  // constList[0] = 4;  // 错误：const变量的值不可变
}
~~~

③使用场景：`final`通常用于那些在运行时初始化的常量，例如通过计算、函数返回值或构造函数初始化。`const`则通常用于在编译时已知的常量，例如数值、字符串等。



### 数据类型

①数据类型分类

1. `Number`：表示数字包括整数和小数，如果想声明具体类型如下：
   * `int`
   * `double`
2. `String`
3. `Boolean`
4. `List`
5. `Set`
6. `Map`

#### 字符串

①dart中使用`String`定义字符串类型

②定义多行的字符串使用三个单引号`'''`

~~~dart
String str = '''
shhh
wwwwww
''';
~~~

③模板字符串`"$变量名"`

~~~dart
String str = '''
shhh
wwwwww
''';
print("$str")
~~~

#### List数组

①语法：字面量声明

~~~dart
List list1 = []; //不限制元素类型的声明方式
List list2 = <String>[]; //限制元素类型的声明方式
~~~

②语法：构造函数声明

~~~dart
List list1 = new List.empty(growable:true);//不限制长度的空数组
List list2 = new List.filled(3,0);// 声明指定长度的数组，并填充内容
~~~

③语法：扩展操作符

~~~dart
List list1 = [1,2,3];
List list2 = <int>[...list1,4];
var list3 ;
var list4 = [...?list3]; //如果list3无法使用扩展运算符，则不会执行扩展运算符操作，避免了警告
~~~

##### 数组的常用API

=右边是js数组api对应关系。

* `forEach`
* `map`
* `where=filter`
* `any=some`
* `every`

#### Map数据类型

①语法：

~~~dart

var map = {name:'yu',age:25};
var myMap = Map<String, int>();  
map['name'];
~~~



#### 枚举类型

①语法

~~~dart
enum Color{
    red,
    green,
    blue
}
List<Color> colors = Color.values;
~~~









### 函数

#### 声明函数

①声明函数

~~~dart
int getId(){
    //...;
    return 1
}
~~~

②匿名函数

~~~dart
var myFn = (value){
    print(value)
}
~~~

③立即执行函数

~~~dart
((int a){
    print(a);
})(17)
~~~

④箭头函数，函数体只能写一行并且不能有结束分号。这里的箭头函数只是简写形式而已。

~~~dart
const getInfo = (info)=>{ 
    print(info) 
}
~~~



#### 函数参数

①必填参数

* 参数类型+参数名

~~~dart
String userInfo(String id){
    return '$id:用户'
}
~~~



②可选参数

* 放在必选参数后
* 中括号`[]`包裹起来
* 可以带默认值

~~~dart
String userInfos(List ids,[String group='age']){
    
}
~~~

③命名参数

* 使用大括号包裹起来`{}`
* 调用参数时，实参和形参的名称要一致
* 命名参数是可选的，除非它们被明确标记为`required`，被标记`required`的参数不能有默认值.

~~~dart
String userInfos({List<int> ids = const [1, 2, 3], String group = 'age'}) {
  return '$ids,$group';
}
userInfos(ids:[4,5,6],group: '2');
// gruop必传
String userInfos({List<int> ids = const [1, 2, 3],required String? group }) {
  return '$ids,$group';
}

~~~

④函数参数

~~~dart
void myFunction(int x, int y, Function operation) {  
  int result = operation(x, y);  
  print('The result is $result');  
}  
  
int add(int a, int b) {  
  return a + b;  
}  
  
int subtract(int a, int b) {  
  return a - b;  
}  
  
void main() {  
  myFunction(5, 3, add); // 输出：The result is 8  
  myFunction(5, 3, subtract); // 输出：The result is 2  
}
~~~

⑤可选参数

~~~dart
void enableFlags(bool? bold, bool? hidden}) {...}
~~~



#### 函数返回值

所有函数都会返回一个值。如果未指定返回值，则该语句`return null;`将隐式附加到函数体中。

要在函数中返回多个值，请聚合[记录](https://dart.cn/language/records#multiple-returns)中的值。

~~~dart
(String, int) foo() {
  return ('something', 42);
}

// 例二
// Returns multiple values in a record:
(String, int) userInfo(Map<String, dynamic> json) {
  return (json['name'] as String, json['age'] as int);
}

final json = <String, dynamic>{
  'name': 'Dash',
  'age': 10,
  'color': 'blue',
};

var (name, age) = userInfo(json);

~~~



#### 异步函数

①语法，同js相差无几，也是使用try-catch捕获错误

~~~dart
Future<void> checkVersion() async {
    try{
        var version = await lookUpVersion();
    }catch(e){

    }

}
~~~







### 异常处理

#### 抛异常

Dart 提供了[`Exception`](https://api.dart.cn/stable/dart-core/Exception-class.html)和[`Error`](https://api.dart.cn/stable/dart-core/Error-class.html) 类型，以及许多预定义的子类型。当然，您可以定义自己的例外情况。Dart 程序可以抛出任何非 null 对象（而不仅仅是 Exception 和 Error 对象）作为异常。

~~~dart
throw 'Out of llamas!';
~~~

**通常会抛出实现[`Error`](https://api.dart.cn/stable/dart-core/Error-class.html)或的 类型[`Exception`](https://api.dart.cn/stable/dart-core/Exception-class.html)。**



#### 捕获异常

①捕捉或捕获异常会阻止异常传播（除非您重新抛出异常）。捕获异常让您有机会处理它：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

②指定多个catch子句。与抛出的对象类型匹配的第一个 catch 子句处理异常。如果 catch 子句未指定类型，则该子句可以处理任何类型的抛出对象：

~~~dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {// 处理指定Exception类型的错误
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {//处理所有错误
  // No specified type, handles all
  print('Something really unknown: $e');
}
~~~

③catch参数：可以指定一两个参数`catch()`。第一个是引发的异常，第二个是堆栈跟踪（对象[`StackTrace`](https://api.dart.cn/stable/dart-core/StackTrace-class.html)）。

~~~dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
~~~

④传播异常

~~~dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}
void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
~~~

⑤`finally`同js

~~~dart
try {
  breedMoreLlamas();
} finally {
  cleanLlamaStalls();
}
~~~

⑥断言：在开发过程中，使用断言语句`assert(<condition>, <optionalMessage>);`——如果布尔条件为假，则中断正常执行。

~~~dart
// Make sure the variable has a non-null value.
assert(text != null);

// Make sure the value is less than 100.
assert(number < 100);

// Make sure this is an https URL.
assert(urlString.startsWith('https'));
~~~

### 类

Dart是一种面向对象的语言，具有类和基于混合的继承。每个对象都是一个类的实例，除了Null以外的所有类都是从object 继承而来的。基于混合的继承意味着，尽管每个类(除了顶级类`Object`)都只有一个超类，但类可以在多个类层次结构中重用。



#### 构造函数

①普通构造函数:与类同名的构造函数

~~~dart
class Test{
    num x,y;
    Test({required this.x,required this.y}){
         print('普通构造函数$x $y');
    }
}
Test test = new Test(x: 1, y: 2);
~~~

②命名构造函数：用`类名.`方式创建

~~~dart
class Test{
    num x,y;
    Test.init({required this.x,required this.y}){
         print('命名构造函数$x $y');
    }
}
Test test = new Test.init(x: 1, y: 2);
~~~

③常量构造函数：如果类生成的对象不改变，可以通过常量构造函数使对象成为编译时常量，提高性能。（常量构造函数相当于单例）常量类有如下要求：

* 所有属性必须用`final`声明
* 常量构造函数不能有函数体

~~~dart
class ImmutableTest{
  final num x, y;
  const ImmutableTest.init({required this.x, required this.y});
}
ImmutableTest immutableTest = const ImmutableTest.init(x: 1, y: 2);
ImmutableTest immutableTest2 = const ImmutableTest.init(x: 1, y: 2);
print(immutableTest == immutableTest2) //true

~~~

④工厂构造函数：通过关键字`factory`声明的构造函数，工厂构造函数有如下要求：

* 构造函数内不能使用this
* 工厂构造函数无法进行实例化

~~~dart
class Logger {
  final String name;
  bool mute = false;
  static Logger? instance;
  static final Map<String, Logger> _cache = <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  factory Logger.init(name) {
    Logger.instance ??= new Logger._internal(name);
    return Logger.instance as Logger;
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
Logger logger = new Logger.init('yu');
Logger logger2 = new Logger.init('yu');
print(logger == logger); // true

~~~

⑤参数默认值,

~~~dart
class Test {
  num width, height;
  Test():width=10,height=20{
    print('${this.height} ${this.width}')
  }
   /*
    Testt({int this.height = 10, int this.width = 20}) {
    print('${this.height} ${this.width}');
  }

   */ 
}
Testt test =  Testt(width:20,height:70);
print(test.width);
print(test.height); 
~~~

⑥构造函数重定向，必须使用初始化列表的写法才能使用`Test():width=10,height=20{}`

~~~
class Point{
	dobule x,y,z;
	Point(this.x,this.y,this.z);
	Point twoDimension(double x,double y):this(x,y,0);
}
~~~





#### 访问修饰符

Dart与ts不同，没有`public, protected,private`修饰符,dart的属性修饰语法如下：

* 以`_`下划线开头的属性为私有属性，并把类单独存为库才行。
* 默认属性和方法都是公共的

#### 类访问器

①`get`,使用`get`声明的访问器不能带小括号`()`;`set`指定关键字即可

~~~dart
class Test {
  num a = 123;
  num get theNum {
    return a;
  }
  set setNum(value){
      this.a = value;
  }
}
Testt test = new Testt();
print(test.theNum); // 123
test.setNum=20;
print(test.theNum); // 20
~~~

#### 继承

同ts，使用`extends`关键词继承父类，继承后可使用公共的属性或方法，字类可以通过`@override`注解重写父类方法。

①继承父类构造函数

~~~dart
Son(String job):super(job);
//继承命名构造函数
Son(String job):super.xxx(job)
~~~



#### 抽象类=接口

①语法要求如下：

* 用`abstract`修饰
* 作用是充当普通类的模板，约定一些属性和方法，但是没有方法的具体实现
* 不能被实例化
* 普通类继承了抽象类，则必须实现抽象类的方法
* 接口实现抽象类则必须实现定义的所有属性和方法

~~~dart
abstract class Phone{
    var camera();//摄像头
    var photos();//相册
}
class Apple extends Phone{
    @override
    void camera(){
        print('苹果相机')
    }
    @override
    void photos(){
         print('苹果手机相册')
    }
}

~~~

②在Dart中接口就是抽象类,普通类可以实现多个接口

~~~dart
abstract class Animal{
    String type;
}
abstract class Action{
    run(num leg);
}
class Dog implements Animal,Action{
    @override
    String type;
    
    @override
    run(num leg){
        print('用$leg条腿跑')
    }
}
~~~

#### 混入

①混入是一段公共代码，其语法如下：

* 作为混入的类只能继承自Object，不能继承其他类
* 作为混入的类不能有构造函数
* 使用关键字声明`minin`声明混入，用关键字`with`使用混入
* 使用多个混入时，如果有重名属性或方法，后者覆盖前者

~~~dart
class A{
	String name = 'MixinA';
}
Mixin B{
    String name = 'Mixin B'
}
class Myclass with A,B{
}

var c = new Myclass();
c.name // 'Mixin B'
~~~

#### extension扩展

~~~dart
extension StringExtension on String{
    parseInt(){
        return int.parse(this);
    }
}
main(){
	String num = '123';
    num.parseInt();
}
//扩展自定义类
class MyClass{
    
}
extension ExtClass on MyClass{
    test(){
        print('这是一个扩展方法');
    }
}
var t = new MyClass();
t.test();
~~~

#### call方法

如果将实例对象当作方法调用，要在类中定义`call`方法。

 ~~~dart
 class MyClass{
     call(String name){
         print('$name')
     }
 }
 var t = new MyClass();
 t('yu');
 ~~~

#### noSuchMethod

①当调用类中未声明的方法时，Dart会调用类中定义的noSuchMethod方法，且实例化对象时必须用`dynamic`修饰

~~~dart
class MyClass{
    noSuchMethod(Invocation invocation){
        return super.noSuchMethod(invocation)
    }
}
dynamic t = new MyClass();
t.aaa();
~~~

②作用：避免了运行时错误，并且可以自定义调用不存在方法的行为。



#### hashCode

`hashCode`定义

* 是Dart对象的唯一表示
* 表现为一串数字
* 每个对象都有一个`hashCode`（可以通过这点判断对象是否相等）





### 泛型

#### 泛型类型限制

~~~dart

class BaseClass{
    
}
class MyClass<T extends BaseClass>{
    String toString()=>"Instance of Foo<$T>"
}

var myclass = MyClass<BaseClass>();
~~~









### 注解

在Dart中，注解是一种用于提供元数据的特殊语法。注解是以`@`符号开头，紧跟着注解名和参数（可选）。它们可以应用于类、方法、变量和参数等代码元素上。

所有 Dart 代码都可以使用三个注释： `@Deprecated`、`@deprecated`和`@override`。有关使用示例`@override`，请参阅[扩展类](https://dart.cn/language/extend)。



#### 自定义注解

元数据以@开头，可以给代码标记一些额外的信息。

~~~dart
class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}

@Todo('Fancy——fish', 'Implement this function')
void doSomething() {
  print('Do something');
}
~~~

#### 常见的三个注解

* `@override`重写
* `@required`必填
* `@deprecated`弃用，表示此方法/类不建议再使用



### 模块化

#### 引入自定义库

①每个dart文件默认是一个库，知识没有用`library`显示声明。dart使用`_`下划线开头的标识符，表示库内访问可见（私有库）

②声明库要用下划线连接名称，flutter中驼峰会报警告。

③语法（`import '库的位置/库名称.dart'`）:如下。

~~~dart
// /My_Module/lib/MyModule.dart
library My_Module; // 建议使用library my_module

class My_Module {
  String name = "My_Module";
  void info() {
    print('dart 模块化');
  }
}

// My_Module/index.dart
import './lib/MyModule.dart';

void main() {
  My_Module mm = new My_Module();
  mm.info();
}

// dart 模块化
~~~

##### 引入部分库（按需加载）

①例如show 包含引入 可以理解为js中的`import { fn_show1, fn_show2} from './lib/MyModule.dart'`

~~~dart
import './lib/MyModule.dart' show fn_show1, fn_show2;

void main() {
  fn_show1();
  fn_show2();
}
// My_Module/lib/My_Module.dart
library my_module;

class My_Module {
  String name = "My_Module";
  static num version = 1.0;
  void info() {
    print('dart 模块化');
  }
}

void fn_show1() {
  print('show1方式引入');
}

void fn_show2() {
  print('show2方式引入');
}
~~~

②hide 排除引入。hide后的都无法使用，编译就会报错。

~~~dart
import './lib/MyModule.dart' hide fn_show1, fn_show2;

void main() {
  // ×
  fn_show1();
  // ×
  fn_show2();
  fn_show3();
}
// My_Module/lib/My_Module.dart
library my_module;

class My_Module {
  String name = "My_Module";
  static num version = 1.0;
  void info() {
    print('dart 模块化');
  }
}

void fn_show1() {
  print('show1方式引入');
}

void fn_show2() {
  print('show2方式引入');
}

void fn_show3() {
  print('show2方式引入');
}
~~~

##### 库加别名

当引入多个库时，可能会存在冲突，为了防止这种情况可以给引入的库起别名，来避免冲突。类似于js中的`import my_module as a_module from './lib/MyModuleA.dart'`

~~~dart
import './lib/MyModuleA.dart'  as a_module;
import './lib/MyModuleB.dart'  as b_module;
void main() {
  a_module.fn_show1();
  a_module.fn_show2();
  b_module.fn_show1();
  b_module.fn_show2();
}

// My_Module/lib/My_ModuleA.dart
library my_module;
void fn_show1() {
  print('A show1方式引入');
}

void fn_show2() {
  print('A show2方式引入');
}

void fn_show3() {
  print('A show2方式引入');
}
// My_Module/lib/My_ModuleB.dart
library my_module;


void fn_show1() {
  print('B show1方式引入');
}

void fn_show2() {
  print('B show2方式引入');
}

void fn_show3() {
  print('B show2方式引入');
}
~~~

##### 延迟引入（懒加载）

①定义:就是对于一个库的引入，Dart只建立文件引用关系，并不会直接加载引用库的内容，直到使用`loadLibrary()`方法时才会返回该库的内容。

②语法：`defferred`

~~~dart
import './lib/MyModuleA.dart' deferred as a_module;

void main() {
 	greet();

}
Future greet() async {
    await a_module.loadLibrary();
    a_module.fn_show1();
}
~~~

##### 组装库

`part`

`part of`

当我们的库比较大，需要建立库之间的联系时使用

~~~dart
// main.dart
import 'Utils/index.dart' as utils;

void main() {
  utils.Utils util = new utils.Utils();
  util.init();
  //也可直接调用子库
  utils.sub1_fn();
}
// Utils/index.dart
library utils;

part 'sub1.dart';
part 'sub2.dart';

class Utils {
  init() {
    sub1_fn();
    sub2_fn();
  }
}
// Utils.sub1.dart
part of utils;

void sub1_fn() {
  print('sub1');
}
// Utils.sub2.dart
part of utils;

void sub2_fn() {
  print('sub2');
}
~~~





#### 引入系统库

①Dart内置很多库，在引入时需要注意语法：（`import 'dart:库名'`）

~~~dart
import 'dart:math'
void main(){
    print(pi);
}    
~~~

②Dart的核心库默认被引入(`import 'dart:core'`)





##### 核心系统库

[文档地址：](https://dart.cn/guides/libraries)





#### 引入第三方库

①Dart有类似于npm的包管理库，里面都是第三方库。来源如下：

* `https://pub.dev`
* `https://pub.flutter-io.cn/packages`
* `https://pub.dartlang.org/flutter`

②使用方式:

1. 先创建`pubspec.yaml`文件，相当于`package.json`
2. 在`pubspec.yaml`中声明依赖
3. 然后命令行进入`pubspec.yaml`文件目录执行`pub get`安装依赖
4. 引入`import 'package:'`

③第三方包的目录结构

![](/Flutter/dir_example.png)

### Dart异步编程

Dart默认采用单线程，使用事件轮询的方式。同JS一样拥有主线程，微任务和宏任务。

微任务：`scheduleMicrotask`中的回调

宏任务：事件，IO

![](/Flutter/async.png)





#### lsolate多线程类似于Web worker

Dart中的线程以隔离的方式存在。

①为什么叫`isolate`呢？

在应用中，所有的 Dart 代码都在 **isolate** 中运行。每一个 Dart 的 isolate 都有独立的运行线程，它们无法与其他 isolate 共享可变对象。在需要进行通信的场景里，isolate 会使用消息机制。很多 Dart 应用都只使用一个 isolate，也就是 main isolate。你可以创建额外的 isolate 以便在多个处理器核心上执行并行代码。

②`Isolate`工作原理

现代的设备通常会使用多核 CPU。开发者为了让程序在设备上有更好的表现，有时会使用共享内容的线程来并发运行代码。然而，状态的共享可能会 [产生竞态条件，从而造成错误](https://baike.baidu.com/l/kex6qKvt)，也可能会增加代码的复杂度。

Dart 代码并不在多个线程上运行，取而代之的是它们会在 isolate 内运行。每一个 isolate 会有自己的堆内存，从而确保 isolate 之间互相隔离，无法互相访问状态。由于这样的实现并不会共享状态，所以 [互斥锁和其他锁](https://baike.baidu.com/l/My2bXiba) 以及 [竞争条件](https://baike.baidu.com/item/竞争条件/10354815) 不会在 Dart 中出现。也就是说，isolate 并不能完全防止竞争条件。

在使用 isolate 时，你的 Dart 代码可以在同一时刻进行多个独立的任务，并且使用可用的处理器核心。 Isolate 与线程和进程近似，但是每个 isolate 都拥有独立的内存，以及运行事件循环的独立线程。

③Isolate的生命周期

每个 isolate 都是从运行 Dart 代码开始的，比如 `main()` 函数。执行的 Dart 代码可能会注册一些事件监听，例如处理用户操作或文件读写。当 isolate 执行的 Dart 代码结束后，如果它还需要处理已监听的事件，那么它依旧会继续被保持。处理完所有事件后，isolate 会退出。

④`worker Isolate`

如果你的应用受到耗时计算的影响而出现卡顿，例如 [解析较大的 JSON 文件](https://flutter.cn/docs/cookbook/networking/background-parsing)，你可以考虑将耗时计算转移到单独工作的 isolate，通常我们称这样的 isolate 为 **后台运行对象**。下图展示了一种常用场景，你可以生成一个 isolate，它将执行耗时计算的任务，并在结束后退出。这个 isolate 工作对象退出时会把结果返回。

![](/Flutter/isolate-bg-worker.png)

每个 isolate 都可以通过消息通信传递一个对象，这个对象的所有内容都需要满足可传递的条件。并非所有的对象都满足传递条件，在无法满足条件时，消息发送会失败。举个例子，如果你想发送一个 `List<Object>`，你需要确保这个列表中所有元素都是可被传递的。假设这个列表中有一个 `Socket`，由于它无法被传递，所以你无法发送整个列表。

你可以查阅 [`send()` 方法](https://api.dart.cn/stable/dart-isolate/SendPort/send.html) 的文档来确定哪些类型可以进行传递。

Isolate 工作对象可以进行 I/O 操作、设置定时器，以及其他各种行为。它会持有自己内存空间，与主 isolate 互相隔离。这个 isolate 在阻塞时也不会对其他 isolate 造成影响。

##### 多线程创建

①`Isolate.spawn`

~~~dart
import 'dart:isolate';

void main() async {
  mutiIsolate();
}

void mutiIsolate() {
  print('当前线程名称${Isolate.current.debugName}');//当前线程名称main
  Isolate.spawn(newIsolate, 'hello_isolate');
}

void newIsolate(String message) {
  print('当前线程名称${Isolate.current.debugName}');//当前线程名称newIsolate
  print(message);
}

~~~

②`Isolate.spawnUri`

~~~dart
ReceiverPort receiverPort = ReceiverPort();
SendPort sendPort = receiverPort.sendPort;
Isolate childIsolate = Isolate.spawnUri(
	Uri(path:'./childIsolate.dart'),
    ['data1','data2'],
    sendPort
)
receiverPort.listen((message)=>{
    print('主线程收到消息$message')
    childIsolate.kill();//释放子线程
})
//   ./childIsolate.dart
main(Object args,SendPort sendPort){
    print('新线程的消息')
}    
~~~



##### Isolate线程通信

①单向通信

~~~dart

import 'dart:isolate';

void main() async {
  mutiIsolate();
}

void mutiIsolate() {
  print('当前线程名称${Isolate.current.debugName}');//当前线程名称main
  ReceivePort rp = ReceivePort();
  SendPort sp = rp.sendPort;
  Isolate.spawn(newIsolate, sp );
  
  rp.listen((msg)=>{
      print('${msg.toString()}来自新线程的消息')
      //可以通过rp.close()关闭
  }) //新线程发送的消息
   
}

void newIsolate(SendPort sp) {
  print('当前线程名称${Isolate.current.debugName}');//当前线程名称newIsolate
  sp.send('发送的信息给主线程')
}

~~~

②双向通信:在新线程中也声明`ReceivePort`和`sendPort`，同样将`sendPort`发送给主`Isolate`

~~~dart

import 'dart:isolate';

void main() async {
  mutiIsolate();
}

void mutiIsolate() {
  print('当前线程名称${Isolate.current.debugName}');//当前线程名称main
  ReceivePort rp = ReceivePort();
  SendPort sp = rp.sendPort;
  Isolate.spawn(newIsolate, sp );
  
  SendPort nSP = await rp.first;// 新线程的发送者
  nSP.send('来自主线程的消息')
  /*rp.listen((msg)=>{
      print('${msg.toString()}来自新线程的消息')
      //可以通过rp.close()关闭
  }) //新线程发送的消息*/
   
}

void newIsolate(SendPort sp) {
  print('当前线程名称${Isolate.current.debugName}');//当前线程名称newIsolate
  ReceivePort nRp = ReceivePort();
  SendPort nSp = nRp.sendPort;
  sp.send(nSp)
}


~~~











![](/Flutter/Isolate_talk.png)







#### Future

这里的Future=Promise，基本类似。

①Future有三种状态

* 未完成
* 已完成，并返回数据
* 已完成，返回错误

②Future的实例。

* 系统方法调用返回。如http
* 手动创建`final myFuture = Future(()=>{return 123})`

③Future相关常用方法

* then
* catchError:捕获Future回调中的错误
* whenComplete：相当于finally，无论成功还是错误都会执行
* delayed：指定延迟时间`Future.delayed(Duration(seconds:2),(){return 123;})`

④Future执行顺序：默认Future是宏任务，不会丢到事件队列中。我们可以执行Future身上的方法控制执行时机。

* `Future()`宏任务
* `Future.sync()`同步任务
* `Future.microtask()`微任务
* `Future.value(val)`，val类型不同，执行时机不同。1.val常量，微任务。 2.val如果本身就是异步任务，那根据val异步逻辑处理。

⑤Future多任务：这里多任务和JS中的`Promise.all`,`Promise.race`类似

* `Future.any` = `Promise.race`,返回最先完成的Future结果
* `Future.wait` = `Promise.all`，等所有Future完成，收集所有Future结果并返回
* `Future.doWhile(action)`按照条件执行多个Future
* `Future.forEach`遍历可迭代的集合

~~~dart
void main() async {
  final res = await Future.any([getInfo1(), getInfo2()]);
  print(res); // info2
  final res2 = await Future.wait([getInfo1(), getInfo2()]);
  print(res2);// [info1, info2]
    
  List<Future<String>> futureList = [getInfo1(), getInfo2()];
  var i = 0;
  Future.doWhile(() { 
     /* 
     	info1
		info2
	*/
    if (i > futureList.length-1) return false;
    return futureList[i++].then((value) {
      print(value);
      return true;
    }).catchError((error) {
      print(error);
      return false;
    });
  });  
    // Future.forEach
  Future.forEach([1, 2, 3], (element) { //每隔1秒分别输出 2   4   6
    return Future.delayed(const Duration(seconds: 1), () {
      return element * 2;
    }).then((value) {
      print(value);
    });
  });
}
Future<String> getInfo1() {
  return Future.delayed(const Duration(seconds: 2), () {
    return 'info1';
  });
}

Future<String> getInfo2() {
  return Future.delayed(const Duration(seconds: 1), () {
    return 'info2';
  });
}

~~~







#### Stream

①Stream是异步数据流，可以连续不断的返回多个数据，不同于Future只能返回一个值，Stream可与返回多个值。当需要从流中获取数据时一般有两个操作如下：

* `await for` 有时，可以使用异步 for 循环 `await for` ，来替代 Stream API 。
* 使用stream API

`await for`

~~~dart
await for (varOrType identifier in expression) { // expression必须是个stream类型
  // Executes each time the stream emits a value.
}

void main() async {
  // ...
  await for (final request in requestServer) {
    handleRequest(request);
  }
  // ...
}
~~~

②Stream类型

* Single-Subscription单一订阅，即数据流只能被监听一次，否则会报错
* Broadcast广播数据流，数据流可以被监听多次

③创建Stream

单一订阅的数据流

~~~dart
import 'dart:async';

main() {
  final StreamController controller = StreamController();
  controller.stream.listen((event) {
    print('监听的数据$event'); //监听的数据：123   监听的数据：456
  });
  controller.sink.add('：123');
  controller.sink.add('：456');
  /*
  多个监听会报错
  controller.stream.listen((event) {
    print('监听的数据$event'); //监听的数据：123   监听的数据：456
  });
  Unhandled exception:
	Bad state: Stream has already been listened to.
  */  
}

~~~

创建广播流

~~~dart
  final StreamController controller2 = StreamController.broadcast();
  controller2.stream.listen((event) {
    print('监听的数据$event');
  });
  controller2.stream.listen((event) {
    print('监听的数据$event');
  });
  controller2.sink.add('来自广播流的：123');
  controller2.sink.add('来自广播流的：123');
// 监听的数据来自广播流的：123
// 监听的数据来自广播流的：123
// 监听的数据来自广播流的：123
// 监听的数据来自广播流的：123
~~~

④Stream类的一些方法

* `Stream.fromFuture().listen((event)=>{}).onDone(()=>{})`
* `Stream.fromFutures().listen((event)=>{}).onDone(()=>{})`
* `Stream.fromIterable().listen((event)=>{}).onDone(()=>{})`
* `Stream.periodic(Duration,(){}).listen((event)=>{}).onDone(()=>{})`这个方法相当于js的`setInteval`。通过`Stream.take(num).periodic`中的num指定







#### Async await

基本等同于js中的async await



#### Generator

类似js的生成器，但也有不同

①同步生成器`sync*`

~~~dart
getUser(int n)sync*{
    int i = 0;
    while(i<n){
        yield i++
    }
}
main(){
    var res = getUser(3).iterator;
    res.moveNext();  
    res.current;// 获取当前值
}
~~~

②异步生成器`async* + yield`,异步生成器返回的是Stream对象

~~~dart
getUser(int n)async*{
    int i = 0;
    while(i<n){
        yield i++
    }
}
main(){
    var stream = getUser(3).iterator;
    stream.listen((event){
        print(event)
    }).onDone((){
        print('完毕')
    });
}
~~~

③递归生成器`yield*`

~~~dart
Interable<int> getRange(int left,int right)sync*{
    if(left<=right){
        yield left; 
        yield*getRange(++left,right);
    }
}
~~~













<CommentService/>