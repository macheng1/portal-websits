/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/AmapSection.tsx
"use client";

import { useEffect, useRef } from "react";

export const AmapSection = ({ addressLatLng }: any) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 💡 修复方案：在 useEffect 内部动态引入加载器
    const loadMap = async () => {
      const AMapLoader = (await import("@amap/amap-jsapi-loader")).default;
      const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_KEY;

      if (!AMAP_KEY) {
        console.error("未找到 NEXT_PUBLIC_AMAP_KEY 环境变量");
        return;
      }

      try {
        const AMap = await AMapLoader.load({
          key: AMAP_KEY,
          version: "2.0",
          plugins: ["AMap.Marker"],
        });

        if (!mapRef.current) return;

        const map = new AMap.Map(mapRef.current, {
          viewMode: "3D",
          zoom: 14,
          center: [addressLatLng.lng, addressLatLng.lat],
          mapStyle: "amap://styles/whitesmoke",
        });

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
      } catch (e) {
        console.error("高德地图加载失败:", e);
      }
    };

    loadMap();
  }, [addressLatLng]);

  return (
    <div className="w-full h-full relative group">
      <div ref={mapRef} className="w-full h-full rounded-3xl overflow-hidden" />
    </div>
  );
};
