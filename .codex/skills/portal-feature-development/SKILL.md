---
name: portal-feature-development
description: 实现门户网站功能时使用：Next.js App Router 页面、动态 domain/lang 路由、组件、字典文案、SEO、地图、询价表单、上传、产品展示和响应式样式。
---

# 门户功能开发

## 使用目标

按照页面设计和 API 契约，实现可发布、可访问、可联调的门户网站功能。

## 工作流程

1. 确认页面设计、API 契约、多语言文案和素材。
2. 按顺序实现：
   - 路由和 layout
   - 字典字段
   - API 数据获取
   - 页面组件
   - SEO metadata
   - 表单/上传/地图交互
   - 响应式样式
3. 优先复用 `src/components/portal` 下组件。
4. 完成后运行 lint/build，并进行浏览器检查。

## 开发规则

- 动态门户路由遵循 `src/app/portal/[domain]/[lang]`。
- 多语言文案同步维护 `src/dictionaries/zh.json` 和 `src/dictionaries/en.json`。
- 组件优先拆到 `src/components/portal/`。
- 地图相关逻辑注意 `NEXT_PUBLIC_AMAP_KEY` 和安全密钥。
- 不提交真实密钥；如发现环境文件含敏感信息，提醒用户处理。
- 响应式样式要覆盖移动端和桌面端。

## 完成标准

- 页面能访问。
- 中英文可正常渲染。
- 动态租户数据有兜底。
- 表单和上传有反馈。
- SEO/robots/sitemap 相关配置不被破坏。
- lint/build 或浏览器验证有结果。
