import { defineUserConfig, defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import theme from './theme.config'
import path from 'path'
import { commentPlugin } from "vuepress-plugin-comment2";
import katex from 'markdown-it-katex'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'fancy——Blog',
    theme,
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', { rel: 'icon', href: '/hero.jpg' }
        ],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
        ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
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

    ],
    extendsMarkdown(md) {
        md.set({ html: true });
        md.use(katex);
    },
})
