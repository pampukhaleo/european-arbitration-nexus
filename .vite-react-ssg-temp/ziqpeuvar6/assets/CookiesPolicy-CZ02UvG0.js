import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useLanguage, S as Seo, L as Layout } from "../main.mjs";
import "vite-react-ssg";
import "react";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
const CookiesPolicy = () => {
  const { language } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Cookies Policy | European Arbitration Chamber",
        description: "Understand how the European Arbitration Chamber uses cookies and similar technologies on its website, your choices and how to manage cookie preferences.",
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase", children: "Cookies Policy" }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Last update: 29/08/2019" }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Introduction" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Our entity (“us”, “we”, or “our”) uses cookies on the its website (the “Service”). By using the Service, you consent to the use of cookies." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "This Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "What are cookies?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Cookies can be either “persistent” or “session” cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "How we use cookies?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "When you use and access the Service, we may place a number of cookies files in your web browser." }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "We use cookies for the following purposes:",
          /* @__PURE__ */ jsxs("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: [
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To enable certain functions of the Service" }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To provide analytics (Google Analytics)" }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To enable certain functions of the Service" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "We use both persistent and session cookies on the Service and we use different types of cookies to run the Service:",
          /* @__PURE__ */ jsxs("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: [
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "Essential cookies. We may use essential cookies to authenticate users and prevent fraudulent use of user accounts." }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "Preferences cookies. We may use preferences cookies to remember information that changes the way the Service behaves or looks, such as the “remember me” functionality of a registered user or a user’s language preference." }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "Analytics cookies. We may use analytics cookies to track information on how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "What are your choices regarding cookies?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "If you would like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser." }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.",
          /* @__PURE__ */ jsxs("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: [
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsxs("b", { children: [
              "For the Chrome web browser, please visit this page from Google: ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://support.google.com/chrome/answer/95647",
                  children: "https://support.google.com/chrome/answer/95647"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsxs("b", { children: [
              "For the Microsoft Edge web browser, please visit this page from Microsoft: ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d",
                  children: "https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsxs("b", { children: [
              "For the Firefox web browser, please visit this page from Mozilla: ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox",
                  children: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsxs("b", { children: [
              "For the Safari web browser, please visit this page from Apple: ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
                  children: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "For any other web browser, please visit your web browser's official web pages." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Will we change this Privacy Policy?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We are constantly trying to improve our Website and Services, so we may need to change this Privacy Policy from time to time as well. We will alert you to material changes by placing a notice on our Website and/or by sending you an email (if you have registered your e-mail details with us) when we are required to do so by applicable law. You can see when this Privacy Policy was last updated by checking the date at the top of this page. You are responsible for periodically reviewing this Privacy Policy." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Where can you find more information about cookies?" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "You can learn more about cookies at the following third-party websites:",
          /* @__PURE__ */ jsxs("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: [
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsxs("b", { children: [
              "All About Cookies: ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://allaboutcookies.org/",
                  children: "https://allaboutcookies.org/"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsxs("b", { children: [
              "Network Advertising Initiative: ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://thenai.org/",
                  children: "https://thenai.org/"
                }
              )
            ] }) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  CookiesPolicy as default
};
