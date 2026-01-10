"use client";
import Link from "next/link";
import { Button, Typography } from "@douyinfe/semi-ui-19";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 text-center">
      <Typography.Title
        heading={1}
        className="text-5xl md:text-7xl" // 💡 移动端小一点，桌面端大一点
        style={{ color: "#cbd5e1" }}
      >
        404
      </Typography.Title>

      <Typography.Title heading={3} className="mt-4 text-xl md:text-2xl">
        抱歉，该页面不存在
      </Typography.Title>

      <Typography.Text
        type="secondary"
        className="mt-4 mb-10 max-w-xs md:max-w-md mx-auto"
      >
        您访问的工厂页面或功能模块可能正在开发中，请稍后再试。
      </Typography.Text>

      <Link href="./" className="w-full md:w-auto">
        <Button
          theme="solid"
          type="primary"
          size="large"
          block
          className="md:w-48"
        >
          返回工厂首页
        </Button>
      </Link>
    </div>
  );
}
