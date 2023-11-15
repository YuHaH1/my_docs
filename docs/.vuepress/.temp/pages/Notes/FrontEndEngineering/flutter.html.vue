<template><div><h1 id="flutter" tabindex="-1"><a class="header-anchor" href="#flutter" aria-hidden="true">#</a> flutter</h1>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="final变量" tabindex="-1"><a class="header-anchor" href="#final变量" aria-hidden="true">#</a> Final变量</h4>
<CommentService/></div></template>


