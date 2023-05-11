<template><div><h1 id="常用apis" tabindex="-1"><a class="header-anchor" href="#常用apis" aria-hidden="true">#</a> 常用APIs</h1>
<h2 id="文件操作相关" tabindex="-1"><a class="header-anchor" href="#文件操作相关" aria-hidden="true">#</a> 文件操作相关</h2>
<h3 id="fs-existsync" tabindex="-1"><a class="header-anchor" href="#fs-existsync" aria-hidden="true">#</a> fs.existSync</h3>
<p>判断文件是否存在</p>
<p><strong>fs.exists已经废弃</strong>：-》 可使用<a href="https://www.nodeapp.cn/fs.html#fs_fs_stat_path_callback" target="_blank" rel="noopener noreferrer"><code v-pre>fs.stat()</code><ExternalLinkIcon/></a> 或 <a href="https://www.nodeapp.cn/fs.html#fs_fs_access_path_mode_callback" target="_blank" rel="noopener noreferrer"><code v-pre>fs.access()</code><ExternalLinkIcon/></a>替代</p>
<p>同步方式判断路径是否存在</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>fs<span class="token punctuation">.</span><span class="token function">existSync</span><span class="token punctuation">(</span>path<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token builtin">boolean</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="写入文件" tabindex="-1"><a class="header-anchor" href="#写入文件" aria-hidden="true">#</a> 写入文件</h3>
<h4 id="fs-appendfile和fs-appendfilesync" tabindex="-1"><a class="header-anchor" href="#fs-appendfile和fs-appendfilesync" aria-hidden="true">#</a> fs.appendFile和fs.appendFileSync</h4>
<p>追加数据到一个文件，如果文件不存在则创建文件。 <code v-pre>data</code> 可以是一个字符串或 <a href="https://www.nodeapp.cn/buffer.html#buffer_buffer" target="_blank" rel="noopener noreferrer"><code v-pre>Buffer</code><ExternalLinkIcon/></a>。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Tfile</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> buffer <span class="token operator">|</span> url <span class="token operator">|</span> <span class="token builtin">number</span>文件名或文件描述符
<span class="token keyword">type</span> <span class="token class-name">TOptions</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    encoding<span class="token operator">:</span><span class="token builtin">string</span>  默认为uft<span class="token operator">-</span><span class="token number">8</span><span class="token punctuation">,</span>
    mode<span class="token operator">:</span><span class="token builtin">number</span>
    flag<span class="token operator">:</span><span class="token builtin">string</span> 默认为a
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">TCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span>err<span class="token operator">:</span>Error<span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span>
fs<span class="token punctuation">.</span>appendFile<span class="token operator">:</span><span class="token punctuation">(</span>file<span class="token operator">:</span>Tfile<span class="token punctuation">,</span>data<span class="token operator">:</span><span class="token builtin">string</span><span class="token operator">|</span>buffer<span class="token punctuation">,</span>options<span class="token operator">:</span>TOptions<span class="token punctuation">,</span><span class="token function-variable function">callback</span><span class="token operator">:</span>TCallback<span class="token operator">=></span><span class="token keyword">void</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="fs-writefile" tabindex="-1"><a class="header-anchor" href="#fs-writefile" aria-hidden="true">#</a> fs.writeFile</h4>
<p>异步地写入数据到文件，如果文件已经存在，则替代文件。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>file <span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Buffer<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token constant">URL</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>integer<span class="token operator">></span> 文件名或文件描述符
data <span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Buffer<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Uint8Array<span class="token operator">></span>
options <span class="token operator">&lt;</span>Object<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>string<span class="token operator">></span>
	encoding <span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">></span> 默认 <span class="token operator">=</span> <span class="token string">'utf8'</span>
	mode <span class="token operator">&lt;</span>integer<span class="token operator">></span> 默认 <span class="token operator">=</span> <span class="token number">0o666</span>
	flag <span class="token operator">&lt;</span>string<span class="token operator">></span> 默认 <span class="token operator">=</span> <span class="token string">'w'</span>
callback <span class="token operator">&lt;</span>Function<span class="token operator">></span>
	err <span class="token operator">&lt;</span>Error<span class="token operator">></span>
fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">'message.txt'</span><span class="token punctuation">,</span> <span class="token string">'Hello Node.js'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'The file has been saved!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="读取文件内容" tabindex="-1"><a class="header-anchor" href="#读取文件内容" aria-hidden="true">#</a> 读取文件内容</h3>
<p>fs.readFile</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>path <span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Buffer<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token constant">URL</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>integer<span class="token operator">></span> 文件名或文件描述符。
options <span class="token operator">&lt;</span>Object<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span>
	encoding <span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">></span> 默认为 <span class="token keyword">null</span>。
	flag <span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> 默认为 <span class="token string">'r'</span>。
callback <span class="token operator">&lt;</span><span class="token builtin">Function</span><span class="token operator">></span>
	err <span class="token operator">&lt;</span>Error<span class="token operator">></span>
	data <span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Buffer<span class="token operator">></span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">'./docs/README.md'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> encoding<span class="token operator">:</span> <span class="token string">'utf-8'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>注意：当 <code v-pre>path</code> 是一个目录时，<code v-pre>fs.readFile()</code> 与 <a href="https://www.nodeapp.cn/fs.html#fs_fs_readfilesync_path_options" target="_blank" rel="noopener noreferrer"><code v-pre>fs.readFileSync()</code><ExternalLinkIcon/></a> 的行为与平台有关。 在 macOS、Linux 与 Windows 上，会返回一个错误。 在 FreeBSD 上，会返回目录内容的表示。</p>
</div>
<h3 id="删除文件夹rmdir" tabindex="-1"><a class="header-anchor" href="#删除文件夹rmdir" aria-hidden="true">#</a> 删除文件夹rmdir</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>fs<span class="token punctuation">.</span><span class="token function">rmdir</span><span class="token punctuation">(</span><span class="token string">'./docs/test'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>如果文件夹不为空会报错</p>
</div>
<h3 id="删除文件unlink" tabindex="-1"><a class="header-anchor" href="#删除文件unlink" aria-hidden="true">#</a> 删除文件unlink</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>fs<span class="token punctuation">.</span><span class="token function">unlink</span><span class="token punctuation">(</span><span class="token string">'./docs/test/a.txt'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fs-stat和fs-statsync-path" tabindex="-1"><a class="header-anchor" href="#fs-stat和fs-statsync-path" aria-hidden="true">#</a> fs.stat和fs.statSync(path)</h3>
<p><strong>不建议在调用 <code v-pre>fs.open()</code> 、<code v-pre>fs.readFile()</code> 或 <code v-pre>fs.writeFile()</code> 之前使用 <code v-pre>fs.stat()</code> 检查一个文件是否存在。 作为替代，用户代码应该直接打开/读取/写入文件，当文件无效时再处理错误。</strong></p>
<p>同步方法和异步区别在于同步会返回stats的实例对象，而异步回调中的第二个参数是stat实例，该实例保存了文件的一些状态信息</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> stat <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">stat</span><span class="token punctuation">(</span><span class="token string">'./.gitignore'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> stats<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> stats<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">null</span> Stats <span class="token punctuation">{</span>
  dev<span class="token operator">:</span> <span class="token number">2891526651</span><span class="token punctuation">,</span>
  mode<span class="token operator">:</span> <span class="token number">33206</span><span class="token punctuation">,</span>
  nlink<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  uid<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  gid<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  rdev<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  blksize<span class="token operator">:</span> <span class="token number">4096</span><span class="token punctuation">,</span>
  ino<span class="token operator">:</span> <span class="token number">4503599628157816</span><span class="token punctuation">,</span>
  size<span class="token operator">:</span> <span class="token number">78</span><span class="token punctuation">,</span>
  blocks<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  atimeMs<span class="token operator">:</span> <span class="token number">1683456296034.1301</span><span class="token punctuation">,</span>
  mtimeMs<span class="token operator">:</span> <span class="token number">1683456296034.1301</span><span class="token punctuation">,</span>
  ctimeMs<span class="token operator">:</span> <span class="token number">1683456296034.1301</span><span class="token punctuation">,</span>
  birthtimeMs<span class="token operator">:</span> <span class="token number">1683378981654.4216</span><span class="token punctuation">,</span>
  atime<span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">05</span><span class="token operator">-</span>07T10<span class="token operator">:</span><span class="token number">44</span><span class="token operator">:</span><span class="token number">56</span><span class="token punctuation">.</span>034Z<span class="token punctuation">,</span>
  mtime<span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">05</span><span class="token operator">-</span>07T10<span class="token operator">:</span><span class="token number">44</span><span class="token operator">:</span><span class="token number">56</span><span class="token punctuation">.</span>034Z<span class="token punctuation">,</span>
  ctime<span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">05</span><span class="token operator">-</span>07T10<span class="token operator">:</span><span class="token number">44</span><span class="token operator">:</span><span class="token number">56</span><span class="token punctuation">.</span>034Z<span class="token punctuation">,</span>
  birthtime<span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">05</span><span class="token operator">-</span>06T13<span class="token operator">:</span><span class="token number">16</span><span class="token operator">:</span><span class="token number">21</span><span class="token punctuation">.</span>654Z
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fs-readdir" tabindex="-1"><a class="header-anchor" href="#fs-readdir" aria-hidden="true">#</a> fs.readdir</h3>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>异步读取文件夹下的内容，如果路径不存在files为undefined err是错误信息</p>
</div>
<hr>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">readdir</span><span class="token punctuation">(</span>path<span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">,</span> callback<span class="token punctuation">)</span>
options<span class="token operator">:</span><span class="token punctuation">{</span>
    encoding<span class="token operator">:</span><span class="token builtin">string</span> 默认utf<span class="token operator">-</span><span class="token number">8</span>
<span class="token punctuation">}</span>
<span class="token function-variable function">callback</span><span class="token operator">:</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span>files<span class="token punctuation">)</span><span class="token operator">=></span><span class="token keyword">void</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>readdirSync</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>同步读取文件夹下的内容，如果该路径不存在会报错，返回值是读取结果</p>
</div>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">readdirSync</span><span class="token punctuation">(</span>path<span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">)</span>：<span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="fs-rename" tabindex="-1"><a class="header-anchor" href="#fs-rename" aria-hidden="true">#</a> fs.rename</h3>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>异步更改文件名</p>
</div>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">rename</span><span class="token punctuation">(</span>oldPath：<span class="token builtin">string</span><span class="token punctuation">,</span> newPath<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token function-variable function">callback</span><span class="token operator">:</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token operator">=></span><span class="token keyword">void</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>renameSync同步更改文件名</p>
</div>
<h3 id="常见的error-code的错误" tabindex="-1"><a class="header-anchor" href="#常见的error-code的错误" aria-hidden="true">#</a> 常见的error code的错误</h3>
<ul>
<li><code v-pre>EACCES</code> (拒绝访问): 试图以被一个文件的访问权限禁止的方式访问一个文件。</li>
<li><code v-pre>EADDRINUSE</code> (地址已被使用): 试图绑定一个服务器（[<code v-pre>net</code>]、[<code v-pre>http</code>] 或 [<code v-pre>https</code>]）到本地地址，但因另一个本地系统的服务器已占用了该地址而导致失败。</li>
<li><code v-pre>ECONNREFUSED</code> (连接被拒绝): 无法连接，因为目标机器积极拒绝。 这通常是因为试图连接到外部主机上的废弃的服务。</li>
<li><code v-pre>ECONNRESET</code> (连接被重置): 一个连接被强行关闭。 这通常是因为连接到远程 socket 超时或重启。 常发生于 [<code v-pre>http</code>] 和 [<code v-pre>net</code>] 模块。</li>
<li><code v-pre>EEXIST</code> (文件已存在): 一个操作的目标文件已存在，而要求目标不存在。</li>
<li><code v-pre>EISDIR</code> (是一个目录): 一个操作要求一个文件，但给定的路径是一个目录。</li>
<li><code v-pre>EMFILE</code> (系统打开了太多文件): 已达到系统<a href="https://en.wikipedia.org/wiki/File_descriptor" target="_blank" rel="noopener noreferrer">文件描述符<ExternalLinkIcon/></a>允许的最大数量，且描述符的请求不能被满足直到至少关闭其中一个。 当一次并行打开多个文件时会发生这个错误，尤其是在进程的文件描述限制数量较低的操作系统（如 macOS）。 要解决这个限制，可在运行 Node.js 进程的同一 shell 中运行 <code v-pre>ulimit -n 2048</code>。</li>
<li><code v-pre>ENOENT</code> (无此文件或目录): 通常是由 [<code v-pre>fs</code>] 操作引起的，表明指定的路径不存在，即给定的路径找不到文件或目录。</li>
<li><code v-pre>ENOTDIR</code> (不是一个目录): 给定的路径虽然存在，但不是一个目录。 通常是由 [<code v-pre>fs.readdir</code>] 引起的。</li>
<li><code v-pre>ENOTEMPTY</code> (目录非空): 一个操作的目标是一个非空的目录，而要求的是一个空目录。 通常是由 [<code v-pre>fs.unlink</code>] 引起的。</li>
<li><code v-pre>EPERM</code> (操作不被允许): 试图执行一个需要更高权限的操作。</li>
<li><code v-pre>EPIPE</code> (管道损坏): 写入一个管道、socket 或 FIFO 时没有进程读取数据。 常见于 [<code v-pre>net</code>] 和 [<code v-pre>http</code>] 层，表明远端要写入的流已被关闭。</li>
<li><code v-pre>ETIMEDOUT</code> (操作超时): 一个连接或发送的请求失败，因为连接方在一段时间后没有做出合适的响应。 常见于 [<code v-pre>http</code>] 或 [<code v-pre>net</code>]。 往往标志着 <code v-pre>socket.end()</code> 没有被正确地调用。</li>
</ul>
<h3 id="监听文件或目录watch-filename-options-listener" tabindex="-1"><a class="header-anchor" href="#监听文件或目录watch-filename-options-listener" aria-hidden="true">#</a> 监听文件或目录watch(filename[, options][, listener])</h3>
<p>监视 <code v-pre>filename</code> 的变化，<code v-pre>filename</code> 可以是一个文件或一个目录。 返回的对象是一个 <a href="https://www.nodeapp.cn/fs.html#fs_class_fs_fswatcher" target="_blank" rel="noopener noreferrer"><code v-pre>fs.FSWatcher</code><ExternalLinkIcon/></a>。</p>
<p>第二个参数是可选的。 如果提供的 <code v-pre>options</code> 是一个字符串，则它指定了 <code v-pre>encoding</code>。 否则 <code v-pre>options</code> 应该以一个对象传入。</p>
<p>监听器回调有两个参数 <code v-pre>(eventType, filename)</code>。 <code v-pre>eventType</code> 可以是 <code v-pre>'rename'</code> 或 <code v-pre>'change'</code>，<code v-pre>filename</code> 是触发事件的文件的名称。</p>
<p>注意，在大多数平台，当一个文件出现或消失在一个目录里时，<code v-pre>'rename'</code> 会被触发。</p>
<p>还需要注意，监听器回调是绑定在由 <a href="https://www.nodeapp.cn/fs.html#fs_class_fs_fswatcher" target="_blank" rel="noopener noreferrer"><code v-pre>fs.FSWatcher</code><ExternalLinkIcon/></a> 触发的 <code v-pre>'change'</code> 事件上，但它跟 <code v-pre>eventType</code> 的 <code v-pre>'change'</code> 值不是同一个东西。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>filename <span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Buffer<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token constant">URL</span><span class="token operator">></span>
options <span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Object<span class="token operator">></span>
	persistent <span class="token operator">&lt;</span>boolean<span class="token operator">></span> 指明如果文件正在被监视，进程是否应该继续运行。默认 <span class="token operator">=</span> <span class="token boolean">true</span>
	recursive <span class="token operator">&lt;</span>boolean<span class="token operator">></span> 指明是否全部子目录应该被监视，或只是当前目录。 适用于当一个目录被指定时，且只在支持的平台（详见 Caveats）。默认 <span class="token operator">=</span> <span class="token boolean">false</span>
	encoding <span class="token operator">&lt;</span>string<span class="token operator">></span> 指定用于传给监听器的文件名的字符编码。默认 <span class="token operator">=</span> <span class="token string">'utf8'</span>
listener <span class="token operator">&lt;</span>Function<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span><span class="token keyword">undefined</span><span class="token operator">></span> Default<span class="token operator">:</span> <span class="token keyword">undefined</span>
	eventType <span class="token operator">&lt;</span>string<span class="token operator">></span>
	filename <span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">|</span> <span class="token operator">&lt;</span>Buffer<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> exec <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span>


<span class="token keyword">const</span> <span class="token function-variable function">uploadToServer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> originPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'./docs/.vuepress/dist'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> targetPath <span class="token operator">=</span> <span class="token string">'/data/my_docs/'</span>

    <span class="token keyword">const</span> serverUserName <span class="token operator">=</span> <span class="token string">'root'</span>
    <span class="token keyword">const</span> server_IP <span class="token operator">=</span> <span class="token string">'43.138.53.141:'</span>
    <span class="token keyword">const</span> command <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">scp -r </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>originPath<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>serverUserName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">@</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>server_IP<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>targetPath<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token string">'命令开始执行----------'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> ls <span class="token operator">=</span> <span class="token function">exec</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">shell</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">cwd</span><span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">错误</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>err<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>stderr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">运行错误</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>stderr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token string">'命令执行完成-------------'</span><span class="token punctuation">)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stdout<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//当文件发生变化（新增删除修改 rename change）都会触发回调的执行</span>
<span class="token keyword">const</span> <span class="token function-variable function">watchDist</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dirPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'./docs/.vuepress/dist'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
    fs<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span>dirPath<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">recursive</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">eventType<span class="token punctuation">,</span> filename</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 防止重复调用</span>
        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
            <span class="token function">uploadToServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
<span class="token function">watchDist</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="子进程child-process" tabindex="-1"><a class="header-anchor" href="#子进程child-process" aria-hidden="true">#</a> 子进程child_process</h2>
<h3 id="exec" tabindex="-1"><a class="header-anchor" href="#exec" aria-hidden="true">#</a> exec</h3>
<p><strong>创建异步进程</strong></p>
<ol>
<li>参数command
<ul>
<li><code v-pre>command</code> 运行的命令，参数使用空格分隔。</li>
</ul>
</li>
<li>options
<ul>
<li>cwd 子进程的当前工作目录。</li>
<li><code v-pre>shell</code> 执行命令的 shell。在 UNIX 上默认为 <code v-pre>'/bin/sh'</code>，在 Windows 上默认为 <code v-pre>process.env.ComSpec</code>。</li>
<li><code v-pre>timeout</code>默认为 <code v-pre>0</code>。</li>
<li><code v-pre>maxBuffer</code> <code v-pre>stdout</code> 或 <code v-pre>stderr</code> 允许的最大字节数。默认为 <code v-pre>200*1024</code>。如果超过限制，则子进程会被终止。详见 <a href="https://www.nodeapp.cn/child_process.html#child_process_maxbuffer_and_unicode" target="_blank" rel="noopener noreferrer"><code v-pre>maxBuffer</code>与Unicode<ExternalLinkIcon/></a>。</li>
<li><code v-pre>windowsHide</code>  隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 <code v-pre>false</code>。</li>
</ul>
</li>
<li>callback回调 - - 进程终止时调用。
<ul>
<li><code v-pre>error</code> <strong>成功时error为null</strong></li>
<li><code v-pre>stdout</code> <code v-pre>stderr </code>传给回调的<code v-pre>stdout</code> 和 <code v-pre>stderr</code> 参数会包含子进程的 <code v-pre>stdout</code> 和 <code v-pre>stderr</code> 的输出。 默认情况下，Node.js 会解码输出为 UTF-8，并将字符串传给回调。 <code v-pre>encoding</code> 选项可用于指定用于解码 <code v-pre>stdout</code> 和 <code v-pre>stderr</code> 输出的字符编码。</li>
</ul>
</li>
<li>函数返回值为子进程</li>
</ol>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> exec <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'child_process'</span>
<span class="token keyword">const</span> child_process <span class="token operator">=</span> <span class="token function">exec</span><span class="token punctuation">(</span>command<span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">,</span> callback<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> my_typora_path <span class="token operator">=</span> <span class="token string">'D:\\typora安装\\Typora\\Typora.exe'</span>
运行typora<span class="token punctuation">.</span>exe 文件并打开指定md文件
<span class="token keyword">const</span> <span class="token function-variable function">exec_typora</span> <span class="token operator">=</span> <span class="token punctuation">(</span>md_file<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">||</span> <span class="token operator">!</span>my_typora_path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> typora_path <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span>my_typora_path<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fs<span class="token punctuation">.</span><span class="token function">existsSync</span><span class="token punctuation">(</span>typora_path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    md_file <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span>md_file<span class="token punctuation">)</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>md_file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exec</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>typora_path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>md_file<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stdout<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">exec_typora</span><span class="token punctuation">(</span><span class="token string">'xxx.md'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="spawn" tabindex="-1"><a class="header-anchor" href="#spawn" aria-hidden="true">#</a> spawn</h3>
<ul>
<li><code v-pre>modulePath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" target="_blank" rel="noopener noreferrer"><ExternalLinkIcon/></a> 要在子进程中运行的模块。</li>
<li><code v-pre>args</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener noreferrer"><ExternalLinkIcon/></a> 字符串参数列表。</li>
<li>options
<ul>
<li><code v-pre>cwd</code> 子进程的当前工作目录。</li>
<li><code v-pre>env</code>环境变量键值对。</li>
<li><code v-pre>execPath</code>  用来创建子进程的执行路径。</li>
<li><code v-pre>execArgv</code>  要传给执行路径的字符串参数列表。默认为 <code v-pre>process.execArgv</code>。</li>
<li><code v-pre>silent</code> 如果为 <code v-pre>true</code>，则子进程中的 stdin、 stdout 和 stderr 会被导流到父进程中，否则它们会继承自父进程，详见 [<code v-pre>child_process.spawn()</code>] 的 [<code v-pre>stdio</code>] 中的 <code v-pre>'pipe'</code> 和 <code v-pre>'inherit'</code> 选项。 默认: <code v-pre>false</code>。</li>
<li><code v-pre>stdio</code> 详见 [<code v-pre>child_process.spawn()</code>] 的 [<code v-pre>stdio</code>]。 当提供了该选项，则它会覆盖 <code v-pre>silent</code>。 如果使用了数组变量，则该数组必须包含一个值为 <code v-pre>'ipc'</code> 的子项，否则会抛出错误。 例如 <code v-pre>[0, 1, 2, 'ipc']</code>。</li>
<li><code v-pre>windowsVerbatimArguments</code> 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略。<strong>默认值:</strong> <code v-pre>false</code>。</li>
<li><code v-pre>uid</code> 设置该进程的用户标识。（详见 <a href="http://man7.org/linux/man-pages/man2/setuid.2.html" target="_blank" rel="noopener noreferrer">setuid(2)<ExternalLinkIcon/></a>）</li>
<li><code v-pre>gid</code> 设置该进程的组标识。（详见 <a href="http://man7.org/linux/man-pages/man2/setgid.2.html" target="_blank" rel="noopener noreferrer">setgid(2)<ExternalLinkIcon/></a>）</li>
<li><code v-pre>shell</code> 如果为 <code v-pre>true</code>，则在一个 shell 中运行 <code v-pre>command</code>。 在 UNIX 上使用 <code v-pre>'/bin/sh'</code>，在 Windows 上使用 <code v-pre>process.env.ComSpec</code>。 一个不同的 shell 可以被指定为字符串。 See [Shell Requirements][] and [Default Windows Shell][]. 默认为 <code v-pre>false</code>（没有 shell）。</li>
</ul>
</li>
<li>返回值<code v-pre>ChildProcess</code></li>
</ul>
<p><code v-pre>child_process.fork()</code> 方法是 [<code v-pre>child_process.spawn()</code>] 的一个特殊情况，专门用于衍生新的 Node.js 进程。 跟 [<code v-pre>child_process.spawn()</code>] 一样返回一个 [<code v-pre>ChildProcess</code>] 对象。 返回的 [<code v-pre>ChildProcess</code>] 会有一个额外的内置的通信通道，它允许消息在父进程和子进程之间来回传递。 详见 [<code v-pre>subprocess.send()</code>]。</p>
<p>衍生的 Node.js 子进程与两者之间建立的 IPC 通信信道的异常是独立于父进程的。 每个进程都有自己的内存，使用自己的 V8 实例。 由于需要额外的资源分配，因此不推荐衍生大量的 Node.js 进程。</p>
<p>默认情况下，<code v-pre>child_process.fork()</code> 会使用父进程中的 [<code v-pre>process.execPath</code>] 衍生新的 Node.js 实例。 <code v-pre>options</code> 对象中的 <code v-pre>execPath</code> 属性可以替换要使用的执行路径。</p>
<p>使用自定义的 <code v-pre>execPath</code> 启动的 Node.js 进程，会使用子进程的环境变量 <code v-pre>NODE_CHANNEL_FD</code> 中指定的文件描述符（fd）与父进程通信。</p>
<p>注意，不像 POSIX 系统回调中的 <a href="http://man7.org/linux/man-pages/man2/fork.2.html" target="_blank" rel="noopener noreferrer">fork(2)<ExternalLinkIcon/></a>，<code v-pre>child_process.fork()</code> 不会克隆当前进程。</p>
<p>提示: 在使用<code v-pre>child_process.fork()</code> 产生的子进程内，使用 [<code v-pre>child_process.spawn()</code>][] 会自动忽略掉其中的<code v-pre>shell</code> 配置选项并不会生效。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> spawn <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ls <span class="token operator">=</span> <span class="token function">spawn</span><span class="token punctuation">(</span><span class="token string">'pnpm'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'-h'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    cwd<span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    shell<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ls<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">stdout: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ls<span class="token punctuation">.</span>stderr<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">stderr: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ls<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'启动子进程失败。'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ls<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'close'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>code<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">子进程退出码：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stdio参数的配置" tabindex="-1"><a class="header-anchor" href="#stdio参数的配置" aria-hidden="true">#</a> stdio参数的配置</h3>
<p><code v-pre>options.stdio</code> 选项用于配置子进程与父进程之间建立的管道。 默认情况下，子进程的 stdin、 stdout 和 stderr 会重定向到 [<code v-pre>ChildProcess</code>] 对象上相应的 [<code v-pre>subprocess.stdin</code>]、 [<code v-pre>subprocess.stdout</code>] 和 [<code v-pre>subprocess.stderr</code>] 流。 这等同于将 <code v-pre>options.stdio</code> 设为 <code v-pre>['pipe', 'pipe', 'pipe']</code>。</p>
<p>为了方便起见，<code v-pre>options.stdio</code> 可以是以下字符串之一：</p>
<ul>
<li><code v-pre>'pipe'</code> - 等同于 <code v-pre>['pipe', 'pipe', 'pipe']</code> （默认）</li>
<li><code v-pre>'ignore'</code> - 等同于 <code v-pre>['ignore', 'ignore', 'ignore']</code></li>
<li><code v-pre>'inherit'</code> - 等同于 <code v-pre>[process.stdin, process.stdout, process.stderr]</code> 或 <code v-pre>[0,1,2]</code></li>
</ul>
<p>另外，<code v-pre>option.stdio</code> 的值是一个每个索引都对应一个子进程 fd 的数组。 fd 的 0、1 和 2 分别对应 stdin、stdout 和 stderr。 额外的 fd 可以被指定来创建父进程和子进程之间的额外管道。 该值是以下之一：</p>
<ol>
<li><code v-pre>'pipe'</code> - 创建一个子进程和父进程之间的管道。 在管道的父端以 [<code v-pre>subprocess.stdio[fd]</code>][<code v-pre>stdio</code>] 的形式作为 <code v-pre>child_process</code> 对象的一个属性暴露给父进程。 为 fd 创建的管道 0 - 2 也可分别作为 [<code v-pre>subprocess.stdin</code>]、[<code v-pre>subprocess.stdout</code>] 和 [<code v-pre>subprocess.stderr</code>]。</li>
<li><code v-pre>'ipc'</code> - 创建一个用于父进程和子进程之间传递消息或文件描述符的 IPC 通道符。 一个 [<code v-pre>ChildProcess</code>] 最多只能有一个 IPC stdio 文件描述符。 设置该选项可启用 [<code v-pre>subprocess.send()</code>] 方法。 如果子进程是一个 Node.js 进程，则一个已存在的 IPC 通道会在子进程中启用 [<code v-pre>process.send()</code>]、[<code v-pre>process.disconnect()</code>]、[<code v-pre>process.on('disconnect')</code>] 和 [<code v-pre>process.on('message')</code>]。</li>
<li><code v-pre>'ignore'</code> - 指示 Node.js 在子进程中忽略 fd。 由于 Node.js 总是会为它衍生的进程打开 fd 0 - 2，所以设置 fd 为 <code v-pre>'ignore'</code> 可以使 Node.js 打开 <code v-pre>/dev/null</code> 并将它附加到子进程的 fd 上。</li>
<li>对象 - 共享一个指向子进程的 tty、文件、socket 或管道的可读或可写流。 流的底层文件描述符在子进程中是重复对应该 <code v-pre>stdio</code> 数组的索引的 fd。 注意，该流必须有一个底层描述符（文件流直到 <code v-pre>'open'</code> 事件发生才需要）。</li>
<li>正整数 - 整数值被解析为一个正在父进程中打开的文件描述符。 它和子进程共享，类似于  是如何被共享的。</li>
<li><code v-pre>null</code>, <code v-pre>undefined</code> - 使用默认值。 对于 stdio fd 0、1 和 2（换言之，stdin、stdout 和 stderr）而言是创建了一个管道。 对于 fd 3 及以上而言，默认值为 <code v-pre>'ignore'</code>。</li>
</ol>
<p>例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> spawn <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 子进程使用父进程的 stdios</span>
<span class="token function">spawn</span><span class="token punctuation">(</span><span class="token string">'prg'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">stdio</span><span class="token operator">:</span> <span class="token string">'inherit'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 衍生的子进程只共享 stderr</span>
<span class="token function">spawn</span><span class="token punctuation">(</span><span class="token string">'prg'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">stdio</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'pipe'</span><span class="token punctuation">,</span> <span class="token string">'pipe'</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>stderr<span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 打开一个额外的 fd=4，用于与程序交互</span>
<span class="token function">spawn</span><span class="token punctuation">(</span><span class="token string">'prg'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">stdio</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'pipe'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">'pipe'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当在父进程和子进程之间建立了一个 IPC 通道，且子进程是一个 Node.js 进程，则子进程会带着未引用的 IPC 通道（使用 <code v-pre>unref()</code>）启动，直到子进程为 [<code v-pre>process.on('disconnect')</code>] 事件或 [<code v-pre>process.on('message')</code>] 事件注册了一个事件句柄。 这使得子进程可以在进程没有通过打开的 IPC 通道保持打开的情况下正常退出。</p>
<p>详见 [<code v-pre>child_process.exec()</code>] 和 [<code v-pre>child_process.fork()</code>]。</p>
<h2 id="路径" tabindex="-1"><a class="header-anchor" href="#路径" aria-hidden="true">#</a> 路径</h2>
<h3 id="规范化路径normalize-path" tabindex="-1"><a class="header-anchor" href="#规范化路径normalize-path" aria-hidden="true">#</a> 规范化路径normalize(path)</h3>
<p><code v-pre>path.normalize()</code> 方法会规范化给定的 <code v-pre>path</code>，并解析 <code v-pre>'..'</code> 和 <code v-pre>'.'</code> 片段。</p>
<p>当发现多个连续的路径分隔符时（如 POSIX 上的 <code v-pre>/</code> 与 Windows 上的 <code v-pre>\</code> 或 <code v-pre>/</code>），它们会被单个的路径分隔符（POSIX 上是 <code v-pre>/</code>，Windows 上是 <code v-pre>\</code>）替换。 末尾的多个分隔符会被保留。</p>
<p>如果 <code v-pre>path</code> 是一个长度为零的字符串，则返回 <code v-pre>'.'</code>，表示当前工作目录。</p>
<h3 id="计算相对路径relative-from-to" tabindex="-1"><a class="header-anchor" href="#计算相对路径relative-from-to" aria-hidden="true">#</a> 计算相对路径relative(from, to)</h3>
<p><code v-pre>path.relative()</code> 方法返回从 <code v-pre>from</code> 到 <code v-pre>to</code> 的相对路径（基于当前工作目录）。 如果 <code v-pre>from</code> 和 <code v-pre>to</code> 各自解析到同一路径（调用 <code v-pre>path.resolve()</code>），则返回一个长度为零的字符串。</p>
<p>如果 <code v-pre>from</code> 或 <code v-pre>to</code> 传入了一个长度为零的字符串，则当前工作目录会被用于代替长度为零的字符串。</p>
<h3 id="解析路径resolve-paths" tabindex="-1"><a class="header-anchor" href="#解析路径resolve-paths" aria-hidden="true">#</a> 解析路径resolve([...paths])</h3>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<ol>
<li>如果处理完全部给定的 <code v-pre>path</code> 片段后还未生成一个绝对路径，则当前工作目录会被用上</li>
<li>如果没有传入 <code v-pre>path</code> 片段，则 <code v-pre>path.resolve()</code> 会返回当前工作目录的绝对路径。</li>
</ol>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'/foo/bar'</span><span class="token punctuation">,</span> <span class="token string">'./baz'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: '/foo/bar/baz'</span>

path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'/foo/bar'</span><span class="token punctuation">,</span> <span class="token string">'/tmp/file/'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: '/tmp/file'</span>

path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'wwwroot'</span><span class="token punctuation">,</span> <span class="token string">'static_files/png/'</span><span class="token punctuation">,</span> <span class="token string">'../gif/image.gif'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 如果当前工作目录为 /home/myself/node，</span>
<span class="token comment">// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="取路径最后一部分basename-path-ext" tabindex="-1"><a class="header-anchor" href="#取路径最后一部分basename-path-ext" aria-hidden="true">#</a> 取路径最后一部分basename(path[, ext])</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>path<span class="token punctuation">.</span><span class="token function">basename</span><span class="token punctuation">(</span><span class="token string">'/foo/bar/baz/asdf/quux.html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: 'quux.html'</span>

path<span class="token punctuation">.</span><span class="token function">basename</span><span class="token punctuation">(</span><span class="token string">'/foo/bar/baz/asdf/quux.html'</span><span class="token punctuation">,</span> <span class="token string">'.html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: 'quux'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取路径扩展名" tabindex="-1"><a class="header-anchor" href="#获取路径扩展名" aria-hidden="true">#</a> 获取路径扩展名</h3>
<p><code v-pre>path.extname()</code> 方法返回 <code v-pre>path</code> 的扩展名，即从 <code v-pre>path</code> 的最后一部分中的最后一个 <code v-pre>.</code>（句号）字符到字符串结束。 如果 <code v-pre>path</code> 的最后一部分没有 <code v-pre>.</code> 或 <code v-pre>path</code> 的文件名（见 <code v-pre>path.basename()</code>）的第一个字符是 <code v-pre>.</code>，则返回一个空字符串。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token string">'index.html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: '.html'</span>

path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token string">'index.coffee.md'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: '.md'</span>

path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token string">'index.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: '.'</span>

path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token string">'index'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: ''</span>

path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token string">'.index'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: ''</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拼接路径片段join-paths" tabindex="-1"><a class="header-anchor" href="#拼接路径片段join-paths" aria-hidden="true">#</a> 拼接路径片段join([...paths])</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token string">'baz/asdf'</span><span class="token punctuation">,</span> <span class="token string">'quux'</span><span class="token punctuation">,</span> <span class="token string">'..'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回: '/foo/bar/baz/asdf'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


