// Variant B — "Brussels Charter". Symmetric, bordeaux + cream + graphite, monumental stats.
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, FileText } from "lucide-react";
import { Seo } from "@/components/Seo";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import StickyContactBar from "@/components/landing/StickyContactBar";
import {
  CONTACT,
  HERO,
  FACTS,
  ADVANTAGES,
  ABOUT_PARAGRAPHS,
  FINAL_CTA,
  SEO,
} from "@/components/landing/landing-content";

const BORDEAUX = "#7A1F2C";
const CREAM = "#FAF7F2";
const GRAPHITE = "#1F2024";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const LandingV2 = () => {
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
          backgroundColor: CREAM,
          color: GRAPHITE,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <LandingHeader />

        {/* HERO — symmetric, centered */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          {/* Monogram */}
          <div className="flex justify-center mb-10">
            <div
              className="w-16 h-16 flex items-center justify-center border-2 rotate-45"
              style={{ borderColor: BORDEAUX }}
            >
              <span
                className="-rotate-45 text-2xl"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: BORDEAUX,
                  fontWeight: 600,
                }}
              >
                ÉAC
              </span>
            </div>
          </div>

          <p
            className="text-[11px] tracking-[0.4em] uppercase mb-6"
            style={{ color: BORDEAUX, fontWeight: 500 }}
          >
            {HERO.kicker}
          </p>

          <h1
            className="mx-auto max-w-5xl mb-8 uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)",
              fontWeight: 500,
              letterSpacing: "0.02em",
              lineHeight: 1.05,
            }}
          >
            Арбітражне застереження —{" "}
            <span style={{ fontStyle: "italic", color: BORDEAUX }}>
              ефективний захист
            </span>{" "}
            вашого бізнесу
          </h1>

          {/* Bordeaux line */}
          <div className="flex justify-center mb-8">
            <div className="h-px w-24" style={{ backgroundColor: BORDEAUX }} />
          </div>

          <p
            className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              color: GRAPHITE,
            }}
          >
            {HERO.lead}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.telHref}
              className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm uppercase tracking-[0.15em] border-2 transition-colors hover:opacity-90"
              style={{ borderColor: BORDEAUX, backgroundColor: BORDEAUX, color: CREAM }}
            >
              <Phone className="h-4 w-4" />
              Подзвонити
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm uppercase tracking-[0.15em] border-2 transition-colors"
              style={{ borderColor: BORDEAUX, color: BORDEAUX }}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm uppercase tracking-[0.15em] border-2 transition-colors"
              style={{ borderColor: BORDEAUX, color: BORDEAUX }}
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </section>

        {/* Epigraph quote */}
        <section
          className="border-y"
          style={{ borderColor: `${BORDEAUX}33`, backgroundColor: "white" }}
        >
          <div className="container mx-auto px-4 py-14 md:py-20 max-w-4xl text-center">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "5rem",
                color: BORDEAUX,
                lineHeight: 1,
                display: "block",
              }}
            >
              "
            </span>
            <p
              className="text-2xl md:text-4xl leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Лише кілька рядків у контракті — але вони визначають долю вашого
              бізнесу у разі спору.
            </p>
          </div>
        </section>

        {/* MONUMENTAL FACTS */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {FACTS.map((f, i) => (
              <div
                key={i}
                className={`text-center px-4 py-6 ${
                  i < FACTS.length - 1 ? "md:border-r" : ""
                } ${i === 1 ? "border-r md:border-r" : ""} ${
                  i < 2 ? "border-b md:border-b-0" : ""
                } ${i === 0 ? "border-r" : ""}`}
                style={{ borderColor: `${BORDEAUX}33` }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    fontWeight: 500,
                    color: BORDEAUX,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {f.value}
                </div>
                <div
                  className="mt-3 text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: GRAPHITE, fontWeight: 500 }}
                >
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADVANTAGES — 3x2 grid, no boxes */}
        <section style={{ backgroundColor: "white" }}>
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-14">
              <p
                className="text-[11px] tracking-[0.4em] uppercase mb-3"
                style={{ color: BORDEAUX }}
              >
                Переваги
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 500,
                }}
              >
                Чому МКАС при ЄАП
              </h2>
            </div>

            <div className="grid md:grid-cols-3 max-w-6xl mx-auto">
              {ADVANTAGES.map((a, i) => (
                <div
                  key={i}
                  className="px-6 py-8 border-t"
                  style={{
                    borderColor: `${BORDEAUX}33`,
                    borderRight: i % 3 !== 2 ? `1px solid ${BORDEAUX}33` : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: BORDEAUX,
                      fontSize: "1.75rem",
                      fontStyle: "italic",
                    }}
                  >
                    {ROMAN[i]}
                  </span>
                  <h3
                    className="mt-3 mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: `${GRAPHITE}CC` }}>
                    {a.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT — two-column newspaper */}
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
          <div className="text-center mb-12">
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-3"
              style={{ color: BORDEAUX }}
            >
              Про інституцію
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 500,
              }}
            >
              МКАС при Європейській арбітражній палаті
            </h2>
          </div>
          <div
            className="md:columns-2 md:gap-10 text-base md:text-lg leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: GRAPHITE,
            }}
          >
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <p key={i} className="mb-5 break-inside-avoid">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* FINAL CTA — dark ceremonial */}
        <section style={{ backgroundColor: GRAPHITE, color: CREAM }}>
          <div className="container mx-auto px-4 py-20 md:py-28 max-w-3xl text-center">
            <div className="flex justify-center mb-8">
              <div className="h-px w-16" style={{ backgroundColor: BORDEAUX }} />
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              {FINAL_CTA.title}
            </h2>
            <p
              className="text-lg md:text-xl mb-10 italic"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: `${CREAM}CC`,
              }}
            >
              {FINAL_CTA.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href={CONTACT.telHref}
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm uppercase tracking-[0.15em]"
                style={{ backgroundColor: BORDEAUX, color: CREAM }}
              >
                <Phone className="h-4 w-4" /> Подзвонити
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm uppercase tracking-[0.15em] border-2"
                style={{ borderColor: CREAM, color: CREAM }}
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm uppercase tracking-[0.15em] border-2"
                style={{ borderColor: CREAM, color: CREAM }}
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
            <Link
              to="/arbitration/clause"
              className="inline-flex items-center gap-2 text-sm underline italic"
              style={{ color: `${CREAM}CC` }}
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

export default LandingV2;
