export const data = JSON.parse("{\"key\":\"v-5e91d581\",\"path\":\"/Notes/Node/test.html\",\"title\":\"node\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"node\",\"description\":\"关键功能\",\"collapsible\":true},\"headers\":[],\"git\":{},\"filePathRelative\":\"Notes/Node/test.md\"}")

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
