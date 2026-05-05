"use client";

import { useState, type FormEvent } from "react";
import type { ApiResponse, ValidationErrors } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json: ApiResponse<ValidationErrors> = await res.json();

      if (json.success) {
        setFormState("success");
        setServerMessage(json.message);
        (e.target as HTMLFormElement).reset();
      } else {
        if (json.data) setFieldErrors(json.data);
        setFormState("error");
        setServerMessage(json.message);
      }
    } catch {
      setFormState("error");
      setServerMessage("Lỗi kết nối. Vui lòng thử lại.");
    }
  }

  return (
    <div className="bg-brand-surface border border-[#2A1F10] rounded-2xl p-8">
      {formState === "success" ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display text-xl font-semibold text-brand-text mb-2">Đã gửi!</h2>
          <p className="text-brand-muted mb-6 text-sm">{serverMessage}</p>
          <button
            onClick={() => {
              setFormState("idle");
              setServerMessage("");
            }}
            className="text-brand-accent hover:text-brand-accent/80 font-medium underline text-sm"
          >
            Gửi thêm tin nhắn
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-brand-text/70 mb-1.5 uppercase tracking-wide"
            >
              Họ và tên <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Nguyễn Văn A"
              className={`w-full px-4 py-3 rounded-lg border bg-[#111111] text-brand-text text-sm placeholder:text-brand-muted/50 focus:outline-none focus:ring-1 focus:ring-brand-accent transition ${
                fieldErrors.name
                  ? "border-red-500/50"
                  : "border-[#2A1F10] focus:border-brand-accent"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-brand-text/70 mb-1.5 uppercase tracking-wide"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="ban@email.com"
              className={`w-full px-4 py-3 rounded-lg border bg-[#111111] text-brand-text text-sm placeholder:text-brand-muted/50 focus:outline-none focus:ring-1 focus:ring-brand-accent transition ${
                fieldErrors.email
                  ? "border-red-500/50"
                  : "border-[#2A1F10] focus:border-brand-accent"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-brand-text/70 mb-1.5 uppercase tracking-wide"
            >
              Tin nhắn <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Bạn muốn nhắn gì với chúng tôi?"
              className={`w-full px-4 py-3 rounded-lg border bg-[#111111] text-brand-text text-sm placeholder:text-brand-muted/50 focus:outline-none focus:ring-1 focus:ring-brand-accent transition resize-none ${
                fieldErrors.message
                  ? "border-red-500/50"
                  : "border-[#2A1F10] focus:border-brand-accent"
              }`}
            />
            {fieldErrors.message && (
              <p className="text-red-400 text-xs mt-1">
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Server error banner */}
          {formState === "error" && !Object.keys(fieldErrors).length && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
              {serverMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={formState === "loading"}
            className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/40 text-brand-bg font-semibold py-3 rounded-xl transition-colors text-sm tracking-wide"
          >
            {formState === "loading" ? "Đang gửi…" : "Gửi tin nhắn"}
          </button>
        </form>
      )}
    </div>
  );
}
