/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * 💡 改造 1：获取门户初始化全量数据
 */
export const fetchTenantData = cache(async (domain: string): Promise<any> => {
  try {
    // 调用 NestJS 新写的 init 接口
    const response = await fetch(`${API_BASE}/portal/${domain}/init`, {
      next: { revalidate: 0 }, // 缓存一小时
    });
    console.log("🚀 ~ response:", response);

    if (!response.ok) throw new Error("Backend unsync");

    const data = (await response.json()).data;
    console.log("🚀 ~ data:", data);

    // 💡 核心优化：将后端配置转换为前端组件需要的格式
    return data;
  } catch (error) {}
});

/**
 * 💡 改造 2：根据 ID 获取产品详情
 */
export const fetchProductById = cache(
  async (domain: string, id: string): Promise<any> => {
    try {
      const response = await fetch(
        `${API_BASE}/portal/${domain}/products/${id}`
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
    } catch (error) {
      console.error("Fetch Product Error:", error);
    }
    return null;
  }
);
export const submitInquiry = async (domain: string, values: any) => {
  return await fetch(`${API_BASE}/portal/${domain}/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
};
/**
 * 💡 [新增] 改造 4：上传文件接口
 * 支持多文件，自动构建 FormData
 */
export const uploadFiles = async (files: File | File[]): Promise<any> => {
  const formData = new FormData();

  if (Array.isArray(files)) {
    files.forEach((file) => formData.append("file", file));
  } else {
    formData.append("file", files);
  }

  // 注意：使用 fetch 发送 FormData 时，不要手动设置 Content-Type 头部
  // 浏览器会自动设置包含 boundary 的 multipart/form-data
  const response = await fetch(`${API_BASE}/upload/fileList`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("文件上传失败");
  }

  return await response.json();
};
