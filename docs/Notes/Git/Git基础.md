---
lang: zh-CN
title: Git基础
description: 关键功能
collapsible: true
---
# Git简介

Git是目前世界上最先进的分布式版本控制系统（没有之一）。

所有的版本控制系统，其实只能**跟踪文本文件的改动**，比如TXT文件，网页，所有的程序代码等等，Git也不例外。版本控制系统可以告诉你每次的改动，比如在第5行加了一个单词“Linux”，在第8行删了一个单词“Windows”。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道。



# 1.基本操作步骤

## 初始化name和email

~~~txt
git config --global user.name "余瑞"
git config --global user.email "xxxx@qq.com"
~~~



## 1.0：生成ssh

生成公钥

~~~shell
ssh-keygen -t rsa
~~~

将.ssh文件内的pub公钥配置到仓库中





## 1.1 ：`git init`将改目录变成git可管理的仓库

当前目录下多了一个`.git`的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

如果你没有看到`.git`目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

## 1.2:`git add`将某文件添加到仓库

`git add .`将所有文件添加到git 仓库

## 1.3：`git commit`将文件提交到仓库

简单解释一下`git commit`命令，`-m`后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

为什么Git添加文件需要`add`，`commit`一共两步呢？因为`commit`可以一次提交很多文件，所以你可以多次`add`不同的文件，比如：

```git
git add file1.txt
git add file2.txt file3.txt
git commit -m "add 3 files."
```

## 1.4：`git status`查看仓库当前状态

`git status`命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，`xxx.txt`被修改过了，但还没有准备提交的修改。

虽然Git告诉我们`xxx.txt`被修改了，但如果能看看具体修改了什么内容，自然是很好的。比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的`xxx.txt`，所以，需要用`git diff`这个命令看看：

## 1.5：`git diff`查看具体修改的内容

`git diff`顾名思义就是查看difference，显示的格式正是Unix通用的diff格式，可以从上面的命令输出看到。知道了对`readme.txt`作了什么修改后，再把它提交到仓库就放心多了



## 1.6.`git log`查看commit的历史记录

`git log`命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是`append GPL`，上一次是`add distributed`，最早的一次是`wrote a readme file`。

如果嫌输出信息太多，看得眼花缭乱的，可以试试加上`--pretty=oneline`参数

需要友情提示的是，你看到的一大串类似`1094adb...`的是`commit id`（版本号），和SVN不一样，Git的`commit id`不是1，2，3……递增的数字，而是一个SHA1计算出来的一个非常大的数字，用十六进制表示，而且你看到的`commit id`和我的肯定不一样，以你自己的为准。为什么`commit id`需要用这么一大串数字表示呢？**因为Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了**。



## 1.7：`git reset --hard`回退到某commit的记录

每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为`commit`。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

**回退到最近一个commit版本`git reset --hard HEAD^`**

**回退到具体的版本 1094a。版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。**`git reset --hard 1094a `

因为Git在内部有个指向当前版本的`HEAD`指针，当你回退版本的时候，Git仅仅是把HEAD从指向`append GPL`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   └──> ○ append GPL
        │
        ○ add distributed
        │
        ○ wrote a readme file
```

改为指向`add distributed`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   │    ○ append GPL
   │    │
   └──> ○ add distributed
        │
        ○ wrote a readme file
```

然后顺便把工作区的文件更新了。所以你让`HEAD`指向哪个版本号，你就把当前版本定位在哪。

现在，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的`commit id`怎么办？

在Git中，总是有后悔药可以吃的。当你用`$ git reset --hard HEAD^`回退到`add distributed`版本时，再想恢复到`append GPL`，就必须找到`append GPL`的commit id。Git提供了一个命令`git reflog`用来记录你的每一次命令：

```
 git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```

终于舒了口气，从输出可知，`append GPL`的commit id是`1094adb`，现在，你又可以乘坐时光机回到未来了。



## 1.8：`git checkout -- file`撤销修改

`git checkout -- file`可以丢弃工作区的修改：

```
$ git checkout -- readme.txt
```

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

`git checkout -- file`命令中的`--`很重要**，没有`--`，就变成了“切换到另一个分支”的命令，**我们在后面的分支管理中会再次遇到`git checkout`命令。



## 1.9:`git rm`删除文件

**`git rm test.txt` 相当于是删除工作目录中的test.txt文件,并把此次删除操作提交到了暂存区**



# 2.远程仓库github

`git remote add origin url`将github的url添加成远程仓库



从现在起，只要本地作了提交，就可以通过命令：

```
 git push origin master
```

把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！



## SSH警告

当你第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告：

```
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```

这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可。

Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：

```
Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
```

这个警告只会出现一次，后面的操作就不会有任何警告了。

如果你实在担心有人冒充GitHub服务器，输入`yes`前可以对照[GitHub的RSA Key的指纹信息](https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/)是否与SSH连接给出的一致。

## 删除远程库

如果添加的时候地址写错了，或者就是想删除远程库，可以用`git remote rm <name>`命令。使用前，建议先用`git remote -v`查看远程库信息：



## 多人协作

当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。

要查看远程库的信息，用`git remote`：

```
$ git remote
origin
```

或者，用`git remote -v`显示更详细的信息：

```
$ git remote -v
origin  git@github.com:michaelliao/learngit.git (fetch)
origin  git@github.com:michaelliao/learngit.git (push)
```

上面显示了可以抓取和推送的`origin`的地址。如果没有推送权限，就看不到push的地址。





### 克隆指定分支

git clone -b  branchName https://gitee.com/EdgexFoundry/edgex-examples.git

# 3.分支管理

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`或者`git switch <name>`

创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`



分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，**直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。**



## 3.1：`git checkout -b xxx`创建分支xxx

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

```
$ git branch dev
$ git checkout dev
```

`git branch`查看当前分支

## 3.2：`git merge`分支合并

我们创建分支然后修改完提交修改后切回master分支，然后使用git merge命令用于合并指定分支到当前分支

## 3.3：`git branch -d xxx`删除分支

合并完成后，就可以放心地删除`dev`分支了：

```
$ git branch -d dev
```

当我们创建分支完成开发还没合并时，突然接到命令某个分支的功能不需要了，我们要删除该分支，此时会报错，因为我们还没合并，但我们已经不需要合并了，现在我们强行删除：

```
$ git branch -D feature-vulcan
```

## 3.4：switch

我们注意到切换分支使用`git checkout <branch>`，而前面讲过的撤销修改则是`git checkout -- <file>`，同一个命令，有两种作用，确实有点令人迷惑。

实际上，切换分支这个动作，用`switch`更科学。因此，最新版本的Git提供了新的`git switch`命令来切换分支：

创建并切换到新的`dev`分支，可以使用：

```
$ git switch -c dev
```

直接切换到已有的`master`分支，可以使用：

```
$ git switch master
```

使用新的`git switch`命令，比`git checkout`要更容易理解。

## 3.5：==应该使用的分支策略==

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；

你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。

## 3.6：`git stash`储藏

软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支`issue-101`来修复它，但是，等等，当前正在`dev`上进行的工作还没有提交：

```
$ git status
On branch dev
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   hello.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt
```

并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

幸好，Git还提供了一个`stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

```
$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
```

现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

用`git stash list`命令看刚才的工作现场存到哪去了：

```
$ git stash list
stash@{0}: WIP on dev: f52c633 add merge
```



工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：

## 3.7：==cherry-pick==复制一个特定的提交到当前分支



在master分支上修复了bug后，我们要想一想，dev分支是早期从master分支分出来的，所以，这个bug其实在当前dev分支上也存在。

那怎么在dev分支上修复同样的bug？重复操作一次，提交不就行了？

有木有更简单的方法？

有！

同样的bug，要在dev上修复，我们只需要把`4c805e2 fix bug 101`这个提交所做的修改“复制”到dev分支。注意：我们只想复制`4c805e2 fix bug 101`这个提交所做的修改，并不是把整个master分支merge过来。

为了方便操作，Git专门提供了一个`cherry-pick`命令，让我们能复制一个特定的提交到当前分支：

```
$ git branch
* dev
  master
$ git cherry-pick 4c805e2
[master 1d4b803] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Git自动给dev分支做了一次提交，注意这次提交的commit是`1d4b803`，它并不同于master的`4c805e2`，因为这两个commit只是改动相同，但确实是两个不同的commit。用`git cherry-pick`，我们就不需要在dev分支上手动再把修bug的过程重复一遍。

有些聪明的童鞋会想了，既然可以在master分支上修复bug后，在dev分支上可以“重放”这个修复过程，那么直接在dev分支上修复bug，然后在master分支上“重放”行不行？当然可以，不过你仍然需要`git stash`命令保存现场，才能从dev分支切换到master分支。



## 3.8：推送分支

推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：

```
$ git push origin master
```

如果要推送其他分支，比如`dev`，就改成：

```
$ git push origin dev
```

但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

* `master`分支是主分支，因此要时刻与远程同步；
* `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
* bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
* feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

## 3.9：==抓取分支==



当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的`master`分支。不信可以用`git branch`命令看看：

```
$ git branch
* master
```

现在，你的小伙伴要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：

```
$ git checkout -b dev origin/dev
```



# 3.概念

## 3.1：工作区和暂存区

#### 工作区（Working Directory）

就是你在电脑里能看到的目录，就是你创建的项目`git init`的根目录就是一个工作区：

版本库Repository–工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

我们把文件往Git版本库里添加的时候，是分两步执行的：

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。







需要在本地成功安装git

1.打开git bush配置SSH key，这个不需要在要上传的路径下进行，只在系统路径下即可。输入 cd ~/.ssh/ 回车如果提示 “ No such file or directory”，可以手动在系统路径下新建一个 .ssh文件夹即可。再输入 mkdir ~/.ssh 回车。进入.ssh路径下。

2.接下来在.ssh路径下配置全局的name和email，输入以下命令：

git config --global user.name "xxxxx"

git config --global user.email "xxxxx@xx.com"

此处分别指工程文件名，和gitlab账号绑定的邮箱地址。

3.输入：ssh-keygen -t rsa -C "xxxx@xxxx.com"(xxx为上一句输入的邮箱地址)语句，回车之后生成SSH key，后面出现让输入口令的语句，直接按回车即可，如下图所示，这样系统路径下就生成了两个文件：id_rsa和id_rsa.pub

4.点击个人工程，然后进入新的页面，在该页面点击profile setting，打开profile setting，选择SSH key这个选项，如下图所示

5.将生成的SSH key添加到账户里，在SSH Keys页面里，在页面的右上角点击添加add SSH keys，将之前生成的两个文件中的id_rsa.pub文件里的内容粘贴到key文本框里，title会自动生成，再点击add key，这样key就添加成功了。





# 实操

## 版本回退操作撤销commit

### `git reset --hard`

①`git reset --hard HEAD^` 首先，Git必须知道当前版本是哪个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交`HEAD^`,上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

使用这个命令`git log`

~~~txt
 git log
commit 91a52ac4529c2859f719165706fbe94224bc211a (HEAD -> master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:36:43 2024 +0800

    bbbb

commit acc55939b31648f88752729c421f52b3ff587d33 (origin/master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:35:07 2024 +0800

    first
~~~

`log`顺序是从上到下，第一个最近的`commit`。我们现在执行回退命令，然后再执行`git log`

~~~txt
commit acc55939b31648f88752729c421f52b3ff587d33 (HEAD -> master, origin/master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:35:07 2024 +0800

    first
~~~

![](/Git/reset_hard.png)

总结：且本地新增的bbb.md文件也被删除了，也就是说-hard回退，会将暂存区日志删掉，本地工作区内容也会删掉,因此**慎用**。

#### 如何恢复–hard回退的内容呢

Git提供了一个命令`git reflog`用来记录你的每一次命令。

~~~shell
 git reflog
acc5593 (HEAD -> master, origin/master) HEAD@{0}: reset: moving to HEAD^
91a52ac HEAD@{1}: commit: bbbb
acc5593 (HEAD -> master, origin/master) HEAD@{2}: commit (initial): first
~~~

此时执行`git reset --hard 91a52ac`就恢复了



### `git reset --mixed `

如果不加`--`参数默认执行的`--mixed`

我们先`git log`看一下

~~~shell
git log
commit 91a52ac4529c2859f719165706fbe94224bc211a (HEAD -> master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:36:43 2024 +0800

    bbbb

commit acc55939b31648f88752729c421f52b3ff587d33 (origin/master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:35:07 2024 +0800

    first
~~~

然后我们执行`git reset HEAD^ `,相当于执行了`git reset --mixed HEAD^ `。然后再执行`git log`看一下，我们可以看到撤销了`commit`的记录，但**工作区的内容给我们保留了**。

~~~shell
git reset HEAD^       
PS D:\A_my_codes\git> git log    
commit acc55939b31648f88752729c421f52b3ff587d33 (HEAD -> master, origin/master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:35:07 2024 +0800
~~~

![](/Git/reset_mixed.png)

### `git reset --soft`

`git log`先看一下，我们提交了create bbb.md。

~~~shellgit log    
commit 152fe868eede4afda8e4dca59ba6353f5511c202 (HEAD -> master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:56:13 2024 +0800

    create bbb.md

commit acc55939b31648f88752729c421f52b3ff587d33 (origin/master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:35:07 2024 +0800

    first
~~~

然后我们执行`git reset --soft HEAD^`然后再`git log`看一下，可以看到撤销了commit并且工作区内容保留着，此外，我们执行`git status`可以看到,`–soft`参数会保留暂存区的内容。也就是`git add`的。

~~~shell
git log
commit acc55939b31648f88752729c421f52b3ff587d33 (HEAD -> master, origin/master)
Author: 余瑞 <1074121761@qq.com>
Date:   Thu Jan 25 11:35:07 2024 +0800

    first
    
 git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   bbb.md    
~~~

### `git revert`

`git revert` 命令用于创建一个新的提交，该提交包含了要回滚的提交所引入的更改的相反操作，这样就可以撤销这些更改。这个新提交将成为项目历史记录中的一部分，并且需要被推送到远程仓库以应用这些更改。相较于 `git reset` 命令，`git revert` 命令更加**安全**，因为它不会删除任何提交，而是创建新的提交（如果想完全撤销更改，需要使用 `git reset` 命令。）该命令通常用于**回滚已经推送到远程仓库的提交**。

![](/Git/revert1.png)

目前我们的工作区只有aaa.md很干净接下来我会创建bbb.md并推送到远程仓库。

~~~shell
git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        bbb.md
        
git add .
git commit -m "add bbb.md file"
git push origin master
~~~

然后我们执行`git log`查看更改内容

~~~shell
git log --pretty=oneline
0907a85f6b96f7249cfc004e2e663a9e87f0e291 (HEAD -> master, origin/master) add bbb.md file
2e007077746ee5b269c1f5492f8ad0856fcf0a24 Revert "create bbb.mc"
f18cf0d07ada4d338564da064aba29925f7b9df0 create bbb.mc
acc55939b31648f88752729c421f52b3ff587d33 first
~~~

然后我们执行`git revert`开始回滚

~~~shell
git revert 0907a85f6b96f7249cfc004e2e663a9e87f0e291
~~~

**执行完改命令git会帮我们创建一个新的`commit`进入`vim`模式**，这里就是`commit`的信息，我们可以直接`:wq`保存退出，此时可以看到如下

~~~txt
[master a6ad2f8] Revert "add bbb.md file"
 1 file changed, 1 deletion(-)
 delete mode 100644 bbb.md
~~~

然后我们git status查看状态

~~~shell
 git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
~~~

可以看到已经提交了，此时我们可以push这样就回退了推送到远程仓库的内容了。

### `git checkout HEAD^`

`git checkout HEAD^` 的作用是将当前分支移动到前一个提交（上一个提交）的位置，并更新工作目录中的文件的状态。

具体而言，`HEAD^` 表示当前分支的上一个提交（即父提交）。通过执行 `git checkout HEAD^`，将切换到上一个提交并将工作目录中的文件还原为该提交时的状态。

这种操作在以下场景中可能会有用：

* 想撤销最新的提交并回到上一个提交的状态。
* 想查看上一个提交的内容或进行比较。
* 在切换到上一个提交后，可能会创建新的分支或进行其他操作。

需要注意的是，`git checkout HEAD^` 是一个相对引用，只会移动当前分支的指针而不会影响其他分支。如果希望在移动分支指针的同时也更新其他分支，可以使用 `git checkout -B <分支名> HEAD^` 命令。

请注意，执行 `git checkout HEAD^` 后，可以使用 `git checkout -` 命令返回到先前的分支位置。



### 撤销修改

撤销修改分两种情况：

1. 修改后没有执行`git add`放到暂存区，现在只要撤销修改就和版本库的一样了。
2. 已经执行了`git add`添加到暂存区了，现在撤销修改就回到添加暂存区后的状态。

#### 撤销暂存区的修改

我们先git status查看一下当前状态。

~~~shell
 git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   bbb.md
~~~

` git reset HEAD <file>` 命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用`HEAD`时，表示最新的版本。`git restore --staged <file>`同样也可以将暂存区修改回退到工作区。我们挑一个命令执行然后再看一下状态。

~~~shell
git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        bbb.md

nothing added to commit but untracked files present (use "git add" to track)
~~~







#### 撤销工作区（本地）的修改

`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到`git checkout`命令。

~~~txt
aaaaa
执行 git checkout -- aaa.md将清除掉我这一行
~~~

然后我们执行`git checkout -- aaa.md`，就会发现文件内容就恢复了

~~~txt
aaaaa
~~~



## Rebase和merge

在上一节我们看到了，多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。每次合并再push后，分支很乱，有强迫症的童鞋会问：为什么Git的提交历史不能是一条干净的直线？

* rebase操作可以把本地未push的分叉提交历史整理成直线；
* rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

git rebase和merge功能一样都是将分支的提交合并到另一个分支上，例如我在`master`分支上执行`git merge dev`就会将`dev`分支的代码合并到`master`上，但此时我们`git log --graph --pretty=oneline --abbrev-commit`可以查看分支的`commit`记录是没有dev分支上的记录的，如果我们希望将`commit`记录变成直线就执行`rebase`变基就可以了。如下图所示

![](/Git/rebase_merge.png)

# 问题

## VSCODE终端无法使用git

在setting.json中配置git.path指向"C:\\Program Files\\Git\\bin\\git.exe"路径即可





<CommentService/>

