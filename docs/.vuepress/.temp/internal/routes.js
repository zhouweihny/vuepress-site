export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Administrator/.openclaw/workspace/vuepress-site/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"首页"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"C:/Users/Administrator/.openclaw/workspace/vuepress-site/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"指南"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/Administrator/.openclaw/workspace/vuepress-site/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
