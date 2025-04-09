import { useRef, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  const paragraphs = useMemo(() => description.split("\n\n"), [description]);

  const RenderDate = () => (
    <div className="flex items-center text-sm text-gray-500">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <RenderDate />
            <CardTitle className="text-xl mt-2">{title}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col flex-1">
            <CardDescription className="text-gray-600 mb-4 line-clamp-3">
              {paragraphs[0]}
            </CardDescription>

            <div className="mt-auto">
              <Button
                variant="link"
                className="p-0 text-eac-primary hover:text-eac-primary/80"
                ref={triggerRef}
              >
                {t("home.readMore")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl max-h-[80vh] overflow-y-auto"
        aria-describedby="news-item-content"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <div className="mt-2">
            <RenderDate />
          </div>
        </DialogHeader>

        <div id="news-item-content" className="mt-4 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsItem;
