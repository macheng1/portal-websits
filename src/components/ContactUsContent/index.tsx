/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/ContactUsContent.tsx
"use client";

import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Space,
} from "@douyinfe/semi-ui-19";
import {
  IconPhone,
  IconMail,
  IconUpload,
  IconComment,
} from "@douyinfe/semi-icons";
import Image from "next/image";

export const ContactUsContent = ({ data }: any) => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* --- 左侧：工厂信息与地图 --- */}
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Connect with {data.name}
            </h1>
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
              无论是寻找特定配件还是完整的工厂升级方案，我们的团队随时准备为您提供帮助。
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                {/* <IconLocation style={{ color: "#2563eb" }} size="large" /> */}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">
                  总部地址
                </h3>
                <p className="text-slate-500 leading-relaxed">{data.address}</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <IconPhone style={{ color: "#16a34a" }} size="large" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">
                  咨询热线
                </h3>
                <p className="text-slate-500 font-mono text-lg">
                  {data.phone} (24/7 支持)
                </p>
              </div>
            </div>
          </div>

          {/* 地图占位图 */}
          <div className="relative aspect-video w-full rounded-3xl bg-slate-100 overflow-hidden border border-slate-200">
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
              <div className="bg-white/80 backdrop-blur px-6 py-2 rounded-full shadow-sm border border-slate-200 font-medium">
                交互式全球服务图
              </div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* 底部社交按钮 */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              size="large"
              style={{ backgroundColor: "#22c55e", color: "white" }}
              // icon={<IconMessage />}
              className="h-14 rounded-xl"
            >
              WhatsApp Chat
            </Button>
            <Button
              size="large"
              style={{ backgroundColor: "#0f172a", color: "white" }}
              icon={<IconComment />}
              className="h-14 rounded-xl"
            >
              WeChat Support
            </Button>
          </div>
        </div>

        {/* --- 右侧：智能询价系统表单 --- */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <IconMail style={{ color: "white" }} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 italic">
              Smart RFQ System
            </h2>
          </div>

          <Form layout="vertical">
            <div className="grid grid-cols-2 gap-6">
              <Form.Input
                field="name"
                label="您的姓名"
                placeholder="姓名"
                size="large"
              />
              <Form.Input
                field="email"
                label="联系邮箱"
                placeholder="Email"
                size="large"
              />
            </div>

            <Form.Select
              field="interest"
              label="产品兴趣"
              placeholder="请选择您感兴趣的产品"
              className="w-full"
              size="large"
            >
              <Select.Option value="p1">不锈钢引出棒</Select.Option>
              <Select.Option value="p2">加热管配件</Select.Option>
              <Select.Option value="custom">非标定制</Select.Option>
            </Form.Select>

            <Form.TextArea
              field="message"
              label="需求详情 / 留言"
              placeholder="请详细描述您的项目需求或技术指标..."
              rows={4}
            />

            <div className="mt-6 p-6 border-2 border-dashed border-slate-100 rounded-2xl text-center bg-slate-50/50 group hover:border-blue-300 transition-colors cursor-pointer">
              <IconUpload
                size="extra-large"
                className="text-slate-300 mb-2 group-hover:text-blue-500"
              />
              <p className="text-sm text-slate-400">
                点击或拖拽上传图纸 (Drawings/PDF)
              </p>
            </div>

            <Button
              type="primary"
              theme="solid"
              block
              size="large"
              className="mt-8 h-16 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200"
            >
              Submit Inquiry
            </Button>

            <p className="mt-6 text-center text-xs text-slate-400">
              您的询价将根据产品类别直接发送至对应的区域经理。
            </p>
          </Form>
        </div>
      </div>
    </main>
  );
};
