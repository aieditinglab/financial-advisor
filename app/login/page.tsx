"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import PasswordInput from "@/components/auth/PasswordInput";
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
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          New here?{" "}
          <Link href="/signup" style={{ color: "var(--accent-deep)", fontWeight: 600 }}>
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
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="Your password"
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
