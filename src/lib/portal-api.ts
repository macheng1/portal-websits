/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";
export const fetchTenantData = cache(async (domain: string): Promise<any> => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * 完整门户 Mock 数据
   * 整合了 INavBarProps 和 IFooterProps 接口规范
   */

  try {
    // 2. 尝试调用真实后端
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portal/info?domain=${domain}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn(`[Portal] 后端接口调用失败，切换至 Mock 模式: ${domain}`);
  }

  // 3. 回退到 Mock 数据，如果没有匹配域名则返回默认值
  return mockData[domain] || mockData["yuansi"];
});
export const mockData: Record<string, any> = {
  // 这里的 key "yuansi" 对应访问路径中的 [domain] 参数
  yuansi: {
    // 1. 基础全局信息
    name: "无锡元思科技",
    code: "ENT_WXYSKJ_XC7N",
    contactPerson: "马成",
    phone: "15251092328",
    address: "江苏省兴化市戴南镇工业园区",
    intro: "深耕金属制品业，专注于不锈钢引出棒、紧固件精密加工。",
    slogan: "赋能制造律动，链接工业未来",

    // 2. 导航栏配置 (对应 INavBarProps 接口)
    navbar: {
      logoHref: "/",
      showLogin: true,
      menuItems: [
        { label: "首页", href: "#home" },
        { label: "产品中心", href: "/portal/wuxi-yuansi/zh/products" },
        { label: "人才招聘", href: "/portal/wuxi-yuansi/zh/jobs" },
        { label: "工厂动态", href: "/portal/wuxi-yuansi/zh/posts" },
      ],
      className: "portal-header-custom",
    },

    // 3. 产品中心数据 (对应 Section 渲染)
    products: [
      {
        id: "p1",
        name: "不锈钢引出棒 (Terminal Pin)",
        material: "304 不锈钢",
        diameter: "2.5mm",
        isPublic: true,
      },
      {
        id: "p2",
        name: "加热管引出棒",
        material: "316L 不锈钢",
        diameter: "3.0mm",
        isPublic: true,
      },
    ],

    // 4. 招聘与动态 (业务扩展模块)
    jobs: [
      { id: "j1", position: "数控车工", salary: "8000-12000", count: 5 },
      { id: "j2", position: "质检员", salary: "5000-7000", count: 2 },
    ],
    posts: [
      {
        id: "n1",
        content: "今日 10 万支精密引出棒已顺利发货至广东！",
        createdAt: "2026-01-09",
      },
    ],

    // 5. 页脚配置 (对应 IFooterProps 接口)
    footer: {
      title: "无锡元思科技",
      linkList: [
        {
          title: "快捷导航",
          list: [
            { label: "产品中心", link: "/portal/wuxi-yuansi/zh/products" },
            { label: "人才招聘", link: "/portal/wuxi-yuansi/zh/jobs" },
          ],
        },
        {
          title: "联系我们",
          list: [
            { label: "电话：15251092328", link: "tel:15251092328" },
            { label: "地址：江苏省兴化市戴南镇工业园区" },
          ],
        },
      ],
      qrCode: {
        image: "/images/qr-code.png", // 确保 public 目录下有此图片
        text: "微信扫码联系工厂",
      },
      copyRight: "© 2026 无锡元思科技 版权所有",
      siteNumber: "苏ICP备20261234号-1",
      publicNumber: "苏公网安备 32128102000xxx号",
    },
  },
};
