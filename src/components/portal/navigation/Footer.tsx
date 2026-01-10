import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* 第一列：品牌与介绍 */}
        <div className="col-span-1 md:col-span-1">
          <div className="text-white text-2xl font-bold mb-4">Logo</div>
          <p className="text-sm leading-relaxed">
            致力于提供行业领先的数字化解决方案，助力企业实现智能化转型。
          </p>
        </div>

        {/* 第二列：产品服务 */}
        <div>
          <h4 className="text-white font-semibold mb-6">产品服务</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                智能云平台
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                数据分析工具
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                企业级安全
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                开发者工具
              </a>
            </li>
          </ul>
        </div>

        {/* 第三列：关于我们 */}
        <div>
          <h4 className="text-white font-semibold mb-6">关于我们</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                公司介绍
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                新闻动态
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                加入我们
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                联系我们
              </a>
            </li>
          </ul>
        </div>

        {/* 第四列：联系与支持 */}
        <div>
          <h4 className="text-white font-semibold mb-6">联系与支持</h4>
          <ul className="space-y-4 text-sm">
            <li>电话：400-123-4567</li>
            <li>邮箱：support@example.com</li>
            <li>地址：北京市朝阳区科技园区 A 座</li>
          </ul>
          {/* 这里可以放一个小二维码占位 */}
          <div className="mt-6 w-24 h-24 bg-white/10 flex items-center justify-center rounded">
            <span className="text-[10px] text-gray-500">公众号二维码</span>
          </div>
        </div>
      </div>

      {/* 底部版权栏 */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
        <div className="mb-4 md:mb-0">
          © {currentYear} 你的公司名称. 版权所有
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition">
            隐私政策
          </a>
          <a href="#" className="hover:text-white transition">
            服务条款
          </a>
          <a href="#" className="hover:text-white transition">
            京ICP备12345678号-1
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
