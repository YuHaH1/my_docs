<template><div><h1 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h1>
<h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>
<h3 id="元字符" tabindex="-1"><a class="header-anchor" href="#元字符" aria-hidden="true">#</a> 元字符</h3>
<table>
<thead>
<tr>
<th style="text-align:left">字符</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">\</td>
<td style="text-align:left">将下一个字符标记为一个特殊字符、或一个原义字符、或一个 向后引用、或一个八进制转义符。例如，'n' 匹配字符 &quot;n&quot;。'\n' 匹配一个换行符。序列 '\' 匹配 &quot;&quot; 而 &quot;(&quot; 则匹配 &quot;(&quot;。</td>
</tr>
<tr>
<td style="text-align:left">^</td>
<td style="text-align:left">匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\n' 或 '\r' 之后的位置。</td>
</tr>
<tr>
<td style="text-align:left">$</td>
<td style="text-align:left">匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 '\n' 或 '\r' 之前的位置。</td>
</tr>
<tr>
<td style="text-align:left">*</td>
<td style="text-align:left">匹配前面的子表达式零次或多次。例如，zo* 能匹配 &quot;z&quot; 以及 &quot;zoo&quot;。* 等价于{0,}。</td>
</tr>
<tr>
<td style="text-align:left">+</td>
<td style="text-align:left">匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 &quot;zo&quot; 以及 &quot;zoo&quot;，但不能匹配 &quot;z&quot;。+ 等价于 {1,}。</td>
</tr>
<tr>
<td style="text-align:left">?</td>
<td style="text-align:left">匹配前面的子表达式零次或一次。例如，&quot;do(es)?&quot; 可以匹配 &quot;do&quot; 或 &quot;does&quot; 。? 等价于 {0,1}。</td>
</tr>
<tr>
<td style="text-align:left">{n}</td>
<td style="text-align:left">n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 &quot;Bob&quot; 中的 'o'，但是能匹配 &quot;food&quot; 中的两个 o。</td>
</tr>
<tr>
<td style="text-align:left">{n,}</td>
<td style="text-align:left">n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 &quot;Bob&quot; 中的 'o'，但能匹配 &quot;foooood&quot; 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。</td>
</tr>
<tr>
<td style="text-align:left">{n,m}</td>
<td style="text-align:left">m 和 n 均为非负整数，其中n &lt;= m。最少匹配 n 次且最多匹配 m 次。例如，&quot;o{1,3}&quot; 将匹配 &quot;fooooood&quot; 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。</td>
</tr>
<tr>
<td style="text-align:left">?</td>
<td style="text-align:left">当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串 &quot;oooo&quot;，'o+?' 将匹配单个 &quot;o&quot;，而 'o+' 将匹配所有 'o'。</td>
</tr>
<tr>
<td style="text-align:left">.</td>
<td style="text-align:left">匹配除换行符（\n、\r）之外的任何单个字符。要匹配包括 '\n' 在内的任何字符，请使用像&quot;<strong>(.|\n)</strong>&quot;的模式。</td>
</tr>
<tr>
<td style="text-align:left">(pattern)</td>
<td style="text-align:left">匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在VBScript 中使用 SubMatches 集合，在JScript 中则使用 $0…$9 属性。要匹配圆括号字符，请使用 '(' 或 ')'。</td>
</tr>
<tr>
<td style="text-align:left">(?:pattern)</td>
<td style="text-align:left">匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 &quot;或&quot; 字符 (|) 来组合一个模式的各个部分是很有用。例如， 'industr(?:y|ies) 就是一个比 'industry|industries' 更简略的表达式。</td>
</tr>
<tr>
<td style="text-align:left">(?=pattern)</td>
<td style="text-align:left">正向肯定预查（look ahead positive assert），在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，&quot;Windows(?=95|98|NT|2000)&quot;能匹配&quot;Windows2000&quot;中的&quot;Windows&quot;，但不能匹配&quot;Windows3.1&quot;中的&quot;Windows&quot;。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。</td>
</tr>
<tr>
<td style="text-align:left">(?!pattern)</td>
<td style="text-align:left">正向否定预查(negative assert)，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如&quot;Windows(?!95|98|NT|2000)&quot;能匹配&quot;Windows3.1&quot;中的&quot;Windows&quot;，但不能匹配&quot;Windows2000&quot;中的&quot;Windows&quot;。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。</td>
</tr>
<tr>
<td style="text-align:left">(?&lt;=pattern)</td>
<td style="text-align:left">反向(look behind)肯定预查，与正向肯定预查类似，只是方向相反。例如，&quot;`(?&lt;=95</td>
</tr>
<tr>
<td style="text-align:left">(?&lt;!pattern)</td>
<td style="text-align:left">反向否定预查，与正向否定预查类似，只是方向相反。例如&quot;`(?&lt;!95</td>
</tr>
<tr>
<td style="text-align:left">x|y</td>
<td style="text-align:left">匹配 x 或 y。例如，'z|food' 能匹配 &quot;z&quot; 或 &quot;food&quot;。'(z|f)ood' 则匹配 &quot;zood&quot; 或 &quot;food&quot;。</td>
</tr>
<tr>
<td style="text-align:left">[xyz]</td>
<td style="text-align:left">字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 &quot;plain&quot; 中的 'a'。</td>
</tr>
<tr>
<td style="text-align:left">[^xyz]</td>
<td style="text-align:left">负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 &quot;plain&quot; 中的'p'、'l'、'i'、'n'。</td>
</tr>
<tr>
<td style="text-align:left">[a-z]</td>
<td style="text-align:left">字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。</td>
</tr>
<tr>
<td style="text-align:left">[^a-z]</td>
<td style="text-align:left">负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.runoob.com/regexp/regexp-metachar-b.html" target="_blank" rel="noopener noreferrer">\b<ExternalLinkIcon/></a></td>
<td style="text-align:left">匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配&quot;never&quot; 中的 'er'，但不能匹配 &quot;verb&quot; 中的 'er'。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.runoob.com/regexp/regexp-metachar-b.html" target="_blank" rel="noopener noreferrer">\B<ExternalLinkIcon/></a></td>
<td style="text-align:left">匹配非单词边界。'er\B' 能匹配 &quot;verb&quot; 中的 'er'，但不能匹配 &quot;never&quot; 中的 'er'。</td>
</tr>
<tr>
<td style="text-align:left">\cx</td>
<td style="text-align:left">匹配由 x 指明的控制字符。例如， \cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。</td>
</tr>
<tr>
<td style="text-align:left">\d</td>
<td style="text-align:left">匹配一个数字字符。等价于 [0-9]。</td>
</tr>
<tr>
<td style="text-align:left">\D</td>
<td style="text-align:left">匹配一个非数字字符。等价于 [^0-9]。</td>
</tr>
<tr>
<td style="text-align:left">\f</td>
<td style="text-align:left">匹配一个换页符。等价于 \x0c 和 \cL。</td>
</tr>
<tr>
<td style="text-align:left">\n</td>
<td style="text-align:left">匹配一个换行符。等价于 \x0a 和 \cJ。</td>
</tr>
<tr>
<td style="text-align:left">\r</td>
<td style="text-align:left">匹配一个回车符。等价于 \x0d 和 \cM。</td>
</tr>
<tr>
<td style="text-align:left">\s</td>
<td style="text-align:left">匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。</td>
</tr>
<tr>
<td style="text-align:left">\S</td>
<td style="text-align:left">匹配任何非空白字符。等价于 <code v-pre>[^\f\n\r\t\v]</code>。</td>
</tr>
<tr>
<td style="text-align:left">\t</td>
<td style="text-align:left">匹配一个制表符。等价于 \x09 和 \cI。</td>
</tr>
<tr>
<td style="text-align:left">\v</td>
<td style="text-align:left">匹配一个垂直制表符。等价于 \x0b 和 \cK。</td>
</tr>
<tr>
<td style="text-align:left">\w</td>
<td style="text-align:left">匹配字母、数字、下划线。等价于<code v-pre>[A-Za-z0-9_]</code>。</td>
</tr>
<tr>
<td style="text-align:left">\W</td>
<td style="text-align:left">匹配非字母、数字、下划线。等价于 <code v-pre>[^A-Za-z0-9_]</code>。</td>
</tr>
<tr>
<td style="text-align:left">\xn</td>
<td style="text-align:left">匹配 n，其中 n 为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，'\x41' 匹配 &quot;A&quot;。'\x041' 则等价于 '\x04' &amp; &quot;1&quot;。正则表达式中可以使用 ASCII 编码。</td>
</tr>
<tr>
<td style="text-align:left">\num</td>
<td style="text-align:left">匹配 num，其中 num 是一个正整数。对所获取的匹配的引用。例如，'(.)\1' 匹配两个连续的相同字符。</td>
</tr>
<tr>
<td style="text-align:left">\n</td>
<td style="text-align:left">标识一个八进制转义值或一个向后引用。如果 \n 之前至少 n 个获取的子表达式，则 n 为向后引用。否则，如果 n 为八进制数字 (0-7)，则 n 为一个八进制转义值。</td>
</tr>
<tr>
<td style="text-align:left">\nm</td>
<td style="text-align:left">标识一个八进制转义值或一个向后引用。如果 \nm 之前至少有 nm 个获得子表达式，则 nm 为向后引用。如果 \nm 之前至少有 n 个获取，则 n 为一个后跟文字 m 的向后引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字 (0-7)，则 \nm 将匹配八进制转义值 nm。</td>
</tr>
<tr>
<td style="text-align:left">\nml</td>
<td style="text-align:left">如果 n 为八进制数字 (0-3)，且 m 和 l 均为八进制数字 (0-7)，则匹配八进制转义值 nml。</td>
</tr>
<tr>
<td style="text-align:left">\un</td>
<td style="text-align:left">匹配 n，其中 n 是一个用四个十六进制数字表示的 Unicode 字符。例如， \u00A9 匹配版权符号 (?)。</td>
</tr>
</tbody>
</table>
<h2 id="正则高级部分" tabindex="-1"><a class="header-anchor" href="#正则高级部分" aria-hidden="true">#</a> 正则高级部分</h2>
<h3 id="_1-n匹配分组-原子组" tabindex="-1"><a class="header-anchor" href="#_1-n匹配分组-原子组" aria-hidden="true">#</a> $1… $n匹配分组（原子组）</h3>
<ol>
<li><code v-pre>$0</code>代表字符串本身</li>
<li>当我们正则中使用圆括号<code v-pre>()</code>,所匹配的结果会用<code v-pre>$0....$9</code>去存储</li>
<li><code v-pre>$&amp;</code>是字符串的内容</li>
<li>$`表示匹配内容的前面   $' 表示匹配内容右边</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'(010)123456'</span>

<span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\((\d+)\)(\d{6})</span><span class="token regex-delimiter">/</span></span>

<span class="token keyword">const</span> newStr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span><span class="token string">'$1-$2'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newStr<span class="token punctuation">)</span>
<span class="token comment">// 010-123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原子组别名" tabindex="-1"><a class="header-anchor" href="#原子组别名" aria-hidden="true">#</a> 原子组别名</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;tag>&lt;h[1-6]>)</span><span class="token regex-delimiter">/</span></span>
使用的时候通过$<span class="token operator">&lt;</span>tag<span class="token operator">></span>使用，代替了之前的$1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不记录原子" tabindex="-1"><a class="header-anchor" href="#不记录原子" aria-hidden="true">#</a> 不记录原子</h3>
<p>我们知道<code v-pre>（）</code>代表一个组，匹配的组结果可以利用<code v-pre>exec</code>去查看</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
https://www.baidu.com
https://fancyfish.top
</span><span class="token template-punctuation string">`</span></span>
<span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">https?:\/\/((\w+\.)?\w+\.(com|org|cn|top))</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res <span class="token operator">=</span> reg<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
结果
<span class="token punctuation">[</span>
    <span class="token number">0</span><span class="token operator">:</span> <span class="token string">"https://www.baidu.com"</span>
	<span class="token number">1</span><span class="token operator">:</span> <span class="token string">"www.baidu.com"</span>
	<span class="token number">2</span><span class="token operator">:</span> <span class="token string">"www."</span>
	<span class="token number">3</span><span class="token operator">:</span> <span class="token string">"com"</span>
<span class="token punctuation">]</span>

<span class="token punctuation">[</span>
    <span class="token number">0</span><span class="token operator">:</span> <span class="token string">"https://fancyfish.top"</span>
	<span class="token number">1</span><span class="token operator">:</span> <span class="token string">"fancyfish.top"</span>
	<span class="token number">2</span><span class="token operator">:</span> <span class="token keyword">undefined</span>
	<span class="token number">3</span><span class="token operator">:</span> <span class="token string">"top"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1,2,3都是分组匹配的结果，如果我们不想要分组结果就在分组前加上<code v-pre>?:</code>,这样的话我们无法使用<code v-pre>$1、$2</code>等拿到匹配的分组结果</p>
<p><code v-pre>const reg = /https?:\/\/((?:\w+\.)?\w+\.(?:com|org|cn))/gi</code></p>
<h3 id="正向肯定预查" tabindex="-1"><a class="header-anchor" href="#正向肯定预查" aria-hidden="true">#</a> 正向肯定预查</h3>
<p>匹配后面相匹配的前面<code v-pre>y(?=pattern)</code>,理解为条件表达式，即匹配后面是pattern的y</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">"yu yuxiaocao"</span>
str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">yu(?=x)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
结果
<span class="token punctuation">[</span>
    <span class="token number">0</span><span class="token operator">:</span> <span class="token string">"yu"</span>
	<span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">3</span>  
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> food <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
 鱼，200元，东
 肉，300.01元
</span><span class="token template-punctuation string">`</span></span>
food<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d(?=(\d)?元)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="正向否定预查" tabindex="-1"><a class="header-anchor" href="#正向否定预查" aria-hidden="true">#</a> 正向否定预查</h3>
<p><code v-pre>(?!pattern)</code>后面不是pattern的y</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> strr <span class="token operator">=</span> <span class="token string">"fancyfish123fish"</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> regg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[a-z]+(?!\d+)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>strr<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>regg<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">:</span> <span class="token string">"fish"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反向肯定预查" tabindex="-1"><a class="header-anchor" href="#反向肯定预查" aria-hidden="true">#</a> 反向肯定预查</h3>
<p><code v-pre>(?&lt; =pattern)y</code>匹配前面是pattern的y</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'12345678912'</span>
<span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;=\d{7})\d{4}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span>
str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span><span class="token string">'****'</span><span class="token punctuation">)</span>

<span class="token string">'1234567****'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反向否定预查" tabindex="-1"><a class="header-anchor" href="#反向否定预查" aria-hidden="true">#</a> 反向否定预查</h3>
<p><code v-pre>(?&lt;!pattern)y</code>匹配前面不是pattern的y</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">"yu123123zcx123214"</span>
<span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;!yu)\d+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span>
str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


