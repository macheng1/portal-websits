// src/components/portal/JobBoard.tsx
"use client"; // 💡 必须加上，解决 Semi UI 类组件报错

import { Typography, Tag, Button } from "@douyinfe/semi-ui-19";
import { IconSend } from "@douyinfe/semi-icons";
import { formatJobPublishTime } from "@/src/lib/formatJobPublishTime";

type JobBoardItem = {
  id: string;
  position: string;
  count?: number;
  salary?: string | null;
  createdAt?: string | null;
};

export const JobBoard = ({ jobs = [] }: { jobs: JobBoardItem[] }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="group bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <Typography.Text strong className="text-white text-base">
              {job.position}
            </Typography.Text>
            <div className="flex items-center gap-2">
              {formatJobPublishTime(job.createdAt) && (
                <span className="text-[11px] font-bold text-blue-200">
                  {formatJobPublishTime(job.createdAt)}
                </span>
              )}
              <Tag color="white" type="light" size="small">
                招 {job.count} 人
              </Tag>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/60">
              月薪：
              <span className="text-blue-400 font-bold">{job.salary}</span>
            </span>
            <span className="text-white/40 group-hover:text-white transition-colors">
              立即沟通 →
            </span>
          </div>
        </div>
      ))}

      <Button
        block
        size="large"
        icon={<IconSend />}
        style={{
          backgroundColor: "white",
          color: "#0f172a",
          fontWeight: "bold",
          borderRadius: "12px",
          marginTop: "12px",
        }}
      >
        投递简历
      </Button>
    </div>
  );
};
