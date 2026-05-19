---
name: portal-seo-i18n
description: 处理门户网站 SEO、多语言、metadata、robots、sitemap、canonical、Open Graph、结构化内容和中英文文案一致性时使用。
---

# 门户 SEO 与多语言

## 使用目标

确保门户网站在 SEO、分享预览、多语言内容和搜索引擎抓取方面保持一致和可维护。

## 工作流程

1. 检查页面路由、metadata、robots、sitemap 和站点域名。
2. 检查 `src/dictionaries/zh.json` 和 `src/dictionaries/en.json` 是否字段一致。
3. 为新增页面设计 title、description、Open Graph 文案。
4. 检查中英文文案长度对布局的影响。
5. 验证 `NEXT_PUBLIC_SITE_URL`、robots 和发布域名。

## 规则

- 新增文案字段必须同时更新中文和英文。
- 页面标题和描述要贴合页面内容，不堆关键词。
- 多租户域名和语言路径要避免 SEO 冲突。
- robots 不要误屏蔽门户页面。
- 图片资源要考虑 alt 或语义说明。

## 输出建议

- metadata 方案。
- 字典字段变更。
- SEO 风险。
- 需要后端或运营提供的文案/素材。
