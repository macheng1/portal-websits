import { fetchTenantData } from "@/src/lib/portal-api";
import { formatJobPublishTime } from "@/src/lib/formatJobPublishTime";
import { Metadata } from "next";

type PortalJob = {
  id: string;
  position: string;
  count?: number;
  salary?: string | null;
  location?: string | null;
  experience?: string | null;
  education?: string | null;
  description?: string | null;
  requirement?: string | null;
  createdAt?: string | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const data = await fetchTenantData(domain);
  return {
    title: `招聘 - ${data?.name || "工厂门户"}`,
    description: `查看${data?.name || "企业"}最新招聘职位。`,
  };
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ domain: string; lang: string }>;
}) {
  const { domain, lang } = await params;
  const data = await fetchTenantData(domain);

  if (!data) return <div className="p-20 text-center">未找到工厂信息</div>;

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-blue-600 text-sm font-bold mb-3">CAREERS</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            招聘职位
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl">
            欢迎加入 {data.name}，与我们一起为客户提供高品质工业产品与服务。
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {data.jobs?.length ? (
          <div className="space-y-4">
            {(data.jobs as PortalJob[]).map((job) => (
              <article
                key={job.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-black text-slate-900">
                        {job.position}
                      </h2>
                      {formatJobPublishTime(job.createdAt) && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          {formatJobPublishTime(job.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 text-sm text-slate-500">
                      <span>{job.location || "工作地点面议"}</span>
                      <span>·</span>
                      <span>招 {job.count || 1} 人</span>
                      {job.experience && (
                        <>
                          <span>·</span>
                          <span>{job.experience}</span>
                        </>
                      )}
                      {job.education && (
                        <>
                          <span>·</span>
                          <span>{job.education}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-blue-600 font-black text-lg">
                    {job.salary || "薪资面议"}
                  </div>
                </div>

                {(job.description || job.requirement) && (
                  <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm leading-7 text-slate-600">
                    {job.description && (
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">
                          职位描述
                        </h3>
                        <p className="whitespace-pre-line">{job.description}</p>
                      </div>
                    )}
                    {job.requirement && (
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">
                          任职要求
                        </h3>
                        <p className="whitespace-pre-line">{job.requirement}</p>
                      </div>
                    )}
                  </div>
                )}

                <a
                  href={`/portal/${domain}/${lang}/contact`}
                  className="inline-flex mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold no-underline hover:bg-black"
                >
                  联系我们
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500">
            暂无招聘职位
          </div>
        )}
      </section>
    </main>
  );
}
