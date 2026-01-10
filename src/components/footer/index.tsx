"use client"; // 💡 Semi UI 组件需要客户端环境

import React from "react";
import { Typography } from "@douyinfe/semi-ui-19";

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
    <footer className="bg-[#0f172a] text-slate-400 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* 上半部分：网格布局 */}
        {/* 💡 适配逻辑：cols-1(手机) -> sm:cols-2(平板) -> md:cols-4(电脑) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* 1. 品牌/工厂名称 */}
          <div className="col-span-1">
            <Typography.Title
              heading={4}
              style={{ color: "white", marginBottom: "16px" }}
            >
              {title}
            </Typography.Title>
            <p className="text-sm leading-6 opacity-70">
              专注工业精密制造，为您提供最可靠的金属制品解决方案。
            </p>
          </div>

          {/* 2. 动态链接列表 (循环 linkList) */}
          {linkList.map((group, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-white font-semibold mb-6 text-base">
                {group.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {group.list.map((item, idx) => (
                  <li key={idx}>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="hover:text-blue-400 transition-colors no-underline"
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

          {/* 3. 二维码区域 */}
          <div className="col-span-1 flex flex-col items-start md:items-end">
            <h4 className="text-white font-semibold mb-6 text-base">
              联系我们
            </h4>
            <div className="bg-white p-2 rounded shadow-lg mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCode.image}
                alt="QR Code"
                className="w-24 h-24 object-cover"
              />
            </div>
            <p className="text-xs opacity-60 text-center md:text-right w-24 md:w-auto">
              {qrCode.text}
            </p>
          </div>
        </div>

        {/* 下半部分：备案信息与版权 */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-xs tracking-wider">
          <div className="opacity-50">{copyRight}</div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              className="hover:text-white transition opacity-50 no-underline"
            >
              {siteNumber}
            </a>
            <span className="opacity-50 flex items-center gap-1">
              <span className="inline-block w-3 h-3 bg-slate-700 rounded-full text-[8px] flex items-center justify-center">
                勋
              </span>
              {publicNumber}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
