import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的网站',
  description: '使用 VuePress 2 构建的网站',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      }
    ]
  })
})