export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"博客\",\"link\":\"/blog/\"},{\"text\":\"指南\",\"children\":[{\"text\":\"部署指南\",\"link\":\"/guide/部署指南.html\"},{\"text\":\"VuePress 入门\",\"link\":\"/guide/\"},{\"text\":\"大屏适配开发 指南\",\"link\":\"/mixin-guide.html\"}]},{\"text\":\"地图开发\",\"children\":[{\"text\":\"AmapPortable (高德地图)\",\"link\":\"/amap-portable-guide.html\"},{\"text\":\"CesiumPortable (三维地球)\",\"link\":\"/cesium-portable-guide.html\"}]},{\"text\":\"图表开发\",\"children\":[{\"text\":\"TinyChart 使用指南\",\"link\":\"/tinychart-guide.html\"},{\"text\":\"在线演示 (Demo)\",\"link\":\"/tinychart-demo.html\"}]},{\"text\":\"jQuery 教程\",\"children\":[{\"text\":\"概述\",\"link\":\"/jquery/\"},{\"text\":\"选择器\",\"link\":\"/jquery/选择器.html\"},{\"text\":\"DOM 操作\",\"link\":\"/jquery/dom操作.html\"},{\"text\":\"事件处理\",\"link\":\"/jquery/事件.html\"},{\"text\":\"动画效果\",\"link\":\"/jquery/动画.html\"},{\"text\":\"AJAX 请求\",\"link\":\"/jquery/ajax.html\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"heading\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
