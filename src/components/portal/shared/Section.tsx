// src/components/portal/shared/Section.tsx
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "slate";
}

// ✅ 最优做法：使用函数式组件，并保留服务端组件特性
export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  bg = "white",
}) => {
  const bgClass = bg === "slate" ? "bg-slate-50" : "bg-white";

  return (
    <section className={`py-12 md:py-20 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">{children}</div>
    </section>
  );
};
