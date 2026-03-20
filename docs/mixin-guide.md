# 展厅 项目技术文档

## 项目概述

这是一个基于 Vue 3 + TypeScript + Vite 的大屏可视化项目，采用 1920x1080 设计稿尺寸，使用 SCSS Mixin 实现自适应布局。

---

## 一、核心设计参数

```scss
$designHeight: 1080;   // 设计稿高度
$designWidth: 1920;    // 设计稿宽度
```

所有自适应 mixin 都基于这两个参数进行换算。

---

## 二、SCSS Mixin 详解

### 2.1 尺寸自适应函数

#### `vw($px)` - 宽度自适应

将设计稿的像素值转换为响应式的 vw 单位。

```scss
// 设计稿中 100px 的元素
width: vw(100);  // => calc((100 * 100 * 1vw) / 1920)
// 在不同屏幕下自动缩放
```

**公式**: `(设计稿px值 * 100vw) / 设计稿宽度`

#### `vh($px)` - 高度自适应

```scss
height: vh(50);  // => calc((50 * 100 * 1vh) / 1080)
```

**公式**: `(设计稿px值 * 100vh) / 设计稿高度`

#### `vwh($w, $h)` - 同时设置宽高

```scss
@include vwh(1920, 1080);  // 宽度和高度同时自适应
// 等价于
width: vw(1920);
height: vh(1080);
```

#### `width($px)` / `height($px)`

这两个函数内部调用了 `vw()` 和 `vh()`，用法相同：

```scss
width: width(200);  // 等同于 vw(200)
height: height(100);  // 等同于 vh(100)
```

---

### 2.2 布局 Mixin

#### `@include flex` - Flex 布局（水平排列）

```scss
.container {
  @include flex;
  // 展开后:
  // display: flex;
  // justify-content: flex-start;  // 左对齐
  // align-items: center;          // 垂直居中
}
```

#### `@include flexc` - Flex 居中

```scss
.box {
  @include flexc;
  // 展开后:
  // display: flex;
  // justify-content: center;  // 水平居中
  // align-items: center;      // 垂直居中
}
```

#### `@include flexd` - Flex 纵向排列（常用于上下结构）

```scss
.card {
  @include flexd;
  // 展开后:
  // display: flex;
  // justify-content: center;
  // align-items: flex-start;
  // flex-direction: column;  // 垂直方向
}
```

---

### 2.3 文本溢出 Mixin

#### `@include ellipsis` - 单行省略

```scss
.title {
  @include ellipsis;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
}
```

#### `@include ellip` - 同上的单行省略（重复定义，择一使用）

#### `@include ellipsis2` / `@include ellipS` - 多行省略（2行）

```scss
.desc {
  @include ellipsis2;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  // overflow: hidden;
}
```

---

### 2.4 背景与定位

#### `@include bgImg($url)` - 背景图片拉伸

```scss
.banner {
  @include bgImg('@/assets/banner.png');
  // background: url(...) no-repeat;
  // background-size: 100% 100%;
}
```

#### `@include pa` - 绝对定位（左上角）

```scss
.overlay {
  @include pa;
  // position: absolute;
  // left: 0;
  // top: 0;
}
```

---

### 2.5 滚动条样式

#### `@include scrool` - 竖向滚动条自定义

```scss
.content {
  @include scrool;
  // 自定义滚动条样式
  // &::-webkit-scrollbar { width: vw(5); }
  // &::-webkit-scrollbar-thumb { ... }
  // &::-webkit-scrollbar-track { ... }
}
```

#### `@include scroolX` - 横向滚动条

宽度设为 `height(5)`，用于横向滚动场景。

#### `@include hideScrool` - 隐藏滚动条（但可滚动）

滚动条极细（`width(3)`），视觉上隐藏但功能可用。

---

### 2.6 清除浮动

#### `@include clearFloat`

用于 BFC 或 clearfix：

```scss
.parent::after {
  @include clearFloat;
  // content: "";
  // display: block;
  // height: 0;
  // clear: both;
}
```

---

### 2.7 文本渐变

#### `@include fontColorGradient($color1, $color2, $color3)`

三色渐变文字（常用于标题）：

```scss
.gradient-text {
  @include fontColorGradient(#88BAFF, #E3FEFF, #ffffff);
  // background: linear-gradient(0deg, #88BAFF 0%, #E3FEFF 50%, #ffffff 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}
```

参数默认值：
- `$m: #88BAFF` - 渐变起始色
- `$k: #E3FEFF` - 渐变中间色
- `$n: #ffffff` - 渐变结束色

---

### 2.8 动画

#### `@include ani($animationName, $duration: 1.5s, $fillMode: none)`

快速应用动画：

```scss
.box {
  @include ani(slideUpDown, 2s, forwards);
}
```

支持两种写法：
- 完整动画名：`slideUpDown`
- 以 `animate__` 开头的类名（如 `animate__fadeIn`），会自动截取 `fadeIn`

项目中已定义的动画 keyframes：
- `trailingAni` - 拖尾流星
- `picturepoint` - 图片焦点上升
- `slideUpDown` - 上下跳动
- `floatUpDown` - 上下漂浮
- `breathing` - 呼吸效果

---

### 2.9 工具函数

#### `stripUnit($number)` - 去除单位

```scss
width: vw(100px);  // 内部会调用 stripUnit(100px) => 100
```

#### `middleStr($str)` - 截取字符串后半部分

```scss
$result: middleStr('Hello');  // => 'lo'
```

---

## 三、常用场景示例

### 1. 全屏容器（保持 16:9 比例）

```vue
<template>
  <div class="screen-container">
    <!-- 内容 -->
  </div>
</template>

<style scoped>
.screen-container {
  @include vwh(1920, 1080);  // 设计稿尺寸
  margin: 0 auto;
}
</style>
```

### 2. 居中弹窗

```scss
.modal {
  @include flexc;           // flex 居中
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
```

### 3. 标题行超出省略

```scss
.title {
  @include ellipsis;        // 单行省略
  font-size: vw(18);
  color: #fff;
}
```

### 4. 两行描述文本

```scss
.description {
  @include ellipsis2;       // 两行省略
  font-size: vw(14);
  line-height: vh(24);
}
```

### 5. 自定义滚动列表

```scss
.list {
  height: vh(500);
  overflow-y: auto;
  @include scrool;          // 美化滚动条
}
```

### 6. 图标背景

```scss
.icon {
  @include bgImg('@/assets/icons/arrow.png');
  @include vwh(40, 40);     // 宽度和高度自适应
}
```

---

## 四、使用建议

### ✅ 推荐做法

1. **所有尺寸使用 vw/vh**
   ```scss
   // 好
   width: vw(200);
   margin: vh(10) vw(20);
   
   // 避免
   width: 200px;  // 不会自适应
   ```

2. **布局优先用 flex mixin**
   ```scss
   .row {
     @include flex;      // 水平排列
   }
   .center {
     @include flexc;     // 居中
   }
   ```

3. **文本超出统一用 ellipsis 系列**

4. **滚动区域加 `@include scrool` 美化**

### ⚠️ 注意事项

1. **vw/vh 基于设计稿 1920x1080**，如果设计稿不同，需修改 `$designWidth` 和 `$designHeight`

2. **字体不要用 vw/vh**：字体过小会看不清，通常固定 `px` 或 `rem`。建议：
   ```scss
   // 基准字体（不随屏幕缩放）
   font-size: 14px;
   
   // 标题可以用 vw 适度放大
   h1 { font-size: vw(24); }
   ```

3. **边框、阴影慎用 vw/vh**：太小的边框（如 1px）转换后可能模糊，建议固定：
   ```scss
   border: 1px solid #fff;  // 保持 1px
   ```

4. **图片自适应**：`@include bgImg` 会拉伸背景，如果不想拉伸，用 `object-fit`:
   ```scss
   img {
     width: vw(100);
     height: vh(100);
     object-fit: cover;
   }
   ```

---

## 五、项目结构

```
src/
├── mixin.scss          # 所有 mixin 定义（全局引入）
├── style.css           # 全局样式重置
├── main.ts             # 入口文件（引入了 style.css 和 mixin.scss）
├── App.vue             # 根组件
├── components/         # 公共组件
├── views/              # 页面组件
├── assets/             # 静态资源
│   └── iconfont.scss   # 图标字体
├── utils/              # 工具函数
├── api/                # 接口
├── router/             # 路由
├── store/              # Pinia store
└── interfaces/         # TypeScript 类型
```

**全局引入方式**（通常在 `main.ts` 中）：
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './mixin.scss'  // mixin 全局可用
import router from './router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
```

---

## 六、开发调试

### 本地预览尺寸

保持浏览器窗口为 **1920x1080**（或等比例缩放），方便对照设计稿。

```bash
npm run dev
```

访问 http://localhost:5173（Vite 默认端口）

### 检查自适应

缩放浏览器窗口，检查元素是否按比例缩放。如果出现布局错乱，检查：
1. 是否误用了 `px` 固定值
2. `vw/vh` 的计算是否正确
3. 是否有固定高度的容器导致内容溢出

---

## 七、常见问题

### Q1: vw/vh 转换后值太小/太大？

检查 `$designWidth` 和 `$designHeight` 是否与设计稿一致。

### Q2: 文本溢出不生效？

确保元素有明确宽度（`width` 或 `max-width`）。

### Q3: 滚动条样式不生效？

`@include scrool` 只对 `::-webkit-scrollbar` 生效，Firefox 需要其他方案。

### Q4: flex 布局不居中？

检查是否设置了 `@include flexc`（水平+垂直居中），还是 `@include flex`（仅水平左对齐+垂直居中）。

---

## 八、总结

本项目的 SCSS mixin 体系专为大屏可视化设计，核心思想：

1. **设计稿驱动**：一切尺寸基于 1920x1080
2. **响应式换算**：通过 `vw`/`vh` 函数自动换算
3. **布局标准化**：flex 布局封装为 mixin
4. **复用高效**：常用样式抽成 mixin，一处修改，处处生效

掌握这些 mixin 后，开发大屏页面时只需关注业务逻辑，尺寸和布局交给 mixin 处理。

---

*文档生成日期：2025-03-20*
*基于：展厅 项目 mixin.scss*
