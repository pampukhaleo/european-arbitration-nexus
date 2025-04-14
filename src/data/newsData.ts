
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
    id: "1",
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
    id: "2",
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
    id: "3",
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
  {
    id: "4",
    title: "Meeting between the European Arbitration Chamber and the Istanbul Chamber of Commerce Arbitration and Mediation Center",
    date: "Aug 01 2023",
    excerpt: "A meeting took place between the leadership of the European Arbitration Chamber (EAC) and the Istanbul Chamber of Commerce Arbitration and Mediation Center (ITOTAM), during which participants discussed prospects for cooperation.",
    description: "A meeting took place between the leadership of the European Arbitration Chamber (EAC) and the Istanbul Chamber of Commerce Arbitration and Mediation Center (ITOTAM), during which participants discussed prospects for cooperation.\n" +
      "\n" +
      "The meeting was attended by President of the EAC, Mr. Hennadii Pampukha, EAC representative in Turkey, Mr. Avni Demirci, member of the Qualification Commission and international arbitrator of the International Commercial Arbitration Court under the EAC, Mr. Rasim Orucov and the representatives from the Istanbul Chamber of Commerce Arbitration and Mediation Center (ITOTAM) – the Secretary General, Mrs. Senem Bahçekapili Vincenzi, Mr. Alper Yeşiltaş, and attorney M. M. Bugrahan Helvaci.\n" +
      "\n" +
      "As a result of the meeting, the decision was made to formalize the collaboration by signing a Memorandum of Cooperation between the two organizations.\n" +
      "\n" +
      "Furthermore, discussions encompassed various aspects of cooperation within the domain of alternative dispute resolution. Particular emphasis was placed on the significance of nurturing international commercial arbitration and expertise to enable effective dispute resolution in Turkey.\n" +
      "\n" +
      "Among the main agreements was the commitment to exchange professional experience between the EAC and the ITOTAM. The parties reached mutual consensus on the exchange of arbitrators and the potential participation of ITOTAM representatives in the certification course for arbitrators, facilitated by the European Arbitration Chamber.\n" +
      "\n" +
      "An additional crucial topic under discussion involved partnering to support the Istanbul Arbitration Week 2023 forum. This event, organized by the Energy Disputes Arbitration Center  (Ankara) and supported by the Istanbul Chamber of Commerce, garnered considerable attention from both parties.\n" +
      "\n" +
      "In addition, both parties outlined their collaboration plans in the field of forensic examination, including the assessment of art objects. Specifically, as per the accord reached, experts from the International Center for Judicial and ADR Expertise under the European Arbitration Chamber may be appointed as a experts in ITOTAM's arbitration processes.\n" +
      "\n" +
      "Both organizations expressed a shared conviction that this collaboration will contribute to the advancement of commercial arbitration and expertise. This, in turn, will substantively contribute to more effective resolutions of international commercial disputes.",
    mainImage: "/images/news/OSM_9816.jpg",
    images: [
      "/images/news/OSM_9816.jpg",
    ]
  },
  {
    id: "5",
    title: "Belgian expert Patrick Laycock to lead International Center for Judicial and ADR Expertise under the EAC",
    date: "Mar 12 2023",
    excerpt: "Patrick Laycock has been appointed as the new head of the International Center for Judicial and ADR Expertise under the European Arbitration Chamber. The decision was made by the General Meeting of the European Arbitration Chamber.  Patrick Laycock is an expert, art historian, and scientific adviser of the Brussels Art Laboratory.",
    description: "Patrick Laycock has been appointed as the new head of the International Center for Judicial and ADR Expertise under the European Arbitration Chamber. The decision was made by the General Meeting of the European Arbitration Chamber.  Patrick Laycock is an expert, art historian, and scientific adviser of the Brussels Art Laboratory.\n" +
      "\n" +
      "Mr. Laycock is agreed by the Chambre Belge des Experts Chargés de Missions Judiciaires et d’Arbitrage, by the Chambre d’Arbitrage et de Médiation d’Experts Techniques et Juridiques, by the European Arbitration Chamber and by the Court of First Instance of Brussels. As a scientist, he is a life member of the Siam Society under Royal Patronage (Bangkok) and President of the Institut Belge des Hautes Etudes Chinoises (Musées Royaux d’Art et d’Histoire du Cinquantenaire). The Brussels Art Laboratory is included in the EU-TWIX Directory of European laboratories.",
    mainImage: "/images/news/Laycock.jpg",
    images: [
      "/images/news/Laycock.jpg",
    ]
  },
  {
    id: "6",
    title: "EAC General Meeting took place in Brussels",
    date: "Mar 10 2023",
    excerpt: "The General Meeting of the founders and members of the International non-profit association 'European Arbitration Chamber' took place on March 2nd, 2023, in Brussels. Representatives from Belgium, Germany, Italy, Poland, Ukraine, Turkey, Azerbaijan, India, and the United Arab Emirates attended the meeting.",
    description: "The General Meeting of the founders and members of the International non-profit association 'European Arbitration Chamber' took place on March 2nd, 2023, in Brussels. Representatives from Belgium, Germany, Italy, Poland, Ukraine, Turkey, Azerbaijan, India, and the United Arab Emirates attended the meeting.\n" +
      "\n" +
      "The participants reviewed the EAC's activities from 2020 to 2022 and approved the Association's long-term development plan for 2023. The meeting also addressed the re-election of the President and the Board of the EAC, the Head of the International Commercial Arbitration Court under the EAC (ICAC), and the Head of the International Center for Judicial and ADR Expertise under the EAC (ICJE).\n" +
      "\n" +
      "After the voting, Hennadii Pampukha was re-elected as the President of the EAC, and the EAC Council members - Hennadii Pampukha, Ryszard Marcinkowsky, Andrea Moja, and the President of the ICAC, Johan Billiet, were also re-elected for the next term. Additionally, Patrick Laycock was elected to the position of the ICJE under the EAC. The meeting also approved new members of the EAC and arbitrators of the ICAC.\n" +
      "\n" +
      "The participants also decided to make amendments to the ICAC Rules. It was unanimously decided to continue cooperation with arbitration and expert institutions of other countries.\n" +
      "\n" +
      "The European Arbitration Chamber is an international organization that works in the field of commercial arbitration, expertise, and mediation. The EAC hosts various events and conferences on alternative dispute resolution and establishes links between arbitration centers and arbitrators in different countries. The association's purpose is to promote effective alternative dispute resolution in the business community and encourage the use of the most advanced methods and procedures in this area.",
    mainImage: "/images/news/EAC meeting_1.jpeg",
    images: [
      "/images/news/EAC meeting_1.jpeg",
    ]
  },
  {
    id: "7",
    title: "EAC welcomes new ICAC arbitrator and member from India",
    date: "Sep 09 2021",
    excerpt: "We are pleased to announce that Mr. Srikant Parthasarathy (India), Ph.D. Finance and Arbitrator, Maritime Expert, Common Law & Evidentiary Expert in High Court India, has become a member of the European Arbitration Chamber.",
    description: "We are pleased to announce that Mr. Srikant Parthasarathy (India), Ph.D. Finance and Arbitrator, Maritime Expert, Common Law & Evidentiary Expert in High Court India, has become a member of the European Arbitration Chamber.\n" +
      "\n" +
      "Dr. Parthasarathy has completed EAC qualification course for arbitrators and, by the result of exam and according to the decision of the ICAC certification commission, he has been certified as an arbitrator of the International Commercial Arbitration Court under the EAC.\n" +
      "\n" +
      "He is an Arbitrator (Commercial and ISDS disputes), Maritime Expert, Common Law & Evidentiary Expert in High Court India, a fellow of the Chartered Institute of Arbitrators (UK).\n" +
      "\n" +
      "Dr. Parthasarathy specializes in Islamic law, energy, maritime shipping, intellectual property, corporate law, taxation, real estate, finance, contract law, commercial law, investment dispute law, and has led the family office for cross-border mergers for over 12 years and acquisitions (M&A), international taxation, corporate finance, treasury, fundraising, structuring transactions, IPO readiness for small and medium businesses.",
    mainImage: "/images/news/Srikant.jpg",
    images: [
      "/images/news/Srikant.jpg",
    ]
  },
  {
    id: "8",
    title: "Memorandum on cooperation between EAC and EDAC",
    date: "Sep 08 2021",
    excerpt: "The European Arbitration Chamber is pleased to announce the signing of a cooperation and partnership memorandum with Energy Disputes Arbitration Centre (Turkey). The parties agreed on joint activities aimed at developing commercial arbitration, mediation and expertise, as well as conducting of joint events in the field of alternative dispute resolution, in particular, in the energy sector.",
    description: "The European Arbitration Chamber is pleased to announce the signing of a cooperation and partnership memorandum with Energy Disputes Arbitration Centre (Turkey). The parties agreed on joint activities aimed at developing commercial arbitration, mediation and expertise, as well as conducting of joint events in the field of alternative dispute resolution, in particular, in the energy sector.",
    mainImage: "/images/news/EAC EDAC.jpg",
    images: [
      "/images/news/EAC EDAC.jpg",
    ]
  },
  {
    id: "9",
    title: "A new version of the ICAC Rules entered into force",
    date: "Nov 11 2020",
    excerpt: "A new version of the ICAC Rules entered into force on November 11, 2020. This version was approved by the Council of the International non-profit association “European Arbitration Chamber”. It applies to all proceedings that commenced after November 10, 2020 or will commence in the future. Of all the language versions of the ICAC Arbitration Rules, the English version is considered prevailing.",
    description: "A new version of the ICAC Rules entered into force on November 11, 2020. This version was approved by the Council of the International non-profit association “European Arbitration Chamber”. It applies to all proceedings that commenced after November 10, 2020 or will commence in the future. Of all the language versions of the ICAC Arbitration Rules, the English version is considered prevailing.",
  },
  {
    id: "10",
    title: "Webinar: \"Commercial Arbitration: Flexibility of Procedure - Enforceability\"",
    date: "Sep 07 2020",
    excerpt: "On behalf of the European Arbitration Chamber we are delighted to  invite you to take part in the webinar \"Commercial Arbitration: Flexibility of Procedure - Enforceability\", which will take place on September 17, 2020 at 3 p.m. CET (16:00 Kyiv time).",
    description: "On behalf of the European Arbitration Chamber we are delighted to  invite you to take part in the webinar \"Commercial Arbitration: Flexibility of Procedure - Enforceability\", which will take place on September 17, 2020 at 3 p.m. CET (16:00 Kyiv time).\n" +
      "\n" +
      "WHAT ARE WE GOING TO TALK ABOUT?\n" +
      "\n" +
      "Modern foreign trade turnover of goods and services requires from its participants, first of all, efficiency, an important condition for which is the protection of the rights and interests of business entities and investors. For example, for an investor who first encounters the legal system of the counterparty's country, an important condition for the deal is the transparency of the mechanism of legal regulation of disputes and the confidence that a potential dispute will be considered objectively, efficiently, quickly, inexpensively and with the maximum guarantee of the enforcement of the court’s decision or arbitral award.\n" +
      "\n" +
      "These are the advantages of international commercial arbitration. We will talk about its features, preparation for the arbitration process, arbitration procedure and enforcement of arbitral awards in the framework of webinar with opinion leaders:\n" +
      "\n" +
      "- Hennadii Pampukha, President of the European Arbitration Chamber (Brussels, Belgium);\n" +
      "- Sergey Zakharov, Head of the International Center of Judicial and ADR Expertise under the European Arbitration Chamber (Prague, Czech Republic);\n" +
      "- Rasim Orujov, international arbitrator, attorney (Dusseldorf, Germany);\n" +
      "- Ryszard Marcinkowski, international arbitrator, attorney (Lodz, Poland).\n" +
      "\n" +
      "WEBINAR PROGRAM:\n" +
      "\n" +
      "1. Why arbitration?\n" +
      "\n" +
      "Commercial Arbitration Vs. Litigation in state courts: key features and advantages for the parties;\n" +
      "Where does arbitration begin: an arbitration clause or an arbitration agreement?\n" +
      "Initiation of arbitration: calculation of potential costs;\n" +
      "Flexibility of the arbitration procedure and the time frame of the arbitration;\n" +
      "Recommendations on parties’ choice of substantive law, language of the dispute, place of arbitration hearings;\n" +
      "Institutional arbitration or arbitration “ad hoc”?\n" +
      "The finality of the arbitral award and its enforceability in various jurisdictions. \n" +
      " 2. Why ICAC under to the European Arbitration Chamber?\n" +
      "\n" +
      "Features  of Belgian procedural law.\n" +
      "Arbitration Fee: fix rate or hourly fee? Comparative characteristics of the rates of arbitration fees in the key arbitrations of the world;\n" +
      "Consideration of international arbitration disputes during the pandemic: online procedure as a guarantee  not only of the personal safety of the parties, but also saving time & costs;\n" +
      "Assessment of issues, the explanation of which requires special knowledge, by arbitrators with special knowledge. DRB/DAB panels of experts to resolve disputes on FIDIC and ICC recommendations.\n" +
      " 3. Investment arbitration:\n" +
      "\n" +
      "Applicable law to consideration of an investment dispute;\n" +
      "Enforcement of investment arbitration awards.\n" +
      "4. How to become an arbitrator?\n" +
      "\n" +
      "Legal status of an arbitrator in international commercial arbitration;\n" +
      "Professional training and reputation of the arbitrator;\n" +
      "Certification of an arbitrator of International Commercial Arbitration Court under the European Arbitration Chamber;\n" +
      "Certification and accreditation of a judicial expert of the International Center of Judicial and ADR Expertise under the European Arbitration Chamber.\n" +
      "The webinar will be of interest not only to practicing lawyers, but also to business representatives.\n" +
      "\n" +
      "Date: September 17th 2020\n" +
      "TIme: 15:00 Brussels / 16:00 Kyiv\n" +
      "Please register by pressing button below via the Facebook Messenger application.\n" +
      "If you do not have Facebook Messenger, you can apply for participation by e-mail secretary@chea-taic.be",
    mainImage: "/images/news/engbannerlast.jpg",
    images: [
      "/images/news/engbannerlast.jpg",
    ]
  },
  {
    id: "11",
    title: "General Meeting of EAC members took place in Brussels",
    date: "Feb 10 2020",
    excerpt: "On January 31, 2020, the General Meeting of the European Arbitration Chamber was held in Brussels. The event was attended by representatives of the EAC: arbitrators, experts, lawyers from 7 countries.",
    description: "On January 31, 2020, the General Meeting of the European Arbitration Chamber was held in Brussels. The event was attended by representatives of the EAC: arbitrators, experts, lawyers from 7 countries.\n" +
      "\n" +
      "During the Meeting, the participants summarized the work done for 2018-2019, discussed a number of issues related to the daily activities of the European Arbitration Chamber, International Commercial Arbitration Court (ICAC) and International Center of Judicial and ADR Expertise (ICJE), which operate under the EAC.\n" +
      "\n" +
      "Speeches were made by the President of the EAC Hennadii Pampukha, President of ICAC Johan Billiet, Head of ICJE under EAC Sergey Zakharov, member of the EAC and ICAC new arbitrator in the field of art-disputes Natalia Gnatiuk, members of the EAC and arbitrators of ICAC Andrea Moja, Rasim Orujov and others. In particular, the EAC Meeting decided to approve the new edition of the Rules of ICAC, the Provisions on the accreditation of experts of ICJE and the certification of arbitrators of ICAC. During the Meeting, presentation of the project on the resolution of art disputes, expertise, authorization and authentication of art objects took place. The EAC meeting decided to establish a separate ICAC chamber for consideration of art and intellectual property disputes.\n" +
      "\n" +
      "In addition, the priority area of the EAC for next years will be the expansion of its network of representative offices in the world. In particular, by decision of the Meeting, the EAC will work on opening of its official representative offices in Turkey, Azerbaijan and Uzbekistan. Meanwhile, a dialogue and cooperation in the field of commercial arbitration with the Gulf countries has a been established.\n" +
      "\n" +
      "The EAC Meeting approved the new members of the Chamber, ICAC arbitrators and the ICJE experts; certificates were solemnly presented to them.\n" +
      "\n" +
      "On behalf of the European Arbitration Chamber, we express our gratitude to all participants for the productive work and cooperation!",
    mainImage: "/images/news/Brusselsmeeting.jpg",
    images: [
      "/images/news/Brusselsmeeting.jpg",
    ]
  },
  {
    id: "12",
    title: "The 17th Annual International Conference “Construction and Real Estate: Expertise and Appraisal” was held in Prague",
    date: "Dec 02 2019",
    excerpt: "The 17th annual international conference “Construction and Real Estate: Expertise and Appraisal” was held in Prague. Hennadii Pampukha, President of the European Arbitration Chamber, made a report on the features of the expertise of the causes of fire and its rapid development on the example of international complex commission expertise of children's camp in Odessa (Ukraine).",
    description: "The 17th annual international conference “Construction and Real Estate: Expertise and Appraisal” was held in Prague. Hennadii Pampukha, President of the European Arbitration Chamber, made a report on the features of the expertise of the causes of fire and its rapid development on the example of international complex commission expertise of children's camp in Odessa (Ukraine).\n" +
      "\n" +
      "In his report, Hennadii Pampukha also focused on the need to optimize and unify the methods of conducting forensic examinations in the framework of court and arbitration proceedings in the EU countries.\n" +
      "\n" +
      "This Conference is held since 2003 annually in Prague, Czech Republic. Today this Conference is the only one international experts meeting in the world, devoted to expertise in construction and mostly judicial expertise in construction, which is held on regular basis. During past conference meetings the Conference welcomed the participants from more than 50 countries. \n" +
      "\n" +
      "The organizers are ASN Expert Group, Chamber of  Judicial Experts of the Czech Republic with the support of the European Arbitration Chamber and the European Federation of European Associations EuroExpert.",
    mainImage: "/images/news/prague 2019.jpg",
    images: [
      "/images/news/prague 2019.jpg",
    ]
  },
  {
    id: "13",
    title: "EAC Board meeting took place in Brussels",
    date: "Oct 03 2019",
    excerpt: "The European Arbitration Chamber and the International Commercial Arbitration Court under the EAC expand their scope of activities. In particular, among the new priority areas is the consideration of commercial disputes related to objects of art / antiques / collectibles and intellectual property.",
    description: "The European Arbitration Chamber and the International Commercial Arbitration Court under the EAC expand their scope of activities. In particular, among the new priority areas is the consideration of commercial disputes related to objects of art / antiques / collectibles and intellectual property.\n" +
      "\n" +
      "In this regard, in Brussels, the board of the European Arbitration Chamber held an official meeting with forensic experts specializing in conducting an art expertise regarding establishment of authenticity, date of creation and determination of the market value of art objects. The discussion was attended by EAC President Hennadii Pampukha, ICAC President Johan Billiet, EAC Executive Secretary Katarina Avramova and Director of Brussels Art Laboratory Patrick Laycock.\n" +
      "\n" +
      "There was also a dialogue between the EAC board and the Belgian Association of Experts ABEX, which was attended by ABEX President Alain Coppe and Executive Secretary, Forensic Expert Pierre Fabeck.\n" +
      "\n" +
      "Following the meeting, an agreement was reached on cooperation in the field of forensic expertise in the framework of arbitration proceedings.",
    mainImage: "/images/news/2019-10-08.jpg",
    images: [
      "/images/news/2019-10-08.jpg",
    ]
  },
  {
    id: "14",
    title: "EAC supported the EWEA Award",
    date: "May 29 2019",
    excerpt: "The European Arbitration Chamber as the General Partner supported European Women Expert Awards!",
    description: "The European Arbitration Chamber as the General Partner supported European Women Expert Awards!\n" +
      "\n" +
      "The award ceremony was held on May 22 2019 in the luxurious hotel complex Chalet Equides (Kyiv).\n" +
      "\n" +
      "The main goal of the European Women Expert Awards (EWEA'2019) is to note successful, motivated and active women who, through their work and actions, not only change the world for the better, but also make a social contribution to a wide variety of areas - from business and law to medicine and culture.\n" +
      "\n" +
      "Over the course of several fruitful and busy months of preparing the project, the EWEA'2019 Organizing Committee received more than 100 profiles from women who told their unique story of becoming, about their path to success, difficulties and overcoming them, about the projects and social activities that they implemented, about real achievements. The stories of the nominees showed that these women are real professionals in their field, but the world still knows very little about them. To tell the general public about them, to show their professionalism is what the organizers of EWEA’2019 set themselves.\n" +
      "\n" +
      "The jury of the award determined the winner and nominees as follows. Tatyana Korol and Marianna Abramova got into the nomination \"Culture and Art\", while Lyudmila Bushinskaya won. The laureate Daria Mustafina and the nominees Margarita Sichkar and Julia Savostina were noted by nomination “Social Activities”. Tatyana Verbitskaya received an award in the nomination “Business and Management”, Daria Leshchenko and Tatyana Semenchenko got into the nomination with her. In the nomination \"Medicine and Health\" Oksana Dmitrieva was recognized the best, Anna Dyakiv and Elena Mosiychuk were nominated. In the nomination “Jurisprudence and expertise\" Alexandra Sasina became the laureate, Natalia Kovalko and Victoria Ptashnik got the nomination. And finally, Tatyana Tkachenko was recognized as the best in the nomination “Tourism Activities”, and Anna Romanova and Yulia Alekseeva were nominated.\n" +
      "\n" +
      "After the official ceremony, all the guests of the evening took part in festive buffet reception accompanied with an virtuoso instrumental quartet.",
    mainImage: "/images/news/womenaward.jpg",
    images: [
      "/images/news/womenaward.jpg",
    ]
  },
];
