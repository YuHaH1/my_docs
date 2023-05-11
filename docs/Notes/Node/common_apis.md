---
lang: zh-CN
title: 常用APIs
description: 常用APIs介绍
collapsible: true
---
# 常用APIs





## 文件操作相关

### fs.existSync

判断文件是否存在

**fs.exists已经废弃**：-》 可使用[`fs.stat()`](https://www.nodeapp.cn/fs.html#fs_fs_stat_path_callback) 或 [`fs.access()`](https://www.nodeapp.cn/fs.html#fs_fs_access_path_mode_callback)替代

同步方式判断路径是否存在

~~~ts
fs.existSync(path:string)=>boolean
~~~

### 写入文件

#### fs.appendFile和fs.appendFileSync

追加数据到一个文件，如果文件不存在则创建文件。 `data` 可以是一个字符串或 [`Buffer`](https://www.nodeapp.cn/buffer.html#buffer_buffer)。

~~~ts
type Tfile = string | buffer | url | number文件名或文件描述符
type TOptions = {
    encoding:string  默认为uft-8,
    mode:number
    flag:string 默认为a
}
type TCallback = (err:Error):void
fs.appendFile:(file:Tfile,data:string|buffer,options:TOptions,callback:TCallback=>void
~~~

#### fs.writeFile

异步地写入数据到文件，如果文件已经存在，则替代文件。

```js
file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符
data <string> | <Buffer> | <Uint8Array>
options <Object> | <string>
	encoding <string> | <null> 默认 = 'utf8'
	mode <integer> 默认 = 0o666
	flag <string> 默认 = 'w'
callback <Function>
	err <Error>
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```



### 读取文件内容

fs.readFile

~~~ts
path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
options <Object> | <string>
	encoding <string> | <null> 默认为 null。
	flag <string> 默认为 'r'。
callback <Function>
	err <Error>
	data <string> | <Buffer>
fs.readFile('./docs/README.md', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    console.log(data);
});

~~~



::: danger

注意：当 `path` 是一个目录时，`fs.readFile()` 与 [`fs.readFileSync()`](https://www.nodeapp.cn/fs.html#fs_fs_readfilesync_path_options) 的行为与平台有关。 在 macOS、Linux 与 Windows 上，会返回一个错误。 在 FreeBSD 上，会返回目录内容的表示。

:::

### 删除文件夹rmdir

~~~ts
fs.rmdir('./docs/test', (err) => {
    console.log(err)
})
~~~

::: warning

如果文件夹不为空会报错

:::



### 删除文件unlink

~~~ts
fs.unlink('./docs/test/a.txt', (err) => {
    console.log(err)
})

~~~







### fs.stat和fs.statSync(path)

**不建议在调用 `fs.open()` 、`fs.readFile()` 或 `fs.writeFile()` 之前使用 `fs.stat()` 检查一个文件是否存在。 作为替代，用户代码应该直接打开/读取/写入文件，当文件无效时再处理错误。**

同步方法和异步区别在于同步会返回stats的实例对象，而异步回调中的第二个参数是stat实例，该实例保存了文件的一些状态信息

~~~ts
const { stat } = require('fs');

stat('./.gitignore', (err, stats) => {
    console.log(err, stats)
})

null Stats {
  dev: 2891526651,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 4503599628157816,
  size: 78,
  blocks: 0,
  atimeMs: 1683456296034.1301,
  mtimeMs: 1683456296034.1301,
  ctimeMs: 1683456296034.1301,
  birthtimeMs: 1683378981654.4216,
  atime: 2023-05-07T10:44:56.034Z,
  mtime: 2023-05-07T10:44:56.034Z,
  ctime: 2023-05-07T10:44:56.034Z,
  birthtime: 2023-05-06T13:16:21.654Z
}
~~~



### fs.readdir

::: tip

异步读取文件夹下的内容，如果路径不存在files为undefined err是错误信息

:::

****

~~~ts
readdir(path[, options], callback)
options:{
    encoding:string 默认utf-8
}
callback:(err,files)=>void
~~~



> readdirSync

::: tip

同步读取文件夹下的内容，如果该路径不存在会报错，返回值是读取结果

:::

~~~ts
readdirSync(path[, options])：string[]
~~~



### fs.rename

::: tip

异步更改文件名

:::

~~~ts
rename(oldPath：string, newPath:string, callback:(err)=>void)

~~~



::: tip

renameSync同步更改文件名

:::











### 常见的error code的错误

* `EACCES` (拒绝访问): 试图以被一个文件的访问权限禁止的方式访问一个文件。
* `EADDRINUSE` (地址已被使用): 试图绑定一个服务器（[`net`]、[`http`] 或 [`https`]）到本地地址，但因另一个本地系统的服务器已占用了该地址而导致失败。
* `ECONNREFUSED` (连接被拒绝): 无法连接，因为目标机器积极拒绝。 这通常是因为试图连接到外部主机上的废弃的服务。
* `ECONNRESET` (连接被重置): 一个连接被强行关闭。 这通常是因为连接到远程 socket 超时或重启。 常发生于 [`http`] 和 [`net`] 模块。
* `EEXIST` (文件已存在): 一个操作的目标文件已存在，而要求目标不存在。
* `EISDIR` (是一个目录): 一个操作要求一个文件，但给定的路径是一个目录。
* `EMFILE` (系统打开了太多文件): 已达到系统[文件描述符](https://en.wikipedia.org/wiki/File_descriptor)允许的最大数量，且描述符的请求不能被满足直到至少关闭其中一个。 当一次并行打开多个文件时会发生这个错误，尤其是在进程的文件描述限制数量较低的操作系统（如 macOS）。 要解决这个限制，可在运行 Node.js 进程的同一 shell 中运行 `ulimit -n 2048`。
* `ENOENT` (无此文件或目录): 通常是由 [`fs`] 操作引起的，表明指定的路径不存在，即给定的路径找不到文件或目录。
* `ENOTDIR` (不是一个目录): 给定的路径虽然存在，但不是一个目录。 通常是由 [`fs.readdir`] 引起的。
* `ENOTEMPTY` (目录非空): 一个操作的目标是一个非空的目录，而要求的是一个空目录。 通常是由 [`fs.unlink`] 引起的。
* `EPERM` (操作不被允许): 试图执行一个需要更高权限的操作。
* `EPIPE` (管道损坏): 写入一个管道、socket 或 FIFO 时没有进程读取数据。 常见于 [`net`] 和 [`http`] 层，表明远端要写入的流已被关闭。
* `ETIMEDOUT` (操作超时): 一个连接或发送的请求失败，因为连接方在一段时间后没有做出合适的响应。 常见于 [`http`] 或 [`net`]。 往往标志着 `socket.end()` 没有被正确地调用。



### 监听文件或目录watch(filename[, options][, listener])

监视 `filename` 的变化，`filename` 可以是一个文件或一个目录。 返回的对象是一个 [`fs.FSWatcher`](https://www.nodeapp.cn/fs.html#fs_class_fs_fswatcher)。

第二个参数是可选的。 如果提供的 `options` 是一个字符串，则它指定了 `encoding`。 否则 `options` 应该以一个对象传入。

监听器回调有两个参数 `(eventType, filename)`。 `eventType` 可以是 `'rename'` 或 `'change'`，`filename` 是触发事件的文件的名称。

注意，在大多数平台，当一个文件出现或消失在一个目录里时，`'rename'` 会被触发。

还需要注意，监听器回调是绑定在由 [`fs.FSWatcher`](https://www.nodeapp.cn/fs.html#fs_class_fs_fswatcher) 触发的 `'change'` 事件上，但它跟 `eventType` 的 `'change'` 值不是同一个东西。

~~~js
filename <string> | <Buffer> | <URL>
options <string> | <Object>
	persistent <boolean> 指明如果文件正在被监视，进程是否应该继续运行。默认 = true
	recursive <boolean> 指明是否全部子目录应该被监视，或只是当前目录。 适用于当一个目录被指定时，且只在支持的平台（详见 Caveats）。默认 = false
	encoding <string> 指定用于传给监听器的文件名的字符编码。默认 = 'utf8'
listener <Function> | <undefined> Default: undefined
	eventType <string>
	filename <string> | <Buffer>
~~~



~~~js
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')


const uploadToServer = () => {

    const originPath = path.resolve(__dirname, './docs/.vuepress/dist')
    const targetPath = '/data/my_docs/'

    const serverUserName = 'root'
    const server_IP = '43.138.53.141:'
    const command = `scp -r ${originPath} ${serverUserName}@${server_IP}${targetPath}`
    console.log(command, '命令开始执行----------')
    const ls = exec(command, {
        shell: true,
        cwd: process.cwd()
    }, (err, stdout, stderr) => {
        if (err) {
            console.log(`错误${err}`)
        }
        if (stderr) {
            console.log(`运行错误${stderr}`)
        }
        console.log(command, '命令执行完成-------------')
        console.log(stdout)
    })
}
//当文件发生变化（新增删除修改 rename change）都会触发回调的执行
const watchDist = () => {
    const dirPath = path.resolve(__dirname, './docs/.vuepress/dist')
    const timer = null
    fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
        // 防止重复调用
        timer = setTimeout(() => {
            if (timer) clearTimeout(timer)
            uploadToServer()
        }, 10000)
    })

}
watchDist()
~~~







## 子进程child_process

### exec

**创建异步进程**

1. 参数command
   * `command` 运行的命令，参数使用空格分隔。
2. options
   * cwd 子进程的当前工作目录。
   * `shell` 执行命令的 shell。在 UNIX 上默认为 `'/bin/sh'`，在 Windows 上默认为 `process.env.ComSpec`。
   * `timeout`默认为 `0`。
   * `maxBuffer` `stdout` 或 `stderr` 允许的最大字节数。默认为 `200*1024`。如果超过限制，则子进程会被终止。详见 [`maxBuffer`与Unicode](https://www.nodeapp.cn/child_process.html#child_process_maxbuffer_and_unicode)。
   * `windowsHide`  隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 `false`。
3. callback回调 - - 进程终止时调用。
   * `error` **成功时error为null**
   * `stdout` `stderr `传给回调的`stdout` 和 `stderr` 参数会包含子进程的 `stdout` 和 `stderr` 的输出。 默认情况下，Node.js 会解码输出为 UTF-8，并将字符串传给回调。 `encoding` 选项可用于指定用于解码 `stdout` 和 `stderr` 输出的字符编码。
4. 函数返回值为子进程

~~~ts
import { exec } from 'child_process'
const child_process = exec(command[, options][, callback])
const my_typora_path = 'D:\\typora安装\\Typora\\Typora.exe'
运行typora.exe 文件并打开指定md文件
const exec_typora = (md_file) => {
    if (process.env.NODE_ENV === 'production' || !my_typora_path) {
        return
    }
    const typora_path = path.normalize(my_typora_path)
    if (!fs.existsSync(typora_path)) {
        return
    }
    md_file = path.normalize(md_file)
    console.log(md_file);
    exec(`${typora_path} ${md_file} `, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    })
}
exec_typora('xxx.md')
~~~

### spawn

* `modulePath` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) 要在子进程中运行的模块。
* `args` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) 字符串参数列表。
* options
  * `cwd` 子进程的当前工作目录。
  * `env`环境变量键值对。
  * `execPath`  用来创建子进程的执行路径。
  * `execArgv`  要传给执行路径的字符串参数列表。默认为 `process.execArgv`。
  * `silent` 如果为 `true`，则子进程中的 stdin、 stdout 和 stderr 会被导流到父进程中，否则它们会继承自父进程，详见 [`child_process.spawn()`] 的 [`stdio`] 中的 `'pipe'` 和 `'inherit'` 选项。 默认: `false`。
  * `stdio` 详见 [`child_process.spawn()`] 的 [`stdio`]。 当提供了该选项，则它会覆盖 `silent`。 如果使用了数组变量，则该数组必须包含一个值为 `'ipc'` 的子项，否则会抛出错误。 例如 `[0, 1, 2, 'ipc']`。
  * `windowsVerbatimArguments` 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略。**默认值:** `false`。
  * `uid` 设置该进程的用户标识。（详见 [setuid(2)](http://man7.org/linux/man-pages/man2/setuid.2.html)）
  * `gid` 设置该进程的组标识。（详见 [setgid(2)](http://man7.org/linux/man-pages/man2/setgid.2.html)）
  * `shell` 如果为 `true`，则在一个 shell 中运行 `command`。 在 UNIX 上使用 `'/bin/sh'`，在 Windows 上使用 `process.env.ComSpec`。 一个不同的 shell 可以被指定为字符串。 See [Shell Requirements][] and [Default Windows Shell][]. 默认为 `false`（没有 shell）。
* 返回值`ChildProcess`

`child_process.fork()` 方法是 [`child_process.spawn()`] 的一个特殊情况，专门用于衍生新的 Node.js 进程。 跟 [`child_process.spawn()`] 一样返回一个 [`ChildProcess`] 对象。 返回的 [`ChildProcess`] 会有一个额外的内置的通信通道，它允许消息在父进程和子进程之间来回传递。 详见 [`subprocess.send()`]。

衍生的 Node.js 子进程与两者之间建立的 IPC 通信信道的异常是独立于父进程的。 每个进程都有自己的内存，使用自己的 V8 实例。 由于需要额外的资源分配，因此不推荐衍生大量的 Node.js 进程。

默认情况下，`child_process.fork()` 会使用父进程中的 [`process.execPath`] 衍生新的 Node.js 实例。 `options` 对象中的 `execPath` 属性可以替换要使用的执行路径。

使用自定义的 `execPath` 启动的 Node.js 进程，会使用子进程的环境变量 `NODE_CHANNEL_FD` 中指定的文件描述符（fd）与父进程通信。

注意，不像 POSIX 系统回调中的 [fork(2)](http://man7.org/linux/man-pages/man2/fork.2.html)，`child_process.fork()` 不会克隆当前进程。

提示: 在使用`child_process.fork()` 产生的子进程内，使用 [`child_process.spawn()`][] 会自动忽略掉其中的`shell` 配置选项并不会生效。

~~~ts
const { spawn } = require('child_process');
const ls = spawn('pnpm', ['-h'], {
    cwd: process.cwd(),
    shell: true
});

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});
ls.on('error', (err) => {
    console.log('启动子进程失败。', err);
});
ls.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
});
~~~

### stdio参数的配置

`options.stdio` 选项用于配置子进程与父进程之间建立的管道。 默认情况下，子进程的 stdin、 stdout 和 stderr 会重定向到 [`ChildProcess`] 对象上相应的 [`subprocess.stdin`]、 [`subprocess.stdout`] 和 [`subprocess.stderr`] 流。 这等同于将 `options.stdio` 设为 `['pipe', 'pipe', 'pipe']`。

为了方便起见，`options.stdio` 可以是以下字符串之一：

* `'pipe'` - 等同于 `['pipe', 'pipe', 'pipe']` （默认）
* `'ignore'` - 等同于 `['ignore', 'ignore', 'ignore']`
* `'inherit'` - 等同于 `[process.stdin, process.stdout, process.stderr]` 或 `[0,1,2]`

另外，`option.stdio` 的值是一个每个索引都对应一个子进程 fd 的数组。 fd 的 0、1 和 2 分别对应 stdin、stdout 和 stderr。 额外的 fd 可以被指定来创建父进程和子进程之间的额外管道。 该值是以下之一：

1. `'pipe'` - 创建一个子进程和父进程之间的管道。 在管道的父端以 [`subprocess.stdio[fd]`][`stdio`] 的形式作为 `child_process` 对象的一个属性暴露给父进程。 为 fd 创建的管道 0 - 2 也可分别作为 [`subprocess.stdin`]、[`subprocess.stdout`] 和 [`subprocess.stderr`]。
2. `'ipc'` - 创建一个用于父进程和子进程之间传递消息或文件描述符的 IPC 通道符。 一个 [`ChildProcess`] 最多只能有一个 IPC stdio 文件描述符。 设置该选项可启用 [`subprocess.send()`] 方法。 如果子进程是一个 Node.js 进程，则一个已存在的 IPC 通道会在子进程中启用 [`process.send()`]、[`process.disconnect()`]、[`process.on('disconnect')`] 和 [`process.on('message')`]。
3. `'ignore'` - 指示 Node.js 在子进程中忽略 fd。 由于 Node.js 总是会为它衍生的进程打开 fd 0 - 2，所以设置 fd 为 `'ignore'` 可以使 Node.js 打开 `/dev/null` 并将它附加到子进程的 fd 上。
4. 对象 - 共享一个指向子进程的 tty、文件、socket 或管道的可读或可写流。 流的底层文件描述符在子进程中是重复对应该 `stdio` 数组的索引的 fd。 注意，该流必须有一个底层描述符（文件流直到 `'open'` 事件发生才需要）。
5. 正整数 - 整数值被解析为一个正在父进程中打开的文件描述符。 它和子进程共享，类似于  是如何被共享的。
6. `null`, `undefined` - 使用默认值。 对于 stdio fd 0、1 和 2（换言之，stdin、stdout 和 stderr）而言是创建了一个管道。 对于 fd 3 及以上而言，默认值为 `'ignore'`。

例子：

```js
const { spawn } = require('child_process');

// 子进程使用父进程的 stdios
spawn('prg', [], { stdio: 'inherit' });

// 衍生的子进程只共享 stderr
spawn('prg', [], { stdio: ['pipe', 'pipe', process.stderr] });

// 打开一个额外的 fd=4，用于与程序交互
spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });
```

当在父进程和子进程之间建立了一个 IPC 通道，且子进程是一个 Node.js 进程，则子进程会带着未引用的 IPC 通道（使用 `unref()`）启动，直到子进程为 [`process.on('disconnect')`] 事件或 [`process.on('message')`] 事件注册了一个事件句柄。 这使得子进程可以在进程没有通过打开的 IPC 通道保持打开的情况下正常退出。

详见 [`child_process.exec()`] 和 [`child_process.fork()`]。









## 路径

### 规范化路径normalize(path)

`path.normalize()` 方法会规范化给定的 `path`，并解析 `'..'` 和 `'.'` 片段。

当发现多个连续的路径分隔符时（如 POSIX 上的 `/` 与 Windows 上的 `\` 或 `/`），它们会被单个的路径分隔符（POSIX 上是 `/`，Windows 上是 `\`）替换。 末尾的多个分隔符会被保留。

如果 `path` 是一个长度为零的字符串，则返回 `'.'`，表示当前工作目录。



### 计算相对路径relative(from, to)

`path.relative()` 方法返回从 `from` 到 `to` 的相对路径（基于当前工作目录）。 如果 `from` 和 `to` 各自解析到同一路径（调用 `path.resolve()`），则返回一个长度为零的字符串。

如果 `from` 或 `to` 传入了一个长度为零的字符串，则当前工作目录会被用于代替长度为零的字符串。



### 解析路径resolve([...paths])

::: warning

1. 如果处理完全部给定的 `path` 片段后还未生成一个绝对路径，则当前工作目录会被用上
2. 如果没有传入 `path` 片段，则 `path.resolve()` 会返回当前工作目录的绝对路径。



:::

```js
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```



### 取路径最后一部分basename(path[, ext])

```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```



### 获取路径扩展名

`path.extname()` 方法返回 `path` 的扩展名，即从 `path` 的最后一部分中的最后一个 `.`（句号）字符到字符串结束。 如果 `path` 的最后一部分没有 `.` 或 `path` 的文件名（见 `path.basename()`）的第一个字符是 `.`，则返回一个空字符串。

```js
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''
```



### 拼接路径片段join([...paths])

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```
