const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const uploadToServer = () => {
    const originPath = path.resolve(__dirname, './docs/.vuepress/dist')
    const targetPath = '/project/my_docs/'
    const serverUserName = 'root'
    const server_IP = '123.60.104.225:'
    const command = `scp -r ${originPath} ${serverUserName}@${server_IP}${targetPath}`
    console.log(command, '命令开始执行----------🚀🚀🚀🚀🚀🚀')
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
        console.log(command, '命令执行完成-------------🔚🔚🔚🔚🔚🔚🔚')
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
        }, 5000);
    })
}
watchDist()



