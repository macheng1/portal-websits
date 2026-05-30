/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import { Empty, Nav, Tag } from "@douyinfe/semi-ui-19";
import Image from "next/image";
import { IconChevronRight } from "@douyinfe/semi-icons";
import Link from "next/link";

export const ProductClientLayout = ({ categories, initialCategory }: any) => {
  const [activeKey, setActiveKey] = useState(
    initialCategory?.toString() || "0",
  );

  const currentCategory = categories[parseInt(activeKey)] || categories[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <section className="mb-10 border border-slate-200 bg-slate-950 p-6 md:p-10 text-white">
        <p className="text-xs font-black tracking-[0.28em] text-blue-300">
          PRODUCT CATALOG
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-black">产品中心</h1>
        <p className="mt-5 max-w-2xl leading-8 text-white/62">
          按产品系列查看工厂可供产品，快速了解材料、规格与应用方向。
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="md:sticky md:top-24 border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-black text-slate-950">产品分类</h2>
            </div>
            <Nav
              bodyStyle={{ padding: "10px" }}
              selectedKeys={[activeKey]}
              onSelect={(data) => setActiveKey(data.itemKey as string)}
              style={{ backgroundColor: "white" }}
              items={categories.map((cat: any, index: number) => ({
                itemKey: index.toString(),
                text: cat.categoryName,
                icon: <IconChevronRight className="text-slate-300" />,
              }))}
              className="w-full border-none"
            />
          </div>
        </aside>

        <section className="flex-1 min-h-[500px]">
          {currentCategory ? (
            <div>
              <div className="mb-6 border border-slate-200 bg-white p-6">
                <p className="text-xs font-black tracking-[0.18em] text-blue-700">
                  {currentCategory.categoryEn || "PRODUCT SERIES"}
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">
                  {currentCategory.categoryName}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  专注于高品质工业产品，支持常规规格与定制沟通。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentCategory.items.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`./products/${item.id}`}
                    className="group no-underline"
                  >
                    <article className="h-full border border-slate-200 bg-white transition-colors hover:border-blue-500 hover:bg-slate-50">
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                            PRODUCT IMAGE
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <h3 className="text-lg font-black leading-snug text-slate-950">
                            {item.name}
                          </h3>
                          <Tag color="blue" type="light" size="small">
                            {item.material || "材料"}
                          </Tag>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4 text-sm">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">标准规格</span>
                            <span className="text-right font-mono font-bold text-slate-900">
                              {item.diameter || "-"}
                            </span>
                          </div>
                          <div className="mt-4 font-bold text-blue-700">
                            查看详情 →
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-slate-200 bg-white p-12">
              <Empty
                image={
                  <Image
                    src="/images/empty-box.svg"
                    width={150}
                    height={150}
                    alt="暂无数据"
                  />
                }
                title="暂无相关产品"
                description="该分类下暂时没有产品数据，请稍后再试。"
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
