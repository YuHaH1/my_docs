export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"hero.jpg\",\"heroText\":\"Learning consistently\",\"actionLink\":\"/React/Fiber.md\",\"tagline\":\"go on\",\"actions\":[{\"text\":\"快速查看笔记\",\"link\":\"/Notes/React/Fiber.md\",\"type\":\"primary\"},{\"text\":\"快速查看面经\",\"link\":\"/Interview/计网/计算机网络相关面试题.md\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"Clear and concise\",\"details\":\"使用简单易懂的话编写博客\"},{\"title\":\"Interest driven\",\"details\":\"用丰富的案例和页面效果驱动学习\"},{\"title\":\"Enrichment and synthesis\",\"details\":\"涵盖常见知识和问题\"}],\"footer\":\"不畏长松卧壑困风霜，时来屹立扶明堂\"},\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"README.md\"}")

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
