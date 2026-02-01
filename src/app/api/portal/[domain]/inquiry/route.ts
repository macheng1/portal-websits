import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    // 获取客户端真实 IP
    const headersList = await headers();
    const clientIP = headersList.get("x-forwarded-for")?.split(",")[0] ||
                     headersList.get("x-real-ip") ||
                     "unknown";

    const { domain } = await params;
    const body = await request.json();

    console.log("收到请求体:", {
      hasCaptchaToken: !!body.captchaToken,
    });

    // 验证 hCaptcha token
    if (!body.captchaToken) {
      return NextResponse.json(
        { error: "请完成人机验证" },
        { status: 400 }
      );
    }

    // 向 hCaptcha 服务器验证 token
    const secretKey = process.env.HCAPTCHA_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "服务器配置错误" },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: body.captchaToken,
        remoteip: clientIP,
      }),
    });

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
      return NextResponse.json(
        { error: "验证码验证失败" },
        { status: 400 }
      );
    }

    // 基础验证
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: "缺少必填字段" },
        { status: 400 }
      );
    }

    // 邮箱格式简单验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "邮箱格式不正确" },
        { status: 400 }
      );
    }

    // 转发到真实后端 API
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { error: "服务器配置错误" },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}/portal/${domain}/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": clientIP,
        "User-Agent": headersList.get("user-agent") || "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "提交失败，请稍后重试" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Inquiry route error:", error);
    return NextResponse.json(
      { error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
