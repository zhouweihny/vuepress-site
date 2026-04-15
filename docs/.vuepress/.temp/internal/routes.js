export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/amap-portable-guide.html", { loader: () => import(/* webpackChunkName: "amap-portable-guide.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/amap-portable-guide.html.js"), meta: {"title":"AmapPortable - 高德地图便携式封装指南"} }],
  ["/cesium-portable-guide.html", { loader: () => import(/* webpackChunkName: "cesium-portable-guide.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/cesium-portable-guide.html.js"), meta: {"title":"CesiumPortable - Cesium 三维地球封装指南"} }],
  ["/jquery-guide.html", { loader: () => import(/* webpackChunkName: "jquery-guide.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery-guide.html.js"), meta: {"title":"《锋利的jQuery》：前端开发的经典入门指南"} }],
  ["/mixin-guide.html", { loader: () => import(/* webpackChunkName: "mixin-guide.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/mixin-guide.html.js"), meta: {"title":"展厅 项目技术文档"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"首页"} }],
  ["/tinychart-guide.html", { loader: () => import(/* webpackChunkName: "tinychart-guide.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/tinychart-guide.html.js"), meta: {"title":"TinyChart - ECharts 组件封装使用指南"} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":"博客"} }],
  ["/blog/ued-and-ux.html", { loader: () => import(/* webpackChunkName: "blog_ued-and-ux.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/blog/ued-and-ux.html.js"), meta: {"title":"前端开发中的 UED：构建卓越用户体验的艺术"} }],
  ["/cesium/%E5%9B%BE%E7%89%87%E8%BD%ACcesium%E5%8A%A0%E8%BD%BDtiles%E5%88%87%E7%89%87%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B.html", { loader: () => import(/* webpackChunkName: "cesium_图片转cesium加载tiles切片实现流程.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/cesium/图片转cesium加载tiles切片实现流程.html.js"), meta: {"title":"demo 大图贴图全流程总结（含本次需求与落地步骤）"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"指南"} }],
  ["/guide/%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.html", { loader: () => import(/* webpackChunkName: "guide_部署指南.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/guide/部署指南.html.js"), meta: {"title":"使用 Cloudflare Pages + GitHub 免费部署 VuePress 2 博客完全指南"} }],
  ["/jquery/ajax.html", { loader: () => import(/* webpackChunkName: "jquery_ajax.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery/ajax.html.js"), meta: {"title":"AJAX 请求"} }],
  ["/jquery/dom%E6%93%8D%E4%BD%9C.html", { loader: () => import(/* webpackChunkName: "jquery_dom操作.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery/dom操作.html.js"), meta: {"title":"DOM 操作"} }],
  ["/jquery/", { loader: () => import(/* webpackChunkName: "jquery_index.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery/index.html.js"), meta: {"title":"jQuery 教程"} }],
  ["/jquery/%E4%BA%8B%E4%BB%B6.html", { loader: () => import(/* webpackChunkName: "jquery_事件.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery/事件.html.js"), meta: {"title":"事件处理（Event）"} }],
  ["/jquery/%E5%8A%A8%E7%94%BB.html", { loader: () => import(/* webpackChunkName: "jquery_动画.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery/动画.html.js"), meta: {"title":"动画效果（Animation）"} }],
  ["/jquery/%E9%80%89%E6%8B%A9%E5%99%A8.html", { loader: () => import(/* webpackChunkName: "jquery_选择器.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/jquery/选择器.html.js"), meta: {"title":"选择器（Selector）"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/open-claw-workspace/vuepress-site/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
