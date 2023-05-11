import { defineUserConfig, defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import theme from './theme.config'
import path from 'path'


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'fancy——Blog',
    theme,
    public: `${path.resolve(__dirname, './public')}`,
    plugins: [
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