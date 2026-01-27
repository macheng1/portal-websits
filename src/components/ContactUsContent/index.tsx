/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  Select,
  Button,
  Toast,
  Notification,
} from "@douyinfe/semi-ui-19";
import {
  IconPhone,
  IconMail,
  IconUpload,
  IconMapPin,
  IconSend,
} from "@douyinfe/semi-icons";
import { AmapSection } from "../AmapSection";
import { submitInquiry, uploadFiles } from "@/src/lib/portal-api";

export const ContactUsContent = ({ data, domain }: any) => {
  const [loading, setLoading] = useState(false);
  const formApi = useRef<any>(null); // 用于后续重置表单

  // 1. 自定义上传逻辑 (保持不变)
  const handleCustomUpload = async ({
    fileInstance,
    onSuccess,
    onError,
  }: any) => {
    try {
      const response: any = await uploadFiles(fileInstance);
      const fileUrl = response.data?.[0]?.url || response[0] || response.url;

      onSuccess({
        ...fileInstance,
        url: fileUrl, // 💡 将 URL 存入对象根部
      });
      Toast.success(`${fileInstance.name} 上传成功`);
    } catch (error) {
      console.error("上传失败:", error);
      onError();
      Toast.error(`${fileInstance.name} 上传失败`);
    }
  };

  // 2. 核心提交逻辑
  const onFormSubmit = async (values: any) => {
    if (!domain) {
      Toast.error("未找到站点标识，请稍后再试");
      return;
    }

    // 💡 修正 attachments 转换逻辑
    const attachments = Array.isArray(values.files)
      ? values.files
          .map((file: any) => file.url || file.response?.url)
          .filter(Boolean)
          .join(",")
      : "";

    // 排除原始 files 数组，构建最终提交数据
    const { files, ...restValues } = values;
    const submitValues = { ...restValues, attachments };

    setLoading(true);
    try {
      const response: any = await submitInquiry(domain, submitValues);

      if (response.ok) {
        Toast.success({
          content: "询价单提交成功！我们的团队会尽快与您联系。",
          duration: 3,
        });

        // 💡 修正重置逻辑：使用我们通过 getFormApi 拿到的引用
        if (formApi.current) {
          formApi.current.reset();
        }
      } else {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(errorResult.message || "服务器提交失败");
      }
    } catch (error: any) {
      Notification.error({
        title: "提交失败",
        content: error.message || "网络连接异常，请重试。",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* --- 左侧：信息展示 (完全保留你的原样式) --- */}
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              欢迎联系 <span className="text-blue-600">我们</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
              您的每一个需求对我们都至关重要。请填写右侧表单，我们的技术经理将为您提供一对一的咨询服务。
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <IconMapPin className="text-blue-600" size="large" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">
                  办公地址
                </h3>
                <p className="text-slate-500 leading-relaxed">{data.address}</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <IconPhone className="text-green-600" size="large" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">
                  全国服务热线
                </h3>
                <p className="text-slate-500 font-mono text-xl font-bold">
                  {data.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-3xl bg-slate-100 overflow-hidden border border-slate-200">
            <AmapSection address={data.address} />
          </div>
        </div>

        {/* --- 右侧：询价表单 (完全保留你的原样式) --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-blue-900/5">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <IconMail style={{ color: "white" }} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">智能询价系统</h2>
          </div>

          <Form
            layout="vertical"
            onSubmit={onFormSubmit}
            getFormApi={(api) => {
              formApi.current = api; // 💡 确保引用正确挂载
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Form.Input
                field="name"
                label="您的姓名"
                placeholder="请输入姓名"
                size="large"
                rules={[{ required: true, message: "该项为必填" }]}
              />
              <Form.Input
                field="phone"
                label="联系方式"
                placeholder="手机号或邮箱"
                size="large"
                rules={[{ required: true, message: "该项为必填" }]}
              />
            </div>

            <Form.TextArea
              field="message"
              label="需求详情"
              placeholder="请描述您的具体需求或技术指标..."
              rules={[{ required: true, message: "该项为必填" }]}
              rows={4}
            />

            <Form.Upload
              action=""
              field="files"
              label="图纸附件"
              draggable={true}
              dragIcon={<IconUpload size="extra-large" />}
              customRequest={handleCustomUpload}
              accept=".pdf,.jpg,.png,.dwg,.zip"
              limit={{
                maxSize: 4 * 1024, // 4MB (单位是 KB)
              }}
              tip="支持 PDF、JPG、PNG、DWG、ZIP 格式，单个文件不超过 4MB"
            />

            <Button
              htmlType="submit"
              type="primary"
              theme="solid"
              block
              size="large"
              loading={loading}
              icon={<IconSend />}
              className="mt-8 h-16 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200"
            >
              立即提交询价
            </Button>

            <p className="mt-4 text-center text-xs text-slate-400">
              * 我们承诺保护您的隐私，信息仅用于业务咨询
            </p>
          </Form>
        </div>
      </div>
    </main>
  );
};
