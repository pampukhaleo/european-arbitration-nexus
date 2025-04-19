
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsItemProps {
  id: string;
  title: string;
  date: string;
  description: string;
  mainImage?: string;
  images?: string[];
  useCardWrapper?: boolean;
  useInlineLayout?: boolean;
}

const NewsItem = ({ 
  id,
  title, 
  date, 
  description, 
  mainImage, 
  useCardWrapper = false,
  useInlineLayout = false
}: NewsItemProps) => {
  const { t } = useLanguage();

  const firstParagraph = description.split("\n\n")[0];

  const RenderDate = () => (
    <div className="flex items-center text-sm text-gray-500">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date}
    </div>
  );

  // Inline layout component
  if (useInlineLayout) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          {mainImage ? (
            <div className="md:w-1/3 lg:w-1/4">
              <Link to={`/eac/news/${id}`}>
                <img
                  src={mainImage}
                  alt={title}
                  className="w-full h-full object-contain md:max-h-56 hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
          ) : (
            <div className="md:w-1/3 lg:w-1/4 bg-gray-100"></div>
          )}
          
          <div className="flex-1 p-6">
            <Link to={`/eac/news/${id}`} className="hover:text-eac-primary/80 transition-colors">
              <CardTitle className="text-xl mb-2">{title}</CardTitle>
            </Link>
            <RenderDate />
            <CardDescription className="text-gray-600 mt-3 line-clamp-3">
              {firstParagraph}
            </CardDescription>
            <div className="mt-4">
              <Link
                to={`/eac/news/${id}`}
                className="text-eac-primary hover:text-eac-primary/80 font-medium"
              >
                {t("home.readMore")}
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Original grid layout component
  const NewsContent = () => (
    <>
      {mainImage ? (
        <div className="w-full">
          <img
            src={mainImage}
            alt={title}
            className="w-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>
      ) : (
        <div className="h-4"></div> // Small spacer when no image
      )}

      <CardHeader className={`${!mainImage ? 'pt-6' : 'pt-4'} pb-2`}>
        <RenderDate />
        <CardTitle className="text-lg mt-2 text-center">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        <CardDescription className="text-gray-600 mb-4">
          {firstParagraph}
        </CardDescription>

        <div className="mt-auto">
          <Link
            to={`/eac/news/${id}`}
            className="text-eac-primary hover:text-eac-primary/80 font-medium"
          >
            {t("home.readMore")}
          </Link>
        </div>
      </CardContent>
    </>
  );

  const cardStyles = useCardWrapper 
    ? "flex flex-col cursor-pointer hover:shadow-md transition-shadow h-full" 
    : "flex flex-col h-full cursor-pointer rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-white";

  return useCardWrapper ? (
    <Card className={cardStyles}>
      <Link to={`/eac/news/${id}`} className="flex flex-col h-full no-underline text-inherit">
        <NewsContent />
      </Link>
    </Card>
  ) : (
    <div className={cardStyles}>
      <Link to={`/eac/news/${id}`} className="flex flex-col h-full no-underline text-inherit">
        <NewsContent />
      </Link>
    </div>
  );
};

export default NewsItem;
