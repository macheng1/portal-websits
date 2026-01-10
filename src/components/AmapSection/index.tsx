/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/AmapSection.tsx
"use client"; // 💡 必须声明为客户端组件

import { useEffect, useRef } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

export const AmapSection = ({ addressLatLng }: any) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 💡 从环境变量读取 Key
    const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_KEY;

    if (!AMAP_KEY) {
      console.error("未找到 NEXT_PUBLIC_AMAP_KEY 环境变量");
      return;
    }

    AMapLoader.load({
      key: AMAP_KEY,
      version: "2.0",
      plugins: ["AMap.Marker"],
    })
      .then((AMap) => {
        if (!mapRef.current) return;

        const map = new AMap.Map(mapRef.current, {
          viewMode: "3D",
          zoom: 14,
          center: [addressLatLng.lng, addressLatLng.lat],
          // 💡 使用极简白风格，匹配您的全白 UI 设计
          mapStyle: "amap://styles/whitesmoke",
        });

        // 自定义标记点，还原参考图中的视觉感
        const markerContent = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 40px; height: 40px; background: rgba(37, 99, 235, 0.2); border-radius: 50%; animation: pulse 2s infinite;"></div>
          <div style="width: 16px; height: 16px; background: #2563eb; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.2);"></div>
        </div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        </style>
      `;

        const marker = new AMap.Marker({
          position: [addressLatLng.lng, addressLatLng.lat],
          content: markerContent,
          offset: new AMap.Pixel(-8, -8),
        });

        map.add(marker);
      })
      .catch((e) => {
        console.error("高德地图加载失败:", e);
      });
  }, [addressLatLng]);

  return (
    <div className="w-full h-full relative group">
      <div ref={mapRef} className="w-full h-full rounded-3xl overflow-hidden" />
      {/* 悬浮标签：增强专业感 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-xs font-bold text-slate-700 z-10 transition-opacity group-hover:opacity-100">
        元思科技 · 江苏兴化生产基地
      </div>
    </div>
  );
};
