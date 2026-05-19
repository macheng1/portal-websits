# Codex Skills 执行协议

## 定位

- 本文件约束当前门户网站项目 `.codex/skills/` 的使用方式。
- 根目录 `AGENTS.md` 负责项目规范；本文件负责说明什么时候调用哪些 skill，以及按什么顺序推进门户网站任务。
- 所有回复默认使用中文。

## 可用 Skills

- `$portal-prd-analysis`：从 PRD、品牌官网需求、页面说明中拆解门户任务。
- `$portal-page-design`：设计门户页面结构、内容层级、视觉节奏和转化路径。
- `$portal-ui-design`：根据 PRD 和页面设计输出门户视觉 UI 方案，供用户审核。
- `$portal-api-integration`：设计或调整 portal init、产品、询价、上传等接口对接。
- `$portal-seo-i18n`：处理 SEO、metadata、robots、sitemap、Open Graph 和多语言文案。
- `$portal-feature-development`：按设计实现 Next.js 门户功能。
- `$portal-test-verification`：进行 lint、build、浏览器、响应式、SEO、多语言、表单和接口验证。
- `$portal-architecture-governance`：统一或调整门户架构、路由、组件、字典、API 层、SEO 和样式规范。

## 标准执行顺序

完整门户需求按以下顺序推进：

1. `$portal-prd-analysis`
2. `$portal-page-design`
3. `$portal-ui-design`
4. 用户审核 UI 方案，通过后继续
5. `$portal-api-integration`
6. `$portal-seo-i18n`
7. `$portal-feature-development`
8. `$portal-test-verification`

如果用户只要求其中一个阶段，只执行对应 skill；但发现前置设计缺失时，应先补齐必要分析再继续。

架构治理是横向流程，不替代主链路；当需求涉及动态路由、公共组件、字典、API 层、SEO 或统一规范时，先用 `$portal-architecture-governance` 盘点和定方案。

## 触发规则

- 用户提供 PRD、官网需求、门户页面、品牌展示、产品展示、联系询价、招聘、新闻等需求时，用 `$portal-prd-analysis`。
- 用户提到页面、首屏、导航、产品卡片、关于、联系、地图、表单、Footer、响应式时，用 `$portal-page-design`。
- 用户提到视觉、UI、页面长什么样、设计稿、版式、配色、素材、移动端/桌面端视觉时，用 `$portal-ui-design`。
- 用户提到 portal API、产品详情、询价提交、上传、后端接口、环境变量、trace-id 时，用 `$portal-api-integration`。
- 用户提到 SEO、metadata、robots、sitemap、多语言、中英文、Open Graph、站点域名时，用 `$portal-seo-i18n`。
- 用户要求“实现”“开发”“改页面”“加功能”“修 bug”时，用 `$portal-feature-development`；如果设计不清楚，先回到页面/API/SEO 设计。
- 用户要求“测试”“验证”“检查”“能不能跑”“发布前看一下”时，用 `$portal-test-verification`。
- 用户提到“架构”“统一”“重构”“组件结构”“字典结构”“SEO 结构”“动态路由”时，用 `$portal-architecture-governance`。

## 组合规则

- 新页面从 0 到 1：PRD 分析 + 页面设计 + UI 设计 + 用户审核 + API 对接 + SEO/多语言 + 功能开发 + 测试验证。
- 只改静态内容：页面设计 + UI 设计 + 用户审核 + SEO/多语言 + 功能开发 + 测试验证。
- 只改接口：API 对接 + 功能开发 + 测试验证。
- 修页面 bug：现状分析 + 功能开发 + 测试验证。
- 架构统一或横向重构：架构治理 + 分阶段开发 + 测试验证。

## 输出要求

- 分析阶段输出页面范围、用户路径、内容清单、接口依赖、SEO、多语言和验收标准。
- 页面设计阶段输出路由、模块顺序、组件拆分、素材需求和交互状态。
- UI 设计阶段输出视觉定位、桌面端/移动端设计说明、素材清单、交互状态和用户审核点；用户审核通过前不得进入开发。
- API 对接阶段输出 API 清单、环境变量、数据结构、错误处理和联调风险。
- SEO/多语言阶段输出 metadata、字典字段、robots/sitemap 影响和文案风险。
- 开发阶段输出修改文件、关键实现和验证命令。
- 验证阶段输出执行命令、浏览器检查结果、未覆盖项和剩余风险。
- 架构治理阶段输出现状、不一致点、目标架构、分阶段改造计划和验证方式。
