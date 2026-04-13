# demo 大图贴图全流程总结（含本次需求与落地步骤）

> 存放位置：与 `public/demo_tiles_workflow.md` 同级  
> 目的：沉淀本次从“无坐标大图”到“可在 Cesium 流畅叠加的瓦片贴图”的完整实践

---

## 1. 本次核心需求

用户目标：

1. 在 `src/views/cesiumTest/BasicPortableDemo.vue` 中新增“地图贴图”能力；
2. 贴图来源为 `public/demo.jpg`（超大图，约 187MB）；
3. 支持在 Cesium 中可视化叠加、定位、透明度调节；
4. 最终将切片部署到 Nginx；
5. 希望沉淀可重复流程：安装环境 → 图片配准 → 透明边处理 → 切片 → 前端引入。

---

## 2. 关键问题与结论

### 2.1 为什么不能长期直接用单张 187MB 图

- 首次解码和显存占用过高，容易卡顿；
- 单图不是分级加载，缩放与平移体验差；
- 易触发浏览器/WebGL 纹理尺寸和内存问题。

**结论：必须走瓦片化（TMS/XYZ）方案。**

### 2.2 为什么会出现“QGIS 看起来正确，Cesium 看起来扭曲”

- QGIS 显示的是配准后的地理栅格；
- Cesium 若用固定矩形强约束，可能产生二次拉伸；
- 原始配准点误差过大时，warp 结果也会扭曲。

**结论：先保证配准质量，再用正确瓦片加载方式。**

### 2.3 为什么会有黑边

- 配准/重投影后外围无效像素被写成黑色；
- 切片后就看到黑边。

**结论：用 `-srcnodata` + `-dstalpha` 生成透明边影像再切片。**

---

## 3. 代码侧实现（BasicPortableDemo.vue）

本次在 `BasicPortableDemo.vue` 增加了如下能力：

1. 地图贴图按钮组：
   - 地图贴图
   - 定位贴图
   - 贴图透明 +/-
   - 移除贴图
2. 贴图采用 `UrlTemplateImageryProvider` 加载本地瓦片；
3. 支持 `png/jpg` 探测；
4. 增加“点击地图返回经纬度”功能，便于采集 GCP 点。

> 实战建议：贴图加载时优先使用 `png`（透明边生效）。

---

## 4. 环境安装（Conda + GDAL）

## 4.1 安装 Miniconda

推荐安装 Miniconda（Windows x64）。下载链接：

- https://www.anaconda.com/download/success

## 4.2 创建与激活环境

```bash
conda create -n gdal-env python=3.11 -y
conda activate gdal-env
conda install -c conda-forge gdal -y
```

## 4.3 验证

```bash
gdalinfo --version
python -m osgeo_utils.gdal2tiles --help
```

---

## 5. QGIS 处理“无坐标信息图片”（demo.jpg）

## 5.1 打开地理配准器

1. QGIS 打开“地理配准器（Georeferencer）”；
2. 加载 `public/demo.jpg`。

## 5.2 添加控制点（GCP）

- 点位建议：至少 8~12 个；
- 分布建议：四角 + 边中 + 中心；
- 地物建议：道路交叉口、建筑角点等稳定特征。

## 5.3 变换设置

建议先用保守稳定配置：

- 变换类型：`多项式 1`
- 目标 CRS：`EPSG:3857`
- 重采样：`双线性`
- 输出：`public/demo.tif`

然后执行配准导出。

> 若残差（RMS）过大，优先删错点重打，不要急着上高阶模型/TPS。

---

## 6. 透明边处理（去黑边）

对 `demo.tif` 执行：

```bash
gdalwarp -overwrite -t_srs EPSG:3857 -r bilinear -of GTiff -srcnodata "0 0 0" -dstalpha "d:\workspace\yjzh\yjzhhdd-dp\public\demo.tif" "d:\workspace\yjzh\yjzhhdd-dp\public\demo_alpha.tif"
```

输出得到 `demo_alpha.tif`（带 alpha 通道）。

---

## 7. 切片生成（XYZ/TMS）

## 7.1 清理旧切片（可选）

```bash
rmdir /s /q "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles"
```

## 7.2 标准切片（0-18）

```bash
python -m osgeo_utils.gdal2tiles -p mercator -z 0-18 -w none --processes=4 "d:\workspace\yjzh\yjzhhdd-dp\public\demo_alpha.tif" "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles"
```

## 7.3 高清切片（0-20 及以上）

```bash
python -m osgeo_utils.gdal2tiles -p mercator -z 0-20 -w none --processes=6 "d:\workspace\yjzh\yjzhhdd-dp\public\demo_alpha.tif" "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles_z20"
```

> 层级每增加 1 级，理论瓦片数约乘 4，体积增长很快。

---

## 8. Cesium 引入方式

推荐 URL 模板（根据你的切片命名）：

- `/demo_tiles_z20/{z}/{x}/{reverseY}.png`

关键参数：

- `tilingScheme: new Cesium.WebMercatorTilingScheme()`
- `minimumLevel: 0`
- `maximumLevel: 20`（按切片层级设置）

若出现上下翻转，测试 `{y}` 与 `{reverseY}` 切换。

---

## 9. 部署到 Nginx 时需要哪些文件

最小发布集：

- `demo_tiles_z20/` 整个目录（含全部 `z/x/y.png`）

可选文件：

- `tilemapresource.xml`（可留可不留，Cesium 按 URL 模板读图时非必需）

通常不需要部署：

- `demo.jpg.aux.xml`、`*.tif.aux.xml`（GDAL/QGIS 辅助元数据）

---

## 10. 关于 `demo.tif` 是否要长期保存

**建议长期保留。**

推荐保留资产：

1. `demo.jpg`（原始图）
2. `demo.tif`（配准成果）
3. `demo_alpha.tif`（透明边版本）
4. `demo_tiles_zXX`（不同层级的发布瓦片目录）

后续若要切更多层级（如 0-22、0-23、0-24），直接基于 `demo_alpha.tif` 再切即可。

---

## 11. 常见问题速查

## 11.1 `Input file has unknown SRS`

原图没地理坐标，先在 QGIS 配准导出 `demo.tif`。

## 11.2 Cesium 报 `Failed to obtain image tile`

- 目录下是否存在真实 `z/x/y` 瓦片；
- 扩展名是否匹配（png/jpg）；
- `{y}` / `{reverseY}` 是否正确。

## 11.3 配准后画面扭曲/撕裂

- GCP 点不准或残差过大；
- 先用 `多项式 1`，提升点质量，再考虑 TPS。

## 11.4 黑边

执行 `gdalwarp -srcnodata "0 0 0" -dstalpha` 后重新切片。

---

## 12. 一次可复现的完整执行步骤（强烈建议按顺序）

> 目标：下次遇到同类图片时，照着执行即可复现。  
> 终端：Windows `Anaconda Prompt`。

### Step 0：准备输入文件

- 原图放在：`d:\workspace\yjzh\yjzhhdd-dp\public\demo.jpg`

### Step 1：安装并准备环境（首次仅执行一次）

```bash
conda create -n gdal-env python=3.11 -y
conda activate gdal-env
conda install -c conda-forge gdal -y
gdalinfo --version
python -m osgeo_utils.gdal2tiles --help
```

### Step 2：每次处理前激活环境

```bash
conda activate gdal-env
```

### Step 3：在 QGIS 做配准并导出 `demo.tif`

1. 打开 QGIS 地理配准器，加载 `demo.jpg`
2. 打 8~12 个 GCP 点（四角+边中+中心）
3. 变换设置：
   - 变换类型：`多项式 1`
   - 目标 CRS：`EPSG:3857`
   - 重采样：`双线性`
   - 输出：`d:\workspace\yjzh\yjzhhdd-dp\public\demo.tif`
4. 点击开始配准，导出完成

### Step 4：透明边处理（去黑边）

```bash
gdalwarp -overwrite -t_srs EPSG:3857 -r bilinear -of GTiff -srcnodata "0 0 0" -dstalpha "d:\workspace\yjzh\yjzhhdd-dp\public\demo.tif" "d:\workspace\yjzh\yjzhhdd-dp\public\demo_alpha.tif"
```

### Step 5：生成 z20 切片（推荐发布层级）

```bash
rmdir /s /q "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles_z20"
python -m osgeo_utils.gdal2tiles -p mercator -z 0-20 -w none --processes=6 "d:\workspace\yjzh\yjzhhdd-dp\public\demo_alpha.tif" "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles_z20"
```

### Step 6：可选生成 z23（更高清，体积更大）

```bash
rmdir /s /q "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles_z23"
python -m osgeo_utils.gdal2tiles -p mercator -z 0-23 -w none --processes=6 "d:\workspace\yjzh\yjzhhdd-dp\public\demo_alpha.tif" "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles_z23"
```

### Step 7：验证切片成功

```bash
dir "d:\workspace\yjzh\yjzhhdd-dp\public\demo_tiles_z20\0\0"
```

看到 `0.png` 即表示切片可用。

### Step 8：前端接入

- URL：`/demo_tiles_z20/{z}/{x}/{reverseY}.png`
- `maximumLevel: 20`

若使用 `z23`，对应改为：
- URL：`/demo_tiles_z23/{z}/{x}/{reverseY}.png`
- `maximumLevel: 23`

若方向颠倒，尝试把 `{reverseY}` 改成 `{y}`。

### Step 9：Nginx 发布

只需上传目录：

- `demo_tiles_z20/`（或 `demo_tiles_z23/`）

---

## 13. 推荐稳定执行顺序（简版）

1. QGIS：`demo.jpg` 配准导出 `demo.tif`
2. GDAL：`demo.tif` 透明边处理成 `demo_alpha.tif`
3. GDAL：`demo_alpha.tif` 切出 `demo_tiles_zXX`
4. 前端：切换 URL 和 `maximumLevel`
5. Nginx：发布 `demo_tiles_zXX`

---

如后续继续扩展（多图层、自动化流水线、批处理脚本），可在此文档基础上新增“批量处理章节”。