// src/components/portal/ProductGrid.tsx
"use client"; // 💡 必须加上，解决 Semi UI 类组件渲染报错

import { Card, Tag, Typography, Button } from "@douyinfe/semi-ui-19";
import { IconChevronRight } from "@douyinfe/semi-icons";
import Image from "next/image";
import Link from "next/link";

interface ProductItem {
  id: string;
  name: string;
  material: string;
  diameter: string;
  image: string;
}

interface Category {
  categoryName: string;
  categoryEn: string;
  items: ProductItem[];
}

export const ProductGrid = ({
  categories = [],
  domain,
  lang,
}: {
  categories: Category[];
  domain: string;
  lang: string;
}) => {
  return (
    <div className="space-y-16 mt-6">
      {categories.map((cat, idx) => (
        <div key={idx} className="group">
          {/* 1. 分类头部：含该分类独立的“查看更多” */}
          <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-1 bg-blue-600 rounded-full" />
              <Typography.Title heading={4} className="text-slate-800">
                {cat.categoryName}
                <span className="ml-2 text-slate-300 font-normal text-xs uppercase tracking-tighter hidden sm:inline">
                  {cat.categoryEn}
                </span>
              </Typography.Title>
            </div>

            {/* 💡 点击跳转到独立的产品中心页面 */}
            <Link
              href={`/portal/${domain}/${lang}/products?category=${idx}`}
              className="text-blue-500 hover:text-blue-700 text-sm flex items-center no-underline font-medium transition-all"
            >
              查看更多 <IconChevronRight />
            </Link>
          </div>

          {/* 2. 产品列表：💡 首页核心优化 - 每个分类仅展示前 2 个 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cat.items.slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={`/portal/${domain}/${lang}/products/${item.id}`}
                className="no-underline"
              >
                <Card
                  key={item.id}
                  bodyStyle={{ padding: 0 }}
                  className="overflow-hidden hover:shadow-xl transition-all border-slate-100 bg-white group/card"
                >
                  <div className="flex flex-col">
                    {/* 图片容器 - 适配移动端高度 */}
                    <div className="relative h-44 sm:h-52 w-full bg-slate-50 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <Typography.Text
                          strong
                          className="text-base text-slate-900 leading-tight"
                        >
                          {item.name}
                        </Typography.Text>
                        <Tag color="blue" type="light" size="small">
                          {item.material}
                        </Tag>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>
                          规格：
                          <span className="text-slate-600">
                            {item.diameter}
                          </span>
                        </span>
                        <span className="text-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity">
                          详情 →
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
