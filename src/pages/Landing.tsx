import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  Globe,
  Lock,
  Users,
  Award,
  FileText,
  Scale,
  Shield,
  Clock,
  Gavel,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo.tsx";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import StickyContactBar from "@/components/landing/StickyContactBar";

const TEL = "tel:+3228087754";
const WHATSAPP = "https://wa.me/3228087754";
const EMAIL = "mailto:secretary@chea-taic.be";

const CtaButtons = ({ variant = "default" }: { variant?: "default" | "light" }) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
    <Button
      asChild
      size="lg"
      className="bg-eac-primary hover:bg-eac-primary/90 text-white font-semibold"
    >
      {/* TODO: pixel — track CTA click */}
      <a href={TEL}>
        <Phone className="mr-2 h-5 w-5" />
        Подзвонити
      </a>
    </Button>
    <Button
      asChild
      size="lg"
      className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold"
    >
      {/* TODO: pixel — track CTA click */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-5 w-5" />
        WhatsApp
      </a>
    </Button>
    <Button
      asChild
      size="lg"
      variant={variant === "light" ? "outline" : "outline"}
      className={
        variant === "light"
          ? "bg-white/10 border-white text-white hover:bg-white hover:text-eac-dark font-semibold"
          : "border-eac-dark text-eac-dark hover:bg-eac-dark hover:text-white font-semibold"
      }
    >
      {/* TODO: pixel — track CTA click */}
      <a href={EMAIL}>
        <Mail className="mr-2 h-5 w-5" />
        Написати email
      </a>
    </Button>
  </div>
);

const Landing = () => {
  const checklist = [
    "захищає ваші інтереси у разі спору",
    "забезпечує швидке та конфіденційне вирішення конфлікту",
    "гарантує визнання та виконання рішення у понад 170 країнах світу",
    "економить ваш час та ресурси",
  ];

  const features = [
    {
      icon: Globe,
      title: "Нейтральна юрисдикція",
      text: "Брюссель — серце європейського права та міжнародного бізнесу.",
    },
    {
      icon: Lock,
      title: "Конфіденційність",
      text: "Усі засідання та матеріали справ є закритими.",
    },
    {
      icon: Users,
      title: "Арбітри з 30 країн",
      text: "Досвідчені фахівці у сфері міжнародного комерційного права.",
    },
    {
      icon: Award,
      title: "Міжнародне визнання",
      text: "Рішення виконуються у 170+ країнах за Нью-Йоркською конвенцією 1958 року.",
    },
  ];

  const advantages = [
    {
      icon: Scale,
      title: "Незалежність та неупередженість",
      text: "Сторони самі обирають арбітрів зі списку висококваліфікованих фахівців.",
    },
    {
      icon: Clock,
      title: "Швидкість процесу",
      text: "Розгляд справи зазвичай триває значно менше, ніж у державних судах.",
    },
    {
      icon: Shield,
      title: "Конфіденційність",
      text: "Жодних публікацій, жодного розголосу деталей вашого спору.",
    },
    {
      icon: Globe,
      title: "Міжнародне виконання рішень",
      text: "Завдяки Нью-Йоркській конвенції 1958 року рішення МКАС виконуються у 170+ країнах.",
    },
    {
      icon: Languages,
      title: "Гнучкість процедури",
      text: "Сторони можуть обрати мову, місце, право та регламент розгляду.",
    },
    {
      icon: Gavel,
      title: "Європейська якість правосуддя",
      text: "Брюссель — визнаний центр міжнародного арбітражу та юриспруденції.",
    },
  ];

  return (
    <>
      <Seo
        title="Арбітражне застереження у контракті — захист вашого бізнесу | МКАС при ЄАП"
        description="Міжнародний комерційний арбітражний суд при Європейській арбітражній палаті у Брюсселі. Швидке, конфіденційне та визнане у 170+ країнах вирішення спорів."
        lang="uk"
        robots="noindex, nofollow"
        ogType="website"
      />

      <div className="min-h-screen flex flex-col bg-white text-eac-dark">
        <LandingHeader />

        {/* HERO */}
        <section className="bg-gradient-to-br from-eac-light via-white to-eac-light">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl">
              <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-eac-primary/10 text-eac-primary">
                Міжнародний комерційний арбітраж · Брюссель
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                Арбітражне застереження у контракті —{" "}
                <span className="text-eac-primary">ефективний захист</span> вашого бізнесу
              </h1>
              <p className="text-lg md:text-xl text-eac-medium mb-8 leading-relaxed">
                Уникайте довгих та витратних судових процесів. Включіть арбітражне
                застереження у свої контракти та довірте вирішення спорів МКАС при
                Європейській арбітражній палаті у Брюсселі.
              </p>
              <CtaButtons />
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Правильно сформульоване застереження…
              </h2>
              <p className="text-eac-medium">
                Лише кілька рядків у контракті, але вони визначають долю вашого бізнесу
                у разі спору.
              </p>
            </div>
            <ul className="max-w-2xl mx-auto space-y-3">
              {checklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-eac-light/50 rounded-lg p-4"
                >
                  <CheckCircle2 className="h-6 w-6 text-eac-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FEATURES — 4 cards */}
        <section className="py-12 md:py-16 bg-eac-light/40">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              МКАС при ЄАП — це:
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm border border-eac-light hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-eac-primary/10 flex items-center justify-center mb-4 text-eac-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-eac-medium leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT MKAS */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Про МКАС при Європейській арбітражній палаті
            </h2>
            <div className="space-y-4 text-base md:text-lg text-eac-dark/90 leading-relaxed">
              <p>
                Міжнародний комерційний арбітражний суд при Європейській арбітражній
                палаті (МКАС при ЄАП) — це постійно діючий незалежний арбітражний
                інститут, заснований у Брюсселі у 2008 році.
              </p>
              <p>
                МКАС спеціалізується на вирішенні комерційних, корпоративних,
                інвестиційних та інших спорів між суб’єктами господарювання з різних
                країн. До списку арбітрів входять понад 200 фахівців з більш ніж 30
                держав — досвідчені юристи, судді у відставці та визнані експерти у
                галузі міжнародного права.
              </p>
              <p>
                Рішення МКАС є остаточними, обов’язковими для виконання та визнаються
                у понад 170 країнах світу відповідно до Нью-Йоркської конвенції 1958
                року про визнання та виконання іноземних арбітражних рішень.
              </p>
            </div>
          </div>
        </section>

        {/* ADVANTAGES — 6 items */}
        <section className="py-12 md:py-16 bg-eac-light/40">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Переваги МКАС при ЄАП
            </h2>
            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {advantages.map((a, i) => (
                <div
                  key={i}
                  className="flex gap-4 bg-white rounded-xl p-6 border border-eac-light"
                >
                  <div className="w-11 h-11 rounded-full bg-eac-primary/10 flex items-center justify-center flex-shrink-0 text-eac-primary">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{a.title}</h3>
                    <p className="text-sm text-eac-medium leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-14 md:py-20 bg-eac-dark text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Отримайте безкоштовний шаблон арбітражного застереження
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Зв’яжіться з нами зручним способом — ми надішлемо рекомендований текст
              застереження та відповімо на всі ваші питання.
            </p>
            <div className="flex justify-center mb-8">
              <CtaButtons variant="light" />
            </div>
            <Button
              asChild
              variant="link"
              className="text-white underline hover:text-eac-primary"
            >
              <Link to="/arbitration/clause">
                <FileText className="mr-2 h-4 w-4" />
                Переглянути шаблон застереження на сайті
              </Link>
            </Button>
          </div>
        </section>

        <LandingFooter />
        <StickyContactBar />
        {/* spacer so sticky bar doesn't cover footer content on mobile */}
        <div className="md:hidden h-14" />
      </div>
    </>
  );
};

export default Landing;
