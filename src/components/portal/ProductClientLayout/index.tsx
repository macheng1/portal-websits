/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import { Card, Tag, Typography, Nav, Empty } from "@douyinfe/semi-ui-19";
import Image from "next/image";
import { IconChevronRight } from "@douyinfe/semi-icons";
import Link from "next/link";

export const ProductClientLayout = ({ categories, initialCategory }: any) => {
  // 使用传入的 initialCategory 初始化状态，如果没有则默认为 0
  const [activeKey, setActiveKey] = useState(
    initialCategory?.toString() || "0"
  );

  // 获取当前选中的分类数据，做防空处理
  const currentCategory = categories[parseInt(activeKey)] || categories[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 核心布局容器：移动端纵向排列 (flex-col)，桌面端横向排列 (md:flex-row) */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* --- 产品分类侧边栏：全白底色版 --- */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="md:sticky md:top-24 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* 💡 关键修改：将 bg-slate-50/80 改为 bg-white，保持全白一致性 */}
            <div className="p-5 border-b border-slate-50 bg-white">
              <Typography.Title heading={5} className="text-slate-800">
                产品分类
              </Typography.Title>
            </div>

            <Nav
              bodyStyle={{ padding: "12px" }}
              selectedKeys={[activeKey]}
              onSelect={(data) => setActiveKey(data.itemKey as string)}
              // 💡 确保 Nav 组件内部也是白底
              style={{ backgroundColor: "white" }}
              items={categories.map((cat: any, index: number) => ({
                itemKey: index.toString(),
                text: cat.categoryName,
                // 右侧图标
                icon: <IconChevronRight className="text-slate-300" />,
              }))}
              className="w-full border-none"
            />
          </div>
        </aside>
        {/* --- 2. 右侧主内容区 --- */}
        <main className="flex-1 min-h-[500px]">
          {currentCategory ? (
            <div className="space-y-8">
              {/* 分类标题头 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {currentCategory.categoryName}
                </h2>
                <p className="text-slate-500 mt-2">
                  {currentCategory.categoryEn || "专注于高品质工业产品"}
                </p>
              </div>

              {/* 产品列表网格 */}
              {/* 移动端 1 列，平板 2 列 (sm:grid-cols-2)，大屏 3 列 (lg:grid-cols-3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.items.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`./products/${item.id}`} // 由于已经在 products 目录下，可以使用相对路径或全路径
                    className="no-underline"
                  >
                    <Card
                      key={item.id}
                      bodyStyle={{ padding: 0 }}
                      // 添加悬浮效果和过渡动画
                      className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200 group bg-white rounded-2xl"
                    >
                      <div className="flex flex-col h-full">
                        {/* 图片容器，固定高度，使用 object-cover 保持比例 */}
                        <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        {/* 产品信息区，使用 flex-grow 使底部对齐 */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-4 gap-4">
                            <Typography.Text
                              strong
                              className="text-lg text-slate-900 leading-snug line-clamp-2"
                            >
                              {item.name}
                            </Typography.Text>
                            <Tag
                              color="blue"
                              type="light"
                              size="small"
                              className="shrink-0"
                            >
                              {item.material}
                            </Tag>
                          </div>

                          {/* 将详情信息推到最底部 */}
                          <div className="mt-auto pt-4 border-t border-slate-50">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">标准规格</span>
                              <span className="text-slate-700 font-medium font-mono">
                                {item.diameter}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm">
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
        </main>
      </div>
    </div>
  );
};
