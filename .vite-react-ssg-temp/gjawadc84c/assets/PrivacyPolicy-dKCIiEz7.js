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
const PrivacyPolicy = () => {
  const { language } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Privacy Policy | European Arbitration Chamber",
        description: "Learn how the European Arbitration Chamber collects, stores, uses and protects your personal information when you interact with our website and services.",
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Last update: 29/08/2019" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We take your Personal Data seriously." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "This policy tells you about how we collect, store, use and disclose your personal data when you interact with us, via email, web, or any other manner." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "What does this Privacy Policy cover?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "This Privacy Policy covers our processing of your personal data that we gather when you are accessing or using our Websites or Services (such as our discussion forum) or when you contact us in any manner. We gather various types of data, including data that identifies you as an individual (“Personal Data”) from our users, as explained in more detail below." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Information you provide to us:" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "When you use the Website: We may collect any Personal Data that you choose to send to us or provide to us, for example, on our “Contact Us” form or if you register to participate in our Forum. If you contact us through the Website, we will keep a record of our correspondence." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "When you use the Services: We receive and store data you provide directly to us. For example, when setting up as a new user, we collect Personal Data, such as name and e-mail address, to provide them with Services. The types of data we may collect directly from our customers and their users include: names, usernames, email addresses, postal addresses, phone numbers, job titles, as well as any other contact or other data provided." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Information we automatically collect:" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "When you visit the Website, we collect certain data related to your device, such as your device’s IP address, referring website, what pages your device visited, and the time that your device visited our Website." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "How do we use the data?" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "We will use the data we collect via our Websites:",
          /* @__PURE__ */ jsxs("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: [
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To administer our Website, our events and for internal operations, including troubleshooting, data analysis, testing, statistical and survey purposes;" }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To improve our Website to ensure that content is presented in the most effective manner for you and for your computer;" }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To analyze customers’ use of the Websites for trend monitoring, marketing and advertising purposes;" }) }),
            /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "As part of our efforts to keep our Website safe and secure." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "We may use the data we collect:",
          /* @__PURE__ */ jsx("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("b", { children: "To set up a user account," }) }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We may also use the data you send to us via the Website and/or Services, to communicate with you via email and, possibly, other means, regarding products, services, offers, promotions and events we think may be of interest to you or to send you our newsletter, if this is in accordance with your marketing preferences. However, you will always be able to opt-out of such communications at any time (see the “Your Choices” section below)." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Do we share and disclose data to third parties?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We do not sell your Personal Data to anyone." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Protection of ourselves and Others: We reserve the right to access, read, preserve, and disclose any data as necessary to comply with law or court order; enforce or apply our agreements with you and other agreements; or protect the rights, property, or safety of ourself, our employees, our users, or others." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "Disclosures for National Security or Law Enforcement: Under certain circumstances, we may be required to disclose your Personal Data in response to valid requests by public authorities, including to meet national security or law enforcement requirements." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Is Personal Data about you secure?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We use appropriate technical, organizational and administrative security measures to protect any information we hold in our records from loss, misuse, and unauthorized access, disclosure, alteration and destruction. Unfortunately, no company or service can guarantee complete security; unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user data at any time. Among other practices, your account is protected by a password for your privacy and security. You must prevent unauthorized access to your account and Personal Data by selecting and protecting your password appropriately and limiting access to your computer or device and browser by signing off after you have finished accessing your account." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Your Privacy Rights" }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "What choices do you have?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "You can always opt not to disclose information to us, but keep in mind some data may be needed to register with us or to take advantage of some of our website-features." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Marketing Communications" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "You can opt-out of receiving certain promotional or marketing communications from us at any time, by using the unsubscribe link in the emails communications we send or by contacting us at ",
          /* @__PURE__ */ jsx("b", { children: "secretary@chea-taic.be" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "How can you access and update your information?" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "We provide individuals with the opportunity to access, review, update, and delete any Personal Data we hold about them. You can send an email to ",
          /* @__PURE__ */ jsx("b", { children: "secretary@chea-taic.be" }),
          " for this purpose."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "If you ask us to delete your data, we will use our best efforts to promptly delete all of your Personal Data and cease any use thereof, provided that nothing in this Privacy Policy shall prevent us from using any aggregated and de-identified Personal Data that does not identify any individual. Please note that we may also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements." }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "If you are resident in the European Economic Area, please see the section below headed “Additional Information for users in the European Economic Area” for further information about your privacy rights." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Linked Websites" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "For your convenience, hyperlinks may be posted on the Website that link to other websites (the “Linked Sites”). We are not responsible for, and this Privacy Policy does not apply to, the privacy practices of any Linked Sites or of any companies that we do not own or control. Linked Sites may collect data in addition to that which we collect on the Website. We do not endorse any of these Linked Sites, the services or products described or offered on such Linked Sites, or any of the content contained on the Linked Sites. We encourage you to seek out and read the privacy policy of each Linked Site that you visit to understand how the data that is collected about you is used and protected." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Children" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We do not knowingly collect or solicit Personal Data from anyone under the age of 16. If you are under 16, please do not attempt to register or send any Personal Data about yourself to us. If we learn that we have collected Personal Data from a child under age 16, we will delete that data as quickly as possible." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "Will we change this Privacy Policy?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: "We are constantly trying to improve our Website and Services, so we may need to change this Privacy Policy from time to time as well. We will alert you to material changes by placing a notice on our Website and/or by sending you an email (if you have registered your e-mail details with us) when we are required to do so by applicable law. You can see when this Privacy Policy was last updated by checking the date at the top of this page. You are responsible for periodically reviewing this Privacy Policy." }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: "If you have questions about this policy" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          "If you have any questions or concerns regarding our privacy policies, please send us a detailed message to ",
          /* @__PURE__ */ jsx("b", { children: "secretary@chea-taic.be" }),
          " and we will try to resolve your concerns."
        ] })
      ] })
    ] }) })
  ] });
};
export {
  PrivacyPolicy as default
};
