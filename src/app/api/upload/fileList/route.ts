import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // 获取客户端真实 IP
    const headersList = await headers();
    const clientIP = headersList.get("x-forwarded-for")?.split(",")[0] ||
                     headersList.get("x-real-ip") ||
                     "unknown";

    const formData = await request.formData();
    const files = formData.getAll("file");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "请选择要上传的文件" },
        { status: 400 }
      );
    }

    // 文件验证
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/dwg",
      "application/zip",
      "application/x-zip-compressed",
    ];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `文件 "${file.name}" 超过 10MB 限制` },
          { status: 400 }
        );
      }

      // 检查文件类型
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `不支持的文件类型: ${file.type}` },
          { status: 400 }
        );
      }
    }

    // 转发到真实后端 API
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { error: "服务器配置错误" },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}/upload/fileList`, {
      method: "POST",
      headers: {
        "X-Forwarded-For": clientIP,
        "User-Agent": headersList.get("user-agent") || "",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload API error:", response.status, errorText);
      return NextResponse.json(
        { error: "文件上传失败，请稍后重试" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
