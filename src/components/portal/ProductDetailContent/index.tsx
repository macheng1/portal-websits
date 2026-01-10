/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/ProductDetailContent.tsx
"use client";

import {
  Descriptions,
  Tag,
  Button,
  Divider,
  Typography,
} from "@douyinfe/semi-ui-19";
import { IconPhone, IconMail } from "@douyinfe/semi-icons";
import Image from "next/image";

export const ProductDetailContent = ({ product }: any) => {
  return (
    <main className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        {/* --- 左侧：产品大图 --- */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl border border-slate-100 overflow-hidden bg-slate-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>
          {/* 这里可以扩展多图缩略图列表 */}
        </div>

        {/* --- 右侧：规格摘要与询价 --- */}
        <div className="flex flex-col justify-center">
          <Tag color="blue" size="large" className="w-fit mb-4">
            {product.material}
          </Tag>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            {product.name}
          </h1>

          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <p>
              该引出棒（Terminal
              Pin）采用高精度工艺，专为工业加热管及电子配件设计。具备优异的导电性、机械强度及卓越的耐腐蚀性能。
            </p>
          </div>

          <Divider className="my-8" />

          {/* 询价区域 - 移动端适配 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="large"
              theme="solid"
              type="primary"
              icon={<IconPhone />}
              className="rounded-full px-10 h-14 font-bold"
            >
              立即询价
            </Button>
            <Button
              size="large"
              theme="light"
              type="tertiary"
              icon={<IconMail />}
              className="rounded-full px-10 h-14 font-bold"
            >
              获取详细目录
            </Button>
          </div>
        </div>
      </div>

      {/* --- 底部：技术参数表格 (工业站点的灵魂) --- */}
      <section className="mt-20">
        <div className="border-l-4 border-blue-600 pl-4 mb-8">
          <h2 className="text-2xl font-bold">技术规格详情</h2>
          <p className="text-slate-400 text-sm">Technical Specifications</p>
        </div>

        {/* 💡 响应式参数展示 */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
          <Descriptions
            align="center"
            size="large"
            data={[
              { key: "材质标准", value: product.material },
              { key: "常规直径 (D)", value: product.diameter },
              { key: "公差等级", value: "±0.02mm" },
              { key: "表面处理", value: "抛光 / 钝化" },
              { key: "耐温范围", value: "最高 800°C" },
              { key: "适用行业", value: "家用电器、工业模具、机械设备" },
            ]}
          />
        </div>
      </section>
    </main>
  );
};
