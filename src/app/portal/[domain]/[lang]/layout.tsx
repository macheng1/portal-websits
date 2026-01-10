// src/app/portal/[domain]/[lang]/layout.tsx
import { NavBar } from "@/src/components/navbar";
import { Footer } from "@/src/components/footer";
import { fetchTenantData } from "@/src/lib/portal-api";
import { getDictionary } from "@/src/dictionaries";

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 💡 关键修正 1：params 必须定义为 Promise 类型
  params: Promise<{ domain: string; lang: string }>;
}) {
  // 💡 关键修正 2：必须先 await 才能解构出具体的 domain 和 lang
  const { domain, lang = "zh" } = await params;

  const data = await fetchTenantData(domain);
  // const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 这里的 NavBar 和 Footer 已根据你之前的要求进行了移动端适配 */}
      <NavBar {...data.navbar} title={data.name} />
      <main className="flex-grow">{children}</main>
      <Footer {...data.footer} />
    </div>
  );
}
