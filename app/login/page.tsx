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
} from "@/components/auth/authStyles";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
        return;
      }
      setError(error.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your FlipLedger dashboard."
      footer={
        <p style={{ color: "rgba(250,250,248,0.5)", fontSize: "0.875rem" }}>
          New here?{" "}
          <Link href="/signup" style={{ color: "#10B981", textDecoration: "none", fontWeight: 600 }}>
            Create an account
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        <button type="submit" disabled={loading} style={loading ? buttonDisabledStyle : buttonStyle}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {error && <div style={errorStyle}>{error}</div>}
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
