export const data = JSON.parse("{\"key\":\"v-cf3d8628\",\"path\":\"/Problems/Test/test.html\",\"title\":\"test\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"test\",\"description\":\"关键功能\",\"collapsible\":true},\"headers\":[],\"git\":{},\"filePathRelative\":\"Problems/Test/test.md\"}")

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
