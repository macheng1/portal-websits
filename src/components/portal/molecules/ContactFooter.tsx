/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/molecules/ContactFooter.tsx
"use client"; // 💡 包含点击拨号逻辑，需设为客户端组件

import React from "react";
import { Typography, Space, Button } from "@douyinfe/semi-ui-19";
import { IconPhone, IconMapPin, IconUser } from "@douyinfe/semi-icons";
import { Dictionary } from "@/src/dictionaries";

const { Text } = Typography;

export const ContactFooter = ({
  data,
  dict,
}: {
  data: any;
  dict: Dictionary["footer"];
}) => {
  const handleCall = () => {
    // 💡 稳健逻辑：直接触发手机拨号功能
    window.location.href = `tel:${data.phone}`;
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <Typography.Title heading={4} style={{ color: "white" }}>
              {data.name}
            </Typography.Title>
            <Text style={{ color: "rgba(255,255,255,0.6)" }}>
              {data.slogan}
            </Text>
          </div>

          {/* 联系方式 - 同步管理端数据 */}
          <div className="space-y-4">
            <Typography.Title heading={5} style={{ color: "white" }}>
              {dict.contact}
            </Typography.Title>
            <div className="space-y-3">
              <Space align="start">
                <IconUser style={{ color: "rgba(255,255,255,0.4)" }} />
                <Text style={{ color: "white" }}>{data.contactPerson}</Text>
              </Space>
              <div
                className="flex items-center gap-2 group cursor-pointer"
                onClick={handleCall}
              >
                <IconPhone className="text-blue-400 group-hover:scale-110 transition-transform" />
                <Text className="text-blue-400 font-bold text-lg">
                  {data.phone}
                </Text>
              </div>
            </div>
          </div>

          {/* 地址信息 */}
          <div className="space-y-4">
            <Typography.Title heading={5} style={{ color: "white" }}>
              {dict.address}
            </Typography.Title>
            <Space align="start">
              <IconMapPin style={{ color: "rgba(255,255,255,0.4)" }} />
              <Text style={{ color: "white", maxWidth: "200px" }}>
                {data.address}
              </Text>
            </Space>
          </div>
        </div>

        {/* 底部版权与支持 */}
        <div className="pt-8 border-t border-white/10 text-center">
          <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
            © 2026 {data.name} · {dict.support}
          </Text>
        </div>
      </div>
    </footer>
  );
};
