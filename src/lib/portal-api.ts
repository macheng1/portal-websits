/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * 生成唯一的 trace-id
 * 格式: timestamp-randomString
 */
function generateTraceId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * 封装的 request 函数，自动添加 x-trace-id
 */
async function request(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const traceId = generateTraceId();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "x-trace-id": traceId,
    },
  });
}

/**
 * 💡 改造 1：获取门户初始化全量数据
 */
export const fetchTenantData = cache(async (domain: string): Promise<any> => {
  try {
    const response = await request(`${API_BASE}/portal/${domain}/init`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) throw new Error("Backend unsync");

    const data = (await response.json()).data;

    // 💡 核心优化：将后端配置转换为前端组件需要的格式
    return data;
  } catch {
    // 生产环境建议使用 Sentry 等错误追踪服务
    console.error("Failed to fetch tenant data");
  }
});

/**
 * 💡 改造 2：根据 ID 获取产品详情
 */
export const fetchProductById = cache(
  async (domain: string, id: string): Promise<any> => {
    try {
      const response = await request(
        `${API_BASE}/portal/${domain}/products/${id}`,
      );

      if (response.ok) {
        const product = (await response.json()).data;

        // 统一字段处理，提环
        const formattedSpecs = product.specs
          ? Object.entries(product.specs).map(([label, value]) => ({
              label,
              value,
            }))
          : [];

        return {
          id: product.id,
          name: product.name || product.title,
          desc: product.desc || product.description,
          cover: product.cover || (product.images && product.images[0]) || "",
          images: product.images || [],
          specs: formattedSpecs,
          price: product.price,
          unit: product.unit,
          category: product.category,
          brand: product.brand,
          tags: product.tags || [],
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          // ...如有其他字段可补充
        };
      }
    } catch {
      console.error("Failed to fetch product");
    }
    return null;
  },
);
/**
 * 提交询价表单（先走 Next API 完成人机校验，再转发后端）
 */
export const submitInquiry = async (domain: string, values: any) => {
  return await request(`/api/portal/${domain}/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
};

/**
 * 上传文件（直接调用后端API）
 * 支持多文件，自动构建 FormData
 */
export const uploadFiles = async (files: File | File[]): Promise<any> => {
  const formData = new FormData();

  if (Array.isArray(files)) {
    files.forEach((file) => formData.append("file", file));
  } else {
    formData.append("file", files);
  }

  const response = await request(`${API_BASE}/upload/fileList`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("文件上传失败");
  }

  return await response.json();
};
