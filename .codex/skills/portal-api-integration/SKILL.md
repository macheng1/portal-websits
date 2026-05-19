---
name: portal-api-integration
description: 设计或调整门户网站接口对接时使用：portal init 数据、产品详情、询价提交、上传文件、trace-id、服务端/客户端环境变量、错误处理和后端契约对齐。
---

# 门户 API 对接

## 使用目标

让门户页面的数据获取、产品展示、询价提交和文件上传与后端 portal API 保持一致。

## 工作流程

1. 读取 `src/lib/portal-api.ts`、API route、环境变量和后端接口文档。
2. 确认接口：
   - `portal/{domain}/init`
   - `portal/{domain}/products/{id}`
   - `portal/{domain}/inquiry`
   - `upload/fileList`
3. 区分服务端环境变量和客户端环境变量。
4. 明确错误处理、空数据兜底和加载状态。
5. 输出 API 契约、类型、页面调用方式和联调风险。

## 规则

- 服务端请求优先使用 `API_URL`，客户端暴露变量必须以 `NEXT_PUBLIC_` 开头。
- 请求应保留 `x-trace-id`，方便后端排查。
- 不在页面组件里重复写 fetch 封装，优先复用 `src/lib/portal-api.ts`。
- 产品和租户数据要考虑空值兜底。
- 表单提交和上传要给用户明确成功/失败反馈。

## 输出建议

- API 清单。
- 数据结构和类型。
- 环境变量要求。
- 错误和空数据处理。
- 联调验证项。
