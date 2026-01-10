// src/components/shared/Logo.tsx
"use client";

import React from "react";
import { Typography } from "@douyinfe/semi-ui-19";

const { Title, Text } = Typography;

interface LogoProps {
  className?: string;
  // 💡 增加反色模式，适配深色背景的 Hero 区域
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  light = false,
}) => {
  const textColor = light ? "white" : "#1c1f23"; // Semi UI 默认深色文字
  const subColor = light ? "rgba(255,255,255,0.7)" : "rgba(28,31,35,0.6)";

  return (
    <div
      className={`flex items-center gap-3 select-none cursor-pointer ${className}`}
    >
      {/* 图标部分：使用你提供的 SVG */}
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 文字部分 */}
      <div className="flex flex-col justify-center">
        <Title
          heading={4}
          style={{
            color: textColor,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          引智数链
        </Title>
        <Text
          style={{
            color: subColor,
            fontSize: "10px",
            letterSpacing: "0.5px",
            fontWeight: 600,
            marginTop: "2px",
          }}
        >
          PINLINK PLATFORM
        </Text>
      </div>
    </div>
  );
};
