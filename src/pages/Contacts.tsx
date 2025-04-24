import { Mail, MapPin, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const InfoBlock = ({
                     icon,
                     title,
                     children,
                   }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-4 items-start">
    <div className="rounded-full bg-eac-light p-3 flex-shrink-0 text-eac-primary">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-eac-dark mb-1">{title}</h3>
      {children}
    </div>
  </div>
);

const Contacts = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo
        title={t("seo.contacts.title")}
        description={t("seo.contacts.description")}
        lang={language}
      />
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-eac-dark border-b pb-3">
            {t("contacts.title") || "Contact Us"}
          </h1>

          <div className="grid grid-cols-1 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-eac-primary">
                {t("contacts.information") || "Address and Email"}
              </h2>

              <div className="bg-white shadow border rounded-lg p-6 space-y-6">
                <InfoBlock
                  icon={<MapPin className="h-5 w-5" />}
                  title={t("contacts.addressTitle") || "Address"}
                >
                  <p className="text-eac-medium">{t("contacts.addressName")}</p>
                  <p className="text-eac-medium">{t("contacts.address")}</p>
                </InfoBlock>

                <InfoBlock
                  icon={<Phone className="h-5 w-5" />}
                  title={t("contacts.phone") || "Phone"}
                >
                  <p className="text-eac-medium">+32 2 808 77 54</p>
                </InfoBlock>

                <InfoBlock
                  icon={<Mail className="h-5 w-5" />}
                  title={t("contacts.email") || "Email"}
                >
                  <a
                    href="mailto:secretary@chea-taic.be"
                    className="text-eac-primary hover:underline"
                  >
                    secretary@chea-taic.be
                  </a>
                </InfoBlock>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-eac-primary">
                  {t("contacts.location") || "Our location"}
                </h2>
                <div className="rounded-lg overflow-hidden border border-gray-200 h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.0920777766437!2d4.359548512794117!3d50.82945835988326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c48b86f05b99%3A0x63064fa3e427c2ba!2sAv.%20Louise%20146%2C%201050%20Bruxelles%2C%20Belgium!5e0!3m2!1sen!2sua!4v1743694026562!5m2!1sen!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EAC Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contacts;
