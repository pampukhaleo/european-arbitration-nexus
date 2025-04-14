
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
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
      {mainImage && (
        <div className="overflow-hidden rounded-t-lg">
          <div className="w-full h-[200px]">
            <img 
              src={mainImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <CardHeader className={`pb-2 ${!mainImage ? 'pt-6' : ''}`}>
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
    </>
  );

  const PopupContent = () => (
    <DialogContent
      className="max-w-4xl max-h-[90vh] overflow-y-auto"
      aria-describedby="news-item-content"
    >
      <DialogHeader>
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <div className="mt-2">
          <RenderDate />
        </div>
      </DialogHeader>

      {images && images.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden w-full">
              <img 
                src={image} 
                alt={`${title} - image ${index + 1}`} 
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>
          ))}
        </div>
      )}

      <div id="news-item-content" className="mt-4 space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </DialogContent>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {useCardWrapper ? (
          <Card className={`flex flex-col cursor-pointer hover:shadow-md transition-shadow ${!mainImage ? 'h-full' : ''}`}>
            <NewsContent />
          </Card>
        ) : (
          <div className={`flex flex-col h-full cursor-pointer rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${!mainImage ? 'bg-white' : ''}`}>
            <NewsContent />
          </div>
        )}
      </DialogTrigger>

      <PopupContent />
    </Dialog>
  );
};

export default NewsItem;
