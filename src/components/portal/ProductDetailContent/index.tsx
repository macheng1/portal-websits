/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Tag,
  Button,
  Divider,
  Carousel,
  Typography,
} from "@douyinfe/semi-ui-19";
import {
  IconPhone,
  IconMail,
  IconChevronLeft,
  IconChevronRight,
  IconComponent,
} from "@douyinfe/semi-icons";
import Image from "next/image";

const { Title, Text } = Typography;

export const ProductDetailContent = ({ product }: any) => {
  // 1. 处理图片逻辑：优先取 images 数组，兜底取 cover
  const imageList =
    product?.images?.length > 0 ? product.images : [product?.cover];

  // 2. 提取规格数据 (直接对应接口中的 specs 字段)
  const specs = product?.specs || [];

  return (
    <main className="max-w-7xl mx-auto px-6 pt-8 pb-32">
      {" "}
      {/* pb-32 解决移动端底部遮挡 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* --- 左侧：产品轮播图 --- */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl border border-slate-100 overflow-hidden bg-[#f8fafc] group">
            <Carousel
              style={{ width: "100%", height: "100%" }}
              theme="dark"
              trigger="hover"
              arrowType="hover"
            >
              {imageList.map((imgSrc: string, index: number) => (
                <div key={index} className="relative w-full h-full">
                  <Image
                    src={imgSrc}
                    alt={`${product.name}-${index}`}
                    fill
                    className="object-contain p-6 md:p-12 transition-transform duration-700 hover:scale-110"
                    priority={index === 0}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* 图片数量提示 */}
          <div className="flex justify-center gap-2">
            {imageList.map((_: any, i: number) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            ))}
          </div>
        </div>

        {/* --- 右侧：产品核心信息 --- */}
        <div className="flex flex-col justify-center">
          {/* 分类 & ID */}
          <div className="flex items-center gap-2 mb-4">
            <Tag color="blue" size="large" prefixIcon={<IconComponent />}>
              {product.category?.name || "未分类"}
            </Tag>
            <Text type="tertiary" className="ml-2">
              ID: {product.id?.slice(0, 8)}...
            </Text>
          </div>

          <Title
            heading={1}
            className="!text-4xl md:!text-5xl !font-black text-slate-900 mb-6"
          >
            {product.name}
          </Title>

          <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
            <p>
              隶属于{" "}
              <span className="text-blue-600 font-medium">
                {product.category?.name}
              </span>{" "}
              系列， 采用工业级标准制造，适用于精密加热及电子连接场景。
            </p>
          </div>

          <Divider className="my-8" />

          {/* 交互按钮组 */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="large"
              theme="solid"
              type="primary"
              icon={<IconPhone />}
              className="rounded-full px-10 h-14 font-bold shadow-xl shadow-blue-100"
              onClick={() => (window.location.href = "tel:15251092328")}
            >
              电话询价
            </Button>
            <Button
              size="large"
              theme="light"
              type="tertiary"
              icon={<IconMail />}
              className="rounded-full px-10 h-14 font-bold border border-slate-200"
            >
              索取技术文档
            </Button>
          </div>
        </div>
      </div>
      {/* --- 底部：技术参数 (完全根据 specs 接口渲染) --- */}
      {specs.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
            <Title heading={2}>技术规格详情</Title>
            <Text type="tertiary" className="font-mono pt-1">
              SPECIFICATIONS
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specs.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-md transition-all group"
              >
                <div className="text-slate-400 text-xs mb-2 uppercase tracking-widest font-semibold">
                  {item.label}
                </div>
                <div className="text-slate-900 text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {item.value}
                </div>
              </div>
            ))}

            {/* 补充一个自动计算的更新时间卡片，增加专业感 */}
            <div className="bg-slate-50/50 border border-dashed border-slate-200 p-6 rounded-2xl">
              <div className="text-slate-400 text-xs mb-2 uppercase tracking-widest font-semibold">
                更新日期
              </div>
              <div className="text-slate-500 text-base">
                {new Date(product.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* 温馨提示 */}
      <div className="mt-12 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4">
        <div className="text-blue-600 bg-white p-2 rounded-lg shadow-sm">
          <IconComponent />
        </div>
        <Text type="secondary" size="small">
          注：以上规格参数基于行业标准测试，如需特殊材质（如 316L,
          镍铬合金等）或非标尺寸定制，请联系我们的技术工程师。
        </Text>
      </div>
    </main>
  );
};
