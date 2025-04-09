
import { Mail, MapPin, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Contacts = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-eac-dark border-b pb-3">
          {t('contacts.title') || "Contact Us"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12">
          {/* Address Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-eac-primary">
              {t('contacts.information') || "Address and Email"}
            </h2>
            <div className="bg-white shadow border rounded-lg p-6">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-eac-light p-3 flex-shrink-0 text-eac-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-eac-dark mb-1">
                      {t('contacts.addressTitle') || "Address"}
                    </h3>
                    <p className="text-eac-medium">
                      {t('contacts.addressName')}
                    </p>
                    <p className="text-eac-medium">
                      {t('contacts.address')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-eac-light p-3 flex-shrink-0 text-eac-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-eac-dark mb-1">
                      {t('contacts.phone') || "Phone"}
                    </h3>
                    <p className="text-eac-medium">+32 2 808 77 54</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-eac-light p-3 flex-shrink-0 text-eac-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-eac-dark mb-1">
                      {t('contacts.email') || "Email"}
                    </h3>
                    <a href="mailto:secretary@chea-taic.be" className="text-eac-primary hover:underline">
                      secretary@chea-taic.be
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-eac-primary">
                {t('contacts.location') || "Our location"}
              </h2>
              <div className="rounded-lg overflow-hidden border border-gray-200 h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.0920777766437!2d4.359548512794117!3d50.82945835988326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c48b86f05b99%3A0x63064fa3e427c2ba!2sAv.%20Louise%20146%2C%201050%20Bruxelles%2C%20Belgium!5e0!3m2!1sen!2sua!4v1743694026562!5m2!1sen!2sua"
                  width="100%"
                  height="100%"
                  style={ { border: 0 } }
                  allowFullScreen={ true }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EAC Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */ }
          {/*<div>*/}
          {/*  <h2 className="text-xl font-semibold mb-4 text-eac-primary">*/}
          {/*    { t('contacts.sendMessage') || "Contact Form" }*/}
          {/*  </h2>*/}
          {/*  <div className="bg-white shadow border rounded-lg p-6">*/}
          {/*    <form className="space-y-4">*/}
          {/*      <div>*/}
          {/*        <label htmlFor="name" className="block font-medium text-eac-dark mb-2">*/}
          {/*          {t('contacts.name') || "Name"}*/}
          {/*        </label>*/}
          {/*        <input */}
          {/*          type="text" */}
          {/*          id="name" */}
          {/*          placeholder={t('contacts.namePlaceholder') || "Your Name"} */}
          {/*          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eac-primary focus:border-transparent"*/}
          {/*        />*/}
          {/*      </div>*/}

          {/*      <div>*/}
          {/*        <label htmlFor="email" className="block font-medium text-eac-dark mb-2">*/}
          {/*          {t('contacts.email') || "Email"}*/}
          {/*        </label>*/}
          {/*        <input */}
          {/*          type="email" */}
          {/*          id="email" */}
          {/*          placeholder={t('contacts.emailPlaceholder') || "Your Email"} */}
          {/*          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eac-primary focus:border-transparent"*/}
          {/*        />*/}
          {/*      </div>*/}

          {/*      <div>*/}
          {/*        <label htmlFor="subject" className="block font-medium text-eac-dark mb-2">*/}
          {/*          {t('contacts.subject') || "Subject"}*/}
          {/*        </label>*/}
          {/*        <input */}
          {/*          type="text" */}
          {/*          id="subject" */}
          {/*          placeholder={t('contacts.subjectPlaceholder') || "type name of the subject"} */}
          {/*          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eac-primary focus:border-transparent"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      */}
          {/*      <div>*/}
          {/*        <label htmlFor="message" className="block font-medium text-eac-dark mb-2">*/}
          {/*          {t('contacts.message') || "Message"}*/}
          {/*        </label>*/}
          {/*        <textarea */}
          {/*          id="message" */}
          {/*          placeholder={t('contacts.messagePlaceholder') || "Type your message"} */}
          {/*          rows={4} */}
          {/*          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eac-primary focus:border-transparent"*/}
          {/*        ></textarea>*/}
          {/*      </div>*/}

          {/*      <button */}
          {/*        type="submit" */}
          {/*        className="w-full bg-eac-primary text-white py-3 px-4 rounded flex items-center justify-center hover:bg-opacity-90 transition-colors"*/}
          {/*      >*/}
          {/*        <Mail className="h-4 w-4 mr-2" />*/}
          {/*        {t('contacts.send') || "Send"}*/}
          {/*      </button>*/}
          {/*    </form>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </Layout>
  );
}

export default Contacts;
