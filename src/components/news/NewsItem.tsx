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
                    useInlineLayout = false,
                  }: NewsItemProps) => {
  const { t } = useLanguage();
  const firstParagraph = description.split("\n\n")[0];
  const linkTo = `/eac/news/${id}`;

  const RenderDate = () => (
    <div className="flex items-center text-sm text-gray-500">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date}
    </div>
  );

  // Inline layout
  if (useInlineLayout) {
    return (
      <Link to={linkTo} className="block group">
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 lg:w-1/4">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={title}
                  className="w-full h-full object-contain md:max-h-56 group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="bg-gray-100 h-full w-full" />
              )}
            </div>

            <div className="flex-1 p-6">
              <CardTitle className="text-xl mb-2 group-hover:text-eac-primary/80 transition-colors">
                {title}
              </CardTitle>
              <RenderDate />
              <CardDescription className="text-gray-600 mt-3 line-clamp-3">
                {firstParagraph}
              </CardDescription>
              <div className="mt-4 text-eac-primary font-medium group-hover:text-eac-primary/80">
                {t("home.readMore")}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Standard grid layout
  const Wrapper = useCardWrapper ? Card : "div";
  const cardClass = useCardWrapper
    ? "flex flex-col cursor-pointer hover:shadow-md transition-shadow h-full"
    : "flex flex-col h-full cursor-pointer rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-white";

  return (
    <Link to={linkTo} className="block no-underline text-inherit group h-full">
      <Wrapper className={cardClass}>
        {mainImage && (
          <img
            src={mainImage}
            alt={title}
            className="w-full object-cover group-hover:opacity-90 transition-opacity"
          />
        )}

        <CardHeader className={`${mainImage ? "pt-4" : "pt-6"} pb-2`}>
          <RenderDate />
          <CardTitle className="text-lg mt-2 text-center group-hover:text-eac-primary/80 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1">
          <CardDescription className="text-gray-600 mb-4">
            {firstParagraph}
          </CardDescription>
          <div className="mt-auto text-eac-primary font-medium group-hover:text-eac-primary/80">
            {t("home.readMore")}
          </div>
        </CardContent>
      </Wrapper>
    </Link>
  );
};

export default NewsItem;
