// src/components/portal/navigation/Header.tsx
"use client";

import React, { useState } from "react";
import { Nav, Button, Dropdown, Space } from "@douyinfe/semi-ui-19";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Dictionary } from "@/src/dictionaries";
import { Logo } from "../shared/Logo";

export const Header = ({ dict }: { dict: Dictionary["nav"] }) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const lang = params.lang as string;
  const domain = params.domain as string;

  // 💡 语言切换逻辑：替换路径中的语言部分
  const handleLanguageChange = (targetLang: string) => {
    const newPath = pathname.replace(`/${lang}`, `/${targetLang}`);
    router.push(newPath);
  };

  return (
    <Nav
      mode="horizontal"
      className="sticky top-0 z-50 shadow-sm border-b border-gray-100 px-4 md:px-8"
      // 💡 左侧：注入品牌 Logo
      header={<Logo className="scale-90 origin-left" />}
      // 💡 中间：导航菜单 (数据联动字典)
      items={[
        { itemKey: "home", text: dict.home },
        { itemKey: "products", text: dict.products },
        { itemKey: "about", text: dict.about },
        { itemKey: "jobs", text: dict.jobs },
      ]}
      // 💡 右侧：语言切换 + 联系我们
      footer={
        <Space spacing="medium">
          <Dropdown
            trigger="click"
            position="bottomRight"
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLanguageChange("zh")}>
                  简体中文
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLanguageChange("en")}>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            {/*  icon={<IconGlobal />} */}
            <Button theme="borderless">{lang === "zh" ? "中文" : "EN"}</Button>
          </Dropdown>

          <Button
            // icon={<IconPhone />}
            theme="solid"
            className="hidden md:flex bg-blue-600"
          >
            {lang === "zh" ? "联系我们" : "Contact"}
          </Button>
        </Space>
      }
    />
  );
};
