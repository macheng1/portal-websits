// src/app/portal/[domain]/[lang]/page.tsx

import { Metadata } from "next";

import { Typography } from "@douyinfe/semi-ui-19";
import { IconPhone, IconUser } from "@douyinfe/semi-icons";
import { ProductGrid } from "@/src/components/portal/productGrid";
import { SectionHeader } from "@/src/components/portal/sectionHeader";
import { fetchTenantData } from "@/src/lib/portal-api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const data = await fetchTenantData(domain);
  return {
    title: `${data?.name || "工厂门户"} - 产品中心`,
    description: data?.intro,
  };
}

export default async function PortalHome({
  params,
}: {
  params: Promise<{ domain: string; lang: string }>;
}) {
  const { domain, lang } = await params;
  const data = await fetchTenantData(domain);

  if (!data) return <div className="p-20 text-center">未找到该工厂信息</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* --- 1. Hero 欢迎区域 --- */}
      <section className="bg-white pt-16 pb-20 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              {data.name}
            </h1>
            <p className="text-lg text-slate-500 mb-8">
              {data.slogan ||
                "领先的工业精密配件制造商，致力于提供高品质金属制品解决方案。"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all text-center no-underline"
              >
                进入产品中心
              </a>
            </div>
          </div>
          {/* 移动端隐藏，桌面端显示的装饰元素 */}
          <div className="hidden md:block w-64 h-64 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-blue-200 text-8xl font-black italic">
              PRO
            </span>
          </div>
        </div>
      </section>

      {/* --- 2. 核心内容区域 --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 左侧：产品中心 (占主要宽度) */}
          <div className="flex-1">
            <section
              id="products"
              className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100"
            >
              <SectionHeader
                title="产品中心"
                subTitle="为您提供高精度的引出棒及不锈钢紧固件"
              />
              {/* 💡 传入分类后的数据结构 */}
              <ProductGrid
                categories={data.products}
                domain={domain}
                lang={lang}
              />
            </section>
          </div>

          {/* 右侧：联系我们 (侧边栏布局) */}
          <aside className="lg:w-80 w-full shrink-0">
            <section className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-8 text-slate-900 flex items-center border-b pb-4">
                联系我们
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <IconUser style={{ color: "#2563eb" }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">联系人</div>
                    <div className="text-slate-700 font-bold">
                      {data.contactPerson}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <IconPhone style={{ color: "#2563eb" }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">咨询热线</div>
                    <div className="text-slate-700 font-bold font-mono">
                      {data.phone}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    {/* <IconLocation style={{ color: "#2563eb" }} /> */}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">工厂地址</div>
                    <div className="text-slate-600 text-sm leading-relaxed">
                      {data.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* 移动端全宽按钮 */}
              <a
                href={`tel:${data.phone}`}
                className="mt-10 w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 no-underline hover:bg-black transition-all md:hidden"
              >
                <IconPhone /> 立即拨打电话
              </a>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
