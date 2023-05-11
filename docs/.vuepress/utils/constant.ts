const SUBJECTS = {
    react: 'react',
    vue: 'vue',
    sass: 'sass',
    ts: 'typeScript',
    node: 'node',
    js: 'javaScript',
    docker: 'docker',
    npm: '包管理工具',
    vite: 'vite',
    webpack: 'webpack',
    ['计算机网络']: 'ComputerNetwork',
    ['服务器']: 'Server',
    linux: 'linux',
    css: 'css',
    canvas: 'canvas'
}

const Notes_Sidebar_Setting = [
    [SUBJECTS.react, 'fiber.md', 'diff.md'],
    [SUBJECTS.vue, 'diff.md'],
    [SUBJECTS.sass, 'grammar.md'],
    [SUBJECTS.ts, 'grammar.md'],
    [SUBJECTS.node, 'node基础知识.md', 'common_apis.md', 'pm2.md'],
    [SUBJECTS.js, '必会APIs.md'],
    [SUBJECTS.docker, 'docker基础知识.md'],
    [SUBJECTS.linux, 'linux常用指令.md'],
    [SUBJECTS.css, '你不知道的css.md'],
    [SUBJECTS.canvas, 'canvas基础.md']

]
const Interview_Sidebar_Setting = [
    [SUBJECTS.node, 'node面经.md'],
    [SUBJECTS['计算机网络'], '计算机网络.md'],
]
const Problems_Sidebar_Setting = [
    [SUBJECTS.node, 'pm2.md'],
    [SUBJECTS['服务器'], '服务器.md'],
]



const my_typora_path = "D:\\typora安装\\Typora\\Typora.exe"

const Problems_navbar_Setting = [
    SUBJECTS['服务器'],
]
const Interview_navbar_Setting = [
    SUBJECTS.node,
    SUBJECTS['计算机网络']
]
const Notes_navbar_Setting = [
    SUBJECTS.react,
    SUBJECTS.vue,
    SUBJECTS.sass,
    SUBJECTS.ts,
    SUBJECTS.node,
    SUBJECTS.js,
    SUBJECTS.docker,
    SUBJECTS.linux,
    SUBJECTS.css,
    SUBJECTS.canvas
]
export {
    Notes_Sidebar_Setting,
    Interview_Sidebar_Setting,
    Problems_Sidebar_Setting,
    Problems_navbar_Setting,
    Interview_navbar_Setting,
    Notes_navbar_Setting,
    my_typora_path
}