# Portal Websites Agent 协议

## 项目定位

- 本项目是 WMS/制造企业门户网站，技术栈为 Next.js 16、React 19、TypeScript、Tailwind CSS、Semi UI、AMap。
- 动态门户路由位于 `src/app/portal/[domain]/[lang]/`，支持租户域名和中英文语言路径。
- 门户组件位于 `src/components/portal/`，通用导航和页脚位于 `src/components/navbar`、`src/components/footer`。
- 字典位于 `src/dictionaries/`，门户 API 封装位于 `src/lib/portal-api.ts`。
- 静态素材位于 `public/`，部署和安全头配置位于 `vercel.json`。
- 门户站分端 PRD 位于 `docs/prd/`；开始页面、内容、SEO 或接口开发前，优先读取对应 PRD。

## 推荐 Skills

- 从 PRD、品牌官网需求或页面说明拆门户任务时，使用 `$portal-prd-analysis`。
- 设计首屏、导航、产品展示、关于、联系、招聘、新闻、地图和转化路径时，使用 `$portal-page-design`。
- 根据 PRD 输出门户视觉 UI 方案、桌面端/移动端布局、配色、素材和审核点时，使用 `$portal-ui-design`。
- 设计或调整 portal init、产品详情、询价、上传等接口对接时，使用 `$portal-api-integration`。
- 实现 Next.js 门户页面、组件、字典、SEO、地图、表单和响应式样式时，使用 `$portal-feature-development`。
- 处理 SEO、metadata、robots、sitemap、Open Graph 和中英文文案一致性时，使用 `$portal-seo-i18n`。
- 完成功能后进行 lint、build、浏览器、响应式、SEO、多语言、表单和接口验证时，使用 `$portal-test-verification`。
- 需要统一门户架构、动态路由、组件、字典、API 层、SEO 或样式规范时，使用 `$portal-architecture-governance`。
- 完整门户需求通常按 `$portal-prd-analysis` -> `$portal-page-design` -> `$portal-ui-design` -> 用户审核 -> `$portal-api-integration` -> `$portal-seo-i18n` -> `$portal-feature-development` -> `$portal-test-verification` 推进。
- 门户页面开发前必须先完成 UI 设计方案并经用户审核确认。

## 常用命令

- 本项目使用 npm，因为存在 `package-lock.json`。
- 常用命令：
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm run lint`
  - `npm run start`

## 代码规范

- 默认使用中文回复。
- 修改前先阅读相关页面、组件、字典、API 封装和环境变量。
- 优先沿用现有动态路由、组件目录和字典结构。
- 不做无关重构，不大面积格式化无关文件。
- 新增文案必须同步维护 `zh.json` 和 `en.json`。
- 门户接口优先复用 `src/lib/portal-api.ts`，不要在页面里重复封装 fetch。
- 动态租户数据要有空值兜底，避免接口失败导致页面白屏。

## 门户页面规范

- 首屏必须明确品牌、业务和主要行动入口。
- 页面要兼顾品牌展示、产品展示、联系询价和信任感。
- 使用真实产品、工厂、地图、Logo、二维码等素材，不做空泛装饰。
- 地图、表单、上传、二维码等交互要有 loading、错误和空状态。
- 移动端和桌面端都要检查，避免文字溢出、图片遮挡和按钮不可点。

## SEO 与多语言规范

- 页面 title、description、metadata 要与页面内容一致。
- robots、sitemap、站点域名要与 `NEXT_PUBLIC_SITE_URL` 对齐。
- 中英文字典字段必须保持结构一致。
- 新增图片应考虑 alt 或语义说明。
- 不要误屏蔽 `/portal/[domain]/[lang]` 页面。

## 环境变量与安全

- 客户端变量必须使用 `NEXT_PUBLIC_` 前缀。
- 服务端变量不要暴露给浏览器。
- 不提交真实密钥；如果发现 `.env.local` 中有真实密钥，需要提醒用户处理。
- AMap、hCaptcha、后端 API 地址等配置要区分本地、测试和生产。

## 验证规范

- 代码改动后优先运行 `npm run lint` 和 `npm run build`。
- 页面改动应启动 dev server，并检查桌面和移动端。
- 表单、上传、地图、portal init、产品详情等改动需要联调验证。
- SEO/多语言改动需要检查 metadata、robots、字典和页面文案。

## 最终回复

- 简要说明完成了什么、修改了哪些文件、运行了哪些验证命令。
- 如果有未验证项、接口联调风险、素材缺失或环境变量要求，必须明确指出。
