// src/app/portal/[domain]/[lang]/layout.tsx
import { NavBar } from "@/src/components/navbar";
import { Footer } from "@/src/components/footer";
import { fetchTenantData } from "@/src/lib/portal-api";
import { Locale, getDictionary } from "@/src/dictionaries";

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 💡 关键修正 1：params 必须定义为 Promise 类型
  params: Promise<{ domain: string; lang: Locale }>;
}) {
  const { domain, lang } = await params;

  // 💡 并发获取字典和业务数据，提高加载速度
  const [dict, data] = await Promise.all([
    getDictionary(lang),
    fetchTenantData(domain),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 这里的 NavBar 和 Footer 已根据你之前的要求进行了移动端适配 */}
      <NavBar {...data.navbar} dict={dict.nav} title={data.name} />
      <main className="flex-grow">{children}</main>
      <Footer {...data.footer} />
    </div>
  );
}
