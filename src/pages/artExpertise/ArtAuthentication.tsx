
import Layout from "@/components/Layout";

const ArtAuthentication = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">Art Authentication</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            Ensuring the authenticity of a work of art is crucial for collectors, investors, museums, and galleries. The
            International Center of Judicial and ADR Expertise (ICJE) under the European Arbitration Chamber provides
            professional art authentication services to verify the originality, authorship, and provenance of artworks.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Art authentication is a detailed examination conducted by experts to determine whether a piece of art is
            genuine.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            This process involves:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">Attribution Analysis – Confirming the artist’s identity and assessing stylistic
                and technical characteristics.
              </li>
              <li className="ml-5">Material Examination – Analyzing pigments, canvas, paper, and other materials to
                verify consistency with the claimed period.
              </li>
              <li className="ml-5">Provenance Research – Investigating the artwork’s ownership history and tracing its
                origins.
              </li>
              <li className="ml-5">Comparative Analysis – Cross-referencing the artwork with documented pieces from the
                same artist or period.
              </li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Why is Art Authentication Important?
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">Protects against forgeries and misattributions.</li>
              <li className="ml-5">Increases an artwork’s value and marketability.</li>
              <li className="ml-5">Provides legal and financial security for transactions, insurance, and inheritance
                matters.
              </li>
              <li className="ml-5">Ensures compliance with international regulations for exhibitions and sales.</li>
            </ul>
          </p>
          <h3 className="mb-4 text-lg">Certification of Authenticity</h3>
          <p className="mb-4 text-lg text-gray-600">
            Upon successful verification, the ICJE issues a Certificate of Authenticity, which serves as official documentation of the artwork’s legitimacy. This certificate can be used for sales, exhibitions, insurance, and legal purposes.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            For more information or to request an art authentication service, contact us today.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ArtAuthentication;
