/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";

interface AmapSectionProps {
  address: string;
}

export const AmapSection = ({ address }: AmapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // 持有地图实例
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_KEY;
    const AMAP_SECURITY_KEY = process.env.NEXT_PUBLIC_AMAP_SECURITY_KEY; // 💡 建议增加安全密钥

    if (!AMAP_KEY) {
      console.error("未找到 NEXT_PUBLIC_AMAP_KEY 环境变量");
      return;
    }

    // 💡 必须配置安全密钥（JSAPI 2.0 强制要求）
    if (typeof window !== "undefined" && AMAP_SECURITY_KEY) {
      (window as any)._AMapSecurityConfig = {
        securityJsCode: AMAP_SECURITY_KEY,
      };
    }

    const initMap = async () => {
      try {
        const AMapLoader = (await import("@amap/amap-jsapi-loader")).default;
        const AMap = await AMapLoader.load({
          key: AMAP_KEY,
          version: "2.0",
          plugins: ["AMap.Geocoder", "AMap.Marker"],
        });

        if (!mapRef.current) return;

        // 如果地图实例已存在，则不再重新创建，只更新位置
        if (!mapInstance.current) {
          mapInstance.current = new AMap.Map(mapRef.current, {
            viewMode: "3D",
            zoom: 15, // 稍微拉近一点，工业区位置更清晰
            mapStyle: "amap://styles/whitesmoke",
          });
        }

        const map = mapInstance.current;
        const geocoder = new AMap.Geocoder();

        geocoder.getLocation(address, (status: string, result: any) => {
          if (status === "complete" && result.geocodes?.length) {
            const { location } = result.geocodes[0];
            const position = [location.lng, location.lat];

            map.setCenter(position);
            map.clearMap(); // 清除之前的标记

            // 💡 优化 Marker 视觉：带有动效的圆点 + 信息标签
            const markerContent = `
              <div class="amap-custom-marker">
                <div class="pulsar"></div>
                <div class="dot"></div>
                <div class="address-label">${address}</div>
              </div>
            `;

            const marker = new AMap.Marker({
              position,
              content: markerContent,
              offset: new AMap.Pixel(-10, -10),
            });

            map.add(marker);
            setLoading(false);
          }
        });
      } catch (e) {
        console.error("地图加载或解析失败:", e);
      }
    };

    if (address) {
      initMap();
    }

    // 💡 销毁处理：防止内存泄漏
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [address]);

  return (
    <div className="w-full h-full relative group bg-slate-50 overflow-hidden rounded-3xl">
      {/* 加载状态 */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-slate-400 font-medium">
              加载地图中...
            </span>
          </div>
        </div>
      )}

      {/* 地图容器 */}
      <div ref={mapRef} className="w-full h-full grayscale-[0.2]" />

      {/* 💡 注入自定义 Marker 样式 */}
      <style jsx global>{`
        .amap-custom-marker {
          position: relative;
          display: flex;
          align-items: center;
        }
        .pulsar {
          position: absolute;
          width: 40px;
          height: 40px;
          left: -12px;
          top: -12px;
          background: rgba(37, 99, 235, 0.2);
          border-radius: 50%;
          animation: map-pulse 2s infinite;
        }
        .dot {
          width: 16px;
          height: 16px;
          background: #2563eb;
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }
        .address-label {
          position: absolute;
          left: 24px;
          white-space: nowrap;
          background: white;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #1e293b;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
        }
        @keyframes map-pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
