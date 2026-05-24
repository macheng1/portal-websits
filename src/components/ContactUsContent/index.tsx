/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { useThrottleFn } from "ahooks";
import { Form, Button, Toast, Notification, Tag } from "@douyinfe/semi-ui-19";
import HCaptcha from "@hcaptcha/react-hcaptcha";
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
  const [uploadLoading, setUploadLoading] = useState(false);
  const [attachments, setAttachments] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captchaRef = useRef<any>(null);
  const formApi = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 提交表单的原始逻辑
  const submitForm = async (values: any) => {
    if (!domain) {
      Toast.error("未找到站点标识，请稍后再试");
      return;
    }

    // 验证 hCaptcha
    if (!captchaToken) {
      Toast.error("请完成人机验证");
      return;
    }

    setLoading(true);
    try {
      const submitValues = {
        ...values,
        attachments: attachments.map((file) => file.url).join(","),
        captchaToken, // 添加 hCaptcha token
      };

      // 提交表单到后端
      const response: any = await submitInquiry(domain, submitValues);

      if (response.ok) {
        Toast.success("询价单提交成功！");

        // 重置表单和验证码
        if (formApi.current) {
          formApi.current.reset();
        }
        setAttachments([]);
        setCaptchaToken("");
        captchaRef.current?.resetCaptcha();
      } else {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(
          errorResult.error || errorResult.message || "服务器提交失败",
        );
      }
    } catch (error: any) {
      const errorMsg = error.message || "网络连接异常，请重试。";
      Notification.error({
        title: "提交失败",
        content: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  // 使用节流 hook（1秒内只执行一次）
  const { run: onFormSubmit } = useThrottleFn(submitForm, { wait: 1000 });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const invalidFile = files.find((file) => file.size > 4 * 1024 * 1024);
    if (invalidFile) {
      Toast.error(`${invalidFile.name} 超过 4MB`);
      event.target.value = "";
      return;
    }

    setUploadLoading(true);
    try {
      const response: any = await uploadFiles(files);
      const uploaded = response.data || response || [];
      const nextFiles = (Array.isArray(uploaded) ? uploaded : [uploaded])
        .map((item: any, index: number) => ({
          name: item.name || files[index]?.name || `附件${index + 1}`,
          url: item.url || item,
        }))
        .filter((item: any) => item.url);

      setAttachments((prev) => [...prev, ...nextFiles]);
      Toast.success("附件上传成功");
    } catch (error) {
      console.error("上传失败:", error);
      Toast.error("附件上传失败");
    } finally {
      setUploadLoading(false);
      event.target.value = "";
    }
  };

  const removeAttachment = (url: string) => {
    setAttachments((prev) => prev.filter((file) => file.url !== url));
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

            <div className="mb-4">
              <div className="text-sm font-medium text-slate-700 mb-2">
                图纸附件 (单个最大 4MB)
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.dwg,.zip"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="w-full min-h-28 rounded-2xl border border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-2 text-slate-500"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadLoading}
              >
                <IconUpload size="extra-large" />
                <span className="font-medium">
                  {uploadLoading ? "上传中..." : "点击上传附件"}
                </span>
              </button>
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {attachments.map((file) => (
                    <Tag
                      key={file.url}
                      color="blue"
                      type="light"
                      closable
                      onClose={() => removeAttachment(file.url)}
                    >
                      {file.name}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400 -mt-2 mb-4">
              支持 PDF、JPG、PNG、DWG、ZIP 格式
            </p>

            {/* hCaptcha 验证 */}
            <div className="py-2">
              <HCaptcha
                sitekey={
                  process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "test-key"
                }
                onVerify={(token) => setCaptchaToken(token)}
                ref={captchaRef}
                languageOverride="zh-CN"
              />
            </div>

            <Button
              htmlType="submit"
              type="primary"
              theme="solid"
              block
              size="large"
              loading={loading}
              disabled={loading}
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
