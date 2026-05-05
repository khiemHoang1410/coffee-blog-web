import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail } from "@/lib/utils";
import type { ContactForm, ApiResponse, ValidationErrors } from "@/types";

// Khởi tạo Resend client — API key lấy từ env
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Validation ───────────────────────────────────────────────────────────────

function validateContactForm(data: unknown): {
  valid: boolean;
  errors: ValidationErrors;
  parsed?: ContactForm;
} {
  const errors: ValidationErrors = {};

  if (!data || typeof data !== "object") {
    return { valid: false, errors: { name: "Dữ liệu không hợp lệ" } };
  }

  const { name, email, message } = data as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Tên phải có ít nhất 2 ký tự";
  }

  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    errors.email = "Email không hợp lệ";
  }

  if (
    !message ||
    typeof message !== "string" ||
    message.trim().length < 10
  ) {
    errors.message = "Tin nhắn phải có ít nhất 10 ký tự";
  }

  const valid = Object.keys(errors).length === 0;
  const parsed = valid
    ? {
        name: (name as string).trim(),
        email: (email as string).trim().toLowerCase(),
        message: (message as string).trim(),
      }
    : undefined;

  return { valid, errors, parsed };
}

// ─── Email template ───────────────────────────────────────────────────────────

function buildEmailHtml(form: ContactForm): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7a3f17; border-bottom: 2px solid #eabc73; padding-bottom: 8px;">
        ☕ Tin nhắn mới từ website
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 120px;">Họ tên:</td>
          <td style="padding: 8px;">${escapeHtml(form.name)}</td>
        </tr>
        <tr style="background: #fdf8f0;">
          <td style="padding: 8px; font-weight: bold;">Email:</td>
          <td style="padding: 8px;">
            <a href="mailto:${escapeHtml(form.email)}">${escapeHtml(form.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; vertical-align: top;">Tin nhắn:</td>
          <td style="padding: 8px; white-space: pre-wrap;">${escapeHtml(form.message)}</td>
        </tr>
      </table>
      <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
        Email này được gửi tự động từ form liên hệ trên website.
      </p>
    </div>
  `;
}

/** Escape HTML để tránh XSS trong email template */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body: unknown = await req.json();
    const { valid, errors, parsed } = validateContactForm(body);

    // Trả về lỗi validation nếu dữ liệu không hợp lệ
    if (!valid || !parsed) {
      return NextResponse.json(
        {
          success: false,
          message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
          data: errors,
        },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL_TO;
    if (!toEmail) {
      console.error("CONTACT_EMAIL_TO chưa được cấu hình trong env");
      return NextResponse.json(
        { success: false, message: "Lỗi cấu hình server." },
        { status: 500 }
      );
    }

    // Gửi email qua Resend
    const { error } = await resend.emails.send({
      from: "Café Website <onboarding@resend.dev>", // đổi domain sau khi verify
      to: [toEmail],
      replyTo: parsed.email,
      subject: `[Liên hệ] Tin nhắn từ ${parsed.name}`,
      html: buildEmailHtml(parsed),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Không thể gửi email. Thử lại sau." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm nhất có thể.",
      },
      { status: 200 }
    );
  } catch (err) {
    // Bắt lỗi parse JSON hoặc lỗi không mong đợi
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}

// Chặn các method không hỗ trợ
export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    { success: false, message: "Method không được hỗ trợ." },
    { status: 405 }
  );
}
