# CesiumPortable - Cesium 三维地球封装指南

> 基于 CesiumJS 的便携式封装工具，提供 Viewer 初始化、3D Tiles 加载、覆盖物编辑等核心功能，适用于 Vue 3 项目。

---

## 一、概述

`CesiumPortable` 是一套针对 CesiumJS 的现代化封装，采用 TypeScript 编写，专为 Vue 3 Composition API 设计。它简化了 Cesium 的复杂性，提供了友好的 API 用于创建 3D 地球、加载 3D 模型、管理覆盖物以及实现图形编辑。

---

## 二、核心特性

- 🌍 **Viewer 快速初始化**：一键创建 Cesium Viewer
- 🎯 **相机控制**：飞行、缩放、旋转、视角复位
- 🏗️ **3D Tiles 支持**：加载大规模 3D 建筑/地形数据
- 📍 **覆盖物管理**：点、线、面、圆的创建与管理
- ✏️ **图形编辑**：
  - 线/面：拖拽顶点、单击加点、双击删点、右键完成
  - 圆：拖拽圆心、拖拽半径、右键完成
- 💾 **数据持久化**：编辑结果自动保存、支持 JSON 序列化
- 🎨 **图层管理**：天地图、在线地图等多种底图
- 🧩 **模块化设计**：Core、Overlay、Model 分层架构
- 📦 **Vue 3 集成**：`useCesiumPortable` Composition 函数

---

## 三、快速开始

### 3.1 安装依赖

```bash
npm install cesium
# 如果使用 Vite
npm install vite-plugin-cesium -D
```

### 3.2 配置 Vite (仅 Vite 项目)

`vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'

export default defineConfig({
  plugins: [
    vue(),
    cesium()
  ]
})
```

### 3.3 引入 Cesium 样式

在 `main.ts` 或 `App.vue` 中：

```typescript
import 'cesium/Source/Widgets/widgets.css'
```

### 3.4 配置 Token

`.env` 文件：

```bash
# Cesium ion token (必须)
VITE_APP_CESIUM_ACCESSTOKEN=your_cesium_token

# 天地图 Key (可选，用于天地图底图)
VITE_APP_WEB_KEY_1=your_tianditu_key_1
VITE_APP_WEB_KEY_2=your_tianditu_key_2
VITE_APP_WEB_KEY_3=your_tianditu_key_3
```

[Cesium ion Token 申请](https://cesium.com/ion/tokens)  
[天地图 Key 申请](http://lbs.tianditu.gov.cn/home.html)

### 3.5 基本使用

```vue
<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCesiumPortable } from '@/utils/cesiumPortable/useCesiumPortable'

const mapContainer = ref<HTMLDivElement | null>(null)

const {
  init,             // 初始化
  addPolyline,      // 添加折线
  addPolygon,       // 添加多边形
  addCircle,        // 添加圆形
  startEditPolyline,// 编辑折线
  startEditPolygon, // 编辑面
  startEditCircle,  // 编辑圆
  stopEditing,      // 停止编辑
  load3DTiles,      // 加载 3D Tiles
  remove3DTiles,    // 移除 3D Tiles
  flyTo,            // 飞往位置
  switchBaseMap     // 切换底图
} = useCesiumPortable()

onMounted(async () => {
  if (!mapContainer.value) return

  // 1. 初始化 Viewer
  await init({
    container: mapContainer.value,
    center: { longitude: 116.39, latitude: 39.9, height: 3000 },
    orientation: { heading: 0, pitch: -45, roll: 0 }
  })

  // 2. 添加折线
  addPolyline({
    id: 'line-demo',
    groupId: 'demo',
    positions: [
      { longitude: 116.38, latitude: 39.89 },
      { longitude: 116.40, latitude: 39.89 },
      { longitude: 116.40, latitude: 39.91 }
    ],
    width: 5,
    colorCss: '#00e5ff'
  })

  // 3. 添加圆形
  addCircle({
    id: 'circle-demo',
    groupId: 'demo',
    longitude: 116.395,
    latitude: 39.905,
    radius: 1000,  // 米
    fillColorCss: 'rgba(0,255,170,0.25)',
    outlineColorCss: '#00ffaa',
    outlineWidth: 3
  })

  // 4. 开始编辑折线（拖拽顶点、右键完成）
  startEditPolyline('line-demo', (result) => {
    console.log('折线编辑完成:', result)
    // result 示例：
    // {
    //   edited: true,
    //   positions: [{longitude, latitude}, ...]
    // }
  })
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

### 4.1 初始化

```typescript
interface CesiumPortableInitOptions {
  container: HTMLElement;
  center?: { longitude: number; latitude: number; height?: number };
  orientation?: { heading: number; pitch: number; roll: number };
  baseMap?: BaseMapType;
  animation?: boolean;    // 是否显示动画控件
  timeline?: boolean;     // 是否显示时间轴
  geocoder?: boolean;     // 是否显示搜索框
  homeButton?: boolean;   // 是否显示主页按钮
  sceneModePicker?: boolean;  // 是否显示模式切换
}
```

### 4.2 核心方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `init(options)` | `CesiumPortableInitOptions` | `Promise<void>` | 初始化 Viewer |
| `getViewer()` | - | `Cesium.Viewer` | 获取原生 Viewer 实例 |
| `flyTo(options)` | `{destination, orientation?}` | `void` | 相机飞行动画 |
| `switchBaseMap(type)` | `'bing' \| 'google' \| 'tianditu' \| 'osm'` | `void` | 切换底图 |
| `destroy()` | - | `void` | 销毁 Viewer |

**获取相机信息**：
```typescript
const camera = getCameraPosition()
// { longitude, latitude, height, heading, pitch, roll }
```

### 4.3 覆盖物操作

#### 折线 (Polyline)

```typescript
addPolyline({
  id: string,                    // 唯一标识
  groupId?: string,              // 分组
  positions: Array<{longitude, latitude}>, // 坐标数组
  width?: number,                // 线宽
  colorCss?: string,             // 颜色 (支持 hex、rgba)
  clampToGround?: boolean        // 贴地
})
```

#### 多边形 (Polygon)

```typescript
addPolygon({
  id: string,
  groupId?: string,
  positions: Array<{longitude, latitude}>, // 多边形顶点
  hierarchy?: any,               // 带孔洞的多边形（高级）
  fillColorCss?: string,
  outlineColorCss?: string,
  outlineWidth?: number,
  closeToGround?: boolean
})
```

#### 圆形 (Circle)

```typescript
addCircle({
  id: string,
  groupId?: string,
  longitude: number,
  latitude: number,
  radius: number,                // 半径（米）
  fillColorCss?: string,
  outlineColorCss?: string,
  outlineWidth?: number
})
```

#### 点 (Point)

```typescript
addPoint({
  id: string,
  groupId?: string,
  longitude: number,
  latitude: number,
  colorCss?: string,
  pixelSize?: number,            // 像素大小
  clampToGround?: boolean
})
```

#### 通用操作

```typescript
removeOverlay(id: string)                // 移除指定覆盖物
clearGroup(groupId?: string)             // 清空分组或所有
setGroupVisible(groupId: string, visible: boolean)  // 分组可见性
getOverlay<T>(id: string): T | null      // 获取覆盖物实例
getManager() => OverlayManager          // 获取管理器
```

### 4.4 编辑功能

```typescript
// 开始编辑折线
startEditPolyline(
  id: string,
  onComplete?: (result: PolylineEditResult) => void
)

// 开始编辑多边形
startEditPolygon(
  id: string,
  onComplete?: (result: PolygonEditResult) => void
)

// 开始编辑圆形
startEditCircle(
  id: string,
  onComplete?: (result: CircleEditResult) => void
)

// 停止所有编辑
stopEditing()
```

**编辑交互说明**（以折线为例）：

| 操作 | 效果 |
|------|------|
| 拖拽控制点 | 移动顶点位置 |
| 单击线段 | 在点击位置插入新顶点 |
| 双击控制点 | 删除该顶点（前点后点自动连接） |
| 右键 | 结束编辑，触发 `onComplete` 回调 |

**最小点数保护**：
- 折线：至少保留 2 个点
- 多边形：至少保留 3 个点
- 圆形：必须保留圆心和半径控制点

### 4.5 3D Tiles 支持

```typescript
// 加载 3D Tiles
load3DTiles({
  id: string,
  url: string,                    // 3D Tiles 服务地址
  style?: any,                    // 样式配置
  position?: { longitude, latitude, height }
})

// 移除 3D Tiles
remove3DTiles(id: string)

// 获取 Tileset
get3DTileset(id: string): any
```

---

## 五、源码结构

```
src/utils/cesiumPortable/
├── CesiumPortableManager.ts     # 主管理器
├── useCesiumPortable.ts         # Vue Composition API 入口
├── types.ts                     # TypeScript 类型定义
├── config.ts                    # 配置文件（Token、底图等）
├── layers.ts                    # 底图图层配置
├── core/
│   └── ViewerCore.ts            # Viewer 核心封装
├── overlay/
│   └── OverlayManager.ts        # 覆盖物管理器
└── model/
    └── TilesetModelManager.ts   # 3D Tiles 管理器
```

---

## 六、测试示例

项目提供了完整的测试页面：

```
src/views/cesiumTest/
├── index.vue                    # 路由入口
└── BasicPortableDemo.vue        # 功能演示
```

**演示功能**：
- ✅ Viewer 初始化与销毁
- ✅ 底图切换（天地图、Bing、OSM 等）
- ✅ 相机飞行动画
- ✅ 添加点、线、面、圆
- ✅ 覆盖物编辑（拖拽、加点、删点）
- ✅ 3D 模型加载与移除
- ✅ 点聚合展示
- ✅ 分组显示/隐藏
- ✅ 控制台输出编辑结果

访问：`http://localhost:5173/#/cesiumTest`

---

## 七、编辑交互详解

### 7.1 线 (Polyline) 编辑

```
拖动控制点 → 移动顶点位置
单击线段   → 在线段上插入新顶点
双击控制点 → 删除该顶点（前后自动连接）
右键完成   → 停止编辑，触发回调
```

### 7.2 多边形 (Polygon) 编辑

```
拖动控制点 → 移动顶点
单击边线   → 在边上插入新顶点
双击控制点 → 删除顶点
右键完成   → 保存并退出编辑
```

### 7.3 圆 (Circle) 编辑

```
拖拽绿色点 → 移动圆心位置
拖拽橙色点 → 调整半径大小
右键完成   → 保存新圆心和半径
```

---

## 八、数据持久化

编辑完成后，可以通过以下方式获取数据：

```typescript
import { useCesiumPortable } from '@/utils/cesiumPortable/useCesiumPortable'

const { manager } = useCesiumPortable()

// 获取单个覆盖物
const lineData = manager.getSavedOverlay('line-1')
// 类型: PolylineSavedData | PolygonSavedData | CircleSavedData

// 获取所有已保存的覆盖物
const allData = manager.getAllSavedOverlays()
// 返回: { [id]: SavedData }
```

**数据结构示例**：

```typescript
interface PolylineSavedData {
  type: 'polyline'
  id: string
  groupId?: string
  positions: Array<{ longitude: number; latitude: number }>
  width: number
  colorCss: string
}
```

**后端存储建议**：
```json
{
  "overlays": {
    "line-1": {
      "type": "polyline",
      "positions": [[116.38, 39.89], [116.40, 39.91]],
      "width": 5,
      "colorCss": "#00e5ff"
    }
  }
}
```

回显时：
```typescript
const saved = await fetchOverlays()
Object.entries(saved).forEach(([id, data]) => {
  if (data.type === 'polyline') {
    addPolyline({ id, ...data })
  }
  // ... 其他类型
})
```

---

## 九、迁移到其他项目

### 9.1 必拷目录

将整个 `cesiumPortable` 目录复制到目标项目的 `src/utils/`：

```
src/utils/cesiumPortable/
├── CesiumPortableManager.ts
├── useCesiumPortable.ts
├── types.ts
├── config.ts
├── layers.ts
├── core/
├── overlay/
└── model/
```

### 9.2 目标项目依赖

```bash
npm install cesium
# Vite 项目
npm install vite-plugin-cesium -D
```

### 9.3 环境变量

目标项目需配置：

```bash
VITE_APP_CESIUM_ACCESSTOKEN=xxx
VITE_APP_WEB_KEY_1=xxx     # 如果用天地图
VITE_APP_WEB_KEY_2=xxx
VITE_APP_WEB_KEY_3=xxx
```

### 9.4 构建配置

- **Vite**：`vite.config.ts` 添加 `vite-plugin-cesium`
- **Webpack**：需配置 `copy-webpack-plugin` 复制 Cesium 资源
- **其他**：参考 Cesium 官方文档配置静态资源

### 9.5 全局 Cesium 声明

当前封装使用全局 `Cesium` 对象。确保目标项目在运行时能访问 `window.Cesium`（通过 Vite 插件或 script 标签）。

---

## 十、常见问题

### Q1: 报错 `Cesium is not defined`

**原因**：Cesium 资源未正确加载。

**解决**：检查 `vite-plugin-cesium` 配置或 script 标签引入。

### Q2: 底图不显示？

**原因**：天地图 Key 未配置或已失效。

**解决**：更新 `.env` 中的 `VITE_APP_WEB_KEY_*`。

### Q3: 编辑功能不生效？

**原因**：未调用 `startEditXXX` 或覆盖物不存在。

**解决**：确保覆盖物已添加，且 ID 正确。

### Q4: 3D Tiles 加载慢？

**原因**：模型数据量大或网络慢。

**解决**：使用 `Cesium3DTileset` 的 `maximumScreenSpaceError` 控制细节层次。

### Q5: 性能优化建议

- 大量点使用 `Cesium.PointPrimitiveCollection` 而非 `Entity`
- 频繁更新的覆盖物，考虑 `requestAnimationFrame` 批量更新
- 使用 `分组` 管理覆盖物，便于按需显示/隐藏

---

## 十一、与 AmapPortable 对比

| 维度 | CesiumPortable | AmapPortable |
|------|----------------|--------------|
| 地图类型 | 3D 地球 | 2D/3D 平面地图 |
| 适用场景 | 三维可视化、智慧城市、大屏 | 普通地图应用、LBS 服务 |
| 性能 | 较高（WebGL 要求高） | 较低（兼容性好） |
| 学习曲线 | 陡峭（需懂三维坐标） | 平缓（直观） |
| 数据格式 | 3D Tiles、GeoJSON、KML | JSON、GPX 等 |
| 移动端 | 支持但性能要求高 | 优秀 |
| 主要优势 | 三维地形、倾斜摄影、全球数据 | 快速开发、高德生态、路径规划 |

**选择建议**：
- 三维可视化大屏、地形展示 → **CesiumPortable**
- 业务地图、POI 展示、路径规划 → **AmapPortable**

---

## 十二、扩展方向

- 📡 接入更多底图源（Mapbox、ArcGIS）
- 🗺️ 支持 GeoJSON 批量导入
- 📊 结合 D3.js 实现数据可视化覆盖层
- 🔄 实现多人协作编辑（WebSocket + 后端同步）
- 📱 移动端触摸手势优化
- 📈 性能监控与 LOD 策略
- 🎬 录像回放功能（`Cesium.SampledPositionProperty`）

---

## 十三、许可证

MIT License

---

*文档基于 `D:\workspace\yjjg-dp\src\utils\cesiumPortable` 源码整理*
*更新日期：2025-03-20*