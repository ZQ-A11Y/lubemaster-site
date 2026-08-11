"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./button";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = "d2102ea0-7a54-4ac2-933e-8c0731554e4f";

interface ContactFormProps {
  t: {
    formTitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      industry: string;
      industryPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      note: string;
      industryOptions: Record<string, string>;
    };
    successMessage: string;
    errorMessage: string;
  };
}

export function ContactForm({ t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `${t.form.submit} - ${formData.company} (${formData.name})`,
          from_name: formData.name,
          replyto: formData.email,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone || "-",
          industry: formData.industry || "-",
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || t.errorMessage);
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
    } catch {
      setErrorMsg(t.errorMessage);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20 transition-all";

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center" role="alert">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{t.successMessage}</h3>
        <p className="text-sm text-[var(--muted)]">{t.form.note}</p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
      <h3 className="text-lg font-bold text-[var(--foreground)] mb-6">{t.formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="cf-name" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{t.form.name} <span className="text-red-500">*</span></label>
            <input
              id="cf-name"
              type="text"
              className={inputClass}
              placeholder={t.form.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="cf-company" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{t.form.company} <span className="text-red-500">*</span></label>
            <input
              id="cf-company"
              type="text"
              className={inputClass}
              placeholder={t.form.companyPlaceholder}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="cf-email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{t.form.email} <span className="text-red-500">*</span></label>
            <input
              id="cf-email"
              type="email"
              className={inputClass}
              placeholder={t.form.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="cf-phone" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{t.form.phone}</label>
            <input
              id="cf-phone"
              type="tel"
              className={inputClass}
              placeholder={t.form.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="cf-industry" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{t.form.industry}</label>
          <select
            id="cf-industry"
            className={`${inputClass} cursor-pointer`}
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          >
            <option value="">{t.form.industryPlaceholder}</option>
            {Object.entries(t.form.industryOptions).map(([key, val]) => (
              <option key={key} value={val as string}>{val as string}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-message" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{t.form.message} <span className="text-red-500">*</span></label>
          <textarea
            id="cf-message"
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder={t.form.messagePlaceholder}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        {status === "error" && (
          <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> {t.form.submitting || t.form.submit + "..."}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> {t.form.submit}
            </>
          )}
        </Button>
        <p className="text-xs text-[var(--muted)] text-center">{t.form.note}</p>
      </form>
    </div>
  );
}
