// ./components/navbar/index.tsx
"use client";
import { FC, useState } from "react";
import { Button, SideSheet } from "@douyinfe/semi-ui-19";
import { IconMenu } from "@douyinfe/semi-icons";
import Link from "next/link";
import Image from "next/image";
import logoLight from "@/public/logo_light.png";

export interface INavBarProps {
  menuItems?: Array<{ label: string; href: string }>;
  logoHref?: string;
  showLogin?: boolean;
}

export const NavBar: FC<INavBarProps & { title?: string }> = ({
  menuItems = [],
  logoHref = "/",
  showLogin = false,
  title,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* 1. Logo 区域：保持在最左侧 */}
        <Link
          href={logoHref}
          className="flex items-center no-underline shrink-0 group"
        >
          <Image
            src={logoLight}
            alt="Logo"
            width={70}
            height={20}
            className="group-hover:opacity-80 transition-opacity"
          />
          <span className="ml-3 font-bold text-slate-900 text-sm md:text-base tracking-tight truncate max-w-[120px] lg:max-w-[200px]">
            {title}
          </span>
        </Link>

        {/* 2. 桌面端菜单区域：通过 flex-1 占据中间空间 */}
        <div className="hidden md:flex flex-1 items-center ml-10 gap-x-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-slate-600 hover:text-blue-600 font-medium no-underline text-[14px] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 3. 右侧操作区：登录按钮或移动端开关 */}
        <div className="flex-1 flex items-center justify-end">
          {/* 桌面端登录按钮 */}
          {showLogin && (
            <div className="hidden md:block">
              <Button
                theme="solid"
                type="primary"
                size="small"
                className="rounded-full px-5 font-semibold"
              >
                登录
              </Button>
            </div>
          )}

          {/* 移动端汉堡菜单按钮：仅在 md 以下显示 */}
          <div className="md:hidden flex items-center">
            <Button
              icon={<IconMenu size="large" />}
              theme="borderless"
              style={{ color: "var(--semi-color-text-1)" }}
              onClick={() => setVisible(true)}
            />
          </div>
        </div>

        {/* 移动端侧边抽屉适配 */}
        <SideSheet
          title={
            <div className="flex items-center gap-2">
              <Image src={logoLight} alt="Logo" width={50} height={15} />
              <span className="text-sm font-bold">{title}</span>
            </div>
          }
          visible={visible}
          onCancel={() => setVisible(false)}
          width={280}
        >
          <div className="flex flex-col gap-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setVisible(false)}
                className="px-4 py-3 text-slate-700 font-medium no-underline hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
            {showLogin && (
              <div className="mt-6 px-4">
                <Button
                  theme="solid"
                  type="primary"
                  block
                  size="large"
                  className="rounded-lg"
                >
                  登录
                </Button>
              </div>
            )}
          </div>
        </SideSheet>
      </div>
    </nav>
  );
};
