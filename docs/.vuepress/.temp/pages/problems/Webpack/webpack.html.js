export const data = JSON.parse("{\"key\":\"v-3bb7ba10\",\"path\":\"/Problems/Webpack/webpack.html\",\"title\":\"webpack\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"webpack\",\"description\":\"关键功能\",\"collapsible\":true},\"headers\":[],\"git\":{},\"filePathRelative\":\"Problems/Webpack/webpack.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
