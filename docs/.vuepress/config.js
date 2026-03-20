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
        children: [
          {
            text: '部署指南',
            link: '/guide/部署指南.html'
          },
          {
            text: 'VuePress 入门',
            link: '/guide/'
          },
          {
            text: '大屏适配开发 指南',
            link: '/mixin-guide.html'
          }
        ]
      },
      {
        text: '地图开发',
        children: [
          {
            text: 'AmapPortable (高德地图)',
            link: '/amap-portable-guide.html'
          },
          {
            text: 'CesiumPortable (三维地球)',
            link: '/cesium-portable-guide.html'
          }
        ]
      },
      {
        text: '图表开发',
        children: [
          {
            text: 'TinyChart 使用指南',
            link: '/tinychart-guide.html'
          },
          {
            text: '在线演示 (Demo)',
            link: '/tinychart-demo.html'
          }
        ]
      },
      {
        text: 'jQuery 教程',
        children: [
          {
            text: '概述',
            link: '/jquery/'
          },
          {
            text: '选择器',
            link: '/jquery/选择器.html'
          },
          {
            text: 'DOM 操作',
            link: '/jquery/dom操作.html'
          },
          {
            text: '事件处理',
            link: '/jquery/事件.html'
          },
          {
            text: '动画效果',
            link: '/jquery/动画.html'
          },
          {
            text: 'AJAX 请求',
            link: '/jquery/ajax.html'
          }
        ]
      }
    ]
  })
})