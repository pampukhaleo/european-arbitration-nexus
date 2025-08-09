
import { GalleryImage, GalleryCategory } from '@/types/gallery';

export const galleryCategories: GalleryCategory[] = [
  { id: 'events', name: 'Events', translationKey: 'gallery.categories.events' },
  { id: 'meetings', name: 'Meetings', translationKey: 'gallery.categories.meetings' },
  { id: 'conferences', name: 'Conferences', translationKey: 'gallery.categories.conferences' },
  { id: 'awards', name: 'Awards', translationKey: 'gallery.categories.awards' },
  { id: 'training', name: 'Training', translationKey: 'gallery.categories.training' },
  { id: 'partnerships', name: 'Partnerships', translationKey: 'gallery.categories.partnerships' },
];

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: '15th Anniversary Celebration',
    description: 'European Arbitration Chamber celebrates 15 years of excellence in dispute resolution',
    src: '/images/news/15anniversary.webp',
    alt: '15th Anniversary celebration event',
    category: 'events',
    tags: ['anniversary', 'celebration'],
    date: '2023'
  },
  {
    id: '2',
    title: 'EAC Council Meeting in Brussels',
    description: 'Annual meeting of the EAC Council members discussing strategic initiatives',
    src: '/images/news/Brusselsmeeting.webp',
    alt: 'EAC Council meeting in Brussels',
    category: 'meetings',
    tags: ['council', 'brussels', 'strategy'],
    date: '2019'
  },
  {
    id: '3',
    title: 'International Arbitration Conference',
    description: 'Global conference bringing together arbitration experts from around the world',
    src: '/images/news/DSC_0046.webp',
    alt: 'International arbitration conference',
    category: 'conferences',
    tags: ['international', 'arbitration', 'experts'],
    date: '2018'
  },
  {
    id: '4',
    title: 'Women in Arbitration Award',
    description: 'Recognizing excellence and contributions of women in arbitration field',
    src: '/images/news/womenaward.webp',
    alt: 'Women in Arbitration Award ceremony',
    category: 'awards',
    tags: ['women', 'award', 'recognition'],
    date: '2020'
  },
  {
    id: '5',
    title: 'Training Session on ADR',
    description: 'Professional development training on Alternative Dispute Resolution methods',
    src: '/images/news/21.webp',
    alt: 'ADR training session',
    category: 'training',
    tags: ['training', 'adr', 'education'],
    date: '2019'
  },
  {
    id: '6',
    title: 'EAC EDAC Partnership Meeting',
    description: 'Strategic partnership meeting between EAC and EDAC organizations',
    src: '/images/news/EAC EDAC.webp',
    alt: 'EAC EDAC partnership meeting',
    category: 'partnerships',
    tags: ['partnership', 'collaboration', 'edac'],
    date: '2021'
  },
  {
    id: '7',
    title: 'Prague Conference 2019',
    description: 'International arbitration conference held in Prague',
    src: '/images/news/prague 2019.webp',
    alt: 'Prague conference 2019',
    category: 'conferences',
    tags: ['prague', 'conference', '2019'],
    date: '2019'
  },
  {
    id: '8',
    title: 'Istanbul Meeting',
    description: 'Regional meeting with Turkish arbitration professionals',
    src: '/images/news/Istanbul.webp',
    alt: 'Istanbul meeting',
    category: 'meetings',
    tags: ['istanbul', 'turkey', 'regional'],
    date: '2018'
  }
];
