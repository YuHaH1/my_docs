import{_ as o,M as l,p,q as c,R as s,t as n,N as a,a1 as e}from"./framework-f7ec573f.js";const d={},r=e(`<h1 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本" aria-hidden="true">#</a> shell脚本</h1><p>shell脚本可以写一些自动化工具，简化运维人员的工作。</p><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><h3 id="变量的声明" tabindex="-1"><a class="header-anchor" href="#变量的声明" aria-hidden="true">#</a> 变量的声明</h3><p>变量声明规则如下：</p><ul><li>命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。</li><li>中间不能有空格，可以使用下划线 <strong>_</strong>。</li><li>不能使用标点符号。</li><li>不能使用bash里的关键字（可用help命令查看保留关键字）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;xxx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>引用变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 简写</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$name</span>
<span class="token comment"># 全写如下</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>声明只读变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">password</span><span class="token operator">=</span><span class="token string">&quot;123456&quot;</span>
<span class="token builtin class-name">readonly</span> password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除变量</p><ul><li>unset 命令不能删除只读变量。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">unset</span> password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="变量的类型" tabindex="-1"><a class="header-anchor" href="#变量的类型" aria-hidden="true">#</a> 变量的类型</h3><p>运行shell时，会同时存在三种变量：</p><ul><li><strong>1) 局部变量</strong> 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。</li><li><strong>2) 环境变量</strong> 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。</li><li><strong>3) shell变量</strong> shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行</li></ul><h4 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h4><p>1.字符串：字符串可以用单引号，也可以用双引号，也可以不用引号。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">str</span><span class="token operator">=</span><span class="token string">&#39;this is a string&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；</li><li>单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。</li></ul><p>2.双引号字符串</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">your_name</span><span class="token operator">=</span><span class="token string">&quot;runoob&quot;</span>
<span class="token assign-left variable">str</span><span class="token operator">=</span><span class="token string">&quot;Hello, I know you are <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token variable">$your_name</span><span class="token entity" title="\\&quot;">\\&quot;</span>! <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token variable">$str</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>双引号里可以有变量</li><li>双引号里可以出现转义字符</li></ul><h4 id="拼接字符串" tabindex="-1"><a class="header-anchor" href="#拼接字符串" aria-hidden="true">#</a> 拼接字符串</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">your_name</span><span class="token operator">=</span><span class="token string">&quot;runoob&quot;</span>
<span class="token comment"># 使用双引号拼接</span>
<span class="token assign-left variable">greeting</span><span class="token operator">=</span><span class="token string">&quot;hello, &quot;</span><span class="token variable">$your_name</span><span class="token string">&quot; !&quot;</span>
<span class="token assign-left variable">greeting_1</span><span class="token operator">=</span><span class="token string">&quot;hello, <span class="token variable">\${your_name}</span> !&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$greeting</span>  <span class="token variable">$greeting_1</span>

<span class="token comment"># 使用单引号拼接</span>
<span class="token assign-left variable">greeting_2</span><span class="token operator">=</span><span class="token string">&#39;hello, &#39;</span><span class="token variable">$your_name</span><span class="token string">&#39; !&#39;</span>
<span class="token assign-left variable">greeting_3</span><span class="token operator">=</span><span class="token string">&#39;hello, \${your_name} !&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$greeting_2</span>  <span class="token variable">$greeting_3</span>
<span class="token comment"># 输出结果</span>
hello, runoob <span class="token operator">!</span> hello, runoob <span class="token operator">!</span>
hello, runoob <span class="token operator">!</span> hello, <span class="token variable">\${your_name}</span> <span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获取字符串长度" tabindex="-1"><a class="header-anchor" href="#获取字符串长度" aria-hidden="true">#</a> 获取字符串长度</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">string</span><span class="token operator">=</span><span class="token string">&quot;abcd&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>string}</span>   <span class="token comment"># 输出 4 变量为字符串时，\${#string} 等价于 \${#string[0]}:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="截取字符串" tabindex="-1"><a class="header-anchor" href="#截取字符串" aria-hidden="true">#</a> 截取字符串</h4><p>以下实例从字符串第 <strong>2</strong> 个字符开始截取 <strong>4</strong> 个字符：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">string</span><span class="token operator">=</span><span class="token string">&quot;runoob is a great site&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${string<span class="token operator">:</span>1<span class="token operator">:</span>4}</span> <span class="token comment"># 输出 unoo</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：第一个字符的索引值为 <strong>0</strong>。</p><h4 id="查找字符串" tabindex="-1"><a class="header-anchor" href="#查找字符串" aria-hidden="true">#</a> 查找字符串</h4><p>查找字符 <strong>i</strong> 或 <strong>o</strong> 的位置(哪个字母先出现就计算哪个)：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">string</span><span class="token operator">=</span><span class="token string">&quot;runoob is a great site&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> index <span class="token string">&quot;<span class="token variable">$string</span>&quot;</span> io<span class="token variable">\`</span></span>  <span class="token comment"># 输出 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 以上脚本中 <strong>\`</strong> 是反引号，而不是单引号 <strong>&#39;</strong>。</p><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3><p>在 Shell 中，用括号来表示数组，数组元素用&quot;空格&quot;符号分割开。定义数组的一般形式为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">array_name</span><span class="token operator">=</span><span class="token punctuation">(</span>value0 value1 value2 value3<span class="token punctuation">)</span>
<span class="token comment"># or</span>
<span class="token assign-left variable">array_name</span><span class="token operator">=</span><span class="token punctuation">(</span>
value0
value1
value2
value3
<span class="token punctuation">)</span>
<span class="token comment"># or</span>
array_name<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>value0
array_name<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>value1
array_name<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token operator">=</span>valuen

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="读取数组元素" tabindex="-1"><a class="header-anchor" href="#读取数组元素" aria-hidden="true">#</a> 读取数组元素</h4><ul><li><p><code> \${数组名[下标]}</code></p></li><li><p>使用 <strong>@</strong> 或 ***** 可以获取数组中的所有元素</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>. <span class="token assign-left variable">valuen</span><span class="token operator">=</span><span class="token variable">\${array_name<span class="token punctuation">[</span>n<span class="token punctuation">]</span>}</span>
<span class="token number">2</span>. <span class="token builtin class-name">echo</span> <span class="token variable">\${array_name<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="读取数组长度" tabindex="-1"><a class="header-anchor" href="#读取数组长度" aria-hidden="true">#</a> 读取数组长度</h4><p>获取数组长度的方法与获取字符串长度的方法相同</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 取得数组元素的个数</span>
<span class="token assign-left variable">length</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array_name<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># 或者</span>
<span class="token assign-left variable">length</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array_name<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># 取得数组单个元素的长度</span>
<span class="token assign-left variable">length</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array_name<span class="token punctuation">[</span>n<span class="token punctuation">]</span>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="关联数组" tabindex="-1"><a class="header-anchor" href="#关联数组" aria-hidden="true">#</a> 关联数组</h4><p>Bash 支持关联数组，可以使用任意的字符串、或者整数作为下标来访问数组元素。</p>`,47),u={href:"https://www.runoob.com/linux/linux-comm-declare.html",target:"_blank",rel:"noopener noreferrer"},v=s("code",null,"declare -A array_name",-1),b=e(`<p>关联数组的键是唯一的。以下实例我们创建一个关联数组 <strong>arr</strong>，并创建不同的键值：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> <span class="token assign-left variable">arr</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;google&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.google.com&quot;</span> <span class="token punctuation">[</span><span class="token string">&quot;runoob&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.runoob.com&quot;</span> <span class="token punctuation">[</span><span class="token string">&quot;taobao&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.taobao.com&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 我们也可以先声明一个关联数组，然后再设置键和值：</span>
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> arr
arr<span class="token punctuation">[</span><span class="token string">&quot;google&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.google.com&quot;</span>
arr<span class="token punctuation">[</span><span class="token string">&quot;runoob&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.runoob.com&quot;</span>
arr<span class="token punctuation">[</span><span class="token string">&quot;taobao&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.taobao.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过键来访问关联数组的元素：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${arr<span class="token punctuation">[</span>&quot;runoob&quot;<span class="token punctuation">]</span>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在数组前加一个感叹号 <strong>!</strong> 可以获取数组的所有键，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> site
site<span class="token punctuation">[</span><span class="token string">&quot;google&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.google.com&quot;</span>
site<span class="token punctuation">[</span><span class="token string">&quot;runoob&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.runoob.com&quot;</span>
site<span class="token punctuation">[</span><span class="token string">&quot;taobao&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;www.taobao.com&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;数组的键为: <span class="token variable">\${<span class="token operator">!</span>site<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;数组的键为: <span class="token variable">\${<span class="token operator">!</span>site<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span>

数组的键为: google runoob taobao
数组的键为: google runoob taobao
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><p>Shell 和其他编程语言一样，支持多种运算符，包括：</p><ul><li>算数运算符</li><li>关系运算符</li><li>布尔运算符</li><li>字符串运算符</li><li>文件测试运算符</li></ul><p>原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。expr 是一款表达式计算工具，使用它能完成表达式的求值操作。</p><h3 id="算术运算符" tabindex="-1"><a class="header-anchor" href="#算术运算符" aria-hidden="true">#</a> 算术运算符</h3><p>Shell 和其他编程语言一样，支持多种运算符，包括：</p><ul><li>算数运算符</li><li>关系运算符</li><li>布尔运算符</li><li>字符串运算符</li><li>文件测试运算符</li></ul><p>原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。</p><p>expr 是一款表达式计算工具，使用它能完成表达式的求值操作。</p><p>例如，两个数相加(<strong>注意使用的是反引号 *<em>\`*</em> 而不是单引号 *<em>&#39;*</em></strong>)：</p><p>下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">说明</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">+</td><td style="text-align:left;">加法</td><td style="text-align:left;"><code>expr $a + $b</code> 结果为 30。</td></tr><tr><td style="text-align:left;">-</td><td style="text-align:left;">减法</td><td style="text-align:left;"><code>expr $a - $b</code> 结果为 -10。</td></tr><tr><td style="text-align:left;">*</td><td style="text-align:left;">乘法</td><td style="text-align:left;"><code>expr $a \\* $b</code> 结果为 200。</td></tr><tr><td style="text-align:left;">/</td><td style="text-align:left;">除法</td><td style="text-align:left;"><code>expr $b / $a</code> 结果为 2。</td></tr><tr><td style="text-align:left;">%</td><td style="text-align:left;">取余</td><td style="text-align:left;"><code>expr $b % $a</code> 结果为 0。</td></tr><tr><td style="text-align:left;">=</td><td style="text-align:left;">赋值</td><td style="text-align:left;">a=$b 把变量 b 的值赋给 a。</td></tr><tr><td style="text-align:left;">==</td><td style="text-align:left;">相等。用于比较两个数字，相同则返回 true。</td><td style="text-align:left;">[ $a == $b ] 返回 false。</td></tr><tr><td style="text-align:left;">!=</td><td style="text-align:left;">不相等。用于比较两个数字，不相同则返回 true。</td><td style="text-align:left;">[ $a != $b ] 返回 true。</td></tr></tbody></table><h3 id="关系运算符" tabindex="-1"><a class="header-anchor" href="#关系运算符" aria-hidden="true">#</a> 关系运算符</h3><p>l -&gt; letter</p><p>g -&gt; greater</p><p>t -&gt; than</p><p>e -&gt; equal</p><p>n -&gt; not</p><p>关系运算符只支持数字，不支持字符串，除非字符串的值是数字。</p><p>下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">说明</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">-eq</td><td style="text-align:left;">检测两个数是否相等，相等返回 true。</td><td style="text-align:left;"><code>[ $a -eq $b ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-ne</td><td style="text-align:left;">检测两个数是否不相等，不相等返回 true。</td><td style="text-align:left;"><code>[ $a -ne $b ]</code> 返回 true。</td></tr><tr><td style="text-align:left;">-gt</td><td style="text-align:left;">检测左边的数是否大于右边的，如果是，则返回 true。</td><td style="text-align:left;"><code>[ $a -gt $b ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-lt</td><td style="text-align:left;">检测左边的数是否小于右边的，如果是，则返回 true。</td><td style="text-align:left;"><code>[ $a -lt $b ] </code>返回 true。</td></tr><tr><td style="text-align:left;">-ge</td><td style="text-align:left;">检测左边的数是否大于等于右边的，如果是，则返回 true。</td><td style="text-align:left;"><code>[ $a -ge $b ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-le</td><td style="text-align:left;">检测左边的数是否小于等于右边的，如果是，则返回 true。</td><td style="text-align:left;"><code>[ $a -le $b ]</code> 返回 true。</td></tr></tbody></table><h3 id="布尔运算符" tabindex="-1"><a class="header-anchor" href="#布尔运算符" aria-hidden="true">#</a> 布尔运算符</h3><p>下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20：</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">说明</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">!</td><td style="text-align:left;">非运算，表达式为 true 则返回 false，否则返回 true。</td><td style="text-align:left;">[ ! false ] 返回 true。</td></tr><tr><td style="text-align:left;">-o</td><td style="text-align:left;">或运算，有一个表达式为 true 则返回 true。</td><td style="text-align:left;">[ $a -lt 20 -o $b -gt 100 ] 返回 true。</td></tr><tr><td style="text-align:left;">-a</td><td style="text-align:left;">与运算，两个表达式都为 true 才返回 true。</td><td style="text-align:left;">[ $a -lt 20 -a $b -gt 100 ] 返回 false。</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token number">20</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$a</span> <span class="token operator">!=</span> <span class="token variable">$b</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> != <span class="token variable">$b</span> : a 不等于 b&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> == <span class="token variable">$b</span>: a 等于 b&quot;</span>
<span class="token comment"># 10 != 20 : a 不等于 b </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符" aria-hidden="true">#</a> 逻辑运算符</h3><p>以下介绍 Shell 的逻辑运算符，假定变量 a 为 10，变量 b 为 20:</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">说明</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">&amp;&amp;</td><td style="text-align:left;">逻辑的 AND</td><td style="text-align:left;"><code>[[ $a -lt 100 &amp;&amp; $b -gt 100 ]] </code>返回 false</td></tr><tr><td style="text-align:left;">||</td><td style="text-align:left;">逻辑的 OR</td><td style="text-align:left;">\`[[ $a -lt 100</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token number">20</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$a</span> <span class="token parameter variable">-lt</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$b</span> <span class="token parameter variable">-gt</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;返回 true&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;返回 false&quot;</span>
<span class="token comment"># 返回 false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串运算符" tabindex="-1"><a class="header-anchor" href="#字符串运算符" aria-hidden="true">#</a> 字符串运算符</h3><p>下表列出了常用的字符串运算符，假定变量 a 为 &quot;abc&quot;，变量 b 为 &quot;efg&quot;：</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">说明</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">=</td><td style="text-align:left;">检测两个字符串是否相等，相等返回 true。</td><td style="text-align:left;">[ $a = $b ] 返回 false。</td></tr><tr><td style="text-align:left;">!=</td><td style="text-align:left;">检测两个字符串是否不相等，不相等返回 true。</td><td style="text-align:left;">[ $a != $b ] 返回 true。</td></tr><tr><td style="text-align:left;">-z</td><td style="text-align:left;">检测字符串长度是否为0，为0返回 true。</td><td style="text-align:left;">[ -z $a ] 返回 false。</td></tr><tr><td style="text-align:left;">-n</td><td style="text-align:left;">检测字符串长度是否不为 0，不为 0 返回 true。</td><td style="text-align:left;">[ -n &quot;$a&quot; ] 返回 true。</td></tr><tr><td style="text-align:left;">$</td><td style="text-align:left;">检测字符串是否不为空，不为空返回 true。</td><td style="text-align:left;">[ $a ] 返回 true。</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token string">&quot;abc&quot;</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token string">&quot;efg&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$a</span> <span class="token operator">=</span> <span class="token variable">$b</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> = <span class="token variable">$b</span> : a 等于 b&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> = <span class="token variable">$b</span>: a 不等于 b&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$a</span> <span class="token operator">!=</span> <span class="token variable">$b</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> != <span class="token variable">$b</span> : a 不等于 b&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> != <span class="token variable">$b</span>: a 等于 b&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">$a</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-z <span class="token variable">$a</span> : 字符串长度为 0&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-z <span class="token variable">$a</span> : 字符串长度不为 0&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$a</span>&quot;</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-n <span class="token variable">$a</span> : 字符串长度不为 0&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-n <span class="token variable">$a</span> : 字符串长度为 0&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$a</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> : 字符串不为空&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span> : 字符串为空&quot;</span>
<span class="token keyword">fi</span>
abc <span class="token operator">=</span> efg: a 不等于 b
abc <span class="token operator">!=</span> efg <span class="token builtin class-name">:</span> a 不等于 b
<span class="token parameter variable">-z</span> abc <span class="token builtin class-name">:</span> 字符串长度不为 <span class="token number">0</span>
<span class="token parameter variable">-n</span> abc <span class="token builtin class-name">:</span> 字符串长度不为 <span class="token number">0</span>
abc <span class="token builtin class-name">:</span> 字符串不为空
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件运算符" tabindex="-1"><a class="header-anchor" href="#文件运算符" aria-hidden="true">#</a> 文件运算符</h3><p>文件测试运算符用于检测 Unix 文件的各种属性。属性检测描述如下：</p><table><thead><tr><th style="text-align:left;">操作符</th><th style="text-align:left;">说明</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">-b file</td><td style="text-align:left;">检测文件是否是块设备文件，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -b $file ] </code>返回 false。</td></tr><tr><td style="text-align:left;">-c file</td><td style="text-align:left;">检测文件是否是字符设备文件，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -c $file ] </code>返回 false。</td></tr><tr><td style="text-align:left;">-d file</td><td style="text-align:left;">检测文件是否是目录，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -d $file ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-f file</td><td style="text-align:left;">检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。</td><td style="text-align:left;"><code>[ -f $file ] </code>返回 true。</td></tr><tr><td style="text-align:left;">-g file</td><td style="text-align:left;">检测文件是否设置了 SGID 位，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -g $file ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-k file</td><td style="text-align:left;">检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -k $file ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-p file</td><td style="text-align:left;">检测文件是否是有名管道，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -p $file ]</code> 返回 false。</td></tr><tr><td style="text-align:left;">-u file</td><td style="text-align:left;">检测文件是否设置了 SUID 位，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -u $file ] </code>返回 false。</td></tr><tr><td style="text-align:left;">-r file</td><td style="text-align:left;">检测文件是否可读，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -r $file ] </code>返回 true。</td></tr><tr><td style="text-align:left;">-w file</td><td style="text-align:left;">检测文件是否可写，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -w $file ] </code>返回 true。</td></tr><tr><td style="text-align:left;">-x file</td><td style="text-align:left;">检测文件是否可执行，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -x $file ]</code> 返回 true。</td></tr><tr><td style="text-align:left;">-s file</td><td style="text-align:left;">检测文件是否为空（文件大小是否大于0），不为空返回 true。</td><td style="text-align:left;"><code>[ -s $file ]</code> 返回 true。</td></tr><tr><td style="text-align:left;">-e file</td><td style="text-align:left;">检测文件（包括目录）是否存在，如果是，则返回 true。</td><td style="text-align:left;"><code>[ -e $file ]</code> 返回 true。</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">file</span><span class="token operator">=</span><span class="token string">&quot;/var/www/runoob/test.sh&quot;</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件可读&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不可读&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-w</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件可写&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不可写&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件可执行&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不可执行&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件为普通文件&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件为特殊文件&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件是个目录&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不是个目录&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不为空&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件为空&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token keyword">fi</span>

文件可读
文件可写
文件可执行
文件为普通文件
文件不是个目录
文件不为空
文件存在

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h2><h3 id="条件判断" tabindex="-1"><a class="header-anchor" href="#条件判断" aria-hidden="true">#</a> 条件判断</h3><p><strong>if</strong></p><ul><li>末尾的 fi 就是 if 倒过来拼写，后面还会遇到类似的。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> 【condition】
<span class="token keyword">then</span>
    command1 
    command2
    <span class="token punctuation">..</span>.
    commandN 
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;ssh&quot;</span><span class="token variable">)</span></span> <span class="token parameter variable">-gt</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">;</span> <span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>if else-if else</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> 【condition1】
<span class="token keyword">then</span>
    command1
<span class="token keyword">elif</span> 【condition2 】
<span class="token keyword">then</span> 
    command2
<span class="token keyword">else</span>
    commandN
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用 <strong>((...))</strong> 作为判断语句，大于和小于可以直接使用 <strong>&gt;</strong> 和 <strong>&lt;</strong>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token variable"><span class="token punctuation">((</span> a <span class="token operator">&gt;</span> b <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token punctuation">..</span>.
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>case</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> 值 <span class="token keyword">in</span>
模式1<span class="token punctuation">)</span>
    command1
    command2
    <span class="token punctuation">..</span>.
    commandN
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
模式2）
    command1
    command2
    <span class="token punctuation">..</span>.
    commandN
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;输入 1 到 4 之间的数字:&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;你输入的数字为:&#39;</span>
<span class="token builtin class-name">read</span> aNum
<span class="token keyword">case</span> <span class="token variable">$aNum</span> <span class="token keyword">in</span>
    <span class="token number">1</span><span class="token punctuation">)</span>  <span class="token builtin class-name">echo</span> <span class="token string">&#39;你选择了 1&#39;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">2</span><span class="token punctuation">)</span>  <span class="token builtin class-name">echo</span> <span class="token string">&#39;你选择了 2&#39;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">3</span><span class="token punctuation">)</span>  <span class="token builtin class-name">echo</span> <span class="token string">&#39;你选择了 3&#39;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">4</span><span class="token punctuation">)</span>  <span class="token builtin class-name">echo</span> <span class="token string">&#39;你选择了 4&#39;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>  <span class="token builtin class-name">echo</span> <span class="token string">&#39;你没有输入 1 到 4 之间的数字&#39;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
输入 <span class="token number">1</span> 到 <span class="token number">4</span> 之间的数字:
你输入的数字为:
<span class="token number">3</span>
你选择了 <span class="token number">3</span>

<span class="token comment">#!/bin/sh</span>

<span class="token assign-left variable">site</span><span class="token operator">=</span><span class="token string">&quot;nhooo&quot;</span>

<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$site</span>&quot;</span> <span class="token keyword">in</span>
   <span class="token string">&quot;nhooo&quot;</span><span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;基础教程网&quot;</span> 
   <span class="token punctuation">;</span><span class="token punctuation">;</span>
   <span class="token string">&quot;google&quot;</span><span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;Google 搜索&quot;</span> 
   <span class="token punctuation">;</span><span class="token punctuation">;</span>
   <span class="token string">&quot;taobao&quot;</span><span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;淘宝网&quot;</span> 
   <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="循环" tabindex="-1"><a class="header-anchor" href="#循环" aria-hidden="true">#</a> 循环</h3><p>在循环过程中，有时候需要在未达到循环结束条件时强制跳出循环，Shell 使用两个命令来实现该功能：<strong>break</strong> 和 <strong>continue</strong>。</p><p><strong>for</strong></p><p>与其他编程语言类似，Shell支持for循环。</p><p>for循环一般格式为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">var</span> <span class="token keyword">in</span> item1 item2 <span class="token punctuation">..</span>. itemN
<span class="token keyword">do</span>
    command1
    command2
    <span class="token punctuation">..</span>.
    commandN
<span class="token keyword">done</span>
<span class="token comment"># eg</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">loop</span> <span class="token keyword">in</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;The value is: <span class="token variable">$loop</span>&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>while</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> condition
<span class="token keyword">do</span>
    <span class="token builtin class-name">command</span>
<span class="token keyword">done</span>

<span class="token assign-left variable">int</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token keyword">while</span><span class="token variable"><span class="token punctuation">((</span> $int<span class="token operator">&lt;=</span><span class="token number">5</span> <span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$int</span>
    <span class="token builtin class-name">let</span> <span class="token string">&quot;int++&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>until</strong></p><p>until 循环执行一系列命令直至条件为 true 时停止。</p><p>until 循环与 while 循环在处理方式上刚好相反。</p><p>一般 while 循环优于 until 循环，但在某些时候—也只是极少数情况下，until 循环更加有用。</p><p>until 语法格式:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token keyword">until</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token variable">$a</span> <span class="token parameter variable">-lt</span> <span class="token number">10</span> <span class="token punctuation">]</span>
<span class="token keyword">do</span>
   <span class="token builtin class-name">echo</span> <span class="token variable">$a</span>
   <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $a + <span class="token number">1</span><span class="token variable">\`</span></span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">demoFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;这是我的第一个 shell 函数!&quot;</span>
<span class="token punctuation">}</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-----函数开始执行-----&quot;</span>
demoFun
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-----函数执行完毕-----&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个带有<code>return</code>函数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>


<span class="token function-name function">funWithReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;这个函数会对输入的两个数字进行相加运算...&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;输入第一个数字: &quot;</span>
    <span class="token builtin class-name">read</span> aNum
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;输入第二个数字: &quot;</span>
    <span class="token builtin class-name">read</span> anotherNum
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;两个数字分别为 <span class="token variable">$aNum</span> 和 <span class="token variable">$anotherNum</span> !&quot;</span>
    <span class="token builtin class-name">return</span> <span class="token variable"><span class="token variable">$((</span>$aNum<span class="token operator">+</span>$anotherNum<span class="token variable">))</span></span>
<span class="token punctuation">}</span>
funWithReturn
<span class="token builtin class-name">echo</span> <span class="token string">&quot;输入的两个数字之和为 <span class="token variable">$?</span> &quot;</span>
这个函数会对输入的两个数字进行相加运算<span class="token punctuation">..</span>.
输入第一个数字: 
<span class="token number">1</span>
输入第二个数字: 
<span class="token number">2</span>
两个数字分别为 <span class="token number">1</span> 和 <span class="token number">2</span> <span class="token operator">!</span>
输入的两个数字之和为 <span class="token number">3</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数参数" tabindex="-1"><a class="header-anchor" href="#函数参数" aria-hidden="true">#</a> 函数参数</h3><p>在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 <code>$n</code> 的形式来获取参数的值，例如，<code>$1</code>表示第一个参数，<code>$2</code>表示第二个参数...</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>


<span class="token function-name function">funWithParam</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;第一个参数为 <span class="token variable">$1</span> !&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;第二个参数为 <span class="token variable">$2</span> !&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;第十个参数为 <span class="token variable">$10</span> !&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;第十个参数为 <span class="token variable">\${10}</span> !&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;第十一个参数为 <span class="token variable">\${11}</span> !&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;参数总数有 <span class="token variable">$#</span> 个!&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;作为一个字符串输出所有参数 <span class="token variable">$*</span> !&quot;</span>
<span class="token punctuation">}</span>
funWithParam <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span> <span class="token number">7</span> <span class="token number">8</span> <span class="token number">9</span> <span class="token number">34</span> <span class="token number">73</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块化" tabindex="-1"><a class="header-anchor" href="#模块化" aria-hidden="true">#</a> 模块化</h2><p>和其他语言一样，Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span> filename   <span class="token comment"># 注意点号(.)和文件名中间有一空格</span>
<span class="token comment"># or</span>
<span class="token builtin class-name">source</span> filename
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#------------est1.sh 代码如下：</span>

<span class="token comment">#!/bin/bash</span>
<span class="token comment"># author:菜鸟教程</span>
<span class="token comment"># url:www.runoob.com</span>

<span class="token assign-left variable">url</span><span class="token operator">=</span><span class="token string">&quot;http://www.runoob.com&quot;</span>
<span class="token comment">#-----------test2.sh 代码如下：</span>

<span class="token comment">#!/bin/bash</span>
<span class="token comment"># author:菜鸟教程</span>
<span class="token comment"># url:www.runoob.com</span>

<span class="token comment">#使用 . 号来引用test1.sh 文件</span>
<span class="token builtin class-name">.</span> ./test1.sh

<span class="token comment"># 或者使用以下包含文件代码</span>
<span class="token comment"># source ./test1.sh</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;菜鸟教程官网地址：<span class="token variable">$url</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell脚本参数" tabindex="-1"><a class="header-anchor" href="#shell脚本参数" aria-hidden="true">#</a> Shell脚本参数</h2><p>我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：<strong>$n</strong>。<strong>n</strong> 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……其中 <strong>$0 为执行的文件名（包含文件路径）</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Shell 传递参数实例！&quot;</span><span class="token punctuation">;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;执行的文件名：<span class="token variable">$0</span>&quot;</span><span class="token punctuation">;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;第一个参数为：<span class="token variable">$1</span>&quot;</span><span class="token punctuation">;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;第二个参数为：<span class="token variable">$2</span>&quot;</span><span class="token punctuation">;</span>

$ <span class="token function">chmod</span> +x test.sh 
$ ./test.sh <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,83),k=s("thead",null,[s("tr",null,[s("th",null,"参数处理"),s("th",{style:{"text-align":"left"}},"说明")])],-1),m=s("tr",null,[s("td",null,"$#"),s("td",{style:{"text-align":"left"}},"传递到脚本的参数个数")],-1),h=s("tr",null,[s("td",null,"$*"),s("td",{style:{"text-align":"left"}},'以一个单字符串显示所有向脚本传递的参数。 如"$*"用「"」括起来的情况、以"$\\1 $2 … $n"的形式输出所有参数。')],-1),g=s("tr",null,[s("td",null,"$$"),s("td",{style:{"text-align":"left"}},"脚本运行的当前进程ID号")],-1),f=s("tr",null,[s("td",null,"$!"),s("td",{style:{"text-align":"left"}},"后台运行的最后一个进程的ID号")],-1),y=s("tr",null,[s("td",null,"$@"),s("td",{style:{"text-align":"left"}},'与$*相同，但是使用时加引号，并在引号中返回每个参数。 如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。')],-1),q=s("td",null,"$-",-1),x={style:{"text-align":"left"}},$={href:"https://www.runoob.com/linux/linux-comm-set.html",target:"_blank",rel:"noopener noreferrer"},w=s("tr",null,[s("td",null,"$?"),s("td",{style:{"text-align":"left"}},"显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。")],-1),_=e(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;参数个数为：<span class="token variable">$#</span>&quot;</span><span class="token punctuation">;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;传递的参数作为一个字符串显示：<span class="token variable">$*</span>&quot;</span><span class="token punctuation">;</span>
<span class="token comment"># res</span>
<span class="token comment"># 参数个数为：3</span>
<span class="token comment"># 传递的参数作为一个字符串显示：1 2 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>$* 与 $@ 区别：</p><ul><li>相同点：都是引用所有参数。</li><li>不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，则 &quot; * &quot; 等价于 &quot;1 2 3&quot;（传递了一个参数），而 &quot;@&quot; 等价于 &quot;1&quot; &quot;2&quot; &quot;3&quot;（传递了三个参数）。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-- \\<span class="token variable">$*</span> 演示 ---&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;-- \\<span class="token variable">$@</span> 演示 ---&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>

-- <span class="token variable">$*</span> 演示 ---
<span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
-- <span class="token variable">$@</span> 演示 ---
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function N(S,I){const t=l("ExternalLinkIcon"),i=l("CommentService");return p(),c("div",null,[r,s("p",null,[n("关联数组使用 "),s("strong",null,[s("a",u,[n("declare"),a(t)])]),n(" 命令来声明，语法格式如下："),v]),b,s("table",null,[k,s("tbody",null,[m,h,g,f,y,s("tr",null,[q,s("td",x,[n("显示Shell使用的当前选项，与"),s("a",$,[n("set命令"),a(t)]),n("功能相同。")])]),w])]),_,a(i)])}const A=o(d,[["render",N],["__file","shell脚本.html.vue"]]);export{A as default};
