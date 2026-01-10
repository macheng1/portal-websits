/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/AboutUsContent.tsx
"use client";

import {
  Typography,
  Timeline,
  Card,
  Space,
  Divider,
} from "@douyinfe/semi-ui-19";
import {
  IconVerify,
  IconIdentity,
  IconSetting,
  IconCustomerSupport,
} from "@douyinfe/semi-icons";
import Image from "next/image";

export const AboutUsContent = ({ data }: any) => {
  const advantages = [
    {
      icon: <IconSetting style={{ color: "#2563eb" }} />,
      title: "先进设备",
      desc: "拥有多台精密数控车床及全自动冷拔机组。",
    },
    {
      icon: <IconVerify style={{ color: "#2563eb" }} />,
      title: "严格质检",
      desc: "每批产品均经过光谱分析及硬度测试。",
    },
    {
      icon: <IconIdentity style={{ color: "#2563eb" }} />,
      title: "专业团队",
      desc: "深耕不锈钢行业 20 余年的技术专家指导。",
    },
    {
      icon: <IconCustomerSupport style={{ color: "#2563eb" }} />,
      title: "极速响应",
      desc: "提供 24 小时技术咨询及非标定制服务。",
    },
  ];

  return (
    <main>
      {/* 1. 品牌愿景区 - 纯白大背景 */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <Typography.Title
          heading={1}
          className="text-4xl md:text-6xl font-black mb-8"
        >
          {data.name}
        </Typography.Title>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed italic">
          "{data.slogan || "赋能制造律动，链接工业未来"}"
        </p>
      </section>

      {/* 2. 工厂简介 - 图文交叉布局 */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="border-l-4 border-blue-600 pl-6">
            <h2 className="text-3xl font-bold">工厂概况</h2>
            <p className="text-slate-400">Factory Overview</p>
          </div>
          <Typography.Paragraph className="text-lg text-slate-600 leading-loose">
            {data.intro}
            <br />
            <br />
            坐落于享有“中国不锈钢名镇”美誉的江苏省兴化市戴南镇，我们依托完善的产业链优势，致力于为全球加热管制造商提供最精准的零部件支持。
          </Typography.Paragraph>
        </div>
        <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <Image
            src="/images/factory-gate.jpg"
            alt="工厂实拍"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. 核心优势 - 四宫格展示 */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">为什么选择我们</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, idx) => (
              <Card
                key={idx}
                className="bg-white border-none rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 p-4"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {adv.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{adv.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {adv.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 发展历程 - 时间轴 */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">发展历程</h2>
        <Timeline mode="alternate">
          <Timeline.Item time="2015" type="success">
            元思科技在江苏戴南成立，开启不锈钢引出棒业务。
          </Timeline.Item>
          <Timeline.Item time="2018">
            扩建 5000 平方米现代化生产车间，引入全自动数控设备。
          </Timeline.Item>
          <Timeline.Item time="2022">
            通过 ISO9001 质量管理体系认证，业务覆盖全国 20 多个省份。
          </Timeline.Item>
          <Timeline.Item time="2026" type="warning">
            启动数字化工厂转型，为客户提供更透明的生产追溯。
          </Timeline.Item>
        </Timeline>
      </section>
    </main>
  );
};
