# TinyChart - ECharts 组件封装使用指南

> 基于 ECharts 5 的轻量级 Vue 3 组件封装，支持按需引入、自适应缩放、一键集成。

---

## 一、概述

`TinyChart` 是对 Apache ECharts 的封装，主要特点：

- 📦 **按需引入**：只注册使用的图表类型，减少打包体积
- 🔄 **自动响应**：内置 `DomResizeObserver`，容器大小变化时自动重绘
- 🎨 **大屏适配**：提供 `vw()` / `vh()` 方法，基于 1920x1080 设计稿
- ⚡ **零运行时开销**：Canvas 渲染，性能优异
- 🛠️ **TypeScript 支持**：完整的类型定义

---

## 二、快速开始

### 2.1 安装依赖

```bash
npm install echarts
```

### 2.2 在线演示

想快速体验 TinyChart 的效果？访问在线 Demo：

- 👉 **[TinyChart 在线演示](/tinychart-demo.html)** 
  - 左侧代码实时编辑
  - 右侧图表即时预览
  - 包含柱状图、折线图、饼图、散点图、仪表盘等 6 种示例

### 2.3 全局引入（一次性配置）

在项目入口文件（如 `main.ts`）中引入 `index.ts`：

```typescript
import '@/components/chart'  // 会自动注册 echarts 和组件
```

> ⚠️ 确保 `src/components/chart/index.ts` 路径正确

### 2.3 使用示例

```vue
<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TinyChart from '@/components/chart'

const chartRef = ref<HTMLElement>()

onMounted(() => {
  // 创建图表实例
  const chart = new TinyChart(chartRef.value!, {
    autoResize: true,  // 自动监听容器大小变化
    onClick: (params) => console.log('点击:', params)
  })

  // 设置图表配置
  chart.setOptions({
    title: { text: '我的第一个图表' },
    tooltip: {},
    xAxis: { data: ['A', 'B', 'C'] },
    yAxis: {},
    series: [{
      type: 'bar',
      data: [10, 20, 30]
    }]
  })

  // 销毁图表（组件卸载时调用）
  // chart.destroy()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
```

---

## 三、API 参考

### 3.1 构造函数

```typescript
new TinyChart(el: HTMLElement, option?: TOption)
```

**参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| `el` | `HTMLElement` | 图表容器 DOM 元素（必须） |
| `option` | `TOption` | 配置对象（可选） |

**TOption 结构**：

```typescript
interface TOption {
  autoResize?: boolean;     // 是否自动监听容器大小变化，默认 true
  onClick?: (params: any) => void;  // 图表点击回调
  onResize?: () => void;    // 大小变化回调
  onReady?: () => void;     // 初始化完成回调
  [key: string]: any;       // 其他 ECharts option 直接透传
}
```

### 3.2 实例方法

#### `setOptions(option: Record<string, any>)`

设置或更新图表配置。支持多次调用，ECharts 会自动合并。

```typescript
chart.setOptions({
  title: { text: '新标题' },
  series: [{ data: [1, 2, 3] }]
})
```

#### `dispatchAction(option: Record<string, any>)`

触发图表 action，如显示 tooltip、选中数据项等。

```typescript
// 显示 tooltip
chart.dispatchAction({
  type: 'showTip',
  seriesIndex: 0,
  dataIndex: 2
})

// 选中某个数据项
chart.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  dataIndex: 1
})
```

#### `vw(val: number)` / `vh(val: number)`

大屏适配辅助函数，根据当前窗口尺寸换算设计稿尺寸。

```typescript
// 设计稿 1920x1080，想要一个宽度为 200px 的容器
const realWidth = chart.vw(200)  // 返回: 200 * (当前窗口宽 / 1920)

// 使用
const fontSize = chart.vh(16)  // 根据屏幕高度自适应字体
```

#### `destroy()`

销毁图表实例，移除事件监听和 DOM 引用。**组件卸载时必须调用！**

```typescript
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  chart.destroy()
})
```

#### `getChart(): any`

获取原生 ECharts 实例（高级用法，慎用）。

```typescript
const echartsInstance = chart.getChart()
echartsInstance.getDataURL()  // 导出图片
```

---

## 四、支持的图表类型

`index.ts` 已注册的图表类型：

| 类型 | 对应 ECharts Chart | 说明 |
|------|-------------------|------|
| `bar` | BarChart | 柱状图/条形图 |
| `pictorialBar` | PictorialBarChart | 象形柱图 |
| `line` | LineChart | 折线图 |
| `pie` | PieChart | 饼图/环形图 |
| `scatter` | ScatterChart | 散点图 |
| `gauge` | GaugeChart | 仪表盘 |
| `map` | MapChart | 地图 |
| `funnel` | FunnelChart | 漏斗图 |
| `graph` | GraphChart | 关系图 |
| `custom` | CustomChart | 自定义图表 |

### 4.1 常用图表示例

#### 柱状图

```typescript
chart.setOptions({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: [120, 200, 150, 80, 70],
    itemStyle: { color: '#1890ff' }
  }]
})
```

#### 折线图

```typescript
chart.setOptions({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',
    data: [120, 200, 150, 80, 70],
    smooth: true,
    lineStyle: { width: 3 }
  }]
})
```

#### 饼图

```typescript
chart.setOptions({
  series: [{
    type: 'pie',
    radius: '50%',
    data: [
      { value: 1048, name: 'Direct' },
      { value: 735, name: 'Email' },
      { value: 580, name: 'Search' },
      { value: 484, name: 'Ads' }
    ]
  }]
})
```

#### 散点图

```typescript
chart.setOptions({
  xAxis: { scale: true },
  yAxis: { scale: true },
  series: [{
    type: 'scatter',
    data: [[10, 20], [15, 30], [25, 40], [35, 25]]
  }]
})
```

---

## 五、高级功能

### 5.1 大屏适配

`TinyChart` 提供了 `vw()` 和 `vh()` 辅助函数，基于 **1920x1080** 设计稿自动换算：

```typescript
const chart = new TinyChart(container, {
  autoResize: true
})

// 在 setOptions 中使用
chart.setOptions({
  title: {
    text: '销售统计',
    left: 'center',
    top: chart.vh(20),  // 距离顶部 20/1080 * 100%
    textStyle: {
      fontSize: chart.vh(24)  // 字体随屏幕高度缩放
    }
  },
  grid: {
    top: chart.vh(100),
    bottom: chart.vh(80),
    left: chart.vw(80),
    right: chart.vw(60)
  }
})
```

### 5.2 动态更新数据

```typescript
// 模拟实时数据
setInterval(() => {
  const newData = Array.from({ length: 5 }, () => Math.random() * 100)
  chart.setOptions({
    series: [{ data: newData }]
  })
}, 3000)
```

### 5.3 图表事件监听

虽然 `TinyChart` 封装了 `onClick` 构造参数，但也可以通过原生 ECharts 实例监听：

```typescript
const echartsInstance = chart.getChart()

echartsInstance.on('click', (params) => {
  console.log('图表点击:', params)
})

echartsInstance.on('mouseover', (params) => {
  console.log('悬停:', params)
})
```

### 5.4 导出图片

```typescript
const url = chart.getChart().getDataURL({
  type: 'png',
  pixelRatio: 2,
  backgroundColor: '#fff'
})

// 下载
const a = document.createElement('a')
a.href = url
a.download = 'chart.png'
a.click()
```

---

## 六、组件化封装（Vue 3）

可以将 `TinyChart` 封装为可复用的 Vue 组件：

```vue
<!-- MyChart.vue -->
<template>
  <div ref="chartRef" class="chart-component"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import TinyChart from '@/components/chart'

const props = defineProps<{
  option: Record<string, any>
  autoResize?: boolean
}>()

const chartRef = ref<HTMLElement>()
let chart: TinyChart | null = null

onMounted(() => {
  if (chartRef.value) {
    chart = new TinyChart(chartRef.value, {
      autoResize: props.autoResize ?? true
    })
    chart.setOptions(props.option)
  }
})

watch(() => props.option, (newOption) => {
  chart?.setOptions(newOption)
}, { deep: true })

onBeforeUnmount(() => {
  chart?.destroy()
})
</script>

<style scoped>
.chart-component {
  width: 100%;
  height: 100%;
}
</style>
```

使用：

```vue
<template>
  <MyChart :option="chartOption" />
</template>
```

---

## 七、ChatMap 组件

`ChatMap.vue` 是一个基于 ECharts 的**地图组件**，实现了：

- 🗺️ 多级地图钻取（省→市→区县）
- 📍 气泡散点标注
- 🎨 多层地图叠加（阴影、渐变效果）
- 🔄 面包屑导航（返回上级）
- 📡 动态加载地图 JSON（阿里云 DataV 或后端）

### 7.1 使用方法

```vue
<template>
  <ChatMap @onChanged="handleAreaChange" />
</template>

<script setup>
import ChatMap from '@/components/chart/ChatMap.vue'

const handleAreaChange = ({ name, areaCode }) => {
  console.log('当前区域:', name, areaCode)
}
</script>
```

### 7.2 地图数据源

组件支持两种地图数据源：

1. **阿里云 DataV**（其他省份）：
   ```
   https://geo.datav.aliyun.com/areas_v2/bound/440000.json  # 广东省
   ```

2. **后端接口**（江西省，通过 `gisinfo(areaCode)` 获取）

### 7.3 样式定制

组件硬编码了部分样式（渐变、边框等），如需自定义，修改 `getOption()` 函数内的配置。

---

## 八、性能优化建议

1. **按需引入图表类型**：`index.ts` 已做按需引入，如需新增图表类型，在 `echarts.use([...])` 中添加
2. **减少 setOptions 频率**：频繁更新时考虑 `merge` 选项或使用 `dispatchAction`
3. **大数据量使用 dataset**：ECharts 的 dataset 组件能提升大数据渲染性能
4. **及时销毁**：组件卸载时务必调用 `destroy()`

---

## 九、常见问题

### Q1: 地图不显示，控制台报 `Map is not registered`

**原因**：未调用 `echarts.registerMap` 注册地图数据。

**解决**：在 `getOption` 前确保已获取地图 JSON 并注册。

### Q2: 容器宽度高度为 0？

**原因**：容器父级未设置尺寸。

**解决**：确保 `.chart-container` 有明确的 `width` 和 `height`。

### Q3: 窗口缩放图表不更新？

**原因**：`autoResize` 未开启或容器不是响应式布局。

**解决**：
```typescript
new TinyChart(el, { autoResize: true })
```
并确保容器尺寸变化能被检测（如 `flex` 布局需显式设置高度）。

### Q4: 如何引入更多 ECharts 组件（如 dataZoom、visualMap）？

在 `index.ts` 的 imports 中添加：

```typescript
import { DataZoomComponent, VisualMapComponent } from 'echarts/components'
echarts.use([DataZoomComponent, VisualMapComponent])
```

---

## 十、参考资源

- [ECharts 官方文档](https://echarts.apache.org/zh/index.html)
- [ECharts 示例库](https://echarts.apache.org/examples/zh/index.html)
- [Vue 3 组合式 API](https://cn.vuejs.org/guide/introduction.html)

---

*文档基于 `D:\workspace\yjjg-dp\src\components\chart` 源码整理*
*更新日期：2025-03-20*