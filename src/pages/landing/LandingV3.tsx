// Variant C — "Editorial Brutalism". B/W + crimson accent, huge grotesque, mono numerals.
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, ArrowRight, FileText } from "lucide-react";
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

const BLACK = "#0A0A0A";
const WHITE = "#FFFFFF";
const ACCENT = "#C8102E";

const LandingV3 = () => {
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
          backgroundColor: WHITE,
          color: BLACK,
          fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
        }}
      >
        <LandingHeader />

        {/* HERO */}
        <section className="container mx-auto px-4 pt-12 md:pt-20 pb-12 md:pb-16">
          <div className="flex items-center gap-3 mb-10">
            <span
              className="px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{ backgroundColor: ACCENT, color: WHITE }}
            >
              Arbitration
            </span>
            <span
              className="text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{ color: BLACK }}
            >
              Brussels · 2008
            </span>
          </div>

          <h1
            className="max-w-6xl"
            style={{
              fontFamily: "'Space Grotesk', 'Inter Tight', sans-serif",
              fontSize: "clamp(2.75rem, 9vw, 7.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            Арбітражне
            <br />
            застереження.
            <br />
            <span style={{ color: ACCENT }}>Захист</span> вашого
            <br />
            бізнесу.
          </h1>

          <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <div
                className="h-[3px] w-20 mb-6"
                style={{ backgroundColor: BLACK }}
              />
              <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: `${BLACK}CC` }}>
                {HERO.lead}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-2">
              <a
                href={CONTACT.telHref}
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-90"
                style={{ backgroundColor: BLACK, color: WHITE }}
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  Подзвонити
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-black hover:text-white"
                style={{ borderColor: BLACK, color: BLACK }}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-black hover:text-white"
                style={{ borderColor: BLACK, color: BLACK }}
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  Email
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Accent bar */}
        <div className="h-3" style={{ backgroundColor: ACCENT }} />

        {/* SECTION HEADER */}
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-4">
          <div className="flex items-baseline gap-4">
            <span
              className="text-sm font-bold"
              style={{
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                color: ACCENT,
              }}
            >
              01 /
            </span>
            <h2
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: BLACK }}
            >
              Переваги
            </h2>
          </div>
          <p
            className="mt-4 max-w-3xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Шість причин обрати МКАС при Європейській арбітражній палаті.
          </p>
        </section>

        {/* ADVANTAGES grid */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: BLACK }}>
            {ADVANTAGES.map((a, i) => (
              <div
                key={i}
                className="p-7 md:p-8"
                style={{ backgroundColor: WHITE }}
              >
                <div
                  className="text-sm font-bold mb-6 pb-4 border-b-2"
                  style={{
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    color: ACCENT,
                    borderColor: BLACK,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} / 06
                </div>
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: `${BLACK}B3` }}>
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 02 — half-bleed about/quote */}
        <section className="grid md:grid-cols-2">
          <div className="container md:max-w-none mx-auto md:mx-0 md:ml-auto md:pr-12 px-4 py-16 md:py-24 md:max-w-xl">
            <div className="flex items-baseline gap-4 mb-6">
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  color: ACCENT,
                }}
              >
                02 /
              </span>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase">
                Інституція
              </h2>
            </div>
            <h3
              className="mb-8"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              МКАС при ЄАП —<br />з 2008 року в Брюсселі.
            </h3>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: `${BLACK}CC` }}>
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div
            className="px-6 md:px-12 py-16 md:py-24 flex items-center"
            style={{ backgroundColor: ACCENT, color: WHITE }}
          >
            <div className="max-w-md">
              <div
                className="text-xs font-bold tracking-[0.3em] uppercase mb-8"
                style={{ color: WHITE }}
              >
                Що дає правильне застереження
              </div>
              <ol className="space-y-6">
                {CHECKLIST.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="text-sm font-bold flex-shrink-0 pt-1"
                      style={{
                        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                        opacity: 0.7,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 500,
                        lineHeight: 1.3,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FINAL CTA — full-bleed black */}
        <section style={{ backgroundColor: BLACK, color: WHITE }}>
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="flex items-baseline gap-4 mb-8">
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  color: ACCENT,
                }}
              >
                03 /
              </span>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase">
                Звернення
              </h2>
            </div>

            <h2
              className="max-w-5xl mb-10"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
              }}
            >
              Отримайте <span style={{ color: ACCENT }}>безкоштовний</span>
              <br />
              шаблон застереження.
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mb-12" style={{ color: `${WHITE}B3` }}>
              {FINAL_CTA.text}
            </p>

            <div className="grid sm:grid-cols-3 gap-2 max-w-3xl">
              <a
                href={CONTACT.telHref}
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-90"
                style={{ backgroundColor: ACCENT, color: WHITE }}
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  Подзвонити
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: WHITE, color: WHITE }}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: WHITE, color: WHITE }}
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  Email
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <Link
              to="/arbitration/clause"
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider underline"
              style={{ color: `${WHITE}CC` }}
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

export default LandingV3;
