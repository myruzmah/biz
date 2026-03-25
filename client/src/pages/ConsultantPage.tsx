import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import PageMeta from "@/components/PageMeta";

export default function ConsultantPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F5F0" }}>
      <PageMeta
        title="Lead Consultant — HAMZURY BizDoc"
        description="Meet the HAMZURY BizDoc lead consultant — your dedicated compliance and business registration specialist in Nigeria."
        canonical="https://hamzury.com/consultant"
      />
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 px-6 md:px-12 py-4 bg-[#F8F5F0]/90 backdrop-blur-md border-b border-[#C9A97E]/20 z-50 flex justify-between items-center">
        <Link href="/bizdoc" className="text-[13px] font-semibold flex items-center gap-1 hover:text-[#C9A97E] transition-colors" style={{ color: "#2C2C2C" }}>
          <ArrowLeft size={14} /> BizDoc Consult
        </Link>
        <span className="text-[13px] font-semibold uppercase tracking-wider opacity-40" style={{ color: "#2C2C2C" }}>
          Lead Consultant
        </span>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="text-[12px] font-bold tracking-[0.3em] uppercase mb-6 block" style={{ color: "#C9A97E" }}>
            The Compliance Expert
          </span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 leading-[1.1]" style={{ color: "#0A1F1C" }}>
            Compliance done right.<br className="hidden md:block" /> From the first filing.
          </h1>
          <p className="text-lg md:text-xl font-light opacity-70 max-w-2xl leading-relaxed" style={{ color: "#2C2C2C" }}>
            BizDoc Consult is led by a compliance professional with deep experience across CAC, FIRS,
            and federal regulatory bodies. Every file we handle is managed with precision,
            accountability, and full documentation from start to finish.
          </p>
        </div>
      </section>

      {/* PROFILE */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="aspect-[3/4] rounded-2xl bg-[#0A1F1C]/5 border border-[#C9A97E]/20 flex items-center justify-center">
            <span className="text-[13px] font-semibold uppercase tracking-wider opacity-20" style={{ color: "#0A1F1C" }}>
              Photo
            </span>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-1" style={{ color: "#0A1F1C" }}>Lead Consultant</h2>
              <p className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "#C9A97E" }}>
                BizDoc Consult — HAMZURY
              </p>
            </div>
            <div className="space-y-4 text-[15px] font-light leading-relaxed opacity-70" style={{ color: "#2C2C2C" }}>
              <p>[First paragraph — professional background in Nigerian regulatory compliance, CAC/FIRS/NAFDAC experience.]</p>
              <p>[Second paragraph — specific cases or volume of filings handled, depth of expertise.]</p>
              <p>[Third paragraph — philosophy on accuracy and client transparency in compliance work.]</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: "#0A1F1C" }}>
        <div className="max-w-4xl mx-auto">
          <span className="text-[12px] font-bold tracking-[0.3em] uppercase mb-6 block" style={{ color: "#C9A97E" }}>
            Core Expertise
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "CAC Registration", body: "Business name, limited company, and NGO registrations across all states." },
              { title: "Tax Compliance", body: "FIRS filings, TIN registration, VAT setup, annual returns, and tax clearance certificates." },
              { title: "Regulatory Licensing", body: "NAFDAC, SON, NSCDC, and sector-specific federal licences handled end-to-end." },
            ].map((item) => (
              <div key={item.title} className="border border-[#C9A97E]/20 rounded-2xl p-8">
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#C9A97E" }}>{item.title}</h3>
                <p className="text-[14px] font-light leading-relaxed" style={{ color: "#F8F5F0", opacity: 0.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6" style={{ color: "#0A1F1C" }}>
            Ready to sort your compliance?
          </h2>
          <p className="text-[16px] font-light opacity-60 mb-10" style={{ color: "#2C2C2C" }}>
            Start with a free clarity session. Tell us where you are — we'll tell you exactly what needs doing.
          </p>
          <Link href="/bizdoc" className="inline-block px-8 py-4 rounded-full text-[14px] font-semibold tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "#0A1F1C", color: "#C9A97E" }}>
            Back to BizDoc
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-12 border-t border-[#0A1F1C]/10 flex justify-between items-center">
        <span className="text-[12px] font-bold tracking-wider" style={{ color: "#0A1F1C" }}>HAMZURY</span>
        <Link href="/privacy" className="text-[12px] opacity-40 hover:opacity-70 transition-opacity" style={{ color: "#2C2C2C" }}>Privacy Policy</Link>
      </footer>
    </div>
  );
}
