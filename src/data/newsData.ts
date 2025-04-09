
// Define the News item type
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  mainImage?: string;
  images?: string[];
  link?: string;
}

// Shared news data to be used across components
export const newsItems: NewsItem[] = [
  {
    id: "11",
    title: "EAC Welcomes New Member to the Council",
    date: "Apr 5 2025",
    excerpt: "The European Arbitration Chamber is pleased to announce the appointment of a new member to its Council of arbitrators.",
    description: "The European Arbitration Chamber is pleased to announce the appointment of a new member to its Council of arbitrators.\n\nThe new member brings decades of experience in international commercial law and dispute resolution, further strengthening the EAC's expertise in handling complex arbitration cases.\n\nThis appointment reflects our ongoing commitment to maintaining a diverse and highly qualified panel of arbitrators to serve the needs of the international business community.",
    // No mainImage or images provided for this news item
  },
  {
    id: "10",
    title: "Beware of Fraud and Scams!",
    date: "Feb 26 2025",
    excerpt: "The Secretariat of the European Arbitration Chamber (EAC) has been made aware of fraudulent letters and documents falsely stating to be issued by or associated with the EAC or/and International Commercial Arbitration Court under the EAC (ICAC).",
    description: "The Secretariat of the European Arbitration Chamber (EAC) has been made aware of fraudulent letters and documents falsely stating to be issued by or associated with the EAC or/and International Commercial Arbitration Court under the EAC (ICAC).\n\nThese scams, which may attempt to obtain money and/or personal details from recipients, are fraudulent.\n\nThe Secretariat of the EAC warns the public about these fraudulent activities and urges vigilance against various fraud schemes misusing name of the EAC.\n\nWe strongly advise recipients of such fraudulent communications to exercise extreme caution. Transferring money or personal information to scammers can result in financial loss or identity theft.\n\nIn the event of receiving suspicious letters containing statements about the existence of arbitration proceedings and allegedly coming from the EAC or the ICAC, we recommend that you immediately contact the EAC Secretariat to verify the authenticity of the information by this email: secretary@chea-taic.be\n\nThe European Arbitration Chamber has reported these fraudulent activities to the relevant law enforcement authorities, including the criminal police.",
    mainImage: "/images/news/fraud-alert.jpg",
    images: [
      "/images/news/fraud-alert.jpg",
      "/images/news/fraud-document-example.jpg",
      "/images/news/scam-warning.jpg"
    ]
  },
  {
    id: "9",
    title: "16th Anniversary of the European Arbitration Chamber!",
    date: "Dec 12 2024",
    excerpt: "Today marks 16 incredible years of the European Arbitration Chamber! Since 2008, the EAC has been committed to providing fair, impartial, and efficient dispute resolution, helping businesses across the globe navigate complex legal challenges.",
    description: "Today marks 16 incredible years of the European Arbitration Chamber!\n\nSince 2008, the EAC has been committed to providing fair, impartial, and efficient dispute resolution, helping businesses across the globe navigate complex legal challenges.\n\nThis milestone reflects the trust of our members and partners, the unwavering dedication of our team, and the invaluable support of the international arbitration community.\n\nOn behalf of the EAC Board, we extend our heartfelt gratitude to every member, colleague, and partner for your collaboration. Together, we've achieved so much - and we look forward to continuing this journey with you.\n\nHere's to many more years of advancing excellence in arbitration!",
    mainImage: "/images/news/anniversary.jpg",
    images: [
      "/images/news/anniversary.jpg",
      "/images/news/anniversary-celebration.jpg",
      "/images/news/eac-team.jpg"
    ]
  },
  {
    id: "8",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/images/news/istaw2024.jpg",
    images: [
      "/images/news/istaw2024.jpg",
      "/images/news/istaw-venue.jpg"
    ]
  },
  {
    id: "7",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
  {
    id: "6",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
  {
    id: "5",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
  {
    id: "4",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
  {
    id: "3",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
  {
    id: "2",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
  {
    id: "1",
    title: "ISTAW 2024",
    date: "Aug 02 2024",
    excerpt: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024. Booking early is recommended to take advantage of the early bird ticket price.",
    description: "The European Arbitration Chamber is supporter of ISTAW 2024. Registrations are now open for #ISTAW2024.\n\nBooking early is recommended to take advantage of the early bird ticket price.\n\nAs a special offer, members of the European Arbitration Chamber will receive a 10% discount on registration. The event will take place from 30 September to 4 October at Mandarin Oriental Bosphorus and this year's event is coming with surprises that will be announced soon.\n\nFind out more about ISTAW and register by visiting: https://istaw.com/",
    mainImage: "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png",
    images: [
      "/public/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png"
    ]
  },
];
