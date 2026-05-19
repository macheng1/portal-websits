---
name: portal-architecture-governance
description: 需要统一或调整门户网站架构时使用：动态路由、组件目录、字典、多租户数据、API 层、SEO、样式、素材、表单和跨页面重构治理。
---

# 门户架构治理

## 使用目标

统一门户网站的路由、组件、字典、数据获取、SEO、样式和发布规范。

## 适用场景

- 用户要求“统一门户架构”“整理官网结构”“重构组件”“统一多语言/SEO/API”。
- 页面组件重复、字典字段混乱、动态路由和数据获取不一致。
- SEO、robots、metadata、站点域名或 Vercel 配置需要治理。

## 工作流程

1. 盘点现状：
   - `src/app/portal/[domain]/[lang]`
   - `src/components/portal`
   - `src/dictionaries`
   - `src/lib/portal-api.ts`
   - `public/`
   - `vercel.json`
2. 找出重复、不一致和风险。
3. 设计目标架构和迁移计划。
4. 分阶段治理，每阶段可验证。
5. 未经用户要求，不做大范围重构。

## 统一范围

- 动态路由和 layout。
- 门户组件拆分。
- 多语言字典结构。
- Portal API 数据获取。
- SEO metadata、robots、sitemap。
- 素材和图片来源。
- 表单、上传、地图等交互。

## 输出建议

- 当前架构现状。
- 不一致点和风险。
- 目标架构规则。
- 分阶段改造计划。
- 验证方式。
