"use client"; // 💡 Semi UI 组件需要客户端环境

import React from "react";
import { Typography } from "@douyinfe/semi-ui-19";
import Image from "next/image";

interface ILink {
  label: string;
  link?: string;
}

interface ILinkList {
  title: string;
  list: ILink[];
}

interface IQRCode {
  image: string;
  text: string;
}

export interface IFooterProps {
  title: string;
  linkList: ILinkList[];
  qrCode: IQRCode;
  copyRight: string;
  siteNumber: string; // 站点备案号
  publicNumber: string; // 公安备案号
}
export const Footer: React.FC<IFooterProps> = ({
  title,
  linkList = [],
  qrCode,
  copyRight,
  siteNumber,
  publicNumber,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* 上半部分：网格布局 */}
        {/* 💡 适配逻辑：cols-1(手机) -> sm:cols-2(平板) -> md:cols-4(电脑) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* 1. 品牌/工厂名称 */}
          <div className="col-span-1">
            <Typography.Title
              heading={4}
              style={{ color: "white", marginBottom: "16px" }}
            >
              {title}
            </Typography.Title>
            <p className="text-sm leading-7 opacity-70">
              专注工业产品制造、规格沟通与稳定交付，为客户提供可靠的供应链配套。
            </p>
          </div>

          {/* 2. 动态链接列表 (循环 linkList) */}
          {linkList.map((group, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-white font-black mb-6 text-base">
                {group.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {group.list.map((item, idx) => (
                  <li key={idx}>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="hover:text-blue-300 transition-colors no-underline"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="cursor-default">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {qrCode?.image && (
            <div className="col-span-1 flex flex-col items-start md:items-end">
              <h4 className="text-white font-black mb-6 text-base">
                联系我们
              </h4>
              <div className="bg-white p-2 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCode.image}
                  alt="QR Code"
                  className="w-24 h-24 object-cover"
                />
              </div>
              <p className="text-xs opacity-60 text-left md:text-right w-24 md:w-auto">
                {qrCode.text}
              </p>
            </div>
          )}
        </div>

        {/* 下半部分：备案信息与版权 */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-xs tracking-wider">
          <div className="opacity-50">
            {copyRight || "©无锡元思科技有限公司提供技术支持"}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Image
              src="/public_logo.png"
              alt="Public Logo"
              width={20}
              height={20}
            />
            {siteNumber}

            {publicNumber && (
              <span className="opacity-50 flex items-center gap-1">
                {publicNumber}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
