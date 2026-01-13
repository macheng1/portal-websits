const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "macheng123.oss-cn-hangzhou.aliyuncs.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "macheng123.oss-cn-hangzhou.aliyuncs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: [
    "@douyinfe/semi-ui-19",
    "@douyinfe/semi-icons",
    "@douyinfe/semi-illustrations",
  ],
};

export default nextConfig;
