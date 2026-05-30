/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button, Carousel, Tag } from "@douyinfe/semi-ui-19";
import {
  IconComponent,
  IconMail,
  IconPhone,
} from "@douyinfe/semi-icons";
import Image from "next/image";

export const ProductDetailContent = ({ product }: any) => {
  const imageList =
    product?.images?.length > 0 ? product.images : [product?.cover];
  const specs = product?.specs || [];

  return (
    <main className="bg-[#f4f6f8]">
      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <Tag color="blue" size="large" prefixIcon={<IconComponent />}>
              {product.category?.name || "未分类"}
            </Tag>
            <span className="font-mono text-sm text-white/45">
              ID: {product.id?.slice(0, 8)}...
            </span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-5xl font-black leading-tight">
            {product.name}
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/62">
            采用工业级标准制造，适用于精密加热、连接与配套制造场景。参数可按实际订单进一步确认。
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-8">
          <div className="border border-slate-200 bg-white">
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <Carousel
                style={{ width: "100%", height: "100%" }}
                theme="dark"
                trigger="hover"
                arrowType="hover"
              >
                {imageList.map((imgSrc: string, index: number) => (
                  <div key={index} className="relative h-full w-full">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={`${product.name}-${index}`}
                        fill
                        className="object-contain p-8 md:p-12"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        PRODUCT IMAGE
                      </div>
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-black tracking-[0.22em] text-blue-700">
              TECHNICAL OVERVIEW
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              产品参数概览
            </h2>
            <div className="mt-6 divide-y divide-slate-100 border-y border-slate-100">
              {(specs.length > 0 ? specs.slice(0, 8) : []).map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-[120px_1fr] gap-4 py-4 text-sm"
                  >
                    <div className="font-bold text-slate-500">
                      {item.label}
                    </div>
                    <div className="font-black text-slate-950">
                      {item.value}
                    </div>
                  </div>
                ),
              )}
              {specs.length === 0 && (
                <div className="py-8 text-sm text-slate-500">
                  暂无完整参数，请联系工厂确认规格。
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                size="large"
                theme="solid"
                type="primary"
                icon={<IconPhone />}
                style={{ borderRadius: 0, height: 48, fontWeight: 700 }}
                onClick={() => (window.location.href = "tel:15251092328")}
              >
                电话询价
              </Button>
              <Button
                size="large"
                theme="light"
                type="tertiary"
                icon={<IconMail />}
                style={{ borderRadius: 0, height: 48, fontWeight: 700 }}
              >
                索取资料
              </Button>
            </div>
          </div>
        </div>

        {specs.length > 0 && (
          <section className="mt-8 border border-slate-200 bg-white p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black tracking-[0.22em] text-blue-700">
                  SPECIFICATIONS
                </p>
                <h2 className="mt-3 text-2xl font-black text-slate-950">
                  技术规格详情
                </h2>
              </div>
              <div className="text-sm text-slate-500">
                更新时间：
                {product.updatedAt
                  ? new Date(product.updatedAt).toLocaleDateString("zh-CN")
                  : "-"}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {specs.map((item: any, index: number) => (
                <div
                  key={index}
                  className="border border-slate-100 p-5 transition-colors hover:border-blue-400"
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {item.label}
                  </div>
                  <div className="mt-2 text-lg font-black text-slate-950">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-slate-600">
          注：页面参数用于快速了解产品范围，如需特殊材质、非标尺寸或批量采购，请联系技术工程师进一步确认。
        </div>
      </section>
    </main>
  );
};
