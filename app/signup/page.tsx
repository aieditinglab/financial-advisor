"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { createClient } from "@/lib/supabase/client";
import {
  buttonDisabledStyle,
  buttonStyle,
  errorStyle,
  inputStyle,
  labelStyle,
} from "@/components/auth/authStyles";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/dashboard`
            : undefined,
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever — no credit card. Two-step verification by email."
      footer={
        <p style={{ color: "rgba(250,250,248,0.5)", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#10B981", textDecoration: "none", fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        <button type="submit" disabled={loading} style={loading ? buttonDisabledStyle : buttonStyle}>
          {loading ? "Creating account…" : "Create account"}
        </button>

        {error && <div style={errorStyle}>{error}</div>}

        <p style={{ marginTop: "1.25rem", color: "rgba(250,250,248,0.4)", fontSize: "0.75rem", lineHeight: 1.5 }}>
          By creating an account you agree to our{" "}
          <Link href="/terms" style={{ color: "rgba(250,250,248,0.6)" }}>Terms</Link>,{" "}
          <Link href="/privacy" style={{ color: "rgba(250,250,248,0.6)" }}>Privacy Policy</Link>, and{" "}
          <Link href="/disclaimer" style={{ color: "rgba(250,250,248,0.6)" }}>AI Disclaimer</Link>.
          FlipLedger is not financial, tax, or legal advice.
        </p>
      </form>
    </AuthShell>
  );
}
