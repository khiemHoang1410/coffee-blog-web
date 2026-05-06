"use client";

import { useState, useEffect, type FormEvent } from "react";
import type { ApiResponse, ValidationErrors } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full px-4 py-3 rounded-lg border bg-brand-bg text-brand-text text-sm placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Auto-dismiss toast sau 4s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Đóng mobile keyboard khi submit xong
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

    // Blur active element để dismiss mobile keyboard
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

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
        setToast({ type: "success", msg: json.message });
        (e.target as HTMLFormElement).reset();
      } else {
        if (json.data) setFieldErrors(json.data);
        setFormState("error");
        setServerMessage(json.message);
        if (!json.data || !Object.keys(json.data).length) {
          setToast({ type: "error", msg: json.message });
        }
      }
    } catch {
      setFormState("error");
      setServerMessage("Lỗi kết nối. Vui lòng thử lại.");
      setToast({ type: "error", msg: "Lỗi kết nối. Vui lòng thử lại." });
    }
  }

  return (
    <div className="relative">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium transition-all duration-300 ${
            toast.type === "success"
              ? "bg-brand-accent text-brand-bg"
              : "bg-red-500 text-white"
          }`}
        >
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
          <button
            onClick={() => setToast(null)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Đóng thông báo"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8">
        {formState === "success" ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-brand-accent/15 flex items-center justify-center mx-auto mb-5">
              <span className="text-brand-accent text-2xl">✓</span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-brand-text mb-2">
              Đã gửi thành công!
            </h2>
            <p className="text-brand-muted mb-8 text-sm leading-relaxed max-w-xs mx-auto">
              {serverMessage}
            </p>
            <button
              onClick={() => { setFormState("idle"); setServerMessage(""); }}
              className="inline-flex items-center gap-2 border border-brand-border hover:border-brand-accent/50 text-brand-muted hover:text-brand-text font-medium px-6 py-2.5 rounded-full transition-all text-sm"
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
                className="block text-xs font-semibold text-brand-muted mb-2 uppercase tracking-wider"
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
                className={`${inputBase} ${
                  fieldErrors.name
                    ? "border-red-500/60 focus:ring-red-500/30"
                    : "border-brand-border"
                }`}
              />
              {fieldErrors.name && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-brand-muted mb-2 uppercase tracking-wider"
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
                className={`${inputBase} ${
                  fieldErrors.email
                    ? "border-red-500/60 focus:ring-red-500/30"
                    : "border-brand-border"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-brand-muted mb-2 uppercase tracking-wider"
              >
                Tin nhắn <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Bạn muốn nhắn gì với chúng tôi?"
                className={`${inputBase} resize-none ${
                  fieldErrors.message
                    ? "border-red-500/60 focus:ring-red-500/30"
                    : "border-brand-border"
                }`}
              />
              {fieldErrors.message && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Server error banner (chỉ khi không có field errors) */}
            {formState === "error" && !Object.keys(fieldErrors).length && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <span>⚠</span> {serverMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full bg-brand-accent hover:bg-brand-accent2 disabled:opacity-50 disabled:cursor-not-allowed text-brand-bg font-semibold py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide hover:scale-[1.01] active:scale-[0.99]"
            >
              {formState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-brand-bg/30 border-t-brand-bg rounded-full animate-spin" />
                  Đang gửi…
                </span>
              ) : (
                "Gửi tin nhắn →"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
