/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThrottleFn } from "ahooks";
import { Form, Button, Toast, Notification, Tag } from "@douyinfe/semi-ui-19";
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
  const formStartedAtRef = useRef(0);
  const formApi = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  // 提交表单的原始逻辑
  const submitForm = async (values: any) => {
    if (!domain) {
      Toast.error("未找到站点标识，请稍后再试");
      return;
    }

    setLoading(true);
    try {
      const submitValues = {
        ...values,
        attachments: attachments.map((file) => file.url).join(","),
        formStartedAt: formStartedAtRef.current,
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
        formStartedAtRef.current = Date.now();
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
    <main className="bg-[#f4f6f8]">
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-black tracking-[0.28em] text-blue-300">
            CONTACT FACTORY
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black">
            联系我们
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/65">
            提交产品需求、图纸附件或采购计划，我们会根据规格和应用场景尽快反馈。
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="space-y-6">
            <div className="border border-slate-200 bg-white p-6 md:p-8">
              <p className="text-xs font-black tracking-[0.22em] text-blue-700">
                FACTORY INFO
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                工厂联系方式
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                如有图纸、样品或批量采购需求，可以通过电话或表单直接联系。
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-blue-50 text-blue-700">
                    <IconMapPin size="large" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      工厂地址
                    </h3>
                    <p className="mt-1 leading-7 text-slate-500">
                      {data.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-blue-50 text-blue-700">
                    <IconPhone size="large" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      咨询热线
                    </h3>
                    <p className="mt-1 font-mono text-xl font-black text-slate-950">
                      {data.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden border border-slate-200 bg-slate-100">
              <AmapSection address={data.address} />
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center bg-blue-600">
                <IconMail style={{ color: "white" }} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  在线询价
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  支持上传图纸与附件
                </p>
              </div>
            </div>

            <Form
              layout="vertical"
              onSubmit={onFormSubmit}
              getFormApi={(api) => {
                formApi.current = api;
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                placeholder="请描述产品名称、规格、材质、数量或技术指标..."
                rules={[{ required: true, message: "该项为必填" }]}
                rows={4}
              />

              <div className="mb-4">
                <div className="mb-2 text-sm font-bold text-slate-700">
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
                  className="flex min-h-28 w-full flex-col items-center justify-center gap-2 border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadLoading}
                >
                  <IconUpload size="extra-large" />
                  <span className="font-bold">
                    {uploadLoading ? "上传中..." : "点击上传附件"}
                  </span>
                </button>
                {attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
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
              <p className="-mt-2 mb-4 text-xs text-slate-400">
                支持 PDF、JPG、PNG、DWG、ZIP 格式
              </p>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                onChange={(event) => {
                  formApi.current?.setValue("website", event.target.value);
                }}
              />

              <Button
                htmlType="submit"
                type="primary"
                theme="solid"
                block
                size="large"
                loading={loading}
                disabled={loading}
                icon={<IconSend />}
                className="mt-8 h-14 text-lg font-bold"
                style={{ borderRadius: 0 }}
              >
                立即提交询价
              </Button>

              <p className="mt-4 text-center text-xs text-slate-400">
                * 我们承诺保护您的隐私，信息仅用于业务咨询
              </p>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};
