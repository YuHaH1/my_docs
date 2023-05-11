const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const ssh = require('ssh2');

const uploadToServer = () => {
    const originPath = path.resolve(__dirname, './docs/.vuepress/dist')
    const targetPath = '/data/my_docs/'
    const serverUserName = 'root'
    const server_IP = '43.138.53.141:'
    const command = `scp -r ${originPath} ${serverUserName}@${server_IP}${targetPath}`
    console.log(command, '命令开始执行----------')
    const ls = exec(command, {
        shell: false,// 不打开新的命令行
        cwd: process.cwd()
    }, (err, stdout, stderr) => {
        if (err) {
            console.log(`错误${err}`)
        }
        if (stderr) {
            console.log(`运行错误${stderr}`)
        }
        console.log(stdout)
        console.log(command, '命令执行完成-------------')
    })
}

const watchDist = () => {
    const dirPath = path.resolve(__dirname, './docs/.vuepress/dist')
    let timer = null
    fs.watch(dirPath, (eventType, filename) => {
        // 防止重复调用
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            uploadToServer()
        }, 10000);
    })
}
watchDist()




// // 创建 SSH 连接
// const conn = new ssh.Client();
// conn.on('ready', function () {
//     const originPath = path.resolve(__dirname, './docs/.vuepress/dist')
//     const targetPath = '/data'
//     // my_docs/
//     console.log('SSH 已连接');
//     // 执行 SSH 命令
//     conn.sftp(function (err, sftp) {
//         if (err) throw err;
//         sftp.stat(targetPath, (err, stat) => {
//             if (err) {
//                 console.log(`文件 ${targetPath} 不存在`);
//             } else {
//                 console.log(`文件权限: ${stat.mode.toString(8).slice(-3)}`);
//                 sftp.fastPut(originPath, targetPath, (err) => {
//                     if (err) console.log(err)
//                     console.log('dist文件上传成功')
//                 })
//             }
//         });

//         // 执行 SFTP 操作
//         // conn.end();
//     });
// }).connect({
//     host: '43.138.53.141',
//     port: 22,
//     username: 'root',
//     privateKey: fs.readFileSync('C:\\Users\\YR\\.ssh\\id_rsa')
// });
