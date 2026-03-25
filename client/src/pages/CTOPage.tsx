import { Link } from "wouter";
import PageMeta from "@/components/PageMeta";
import { ArrowLeft, ArrowRight, Code2, Cpu, Shield, Zap } from "lucide-react";

const NAVY = "#1E3A5F";
const GOLD = "#C9A97E";

export default function CTOPage() {
  return (
    <div style={{ background: "#F8F5F0", minHeight: "100vh" }}>
      <PageMeta
        title="CTO — HAMZURY Systemise"
        description="Meet the CTO of HAMZURY Systemize — engineering the technology backbone of the most ambitious businesses."
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/systemise" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={14} /> Systemise
            </Link>
            <span className="text-gray-200">|</span>
            <span className="font-extrabold tracking-widest text-sm" style={{ color: NAVY }}>
              HAMZURY <span className="font-normal" style={{ color: GOLD }}>SYSTEMISE</span>
            </span>
          </div>
          <Link href="/systemise">
            <span
              className="hidden sm:inline text-xs font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
            >
              Our Services
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-6" style={{ background: `${NAVY}08` }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[3px] mb-4"
            style={{ color: GOLD }}
          >
            Technology Leadership
          </p>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: NAVY }}>
            Chief Technology Officer
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Building the digital and operational systems that give HAMZURY clients a structured, scalable, and sustainable business foundation.
          </p>
        </div>
      </section>

      {/* Profile */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Photo placeholder */}
          <div className="space-y-6">
            <div
              className="aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl flex items-center justify-center"
              style={{ background: `${NAVY}0D`, border: `2px dashed ${NAVY}40` }}
            >
              <div className="text-center">
                <Cpu size={64} style={{ color: NAVY }} className="mx-auto mb-3 opacity-40" />
                <p className="text-xs text-gray-400 uppercase tracking-widest">Photo Coming Soon</p>
              </div>
            </div>

            <div
              className="rounded-xl p-5 border max-w-sm mx-auto md:mx-0"
              style={{ borderColor: `${NAVY}18`, background: `${NAVY}06` }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Quick Facts
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span style={{ color: GOLD }}>→</span>
                  <span>Leads technology and systems at HAMZURY Systemise</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: GOLD }}>→</span>
                  <span>Specialises in CRM, automation, web infrastructure</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: GOLD }}>→</span>
                  <span>Oversees client dashboard design and build-out</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: GOLD }}>→</span>
                  <span>Based in Abuja, FCT</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>
                HAMZURY Systemise CTO
              </h2>
              <p className="text-sm font-medium" style={{ color: GOLD }}>
                Chief Technology Officer, Systemise
              </p>
            </div>

            <p className="text-base text-gray-600 leading-relaxed">
              Most businesses have brilliant people running on broken systems. The bottleneck isn't effort — it's structure. The Systemize CTO role exists to solve exactly that problem: bringing enterprise-grade operational clarity to businesses that have outgrown founder-mode execution.
            </p>

            <p className="text-base text-gray-600 leading-relaxed">
              The technology work spans brand identity, website architecture, CRM implementation, social media infrastructure, and custom client dashboards. Each engagement is scoped based on where the business is bleeding — not a one-size-fits-all package.
            </p>

            <p className="text-base text-gray-600 leading-relaxed">
              The guiding principle is leverage: every system we build should make the business owner more capable, not more dependent. The goal is a client who understands their own infrastructure and can operate it confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Tech pillars */}
      <section className="py-20 px-6" style={{ background: "#F8F5F0" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: NAVY }}>
            Technology Focus Areas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code2,
                title: "Systems Architecture",
                desc: "Designing the operational backbone — CRM, workflows, and data flow — so nothing falls through the cracks.",
              },
              {
                icon: Zap,
                title: "Growth Automation",
                desc: "Replacing repetitive manual tasks with smart systems that scale as the business grows.",
              },
              {
                icon: Shield,
                title: "Digital Infrastructure",
                desc: "Fast, secure, and conversion-optimised web presence built for ambitious businesses.",
              },
              {
                icon: Cpu,
                title: "Client Dashboards",
                desc: "Custom visibility tools so business owners know their numbers, leads, and performance at a glance.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <p.icon size={28} style={{ color: NAVY }} className="mb-3" />
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>
            Ready to systemise your business?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore what HAMZURY Systemise can build for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/systemise">
              <button
                className="px-8 py-3 rounded-lg text-white font-bold flex items-center gap-2 justify-center transition-opacity hover:opacity-90"
                style={{ background: NAVY }}
              >
                View Services <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/">
              <button className="px-8 py-3 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
                Back to HAMZURY
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6" style={{ background: "#F8F5F0" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>
            <span className="font-bold" style={{ color: NAVY }}>HAMZURY SYSTEMISE</span> &copy; {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <Link href="/systemise" className="hover:text-gray-700">Services</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
