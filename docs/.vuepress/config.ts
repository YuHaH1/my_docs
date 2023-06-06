import { defineUserConfig, defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import theme from './theme.config'
import path from 'path'
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'fancy——Blog',
    theme,
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', { rel: 'icon', href: '/hero.jpg' }
        ]
    ],
    public: `${path.resolve(__dirname, './public')}`,
    plugins: [
        commentPlugin({
            // your options
            provider: "Giscus",
            comment: true, //启用评论功能
            repo: 'YuHaH1/my_docs',
            repoId: 'R_kgDOJhp_Ig',
            category: 'Announcements',
            categoryId: 'DIC_kwDOJhp_Is4CWaUE',
            mapping: 'title'
        }),
        searchPlugin({
            locales: {
                '/': {
                    placeholder: '搜索关键词',
                },
                '/zh/': {
                    placeholder: '搜索',
                },
            },
        }),

    ]
})