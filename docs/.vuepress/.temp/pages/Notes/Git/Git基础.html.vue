<template><div><h1 id="git基础" tabindex="-1"><a class="header-anchor" href="#git基础" aria-hidden="true">#</a> Git基础</h1>
<h1 id="git简介" tabindex="-1"><a class="header-anchor" href="#git简介" aria-hidden="true">#</a> Git简介</h1>
<p>Git是目前世界上最先进的分布式版本控制系统（没有之一）。</p>
<p>所有的版本控制系统，其实只能<strong>跟踪文本文件的改动</strong>，比如TXT文件，网页，所有的程序代码等等，Git也不例外。版本控制系统可以告诉你每次的改动，比如在第5行加了一个单词“Linux”，在第8行删了一个单词“Windows”。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道。</p>
<h1 id="_1-基本操作步骤" tabindex="-1"><a class="header-anchor" href="#_1-基本操作步骤" aria-hidden="true">#</a> 1.基本操作步骤</h1>
<h2 id="_1-0-生成ssh" tabindex="-1"><a class="header-anchor" href="#_1-0-生成ssh" aria-hidden="true">#</a> 1.0：生成ssh</h2>
<p>生成公钥</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将.ssh文件内的pub公钥配置到仓库中</p>
<h2 id="_1-1-git-init将改目录变成git可管理的仓库" tabindex="-1"><a class="header-anchor" href="#_1-1-git-init将改目录变成git可管理的仓库" aria-hidden="true">#</a> 1.1 ：<code v-pre>git init</code>将改目录变成git可管理的仓库</h2>
<p>当前目录下多了一个<code v-pre>.git</code>的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。</p>
<p>如果你没有看到<code v-pre>.git</code>目录，那是因为这个目录默认是隐藏的，用<code v-pre>ls -ah</code>命令就可以看见。</p>
<h2 id="_1-2-git-add将某文件添加到仓库" tabindex="-1"><a class="header-anchor" href="#_1-2-git-add将某文件添加到仓库" aria-hidden="true">#</a> 1.2:<code v-pre>git add</code>将某文件添加到仓库</h2>
<p><code v-pre>git add .</code>将所有文件添加到git 仓库</p>
<h2 id="_1-3-git-commit将文件提交到仓库" tabindex="-1"><a class="header-anchor" href="#_1-3-git-commit将文件提交到仓库" aria-hidden="true">#</a> 1.3：<code v-pre>git commit</code>将文件提交到仓库</h2>
<p>简单解释一下<code v-pre>git commit</code>命令，<code v-pre>-m</code>后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。</p>
<p>为什么Git添加文件需要<code v-pre>add</code>，<code v-pre>commit</code>一共两步呢？因为<code v-pre>commit</code>可以一次提交很多文件，所以你可以多次<code v-pre>add</code>不同的文件，比如：</p>
<div class="language-git line-numbers-mode" data-ext="git"><pre v-pre class="language-git"><code>git add file1.txt
git add file2.txt file3.txt
git commit -m <span class="token string">"add 3 files."</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-4-git-status查看仓库当前状态" tabindex="-1"><a class="header-anchor" href="#_1-4-git-status查看仓库当前状态" aria-hidden="true">#</a> 1.4：<code v-pre>git status</code>查看仓库当前状态</h2>
<p><code v-pre>git status</code>命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，<code v-pre>xxx.txt</code>被修改过了，但还没有准备提交的修改。</p>
<p>虽然Git告诉我们<code v-pre>xxx.txt</code>被修改了，但如果能看看具体修改了什么内容，自然是很好的。比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的<code v-pre>xxx.txt</code>，所以，需要用<code v-pre>git diff</code>这个命令看看：</p>
<h2 id="_1-5-git-diff查看具体修改的内容" tabindex="-1"><a class="header-anchor" href="#_1-5-git-diff查看具体修改的内容" aria-hidden="true">#</a> 1.5：<code v-pre>git diff</code>查看具体修改的内容</h2>
<p><code v-pre>git diff</code>顾名思义就是查看difference，显示的格式正是Unix通用的diff格式，可以从上面的命令输出看到。知道了对<code v-pre>readme.txt</code>作了什么修改后，再把它提交到仓库就放心多了</p>
<h2 id="_1-6-git-log查看commit的历史记录" tabindex="-1"><a class="header-anchor" href="#_1-6-git-log查看commit的历史记录" aria-hidden="true">#</a> 1.6.<code v-pre>git log</code>查看commit的历史记录</h2>
<p><code v-pre>git log</code>命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是<code v-pre>append GPL</code>，上一次是<code v-pre>add distributed</code>，最早的一次是<code v-pre>wrote a readme file</code>。</p>
<p>如果嫌输出信息太多，看得眼花缭乱的，可以试试加上<code v-pre>--pretty=oneline</code>参数</p>
<p>需要友情提示的是，你看到的一大串类似<code v-pre>1094adb...</code>的是<code v-pre>commit id</code>（版本号），和SVN不一样，Git的<code v-pre>commit id</code>不是1，2，3……递增的数字，而是一个SHA1计算出来的一个非常大的数字，用十六进制表示，而且你看到的<code v-pre>commit id</code>和我的肯定不一样，以你自己的为准。为什么<code v-pre>commit id</code>需要用这么一大串数字表示呢？<strong>因为Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了</strong>。</p>
<h2 id="_1-7-git-reset-hard回退到某commit的记录" tabindex="-1"><a class="header-anchor" href="#_1-7-git-reset-hard回退到某commit的记录" aria-hidden="true">#</a> 1.7：<code v-pre>git reset --hard</code>回退到某commit的记录</h2>
<p>每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为<code v-pre>commit</code>。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个<code v-pre>commit</code>恢复，然后继续工作，而不是把几个月的工作成果全部丢失。</p>
<p><strong>回退到最近一个commit版本<code v-pre>git reset --hard HEAD^</code></strong></p>
<p><strong>回退到具体的版本 1094a。版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。</strong><code v-pre>git reset --hard 1094a </code></p>
<p>因为Git在内部有个指向当前版本的<code v-pre>HEAD</code>指针，当你回退版本的时候，Git仅仅是把HEAD从指向<code v-pre>append GPL</code>：</p>
<div class="language-ascii line-numbers-mode" data-ext="ascii"><pre v-pre class="language-ascii"><code>┌────┐
│HEAD│
└────┘
   │
   └──&gt; ○ append GPL
        │
        ○ add distributed
        │
        ○ wrote a readme file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改为指向<code v-pre>add distributed</code>：</p>
<div class="language-ascii line-numbers-mode" data-ext="ascii"><pre v-pre class="language-ascii"><code>┌────┐
│HEAD│
└────┘
   │
   │    ○ append GPL
   │    │
   └──&gt; ○ add distributed
        │
        ○ wrote a readme file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后顺便把工作区的文件更新了。所以你让<code v-pre>HEAD</code>指向哪个版本号，你就把当前版本定位在哪。</p>
<p>现在，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的<code v-pre>commit id</code>怎么办？</p>
<p>在Git中，总是有后悔药可以吃的。当你用<code v-pre>$ git reset --hard HEAD^</code>回退到<code v-pre>add distributed</code>版本时，再想恢复到<code v-pre>append GPL</code>，就必须找到<code v-pre>append GPL</code>的commit id。Git提供了一个命令<code v-pre>git reflog</code>用来记录你的每一次命令：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终于舒了口气，从输出可知，<code v-pre>append GPL</code>的commit id是<code v-pre>1094adb</code>，现在，你又可以乘坐时光机回到未来了。</p>
<h2 id="_1-8-git-checkout-file撤销修改" tabindex="-1"><a class="header-anchor" href="#_1-8-git-checkout-file撤销修改" aria-hidden="true">#</a> 1.8：<code v-pre>git checkout -- file</code>撤销修改</h2>
<p><code v-pre>git checkout -- file</code>可以丢弃工作区的修改：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git checkout -- readme.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令<code v-pre>git checkout -- readme.txt</code>意思就是，把<code v-pre>readme.txt</code>文件在工作区的修改全部撤销，这里有两种情况：</p>
<p>一种是<code v-pre>readme.txt</code>自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；</p>
<p>一种是<code v-pre>readme.txt</code>已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。</p>
<p>总之，就是让这个文件回到最近一次<code v-pre>git commit</code>或<code v-pre>git add</code>时的状态。</p>
<p><code v-pre>git checkout -- file</code>命令中的<code v-pre>--</code>很重要**，没有<code v-pre>--</code>，就变成了“切换到另一个分支”的命令，**我们在后面的分支管理中会再次遇到<code v-pre>git checkout</code>命令。</p>
<h2 id="_1-9-git-rm删除文件" tabindex="-1"><a class="header-anchor" href="#_1-9-git-rm删除文件" aria-hidden="true">#</a> 1.9:<code v-pre>git rm</code>删除文件</h2>
<p><strong><code v-pre>git rm test.txt</code> 相当于是删除工作目录中的test.txt文件,并把此次删除操作提交到了暂存区</strong></p>
<h1 id="_2-远程仓库github" tabindex="-1"><a class="header-anchor" href="#_2-远程仓库github" aria-hidden="true">#</a> 2.远程仓库github</h1>
<p><code v-pre>git remote add origin url</code>将github的url添加成远程仓库</p>
<p>从现在起，只要本地作了提交，就可以通过命令：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> git push origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把本地<code v-pre>master</code>分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！</p>
<h2 id="ssh警告" tabindex="-1"><a class="header-anchor" href="#ssh警告" aria-hidden="true">#</a> SSH警告</h2>
<p>当你第一次使用Git的<code v-pre>clone</code>或者<code v-pre>push</code>命令连接GitHub时，会得到一个警告：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入<code v-pre>yes</code>回车即可。</p>
<p>Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个警告只会出现一次，后面的操作就不会有任何警告了。</p>
<p>如果你实在担心有人冒充GitHub服务器，输入<code v-pre>yes</code>前可以对照<a href="https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/" target="_blank" rel="noopener noreferrer">GitHub的RSA Key的指纹信息<ExternalLinkIcon/></a>是否与SSH连接给出的一致。</p>
<h2 id="删除远程库" tabindex="-1"><a class="header-anchor" href="#删除远程库" aria-hidden="true">#</a> 删除远程库</h2>
<p>如果添加的时候地址写错了，或者就是想删除远程库，可以用<code v-pre>git remote rm &lt;name&gt;</code>命令。使用前，建议先用<code v-pre>git remote -v</code>查看远程库信息：</p>
<h2 id="多人协作" tabindex="-1"><a class="header-anchor" href="#多人协作" aria-hidden="true">#</a> 多人协作</h2>
<p>当你从远程仓库克隆时，实际上Git自动把本地的<code v-pre>master</code>分支和远程的<code v-pre>master</code>分支对应起来了，并且，远程仓库的默认名称是<code v-pre>origin</code>。</p>
<p>要查看远程库的信息，用<code v-pre>git remote</code>：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git remote
origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，用<code v-pre>git remote -v</code>显示更详细的信息：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git remote -v
origin  git@github.com:michaelliao/learngit.git (fetch)
origin  git@github.com:michaelliao/learngit.git (push)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面显示了可以抓取和推送的<code v-pre>origin</code>的地址。如果没有推送权限，就看不到push的地址。</p>
<h3 id="克隆指定分支" tabindex="-1"><a class="header-anchor" href="#克隆指定分支" aria-hidden="true">#</a> 克隆指定分支</h3>
<p>git clone -b  branchName https://gitee.com/EdgexFoundry/edgex-examples.git</p>
<h1 id="_3-分支管理" tabindex="-1"><a class="header-anchor" href="#_3-分支管理" aria-hidden="true">#</a> 3.分支管理</h1>
<p>Git鼓励大量使用分支：</p>
<p>查看分支：<code v-pre>git branch</code></p>
<p>创建分支：<code v-pre>git branch &lt;name&gt;</code></p>
<p>切换分支：<code v-pre>git checkout &lt;name&gt;</code>或者<code v-pre>git switch &lt;name&gt;</code></p>
<p>创建+切换分支：<code v-pre>git checkout -b &lt;name&gt;</code>或者<code v-pre>git switch -c &lt;name&gt;</code></p>
<p>合并某分支到当前分支：<code v-pre>git merge &lt;name&gt;</code></p>
<p>删除分支：<code v-pre>git branch -d &lt;name&gt;</code></p>
<p>分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。</p>
<p>现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，<strong>直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。</strong></p>
<h2 id="_3-1-git-checkout-b-xxx创建分支xxx" tabindex="-1"><a class="header-anchor" href="#_3-1-git-checkout-b-xxx创建分支xxx" aria-hidden="true">#</a> 3.1：<code v-pre>git checkout -b xxx</code>创建分支xxx</h2>
<p><code v-pre>git checkout</code>命令加上<code v-pre>-b</code>参数表示创建并切换，相当于以下两条命令：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git branch dev
$ git checkout dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>git branch</code>查看当前分支</p>
<h2 id="_3-2-git-merge分支合并" tabindex="-1"><a class="header-anchor" href="#_3-2-git-merge分支合并" aria-hidden="true">#</a> 3.2：<code v-pre>git merge</code>分支合并</h2>
<p>我们创建分支然后修改完提交修改后切回master分支，然后使用git merge命令用于合并指定分支到当前分支</p>
<h2 id="_3-3-git-branch-d-xxx删除分支" tabindex="-1"><a class="header-anchor" href="#_3-3-git-branch-d-xxx删除分支" aria-hidden="true">#</a> 3.3：<code v-pre>git branch -d xxx</code>删除分支</h2>
<p>合并完成后，就可以放心地删除<code v-pre>dev</code>分支了：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git branch -d dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们创建分支完成开发还没合并时，突然接到命令某个分支的功能不需要了，我们要删除该分支，此时会报错，因为我们还没合并，但我们已经不需要合并了，现在我们强行删除：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git branch -D feature-vulcan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-4-switch" tabindex="-1"><a class="header-anchor" href="#_3-4-switch" aria-hidden="true">#</a> 3.4：switch</h2>
<p>我们注意到切换分支使用<code v-pre>git checkout &lt;branch&gt;</code>，而前面讲过的撤销修改则是<code v-pre>git checkout -- &lt;file&gt;</code>，同一个命令，有两种作用，确实有点令人迷惑。</p>
<p>实际上，切换分支这个动作，用<code v-pre>switch</code>更科学。因此，最新版本的Git提供了新的<code v-pre>git switch</code>命令来切换分支：</p>
<p>创建并切换到新的<code v-pre>dev</code>分支，可以使用：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git switch -c dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接切换到已有的<code v-pre>master</code>分支，可以使用：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git switch master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用新的<code v-pre>git switch</code>命令，比<code v-pre>git checkout</code>要更容易理解。</p>
<h2 id="_3-5-应该使用的分支策略" tabindex="-1"><a class="header-anchor" href="#_3-5-应该使用的分支策略" aria-hidden="true">#</a> 3.5：==应该使用的分支策略==</h2>
<p>在实际开发中，我们应该按照几个基本原则进行分支管理：</p>
<p>首先，<code v-pre>master</code>分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；</p>
<p>那在哪干活呢？干活都在<code v-pre>dev</code>分支上，也就是说，<code v-pre>dev</code>分支是不稳定的，到某个时候，比如1.0版本发布时，再把<code v-pre>dev</code>分支合并到<code v-pre>master</code>上，在<code v-pre>master</code>分支发布1.0版本；</p>
<p>你和你的小伙伴们每个人都在<code v-pre>dev</code>分支上干活，每个人都有自己的分支，时不时地往<code v-pre>dev</code>分支上合并就可以了。</p>
<h2 id="_3-6-git-stash储藏" tabindex="-1"><a class="header-anchor" href="#_3-6-git-stash储藏" aria-hidden="true">#</a> 3.6：<code v-pre>git stash</code>储藏</h2>
<p>软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。</p>
<p>当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支<code v-pre>issue-101</code>来修复它，但是，等等，当前正在<code v-pre>dev</code>上进行的工作还没有提交：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git status
On branch dev
Changes to be committed:
  (use "git reset HEAD &lt;file>..." to unstage)

	new file:   hello.py

Changes not staged for commit:
  (use "git add &lt;file>..." to update what will be committed)
  (use "git checkout -- &lt;file>..." to discard changes in working directory)

	modified:   readme.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？</p>
<p>幸好，Git还提供了一个<code v-pre>stash</code>功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，用<code v-pre>git status</code>查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。</p>
<p>用<code v-pre>git stash list</code>命令看刚才的工作现场存到哪去了：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git stash list
stash@{0}: WIP on dev: f52c633 add merge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：</p>
<p>一是用<code v-pre>git stash apply</code>恢复，但是恢复后，stash内容并不删除，你需要用<code v-pre>git stash drop</code>来删除；</p>
<p>另一种方式是用<code v-pre>git stash pop</code>，恢复的同时把stash内容也删了：</p>
<h2 id="_3-7-cherry-pick-复制一个特定的提交到当前分支" tabindex="-1"><a class="header-anchor" href="#_3-7-cherry-pick-复制一个特定的提交到当前分支" aria-hidden="true">#</a> 3.7：==cherry-pick==复制一个特定的提交到当前分支</h2>
<p>在master分支上修复了bug后，我们要想一想，dev分支是早期从master分支分出来的，所以，这个bug其实在当前dev分支上也存在。</p>
<p>那怎么在dev分支上修复同样的bug？重复操作一次，提交不就行了？</p>
<p>有木有更简单的方法？</p>
<p>有！</p>
<p>同样的bug，要在dev上修复，我们只需要把<code v-pre>4c805e2 fix bug 101</code>这个提交所做的修改“复制”到dev分支。注意：我们只想复制<code v-pre>4c805e2 fix bug 101</code>这个提交所做的修改，并不是把整个master分支merge过来。</p>
<p>为了方便操作，Git专门提供了一个<code v-pre>cherry-pick</code>命令，让我们能复制一个特定的提交到当前分支：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git branch
* dev
  master
$ git cherry-pick 4c805e2
[master 1d4b803] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Git自动给dev分支做了一次提交，注意这次提交的commit是<code v-pre>1d4b803</code>，它并不同于master的<code v-pre>4c805e2</code>，因为这两个commit只是改动相同，但确实是两个不同的commit。用<code v-pre>git cherry-pick</code>，我们就不需要在dev分支上手动再把修bug的过程重复一遍。</p>
<p>有些聪明的童鞋会想了，既然可以在master分支上修复bug后，在dev分支上可以“重放”这个修复过程，那么直接在dev分支上修复bug，然后在master分支上“重放”行不行？当然可以，不过你仍然需要<code v-pre>git stash</code>命令保存现场，才能从dev分支切换到master分支。</p>
<h2 id="_3-8-推送分支" tabindex="-1"><a class="header-anchor" href="#_3-8-推送分支" aria-hidden="true">#</a> 3.8：推送分支</h2>
<p>推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git push origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果要推送其他分支，比如<code v-pre>dev</code>，就改成：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git push origin dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？</p>
<ul>
<li><code v-pre>master</code>分支是主分支，因此要时刻与远程同步；</li>
<li><code v-pre>dev</code>分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；</li>
<li>bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；</li>
<li>feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。</li>
</ul>
<h2 id="_3-9-抓取分支" tabindex="-1"><a class="header-anchor" href="#_3-9-抓取分支" aria-hidden="true">#</a> 3.9：==抓取分支==</h2>
<p>当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的<code v-pre>master</code>分支。不信可以用<code v-pre>git branch</code>命令看看：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git branch
* master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，你的小伙伴要在<code v-pre>dev</code>分支上开发，就必须创建远程<code v-pre>origin</code>的<code v-pre>dev</code>分支到本地，于是他用这个命令创建本地<code v-pre>dev</code>分支：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ git checkout -b dev origin/dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_3-概念" tabindex="-1"><a class="header-anchor" href="#_3-概念" aria-hidden="true">#</a> 3.概念</h1>
<h2 id="_3-1-工作区和暂存区" tabindex="-1"><a class="header-anchor" href="#_3-1-工作区和暂存区" aria-hidden="true">#</a> 3.1：工作区和暂存区</h2>
<h4 id="工作区-working-directory" tabindex="-1"><a class="header-anchor" href="#工作区-working-directory" aria-hidden="true">#</a> 工作区（Working Directory）</h4>
<p>就是你在电脑里能看到的目录，比如我的<code v-pre>learngit</code>文件夹就是一个工作区：</p>
<p>版本库</p>
<p>工作区有一个隐藏目录<code v-pre>.git</code>，这个不算工作区，而是Git的版本库。</p>
<p>Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支<code v-pre>master</code>，以及指向<code v-pre>master</code>的一个指针叫<code v-pre>HEAD</code>。</p>
<p>前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的</p>
<p>第一步是用<code v-pre>git add</code>把文件添加进去，实际上就是把文件修改添加到暂存区；</p>
<p>第二步是用<code v-pre>git commit</code>提交更改，实际上就是把暂存区的所有内容提交到当前分支。</p>
<p>因为我们创建Git版本库时，Git自动为我们创建了唯一一个<code v-pre>master</code>分支，所以，现在，<code v-pre>git commit</code>就是往<code v-pre>master</code>分支上提交更改。</p>
<p>你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。</p>
<p>需要在本地成功安装git</p>
<p>1.打开git bush配置SSH key，这个不需要在要上传的路径下进行，只在系统路径下即可。输入 cd ~/.ssh/ 回车如果提示 “ No such file or directory”，可以手动在系统路径下新建一个 .ssh文件夹即可。再输入 mkdir ~/.ssh 回车。进入.ssh路径下。</p>
<p>2.接下来在.ssh路径下配置全局的name和email，输入以下命令：</p>
<p>git config --global user.name &quot;xxxxx&quot;</p>
<p>git config --global user.email &quot;xxxxx@xx.com&quot;</p>
<p>此处分别指工程文件名，和gitlab账号绑定的邮箱地址。</p>
<p>3.输入：ssh-keygen -t rsa -C &quot;xxxx@xxxx.com&quot;(xxx为上一句输入的邮箱地址)语句，回车之后生成SSH key，后面出现让输入口令的语句，直接按回车即可，如下图所示，这样系统路径下就生成了两个文件：id_rsa和id_rsa.pub</p>
<p>4.点击个人工程，然后进入新的页面，在该页面点击profile setting，打开profile setting，选择SSH key这个选项，如下图所示</p>
<p>5.将生成的SSH key添加到账户里，在SSH Keys页面里，在页面的右上角点击添加add SSH keys，将之前生成的两个文件中的id_rsa.pub文件里的内容粘贴到key文本框里，title会自动生成，再点击add key，这样key就添加成功了。</p>
<CommentService/></div></template>


