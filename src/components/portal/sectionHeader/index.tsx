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
    <div className="flex justify-between items-end mb-8 border-l-4 border-blue-600 pl-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title}
        </h2>
        {subTitle && <p className="text-slate-400 text-sm mt-1">{subTitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center no-underline transition-all"
        >
          查看更多 <IconChevronRight />
        </Link>
      )}
    </div>
  );
};
