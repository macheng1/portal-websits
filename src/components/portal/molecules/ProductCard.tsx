/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/molecules/ProductCard.tsx
"use client";

import React from "react";
import { Card, Typography, Tag } from "@douyinfe/semi-ui-19";
import { Dictionary } from "@/src/dictionaries";

interface ProductCardProps {
  product: any;
  dict: Dictionary["products"]; // 💡 获得精准的代码提示
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, dict }) => {
  return (
    <Card
      // 💡 悬停时向上位移并加深阴影，体现“律动感”
      className="w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-none overflow-hidden cursor-pointer"
      cover={
        <div className="h-48 md:h-64 bg-slate-100 flex items-center justify-center group overflow-hidden">
          {/* 模拟产品图，实际可换成 <Image /> */}
          <div className="text-slate-300 text-sm group-hover:scale-110 transition-transform duration-500">
            PRODUCT IMAGE
          </div>
        </div>
      }
    >
      <Card.Meta
        title={
          <Typography.Title heading={5} className="mb-2 text-slate-800">
            {product.name}
          </Typography.Title>
        }
        description={
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">{dict.material}:</span>
              <Tag color="blue" type="light" size="small">
                {product.material}
              </Tag>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">{dict.diameter}:</span>
              <span className="text-slate-600 font-medium">
                {product.diameter}
              </span>
            </div>
          </div>
        }
      />
    </Card>
  );
};
