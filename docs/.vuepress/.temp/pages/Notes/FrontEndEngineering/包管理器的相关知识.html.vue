<template><div><h1 id="包管理器的相关知识" tabindex="-1"><a class="header-anchor" href="#包管理器的相关知识" aria-hidden="true">#</a> 包管理器的相关知识</h1>
<h2 id="npm、yarn、pnpm" tabindex="-1"><a class="header-anchor" href="#npm、yarn、pnpm" aria-hidden="true">#</a> npm、yarn、pnpm</h2>
<h3 id="_1、npm-run-发生了什么" tabindex="-1"><a class="header-anchor" href="#_1、npm-run-发生了什么" aria-hidden="true">#</a> 1、npm run 发生了什么</h3>
<ol>
<li>
<p>当我们控制台执行npm run dev/server时，会先去package.json文件中找script对应的xxx，然后执行其对应的命令</p>
<ol>
<li>由于操作系统中不存在 对应的命令 例如 vue-cli-service，因此我们无法直接执行script对应xxx后面的命令</li>
</ol>
</li>
<li>
<p>我们在安装依赖的时候，是通过<code v-pre>npm i xxx</code> 来执行的，例如 <code v-pre>npm i @vue/cli-service</code>，npm 在 安装这个依赖的时候，就会<code v-pre>node_modules/.bin/</code> 目录中创建 好<code v-pre>vue-cli-service</code> 为名的几个可执行文件了随后会去<code v-pre>node_modules/.bin/</code>文件下寻找<code v-pre>vue-cli-service</code> 文件作为  脚本来执行，则相当于执行了 <code v-pre>./node_modules/.bin/vue-cli-service serve</code>（最后的 serve 作为参数传入）。</p>
</li>
<li>
<p>假如我们在安装包时，使用 <code v-pre>npm install -g xxx</code> 来安装，那么会将其中的 bin 文件加入到全局，比如 <code v-pre>create-react-app</code> 和 vue-cli ，在全局安装后，就可以直接使用如 <code v-pre>vue-cli projectName</code> 这样的命令来创建项目了。</p>
</li>
</ol>
<h3 id="_2、pnpm比npm、yarn好在哪" tabindex="-1"><a class="header-anchor" href="#_2、pnpm比npm、yarn好在哪" aria-hidden="true">#</a> 2、pnpm比npm、yarn好在哪</h3>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>npm2版本存在的问题</p>
</div>
<p>npm2的node_modules是嵌套的eg:下载一个express，我们打开node_modules可以看到express里也有node_modules再展开几层每个依赖都有自己的nodemodules，<strong>这样就暴漏了一个问题：多个包之间难免会有公共依赖，会占据较大的磁盘空间，而致命问题是依赖层级过深，windows文件路径最长260多个字符这样嵌套会超过windows路径的长度限制。</strong></p>
<p>现在相同的依赖会提升到最上层：例如 依赖B C 都有共同依赖A，依赖A会被提升</p>
<p>当我们运行<code v-pre>require(&quot;xxx&quot;)</code>引入外部模块时（这里不考虑直接按路径引用文件或者文件夹的情况，详细规则可以查看<a href="https://link.juejin.cn?target=https%3A%2F%2Fnodejs.org%2Fapi%2Fmodules.html%23modules_all_together" target="_blank" rel="noopener noreferrer">node官网<ExternalLinkIcon/></a>），有两种情况：</p>
<ul>
<li>如果<code v-pre>xxx</code>是一个node核心模块，例如<code v-pre>fs</code>、<code v-pre>http</code>等，那么返回node核心模块。</li>
<li>如果不是，那么会判断判断当前<code v-pre>node_modules</code> 文件夹是否有此模块，如果有就返回，如果没有就递归往上层的<code v-pre>node_modules</code>目录查找，如果找到就返回，如果到根目录都没找到就报错。</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>npm3版本存在的问题</p>
</div>
<p>npm3采用了和yarn相同的扁平化方案，只有一层nodemodules。而扁平化也有相应的问题：<strong>幽灵依赖（没有声明再dependencies的依赖但代码里却可以require进来。）造成的问题：因为没有显示依赖如果依赖B升级了A的依赖版本，或者万一某一天别的包不再依赖这个包，那我们代码就跑不起来了</strong></p>
<p>pnpm解决方案link，也就是软硬连接<strong>这是操作系统提供的机制，硬连接就是同一个文件的不同引用，而软链接是新建一个文件，文件内容指向另一个路径。当然，这俩链接使用起来是差不多的。</strong></p>
<p>从版本 3 开始， npm 维护了一个<a href="https://github.com/npm/npm/issues/6912" target="_blank" rel="noopener noreferrer">扁平的依赖关系树<ExternalLinkIcon/></a>。这会减少磁盘空间膨胀，并产生一个杂乱的<code v-pre>node_modules</code>目录作为副作用。</p>
<p>另一方面，pnpm<code v-pre>node_modules</code>通过使用硬链接和符号链接来管理全局磁盘内容可寻址存储。这为您带来了更少的磁盘空间使用量的好处，同时还保持您的 <code v-pre>node_modules</code>清洁。</p>
<p>pnpm 正确<code v-pre>node_modules</code>结构的好处是它“<a href="https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html" target="_blank" rel="noopener noreferrer">有助于避免愚蠢的错误<ExternalLinkIcon/></a>”，因为它无法使用项目中未指定的模块<code v-pre>package.json</code>。也就是解决了幽灵依赖。</p>
<h3 id="_3、lock-文件" tabindex="-1"><a class="header-anchor" href="#_3、lock-文件" aria-hidden="true">#</a> 3、lock 文件</h3>
<p>在 package.json 跟踪的依赖项和版本总是不准确的，因为 ~ ^ * 等前缀表示依赖更新时对应的版本范围。范围版本可以在更新依赖时自动升级依赖到兼容性的次要版本或者补丁版本，让软件包支持最新的功能或者修复最近的错误。所以，为了避免不同设备安装依赖时的版本不匹配的问题，在 lock 文件中定义了精确的安装版本。在每次新装（更新）依赖时，npm 和 yarn 会分别</p>
<h2 id="pnpm" tabindex="-1"><a class="header-anchor" href="#pnpm" aria-hidden="true">#</a> PNPM</h2>
<p>pnpm和yarn、npm都是包管理系统，但pnpm拥有集中存储，monrepo，依赖隔离的优点。</p>
<p>==pnpm流行的原因==：之前的包管理工具无法解决多个项目之间互相依赖，每个项目都有一个node_modules包，过多的项目会占据大量磁盘空间。并且如果项目之间有一些重复依赖，需要在B项目引用A项目的某个方法依赖，很多做法是复制代码沾到B项目，但是维护起来十分困难，一个改动都需要改动。</p>
<p>之前依赖包存在的问题：</p>
<ol>
<li>重复依赖，在之前npm yarn安装依赖时，还未采用扁平化方式处理依赖的依赖，导致文件层级嵌套太深，而在windos上文件路径最长字符限制255字符。</li>
<li>幽灵依赖，扁平化后，出现幽灵以依赖，即我们项目中可以引入依赖的依赖。</li>
<li>多个项目之间无法互相引入公共依赖，每个项目都有自己的nodemodule特别占磁盘空间，软硬连接的方式和monorepo解决 。也成为单仓多包。</li>
</ol>
<p>==pnpm依靠软连接解决幽灵依赖（依赖A中又依赖了B，如果在npm和yarn安装依赖会把依赖全部拍平，这样我们的项目中可以引入依赖B，而依赖B不是我们安装的，所以不存在package.json中，如果有一天删除了依赖A，我们项目会报错）==</p>
<p>pnpm的优点：</p>
<ol>
<li>速度快</li>
<li>高效</li>
<li>支持monorepos</li>
</ol>
<h3 id="_1-软硬链接" tabindex="-1"><a class="header-anchor" href="#_1-软硬链接" aria-hidden="true">#</a> 1.软硬链接</h3>
<p>软硬连接-》操作系统中的抽象</p>
<p><img src="/Packager/packager2.png" alt="image-20230111130943965"></p>
<ol>
<li>硬链接
<ol>
<li>电脑文件系统中多个文件平等的共享同一个文件存储单元，删除一个文件名后还可以用其他名字继续访问该文件。例如硬链接a文件为b文件，修改a文件的内容会影响b文件，b文件可以再次编辑。windows上<code v-pre>mklink new_file_name.js origin.js</code>。macos上 <code v-pre>ln new_file_name.js origin.js</code></li>
</ol>
</li>
<li>文件拷贝
<ol>
<li>文件拷贝相等于将源文件从磁盘上复制一份放到磁盘另一个地方。例如拷贝a文件为b文件，修改a文件的内容不会影响b文件</li>
</ol>
</li>
<li>软连接
<ol>
<li>包含一条绝对路径或相对路径的形式指向其他文件或目录的引用，软连接的文件无法编辑，==打开软连接的文件实际会跳转到软连接文件所指向的文件地址==，如果删除源文件，就无法打开软连接的文件了</li>
</ol>
</li>
</ol>
<h3 id="_2-pnpm-》依赖问题" tabindex="-1"><a class="header-anchor" href="#_2-pnpm-》依赖问题" aria-hidden="true">#</a> 2.pnpm-》依赖问题</h3>
<ol>
<li>问题1：在之前使用npm、yarn的时候如果100项目共同依赖同一个依赖包，那么硬盘上就会存在100份相同依赖包。<strong>而pnpm将公共依赖进行提升对不同版本的依赖进行存储，相同的依赖则只会存储一份</strong>这就是使用硬链接的方式。</li>
<li>问题2：npm和yarn采用扁平化的方式，例如npm i webpack 会将webpack依赖的包全部放到nodemodules里，我们项目中可以直接引用的到，**这就源码可以访问到不属于当前项目的依赖。**但是实际上package.json中根本没有。那pnpm采用非扁平化的方式（这种方式会造成问题1）</li>
</ol>
<p>==原理：==当我们使用一个包假设bar csont bar = require(&quot;bar&quot;)此时我们看到nodemodules中会有一个软连接，该软连接指向.pnpm中的bar@版本号下的硬链接，真实文件存放到磁盘中.pnpm store，那我们依赖包中的依赖会以软连接的方式链接.pnpm下的包，而这个包会硬链接到真实磁盘存储的位置。这种非扁平化方式避免我们使用不属于当前项目的依赖。</p>
<p><img src="/Packager/packager.png" alt=""></p>
<p><code v-pre>pnpm store path</code>可以获取当前仓库的目录</p>
<p><code v-pre>pnpm stpre prune</code>可以从store中删除从未被引用的包来释放内存</p>
<h2 id="monorepo" tabindex="-1"><a class="header-anchor" href="#monorepo" aria-hidden="true">#</a> Monorepo</h2>
<p>什么时候使用？1.多项目互相依赖时 2.功能版本之间存在强关联 3.项目中存在多个编译入口，且构建条件存在差异</p>
<p>有什么好处？ 1.能共享知识 2.降低项目管理成本</p>
<p>Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。</p>
<p><strong>阶段一：单仓库巨石应用，</strong> 一个 Git 仓库维护着项目代码，随着迭代业务复杂度的提升，项目代码会变得越来越多，越来越复杂，大量代码构建效率也会降低，最终导致了单体巨石应用，这种代码管理方式称之为 Monolith。</p>
<p><strong>阶段二：多仓库多模块应用</strong>，于是将项目拆解成多个业务模块，并在多个 Git 仓库管理，模块解耦，降低了巨石应用的复杂度，每个模块都可以独立编码、测试、发版，代码管理变得简化，构建效率也得以提升，这种代码管理方式称之为 MultiRepo。</p>
<p><strong>阶段三：单仓库多模块应用</strong>，随着业务复杂度的提升，模块仓库越来越多，MultiRepo这种方式虽然从业务上解耦了，但增加了项目工程管理的难度，随着模块仓库达到一定数量级，会有几个问题：跨仓库代码难共享；分散在单仓库的模块依赖管理复杂（底层模块升级后，其他上层依赖需要及时更新，否则有问题）；增加了构建耗时。于是将多个项目集成到一个仓库下，共享工程配置，同时又快捷地共享模块代码，成为趋势，这种代码管理方式称之为 MonoRepo。</p>
<h3 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式</h3>
<p><strong>①创建pnpm-workspace.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">packages</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> <span class="token string">'packages/*'</span>
	<span class="token punctuation">-</span> <span class="token string">'api'</span>
	<span class="token punctuation">-</span> <span class="token string">'supabase'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>②给package.json中的name命名</strong></p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
	name<span class="token operator">:</span><span class="token string">"@test"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③在别的项目中引用</strong></p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"dependencies"</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">"@test"</span><span class="token operator">:</span><span class="token string">"workspace:*"</span> <span class="token comment">//*代表当前版本</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>④安装包</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后通过命令可以查看</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ll node_modules/@test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><CommentService/></div></template>


