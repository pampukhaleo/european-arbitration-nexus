
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
  {
    id: "15",
    title: "2nd Annual GAR Live Zürich",
    date: "Jan 28 2019",
    excerpt: "European Arbitration Chamber is honored to be a partner of 2ND ANNUAL GAR LIVE ZURICH, which will be hosted by Global Arbitration Review on March 7th 2019 in Zurich.",
    description: "European Arbitration Chamber is honored to be a partner of 2ND ANNUAL GAR LIVE ZURICH, which will be hosted by Global Arbitration Review on March 7th 2019 in Zurich.\n" +
      "\n" +
      "The full-day conference will consist of four sessions in which panellists are expected to cover arbitration through several different lenses: money laundering; sanctions; and human rights.\n" +
      "\n" +
      "These sessions will provide the audience with a unique insight into the arbitral process specifically related to these topics, and our GAR symposium will offer the audience an exclusive opportunity to present questions to our panel of leading experts. The conference is expected to bring in audience members from Switzerland and internationally, allowing delegates to connect with and learn from like-minded individuals.\n" +
      "\n" +
      "10 % discount off the current rate is provided to the members of European Arbitration Chamber at the time of purchase.\n" +
      "\n" +
      "For more information and EAC preferential rate code please contact EAC by e-mail: secretary@chea-taic.be or the Organizer here: http://gar.live/zurich2019",
    mainImage: "/images/news/GAR Live Zurich - Facebook promo.png",
    images: [
      "/images/news/GAR Live Zurich - Facebook promo.png",
    ]
  },
  {
    id: "16",
    title: "A tribute to Olha Pampukha...",
    date: "Oct 24 2018",
    excerpt: "We are deeply saddened to announce that on October 21, 2018 at the age of 48 year of life Olha Pampukha, the Financial Commissioner of the European Arbitration Chamber (Brussels, Belgium), President of the International Women Expert Law Union (France), Managing Partner of the Independent Institute of Legal Expertise (Kyiv, Ukraine) has passed away.",
    description: "We are deeply saddened to announce that on October 21, 2018 at the age of 48 year of life Olha Pampukha, the Financial Commissioner of the European Arbitration Chamber (Brussels, Belgium), President of the International Women Expert Law Union (France), Managing Partner of the Independent Institute of Legal Expertise (Kyiv, Ukraine) has passed away.\n" +
      "\n" +
      "Olha Pampukha was a bright, talented, kind and generous person, a role model for all of us.\n" +
      "\n" +
      "She was an optimist, a true professional of her business, being full of ideas she was an author and soul of numerous projects in the field of jurisprudence, expertise, commercial arbitration, marketing and PR, she also has founded the international award for women - European Women Expert Awards.\n" +
      "\n" +
      "Olga worked a lot with lawyers, experts, arbitrators and students in various educational projects, workshops, round tables and seminars. The project, which she was especially proud of, is the annual International Competition on Commercial Arbitration, thanks to which many students had the opportunity to complete internships at leading European law firms. Olha Pampukha paid a lot of attention to charity and corporate social responsibility, she took care of the children's center “In children’s arms”.\n" +
      "\n" +
      "This beautiful, fragile, but strong-willed woman, the mother of three sons, did not spare either strength, energy, or time for the sake of all of her plans, and she certainly achieved success. She believed that you should always move, learn something new, grow spiritually and develop yourself as a personality. She was burning with ideas and  desire to do something meaningful that would allow at least a little to change the world. She was so inspired  with the project based on her initiative - the international award for women “European Women Expert Awards”.\n" +
      "\n" +
      "Having traveled the world a lot, she nevertheless was infinitely in love with her city of childhood - Genichesk, in her native Sea of Azov. When she returned from a short stay at home, she certainly, happily smiled and told us about her parents, about her beloved sea, about her native land, and we understood that our Olha once again received a charge of cheerfulness, love of life, belief that her main achievements were still ahead.\n" +
      "\n" +
      "She was extremely attentive to the team of the European Arbitration Chamber, she was always ready to help and cheer in a difficult moment. Every phone call, meeting with her was always a charge of energy!\n" +
      "\n" +
      "We will never forget her smile, her ringing young laughter, her kind motherly warm instructions, her daily care for each of the employees - she was always ready to give her reliable shoulder, to cheer up in a difficult moment, to suggest how the best to solve a difficult situation.\n" +
      "\n" +
      "Olha is an example of a woman of our time! A worthy woman, with a big heart, very kind and sympathetic, with a fine mental organization.\n" +
      "\n" +
      "Olha had a lot of plans, but her life flight was tragically, suddenly and prematurely cut short - Olga died in the prime of life, at the very peak of her noble activity aimed at serving people and society. Bitter autumn flowers will fall at the head of her grave, and the cool air of October will be warmed with farewell words of love, appreciation, gratitude.\n" +
      "\n" +
      "We will always remember Olha, to remember warmly and very kindly this wonderful woman - our colleague, our friend, our OLHA.\n" +
      "\n" +
      "Eternal memory to you, Olga Leonidovna! We will never forget you!\n" +
      "\n" +
      "We express sincere words of condolences to relatives and friends...\n" +
      "\n" +
      "The memorial service for Olha Pampukha will take place on October 26, 2018 at 15:30 in the Temple of Nikolai Pritysk (Ukraine, Kyiv, 5-a Horyva strert).\n" +
      "\n" +
      "The funeral dinner will be held in the restaurant \"Scorpion\" at 17:00 (Ukraine, Kyiv, Geroev Stalingrad str., 12-e).",
    mainImage: "/images/news/401_4.jpg",
    images: [
      "/images/news/401_4.jpg",
    ]
  },
  {
    id: "17",
    title: "The delegation of the EAC took part in the forum \"Innovative City 2018\" in Nice",
    date: "Aug 01 2018",
    excerpt: "The delegation of the European Arbitration Chamber took part in the international forum \"Innovative City 2018\", which was held in Nice (France).",
    description: "The delegation of the European Arbitration Chamber took part in the international forum \"Innovative City 2018\", which was held in Nice (France).\n" +
      "\n" +
      "During two intensive days we have conducted meeting with Regional Council of Provence-Alpes-Côte d'Azur  Mr. Christian ESTROSI and French entrepreneurs, signed agreements and discussed projects, aimed at developing of commercial arbitration in the region  Provence-Alpes-Côte d'Azur.\n" +
      "\n" +
      "In particular, within the framework of the forum, memorandum of cooperation was signed between the EAC's partner - the International Women's Expert Law Union and French organizations and companies.",
    mainImage: "/images/news/36281499_2085121971502648_3298629918069358592_n.jpg",
    images: [
      "/images/news/36281499_2085121971502648_3298629918069358592_n.jpg",
    ]
  },
  {
    id: "18",
    title: "The delegation of the European Arbitration Chamber visited Istanbul",
    date: "Apr 08 2018",
    excerpt: "The delegation of the European Arbitration Chamber took part in the international forum \"Innovative City 2018\", which was held in Nice (France).",
    description: "The delegation of the European Arbitration Chamber at a special invitation of Mr. Yusuf Kuleč visited Istanbul during the official visit to Turkey. The purpose of the visit is establishment of international cooperation in the field of commercial arbitration, educational projects for lawyers, as well as promotion  the system of alternative dispute resolution (ADR) of commercial disputes in Turkey.\n" +
      "\n" +
      "In the framework of the visit the European Arbitration Chamber held seminar for Turkish lawyers. The EAC President Hennadii Pampukha presented lecture, which was devoted to the main activities of the EAC and its division - International Commercial Arbitration Court. The participants of the seminar discussed the procedure of settlement of commercial disputes in accordance with the Belgian procedural law and the Rules of the ICAC under the EAC. The seminar was held with the support of Mr. Yusuf Kuleč and  Yildiz Law Office. The President of the EAC solemnly member’s certificates to the participants of the seminar, who have formalized membership in the EAC.\n" +
      "\n" +
      "The leadership of the European Arbitration Chamber expresses gratitude to the Turkish colleagues for an interesting program of the visit and hospitality.",
    mainImage: "/images/news/turkey istanbul.jpg",
    images: [
      "/images/news/turkey istanbul.jpg",
    ]
  },
  {
    id: "19",
    title: "THE WINNER OF THE INTERNATIONAL COMPETITION FOR COMMERCIAL ARBITRATION",
    date: "Mar 23 2018",
    excerpt: "On March 23, 2018  the Final and the solemn ceremony of awarding the participants of the V International Competition on Commercial Arbitration  was held. The organizer of the moot court competition is the European Arbitration Chamber (Brussels, Belgium).",
    description: "On March 23, 2018  the Final and the solemn ceremony of awarding the participants of the V International Competition on Commercial Arbitration  was held. The organizer of the moot court competition is the European Arbitration Chamber (Brussels, Belgium).\n" +
      "\n" +
      "The general partner of the competition was Ukrinikorglegiya, Independent Institute of Legal Expertise, International Educational Center \"George & Company\" and law firm \"Kinstellar\".\n" +
      "\n" +
      "In the final round of the contest the teams of the Kyiv University of Law of the National Academy of Sciences of Ukraine, the Kiev National Trade and Economic University and the National University \"Odessa Law Academy\" competed for the championship.\n" +
      "\n" +
      "The participants presented their arbitration awards in an improvised dispute, which was considered at the International Commercial Arbitration Court under the European Arbitration Chamber.\n" +
      "\n" +
      "Among the jury members were:\n" +
      "\n" +
      "Hennadii Pampukha, President of the European Arbitration Chamber\n" +
      "Nikolai Pavlov, President of the Ukrainian Foreign Law Collegium. \n" +
      "Mariana Antonovich, associate lawyer of Kinstellar\n" +
      "Tatyana Lezhukh, partner of the law firm \"Lezhuh and partners\"\n" +
      "Olga Poiedynok, chairman of the Committee on Legal Education Policy of the Bar Association of Ukraine\n" +
      "Anastasia Nesterenko, lawyer of the MIF \"Integrites\".\n" +
      "The event was held with the participation of EAC President Hennadii Pampukha, the founder of the International Women's Expert-Legal Union Olha Pampukha, the EAC Executive Secretary Catherine Avramova.\n" +
      "\n" +
      "A specially invited guest - a Ukrainian politician, a member of the Permanent Delegation of the Verkhovna Rada of Ukraine to the Parliamentary Assembly of the Council of Europe Anatoly Rakhansky welcomed the participants of the event. \n" +
      "\n" +
      "Judges and honorary guests of the competition emphasized the importance and urgency of this educational project for students, and also noted an interesting contest task.\n" +
      "\n" +
      "The jury were pleasantly surprised by the level of preparation and oratorical abilities of the teams, but nevertheless they expressed certain remarks, instructions and wishes to future young specialists.\n" +
      "\n" +
      "The team of the Kyiv University of Law of the National Academy of Sciences, consisting of Victoria Poltoratskaya, Daria Malenko, Daria Tretyakova and coaches Elena Polivanova and Tamara Kortukova, won the highest score.\n" +
      "\n" +
      "The second place was taken by the team of the Odessa Law Academy, consisting of Georgy Kravtsunenko, Yuri Podchenko, Music Solomii and coach Vyacheslav Lubashenko.\n" +
      "\n" +
      "An honorable third place in the competition was won by the team consisting of Anastasia Boychenko, Natalia Ivonyak, Olga Pakon, Elena Karpocheva, Sandra Titova and coach Elena Goncharenko.\n" +
      "\n" +
      "The main prize - internship at the European Arbitration Chamber in Brussels and its partner AIA Belgium - was presented to Vadym Yudovych, a student of the National Ostroh Academy, whose competitive essay in the individual competition was the best.\n" +
      "\n" +
      "The participants of the competition were also awarded with certificates for internship in the best legal companies of Ukraine, namely: in Law Firm \"Lezhukh and Partners\", Law Firm \"Kinstellar\", Law Firm \"Dmitrieva and Partners\", EJC \"Eterna Law\", Expert-Legal Group \"Independent Institute of Forensic Expertise\", Public Association \"The Studio of Modern Law\" and the International Women's Expert-Legal Union.\n" +
      "\n" +
      "The European Arbitration Chamber and the Organizing Committee of the Competition congratulate the winners and all participants of the V International Competition on Commercial Arbitration! There are no defeated, because only the best have competed!\n" +
      "\n" +
      "The Organizing Committee of the contest expresses sincere gratitude to all the teams and their coaches",
    mainImage: "/images/news/21.jpg",
    images: [
      "/images/news/21.jpg",
    ]
  },
  {
    id: "20",
    title: "The EAC presented International Arbitration Committee",
    date: "Feb 08 2018",
    excerpt: "The European Arbitration Chamber took part in the event of the Ukrainian Advocates' Association \"Fair of Projects\", which took place on February 7, 2018 in Kyiv.",
    description: "The European Arbitration Chamber took part in the event of the Ukrainian Advocates' Association \"Fair of Projects\", which took place on February 7, 2018 in Kyiv.\n" +
      "\n" +
      "The EAC’s President Hennadii Pampukha, who heads International Arbitration Committee of the Ukrainian Advocates' Association, presented the program of the committee for 2018 and outlined the main directions of its activity.\n" +
      "\n" +
      "On behalf of the European Arbitration Chamber, we are happy to invite lawyers, advocates, practicing arbitrators and professionals specializing in international private law and commercial arbitration to join the committee. The application can be submitted by e-mail: secretary@chea-taic.be",
    mainImage: "/images/news/27752465_1764574550253959_2823128997247396433_n.jpg",
    images: [
      "/images/news/27752465_1764574550253959_2823128997247396433_n.jpg",
    ]
  },
  {
    id: "21",
    title: "OFFICIAL MEETINGS OF THE EAC WITH BUSINESS REPRESENTATIVES TOOK PLACE IN ATHENS",
    date: "Jul 03 2017",
    excerpt: "The President of the European Arbitration Chamber Hennadii Pampukha undertook  working visit to Greece on June 29-30th 2017.",
    description: "The President of the European Arbitration Chamber Hennadii Pampukha undertook  working visit to Greece on June 29-30th 2017.\n" +
      "\n" +
      "Protection of business through arbitration, development of international economic cooperation,  establishment of a dialogue between business and jurisprudence - these and many others issues  were  discussed by Hennadii Pampukha during his working visit to Athens and meetings with the leadership of the bilateral chambers of commerce and industry of Greece and the EU countries. In particular, negotiations were held with business representatives from 9 countries of the world who are actively working with Greek entrepreneurs.\n" +
      "\n" +
      "As a result of the meetings, the international chambers of commerce and business associations expressed their willingness to cooperate with the European Arbitration Chamber in matters of protecting the interests of Greek entrepreneurs and their international business partners, and promotion  of international commercial arbitration, mediation and expertise as effective alternative dispute resolution tools, as in the pre-trial stage, and in arbitration as well.\n" +
      "By the way, the EAC launched Communication Center, which facilitates the establishment of a dialogue between representatives of business and jurisprudence. This goal was achieved by Hennadii in the process of bilateral meetings.",
    mainImage: "/images/news/2017-07-03 15.20.16.jpg",
    images: [
      "/images/news/2017-07-03 15.20.16.jpg",
    ]
  },
  {
    id: "22",
    title: "Cooperation with Polish-Finnish Chamber",
    date: "Jun 09 2017",
    excerpt: "The official meeting of the leadership of the European Arbitration Chamber Hennadii and Olha Pampukha and the president of the Polish-Finnish Chamber of Commerce Tomasz Orlowicz was held.",
    description: "The official meeting of the leadership of the European Arbitration Chamber Hennadii and Olha Pampukha and the president of the Polish-Finnish Chamber of Commerce Tomasz Orlowicz was held.\n" +
      "\n" +
      "Participants of the meeting discussed the directions of cooperation between the two chambers in the sphere of alternative dispute resolution. In particular, a joint action plan aimed at development of international economic relations was discussed.",
    mainImage: "/images/news/1267.jpg",
    images: [
      "/images/news/1267.jpg",
    ]
  },
  {
    id: "23",
    title: "The EAC signed memorandum on cooperation with Polish-Ukrainian Chamber of Commerce",
    date: "May 04 2017",
    excerpt: "The official meeting between the President of the European Arbitration Chamber Hennadii Pampukha and the President of the Polish-Ukrainian Chamber of Commerce Jacek Pekhota took place in Warsaw.",
    description: "The official meeting between the President of the European Arbitration Chamber Hennadii Pampukha and the President of the Polish-Ukrainian Chamber of Commerce Jacek Pekhota took place in Warsaw.\n" +
      "\n" +
      "As a result of the meeting, a memorandum on cooperation between the two chambers was signed. The main goal of this is the development of bilateral partnerships in the field of international arbitration and economic relations between Belgium, Poland and Ukraine.",
    mainImage: "/images/news/18198692_1625155160832667_3645374319103162198_n1.jpg",
    images: [
      "/images/news/18198692_1625155160832667_3645374319103162198_n1.jpg",
      "/images/news/18193904_1625155230832660_8367315988680661548_n.jpg",
      "/images/news/18198632_1625155200832663_5921642524542671223_n.jpg",
    ]
  },
  {
    id: "24",
    title: "Round table in the Verkhovna Rada of Ukraine",
    date: "Dec 22 2016",
    excerpt: "European Arbitration Chamber  co-organized a round table in the Verkhovna Rada of Ukraine devoted to the theme \"Modern perspectives of cooperation between Ukraine and Poland in the sphere of international politics\"",
    description: "European Arbitration Chamber  co-organized a round table in the Verkhovna Rada of Ukraine devoted to the theme \"Modern perspectives of cooperation between Ukraine and Poland in the sphere of international politics\"\n" +
      "\n" +
      "The event was attended by representatives of the International Fund for support of Ukraine from Warsaw, the International Education Center «George and Company», European Arbitration Chamber, the Office of the Prime Minister of the Republic of Poland, deputies of Ukraine, representatives of the Ukrainian Government, politicians and public figures, other international partners of Ukraine, Poland and the EU.\n" +
      "\n" +
      "President Hennadii Pampukha EAC made a presentation on the migration situation in Ukraine and Poland, the creation and implementation of the \"road map\" of the citizen of Ukraine in the Republic of Poland, who come to Poland for work,  and creation of the union, which will defend rights of migrants from Ukraine.\n" +
      "\n" +
      "Within the framework of the round table were raised issues of higher education in Ukraine on the path to European integration and the participation of Ukraine in the European Higher Education Area.",
    mainImage: "/images/news/POL_7696.jpg",
    images: [
      "/images/news/POL_7696.jpg",
    ]
  },
  {
    id: "25",
    title: "Presentation of the IV International Competition on Commercial Arbitration",
    date: "Dec 08 2016",
    excerpt: "The presentation of the IV International Competition on Commercial Arbitration, which holds the European Arbitration Chamber, will take place in Kyiv on December 15th 2016.",
    description: "The presentation of the IV International Competition on Commercial Arbitration, which holds the European Arbitration Chamber, will take place in Kyiv on December 15th 2016.\n" +
      "\n" +
      "A mission of this educational project is to increase the level of qualification and professionalism of participants in the legal services market, and promote the development of students’ practical skills in the field of international commercial law, arbitration, mediation, economics, international relations, and so on.The contest is based on the model in consideration of international arbitration (The Rules of the International Commercial Arbitration Court at the European Arbitration Chamber) and is in English.\n" +
      "\n" +
      "The competition will take place in two phases, which include remote participation (drafting memoranda) and face-to-face debate (team debate). The competition will be held from December 2016 to March 2017.\n" +
      "\n" +
      "Presentation of the competition, delivery of tasks, and the drawing procedure will take place on December 15, 2016 in Kyiv.\n" +
      "Venue: Ukraine, Kyiv, Melnikova street, 36/1.\n" +
      "Time: 11:00\n" +
      "Additional information by e-mail: secretary@chea-taic.be\n" +
      "\n" +
      "or by phone: +38 044 581 30 80, +38 067 222 5555",
    mainImage: "/images/news/IMG_20161007_163419.jpg",
    images: [
      "/images/news/IMG_20161007_163419.jpg",
    ]
  },
  {
    id: "26",
    title: "Annual General Meeting of members of the European Arbitration Chamber took place in Brussels",
    date: "Nov 17 2016",
    excerpt: "The Annual General Meeting of members of the European Arbitration Chamber took place in Brussels on November 10th.",
    description: "A meeting of members and regional representatives of the EAC from difefrent countries took place recently in Brussels.\n" +
      "\n" +
      "The participants discussed the results of the work and achievements of the Chamber over the past period, and identified its priorities for the coming year. In particular, it discussed the new strategy of development of the regional network of the EAC, the future prospects of its work and the expected results. During the meeting arbitration processes have been discussed between the Secretariat and the Chairman of the ICAC under the EAC.\n" +
      "\n" +
      "Participation in an international meeting attended by representatives from Belgium, Italy, Montenegro, Turkey, Georgia, Azerbaijan, Ukraine.\n" +
      "\n" +
      "The meeting was also signed memorandums of cooperation with several international associations in the field of expertise and arbitration.",
    mainImage: "/images/news/IMG_20161122_130900_1479812973057111.jpg",
    images: [
      "/images/news/IMG_20161122_130900_1479812973057111.jpg",
    ]
  },
  {
    id: "27",
    title: "International meeting in Brussels took place",
    date: "Feb 08 2016",
    excerpt: "A meeting of members and regional representatives of the EAC from difefrent countries took place recently in Brussels.",
    description: "The participants discussed the results of the work and achievements of the Chamber over the past period, and identified its priorities for the coming year. In particular, it discussed the new strategy of development of the regional network of the EAC, the future prospects of its work and the expected results. During the meeting arbitration processes have been discussed between the Secretariat and the Chairman of the ICAC under the EAC.",
    mainImage: "/images/news/_SAM25281.jpg",
    images: [
      "/images/news/_SAM25281.jpg",
      "/images/news/3meeting.jpg",
      "/images/news/12696542_1730312370536673_778959924_o.jpg",
      "/images/news/_SAM25322.jpg",
    ]
  },
  {
    id: "28",
    title: "QUALIFYING COURSE \"INTERNATIONAL COMMERCIAL ARBITRATION\" TOOK PLACE",
    date: "Jun 19 2014",
    excerpt: "A meeting of members and regional representatives of the EAC from difefrent countries took place recently in Brussels.",
    description: "On June 19st 2014 European Arbitration Chamber held one-day qualifying course \"International Commercial Arbitration\", which was attended by members of the EAC from different countries.  Among the lecturers were high-experiences specialist from Belgium: the President of the European Arbitration Chamber Hennadii Pampukha, Chairman of the International Commercial Arbitration Court under the EAC Johan Billiet, lawyer of ILG \"AstapovLawyers\" Anna Kombikova.\n" +
      "Participants of the first section of the course got acquainted with the peculiarities of international commercial arbitration and its difference from national courts. Anna Kombikova paid attention to the review of the activities of well-known arbitration institutions. She also spoke about international standards of arbitration, differences between institutional arbitration and arbitration ad hoc, features of arbitration procedure.\n" +
      "Johan Billiet described such an important aspects of the arbitration process as preparation of the statement of claim, formation of the tribunal, arbitration costs, conflicts of interest. In addition, J. Billiet revealed the essence of the alternative dispute resolution method, namely mediation.\n" +
      "The participants of the second section of the course focused on the features of settlement of commercial dispute in the International Commercial Arbitration Court under the European Arbitration Chamber. EAC’s President Gennady Pampukha, the speaker of this section, presented the activity of the ICAC under the EAC, as well as its advantages over other European arbitration institutions. \"The flexibility and speed of arbitration proceedings, competitive rates of the arbitration fee and the availability of specialists of various fields from more than 30 countries around the world - these are the main advantages of the ICAC under the EAC,\" - said Mr. Pampukha. The participants got acquainted with the details of Rules the ICAC under the EAC, Provision of arbitration fees and cost of the ICAC under the EAC.",
    mainImage: "/images/news/20130621_0932331.jpg",
    images: [
      "/images/news/20130621_0932331.jpg",
    ]
  },
  {
    id: "29",
    title: "Round table “Employment of graduates and benefits for employers”",
    date: "Feb 28 2014",
    excerpt: "Round table “Employment of graduates and benefits for employers”",
    description: "On February 28th, 2014 the European Arbitration Chamber held Round table, which was devoted to the problem of employment of young specialists and the development of the draft law \"Employment of graduates and benefits for employers\". It aroused great interest among business community, public authorities, universities and students. During the meeting experts from the business sector, science and culture, government representatives discussed problems in the labor market. Based on the discussion of urgent problems Coordinating Council was formed, which is now engaged in the organization of the working groups for the implementation of further initiatives of the EAC social project \"International Exchange of Legal Internship\"",
    mainImage: "/images/news/DSC_0046.jpg",
    images: [
      "/images/news/DSC_0046.jpg",
    ]
  },
];
