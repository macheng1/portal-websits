/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  IconCustomerSupport,
  IconIdentity,
  IconSetting,
  IconVerify,
} from "@douyinfe/semi-icons";

export const AboutUsContent = ({ data }: any) => {
  const advantages = [
    {
      icon: <IconSetting />,
      title: "生产装备",
      desc: "围绕批量制造与稳定交付配置加工设备，覆盖常规规格与非标需求。",
    },
    {
      icon: <IconVerify />,
      title: "质量控制",
      desc: "从材料、尺寸到出厂检验，按订单要求进行过程管控。",
    },
    {
      icon: <IconIdentity />,
      title: "制造团队",
      desc: "由熟悉产品工艺、现场管理和客户交付的人员协同推进。",
    },
    {
      icon: <IconCustomerSupport />,
      title: "响应服务",
      desc: "支持图纸沟通、规格确认、样品打样和批量报价。",
    },
  ];

  const profileItems = [
    { label: "成立时间", value: data.businessInfo?.foundDate || "-" },
    { label: "员工规模", value: data.businessInfo?.staffCount || "-" },
    { label: "年产能", value: data.businessInfo?.annualCapacity || "-" },
    { label: "主营产品", value: data.businessInfo?.mainProducts || "-" },
  ];

  return (
    <main className="bg-[#f4f6f8]">
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-black tracking-[0.28em] text-blue-300">
            ABOUT FACTORY
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black">
            {data.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
            {data.slogan || "专注工业产品制造，服务稳定供应链。"}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-black tracking-[0.22em] text-blue-700">
              FACTORY PROFILE
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              工厂概况
            </h2>
            <p className="mt-6 text-base leading-9 text-slate-600">
              {data.intro}
            </p>
            <p className="mt-5 text-base leading-9 text-slate-600">
              我们围绕产品质量、交付稳定性和客户沟通效率持续建设制造能力，为采购、研发和生产客户提供可靠配套。
            </p>
          </div>

          <div className="grid grid-cols-2 border border-slate-200 bg-white">
            {profileItems.map((item) => (
              <div key={item.label} className="border-r border-b p-5 last:border-r-0">
                <div className="text-xs font-bold text-slate-500">
                  {item.label}
                </div>
                <div className="mt-2 text-xl font-black text-slate-950 break-words">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="mb-6">
          <p className="text-xs font-black tracking-[0.22em] text-blue-700">
            CAPABILITY
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            制造与服务能力
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="border border-slate-200 bg-white p-6 transition-colors hover:border-blue-500"
            >
              <div className="flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-700">
                {adv.icon}
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-950">
                {adv.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="border border-slate-200 bg-white p-6 md:p-8">
          <p className="text-xs font-black tracking-[0.22em] text-blue-700">
            PROCESS
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            合作流程
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["需求沟通", "图纸确认", "样品/报价", "批量交付"].map(
              (item, index) => (
                <div key={item} className="border border-slate-100 p-5">
                  <div className="font-mono text-sm font-black text-blue-700">
                    0{index + 1}
                  </div>
                  <div className="mt-3 text-lg font-black text-slate-950">
                    {item}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
