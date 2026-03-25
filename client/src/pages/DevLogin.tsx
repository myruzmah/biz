/**
 * DEV LOGIN — Development only. Not rendered in production.
 * Login with email + password to simulate any staff role.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Eye, EyeOff } from "lucide-react";

const TEAL  = "#0A1F1C";
const GOLD  = "#C9A97E";
const CREAM = "#FBF8EE";
const WHITE = "#FFFFFF";
const DARK  = "#1A1A1A";

// Staff credential map — email → profile
const CREDENTIAL_MAP: Record<string, {
  id: number; name: string; role: "admin" | "user";
  title: string; dept: string; redirectTo: string;
}> = {
  "founder@hamzury.com": {
    id: 1, name: "Muhammad Hamzury", role: "admin",
    title: "Founder", dept: "Founder Office",
    redirectTo: "/founder",
  },
  "ceo@hamzury.com": {
    id: 8, name: "Idris Ibrahim", role: "admin",
    title: "Chief Executive Officer", dept: "CEO Dashboard",
    redirectTo: "/hub/ceo",
  },
  "cso@hamzury.com": {
    id: 2, name: "Aisha (CSO)", role: "admin",
    title: "Chief Strategy Officer", dept: "CSO Hub",
    redirectTo: "/hub/cso",
  },
  "hr@hamzury.com": {
    id: 3, name: "Ibrahim (HR)", role: "admin",
    title: "HR Manager", dept: "HR Dashboard",
    redirectTo: "/hub/hr",
  },
  "finance@hamzury.com": {
    id: 4, name: "Fatima (Finance)", role: "admin",
    title: "Finance Lead", dept: "Finance Dashboard",
    redirectTo: "/hub/finance",
  },
  "staff01@hamzury.com": {
    id: 5, name: "Emeka (BizDoc Staff)", role: "user",
    title: "BizDoc Consultant", dept: "BizDoc",
    redirectTo: "/bizdoc/dashboard",
  },
  "skills@hamzury.com": {
    id: 6, name: "Ngozi (Skills Admin)", role: "admin",
    title: "Skills Administrator", dept: "Skills",
    redirectTo: "/skills/admin",
  },
  "bizdev@hamzury.com": {
    id: 7, name: "Kemi (BizDev Lead)", role: "admin",
    title: "Business Development Lead", dept: "BizDev",
    redirectTo: "/hub/bizdev",
  },
};

const DEV_PASSWORD = "12345678A@";

// Quick-select role cards shown below the form
const ROLE_CARDS = [
  { email: "founder@hamzury.com",  label: "Founder",  color: "#2C1A0E" },
  { email: "ceo@hamzury.com",      label: "CEO",      color: TEAL     },
  { email: "cso@hamzury.com",      label: "CSO",      color: "#1B4D3E" },
  { email: "hr@hamzury.com",       label: "HR",       color: "#2D5A27" },
  { email: "finance@hamzury.com",  label: "Finance",  color: "#7B4F00" },
  { email: "bizdev@hamzury.com",   label: "BizDev",   color: "#34A853" },
  { email: "skills@hamzury.com",   label: "Skills",   color: "#8B6914" },
  { email: "staff01@hamzury.com",  label: "Staff",    color: "#1B4D3E" },
];

export default function DevLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const utils = trpc.useUtils();

  async function loginWith(emailVal: string) {
    const pw = password || DEV_PASSWORD;
    // Validate password
    if (pw !== DEV_PASSWORD) {
      setError("Incorrect password. Use the dev password.");
      return;
    }
    const profile = CREDENTIAL_MAP[emailVal.toLowerCase()];
    if (!profile) {
      setError("Email not recognised. Check the credential list below.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: profile.name, role: profile.role, staffId: profile.id }),
      });
      if (!res.ok) throw new Error(await res.text());
      await utils.auth.me.invalidate();
      setLocation(profile.redirectTo);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/dev-logout", { method: "POST", credentials: "include" });
    await utils.auth.me.invalidate();
    setLocation("/");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: CREAM }}>
      {/* Header */}
      <div className="px-8 py-5 border-b flex items-center justify-between"
        style={{ borderColor: GOLD + "25", backgroundColor: TEAL }}>
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5" style={{ color: GOLD }}>
            Development Only
          </p>
          <h1 className="text-lg font-semibold tracking-tight" style={{ color: CREAM }}>
            HAMZURY Staff Login
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/")}
            className="text-[11px] font-bold uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: CREAM }}>
            ← Home
          </button>
          <button onClick={logout}
            className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: CREAM, borderColor: CREAM + "35" }}>
            Log Out
          </button>
        </div>
      </div>

      {/* Dev warning */}
      <div className="px-8 py-2.5 text-center text-[11px] font-semibold"
        style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
        This login page is only visible in development mode and will not appear in production.
      </div>

      <div className="flex-1 p-8 md:p-12">
        <div className="max-w-md mx-auto">

          {/* Login form */}
          <div className="rounded-2xl border p-8 mb-8" style={{ backgroundColor: WHITE, borderColor: GOLD + "25" }}>
            <h2 className="text-xl font-semibold tracking-tight mb-1" style={{ color: TEAL }}>Sign in</h2>
            <p className="text-[13px] opacity-50 mb-6" style={{ color: DARK }}>
              Use staff email + dev password
            </p>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl text-[13px] font-medium"
                style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider mb-2 block opacity-50" style={{ color: DARK }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. cso@hamzury.com"
                  className="w-full px-4 py-3.5 rounded-xl text-[14px] outline-none border transition-all"
                  style={{ borderColor: TEAL + "20", color: TEAL, backgroundColor: CREAM }}
                  onKeyDown={e => e.key === "Enter" && loginWith(email)}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider mb-2 block opacity-50" style={{ color: DARK }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="12345678A@"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl text-[14px] outline-none border transition-all"
                    style={{ borderColor: TEAL + "20", color: TEAL, backgroundColor: CREAM }}
                    onKeyDown={e => e.key === "Enter" && loginWith(email)}
                  />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-70 transition-opacity"
                    style={{ color: DARK }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                onClick={() => loginWith(email)}
                disabled={loading || !email}
                className="w-full py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all hover:scale-[1.01] disabled:opacity-40"
                style={{ backgroundColor: TEAL, color: CREAM }}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Quick-select cards */}
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-40 mb-4" style={{ color: DARK }}>
            Quick select role
          </p>
          <div className="grid grid-cols-2 gap-3">
            {ROLE_CARDS.map(r => (
              <button
                key={r.email}
                onClick={() => { setEmail(r.email); setPassword(DEV_PASSWORD); loginWith(r.email); }}
                disabled={loading}
                className="text-left p-4 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-sm disabled:opacity-40"
                style={{ borderColor: r.color + "25", backgroundColor: WHITE }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2"
                  style={{ backgroundColor: r.color }}>
                  {r.label[0]}
                </div>
                <p className="text-[13px] font-semibold mb-0.5" style={{ color: TEAL }}>{r.label}</p>
                <p className="text-[10px] opacity-40 truncate" style={{ color: DARK }}>{r.email}</p>
              </button>
            ))}
          </div>

          {/* Credential cheat sheet */}
          <div className="mt-8 p-5 rounded-xl border" style={{ borderColor: GOLD + "20", backgroundColor: WHITE }}>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-4 opacity-40" style={{ color: DARK }}>
              All credentials — Password: 12345678A@
            </p>
            <div className="space-y-2">
              {Object.entries(CREDENTIAL_MAP).map(([em, p]) => (
                <div key={em} className="flex items-center justify-between">
                  <span className="text-[12px] font-mono" style={{ color: TEAL }}>{em}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: TEAL + "08", color: TEAL }}>{p.title}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[11px] opacity-30 mt-8" style={{ color: DARK }}>
            Sessions expire in 8 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
