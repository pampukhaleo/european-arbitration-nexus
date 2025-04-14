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
  mainImage?: string;
  images?: string[];
  useCardWrapper?: boolean;
}

const NewsItem = ({ 
  title, 
  date, 
  description, 
  mainImage, 
  images = [],
  useCardWrapper = false
}: NewsItemProps) => {
  const { t } = useLanguage();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const paragraphs = useMemo(() => description.split("\n\n"), [description]);

  const RenderDate = () => (
    <div className="flex items-center text-sm text-gray-500">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date}
    </div>
  );

  const NewsContent = () => (
    <>
      {mainImage ? (
        <div className="w-full">
          <img
            src={ mainImage }
            alt={ title }
            className="w-full h-[180px] object-cover object-top"
          />
        </div>
      ) : (
        <div className="h-4"></div> // Small spacer when no image
      )}

      <CardHeader className={`${!mainImage ? 'pt-6' : 'pt-4'} pb-2`}>
        <RenderDate />
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        <CardDescription className="text-gray-600 mb-4">
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
    </>
  );

  const PopupContent = () => (
    <DialogContent
      className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"
      aria-describedby="news-item-content"
    >
      <DialogHeader className="p-6 pb-2">
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <div className="mt-2">
          <RenderDate />
        </div>
      </DialogHeader>

      {images && images.length > 0 && (
        <div className="grid grid-cols-1">
          {images.map((image, index) => (
            <div key={index} className="w-full">
              <img 
                src={image} 
                alt={`${title} - image ${index + 1}`} 
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div id="news-item-content" className="p-6 pt-4 space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </DialogContent>
  );

  const cardStyles = useCardWrapper 
    ? "flex flex-col cursor-pointer hover:shadow-md transition-shadow h-full" 
    : "flex flex-col h-full cursor-pointer rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-white";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {useCardWrapper ? (
          <Card className={cardStyles}>
            <NewsContent />
          </Card>
        ) : (
          <div className={cardStyles}>
            <NewsContent />
          </div>
        )}
      </DialogTrigger>

      <PopupContent />
    </Dialog>
  );
};

export default NewsItem;
