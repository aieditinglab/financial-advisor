"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!accepted) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpErr } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpErr) {
      setLoading(false);
      setError(signUpErr.message);
      return;
    }

    // If email confirmation is OFF in Supabase, signUp returns a session.
    if (data.session) {
      // mark terms acceptance
      try {
        await supabase
          .from("profiles")
          .update({ accepted_terms_at: new Date().toISOString() })
          .eq("id", data.session.user.id);
      } catch {
        // non-blocking
      }
      router.push("/dashboard?welcome=1");
      router.refresh();
      return;
    }

    // Confirmation still on — try signing in directly (works once they confirm).
    const { data: signedIn, error: signInErr } =
      await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInErr || !signedIn.session) {
      setInfo(
        "Account created. Confirm your email to finish — or ask the admin to disable email confirmation in Supabase to skip this step.",
      );
      return;
    }
    router.push("/dashboard?welcome=1");
    router.refresh();
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever. No credit card. Straight into the app."
      footer={
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent-deep)", fontWeight: 600 }}>
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
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
        <div style={{ marginBottom: "1.1rem" }}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.6rem",
            marginBottom: "1.25rem",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "0.83rem",
            lineHeight: 1.55,
          }}
        >
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            style={{
              width: "16px",
              height: "16px",
              marginTop: "2px",
              accentColor: "var(--accent)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" style={{ color: "var(--accent-deep)", fontWeight: 500 }}>
              Terms of Service
            </Link>
            ,{" "}
            <Link href="/privacy" style={{ color: "var(--accent-deep)", fontWeight: 500 }}>
              Privacy Policy
            </Link>
            , and{" "}
            <Link href="/disclaimer" style={{ color: "var(--accent-deep)", fontWeight: 500 }}>
              AI Disclaimer
            </Link>
            . I understand FlipLedger is not financial, tax, or legal advice.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !accepted}
          style={loading || !accepted ? buttonDisabledStyle : buttonStyle}
        >
          {loading ? "Creating your account…" : "Create account"}
        </button>

        {error && <div style={errorStyle}>{error}</div>}
        {info && (
          <div
            style={{
              marginTop: "0.85rem",
              padding: "0.65rem 0.85rem",
              background: "var(--accent-soft)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: "8px",
              color: "var(--accent-deep)",
              fontSize: "0.85rem",
              lineHeight: 1.55,
            }}
          >
            {info}
          </div>
        )}
      </form>
    </AuthShell>
  );
}
