import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Target, Rocket, Globe } from "lucide-react";
import PageMeta from "@/components/PageMeta";

// ─── Palette ──────────────────────────────────────────────────────────────────
const WHITE = "#FFFFFF";
const MILK  = "#FBF8EE";
const TEAL  = "#0A1F1C";
const GOLD  = "#C9A97E";
const DARK  = "#2C2C2C";

// ─── Social links ─────────────────────────────────────────────────────────────
const SOCIALS = [
  { name: "Instagram",   href: "https://instagram.com/hamzury",          icon: "IG" },
  { name: "Twitter / X", href: "https://x.com/hamzury",                  icon: "𝕏"  },
  { name: "LinkedIn",    href: "https://linkedin.com/company/hamzury",   icon: "in" },
  { name: "Facebook",    href: "https://facebook.com/hamzury",           icon: "f"  },
  { name: "WhatsApp",    href: "https://wa.me/2348034620520",             icon: "W"  },
];

// ─── Founder Login Card ────────────────────────────────────────────────────────
function FounderLoginCard() {
  const [pw, setPw]           = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [, setLocation]       = useLocation();
  const DEV_PW = "12345678A@";

  async function login() {
    if (!pw) { setError("Enter the password."); return; }
    if (pw !== DEV_PW) { setError("Incorrect password."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: "Muhammad Hamzury", role: "admin", staffId: 1 }),
      });
      if (!res.ok) throw new Error(await res.text());
      setLocation("/founder/dashboard");
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-2xl border p-8"
      style={{ borderColor: `${TEAL}15`, backgroundColor: MILK }}
    >
      <p
        className="text-[10px] font-medium tracking-[0.3em] uppercase mb-1"
        style={{ color: GOLD }}
      >
        Founder Access
      </p>
      <h3
        className="text-lg font-medium tracking-tight mb-6"
        style={{ color: TEAL }}
      >
        Enter your workspace
      </h3>
      {error && (
        <p className="text-xs mb-4 p-3 rounded-xl" style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}>
          {error}
        </p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        onKeyDown={e => e.key === "Enter" && login()}
        className="w-full px-4 py-3 rounded-xl text-sm border outline-none mb-4"
        style={{ borderColor: `${TEAL}15`, backgroundColor: WHITE, color: TEAL }}
      />
      <button
        onClick={login}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: TEAL, color: GOLD }}
      >
        {loading ? "Entering…" : "Enter Workspace"}
      </button>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WHITE }}>
      <PageMeta
        title="Our Founder — HAMZURY"
        description="The person behind HAMZURY — built to structure Nigerian businesses that last."
      />

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b flex items-center justify-between px-6 md:px-12 h-16"
        style={{ backgroundColor: WHITE, borderColor: `${TEAL}12` }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
          style={{ color: TEAL }}
        >
          <ArrowLeft size={14} /> HAMZURY
        </Link>
        <span
          className="text-xs font-normal tracking-widest uppercase opacity-40"
          style={{ color: TEAL }}
        >
          Founder
        </span>
      </nav>

      {/* ── Section 1: Hero ─────────────────────────────────────────────────── */}
      <section
        className="pt-16 min-h-screen flex flex-col justify-center"
        style={{ backgroundColor: WHITE }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-32 flex flex-col md:flex-row items-center gap-14">
          {/* Text */}
          <div className="flex-1">
            <span
              className="text-[10px] font-medium tracking-[0.35em] uppercase block mb-6"
              style={{ color: GOLD }}
            >
              Hamzury Innovation Hub
            </span>

            <h1
              className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.08] mb-4"
              style={{ color: TEAL }}
            >
              Muhammad Hamzury
            </h1>

            <p
              className="text-base font-normal tracking-[0.15em] uppercase mb-8"
              style={{ color: DARK, opacity: 0.5 }}
            >
              Founder &amp; CEO
            </p>

            {/* Gold rule */}
            <div
              className="mb-8"
              style={{ width: 56, height: 2, backgroundColor: GOLD, borderRadius: 2 }}
            />

            <p
              className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
              style={{ color: DARK }}
            >
              Building Nigeria's premier business infrastructure —{" "}
              <span style={{ color: TEAL, fontWeight: 500 }}>
                one company at a time.
              </span>
            </p>
          </div>

          {/* Founder initial avatar */}
          <div className="shrink-0">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-semibold select-none"
              style={{
                border: `3px solid ${GOLD}`,
                backgroundColor: MILK,
                color: TEAL,
                letterSpacing: "0.05em",
              }}
            >
              M
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Where We Are Today ───────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: MILK }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Progress
          </p>
          <h2
            className="text-3xl md:text-4xl font-medium tracking-tight mb-12"
            style={{ color: TEAL }}
          >
            Where We Are Today
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { stat: "250+",    label: "Businesses Supported"        },
              { stat: "3",       label: "Active Departments"          },
              { stat: "28",      label: "RIDI Communities"            },
              { stat: "₦50M+",   label: "Revenue Facilitated"        },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="rounded-2xl p-8 flex flex-col gap-2"
                style={{
                  backgroundColor: WHITE,
                  boxShadow: "0 2px 16px rgba(10,31,28,0.07)",
                }}
              >
                <span
                  className="text-4xl font-semibold tracking-tight"
                  style={{ color: TEAL }}
                >
                  {stat}
                </span>
                <span
                  className="text-sm font-light leading-snug"
                  style={{ color: DARK, opacity: 0.65 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: The Road Ahead ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: WHITE }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Vision
          </p>
          <h2
            className="text-3xl md:text-4xl font-medium tracking-tight mb-12"
            style={{ color: TEAL }}
          >
            The Road Ahead
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Target,
                title: "Nationwide Reach",
                body: "Expand to all 6 geopolitical zones by 2027, establishing HAMZURY as the default business infrastructure partner across Nigeria.",
              },
              {
                Icon: Rocket,
                title: "Skills at Scale",
                body: "Launch the Hamzury Skills national bootcamp network — bringing structured, practical training to every state.",
              },
              {
                Icon: Globe,
                title: "5,000 Businesses Formalised",
                body: "Register and fully document 5,000 Nigerian businesses through BizDoc Consult — from sole traders to enterprises.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border"
                style={{ borderColor: `${TEAL}12`, backgroundColor: MILK }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${TEAL}0D` }}
                >
                  <Icon size={18} style={{ color: TEAL }} />
                </div>
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: TEAL }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: DARK, opacity: 0.65 }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What HAMZURY Stands For (Core Beliefs) ──────────────────────────── */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: MILK }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Core Beliefs
          </p>
          <h2
            className="text-3xl md:text-4xl font-medium tracking-tight mb-12"
            style={{ color: TEAL }}
          >
            What HAMZURY stands for
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Structure",
                body: "Every business needs a foundation. We build it — quietly, completely, and to last.",
              },
              {
                title: "Precision",
                body: "No shortcuts. The work is done correctly, or not at all. We hold the line on quality.",
              },
              {
                title: "Continuity",
                body: "We don't just file paperwork. We build systems that outlive the filing.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: WHITE, borderColor: `${TEAL}10` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm mb-6"
                  style={{ backgroundColor: TEAL, color: GOLD }}
                >
                  {title[0]}
                </div>
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: TEAL }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: DARK, opacity: 0.65 }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Each Department Exists ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: WHITE }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            The Origin
          </p>
          <h2
            className="text-3xl font-medium tracking-tight mb-14"
            style={{ color: TEAL }}
          >
            Why each department exists.
          </h2>
          <div className="space-y-12">
            {[
              {
                dept: "RIDI",
                why: "Everyone needs skills. Not as a luxury — as a necessity.",
                body: "I looked around and saw talented people held back not by lack of ambition, but by lack of access to practical knowledge. RIDI was built to close that gap. Skills should not be gatekept by geography or income. Everyone deserves the tools to build something real.",
              },
              {
                dept: "HAMZURY SKILLS",
                why: "The innovation hub exists to make talent and let talent benefit from itself.",
                body: "Skills without opportunity is frustrating. The Skills department is built to do both — develop capability and create pathways for that capability to generate real economic return. We train people and we place them, partner them, and back them.",
              },
              {
                dept: "SYSTEMISE",
                why: "Structure and visibility are what kill good ideas.",
                body: "I have watched brilliant businesses struggle not because of bad products, but because of invisible systems. Founders could not see their numbers. Their teams could not follow a structure. Their brand said nothing. Systemise exists to fix the invisible architecture that good businesses need.",
              },
              {
                dept: "BIZDOC",
                why: "Compliance is not a chore. It is the foundation of trust.",
                body: "A business that is not legally compliant is operating on borrowed time. BizDoc was built so that Nigerian founders could stop fearing regulators and start building with confidence. Being safe and compliant should be the starting point — not an afterthought.",
              },
            ].map(item => (
              <div
                key={item.dept}
                className="flex gap-8 items-start border-b pb-10 last:border-0 last:pb-0"
                style={{ borderColor: `${TEAL}10` }}
              >
                <div className="shrink-0 w-28">
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase"
                    style={{ color: GOLD }}
                  >
                    {item.dept}
                  </span>
                </div>
                <div>
                  <p
                    className="text-base font-normal leading-snug mb-3"
                    style={{ color: TEAL }}
                  >
                    "{item.why}"
                  </p>
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: DARK, opacity: 0.6 }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Quote ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: MILK }}>
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="text-5xl font-serif mb-6"
            style={{ color: GOLD, opacity: 0.5 }}
          >
            "
          </div>
          <blockquote
            className="text-2xl md:text-3xl font-light leading-[1.55] mb-8"
            style={{ color: TEAL }}
          >
            Nigerian businesses don't fail for lack of ambition. They fail for lack of structure. We're here to change that.
          </blockquote>
          <p
            className="text-[10px] font-normal tracking-widest uppercase"
            style={{ color: GOLD }}
          >
            — Muhammad Hamzury, Founder
          </p>
        </div>
      </section>

      {/* ── Section 4: Connect / Social ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: WHITE }}>
        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Follow Along
          </p>
          <h2
            className="text-3xl font-medium tracking-tight mb-10"
            style={{ color: TEAL }}
          >
            Connect
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {SOCIALS.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all hover:scale-110"
                style={{ backgroundColor: TEAL, color: GOLD }}
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Founder Access ────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12" style={{ backgroundColor: MILK }}>
        <div className="max-w-sm mx-auto">
          <FounderLoginCard />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer
        className="py-10 px-6 md:px-12 border-t text-sm"
        style={{ backgroundColor: WHITE, borderColor: `${TEAL}10`, color: `${DARK}99` }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="font-medium tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: TEAL }}
          >
            HAMZURY
          </Link>
          <div className="flex gap-6 text-xs">
            {[
              { href: "/bizdoc",    label: "BizDoc"    },
              { href: "/systemise", label: "Systemise" },
              { href: "/skills",    label: "Skills"    },
              { href: "/privacy",   label: "Privacy"   },
              { href: "/terms",     label: "Terms"     },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-opacity hover:opacity-100"
                style={{ color: `${TEAL}60` }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
