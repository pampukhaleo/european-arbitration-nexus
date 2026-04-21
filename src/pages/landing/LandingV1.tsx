// Variant A — "Court Gazette". Serif, navy + cream + ochre, asymmetric hero, § sections.
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, FileText } from "lucide-react";
import { Seo } from "@/components/Seo";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import StickyContactBar from "@/components/landing/StickyContactBar";
import {
  CONTACT,
  HERO,
  CHECKLIST,
  ADVANTAGES,
  ABOUT_PARAGRAPHS,
  FINAL_CTA,
  SEO,
} from "@/components/landing/landing-content";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const LandingV1 = () => {
  return (
    <>
      <Seo
        title={SEO.title}
        description={SEO.description}
        lang="uk"
        robots="noindex, nofollow"
        ogType="website"
      />

      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: "#F5F1E8",
          color: "#0A1F3A",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <LandingHeader />

        {/* Top gazette bar */}
        <div
          className="border-y"
          style={{ borderColor: "#0A1F3A", backgroundColor: "#0A1F3A", color: "#F5F1E8" }}
        >
          <div className="container mx-auto px-4 py-2 flex justify-between items-center text-[11px] tracking-[0.25em] uppercase font-medium">
            <span>Bruxelles · Belgique</span>
            <span style={{ color: "#B8893E" }}>Established MMVIII</span>
            <span className="hidden sm:inline">Vol. I · No. 1</span>
          </div>
        </div>

        {/* HERO — asymmetric */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-8">
              <p
                className="text-[11px] tracking-[0.3em] uppercase mb-6 pb-3 border-b"
                style={{ borderColor: "#0A1F3A", color: "#0A1F3A" }}
              >
                {HERO.kicker}
              </p>
              <h1
                className="leading-[0.95] mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Арбітражне
                <br />
                застереження
                <br />
                <span style={{ fontStyle: "italic", color: "#B8893E" }}>
                  у контракті
                </span>
              </h1>
            </div>

            <div className="md:col-span-4 md:pt-12 flex flex-col">
              <div
                className="h-px w-12 mb-6"
                style={{ backgroundColor: "#B8893E" }}
              />
              <p
                className="text-base md:text-[17px] leading-relaxed mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
              >
                {HERO.lead}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={CONTACT.telHref}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium tracking-wider uppercase transition-colors"
                  style={{ backgroundColor: "#0A1F3A", color: "#F5F1E8" }}
                >
                  <Phone className="h-4 w-4" style={{ color: "#B8893E" }} />
                  Подзвонити
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium tracking-wider uppercase border-2 transition-colors hover:bg-[#0A1F3A] hover:text-[#F5F1E8]"
                  style={{ borderColor: "#0A1F3A", color: "#0A1F3A" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium tracking-wider uppercase border-2 transition-colors hover:bg-[#0A1F3A] hover:text-[#F5F1E8]"
                  style={{ borderColor: "#0A1F3A", color: "#0A1F3A" }}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* § I. ПЕРЕВАГИ */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div
            className="border-t pt-8"
            style={{ borderColor: "#0A1F3A" }}
          >
            <div className="flex items-baseline gap-4 mb-10">
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#B8893E",
                }}
              >
                §
              </span>
              <h2
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontWeight: 600 }}
              >
                I. Переваги МКАС при ЄАП
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {ADVANTAGES.map((a, i) => (
                <li key={i} className="flex gap-6">
                  <span
                    className="text-2xl flex-shrink-0 pt-1"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#B8893E",
                      minWidth: "2.5rem",
                    }}
                  >
                    {ROMAN[i]}.
                  </span>
                  <div>
                    <h3
                      className="text-xl mb-2"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 600,
                      }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#0A1F3A99" }}>
                      {a.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* § II. ПРО МКАС */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div
            className="border-t pt-8 max-w-3xl mx-auto"
            style={{ borderColor: "#0A1F3A" }}
          >
            <div className="flex items-baseline gap-4 mb-10">
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#B8893E",
                }}
              >
                §
              </span>
              <h2
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontWeight: 600 }}
              >
                II. Про МКАС при Європейській арбітражній палаті
              </h2>
            </div>

            <div
              className="space-y-5 text-lg leading-[1.7]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <p>
                <span
                  className="float-left mr-3 leading-none"
                  style={{
                    fontSize: "4.5rem",
                    color: "#B8893E",
                    lineHeight: "0.85",
                    paddingTop: "0.5rem",
                  }}
                >
                  М
                </span>
                {ABOUT_PARAGRAPHS[0].slice(1)}
              </p>
              <p>{ABOUT_PARAGRAPHS[1]}</p>
              <p>{ABOUT_PARAGRAPHS[2]}</p>
            </div>
          </div>
        </section>

        {/* § III. ЗАСТЕРЕЖЕННЯ */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div
            className="border-t pt-8 max-w-4xl mx-auto"
            style={{ borderColor: "#0A1F3A" }}
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#B8893E",
                }}
              >
                §
              </span>
              <h2
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontWeight: 600 }}
              >
                III. Правильне застереження
              </h2>
            </div>
            <p
              className="text-2xl md:text-3xl mb-10 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Лише кілька рядків у контракті — але вони визначають долю вашого
              бізнесу у разі спору.
            </p>

            <ol className="space-y-1">
              {CHECKLIST.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-6 py-5 border-b"
                  style={{ borderColor: "#0A1F3A33" }}
                >
                  <span
                    className="text-base flex-shrink-0"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#B8893E",
                      minWidth: "3rem",
                      fontWeight: 600,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FINAL CTA — bordered like a stamp */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div
            className="max-w-3xl mx-auto p-8 md:p-14 text-center relative"
            style={{
              border: "2px solid #0A1F3A",
              backgroundColor: "#F5F1E8",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-[10px] tracking-[0.3em] uppercase"
              style={{ backgroundColor: "#F5F1E8", color: "#B8893E" }}
            >
              ★ ЗВЕРНЕННЯ ★
            </div>
            <h2
              className="text-3xl md:text-5xl mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
              }}
            >
              {FINAL_CTA.title}
            </h2>
            <p
              className="mb-8 text-base md:text-lg italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {FINAL_CTA.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a
                href={CONTACT.telHref}
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm uppercase tracking-wider"
                style={{ backgroundColor: "#0A1F3A", color: "#F5F1E8" }}
              >
                <Phone className="h-4 w-4" /> Подзвонити
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm uppercase tracking-wider border-2"
                style={{ borderColor: "#0A1F3A", color: "#0A1F3A" }}
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm uppercase tracking-wider border-2"
                style={{ borderColor: "#0A1F3A", color: "#0A1F3A" }}
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
            <Link
              to="/arbitration/clause"
              className="inline-flex items-center gap-2 text-sm underline italic"
              style={{ color: "#0A1F3A" }}
            >
              <FileText className="h-4 w-4" />
              {FINAL_CTA.link}
            </Link>
          </div>
        </section>

        <LandingFooter />
        <StickyContactBar />
        <div className="md:hidden h-14" />
      </div>
    </>
  );
};

export default LandingV1;
