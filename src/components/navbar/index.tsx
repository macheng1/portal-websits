// ./components/navbar/index.tsx
"use client";
import { FC, useState } from "react";
import { Button, SideSheet } from "@douyinfe/semi-ui-19";
import { IconMenu } from "@douyinfe/semi-icons";
import Link from "next/link";
import Image from "next/image";
import logoLight from "@/public/logo_light.png";

export interface INavBarProps {
  /**
   * 菜单项列表
   */
  menuItems?: Array<{
    label: string;
    href: string;
  }>;
  /**
   * logo 跳转链接
   */
  logoHref?: string;
  /**
   * 是否显示登录按钮
   */
  showLogin?: boolean;
}

export const NavBar: FC<INavBarProps & { title?: string }> = ({
  menuItems = [],
  logoHref = "/",
  showLogin = false,
  title,
}) => {
  const [visible, setVisible] = useState(false); // 控制移动端菜单显示

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo 区域 */}
        <Link href={logoHref} className="flex items-center no-underline">
          <Image src={logoLight} alt="Logo" width={60} height={18} />
          <span className="ml-2 font-bold text-slate-800 text-sm md:text-base truncate max-w-[150px]">
            {title}
          </span>
        </Link>

        {/* 桌面端菜单：md 以上显示 */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-slate-600 hover:text-blue-600 font-medium no-underline text-sm"
            >
              {item.label}
            </Link>
          ))}
          {showLogin && (
            <Button theme="solid" type="primary" size="small">
              登录
            </Button>
          )}
        </div>

        {/* 移动端菜单按钮：md 以下显示 */}
        <div className="md:hidden flex items-center">
          <Button
            icon={<IconMenu />}
            theme="borderless"
            onClick={() => setVisible(true)}
          />
        </div>

        {/* 移动端侧边抽屉 */}
        <SideSheet
          title={title}
          visible={visible}
          onCancel={() => setVisible(false)}
          width={280}
        >
          <div className="flex flex-col gap-y-6 pt-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setVisible(false)} // 点击后关闭
                className="text-lg text-slate-700 font-medium no-underline border-b border-slate-50 pb-2"
              >
                {item.label}
              </Link>
            ))}
            {showLogin && (
              <Button theme="solid" type="primary" block size="large">
                登录
              </Button>
            )}
          </div>
        </SideSheet>
      </div>
    </nav>
  );
};
