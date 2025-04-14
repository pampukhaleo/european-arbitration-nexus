
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
    title: "Alexandre Maciel joined the ICAC Panel",
    date: "Aug 02 2024",
    excerpt: "We are pleased to announce that Alexandre Maciel has joined the Arbitral Panel of the ICAC under the European Arbitration Chamber.",
    description: "We are pleased to announce that Alexandre Maciel has joined the Arbitral Panel of the ICAC under the European Arbitration Chamber.\n" +
      "\n" +
      "Mr. Maciel, a Portuguese national, is an arbitrator and lawyer with extensive experience in both domestic and international arbitration. He specializes in a diverse range of fields, including the sale of goods, construction, civil engineering, industrial facilities, environment, energy, mining, insurance, securities, intellectual property, labor, and real estate.\n" +
      "\n" +
      "He is a Fellow (FCIArb) of the Chartered Institute of Arbitrators (CIARB) and serves as an arbitrator for numerous prestigious institutions such as CAAD, CAL, CAPI (ESAI), CNA (AICCOPN), CNIACC, ARBITRARE, TRIAVE, CIMPAS, CONCÓRDIA, CACM (Mozambique), WTC Macau (Arbitration Centre), CIAB, CICAP, HKIAC (Hong Kong International Arbitration Center), HIAC (Hainan International Arbitration Court), AIAC (Asian International Arbitration Centre), CI-MAC (Cayman International Mediation and Arbitration Centre), SIAC (Singapore International Arbitration Centre), MIAC (Maldives International Arbitration Centre), ACICA (Australian Centre for International Commercial Arbitration), Abu Dhabi International Arbitration Centre (arbitrateAD), AIFC (Court and International Arbitration Centre), BVI IAC (British Virgin Islands International Arbitration Centre), and the lists of arbitrators from TCASul, TRGuimarães, TRCoimbra, TRPorto, and TRLisboa.\n" +
      "\n" +
      "Mr. Maciel is also a member of several esteemed organizations, including the Portuguese Arbitration Association (APA), Spanish Arbitration Club (CEA), Boston International Arbitration Council (BIAC), Lusophone Association of Arbitration and Mediation (ALAM), SCC Arbitration Institute (Sweden), and Vienna International Arbitral Centre (VIAC), among others.\n" +
      "\n" +
      "He holds a degree in Law from the University of Minho School of Law and has completed numerous advanced courses and training in arbitration, including the Higher Arbitration Course (VIII Edition) at CIAMEN/CIarb, the Advanced Course in Lusophone International Arbitration at Almedina, and the Diploma in International Arbitration from the University of Basel.\n" +
      "\n" +
      "We are confident that Mr. Maciel's vast expertise and dedication will significantly enhance arbitration proceedings and uphold the high standards of the ICAC. We warmly welcome him and look forward to his valuable contributions to the field of arbitration in Belgium. ",
  },
  {
    id: "10",
    title: "The EAC celebrates 15th anniversary!",
    date: "Dec 12 2023",
    excerpt: "Today, December 12, marks the 15th anniversary of the European Arbitration Chamber (Brussels, Belgium)",
    description: "Today, December 12, marks the 15th anniversary of the European Arbitration Chamber (Brussels, Belgium)!\n" +
      "\n" +
      "The EAС was established in Belgium in 2008 through the collaborative effort of professionals from Belgium, France, and Ukraine. Its primary objective was the advancement and promotion of commercial arbitration, mediation, and expertise as effective alternative mechanisms for resolving commercial disputes.\n" +
      "\n" +
      "At present, the European Arbitration Chamber unites arbitrators, mediators, experts, lawyers, attorneys, and business representatives from 33 jurisdictions worldwide.\n" +
      "\n" +
      "Operated under the EAС, the International Commercial Arbitration Court and the International Center for Judicial and ADR Expertise actively provide businesses with effective tools to settle commercial disputes.\n" +
      "\n" +
      "The EAC's scope of activities extends to educational initiatives. Notably, comprehensive qualification training programs have been designed for lawyers aspiring to become arbitrators, enhancing their professionalism and contributing to the growth of the alternative dispute resolution industry.\n" +
      "\n" +
      "These fifteen years have been marked by significant professional achievements and widespread recognition! On behalf of the EAC Board, we extend our sincere gratitude to all our members, colleagues, and partners for the engaging and productive cooperation, which has been and continues to be a pivotal factor in our success! We are confident that new projects, achievements, and ongoing growth await us in the future.",
    mainImage: "/images/news/15anniversary.png",
    images: [
      "/images/news/15anniversary.png",
    ]
  },
  {
    id: "9",
    title: "Istanbul Arbitration Week 2023",
    date: "Sep 20 2023",
    excerpt: "We're thrilled to announce that the European Arbitration Chamber is Supporting organization for the Istanbul Arbitration Week (ISTAW)!",
    description: "We're thrilled to announce that the European Arbitration Chamber is Supporting organization for the Istanbul Arbitration Week (ISTAW)!\n" +
      "\n" +
      "Istanbul Arbitration Week is an international arbitration event hosted by the Energy Disputes Arbitration Center (EDAC) and consists of a series of events related to international investment, trade, and arbitration. The event aims to bring together arbitrators, lawyers, academics, and arbitration experts from all over the world.\n" +
      "\n" +
      "ISTAW 2023’s panels will follow a dynamic format and foster an open discussion forum regarding the future of international arbitration. They will shed light on new arbitration techniques, focus on developments and evolving interpretations and views, and discuss the best practices for international arbitration in the new virtual reality.\n" +
      "\n" +
      "Visit the official website of ISTAW for more details: https://istaw.com/",
    mainImage: "/images/news/Istanbul.jpg",
    images: [
      "/images/news/Istanbul.jpg",
    ]
  },
];
