
import { Mail, MapPin, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact/ContactForm";

const Contacts = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-eac-dark border-b pb-3">
          {t('contacts.title') || "Contact Us"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Address Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-eac-primary">
              {t('contacts.information') || "Contact Information"}
            </h2>
            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-eac-light p-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-eac-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-eac-dark mb-1">
                        {t('contacts.address') || "Address"}
                      </h3>
                      <p className="text-eac-medium">
                        International non-profit association "European Arbitration Chamber"
                      </p>
                      <p className="text-eac-medium">
                        Belgium, Brussels, B-1050, Avenue Louise, 146
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-eac-light p-3 flex-shrink-0">
                      <Phone className="h-5 w-5 text-eac-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-eac-dark mb-1">
                        {t('contacts.phone') || "Phone"}
                      </h3>
                      <p className="text-eac-medium">+32 2 808 77 54</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-eac-light p-3 flex-shrink-0">
                      <Mail className="h-5 w-5 text-eac-primary" />
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
              </CardContent>
            </Card>

            {/* Map */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-eac-primary">
                {t('contacts.location') || "Our Location"}
              </h2>
              <div className="rounded-lg overflow-hidden border border-gray-200 h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.2389298944546!2d4.3695394!3d50.822968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4b5c2317f07%3A0x164fa5e119f81e8!2sAvenue%20Louise%20146%2C%201050%20Bruxelles%2C%20Belgium!5e0!3m2!1sen!2sus!4v1712173933938!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EAC Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-eac-primary">
              {t('contacts.sendMessage') || "Send Us a Message"}
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contacts;
