
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Painting } from "@/types/gallery";
import { useNavigate } from "react-router-dom";
import { Calendar, User } from "lucide-react";

interface PaintingCardProps {
  painting: Painting;
}

export default function PaintingCard({ painting }: PaintingCardProps) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const getLocalizedField = (field: 'title' | 'artist' | 'description') => {
    return painting[`${field}_${language}`] || painting[`${field}_en`] || '';
  };

  const handleViewDetails = () => {
    navigate(`/gallery/${painting.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        {painting.public_image_url ? (
          <img
            src={painting.public_image_url}
            alt={getLocalizedField('title')}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <User size={48} />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {getLocalizedField('title')}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <User size={16} />
          <span>{getLocalizedField('artist')}</span>
        </div>
        
        {painting.year && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar size={16} />
            <span>{painting.year}</span>
          </div>
        )}
        
        {getLocalizedField('description') && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {getLocalizedField('description')}
          </p>
        )}
        
        <Button 
          onClick={handleViewDetails}
          className="w-full"
          size="sm"
        >
          {t('gallery.viewDetails')}
        </Button>
      </CardContent>
    </Card>
  );
}
