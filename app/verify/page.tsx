"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { createClient } from "@/lib/supabase/client";
import {
  buttonDisabledStyle,
  buttonStyle,
  errorStyle,
  inputStyle,
  labelStyle,
  noticeStyle,
} from "@/components/auth/authStyles";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialEmail = params.get("email") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  const onResend = async () => {
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    setError(null);
    setNotice(null);
    setResending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    setResending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setNotice("New code sent. Check your inbox.");
  };

  return (
    <AuthShell
      title="Check your email"
      subtitle={
        initialEmail
          ? `We sent a 6-digit code to ${initialEmail}. Enter it below to finish signing up.`
          : "Enter the 6-digit code we sent to your email."
      }
      footer={
        <p style={{ color: "rgba(250,250,248,0.5)", fontSize: "0.875rem" }}>
          <Link href="/signup" style={{ color: "#10B981", textDecoration: "none" }}>
            ← Back to signup
          </Link>
        </p>
      }
    >
      <form onSubmit={onVerify}>
        {!initialEmail && (
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
        )}
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="code" style={labelStyle}>Verification Code</label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            required
            maxLength={6}
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            style={{
              ...inputStyle,
              fontSize: "1.5rem",
              letterSpacing: "0.5em",
              textAlign: "center",
              fontWeight: 600,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          style={loading || code.length !== 6 ? buttonDisabledStyle : buttonStyle}
        >
          {loading ? "Verifying…" : "Verify & continue"}
        </button>

        {error && <div style={errorStyle}>{error}</div>}
        {notice && <div style={noticeStyle}>{notice}</div>}
      </form>

      <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
        <button
          type="button"
          onClick={onResend}
          disabled={resending}
          style={{
            background: "none",
            border: "none",
            color: "rgba(250,250,248,0.55)",
            fontSize: "0.85rem",
            cursor: resending ? "default" : "pointer",
            fontFamily: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          {resending ? "Sending…" : "Didn't get it? Resend code"}
        </button>
      </div>
    </AuthShell>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyInner />
    </Suspense>
  );
}
