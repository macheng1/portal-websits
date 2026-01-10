// src/app/portal/[domain]/[lang]/products/page.tsx

import { ProductClientLayout } from "@/src/components/portal/ProductClientLayout";
import { fetchTenantData } from "@/src/lib/portal-api";

export default async function ProductCenterPage({
  params,
  searchParams,
}: {
  params: Promise<{ domain: string; lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { domain } = await params;
  const { category } = await searchParams; // 💡 从首页跳转时可能携带分类索引
  const data = await fetchTenantData(domain);

  if (!data) return <div className="p-20 text-center">未找到工厂信息</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 渲染客户端交互布局 */}
      <ProductClientLayout
        categories={data.products}
        initialCategory={category ? parseInt(category) : 0}
      />
    </div>
  );
}
