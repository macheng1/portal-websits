// src/types/portal.ts

export interface IProduct {
  id: string;
  name: string;
  code: string;
  images: string[] | null;
  specs: Record<string, unknown>; // 动态规格
  categoryId: string;
}

export interface ICategory {
  id: string;
  name: string;
  code: string;
  products: IProduct[]; // 关联的产品
}

export interface IPortalConfig {
  title: string;
  logo: string;
  slogan: string;
  description: string;
  footerInfo: {
    address: string;
    phone: string;
    icp: string;
    copyright: string;
  };
  seoConfig: {
    keywords: string;
    description: string;
  };
}
