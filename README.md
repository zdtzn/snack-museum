# 鑫安零食博物馆 (Snack Museum)

精选好物，品质生活。基于 Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 的零食批发展示网站。

## 功能模块

- **首页** — Hero banner、分类筛选、零食卡片、价格对比、投喂猫咪交互
- **好物精选** — 按口感评分排序的排行榜
- **随机抽零食** — 不知道吃啥时的随机抽取
- **零食详情** — 单品详情页（带 SEO metadata）
- **零食人格测试** — 5 题测出你的零食人格，可生成分享海报
- **关于我们** — 品牌、店铺、合作、评价展示
- **管理后台** — 产品 / 关于 / 客服 / 价格对比的增删改查（Basic Auth 鉴权）

## 技术栈

- Next.js 16.2.6（App Router）
- React 19.2.4
- TypeScript 5（strict）
- Tailwind CSS v4
- framer-motion（动画）
- html2canvas（测试结果海报截图）
- Cloudinary（图片上传，签名上传模式）

## 开始使用

```bash
npm install
npm run dev
```

打开 http://localhost:3000

### 环境变量

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<your-password>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# 数据持久化（可选，用于免费 Render 部署）
GITHUB_TOKEN=<fine-grained PAT，需对本仓库有 Contents 读写权限>
GITHUB_REPO=zdtzn/snack-museum
GITHUB_BRANCH=main
```

管理后台：`/admin`，使用 Basic Auth 鉴权。

### 数据持久化说明

后台编辑的数据存放在 `data/*.json`。Render 免费套餐没有持久磁盘，实例重启/重新部署会重置文件系统。为避免丢数据，配置 `GITHUB_TOKEN` 后，后台每次保存会把改动 commit 回本仓库；下次部署时数据就带上了。

- 未配置 `GITHUB_TOKEN` 时（如本地开发），只写本地文件，不回写仓库。
- 回写会触发 Render 自动重新部署（免费套餐构建较慢，属正常现象）。
- 若某次回写失败，接口会在响应里带 `warning` 字段，本地仍写入成功。

## 部署

项目内置 `render.yaml`，可直接部署到 Render.com。
