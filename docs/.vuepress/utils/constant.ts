const SUBJECTS = {
    react: 'react',
    vue: 'vue',
    sass: 'sass',
    ts: 'typeScript',
    node: 'node',
    js: 'javaScript',
    docker: 'docker',
    go: 'golang',
    npm: 'packageManager',
    vite: 'vite',
    engineering: 'FrontEndEngineering',
    ['计算机网络']: 'ComputerNetwork',
    ['服务器']: 'Server',
    linux: 'linux',
    shell: 'shell',
    css: 'css',
    canvas: 'canvas',
    utils: {
        node: 'nodeDependency',
        vuepress: 'vuepress'
    },
    optimize: 'optimize',
    English: 'English',
    git: 'Git',
    browser: 'Browser',
    project: 'Project',
    algorithms: 'Algorithms',
    os: 'OS',
    specialEffects: 'specialEffects',
    web3: 'web3',
    reg: 'reg'
}

const Notes_Sidebar_Setting = [
    [SUBJECTS.go, 'golang.md'],
    [SUBJECTS.react, 'fiber.md', 'diff.md', '基础.md', 'React状态管理.md'],
    [SUBJECTS.vue, 'diff.md', 'vueRouter.md', 'vue3.3版本.md', 'pinia.md', '响应式原理.md', '编译原理.md', 'vue-loader初探.md', 'Vue3异步更新.md', 'Vue内置组件.md', 'Vue生命周期.md'],
    [SUBJECTS.sass, 'grammar.md'],
    [SUBJECTS.ts, 'grammar.md', '类型体操.md'],
    [SUBJECTS.node, 'node基础知识.md', 'common_apis.md', 'pm2.md', 'sequelize.md'],
    [SUBJECTS.js, '必会APIs.md', 'js进阶.md', '设计模式.md'],
    [SUBJECTS.docker, 'docker基础知识.md'],
    [SUBJECTS.linux, 'linux常用指令.md', 'shell脚本.md'],
    [SUBJECTS.css, '你不知道的css.md'],
    [SUBJECTS.canvas, 'canvas基础.md'],
    [SUBJECTS.engineering,
        'webpack搭建Vue3ts.md',
        'vite必懂知识.md',
        'webpack必懂知识.md',
        'Vite插件开发.md',
        'packageJson文件.md',
        '包管理器的相关知识.md',
        '微前端.md',
        '项目初始化.md',
        'rollup.md',
        '单元测试.md',
        '跨端开发.md'
    ],
    [SUBJECTS.optimize, '性能优化.md'],
    [SUBJECTS.git, 'Git基础.md'],
    [SUBJECTS.English, '英语单词.md'],
    [SUBJECTS.browser, '浏览器必备知识.md'],
    [SUBJECTS.algorithms, '算法.md', '数据结构.md'],
    [SUBJECTS['服务器'], 'Nginx.md'],
    [SUBJECTS.web3, 'Web3.md'],
    [SUBJECTS.reg, '正则表达式.md']

]
const Interview_Sidebar_Setting = [
    [SUBJECTS.node, 'node面经.md'],
    [SUBJECTS['计算机网络'], '计算机网络.md'],
    [SUBJECTS.js, 'js面经.md',],
    [SUBJECTS.css, 'css面经.md'],
    [SUBJECTS.vue, 'Vue面经.md'],
    [SUBJECTS.browser, '浏览器相关面经.md'],
    [SUBJECTS.os, '操作系统.md']

]
const Problems_Sidebar_Setting = [
    [SUBJECTS.node, 'pm2.md'],
    [SUBJECTS['服务器'], '服务器.md'],
    [SUBJECTS.js, '埋点.md', 'js中遇到的问题.md'],
    [SUBJECTS.project, '项目中得到的问题.md'],
    [SUBJECTS.css, 'CSS相关问题.md']
]
const Utils_Sidebar_Setting = [
    [SUBJECTS.utils.vuepress, 'Vuepress插件.md'],
    [SUBJECTS.utils.node, '好用的依赖工具包.md'],
    [SUBJECTS.specialEffects, 'js实现效果.md']
]



const my_typora_path = "D:\\typora安装\\Typora\\Typora.exe"

const Problems_navbar_Setting = [
    SUBJECTS['服务器'],
    SUBJECTS.js,
    SUBJECTS.project,
    SUBJECTS.node,
    SUBJECTS.css

]
const Interview_navbar_Setting = [
    SUBJECTS.node,
    SUBJECTS['计算机网络'],
    SUBJECTS.js,
    SUBJECTS.css,
    SUBJECTS.vue,
    SUBJECTS.browser,
    SUBJECTS.os
]
const Utils_navbar_Setting = [
    SUBJECTS.utils.vuepress,
    SUBJECTS.utils.node,
    SUBJECTS.specialEffects
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
    SUBJECTS.canvas,
    SUBJECTS.engineering,
    SUBJECTS.optimize,
    SUBJECTS.English,
    SUBJECTS.git,
    SUBJECTS.browser,
    SUBJECTS.algorithms,
    SUBJECTS['服务器'],
    SUBJECTS.go,
    SUBJECTS.web3,
    SUBJECTS.reg
]
export {
    Notes_Sidebar_Setting,
    Interview_Sidebar_Setting,
    Problems_Sidebar_Setting,
    Problems_navbar_Setting,
    Interview_navbar_Setting,
    Notes_navbar_Setting,
    my_typora_path,
    Utils_navbar_Setting,
    Utils_Sidebar_Setting
}
