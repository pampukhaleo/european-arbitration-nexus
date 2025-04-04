
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import NewsItem from "@/components/news/NewsItem";
import { useLanguage } from "@/contexts/LanguageContext";

// This data should be moved to a separate file or fetched from an API in a real application
const newsItems = [
  {
    id: "1",
    title: "Beware of Fraud and Scams!",
    date: "Feb 26 2025",
    description: "The Secretariat of the European Arbitration Chamber (EAC) has been made aware of fraudulent letters and documents falsely stating to be issued by or associated with the EAC or/and International Commercial Arbitration Court under the EAC (ICAC).\n\nThese scams, which may attempt to obtain money and/or personal details from recipients, are fraudulent.\n\nThe Secretariat of the EAC warns the public about these fraudulent activities and urges vigilance against various fraud schemes misusing name of the EAC.\n\nWe strongly advise recipients of such fraudulent communications to exercise extreme caution. Transferring money or personal information to scammers can result in financial loss or identity theft.\n\nIn the event of receiving suspicious letters containing statements about the existence of arbitration proceedings and allegedly coming from the EAC or the ICAC, we recommend that you immediately contact the EAC Secretariat to verify the authenticity of the information by this email: secretary@chea-taic.be\n\nThe European Arbitration Chamber has reported these fraudulent activities to the relevant law enforcement authorities, including the criminal police."
  },
  {
    id: "2",
    title: "16th Anniversary of the European Arbitration Chamber!",
    date: "Dec 12 2024",
    description: "Today marks 16 incredible years of the European Arbitration Chamber!\n\nSince 2008, the EAC has been committed to providing fair, impartial, and efficient dispute resolution, helping businesses across the globe navigate complex legal challenges.\n\nThis milestone reflects the trust of our members and partners, the unwavering dedication of our team, and the invaluable support of the international arbitration community.\n\nOn behalf of the EAC Board, we extend our heartfelt gratitude to every member, colleague, and partner for your collaboration. Together, we've achieved so much - and we look forward to continuing this journey with you.\n\nHere's to many more years of advancing excellence in arbitration!"
  },
  {
    id: "3",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/"
  }
];

const News = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id?: string }>();
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  
  useEffect(() => {
    if (id && newsItems.some(item => item.id === id)) {
      setSelectedNewsId(id);
      
      // Simulate clicking on the news item to open the dialog
      setTimeout(() => {
        const newsElement = document.querySelector(`[data-news-id="${id}"]`);
        if (newsElement) {
          (newsElement as HTMLElement).click();
        }
      }, 100);
    }
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} data-news-id={item.id}>
              <NewsItem
                title={item.title}
                date={item.date}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default News;
