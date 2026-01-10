// src/app/portal/[domain]/[lang]/page.tsx
export default async function PortalHome({
  params,
}: {
  params: { domain: string; lang: string };
}) {
  // 这里的 params 包含 URL 中的 [domain] 和 [lang]
  const { domain, lang } = params;

  return (
    <div>
      <h1>当前域名: {domain}</h1>
      <p>当前语言: {lang}</p>
      <div>123123</div>
    </div>
  );
}
