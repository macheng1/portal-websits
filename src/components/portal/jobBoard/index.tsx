"use client";

import { Button, Tag } from "@douyinfe/semi-ui-19";
import { IconArrowRight, IconSend } from "@douyinfe/semi-icons";
import { formatJobPublishTime } from "@/src/lib/formatJobPublishTime";

type JobBoardItem = {
  id: string;
  position: string;
  count?: number;
  salary?: string | null;
  location?: string | null;
  createdAt?: string | null;
};

export const JobBoard = ({ jobs = [] }: { jobs: JobBoardItem[] }) => {
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="group border border-slate-200 bg-white p-4 transition-colors hover:border-blue-500 hover:bg-slate-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black text-slate-950">
                  {job.position}
                </h3>
                {formatJobPublishTime(job.createdAt) && (
                  <span className="text-xs font-bold text-slate-500">
                    {formatJobPublishTime(job.createdAt)}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{job.location || "工作地点面议"}</span>
                <span>/</span>
                <span>招 {job.count || 1} 人</span>
              </div>
            </div>
            <Tag color="blue" type="light" size="small">
              {job.salary || "面议"}
            </Tag>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
            <span className="text-slate-500">制造团队岗位</span>
            <span className="inline-flex items-center gap-1 font-bold text-blue-700">
              了解职位 <IconArrowRight />
            </span>
          </div>
        </div>
      ))}

      <Button
        block
        size="large"
        icon={<IconSend />}
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          fontWeight: "bold",
          borderRadius: 0,
          marginTop: "12px",
        }}
      >
        投递简历
      </Button>
    </div>
  );
};
