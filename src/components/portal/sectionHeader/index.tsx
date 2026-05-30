// src/components/portal/SectionHeader.tsx
import Link from "next/link";
import { IconChevronRight } from "@douyinfe/semi-icons";

interface Props {
  title: string;
  subTitle?: string;
  href?: string;
}

export const SectionHeader = ({ title, subTitle, href }: Props) => {
  return (
    <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-5">
      <div>
        <p className="mb-2 text-xs font-black tracking-[0.22em] text-blue-700">
          SECTION
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-950">
          {title}
        </h2>
        {subTitle && <p className="text-slate-500 text-sm mt-2">{subTitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-blue-700 hover:text-blue-800 text-sm font-bold flex items-center no-underline transition-all"
        >
          查看更多 <IconChevronRight />
        </Link>
      )}
    </div>
  );
};
