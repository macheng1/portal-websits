// src/components/portal/ProductGrid.tsx
import { IconArrowRight } from "@douyinfe/semi-icons";
import Image from "next/image";
import Link from "next/link";

interface ProductItem {
  id: string;
  name: string;
  material?: string | null;
  diameter?: string | null;
  image?: string | null;
}

interface Category {
  categoryName: string;
  categoryEn?: string;
  items?: ProductItem[];
}

export const ProductGrid = ({
  categories = [],
  domain,
  lang,
}: {
  categories: Category[];
  domain: string;
  lang: string;
}) => {
  return (
    <div className="space-y-6">
      {categories.map((cat, idx) => (
        <section key={`${cat.categoryName}-${idx}`} className="bg-white">
          <div className="flex flex-col gap-4 border border-slate-200 p-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-black tracking-[0.18em] text-slate-400">
                {cat.categoryEn || `SERIES ${idx + 1}`}
              </div>
              <h3 className="mt-2 text-2xl font-black text-slate-950">
                {cat.categoryName}
              </h3>
            </div>
            <Link
              href={`/portal/${domain}/${lang}/products?category=${idx}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 no-underline"
            >
              查看系列 <IconArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2">
            {(cat.items || []).slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={`/portal/${domain}/${lang}/products/${item.id}`}
                className="group no-underline"
              >
                <article className="grid min-h-[260px] border-x border-b border-slate-200 bg-white sm:grid-cols-[42%_58%] transition-colors hover:bg-slate-50">
                  <div className="relative min-h-[220px] overflow-hidden bg-white">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                        PRODUCT IMAGE
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col p-5">
                    <div className="text-xs font-black text-blue-700">
                      PRODUCT
                    </div>
                    <h4 className="mt-3 text-xl font-black leading-snug text-slate-950">
                      {item.name}
                    </h4>

                    <dl className="mt-6 space-y-3 text-sm">
                      <div className="flex justify-between gap-5 border-b border-slate-100 pb-3">
                        <dt className="text-slate-500">材料</dt>
                        <dd className="text-right font-bold text-slate-900">
                          {item.material || "-"}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-5 border-b border-slate-100 pb-3">
                        <dt className="text-slate-500">规格</dt>
                        <dd className="text-right font-mono font-bold text-slate-900">
                          {item.diameter || "-"}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-auto pt-6 text-sm font-black text-blue-700">
                      查看参数 →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
