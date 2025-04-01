
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample news data - this should match the data in the News page
const news = [
  {
    id: 1,
    title: "Beware of Fraud and Scams!",
    date: "Feb 26 2025",
    excerpt: "The Secretariat of the European Arbitration Chamber (EAC) has been made aware of fraudulent letters and documents falsely stating to be issued by or associated with the EAC or/and International Commercial Arbitration Court under the EAC (ICAC).",
    link: "/eac/news/1",
  },
  {
    id: 2,
    title: "16th Anniversary of the European Arbitration Chamber!",
    date: "Dec 12 2024",
    excerpt: "Today marks 16 incredible years of the European Arbitration Chamber! Since 2008, the EAC has been committed to providing fair, impartial, and efficient dispute resolution, helping businesses across the globe navigate complex legal challenges.",
    link: "/eac/news/2",
  },
  {
    id: 3,
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    link: "/eac/news/3",
  },
];

export default function NewsPreview() {
  const { t } = useLanguage();
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-eac-dark">{t('home.latestNews')}</h2>
          <Button asChild variant="ghost" className="text-eac-primary hover:text-eac-primary hover:bg-eac-light">
            <Link to="/eac/news">{t('home.viewAllNews')}</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-gray-200 rounded-2xl hover:shadow-md transition">
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.date}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">{item.excerpt}</CardDescription>
                <Button asChild variant="link" className="p-0 text-eac-primary hover:text-eac-primary/80">
                  <Link to={`/eac/news/${item.id}`}>{t('home.readMore')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
