
import Layout from "@/components/Layout";

const ArtPassport = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">AUTHORIZATION OF WORKS OF ART</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            Experts at the International Center of Judicial and ADR Expertise under the European Arbitration Chamber
            provide services for the authorization and certification of artworks. This process results in the issuance
            of a passport for the artwork, certifying its unique physical characteristics and featurers.
          </p>
          <h3 className="mb-4 text-lg">Objects eligible for authorization and certification include:</h3>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            <li className="ml-5 mt-2">Paintings</li>
            <li className="ml-5">Sculpture</li>
            <li className="ml-5">Photographic works</li>
            <li className="ml-5">Works of applied art (decorative weaving, ceramics, carving, foundry, art glass,
              jewelry, etc).
            </li>
            <li className="ml-5">Illustrations, maps, drawings, sketches, and plastic works</li>
            <li className="ml-5">Literary works, including fiction, journalism, scientific, technical, and other
              writings (books, brochures, articles, etc.)
            </li>
            <li className="ml-5">Musical instruments</li>
            <li className="ml-5">Numismatic objects</li>
            <li className="ml-5">Antiques and other collectible items.</li>
          </ul>
          <h3 className="mb-4 text-lg">What is the certification of an art object?</h3>
          <p className="mb-4 text-lg text-gray-600">
            Certification is an official verification of an artwork’s key attributes, including its authorship, period
            of creation, history of ownership, past restorations, value, provenance, and its connection to historical
            and cultural events.
          </p>
          <h3 className="mb-4 text-lg">What information does the passport of an artwork contain?</h3>
          <p className="mb-4 text-lg text-gray-600">
            The passport includes the following details:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">A photograph of the artwork</li>
              <li className="ml-5">Title of the artwork</li>
              <li className="ml-5">Artist’s name and year of creation</li>
              <li className="ml-5">Dimensions</li>
              <li className="ml-5">Technique and materials used</li>
            </ul>
          </p>
          <h3 className="mb-4 text-lg">Why is the authorization and certification of an artwork important?</h3>
          <p className="mb-4 text-lg text-gray-600">
            A passport of an artwork provides several advantages, including the ability to:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">Present the artwork (painting, sculpture, ceramics, etc.) in international art markets</li>
              <li className="ml-5">Exhibit the artwork in international exhibitions and expositions</li>
              <li className="ml-5">Verify its authenticity upon return from an exhibition</li>
              <li className="ml-5">Simplify the insurance process and minimize insurance risks</li>
              <li className="ml-5">Facilitate the purchase and sale of the artwork without requiring additional authentication</li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            An exclusive authorization method ensures that confidential identification data about the artwork is securely stored in the ICJE data center. If necessary, specialists can authenticate the piece and issue a corresponding certificate upon the owner's request.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ArtPassport;
