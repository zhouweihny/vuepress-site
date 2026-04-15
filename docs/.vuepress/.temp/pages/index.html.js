import comp from "C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"首页\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"title\":\"首页\",\"heroText\":\"欢迎来到我的网站\",\"tagline\":\"使用 VuePress 2 构建\"},\"git\":{\"updatedTime\":1773966443000,\"contributors\":[{\"name\":\"周炜\",\"username\":\"\",\"email\":\"zw314301.jx@chinatelecom.cn\",\"commits\":1}],\"changelog\":[{\"hash\":\"90709e8dfbf8a2c1b2452507bc8f4cab9ed9cae2\",\"time\":1773966443000,\"email\":\"zw314301.jx@chinatelecom.cn\",\"author\":\"周炜\",\"message\":\"Initial commit: VuePress 2 site with default theme\"}]},\"filePathRelative\":\"README.md\"}")
export { comp, data }

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
