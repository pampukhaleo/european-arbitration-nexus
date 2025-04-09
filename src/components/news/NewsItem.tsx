
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsItemProps {
  title: string;
  date: string;
  description: string;
}

const NewsItem = ({ title, date, description }: NewsItemProps) => {
  const { t } = useLanguage();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const paragraphs = description.split("\n\n");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600 mb-4">{paragraphs[0]}</CardDescription>
            <Button variant="link" className="p-0 text-eac-primary" ref={triggerRef}>
              {t("news.readMore")}
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" aria-describedby="news-item-content">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date}
          </div>
        </DialogHeader>
        <div id="news-item-content" className="mt-4 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700">{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsItem;
