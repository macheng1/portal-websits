"use client";
import { FC, useState, useEffect, useRef } from "react";
import { Button, SideSheet } from "@douyinfe/semi-ui-19";
import { IconMenu, IconLanguage, IconChevronDown } from "@douyinfe/semi-icons";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import logoLight from "@/public/logo_light.png";
import { Dictionary } from "@/src/dictionaries"; // 💡 导入类型定义

export interface INavBarProps {
  menuItems?: Array<{ label: string; href: string }>;
  logoHref?: string;
  showLogin?: boolean;
  title?: string;
  dict: Dictionary["nav"]; // 💡 传入完整的字典对象
}

export const NavBar: FC<INavBarProps> = ({
  menuItems = [],
  logoHref = "/",
  showLogin = false,
  title,
  dict,
}) => {
  const [visible, setVisible] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const domain = (params.domain as string) || "wuxi-yuansi";
  const lang = (params.lang as string) || "zh";
  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    const pathSegments = pathname.split("/");
    if (pathSegments.length >= 4) {
      pathSegments[3] = lang;
      router.push(pathSegments.join("/"));
      setIsLangOpen(false);
    }
  };
  const desktopMenuItems = [
    {
      label: dict?.home,
      href: `/portal/${domain}/${lang}`,
    },
    {
      label: dict?.products,
      href: `/portal/${domain}/${lang}/products`,
    },
    {
      label: dict?.contact,
      href: `/portal/${domain}/${lang}/contact`,
    },
  ];
  const isEn = pathname.includes("/en");

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* 1. Logo 区域 */}
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
          <span className="ml-3 font-bold text-slate-900 text-sm md:text-base tracking-tight truncate max-w-[120px]">
            {title}
          </span>
        </Link>

        {/* 2. 桌面端菜单 */}
        <div className="hidden md:flex flex-1 items-center ml-10 gap-x-8">
          {desktopMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-slate-600 hover:text-blue-600 font-medium no-underline text-[14px] transition-colors relative hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 3. 右侧操作区 */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 💡 桌面端中英文切换 */}
          {mounted && (
            <div className="hidden md:block relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium border border-transparent hover:border-slate-100"
              >
                <IconLanguage size="large" className="text-slate-400" />
                <span>{isEn ? "EN" : "ZH"}</span>
                <IconChevronDown
                  size="small"
                  className={`transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* 下拉菜单浮层 */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={() => handleLanguageChange("zh")}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      !isEn
                        ? "text-blue-600 bg-blue-50/50 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    简体中文
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      isEn
                        ? "text-blue-600 bg-blue-50/50 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          )}

          {showLogin && (
            <div className="hidden md:block">
              <Button
                theme="solid"
                type="primary"
                size="small"
                className="rounded-full px-5 font-semibold"
              >
                {/* 💡 换成字典中的登录 */}
                {isEn ? "Login" : "登录"}
              </Button>
            </div>
          )}

          {/* 移动端菜单按钮 */}
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
          <div className="flex flex-col h-full">
            <div className="flex flex-col gap-y-2 flex-1">
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
            </div>

            <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
              <div className="flex justify-around bg-slate-50 p-1 rounded-xl">
                <button
                  onClick={() => handleLanguageChange("zh")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    !isEn
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-500"
                  }`}
                >
                  {/* 💡 移动端底部切换文本 */}
                  中文
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    isEn ? "bg-white shadow-sm text-blue-600" : "text-slate-500"
                  }`}
                >
                  English
                </button>
              </div>
              {showLogin && (
                <Button
                  theme="solid"
                  type="primary"
                  block
                  size="large"
                  className="rounded-xl"
                >
                  {isEn ? "Login" : "登录"}
                </Button>
              )}
            </div>
          </div>
        </SideSheet>
      </div>
    </nav>
  );
};
