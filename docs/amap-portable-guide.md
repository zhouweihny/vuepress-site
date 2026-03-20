# AmapPortable - 高德地图便携式封装指南

> 基于高德地图 JavaScript API 2.0 的便携式封装，提供统一的地图操作接口，适用于 Vue 3 项目。

---

## 一、概述

`AmapPortable` 是一套轻量级的高德地图封装工具，采用 TypeScript 编写，专为 Vue 3 Composition API 设计。它统一了地图初始化、覆盖物管理、底图切换等常用操作，让高德地图的使用变得更加简单和可维护。

---

## 二、核心特性

- 🗺️ **统一的地图管理**：初始化、销毁、状态获取
- 📍 **丰富的覆盖物**：点、线、面、圆、信息窗口
- 🎨 **底图切换**：普通、卫星、地形三种模式
- 🔧 **分组管理**：支持覆盖物分组，便于批量操作
- ✏️ **编辑功能**：支持线、面、圆的图形编辑（需额外插件）
- 📱 **Vue 3 集成**：提供 `useAmapPortable` Composition 函数
- 📦 **TypeScript 支持**：完整的类型定义
- 🔄 **数据持久化**：覆盖物保存、恢复、JSON 序列化

---

## 三、快速开始

### 3.1 引入高德地图 API

在 `index.html` 中添加：

```html
<script src="https://webapi.amap.com/maps?v=2.0&key=YOUR_API_KEY"></script>
```

> ⚠️ 替换 `YOUR_API_KEY` 为你的高德地图 Key。[申请地址](https://lbs.amap.com/dev/key/app)

### 3.2 基本使用

```vue
<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAmapPortable } from '@/utils/amapPortable/useAmapPortable'

const mapContainer = ref<HTMLDivElement | null>(null)

const {
  init,           // 初始化地图
  addMarker,      // 添加标记
  addPolyline,    // 添加折线
  addPolygon,     // 添加多边形
  addCircle,      // 添加圆形
  flyTo,          // 飞行动画
  switchBaseMap   // 切换底图
} = useAmapPortable()

onMounted(async () => {
  if (!mapContainer.value) return

  // 1. 初始化地图
  await init({
    container: mapContainer.value,
    center: { longitude: 116.397428, latitude: 39.90923 }, // 北京
    zoom: 12
  })

  // 2. 添加标记点
  addMarker({
    id: 'beijing',
    longitude: 116.397428,
    latitude: 39.90923,
    title: '北京市',
    content: '<div style="font-size:12px">天安门广场</div>'
  })

  // 3. 添加折线
  addPolyline({
    id: 'route-1',
    path: [
      [116.391, 39.907],
      [116.398, 39.912],
      [116.405, 39.915]
    ],
    strokeColor: '#1890ff',
    strokeWeight: 4
  })

  // 4. 飞往某个位置
  // flyTo({ center: { longitude: 115.8922, latitude: 28.6765 }, zoom: 13 })
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
```

---

## 四、API 参考

### 4.1 初始化选项

```typescript
interface AmapPortableInitOptions {
  container: HTMLElement;           // 地图容器
  center?: {                        // 初始中心点
    longitude: number;
    latitude: number;
  };
  zoom?: number;                   // 初始缩放级别 (3-18)
  mapStyle?: string;               // 地图样式 URL
  viewMode?: '2D' | '3D';          // 视图模式
}
```

### 4.2 核心方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `init(options)` | `AmapPortableInitOptions` | `Promise<any>` | 初始化地图 |
| `getMap()` | - | `any` | 获取原生 AMap 实例 |
| `getCenter()` | - | `{longitude, latitude}` | 获取当前中心点 |
| `getZoom()` | - | `number` | 获取当前缩放级别 |
| `flyTo(options)` | `{center, zoom?}` | `void` | 飞行动画到指定位置 |
| `switchBaseMap(type)` | `'normal' \| 'satellite' \| 'traffic'` | `void` | 切换底图类型 |

### 4.3 覆盖物操作

#### 标记点 (Marker)

```typescript
addMarker({
  id: string,                   // 唯一标识
  longitude: number,
  latitude: number,
  title?: string,               // 标题
  content?: string,             // HTML 内容
  icon?: string,                // 自定义图标 URL
  offset?: { x: number, y: number }  // 图标偏移
})
```

#### 折线 (Polyline)

```typescript
addPolyline({
  id: string,
  path: Array<[number, number]>,  // 路径坐标数组
  strokeColor?: string,           // 线条颜色
  strokeWeight?: number,          // 线宽
  strokeOpacity?: number,         // 透明度 (0-1)
  showJoint?: boolean             // 显示拐点
})
```

#### 多边形 (Polygon)

```typescript
addPolygon({
  id: string,
  path: Array<[number, number]>,   // 多边形路径
  fillColor?: string,              // 填充颜色
  fillOpacity?: number,            // 填充透明度
  strokeColor?: string,            // 边框颜色
  strokeWeight?: number,           // 边框宽度
  outlineColor?: string            // 轮廓颜色
})
```

#### 圆形 (Circle)

```typescript
addCircle({
  id: string,
  longitude: number,
  latitude: number,
  radius: number,                  // 半径 (米)
  fillColor?: string,
  fillOpacity?: number,
  strokeColor?: string,
  strokeWeight?: number,
  strokeOpacity?: number
})
```

#### 信息窗口 (InfoWindow)

```typescript
addInfoWindow({
  id: string,
  longitude: number,
  latitude: number,
  content: string,                 // HTML 内容
  position?: { longitude, latitude },
  autoMove?: boolean,
  closeWhenClickMap?: boolean
})
```

#### 通用操作

```typescript
removeOverlay(id: string)           // 移除指定覆盖物
clearAllOverlays()                 // 清空所有覆盖物
getOverlay<T>(id: string)          // 获取覆盖物实例
```

### 4.4 分组管理

```typescript
// 给覆盖物设置分组
addMarker({
  id: 'marker-1',
  groupId: 'business',    // 分组名
  ...
})

// 分组操作
setGroupVisible('business', true)    // 显示/隐藏分组
clearGroup('business')              // 清空分组内所有覆盖物
```

### 4.5 编辑功能（需额外插件）

```typescript
// 开始编辑线
startEditPolyline('polyline-id', (result) => {
  console.log('编辑完成:', result)  // { edited: true, path: [...] }
})

// 开始编辑面
startEditPolygon('polygon-id', (result) => {})

// 开始编辑圆
startEditCircle('circle-id', (result) => {})

// 停止编辑
stopEditing()
```

---

## 五、源码结构

```
src/utils/amapPortable/
├── AmapPortableManager.ts    # 主管理器类
├── useAmapPortable.ts        # Vue Composition API 入口
├── types.ts                  # TypeScript 类型定义
├── config.ts                 # 配置文件（API Key 等）
├── core/
│   └── MapCore.ts            # 地图核心封装
├── overlay/
│   └── OverlayManager.ts     # 覆盖物管理器
└── README.md                 # 本文档
```

---

## 六、测试示例

项目提供了完整的测试页面：

```
src/views/amapTest/
├── index.vue                  # 路由入口
├── BasicPortableDemo.vue      # 完整功能演示
└── README.md                  # 测试说明
```

**功能演示包括**：
- ✅ 地图初始化与销毁
- ✅ 底图切换（普通/卫星/地形）
- ✅ 地图飞行定位
- ✅ 添加点、线、面、圆
- ✅ 覆盖物编辑（拖拽、加点、删点）
- ✅ 分组显示/隐藏
- ✅ 数据导出与控制台输出

访问：`http://localhost:5173/#/amapTest`

---

## 七、与 CesiumPortable 对比

| 特性 | AmapPortable | CesiumPortable |
|------|-------------|----------------|
| 地图引擎 | 高德地图 2D/3D | Cesium 3D 地球 |
| 适用场景 | 常规 2D 地图应用 | 三维可视化、GIS 大屏 |
| 性能 | 轻量级，适合大量覆盖物 | 资源消耗较大，需要 WebGL |
| 学习成本 | 较低（中文文档丰富） | 较高（三维概念多） |
| 主要优势 | 快速开发、移动端适配好 | 三维地形、倾斜摄影、全球数据 |
| API 复杂度 | 简单直观 | 较复杂，概念多 |

**选择建议**：
- 做普通地图应用（POI展示、路径规划）→ **AmapPortable**
- 做三维地球、地形可视化、大屏 → **CesiumPortable**

---

## 八、注意事项

1. **API Key 必须配置**：没有 Key 地图无法加载
2. **安全性**：生产环境建议通过后端代理 Key，避免前端暴露
3. **编辑功能**：需要额外引入高德地图的 `AMap.Drawing` 插件
4. **3D 模式**：使用 `viewMode: '3D'` 需要引入 3D 版 API
5. **性能优化**：
   - 大量标记点建议使用 `MarkerCluster` 聚合
   - 频繁更新的覆盖物考虑使用 `Overlay` 批量操作
6. **浏览器兼容**：支持现代浏览器，IE 需要 polyfill

---

## 九、迁移到其他项目

### 9.1 复制文件

将 `src/utils/amapPortable/` 整个目录复制到目标项目。

### 9.2 安装依赖

确保项目中已安装高德地图依赖（通过 script 标签引入即可）。

### 9.3 配置 Key

在目标项目 `.env` 中配置：

```bash
VITE_APP_AMAP_API_KEY=your_key_here
```

并在 `config.ts` 中读取：

```typescript
export const AMAP_API_KEY = import.meta.env.VITE_APP_AMAP_API_KEY
```

### 9.4 全局声明

如果 TypeScript 报错找不到 `AMap` 类型，在 `types.d.ts` 中添加：

```typescript
declare const AMap: any
```

---

## 十、常见问题

### Q1: 地图不显示，控制台报 `AMap is not defined`

**原因**：高德地图 API 未引入或引入顺序错误。

**解决**：确保在 Vue 应用初始化前已加载高德地图脚本。

### Q2: 覆盖物不显示？

**原因**：坐标格式错误或地图未初始化完成。

**解决**：确保 `await init()` 完成后再添加覆盖物。

### Q3: 编辑功能不可用？

**原因**：未引入 `AMap.Drawing` 插件。

**解决**：在 index.html 引入：
```html
<script src="https://webapi.amap.com/ui/1.0/main.js?v=2.0"></script>
```

### Q4: 移动端适配？

**推荐**：使用 `vw/vh` 单位或百分比布局，地图容器宽高设为 100%。

---

## 十一、扩展建议

根据业务需求，可以进一步扩展：

- 集成高德地图 **Web API 服务**（路径规划、地理编码、逆地理编码）
- 添加 **热力图** 支持
- 实现 **轨迹回放** 功能
- 添加 **海量点** 渲染（`AMap.MassMarks`）
- 支持 **自定义覆盖物**（继承 `AMap.Overlay`）
- 集成 **地图点击事件** 挖潜（如区域选择、坐标拾取）

---

## 十二、许可证

MIT License

---

*文档基于 `D:\workspace\yjjg-dp\src\utils\amapPortable` 源码整理*
*更新日期：2025-03-20*