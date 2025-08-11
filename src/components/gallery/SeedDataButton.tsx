
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Database, Loader2 } from 'lucide-react';

const SeedDataButton = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const seedData = [
    {
      title_en: "The Starry Night",
      title_fr: "La Nuit étoilée",
      title_ru: "Звёздная ночь",
      artist_en: "Vincent van Gogh",
      artist_fr: "Vincent van Gogh",
      artist_ru: "Винсент ван Гог",
      year: 1889,
      description_en: "A masterpiece depicting a swirling night sky over a village, painted during van Gogh's stay at the asylum in Saint-Rémy-de-Provence.",
      description_fr: "Un chef-d'œuvre représentant un ciel nocturne tourbillonnant au-dessus d'un village, peint pendant le séjour de van Gogh à l'asile de Saint-Rémy-de-Provence.",
      description_ru: "Шедевр, изображающий кружащееся ночное небо над деревней, написанный во время пребывания ван Гога в приюте в Сен-Реми-де-Прованс.",
      technical_analysis_en: "Oil on canvas, 73.7 cm × 92.1 cm. The painting features thick application of paint and bold, dramatic brush strokes.",
      technical_analysis_fr: "Huile sur toile, 73,7 cm × 92,1 cm. La peinture présente une application épaisse de peinture et des coups de pinceau audacieux et dramatiques.",
      technical_analysis_ru: "Масло на холсте, 73,7 см × 92,1 см. Картина отличается густым нанесением краски и смелыми, драматичными мазками кисти.",
      expertise_report_en: "Authenticated through provenance documentation and technical analysis. No signs of forgery detected.",
      expertise_report_fr: "Authentifié par la documentation de provenance et l'analyse technique. Aucun signe de contrefaçon détecté.",
      expertise_report_ru: "Аутентификация подтверждена документацией происхождения и техническим анализом. Признаков подделки не обнаружено.",
      public_image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      is_published: true,
    },
    {
      title_en: "Girl with a Pearl Earring",
      title_fr: "La Jeune Fille à la perle",
      title_ru: "Девушка с жемчужной серёжкой",
      artist_en: "Johannes Vermeer",
      artist_fr: "Johannes Vermeer",
      artist_ru: "Иоганнес Вермеер",
      year: 1665,
      description_en: "An iconic portrait featuring a girl wearing an exotic dress and a large pearl earring, painted by the Dutch master Vermeer.",
      description_fr: "Un portrait iconique présentant une jeune fille portant une robe exotique et une grande boucle d'oreille en perle, peint par le maître hollandais Vermeer.",
      description_ru: "Знаковый портрет девушки в экзотическом платье с большой жемчужной серёжкой, написанный голландским мастером Вермеером.",
      technical_analysis_en: "Oil on canvas, 44.5 cm × 39 cm. Notable for its intimate composition and masterful use of light.",
      technical_analysis_fr: "Huile sur toile, 44,5 cm × 39 cm. Remarquable pour sa composition intime et son utilisation magistrale de la lumière.",
      technical_analysis_ru: "Масло на холсте, 44,5 см × 39 см. Отличается интимной композицией и мастерским использованием света.",
      expertise_report_en: "Verified through extensive art historical research and scientific analysis of pigments and canvas.",
      expertise_report_fr: "Vérifié par des recherches approfondies en histoire de l'art et une analyse scientifique des pigments et de la toile.",
      expertise_report_ru: "Верифицировано посредством обширных искусствоведческих исследований и научного анализа пигментов и холста.",
      public_image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
      is_published: true,
    },
    {
      title_en: "The Great Wave off Kanagawa",
      title_fr: "La Grande Vague de Kanagawa",
      title_ru: "Большая волна в Канагаве",
      artist_en: "Katsushika Hokusai",
      artist_fr: "Katsushika Hokusai",
      artist_ru: "Кацусика Хокусай",
      year: 1831,
      description_en: "A famous woodblock print depicting a large wave threatening boats near Kanagawa, with Mount Fuji visible in the background.",
      description_fr: "Une célèbre estampe sur bois représentant une grande vague menaçant des bateaux près de Kanagawa, avec le mont Fuji visible en arrière-plan.",
      description_ru: "Знаменитая ксилография, изображающая большую волну, угрожающую лодкам близ Канагавы, с видимой на заднем плане горой Фудзи.",
      technical_analysis_en: "Woodblock print on paper. Part of the series 'Thirty-six Views of Mount Fuji'. Demonstrates masterful use of Prussian blue.",
      technical_analysis_fr: "Estampe sur bois sur papier. Fait partie de la série 'Trente-six vues du mont Fuji'. Démontre une utilisation magistrale du bleu de Prusse.",
      technical_analysis_ru: "Ксилография на бумаге. Часть серии «Тридцать шесть видов горы Фудзи». Демонстрирует мастерское использование берлинской лазури.",
      expertise_report_en: "Original print verified through watermark analysis and comparison with museum specimens.",
      expertise_report_fr: "Estampe originale vérifiée par l'analyse des filigranes et la comparaison avec les spécimens de musée.",
      expertise_report_ru: "Оригинальная гравюра верифицирована посредством анализа водяных знаков и сравнения с музейными образцами.",
      public_image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1280px-The_Great_Wave_off_Kanagawa.jpg",
      is_published: true,
    }
  ];

  const handleSeedData = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add test data",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const paintingsWithOwner = seedData.map(painting => ({
        ...painting,
        owner_id: user.id,
      }));

      const { error } = await supabase
        .from('paintings')
        .insert(paintingsWithOwner);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Test paintings have been added to the gallery",
      });
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error",
        description: "Failed to add test data. They may already exist.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSeedData}
      disabled={loading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Database className="h-4 w-4" />
      )}
      {loading ? 'Adding...' : 'Add Test Data'}
    </Button>
  );
};

export default SeedDataButton;
