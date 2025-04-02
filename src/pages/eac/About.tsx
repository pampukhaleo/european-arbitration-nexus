
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">About the European Arbitration Chamber (EAC)</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            <b>The European Arbitration Chamber (EAC)</b> is an international non-profit association dedicated to
            helping businesses efficiently and swiftly resolve commercial disputes through international arbitration.
          </p>
          <h3 className="mb-4 text-lg">Our Mission</h3>
          <p className="mb-4 text-lg text-gray-600">
            EAC’s mission is to <b>promote and develop commercial arbitration, mediation, judicial expertise, and the
            Alternative Dispute Resolution (ADR) system</b> globally, providing businesses with effective and reliable
            dispute resolution mechanisms.
          </p>
          <h3 className="mb-4 text-lg">Our History</h3>
          <p className="mb-4 text-lg text-gray-600">
            Founded in <b>Belgium in 2008</b>, the EAC was established by professionals in <b>commercial arbitration and
            mediation</b> from Belgium, France, and Ukraine. It operates in full compliance with the <b>Law of the
            Kingdom of Belgium on Non-Profit Associations, International Non-Profit Associations, and Foundations of
            June 27, 1921.</b>
          </p>
          <h3 className="mb-4 text-lg">Our Global Reach</h3>
          <p className="mb-4 text-lg text-gray-600">
            Today, the EAC unites representatives from 35 countries, including:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">Arbitrators</li>
              <li className="ml-5">Mediators</li>
              <li className="ml-5">Judicial experts</li>
              <li className="ml-5">Business professionals</li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Key Areas of Activity
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>Commercial Arbitration</b> – Resolving cross-border business disputes through
                international arbitration.</li>
              <li className="ml-5 mt-2"><b>Judicial Expertise</b> – Providing expert assessments for legal and arbitration proceedings.</li>
              <li className="ml-5 mt-2"><b>Training & Education</b> – Offering specialized courses and programs in ADR, arbitration, and mediation.</li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            The International Commercial Arbitration Court (ICAC) has been established as an administrative facility of
            the European Arbitration Chamber. It is an independent permanent Court of Arbitration, which operates under
            the Regulation and articles 1676-1723 of the The Belgian Judicial Code.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            EAC is committed to fostering a fair, efficient, and globally recognized dispute resolution framework, empowering businesses and legal professionals worldwide.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
