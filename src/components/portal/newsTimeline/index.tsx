/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/portal/NewsTimeline.tsx
"use client"; // 💡 必须加上，解决 Semi UI 类组件报错

import { Timeline, Typography } from "@douyinfe/semi-ui-19";

export const NewsTimeline = ({ posts = [] }: { posts: any[] }) => {
  return (
    <div className="mt-6 px-2">
      <Timeline>
        {posts.map((post) => (
          <Timeline.Item
            key={post.id}
            time={post.createdAt}
            type="success"
            extra={
              <Typography.Text type="tertiary" size="small">
                来自：生产管理部
              </Typography.Text>
            }
          >
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-1">
              <Typography.Text className="text-slate-700 leading-relaxed">
                {post.content}
              </Typography.Text>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>

      {posts.length === 0 && (
        <div className="py-10 text-center text-slate-400 text-sm italic">
          暂无最近动态
        </div>
      )}
    </div>
  );
};
