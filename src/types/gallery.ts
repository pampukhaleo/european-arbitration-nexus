
export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  src: string;
  alt: string;
  category: string;
  tags?: string[];
  date?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  translationKey: string;
}
