<template><div><h1 id="flutter" tabindex="-1"><a class="header-anchor" href="#flutter" aria-hidden="true">#</a> flutter</h1>
<p>①<strong>Flutter优势</strong></p>
<ul>
<li>Flutter的UI渲染性能很高，充分利用GPU图形加速</li>
<li>使用C++编写，使用了Skia 2D渲染引擎，Dart运行时和文本渲染库。</li>
</ul>
<h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1.安装</h2>
<p>①<a href="https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.13.9-stable.zip" target="_blank" rel="noopener noreferrer">windows安装地址<ExternalLinkIcon/></a></p>
<p><strong>请注意</strong> 请勿将 Flutter 安装在需要高权限的文件夹内，例如 C:\Program Files\。</p>
<p>②配置国内镜像：在flutter安装目录下的<code v-pre>packages\flutter_tools\gradle</code>，修改<code v-pre>flutter.gradle</code>文件：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>repositories {
   // google()
   // jcenter()
   maven{ url 'https://maven.aliyun.com/repository/google' }
   maven{ url 'https://maven.aliyun.com/repository/jcenter' }
   maven{ url 'http://maven.aliyun.com/nexus/content/groups/public'}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③环境变量配置，在当前用户的Path中增加flutter的bin目录地址例如<code v-pre>D:\flutter\flutter_windows_3.13.9-stable\flutter\bin</code></p>
<p>同时增加两个环境变量</p>
<div class="language-txt line-numbers-mode" data-ext="txt"><pre v-pre class="language-txt"><code>FLUTTER_STORAGE_BASE_URL
https://storage.flutter-io.cn

PUB_HOSTED_URL
https://pub.flutter-io.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④ 设置 Android 开发环境</p>
<p><a href="https://developer.android.google.cn/studio?hl=zh-cn" target="_blank" rel="noopener noreferrer">下载地址<ExternalLinkIcon/></a></p>
<p>安装完成后 进入android_tools中安装sdk</p>
<h2 id="flutter目录结构" tabindex="-1"><a class="header-anchor" href="#flutter目录结构" aria-hidden="true">#</a> Flutter目录结构</h2>
<ul>
<li>文件<code v-pre>lib/main.dart</code>为入口文件</li>
<li>主函数<code v-pre>void main(){}</code></li>
</ul>
<h2 id="_3-dart" tabindex="-1"><a class="header-anchor" href="#_3-dart" aria-hidden="true">#</a> 3.Dart</h2>
<p>如果会ts，dart很容易。</p>
<p><a href="https://dart.cn/#try-dart" target="_blank" rel="noopener noreferrer">dart在线测试<ExternalLinkIcon/></a></p>
<p>Dart 是一种针对客户端优化的语言，可在任何平台上开发快速的应用程序。其目标是为多平台开发提供最高效的编程语言，并为应用程序框架搭配了 <a href="https://dart.cn/overview#platform" target="_blank" rel="noopener noreferrer">灵活的运行时执行平台<ExternalLinkIcon/></a>。Dart 语言是类型安全的；它使用静态类型检查来确保变量的值 <strong>始终</strong> 与变量的静态类型相匹配，但由于 Dart 支持类型推断，类型注释仍是可选的</p>
<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<h4 id="类型推断" tabindex="-1"><a class="header-anchor" href="#类型推断" aria-hidden="true">#</a> 类型推断</h4>
<p>①可以用 <code v-pre>var</code> 来定义变量，而不用显式指定它们的类型。由于其支持类型推断，因此大多数变量的类型会由它们的初始化内容决定：</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'Voyager I'</span></span><span class="token punctuation">;</span>
<span class="token keyword">var</span> year <span class="token operator">=</span> <span class="token number">1977</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> antennaDiameter <span class="token operator">=</span> <span class="token number">3.7</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> flybyObjects <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'Jupiter'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'Saturn'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'Uranus'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'Neptune'</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> image <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-literal"><span class="token string">'tags'</span></span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'saturn'</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-literal"><span class="token string">'url'</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'//path/to/saturn.jpg'</span></span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②当变量类型是动态类型（可能发生变化时），我们可以指定为对象类型Object</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Object</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'123'</span></span><span class="token punctuation">;</span>
  name<span class="token operator">=</span><span class="token string-literal"><span class="token string">'yu'</span></span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="空值安全" tabindex="-1"><a class="header-anchor" href="#空值安全" aria-hidden="true">#</a> 空值安全</h4>
<p>①Null safety是为了防止无意设置的空变量而导致的错误。使用空值安全，Dart将在编译时检测</p>
<p>什么意思呢？例如我们声明了一个<code v-pre>a</code>变量为<code v-pre>null</code>，然后我们调用该变量身上的方法，在其它语言可能出现运行时错误，不会有编译提示。Dart会在编译时禁止这些操作。例如：</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span><span class="token operator">?</span> name<span class="token punctuation">;</span>
  name<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/Flutter/dart_var1.png" alt=""></p>
<p>②Dart中不能调用空值类型的方法和属性。</p>
<p>③当一个变量为空值类型时，默认值就是null</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  int<span class="token operator">?</span> lineCount<span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>lineCount <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④如果我们想使用非空变量的属性和方法则必须在使用之前进行赋值</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  double<span class="token operator">?</span> lineCount<span class="token punctuation">;</span>
  lineCount <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>lineCount<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="late变量" tabindex="-1"><a class="header-anchor" href="#late变量" aria-hidden="true">#</a> late变量</h4>
<p>通常，Dart的控制流分析可以在使用非空变量之前检测到何时将其设置为非空值有时分析会失败。两种常见的情况是顶级变量和实例变量:Dart通常无法确定它们是否已设置，因此不会尝试。如果你确定一个变量是在使用之前设置的，但Dart不同意，你可以通过将变量标记为late来修复这个错误:</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>​	如果在使用之前，没有赋值一个late变量，会发生运行时错误</p>
</div>
<p>使用场景：**当一个变量可能不会使用时，可可以惰性初始化，初始化器会在第一次使用时运行。**例如：只有在使用到<code v-pre>content</code>时dart才会调用<code v-pre>readTheFile</code>方法</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>late <span class="token class-name">String</span> content <span class="token operator">=</span> <span class="token function">readTheFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="final和const变量" tabindex="-1"><a class="header-anchor" href="#final和const变量" aria-hidden="true">#</a> final和const变量</h4>
<p>①区别</p>
<ol>
<li>可以在运行时初始化：<code v-pre>final</code>关键字允许在运行时初始化常量，而<code v-pre>const</code>关键字要求在编译时就能确定常量的值。这意味着，<code v-pre>final</code>关键字可以在运行时根据条件或计算结果来初始化常量，而<code v-pre>const</code>关键字只能使用编译时已知的常量值。</li>
<li>值的不可变性：<code v-pre>final</code>变量可以是<strong>表达式的结果</strong>。使用<code v-pre>const</code>声明的变量是不可变的常量，其值必须为已知的常量。</li>
</ol>
<p>②例子</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> int finalNumber <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> int constNumber <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

  <span class="token comment">// final变量可以在运行时初始化</span>
  <span class="token keyword">final</span> int finalSum <span class="token operator">=</span> finalNumber <span class="token operator">+</span> constNumber<span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>finalSum<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出：30</span>

  <span class="token comment">// const变量必须在编译时初始化</span>
  <span class="token comment">// const int constSum = finalNumber + constNumber;  // 错误：编译时常量必须是编译时常量的子表达式</span>

  <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span>int<span class="token punctuation">></span></span> finalList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// finalList = [4, 5, 6];  // 错误：final变量的值不可变</span>
  finalList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>  <span class="token comment">// 可以修改final变量引用的对象的属性</span>
  <span class="token function">print</span><span class="token punctuation">(</span>finalList<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出：[4, 2, 3]</span>

  <span class="token comment">// const List&lt;int> constList = [1, 2, 3];</span>
  <span class="token comment">// constList[0] = 4;  // 错误：const变量的值不可变</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③使用场景：<code v-pre>final</code>通常用于那些在运行时初始化的常量，例如通过计算、函数返回值或构造函数初始化。<code v-pre>const</code>则通常用于在编译时已知的常量，例如数值、字符串等。</p>
<h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3>
<p>①数据类型分类</p>
<ol>
<li><code v-pre>Number</code>：表示数字包括整数和小数，如果想声明具体类型如下：
<ul>
<li><code v-pre>int</code></li>
<li><code v-pre>double</code></li>
</ul>
</li>
<li><code v-pre>String</code></li>
<li><code v-pre>Boolean</code></li>
<li><code v-pre>List</code></li>
<li><code v-pre>Set</code></li>
<li><code v-pre>Map</code></li>
</ol>
<h4 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h4>
<p>①dart中使用<code v-pre>String</code>定义字符串类型</p>
<p>②定义多行的字符串使用三个单引号<code v-pre>'''</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'''
shhh
wwwwww
'''</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③模板字符串<code v-pre>&quot;$变量名&quot;</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'''
shhh
wwwwww
'''</span></span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">str</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="list数组" tabindex="-1"><a class="header-anchor" href="#list数组" aria-hidden="true">#</a> List数组</h4>
<p>①语法：字面量声明</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">List</span> list1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//不限制元素类型的声明方式</span>
<span class="token class-name">List</span> list2 <span class="token operator">=</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//限制元素类型的声明方式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>②语法：构造函数声明</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">List</span> list1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span>growable<span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不限制长度的空数组</span>
<span class="token class-name">List</span> list2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">filled</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 声明指定长度的数组，并填充内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>③语法：扩展操作符</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">List</span> list1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name">List</span> list2 <span class="token operator">=</span> <span class="token generics"><span class="token punctuation">&lt;</span>int<span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>list1<span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> list3 <span class="token punctuation">;</span>
<span class="token keyword">var</span> list4 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">?</span>list3<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//如果list3无法使用扩展运算符，则不会执行扩展运算符操作，避免了警告</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="数组的常用api" tabindex="-1"><a class="header-anchor" href="#数组的常用api" aria-hidden="true">#</a> 数组的常用API</h5>
<p>=右边是js数组api对应关系。</p>
<ul>
<li><code v-pre>forEach</code></li>
<li><code v-pre>map</code></li>
<li><code v-pre>where=filter</code></li>
<li><code v-pre>any=some</code></li>
<li><code v-pre>every</code></li>
</ul>
<h4 id="map数据类型" tabindex="-1"><a class="header-anchor" href="#map数据类型" aria-hidden="true">#</a> Map数据类型</h4>
<p>①语法：</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>
<span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token punctuation">:</span><span class="token string-literal"><span class="token string">'yu'</span></span><span class="token punctuation">,</span>age<span class="token punctuation">:</span><span class="token number">25</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myMap <span class="token operator">=</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> int<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
map<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="枚举类型" tabindex="-1"><a class="header-anchor" href="#枚举类型" aria-hidden="true">#</a> 枚举类型</h4>
<p>①语法</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">enum</span> <span class="token class-name">Color</span><span class="token punctuation">{</span>
    red<span class="token punctuation">,</span>
    green<span class="token punctuation">,</span>
    blue
<span class="token punctuation">}</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Color</span><span class="token punctuation">></span></span> colors <span class="token operator">=</span> <span class="token class-name">Color</span><span class="token punctuation">.</span>values<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3>
<h4 id="声明函数" tabindex="-1"><a class="header-anchor" href="#声明函数" aria-hidden="true">#</a> 声明函数</h4>
<p>①声明函数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>int <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...;</span>
    <span class="token keyword">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②匿名函数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">var</span> myFn <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③立即执行函数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token punctuation">(</span><span class="token punctuation">(</span>int a<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④箭头函数，函数体只能写一行并且不能有结束分号。这里的箭头函数只是简写形式而已。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">const</span> getInfo <span class="token operator">=</span> <span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">{</span> 
    <span class="token function">print</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="函数参数" tabindex="-1"><a class="header-anchor" href="#函数参数" aria-hidden="true">#</a> 函数参数</h4>
<p>①必填参数</p>
<ul>
<li>参数类型+参数名</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">String</span> <span class="token function">userInfo</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">'</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">id</span></span><span class="token string">:用户'</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②可选参数</p>
<ul>
<li>放在必选参数后</li>
<li>中括号<code v-pre>[]</code>包裹起来</li>
<li>可以带默认值</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">String</span> <span class="token function">userInfos</span><span class="token punctuation">(</span><span class="token class-name">List</span> ids<span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token class-name">String</span> group<span class="token operator">=</span><span class="token string-literal"><span class="token string">'age'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③命名参数</p>
<ul>
<li>使用大括号包裹起来<code v-pre>{}</code></li>
<li>调用参数时，实参和形参的名称要一致</li>
<li>命名参数是可选的，除非它们被明确标记为<code v-pre>required</code>，被标记<code v-pre>required</code>的参数不能有默认值.</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">String</span> <span class="token function">userInfos</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span>int<span class="token punctuation">></span></span> ids <span class="token operator">=</span> <span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">String</span> group <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'age'</span></span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">'</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">ids</span></span><span class="token string">,</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">group</span></span><span class="token string">'</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">userInfos</span><span class="token punctuation">(</span>ids<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span>group<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'2'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// gruop必传</span>
<span class="token class-name">String</span> <span class="token function">userInfos</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span>int<span class="token punctuation">></span></span> ids <span class="token operator">=</span> <span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>required <span class="token class-name">String</span><span class="token operator">?</span> group <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">'</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">ids</span></span><span class="token string">,</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">group</span></span><span class="token string">'</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④函数参数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">myFunction</span><span class="token punctuation">(</span>int x<span class="token punctuation">,</span> int y<span class="token punctuation">,</span> <span class="token class-name">Function</span> operation<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
  int result <span class="token operator">=</span> <span class="token function">operation</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>  
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'The result is </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">result</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  
  
int <span class="token function">add</span><span class="token punctuation">(</span>int a<span class="token punctuation">,</span> int b<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  
  
int <span class="token function">subtract</span><span class="token punctuation">(</span>int a<span class="token punctuation">,</span> int b<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
  <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  
  
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
  <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> add<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：The result is 8  </span>
  <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> subtract<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：The result is 2  </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑤可选参数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">enableFlags</span><span class="token punctuation">(</span>bool<span class="token operator">?</span> bold<span class="token punctuation">,</span> bool<span class="token operator">?</span> hidden<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>⑥初始化列表，初始化同样是给参数默认值，但是不同的在于，初始化列表的写法可以传入表达式，而参数默认值写法只能是确定的值。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token operator">?</span><span class="token string-literal"><span class="token string">'yu'</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="函数返回值" tabindex="-1"><a class="header-anchor" href="#函数返回值" aria-hidden="true">#</a> 函数返回值</h4>
<p>所有函数都会返回一个值。如果未指定返回值，则该语句<code v-pre>return null;</code>将隐式附加到函数体中。</p>
<p>要在函数中返回多个值，请聚合<a href="https://dart.cn/language/records#multiple-returns" target="_blank" rel="noopener noreferrer">记录<ExternalLinkIcon/></a>中的值。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">,</span> int<span class="token punctuation">)</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'something'</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 例二</span>
<span class="token comment">// Returns multiple values in a record:</span>
<span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">,</span> int<span class="token punctuation">)</span> <span class="token function">userInfo</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token keyword">dynamic</span><span class="token punctuation">></span></span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>json<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">]</span> <span class="token operator">as</span> <span class="token class-name">String</span><span class="token punctuation">,</span> json<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'age'</span></span><span class="token punctuation">]</span> <span class="token operator">as</span> int<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">final</span> json <span class="token operator">=</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token keyword">dynamic</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
  <span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'Dash'</span></span><span class="token punctuation">,</span>
  <span class="token string-literal"><span class="token string">'age'</span></span><span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token string-literal"><span class="token string">'color'</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'blue'</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">userInfo</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="异步函数" tabindex="-1"><a class="header-anchor" href="#异步函数" aria-hidden="true">#</a> 异步函数</h4>
<p>①语法，同js相差无几，也是使用try-catch捕获错误</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">></span></span> <span class="token function">checkVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token keyword">var</span> version <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">lookUpVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理" aria-hidden="true">#</a> 异常处理</h3>
<h4 id="抛异常" tabindex="-1"><a class="header-anchor" href="#抛异常" aria-hidden="true">#</a> 抛异常</h4>
<p>Dart 提供了<a href="https://api.dart.cn/stable/dart-core/Exception-class.html" target="_blank" rel="noopener noreferrer"><code v-pre>Exception</code><ExternalLinkIcon/></a>和<a href="https://api.dart.cn/stable/dart-core/Error-class.html" target="_blank" rel="noopener noreferrer"><code v-pre>Error</code><ExternalLinkIcon/></a> 类型，以及许多预定义的子类型。当然，您可以定义自己的例外情况。Dart 程序可以抛出任何非 null 对象（而不仅仅是 Exception 和 Error 对象）作为异常。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">throw</span> <span class="token string-literal"><span class="token string">'Out of llamas!'</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>通常会抛出实现<a href="https://api.dart.cn/stable/dart-core/Error-class.html" target="_blank" rel="noopener noreferrer"><code v-pre>Error</code><ExternalLinkIcon/></a>或的 类型<a href="https://api.dart.cn/stable/dart-core/Exception-class.html" target="_blank" rel="noopener noreferrer"><code v-pre>Exception</code><ExternalLinkIcon/></a>。</strong></p>
<h4 id="捕获异常" tabindex="-1"><a class="header-anchor" href="#捕获异常" aria-hidden="true">#</a> 捕获异常</h4>
<p>①捕捉或捕获异常会阻止异常传播（除非您重新抛出异常）。捕获异常让您有机会处理它：</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">breedMoreLlamas</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">on</span> <span class="token class-name">OutOfLlamasException</span> <span class="token punctuation">{</span>
  <span class="token function">buyMoreLlamas</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②指定多个catch子句。与抛出的对象类型匹配的第一个 catch 子句处理异常。如果 catch 子句未指定类型，则该子句可以处理任何类型的抛出对象：</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">breedMoreLlamas</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">on</span> <span class="token class-name">OutOfLlamasException</span> <span class="token punctuation">{</span>
  <span class="token comment">// A specific exception</span>
  <span class="token function">buyMoreLlamas</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">on</span> <span class="token class-name">Exception</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 处理指定Exception类型的错误</span>
  <span class="token comment">// Anything else that is an exception</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Unknown exception: </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">e</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//处理所有错误</span>
  <span class="token comment">// No specified type, handles all</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Something really unknown: </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">e</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③catch参数：可以指定一两个参数<code v-pre>catch()</code>。第一个是引发的异常，第二个是堆栈跟踪（对象<a href="https://api.dart.cn/stable/dart-core/StackTrace-class.html" target="_blank" rel="noopener noreferrer"><code v-pre>StackTrace</code><ExternalLinkIcon/></a>）。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token comment">// ···</span>
<span class="token punctuation">}</span> <span class="token keyword">on</span> <span class="token class-name">Exception</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Exception details:\n </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">e</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">,</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Exception details:\n </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">e</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Stack trace:\n </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">s</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④传播异常</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">misbehave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> foo <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span>foo<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Runtime error</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'misbehave() partially handled </span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression">e<span class="token punctuation">.</span>runtimeType</span><span class="token punctuation">}</span></span><span class="token string">.'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">rethrow</span><span class="token punctuation">;</span> <span class="token comment">// Allow callers to see the exception.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">misbehave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'main() finished handling </span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression">e<span class="token punctuation">.</span>runtimeType</span><span class="token punctuation">}</span></span><span class="token string">.'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑤<code v-pre>finally</code>同js</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">breedMoreLlamas</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
  <span class="token function">cleanLlamaStalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑥断言：在开发过程中，使用断言语句<code v-pre>assert(&lt;condition&gt;, &lt;optionalMessage&gt;);</code>——如果布尔条件为假，则中断正常执行。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token comment">// Make sure the variable has a non-null value.</span>
<span class="token keyword">assert</span><span class="token punctuation">(</span>text <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Make sure the value is less than 100.</span>
<span class="token keyword">assert</span><span class="token punctuation">(</span>number <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Make sure this is an https URL.</span>
<span class="token keyword">assert</span><span class="token punctuation">(</span>urlString<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'https'</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h3>
<p>Dart是一种面向对象的语言，具有类和基于混合的继承。每个对象都是一个类的实例，除了Null以外的所有类都是从object 继承而来的。基于混合的继承意味着，尽管每个类(除了顶级类<code v-pre>Object</code>)都只有一个超类，但类可以在多个类层次结构中重用。</p>
<h4 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h4>
<p>①普通构造函数:与类同名的构造函数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
    num x<span class="token punctuation">,</span>y<span class="token punctuation">;</span>
    <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">,</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'普通构造函数</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">x</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">y</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Test</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Test</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②命名构造函数：用<code v-pre>类名.</code>方式创建</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
    num x<span class="token punctuation">,</span>y<span class="token punctuation">;</span>
    <span class="token class-name">Test</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">,</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'命名构造函数</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">x</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">y</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Test</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Test</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③常量构造函数：如果类生成的对象不改变，可以通过常量构造函数使对象成为编译时常量，提高性能。（常量构造函数相当于单例）常量类有如下要求：</p>
<ul>
<li>所有属性必须用<code v-pre>final</code>声明</li>
<li>常量构造函数不能有函数体</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">ImmutableTest</span><span class="token punctuation">{</span>
  <span class="token keyword">final</span> num x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token class-name">ImmutableTest</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">,</span> required <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">ImmutableTest</span> immutableTest <span class="token operator">=</span> <span class="token keyword">const</span> <span class="token class-name">ImmutableTest</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ImmutableTest</span> immutableTest2 <span class="token operator">=</span> <span class="token keyword">const</span> <span class="token class-name">ImmutableTest</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>immutableTest <span class="token operator">==</span> immutableTest2<span class="token punctuation">)</span> <span class="token comment">//true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④工厂构造函数：通过关键字<code v-pre>factory</code>声明的构造函数，工厂构造函数有如下要求：</p>
<ul>
<li>构造函数内不能使用this</li>
<li>工厂构造函数无法进行实例化</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
  bool mute <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token class-name">Logger</span><span class="token operator">?</span> instance<span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Logger</span><span class="token punctuation">></span></span> _cache <span class="token operator">=</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Logger</span><span class="token punctuation">></span></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">factory</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> _cache<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">_internal</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">factory</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span>json<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">factory</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Logger</span><span class="token punctuation">.</span>instance <span class="token operator">?</span><span class="token operator">?</span><span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">_internal</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span>instance <span class="token operator">as</span> <span class="token class-name">Logger</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">_internal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mute<span class="token punctuation">)</span> <span class="token function">print</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'yu'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Logger</span> logger2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'yu'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>logger <span class="token operator">==</span> logger<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑤参数默认值,</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
  num width<span class="token punctuation">,</span> height<span class="token punctuation">;</span>
  <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>width<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>height<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>height</span><span class="token punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>width</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
   <span class="token comment">/*
    Testt({int this.height = 10, int this.width = 20}) {
    print('${this.height} ${this.width}');
  }

   */</span> 
<span class="token punctuation">}</span>
<span class="token class-name">Testt</span> test <span class="token operator">=</span>  <span class="token class-name">Testt</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span><span class="token number">20</span><span class="token punctuation">,</span>height<span class="token punctuation">:</span><span class="token number">70</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>width<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑥构造函数重定向，必须使用初始化列表的写法才能使用<code v-pre>Test():width=10,height=20{}</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Point{
	dobule x,y,z;
	Point(this.x,this.y,this.z);
	Point twoDimension(double x,double y):this(x,y,0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="访问修饰符" tabindex="-1"><a class="header-anchor" href="#访问修饰符" aria-hidden="true">#</a> 访问修饰符</h4>
<p>Dart与ts不同，没有<code v-pre>public, protected,private</code>修饰符,dart的属性修饰语法如下：</p>
<ul>
<li>以<code v-pre>_</code>下划线开头的属性为私有属性，并把类单独存为库才行。</li>
<li>默认属性和方法都是公共的</li>
</ul>
<h4 id="类访问器" tabindex="-1"><a class="header-anchor" href="#类访问器" aria-hidden="true">#</a> 类访问器</h4>
<p>①<code v-pre>get</code>,使用<code v-pre>get</code>声明的访问器不能带小括号<code v-pre>()</code>;<code v-pre>set</code>指定关键字即可</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
  num a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
  num <span class="token keyword">get</span> theNum <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">set</span> <span class="token function">setNum</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Testt</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Testt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>theNum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 123</span>
test<span class="token punctuation">.</span>setNum<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>theNum<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h4>
<p>同ts，使用<code v-pre>extends</code>关键词继承父类，继承后可使用公共的属性或方法，字类可以通过<code v-pre>@override</code>注解重写父类方法。</p>
<p>①继承父类构造函数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">Son</span><span class="token punctuation">(</span><span class="token class-name">String</span> job<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token keyword">super</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//继承命名构造函数</span>
<span class="token class-name">Son</span><span class="token punctuation">(</span><span class="token class-name">String</span> job<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">xxx</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="抽象类-接口" tabindex="-1"><a class="header-anchor" href="#抽象类-接口" aria-hidden="true">#</a> 抽象类=接口</h4>
<p>①语法要求如下：</p>
<ul>
<li>用<code v-pre>abstract</code>修饰</li>
<li>作用是充当普通类的模板，约定一些属性和方法，但是没有方法的具体实现</li>
<li>不能被实例化</li>
<li>普通类继承了抽象类，则必须实现抽象类的方法</li>
<li>接口实现抽象类则必须实现定义的所有属性和方法</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> <span class="token function">camera</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//摄像头</span>
    <span class="token keyword">var</span> <span class="token function">photos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//相册</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Apple</span> <span class="token keyword">extends</span> <span class="token class-name">Phone</span><span class="token punctuation">{</span>
    <span class="token metadata function">@override</span>
    <span class="token keyword">void</span> <span class="token function">camera</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'苹果相机'</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token metadata function">@override</span>
    <span class="token keyword">void</span> <span class="token function">photos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'苹果手机相册'</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②在Dart中接口就是抽象类,普通类可以实现多个接口</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> type<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Action</span><span class="token punctuation">{</span>
    <span class="token function">run</span><span class="token punctuation">(</span>num leg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">implements</span> <span class="token class-name">Animal</span><span class="token punctuation">,</span><span class="token class-name">Action</span><span class="token punctuation">{</span>
    <span class="token metadata function">@override</span>
    <span class="token class-name">String</span> type<span class="token punctuation">;</span>
    
    <span class="token metadata function">@override</span>
    <span class="token function">run</span><span class="token punctuation">(</span>num leg<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'用</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">leg</span></span><span class="token string">条腿跑'</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="混入" tabindex="-1"><a class="header-anchor" href="#混入" aria-hidden="true">#</a> 混入</h4>
<p>①混入是一段公共代码，其语法如下：</p>
<ul>
<li>作为混入的类只能继承自Object，不能继承其他类</li>
<li>作为混入的类不能有构造函数</li>
<li>使用关键字声明<code v-pre>minin</code>声明混入，用关键字<code v-pre>with</code>使用混入</li>
<li>使用多个混入时，如果有重名属性或方法，后者覆盖前者</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
	<span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'MixinA'</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Mixin</span> <span class="token class-name">B</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'Mixin B'</span></span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Myclass</span> <span class="token keyword">with</span> <span class="token class-name">A</span><span class="token punctuation">,</span><span class="token class-name">B</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Myclass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c<span class="token punctuation">.</span>name <span class="token comment">// 'Mixin B'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="extension扩展" tabindex="-1"><a class="header-anchor" href="#extension扩展" aria-hidden="true">#</a> extension扩展</h4>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">extension</span> <span class="token class-name">StringExtension</span> <span class="token keyword">on</span> <span class="token class-name">String</span><span class="token punctuation">{</span>
    <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> int<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token class-name">String</span> num <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'123'</span></span><span class="token punctuation">;</span>
    num<span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//扩展自定义类</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
<span class="token keyword">extension</span> <span class="token class-name">ExtClass</span> <span class="token keyword">on</span> <span class="token class-name">MyClass</span><span class="token punctuation">{</span>
    <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'这是一个扩展方法'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="call方法" tabindex="-1"><a class="header-anchor" href="#call方法" aria-hidden="true">#</a> call方法</h4>
<p>如果将实例对象当作方法调用，要在类中定义<code v-pre>call</code>方法。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">{</span>
    <span class="token function">call</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">name</span></span><span class="token string">'</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">t</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'yu'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nosuchmethod" tabindex="-1"><a class="header-anchor" href="#nosuchmethod" aria-hidden="true">#</a> noSuchMethod</h4>
<p>①当调用类中未声明的方法时，Dart会调用类中定义的noSuchMethod方法，且实例化对象时必须用<code v-pre>dynamic</code>修饰</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">{</span>
    <span class="token function">noSuchMethod</span><span class="token punctuation">(</span><span class="token class-name">Invocation</span> invocation<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">noSuchMethod</span><span class="token punctuation">(</span>invocation<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">dynamic</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">aaa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②作用：避免了运行时错误，并且可以自定义调用不存在方法的行为。</p>
<h4 id="hashcode" tabindex="-1"><a class="header-anchor" href="#hashcode" aria-hidden="true">#</a> hashCode</h4>
<p><code v-pre>hashCode</code>定义</p>
<ul>
<li>是Dart对象的唯一表示</li>
<li>表现为一串数字</li>
<li>每个对象都有一个<code v-pre>hashCode</code>（可以通过这点判断对象是否相等）</li>
</ul>
<h3 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h3>
<h4 id="泛型类型限制" tabindex="-1"><a class="header-anchor" href="#泛型类型限制" aria-hidden="true">#</a> 泛型类型限制</h4>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>
<span class="token keyword">class</span> <span class="token class-name">BaseClass</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">BaseClass</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span><span class="token string-literal"><span class="token string">"Instance of Foo&lt;</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression"><span class="token class-name">T</span></span></span><span class="token string">>"</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> myclass <span class="token operator">=</span> <span class="token class-name">MyClass</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BaseClass</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注解" tabindex="-1"><a class="header-anchor" href="#注解" aria-hidden="true">#</a> 注解</h3>
<p>在Dart中，注解是一种用于提供元数据的特殊语法。注解是以<code v-pre>@</code>符号开头，紧跟着注解名和参数（可选）。它们可以应用于类、方法、变量和参数等代码元素上。</p>
<p>所有 Dart 代码都可以使用三个注释： <code v-pre>@Deprecated</code>、<code v-pre>@deprecated</code>和<code v-pre>@override</code>。有关使用示例<code v-pre>@override</code>，请参阅<a href="https://dart.cn/language/extend" target="_blank" rel="noopener noreferrer">扩展类<ExternalLinkIcon/></a>。</p>
<h4 id="自定义注解" tabindex="-1"><a class="header-anchor" href="#自定义注解" aria-hidden="true">#</a> 自定义注解</h4>
<p>元数据以@开头，可以给代码标记一些额外的信息。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> who<span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> what<span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token class-name">Todo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>who<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>what<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token metadata function">@Todo</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Fancy——fish'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'Implement this function'</span></span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Do something'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="常见的三个注解" tabindex="-1"><a class="header-anchor" href="#常见的三个注解" aria-hidden="true">#</a> 常见的三个注解</h4>
<ul>
<li><code v-pre>@override</code>重写</li>
<li><code v-pre>@required</code>必填</li>
<li><code v-pre>@deprecated</code>弃用，表示此方法/类不建议再使用</li>
</ul>
<h3 id="模块化" tabindex="-1"><a class="header-anchor" href="#模块化" aria-hidden="true">#</a> 模块化</h3>
<h4 id="引入自定义库" tabindex="-1"><a class="header-anchor" href="#引入自定义库" aria-hidden="true">#</a> 引入自定义库</h4>
<p>①每个dart文件默认是一个库，知识没有用<code v-pre>library</code>显示声明。dart使用<code v-pre>_</code>下划线开头的标识符，表示库内访问可见（私有库）</p>
<p>②声明库要用下划线连接名称，flutter中驼峰会报警告。</p>
<p>③语法（<code v-pre>import '库的位置/库名称.dart'</code>）:如下。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token comment">// /My_Module/lib/MyModule.dart</span>
<span class="token keyword">library</span> <span class="token class-name">My_Module</span><span class="token punctuation">;</span> <span class="token comment">// 建议使用library my_module</span>

<span class="token keyword">class</span> <span class="token class-name">My_Module</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"My_Module"</span></span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'dart 模块化'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// My_Module/index.dart</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'./lib/MyModule.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">My_Module</span> mm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">My_Module</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  mm<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// dart 模块化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="引入部分库-按需加载" tabindex="-1"><a class="header-anchor" href="#引入部分库-按需加载" aria-hidden="true">#</a> 引入部分库（按需加载）</h5>
<p>①例如show 包含引入 可以理解为js中的<code v-pre>import { fn_show1, fn_show2} from './lib/MyModule.dart'</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'./lib/MyModule.dart'</span></span> <span class="token keyword">show</span> fn_show1<span class="token punctuation">,</span> fn_show2<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// My_Module/lib/My_Module.dart</span>
<span class="token keyword">library</span> my_module<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">My_Module</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"My_Module"</span></span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> num version <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'dart 模块化'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'show1方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②hide 排除引入。hide后的都无法使用，编译就会报错。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'./lib/MyModule.dart'</span></span> <span class="token keyword">hide</span> fn_show1<span class="token punctuation">,</span> fn_show2<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ×</span>
  <span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ×</span>
  <span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">fn_show3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// My_Module/lib/My_Module.dart</span>
<span class="token keyword">library</span> my_module<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">My_Module</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"My_Module"</span></span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> num version <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'dart 模块化'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'show1方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="库加别名" tabindex="-1"><a class="header-anchor" href="#库加别名" aria-hidden="true">#</a> 库加别名</h5>
<p>当引入多个库时，可能会存在冲突，为了防止这种情况可以给引入的库起别名，来避免冲突。类似于js中的<code v-pre>import my_module as a_module from './lib/MyModuleA.dart'</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'./lib/MyModuleA.dart'</span></span>  <span class="token operator">as</span> a_module<span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'./lib/MyModuleB.dart'</span></span>  <span class="token operator">as</span> b_module<span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a_module<span class="token punctuation">.</span><span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  a_module<span class="token punctuation">.</span><span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  b_module<span class="token punctuation">.</span><span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  b_module<span class="token punctuation">.</span><span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// My_Module/lib/My_ModuleA.dart</span>
<span class="token keyword">library</span> my_module<span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'A show1方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'A show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'A show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// My_Module/lib/My_ModuleB.dart</span>
<span class="token keyword">library</span> my_module<span class="token punctuation">;</span>


<span class="token keyword">void</span> <span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'B show1方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'B show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fn_show3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'B show2方式引入'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="延迟引入-懒加载" tabindex="-1"><a class="header-anchor" href="#延迟引入-懒加载" aria-hidden="true">#</a> 延迟引入（懒加载）</h5>
<p>①定义:就是对于一个库的引入，Dart只建立文件引用关系，并不会直接加载引用库的内容，直到使用<code v-pre>loadLibrary()</code>方法时才会返回该库的内容。</p>
<p>②语法：<code v-pre>defferred</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'./lib/MyModuleA.dart'</span></span> <span class="token keyword">deferred</span> <span class="token operator">as</span> a_module<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 	<span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token class-name">Future</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> a_module<span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    a_module<span class="token punctuation">.</span><span class="token function">fn_show1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="组装库" tabindex="-1"><a class="header-anchor" href="#组装库" aria-hidden="true">#</a> 组装库</h5>
<p><code v-pre>part</code></p>
<p><code v-pre>part of</code></p>
<p>当我们的库比较大，需要建立库之间的联系时使用</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token comment">// main.dart</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'Utils/index.dart'</span></span> <span class="token operator">as</span> utils<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name"><span class="token namespace">utils<span class="token punctuation">.</span></span>Utils</span> util <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">utils<span class="token punctuation">.</span></span>Utils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  util<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//也可直接调用子库</span>
  utils<span class="token punctuation">.</span><span class="token function">sub1_fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Utils/index.dart</span>
<span class="token keyword">library</span> utils<span class="token punctuation">;</span>

<span class="token keyword">part</span> <span class="token string-literal"><span class="token string">'sub1.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">part</span> <span class="token string-literal"><span class="token string">'sub2.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Utils</span> <span class="token punctuation">{</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">sub1_fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sub2_fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// Utils.sub1.dart</span>
<span class="token keyword">part</span> of utils<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">sub1_fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'sub1'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Utils.sub2.dart</span>
<span class="token keyword">part</span> of utils<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">sub2_fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'sub2'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="引入系统库" tabindex="-1"><a class="header-anchor" href="#引入系统库" aria-hidden="true">#</a> 引入系统库</h4>
<p>①Dart内置很多库，在引入时需要注意语法：（<code v-pre>import 'dart:库名'</code>）</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'dart:math'</span></span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>pi<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②Dart的核心库默认被引入(<code v-pre>import 'dart:core'</code>)</p>
<h5 id="核心系统库" tabindex="-1"><a class="header-anchor" href="#核心系统库" aria-hidden="true">#</a> 核心系统库</h5>
<p><a href="https://dart.cn/guides/libraries" target="_blank" rel="noopener noreferrer">文档地址：<ExternalLinkIcon/></a></p>
<h4 id="引入第三方库" tabindex="-1"><a class="header-anchor" href="#引入第三方库" aria-hidden="true">#</a> 引入第三方库</h4>
<p>①Dart有类似于npm的包管理库，里面都是第三方库。来源如下：</p>
<ul>
<li><code v-pre>https://pub.dev</code></li>
<li><code v-pre>https://pub.flutter-io.cn/packages</code></li>
<li><code v-pre>https://pub.dartlang.org/flutter</code></li>
</ul>
<p>②使用方式:</p>
<ol>
<li>先创建<code v-pre>pubspec.yaml</code>文件，相当于<code v-pre>package.json</code></li>
<li>在<code v-pre>pubspec.yaml</code>中声明依赖</li>
<li>然后命令行进入<code v-pre>pubspec.yaml</code>文件目录执行<code v-pre>pub get</code>安装依赖</li>
<li>引入<code v-pre>import 'package:'</code></li>
</ol>
<p>③第三方包的目录结构</p>
<p><img src="/Flutter/dir_example.png" alt=""></p>
<h3 id="dart异步编程" tabindex="-1"><a class="header-anchor" href="#dart异步编程" aria-hidden="true">#</a> Dart异步编程</h3>
<p>Dart默认采用单线程，使用事件轮询的方式。同JS一样拥有主线程，微任务和宏任务。</p>
<p>微任务：<code v-pre>scheduleMicrotask</code>中的回调</p>
<p>宏任务：事件，IO</p>
<p><img src="/Flutter/async.png" alt=""></p>
<h4 id="lsolate多线程类似于web-worker" tabindex="-1"><a class="header-anchor" href="#lsolate多线程类似于web-worker" aria-hidden="true">#</a> lsolate多线程类似于Web worker</h4>
<p>Dart中的线程以隔离的方式存在。</p>
<p>①为什么叫<code v-pre>isolate</code>呢？</p>
<p>在应用中，所有的 Dart 代码都在 <strong>isolate</strong> 中运行。每一个 Dart 的 isolate 都有独立的运行线程，它们无法与其他 isolate 共享可变对象。在需要进行通信的场景里，isolate 会使用消息机制。很多 Dart 应用都只使用一个 isolate，也就是 main isolate。你可以创建额外的 isolate 以便在多个处理器核心上执行并行代码。</p>
<p>②<code v-pre>Isolate</code>工作原理</p>
<p>现代的设备通常会使用多核 CPU。开发者为了让程序在设备上有更好的表现，有时会使用共享内容的线程来并发运行代码。然而，状态的共享可能会 <a href="https://baike.baidu.com/l/kex6qKvt" target="_blank" rel="noopener noreferrer">产生竞态条件，从而造成错误<ExternalLinkIcon/></a>，也可能会增加代码的复杂度。</p>
<p>Dart 代码并不在多个线程上运行，取而代之的是它们会在 isolate 内运行。每一个 isolate 会有自己的堆内存，从而确保 isolate 之间互相隔离，无法互相访问状态。由于这样的实现并不会共享状态，所以 <a href="https://baike.baidu.com/l/My2bXiba" target="_blank" rel="noopener noreferrer">互斥锁和其他锁<ExternalLinkIcon/></a> 以及 <a href="https://baike.baidu.com/item/%E7%AB%9E%E4%BA%89%E6%9D%A1%E4%BB%B6/10354815" target="_blank" rel="noopener noreferrer">竞争条件<ExternalLinkIcon/></a> 不会在 Dart 中出现。也就是说，isolate 并不能完全防止竞争条件。</p>
<p>在使用 isolate 时，你的 Dart 代码可以在同一时刻进行多个独立的任务，并且使用可用的处理器核心。 Isolate 与线程和进程近似，但是每个 isolate 都拥有独立的内存，以及运行事件循环的独立线程。</p>
<p>③Isolate的生命周期</p>
<p>每个 isolate 都是从运行 Dart 代码开始的，比如 <code v-pre>main()</code> 函数。执行的 Dart 代码可能会注册一些事件监听，例如处理用户操作或文件读写。当 isolate 执行的 Dart 代码结束后，如果它还需要处理已监听的事件，那么它依旧会继续被保持。处理完所有事件后，isolate 会退出。</p>
<p>④<code v-pre>worker Isolate</code></p>
<p>如果你的应用受到耗时计算的影响而出现卡顿，例如 <a href="https://flutter.cn/docs/cookbook/networking/background-parsing" target="_blank" rel="noopener noreferrer">解析较大的 JSON 文件<ExternalLinkIcon/></a>，你可以考虑将耗时计算转移到单独工作的 isolate，通常我们称这样的 isolate 为 <strong>后台运行对象</strong>。下图展示了一种常用场景，你可以生成一个 isolate，它将执行耗时计算的任务，并在结束后退出。这个 isolate 工作对象退出时会把结果返回。</p>
<p>每个 isolate 都可以通过消息通信传递一个对象，这个对象的所有内容都需要满足可传递的条件。并非所有的对象都满足传递条件，在无法满足条件时，消息发送会失败。举个例子，如果你想发送一个 <code v-pre>List&lt;Object&gt;</code>，你需要确保这个列表中所有元素都是可被传递的。假设这个列表中有一个 <code v-pre>Socket</code>，由于它无法被传递，所以你无法发送整个列表。</p>
<p>你可以查阅 <a href="https://api.dart.cn/stable/dart-isolate/SendPort/send.html" target="_blank" rel="noopener noreferrer"><code v-pre>send()</code> 方法<ExternalLinkIcon/></a> 的文档来确定哪些类型可以进行传递。</p>
<p>Isolate 工作对象可以进行 I/O 操作、设置定时器，以及其他各种行为。它会持有自己内存空间，与主 isolate 互相隔离。这个 isolate 在阻塞时也不会对其他 isolate 造成影响。</p>
<h5 id="多线程创建" tabindex="-1"><a class="header-anchor" href="#多线程创建" aria-hidden="true">#</a> 多线程创建</h5>
<p>①<code v-pre>Isolate.spawn</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'dart:isolate'</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token function">mutiIsolate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">mutiIsolate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'当前线程名称</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token class-name">Isolate</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>debugName</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程名称main</span>
  <span class="token class-name">Isolate</span><span class="token punctuation">.</span><span class="token function">spawn</span><span class="token punctuation">(</span>newIsolate<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'hello_isolate'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">newIsolate</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'当前线程名称</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token class-name">Isolate</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>debugName</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程名称newIsolate</span>
  <span class="token function">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②<code v-pre>Isolate.spawnUri</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">ReceiverPort</span> receiverPort <span class="token operator">=</span> <span class="token class-name">ReceiverPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SendPort</span> sendPort <span class="token operator">=</span> receiverPort<span class="token punctuation">.</span>sendPort<span class="token punctuation">;</span>
<span class="token class-name">Isolate</span> childIsolate <span class="token operator">=</span> <span class="token class-name">Isolate</span><span class="token punctuation">.</span><span class="token function">spawnUri</span><span class="token punctuation">(</span>
	<span class="token class-name">Uri</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span><span class="token string-literal"><span class="token string">'./childIsolate.dart'</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'data1'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'data2'</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    sendPort
<span class="token punctuation">)</span>
receiverPort<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'主线程收到消息</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">message</span></span><span class="token string">'</span></span><span class="token punctuation">)</span>
    childIsolate<span class="token punctuation">.</span><span class="token function">kill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//释放子线程</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//   ./childIsolate.dart</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">Object</span> args<span class="token punctuation">,</span><span class="token class-name">SendPort</span> sendPort<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'新线程的消息'</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="isolate线程通信" tabindex="-1"><a class="header-anchor" href="#isolate线程通信" aria-hidden="true">#</a> Isolate线程通信</h5>
<p>①单向通信</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'dart:isolate'</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token function">mutiIsolate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">mutiIsolate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'当前线程名称</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token class-name">Isolate</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>debugName</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程名称main</span>
  <span class="token class-name">ReceivePort</span> rp <span class="token operator">=</span> <span class="token class-name">ReceivePort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">SendPort</span> sp <span class="token operator">=</span> rp<span class="token punctuation">.</span>sendPort<span class="token punctuation">;</span>
  <span class="token class-name">Isolate</span><span class="token punctuation">.</span><span class="token function">spawn</span><span class="token punctuation">(</span>newIsolate<span class="token punctuation">,</span> sp <span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  rp<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">{</span>
      <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression">msg<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">来自新线程的消息'</span></span><span class="token punctuation">)</span>
      <span class="token comment">//可以通过rp.close()关闭</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">//新线程发送的消息</span>
   
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">newIsolate</span><span class="token punctuation">(</span><span class="token class-name">SendPort</span> sp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'当前线程名称</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token class-name">Isolate</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>debugName</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程名称newIsolate</span>
  sp<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'发送的信息给主线程'</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②双向通信:在新线程中也声明<code v-pre>ReceivePort</code>和<code v-pre>sendPort</code>，同样将<code v-pre>sendPort</code>发送给主<code v-pre>Isolate</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'dart:isolate'</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token function">mutiIsolate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">mutiIsolate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'当前线程名称</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token class-name">Isolate</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>debugName</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程名称main</span>
  <span class="token class-name">ReceivePort</span> rp <span class="token operator">=</span> <span class="token class-name">ReceivePort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">SendPort</span> sp <span class="token operator">=</span> rp<span class="token punctuation">.</span>sendPort<span class="token punctuation">;</span>
  <span class="token class-name">Isolate</span><span class="token punctuation">.</span><span class="token function">spawn</span><span class="token punctuation">(</span>newIsolate<span class="token punctuation">,</span> sp <span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token class-name">SendPort</span> nSP <span class="token operator">=</span> <span class="token keyword">await</span> rp<span class="token punctuation">.</span>first<span class="token punctuation">;</span><span class="token comment">// 新线程的发送者</span>
  nSP<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'来自主线程的消息'</span></span><span class="token punctuation">)</span>
  <span class="token comment">/*rp.listen((msg)=>{
      print('${msg.toString()}来自新线程的消息')
      //可以通过rp.close()关闭
  }) //新线程发送的消息*/</span>
   
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">newIsolate</span><span class="token punctuation">(</span><span class="token class-name">SendPort</span> sp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'当前线程名称</span><span class="token interpolation"><span class="token punctuation">${</span><span class="token expression"><span class="token class-name">Isolate</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>debugName</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程名称newIsolate</span>
  <span class="token class-name">ReceivePort</span> nRp <span class="token operator">=</span> <span class="token class-name">ReceivePort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">SendPort</span> nSp <span class="token operator">=</span> nRp<span class="token punctuation">.</span>sendPort<span class="token punctuation">;</span>
  sp<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>nSp<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/Flutter/Isolate_talk.png" alt=""></p>
<h4 id="future" tabindex="-1"><a class="header-anchor" href="#future" aria-hidden="true">#</a> Future</h4>
<p>这里的Future=Promise，基本类似。</p>
<p>①Future有三种状态</p>
<ul>
<li>未完成</li>
<li>已完成，并返回数据</li>
<li>已完成，返回错误</li>
</ul>
<p>②Future的实例。</p>
<ul>
<li>系统方法调用返回。如http</li>
<li>手动创建<code v-pre>final myFuture = Future(()=&gt;{return 123})</code></li>
</ul>
<p>③Future相关常用方法</p>
<ul>
<li>then</li>
<li>catchError:捕获Future回调中的错误</li>
<li>whenComplete：相当于finally，无论成功还是错误都会执行</li>
<li>delayed：指定延迟时间<code v-pre>Future.delayed(Duration(seconds:2),(){return 123;})</code></li>
</ul>
<p>④Future执行顺序：默认Future是宏任务，不会丢到事件队列中。我们可以执行Future身上的方法控制执行时机。</p>
<ul>
<li><code v-pre>Future()</code>宏任务</li>
<li><code v-pre>Future.sync()</code>同步任务</li>
<li><code v-pre>Future.microtask()</code>微任务</li>
<li><code v-pre>Future.value(val)</code>，val类型不同，执行时机不同。1.val常量，微任务。 2.val如果本身就是异步任务，那根据val异步逻辑处理。</li>
</ul>
<p>⑤Future多任务：这里多任务和JS中的<code v-pre>Promise.all</code>,<code v-pre>Promise.race</code>类似</p>
<ul>
<li><code v-pre>Future.any</code> = <code v-pre>Promise.race</code>,返回最先完成的Future结果</li>
<li><code v-pre>Future.wait</code> = <code v-pre>Promise.all</code>，等所有Future完成，收集所有Future结果并返回</li>
<li><code v-pre>Future.doWhile(action)</code>按照条件执行多个Future</li>
<li><code v-pre>Future.forEach</code>遍历可迭代的集合</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">getInfo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getInfo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// info2</span>
  <span class="token keyword">final</span> res2 <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">getInfo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getInfo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>res2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// [info1, info2]</span>
    
  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Future</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span><span class="token punctuation">></span></span> futureList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token function">getInfo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getInfo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">doWhile</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
     <span class="token comment">/* 
     	info1
		info2
	*/</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> futureList<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> futureList<span class="token punctuation">[</span>i<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catchError</span><span class="token punctuation">(</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
    <span class="token comment">// Future.forEach</span>
  <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>element<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//每隔1秒分别输出 2   4   6</span>
    <span class="token keyword">return</span> <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">delayed</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> element <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getInfo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">delayed</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">'info1'</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getInfo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token class-name">Future</span><span class="token punctuation">.</span><span class="token function">delayed</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">'info2'</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="stream" tabindex="-1"><a class="header-anchor" href="#stream" aria-hidden="true">#</a> Stream</h4>
<p>①Stream是异步数据流，可以连续不断的返回多个数据，不同于Future只能返回一个值，Stream可与返回多个值。当需要从流中获取数据时一般有两个操作如下：</p>
<ul>
<li><code v-pre>await for</code> 有时，可以使用异步 for 循环 <code v-pre>await for</code> ，来替代 Stream API 。</li>
<li>使用stream API</li>
</ul>
<p><code v-pre>await for</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">await</span> <span class="token keyword">for</span> <span class="token punctuation">(</span>varOrType identifier <span class="token keyword">in</span> expression<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// expression必须是个stream类型</span>
  <span class="token comment">// Executes each time the stream emits a value.</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">await</span> <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">final</span> request <span class="token keyword">in</span> requestServer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handleRequest</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②Stream类型</p>
<ul>
<li>Single-Subscription单一订阅，即数据流只能被监听一次，否则会报错</li>
<li>Broadcast广播数据流，数据流可以被监听多次</li>
</ul>
<p>③创建Stream</p>
<p>单一订阅的数据流</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'dart:async'</span></span><span class="token punctuation">;</span>

<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">StreamController</span> controller <span class="token operator">=</span> <span class="token class-name">StreamController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller<span class="token punctuation">.</span>stream<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'监听的数据</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">event</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//监听的数据：123   监听的数据：456</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller<span class="token punctuation">.</span>sink<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'：123'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller<span class="token punctuation">.</span>sink<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'：456'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/*
  多个监听会报错
  controller.stream.listen((event) {
    print('监听的数据$event'); //监听的数据：123   监听的数据：456
  });
  Unhandled exception:
	Bad state: Stream has already been listened to.
  */</span>  
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建广播流</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>  <span class="token keyword">final</span> <span class="token class-name">StreamController</span> controller2 <span class="token operator">=</span> <span class="token class-name">StreamController</span><span class="token punctuation">.</span><span class="token function">broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller2<span class="token punctuation">.</span>stream<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'监听的数据</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">event</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller2<span class="token punctuation">.</span>stream<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'监听的数据</span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">event</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller2<span class="token punctuation">.</span>sink<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'来自广播流的：123'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  controller2<span class="token punctuation">.</span>sink<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'来自广播流的：123'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 监听的数据来自广播流的：123</span>
<span class="token comment">// 监听的数据来自广播流的：123</span>
<span class="token comment">// 监听的数据来自广播流的：123</span>
<span class="token comment">// 监听的数据来自广播流的：123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④Stream类的一些方法</p>
<ul>
<li><code v-pre>Stream.fromFuture().listen((event)=&gt;{}).onDone(()=&gt;{})</code></li>
<li><code v-pre>Stream.fromFutures().listen((event)=&gt;{}).onDone(()=&gt;{})</code></li>
<li><code v-pre>Stream.fromIterable().listen((event)=&gt;{}).onDone(()=&gt;{})</code></li>
<li><code v-pre>Stream.periodic(Duration,(){}).listen((event)=&gt;{}).onDone(()=&gt;{})</code>这个方法相当于js的<code v-pre>setInteval</code>。通过<code v-pre>Stream.take(num).periodic</code>中的num指定</li>
</ul>
<h4 id="async-await" tabindex="-1"><a class="header-anchor" href="#async-await" aria-hidden="true">#</a> Async await</h4>
<p>基本等同于js中的async await</p>
<h4 id="generator" tabindex="-1"><a class="header-anchor" href="#generator" aria-hidden="true">#</a> Generator</h4>
<p>类似js的生成器，但也有不同</p>
<p>①同步生成器<code v-pre>sync*</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token function">getUser</span><span class="token punctuation">(</span>int n<span class="token punctuation">)</span><span class="token keyword">sync*</span><span class="token punctuation">{</span>
    int i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">yield</span> i<span class="token operator">++</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span>iterator<span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">moveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
    res<span class="token punctuation">.</span>current<span class="token punctuation">;</span><span class="token comment">// 获取当前值</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②异步生成器<code v-pre>async* + yield</code>,异步生成器返回的是Stream对象</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token function">getUser</span><span class="token punctuation">(</span>int n<span class="token punctuation">)</span><span class="token keyword">async*</span><span class="token punctuation">{</span>
    int i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">yield</span> i<span class="token operator">++</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> stream <span class="token operator">=</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span>iterator<span class="token punctuation">;</span>
    stream<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onDone</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'完毕'</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③递归生成器<code v-pre>yield*</code></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">Interable</span><span class="token generics"><span class="token punctuation">&lt;</span>int<span class="token punctuation">></span></span> <span class="token function">getRange</span><span class="token punctuation">(</span>int left<span class="token punctuation">,</span>int right<span class="token punctuation">)</span><span class="token keyword">sync*</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token operator">&lt;=</span>right<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">yield</span> left<span class="token punctuation">;</span> 
        <span class="token keyword">yield*</span><span class="token function">getRange</span><span class="token punctuation">(</span><span class="token operator">++</span>left<span class="token punctuation">,</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组件widget" tabindex="-1"><a class="header-anchor" href="#组件widget" aria-hidden="true">#</a> 组件Widget</h2>
<p>我们知道在Flutter中几乎所有的对象都是一个 widget 。与原生开发中“控件”不同的是，Flutter 中的 widget 的概念更广泛，它不仅可以表示UI元素，也可以表示一些功能性的组件如：用于手势检测的 <code v-pre>GestureDetector</code> 、用于APP主题数据传递的 <code v-pre>Theme</code> 等等，而原生开发中的控件通常只是指UI元素。在后面的内容中，我们在描述UI元素时可能会用到“控件”、“组件”这样的概念。由于 Flutter 主要就是用于构建用户界面的，所以，在大多数时候，可以认为 widget 就是一个控件。</p>
<p>Flutter 中是通过 Widget 嵌套 Widget 的方式来构建UI和进行事件处理的，所以记住，Flutter 中万物皆为Widget。</p>
<p><img src="/Flutter/widget.png" alt=""></p>
<p>MaterialApp封装了应用程序实现Material Design需要的组件</p>
<p>Scaffold MaterialDesign布局的基本实现</p>
<p>Appbar Material Design应用程序</p>
<h2 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h2>
<h3 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h3>
<p>①分类：</p>
<ul>
<li><code v-pre>initState</code>当 widget 第一次插入到 widget 树时会被调用，对于每一个State对象，Flutter 框架只会调用一次该回调，所以，通常在该回调中做一些一次性的操作，如状态初始化、订阅子树的事件通知等。</li>
<li><code v-pre>didChangeDependencies:</code>在调用<code v-pre>initState()</code>之后。在调用<code v-pre>didUpdateWidget()</code>之后。在调用<code v-pre>setState()</code>之后。在调用<code v-pre>didChangeDependencies()</code>之后。在State对象从树中一个位置移除后（会调用deactivate）又重新插入到树的其他位置之后。</li>
<li><code v-pre>build</code>当构建组件树时调用，State对象被移除或重新插入其他位置时调用。</li>
<li><code v-pre>reassemble()</code>：在 widget 重新构建时，Flutter 框架会调用<code v-pre>widget.canUpdate</code>来检测 widget 树中同一位置的新旧节点，然后决定是否需要更新，如果<code v-pre>widget.canUpdate</code>返回<code v-pre>true</code>则会调用此回调。正如之前所述，<code v-pre>widget.canUpdate</code>会在新旧 widget 的 <code v-pre>key</code> 和 <code v-pre>runtimeType</code> 同时相等时会返回true，也就是说在在新旧 widget 的key和runtimeType同时相等时<code v-pre>didUpdateWidget()</code>就会被调用。</li>
<li><code v-pre>didUpdateWidget</code>,当state发生变化组件需要更新时调用。</li>
<li><code v-pre>deactivate</code>当 State 对象从树中被移除时，会调用此回调。在一些场景下，Flutter 框架会将 State 对象重新插到树中，如包含此 State 对象的子树在树的一个位置移动到另一个位置时（可以通过GlobalKey 来实现）。如果移除后没有重新插入到树中则紧接着会调用<code v-pre>dispose()</code>方法。</li>
<li><code v-pre>dispose</code>当 State 对象从树中被永久移除时调用；通常在此回调中释放资源。</li>
</ul>
<p><img src="/Flutter/life.jpg" alt=""></p>
<h3 id="在-widget-树中获取state对象" tabindex="-1"><a class="header-anchor" href="#在-widget-树中获取state对象" aria-hidden="true">#</a> 在 widget 树中获取State对象</h3>
<p>由于 StatefulWidget 的具体逻辑都在其 State 中，所以很多时候，我们需要获取 StatefulWidget 对应的State 对象来调用一些方法，比如<code v-pre>Scaffold</code>组件对应的状态类<code v-pre>ScaffoldState</code>中就定义了打开 SnackBar（路由页底部提示条）的方法。我们有两种方法在子 widget 树中获取父级 StatefulWidget 的State 对象。</p>
<h4 id="通过上下文对象context" tabindex="-1"><a class="header-anchor" href="#通过上下文对象context" aria-hidden="true">#</a> 通过上下文对象context</h4>
<p>在 Flutter 开发中便有了一个默认的约定：<u>如果 StatefulWidget 的状态是希望暴露出的，应当在 StatefulWidget 中提供一个<code v-pre>of</code> 静态方法来获取其 State 对象</u>，开发者便可直接通过该方法来获取；如果 State不希望暴露，则不提供<code v-pre>of</code>方法。</p>
<p><code v-pre>context</code>对象有一个<code v-pre>findAncestorStateOfType()</code>方法，该方法可以从当前节点沿着 widget 树向上查找指定类型的 StatefulWidget 对应的 State 对象。下面是实现打开 SnackBar 的示例：</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">GetStateObjectRoute</span> <span class="token keyword">extends</span> <span class="token class-name">StatefulWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">GetStateObjectRoute</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">Key</span><span class="token operator">?</span> key<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GetStateObjectRoute</span><span class="token punctuation">></span></span> <span class="token function">createState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token function">_GetStateObjectRouteState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> _GetStateObjectRouteState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GetStateObjectRoute</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
      appBar<span class="token punctuation">:</span> <span class="token class-name">AppBar</span><span class="token punctuation">(</span>
        title<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"子树中获取State对象"</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      body<span class="token punctuation">:</span> <span class="token class-name">Center</span><span class="token punctuation">(</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Column</span><span class="token punctuation">(</span>
          children<span class="token punctuation">:</span> <span class="token punctuation">[</span>
            <span class="token class-name">Builder</span><span class="token punctuation">(</span>builder<span class="token punctuation">:</span> <span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token class-name">ElevatedButton</span><span class="token punctuation">(</span>
                onPressed<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 查找父级最近的Scaffold对应的ScaffoldState对象</span>
                  <span class="token class-name">ScaffoldState</span> _state <span class="token operator">=</span> context<span class="token punctuation">.</span>findAncestorStateOfType<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ScaffoldState</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">;</span>
                  <span class="token comment">// 打开抽屉菜单</span>
                  _state<span class="token punctuation">.</span><span class="token function">openDrawer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                child<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'打开抽屉菜单1'</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      drawer<span class="token punctuation">:</span> <span class="token class-name">Drawer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过globalkey" tabindex="-1"><a class="header-anchor" href="#通过globalkey" aria-hidden="true">#</a> 通过GlobalKey</h4>
<p>①给目标<code v-pre>StatefulWidget</code>添加<code v-pre>GlobalKey</code>。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token comment">//定义一个globalKey, 由于GlobalKey要保持全局唯一性，我们使用静态变量存储</span>
<span class="token keyword">static</span> <span class="token class-name">GlobalKey</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ScaffoldState</span><span class="token punctuation">></span></span> _globalKey<span class="token operator">=</span> <span class="token class-name">GlobalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
    key<span class="token punctuation">:</span> _globalKey <span class="token punctuation">,</span> <span class="token comment">//设置key</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②通过<code v-pre>GlobalKey</code>来获取<code v-pre>State</code>对象<code v-pre>_globalKey.currentState.openDrawer()</code></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>使用 GlobalKey 开销较大，如果有其他可选方案，应尽量避免使用它。另外，同一个 GlobalKey 在整个 widget 树中必须是唯一的，不能重复</p>
</div>
<h2 id="flutter状态管理" tabindex="-1"><a class="header-anchor" href="#flutter状态管理" aria-hidden="true">#</a> Flutter状态管理</h2>
<p>以下是Flutter管理状态的最常见的方法：</p>
<ul>
<li>Widget 管理自己的状态。</li>
<li>Widget 管理子 Widget 状态。</li>
<li>混合管理（父 Widget 和子 Widget 都管理状态）。</li>
</ul>
<p>如何决定使用哪种管理方法？下面是官方给出的一些原则可以帮助你做决定：</p>
<ul>
<li>如果状态是用户数据，如复选框的选中状态、滑块的位置，则该状态最好由父 Widget 管理。</li>
<li>如果状态是有关界面外观效果的，例如颜色、动画，那么状态最好由 Widget 本身来管理。</li>
<li>如果某一个状态是不同 Widget 共享的则最好由它们共同的父 Widget 管理。</li>
</ul>
<h3 id="自身的状态管理" tabindex="-1"><a class="header-anchor" href="#自身的状态管理" aria-hidden="true">#</a> 自身的状态管理</h3>
<p>实现一个TapboxA，在它对应的_TapboxAState 类:</p>
<ul>
<li>管理TapboxA的状态。</li>
<li>定义<code v-pre>_active</code>：确定盒子的当前颜色的布尔值。</li>
<li>定义<code v-pre>_handleTap()</code>函数，该函数在点击该盒子时更新<code v-pre>_active</code>，并调用<code v-pre>setState()</code>更新UI。</li>
<li>实现widget的所有交互式行为。</li>
</ul>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token comment">//------------------------- TapboxA ----------------------------------</span>

<span class="token keyword">class</span> <span class="token class-name">TapboxA</span> <span class="token keyword">extends</span> <span class="token class-name">StatefulWidget</span> <span class="token punctuation">{</span>
  <span class="token class-name">TapboxA</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">Key</span><span class="token operator">?</span> key<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  _TapboxAState <span class="token function">createState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token function">_TapboxAState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> _TapboxAState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TapboxA</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
  bool _active <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">_handleTap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      _active <span class="token operator">=</span> <span class="token operator">!</span>_active<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">GestureDetector</span><span class="token punctuation">(</span>
      onTap<span class="token punctuation">:</span> _handleTap<span class="token punctuation">,</span>
      child<span class="token punctuation">:</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Center</span><span class="token punctuation">(</span>
          child<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>
            _active <span class="token operator">?</span> <span class="token string-literal"><span class="token string">'Active'</span></span> <span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'Inactive'</span></span><span class="token punctuation">,</span>
            style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>fontSize<span class="token punctuation">:</span> <span class="token number">32.0</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        width<span class="token punctuation">:</span> <span class="token number">200.0</span><span class="token punctuation">,</span>
        height<span class="token punctuation">:</span> <span class="token number">200.0</span><span class="token punctuation">,</span>
        decoration<span class="token punctuation">:</span> <span class="token class-name">BoxDecoration</span><span class="token punctuation">(</span>
          color<span class="token punctuation">:</span> _active <span class="token operator">?</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>lightGreen<span class="token punctuation">[</span><span class="token number">700</span><span class="token punctuation">]</span> <span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>grey<span class="token punctuation">[</span><span class="token number">600</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="父-》子" tabindex="-1"><a class="header-anchor" href="#父-》子" aria-hidden="true">#</a> 父-》子</h3>
<p>类似于vue，react中props</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token comment">// ParentWidget 为 TapboxB 管理状态.</span>

<span class="token comment">//------------------------ ParentWidget --------------------------------</span>

<span class="token keyword">class</span> <span class="token class-name">ParentWidget</span> <span class="token keyword">extends</span> <span class="token class-name">StatefulWidget</span> <span class="token punctuation">{</span>
  <span class="token metadata function">@override</span>
  _ParentWidgetState <span class="token function">createState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token function">_ParentWidgetState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> _ParentWidgetState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ParentWidget</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
  bool _active <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">_handleTapboxChanged</span><span class="token punctuation">(</span>bool newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      _active <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
      child<span class="token punctuation">:</span> <span class="token class-name">TapboxB</span><span class="token punctuation">(</span>
        active<span class="token punctuation">:</span> _active<span class="token punctuation">,</span>
        onChanged<span class="token punctuation">:</span> _handleTapboxChanged<span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//------------------------- TapboxB ----------------------------------</span>

<span class="token keyword">class</span> <span class="token class-name">TapboxB</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token class-name">TapboxB</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">Key</span><span class="token operator">?</span> key<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> required <span class="token keyword">this</span><span class="token punctuation">.</span>onChanged<span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">final</span> bool active<span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">ValueChanged</span><span class="token generics"><span class="token punctuation">&lt;</span>bool<span class="token punctuation">></span></span> onChanged<span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">_handleTap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">onChanged</span><span class="token punctuation">(</span><span class="token operator">!</span>active<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">GestureDetector</span><span class="token punctuation">(</span>
      onTap<span class="token punctuation">:</span> _handleTap<span class="token punctuation">,</span>
      child<span class="token punctuation">:</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Center</span><span class="token punctuation">(</span>
          child<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>
            active <span class="token operator">?</span> <span class="token string-literal"><span class="token string">'Active'</span></span> <span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'Inactive'</span></span><span class="token punctuation">,</span>
            style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>fontSize<span class="token punctuation">:</span> <span class="token number">32.0</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        width<span class="token punctuation">:</span> <span class="token number">200.0</span><span class="token punctuation">,</span>
        height<span class="token punctuation">:</span> <span class="token number">200.0</span><span class="token punctuation">,</span>
        decoration<span class="token punctuation">:</span> <span class="token class-name">BoxDecoration</span><span class="token punctuation">(</span>
          color<span class="token punctuation">:</span> active <span class="token operator">?</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>lightGreen<span class="token punctuation">[</span><span class="token number">700</span><span class="token punctuation">]</span> <span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>grey<span class="token punctuation">[</span><span class="token number">600</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局状态管理" tabindex="-1"><a class="header-anchor" href="#全局状态管理" aria-hidden="true">#</a> 全局状态管理</h3>
<p>.</p>
<h2 id="flutter路由" tabindex="-1"><a class="header-anchor" href="#flutter路由" aria-hidden="true">#</a> Flutter路由</h2>
<h3 id="_1-配置路由表" tabindex="-1"><a class="header-anchor" href="#_1-配置路由表" aria-hidden="true">#</a> 1.配置路由表</h3>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter/material.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/pages/home/index.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/pages/login/index.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/pages/notFound/index.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/pages/profile/index.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">ConstantRoutes</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token class-name">String</span> profilePath <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'/profile'</span></span><span class="token punctuation">;</span>

  <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">WidgetBuilder</span><span class="token punctuation">></span></span> routes <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-literal"><span class="token string">'/profile'</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">const</span> <span class="token class-name">Profile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string-literal"><span class="token string">'/login'</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">const</span> <span class="token class-name">Login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string-literal"><span class="token string">'/'</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">const</span> <span class="token class-name">Home</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string-literal"><span class="token string">'/404'</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">const</span> <span class="token class-name">NotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getRoutePath</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token class-name">String</span> path<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> routes<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">?</span> path <span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'/404'</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-载入路由" tabindex="-1"><a class="header-anchor" href="#_2-载入路由" aria-hidden="true">#</a> 2.载入路由</h3>
<p>在main.dart中</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter/material.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/pages/home/index.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/router/index.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// This widget is the root of your application.</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>  <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      routes<span class="token punctuation">:</span> <span class="token class-name">ConstantRoutes</span><span class="token punctuation">.</span>routes<span class="token punctuation">,</span>
      debugShowCheckedModeBanner<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">//关闭debugger显示</span>
      initialRoute<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'/'</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter/material.dart'</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:flutter_learn/app.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">runApp</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="路由导航" tabindex="-1"><a class="header-anchor" href="#路由导航" aria-hidden="true">#</a> 路由导航</h3>
<ol>
<li>用 Navigator.push() 跳转到第二个路由</li>
<li>用 Navigator.pop() 回退到第一个路由</li>
</ol>
<h3 id="路由参数" tabindex="-1"><a class="header-anchor" href="#路由参数" aria-hidden="true">#</a> 路由参数</h3>
<p>①使用 RouteSettings 传递，提取参数</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token class-name">Todo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">runApp</span><span class="token punctuation">(</span>
    <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'Passing Data'</span></span><span class="token punctuation">,</span>
      home<span class="token punctuation">:</span> <span class="token class-name">TodosScreen</span><span class="token punctuation">(</span>
        todos<span class="token punctuation">:</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span>
          <span class="token number">20</span><span class="token punctuation">,</span>
          <span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token class-name">Todo</span><span class="token punctuation">(</span>
            <span class="token string-literal"><span class="token string">'Todo </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">i</span></span><span class="token string">'</span></span><span class="token punctuation">,</span>
            <span class="token string-literal"><span class="token string">'A description of what needs to be done for Todo </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">i</span></span><span class="token string">'</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//传递参数</span>
 <span class="token class-name">Navigator</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
          context<span class="token punctuation">,</span>
          <span class="token class-name">MaterialPageRoute</span><span class="token punctuation">(</span>
            builder<span class="token punctuation">:</span> <span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">const</span> <span class="token class-name">DetailScreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//这里也可以构造函数中传递参数</span>
            settings<span class="token punctuation">:</span> <span class="token class-name">RouteSettings</span><span class="token punctuation">(</span>
              arguments<span class="token punctuation">:</span> todos<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//接收参数</span>
<span class="token keyword">class</span> <span class="token class-name">DetailScreen</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">DetailScreen</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> todo <span class="token operator">=</span> <span class="token class-name">ModalRoute</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">.</span>settings<span class="token punctuation">.</span>arguments <span class="token operator">as</span> <span class="token class-name">Todo</span><span class="token punctuation">;</span>

    <span class="token comment">// Use the Todo to create the UI.</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
      appBar<span class="token punctuation">:</span> <span class="token class-name">AppBar</span><span class="token punctuation">(</span>
        title<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>todo<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      body<span class="token punctuation">:</span> <span class="token class-name">Padding</span><span class="token punctuation">(</span>
        padding<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">EdgeInsets</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>todo<span class="token punctuation">.</span>description<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②使用 <a href="https://api.flutter-io.cn/flutter/widgets/Navigator/pop.html" target="_blank" rel="noopener noreferrer"><code v-pre>Navigator.pop()</code><ExternalLinkIcon/></a> 回退界面并返回数据给主屏界面。 <code v-pre>Navigator.pop()</code> 方法可以接受第二个参数 <code v-pre>result</code>，它是可选的，如果传递了 <code v-pre>result</code>，数据将会通过 <code v-pre>Future</code> 方法的返回值传递。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token class-name">ElevatedButton</span><span class="token punctuation">(</span>
  onPressed<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Navigator</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'Yep!'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  child<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'Yep!'</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="flutter发起请求" tabindex="-1"><a class="header-anchor" href="#flutter发起请求" aria-hidden="true">#</a> Flutter发起请求</h2>
<p><a href="https://pub.dev/packages/dio" target="_blank" rel="noopener noreferrer">dio文档<ExternalLinkIcon/></a></p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">'package:dio/dio.dart'</span></span><span class="token punctuation">;</span>

<span class="token keyword">final</span> dio <span class="token operator">=</span> <span class="token class-name">Dio</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">getHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> response <span class="token operator">=</span> <span class="token keyword">await</span> dio<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'https://dart.dev'</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>①创建实例并配置默认项</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code><span class="token keyword">final</span> dio <span class="token operator">=</span> <span class="token class-name">Dio</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// With default `Options`.</span>

<span class="token keyword">void</span> <span class="token function">configureDio</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Set default configs</span>
  dio<span class="token punctuation">.</span>options<span class="token punctuation">.</span>baseUrl <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'https://api.pub.dev'</span></span><span class="token punctuation">;</span>
  dio<span class="token punctuation">.</span>options<span class="token punctuation">.</span>connectTimeout <span class="token operator">=</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  dio<span class="token punctuation">.</span>options<span class="token punctuation">.</span>receiveTimeout <span class="token operator">=</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Or create `Dio` with a `BaseOptions` instance.</span>
  <span class="token keyword">final</span> options <span class="token operator">=</span> <span class="token class-name">BaseOptions</span><span class="token punctuation">(</span>
    baseUrl<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">'https://api.pub.dev'</span></span><span class="token punctuation">,</span>
    connectTimeout<span class="token punctuation">:</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    receiveTimeout<span class="token punctuation">:</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>seconds<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> anotherDio <span class="token operator">=</span> <span class="token class-name">Dio</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②拦截器:对于每个 dio 实例，我们可以添加一个或多个拦截器，通过这些拦截器，我们可以在请求、响应和错误被或处理之前拦截它们<code v-pre>catchError</code>。</p>
<div class="language-dart line-numbers-mode" data-ext="dart"><pre v-pre class="language-dart"><code>dio<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
  <span class="token class-name">InterceptorsWrapper</span><span class="token punctuation">(</span>
    onRequest<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">RequestOptions</span> options<span class="token punctuation">,</span> <span class="token class-name">RequestInterceptorHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Do something before request is sent.</span>
      <span class="token comment">// If you want to resolve the request with custom data,</span>
      <span class="token comment">// you can resolve a `Response` using `handler.resolve(response)`.</span>
      <span class="token comment">// If you want to reject the request with a error message,</span>
      <span class="token comment">// you can reject with a `DioException` using `handler.reject(dioError)`.</span>
      <span class="token keyword">return</span> handler<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    onResponse<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">Response</span> response<span class="token punctuation">,</span> <span class="token class-name">ResponseInterceptorHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Do something with response data.</span>
      <span class="token comment">// If you want to reject the request with a error message,</span>
      <span class="token comment">// you can reject a `DioException` object using `handler.reject(dioError)`.</span>
      <span class="token keyword">return</span> handler<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    onError<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">DioException</span> e<span class="token punctuation">,</span> <span class="token class-name">ErrorInterceptorHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Do something with response error.</span>
      <span class="token comment">// If you want to resolve the request with some custom data,</span>
      <span class="token comment">// you can resolve a `Response` object using `handler.resolve(response)`.</span>
      <span class="token keyword">return</span> handler<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="futter遇到的问题" tabindex="-1"><a class="header-anchor" href="#futter遇到的问题" aria-hidden="true">#</a> Futter遇到的问题</h2>
<h3 id="虚拟机调试" tabindex="-1"><a class="header-anchor" href="#虚拟机调试" aria-hidden="true">#</a> 虚拟机调试</h3>
<p>vscode如何调试虚拟机呢？</p>
<p>测试安卓能否构建成功cd到android目录执行<code v-pre>./gradlew clean</code></p>
<ol>
<li>
<p><a href="https://en.bignox.com/" target="_blank" rel="noopener noreferrer">安装模拟器<ExternalLinkIcon/></a></p>
</li>
<li>
<p>用终端打开nox模拟器的bin目录并输入<code v-pre>nox_adb.exe connect 127.0.0.1:62001</code></p>
<p><img src="/Flutter/debugger.png" alt=""></p>
</li>
<li>
<p>更改<code v-pre>android/build.gradle</code>文件中的<code v-pre>repositories</code>内容，如下</p>
<div class="language-gradle line-numbers-mode" data-ext="gradle"><pre v-pre class="language-gradle"><code>buildscript <span class="token punctuation">{</span>
    ext<span class="token punctuation">.</span>kotlin_version <span class="token operator">=</span> <span class="token string">'1.7.10'</span>
    <span class="token keyword">repositories</span> <span class="token punctuation">{</span>
        <span class="token comment">// google()</span>
        <span class="token comment">// mavenCentral()</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/google'</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/jcenter'</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/nexus/content/groups/public'</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/gradle-plugin/'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">dependencies</span> <span class="token punctuation">{</span>
        classpath <span class="token string">'com.android.tools.build:gradle:7.3.0'</span>
        classpath <span class="token interpolation-string"><span class="token string">"org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">"</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

allprojects <span class="token punctuation">{</span>
    <span class="token keyword">repositories</span> <span class="token punctuation">{</span>
        <span class="token comment">// google()</span>
        <span class="token comment">// mavenCentral()</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/google'</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/jcenter'</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/nexus/content/groups/public'</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/gradle-plugin/'</span> <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

rootProject<span class="token punctuation">.</span>buildDir <span class="token operator">=</span> <span class="token string">'../build'</span>
subprojects <span class="token punctuation">{</span>
    <span class="token keyword">project</span><span class="token punctuation">.</span>buildDir <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">rootProject<span class="token punctuation">.</span>buildDir</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression"><span class="token keyword">project</span><span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span>
<span class="token punctuation">}</span>
subprojects <span class="token punctuation">{</span>
    <span class="token keyword">project</span><span class="token punctuation">.</span><span class="token function">evaluationDependsOn</span><span class="token punctuation">(</span><span class="token string">':app'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">tasks</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">"clean"</span></span><span class="token punctuation">,</span> Delete<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    delete rootProject<span class="token punctuation">.</span>buildDir
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>然后执行<code v-pre>flutter run</code>即可</p>
</li>
</ol>
<p>此时如果出现<code v-pre>[Exception in thread &quot;main&quot; java.net.ConnectException: Connection timed out](https://www.cnblogs.com/liuys635/p/14966574.html)</code></p>
<p>就打开项目<code v-pre>android/gradle/wrapper/gradle-wrapper.properties</code>，然后将其中的distuibutionUrl下载到本地然后将这个路径改成本地存放的路径即可。例如我的存放到<code v-pre>file:///D:/flutter/flutter_windows_3.13.9-stable/flutter/.gradle/gradle-8.4-all.zip</code>这个路径不要有中文！！</p>
<p><em><em>如果出现AndroidStudio中</em> daemon not running； starting now at tcp:5037，主要是<a href="https://so.csdn.net/so/search?q=ADB&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">ADB<ExternalLinkIcon/></a>的问题</em>*，解决方案：<a href="%E6%9B%BF%E6%8D%A2Sdk%5Cplatform-tools%5C%E4%B8%8B%E7%9A%84adb.exe%E3%80%81AdbWinApi.dll%E3%80%81AdbWinUsbApi.dll%E8%BF%99%E4%B8%89%E4%B8%AA%E6%96%87%E4%BB%B6">下载ADB</a>,然后解压后进入<code v-pre>C:\Users\Administrator\AppData\Local\Android\Sdk\platform-tools</code>替换<code v-pre>Sdk\platform-tools\</code>下的<code v-pre>adb.exe、AdbWinApi.dll、AdbWinUsbApi.dll</code>这三个文件</p>
<CommentService/></div></template>


