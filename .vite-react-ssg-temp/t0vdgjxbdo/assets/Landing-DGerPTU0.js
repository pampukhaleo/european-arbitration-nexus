import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { d as Link, S as Seo } from "../main.mjs";
import { Phone, MessageCircle, ArrowRight, Mail, FileText } from "lucide-react";
import "vite-react-ssg";
import "react";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
import "dompurify";
function LandingHeader() {
  return /* @__PURE__ */ jsx("header", { className: "w-full border-b bg-white sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: `${"/"}logo.png`,
        alt: "European Arbitration Chamber",
        className: "h-10 w-auto"
      }
    ) }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "tel:+3228087754",
        className: "hidden sm:inline-flex items-center text-sm font-medium text-eac-primary hover:underline",
        children: "+32 2 808 77 54"
      }
    )
  ] }) });
}
function LandingFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "w-full border-t border-white/10 bg-eac-dark text-white/80", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-white mb-2", children: "European Arbitration Chamber" }),
        /* @__PURE__ */ jsx("p", { children: "Av. Louise 146" }),
        /* @__PURE__ */ jsx("p", { children: "1050 Bruxelles, Belgium" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-white mb-2", children: "Контакти" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Тел.:",
          " ",
          /* @__PURE__ */ jsx("a", { href: "tel:+3228087754", className: "hover:text-white", children: "+32 2 808 77 54" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Email:",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:secretary@chea-taic.be", className: "hover:text-white", children: "secretary@chea-taic.be" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-white mb-2", children: "Документи" }),
        /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "block hover:text-white", children: "Політика конфіденційності" }),
        /* @__PURE__ */ jsx(Link, { to: "/terms-of-service", className: "block hover:text-white", children: "Умови використання" }),
        /* @__PURE__ */ jsx(Link, { to: "/cookies-policy", className: "block hover:text-white", children: "Політика cookies" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4 text-xs text-white/60", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " European Arbitration Chamber. Всі права захищені."
    ] }) })
  ] });
}
function StickyContactBar() {
  return /* @__PURE__ */ jsx("div", { className: "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.08)]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "tel:+3228087754",
        className: "flex items-center justify-center gap-2 py-3 text-eac-primary font-semibold border-r",
        children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          "Подзвонити"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://wa.me/3228087754",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center justify-center gap-2 py-3 text-[#25D366] font-semibold",
        children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          "WhatsApp"
        ]
      }
    )
  ] }) });
}
const CONTACT = {
  tel: "+32 2 808 77 54",
  telHref: "tel:+3228087754",
  whatsapp: "https://wa.me/3228087754",
  email: "secretary@chea-taic.be",
  emailHref: "mailto:secretary@chea-taic.be"
};
const HERO = {
  kicker: "Міжнародний комерційний арбітраж · Брюссель",
  h1Plain: "Арбітражне застереження у контракті —",
  h1Accent: "ефективний захист",
  h1Tail: "вашого бізнесу",
  lead: "Уникайте довгих та витратних судових процесів. Включіть арбітражне застереження у свої контракти та довірте вирішення спорів МКАС при Європейській арбітражній палаті у Брюсселі."
};
const CHECKLIST = [
  "захищає ваші інтереси у разі спору",
  "забезпечує швидке та конфіденційне вирішення конфлікту",
  "гарантує визнання та виконання рішення у понад 170 країнах світу",
  "економить ваш час та ресурси"
];
const ADVANTAGES = [
  {
    title: "Незалежність та неупередженість",
    text: "Сторони самі обирають арбітрів зі списку висококваліфікованих фахівців."
  },
  {
    title: "Швидкість процесу",
    text: "Розгляд справи зазвичай триває значно менше, ніж у державних судах."
  },
  {
    title: "Конфіденційність",
    text: "Жодних публікацій, жодного розголосу деталей вашого спору."
  },
  {
    title: "Міжнародне виконання рішень",
    text: "Завдяки Нью-Йоркській конвенції 1958 року рішення МКАС виконуються у 170+ країнах."
  },
  {
    title: "Гнучкість процедури",
    text: "Сторони можуть обрати мову, місце, право та регламент розгляду."
  },
  {
    title: "Європейська якість правосуддя",
    text: "Брюссель — визнаний центр міжнародного арбітражу та юриспруденції."
  }
];
const ABOUT_PARAGRAPHS = [
  "Міжнародний комерційний арбітражний суд при Європейській арбітражній палаті (МКАС при ЄАП) — це постійно діючий незалежний арбітражний інститут, заснований у Брюсселі у 2008 році.",
  "МКАС спеціалізується на вирішенні комерційних, корпоративних, інвестиційних та інших спорів між суб'єктами господарювання з різних країн. До списку арбітрів входять понад 200 фахівців з більш ніж 30 держав — досвідчені юристи, судді у відставці та визнані експерти у галузі міжнародного права.",
  "Рішення МКАС є остаточними, обов'язковими для виконання та визнаються у понад 170 країнах світу відповідно до Нью-Йоркської конвенції 1958 року про визнання та виконання іноземних арбітражних рішень."
];
const FINAL_CTA = {
  title: "Отримайте безкоштовний шаблон арбітражного застереження",
  text: "Зв'яжіться з нами зручним способом — ми надішлемо рекомендований текст застереження та відповімо на всі ваші питання.",
  link: "Переглянути шаблон застереження на сайті"
};
const SEO = {
  title: "Арбітражне застереження у контракті — захист вашого бізнесу | МКАС при ЄАП",
  description: "Міжнародний комерційний арбітражний суд при Європейській арбітражній палаті у Брюсселі. Швидке, конфіденційне та визнане у 170+ країнах вирішення спорів."
};
const BLACK = "#0A0A0A";
const WHITE = "#FFFFFF";
const ACCENT = "#C8102E";
const LandingV3 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: SEO.title,
        description: SEO.description,
        lang: "uk",
        robots: "noindex, nofollow",
        ogType: "website"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "min-h-screen flex flex-col",
        style: {
          backgroundColor: WHITE,
          color: BLACK,
          fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif"
        },
        children: [
          /* @__PURE__ */ jsx(LandingHeader, {}),
          /* @__PURE__ */ jsx("section", { className: "container mx-auto px-4 pt-12 md:pt-20 pb-12 md:pb-16", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 gap-10 md:gap-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8 md:mb-10", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase",
                    style: { backgroundColor: ACCENT, color: WHITE },
                    children: "Arbitration"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-[11px] font-bold tracking-[0.2em] uppercase",
                    style: { color: BLACK },
                    children: "Brussels · 2008"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "h1",
                {
                  style: {
                    fontFamily: "'Space Grotesk', 'Inter Tight', sans-serif",
                    fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95
                  },
                  children: [
                    "Арбітражне застереження.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("span", { style: { color: ACCENT }, children: "Захист" }),
                    " вашого",
                    /* @__PURE__ */ jsx("br", {}),
                    "бізнесу."
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 md:pt-12 flex flex-col gap-6", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-[3px] w-20",
                  style: { backgroundColor: BLACK }
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg leading-relaxed", style: { color: `${BLACK}CC` }, children: HERO.lead }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mt-2", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: CONTACT.telHref,
                    className: "flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-90",
                    style: { backgroundColor: BLACK, color: WHITE },
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
                        "Подзвонити"
                      ] }),
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: CONTACT.whatsapp,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-black hover:text-white",
                    style: { borderColor: BLACK, color: BLACK },
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
                        "WhatsApp"
                      ] }),
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: CONTACT.emailHref,
                    className: "flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-black hover:text-white",
                    style: { borderColor: BLACK, color: BLACK },
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                        "Email"
                      ] }),
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                )
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "h-3", style: { backgroundColor: ACCENT } }),
          /* @__PURE__ */ jsxs("section", { className: "container mx-auto px-4 pt-16 md:pt-24 pb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-sm font-bold",
                  style: {
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    color: ACCENT
                  },
                  children: "01 /"
                }
              ),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "text-xs font-bold tracking-[0.3em] uppercase",
                  style: { color: BLACK },
                  children: "Переваги"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "mt-4 max-w-3xl",
                style: {
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1
                },
                children: "Шість причин обрати МКАС при Європейській арбітражній палаті."
              }
            )
          ] }),
          /* @__PURE__ */ jsx("section", { className: "container mx-auto px-4 py-12 md:py-16", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-px", style: { backgroundColor: BLACK }, children: ADVANTAGES.map((a, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-7 md:p-8",
              style: { backgroundColor: WHITE },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-[3px] w-10 mb-6",
                    style: { backgroundColor: ACCENT }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: "mb-4",
                    style: {
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15
                    },
                    children: a.title
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: { color: `${BLACK}B3` }, children: a.text })
              ]
            },
            i
          )) }) }),
          /* @__PURE__ */ jsxs("section", { className: "grid md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "container md:max-w-none mx-auto md:mx-0 md:ml-auto md:pr-12 px-4 py-16 md:py-24 md:max-w-xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 mb-6", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: {
                      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                      color: ACCENT
                    },
                    children: "02 /"
                  }
                ),
                /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold tracking-[0.3em] uppercase", children: "Інституція" })
              ] }),
              /* @__PURE__ */ jsxs(
                "h3",
                {
                  className: "mb-8",
                  style: {
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05
                  },
                  children: [
                    "МКАС при ЄАП —",
                    /* @__PURE__ */ jsx("br", {}),
                    "з 2008 року в Брюсселі."
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "space-y-4 text-base leading-relaxed", style: { color: `${BLACK}CC` }, children: ABOUT_PARAGRAPHS.map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i)) })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "px-6 md:px-12 py-16 md:py-24 flex items-center",
                style: { backgroundColor: ACCENT, color: WHITE },
                children: /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "font-bold tracking-tight mb-8 text-2xl md:text-4xl lg:text-5xl leading-[1.05]",
                      style: { color: WHITE, fontFamily: "'Space Grotesk', sans-serif" },
                      children: "Що дає правильне застереження"
                    }
                  ),
                  /* @__PURE__ */ jsx("ol", { className: "space-y-6", children: CHECKLIST.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "text-sm font-bold flex-shrink-0 pt-1",
                        style: {
                          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                          opacity: 0.7
                        },
                        children: String(i + 1).padStart(2, "0")
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          lineHeight: 1.3
                        },
                        children: item
                      }
                    )
                  ] }, i)) })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("section", { style: { backgroundColor: BLACK, color: WHITE }, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-20 md:py-32", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 mb-8", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-sm font-bold",
                  style: {
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    color: ACCENT
                  },
                  children: "03 /"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold tracking-[0.3em] uppercase", children: "Звернення" })
            ] }),
            /* @__PURE__ */ jsxs(
              "h2",
              {
                className: "max-w-5xl mb-10",
                style: {
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95
                },
                children: [
                  "Отримайте ",
                  /* @__PURE__ */ jsx("span", { style: { color: ACCENT }, children: "безкоштовний" }),
                  /* @__PURE__ */ jsx("br", {}),
                  "шаблон застереження."
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl max-w-2xl mb-12", style: { color: `${WHITE}B3` }, children: FINAL_CTA.text }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-2 max-w-3xl", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: CONTACT.telHref,
                  className: "flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-90",
                  style: { backgroundColor: ACCENT, color: WHITE },
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
                      "Подзвонити"
                    ] }),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: CONTACT.whatsapp,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-white hover:text-black",
                  style: { borderColor: WHITE, color: WHITE },
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
                      "WhatsApp"
                    ] }),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: CONTACT.emailHref,
                  className: "flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors hover:bg-white hover:text-black",
                  style: { borderColor: WHITE, color: WHITE },
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                      "Email"
                    ] }),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/arbitration/clause",
                className: "mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider underline",
                style: { color: `${WHITE}CC` },
                children: [
                  /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
                  FINAL_CTA.link
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(LandingFooter, {}),
          /* @__PURE__ */ jsx(StickyContactBar, {}),
          /* @__PURE__ */ jsx("div", { className: "md:hidden h-14" })
        ]
      }
    )
  ] });
};
export {
  LandingV3 as default
};
