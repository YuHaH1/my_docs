import { defaultTheme } from 'vuepress'
import sidebar from './sidebar'
import navbar from './navbar'
export default defaultTheme({
    lastUpdated: true,
    lastUpdatedText: '最近更新时间',
    sidebar,
    logo: '/logo.png',
    navbar,

})