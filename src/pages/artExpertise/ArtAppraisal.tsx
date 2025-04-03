
import Layout from "@/components/Layout";

const ArtAppraisal = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">ART APPRAISAL</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            To determine the market value of artworks, a thorough art examination and appraisal process is conducted.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Art expertise involves assessing the authenticity and artistic value of a work, while appraisal determines
            its market value.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            A professional evaluation of an artwork takes into account various factors, including:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">Its characteristics and year of creation</li>
              <li className="ml-5">The reputation and significance of the artist</li>
              <li className="ml-5">The quality of the work based on socio-cultural value indices</li>
              <li className="ml-5">The artwork’s history and provenance</li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            This comprehensive analysis establishes the overall value of the artwork, helps forecast its future worth,
            and assesses potential financial losses in case of total loss.
          </p>
          <h3 className="mb-4 text-lg">Stages of Art Appraisal</h3>
          <p className="mb-4 text-lg text-gray-600">
            A complete appraisal process consists of three key stages:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>Art expertise and attribution</b> – Verification of authenticity and authorship
              </li>
              <li className="ml-5 mt-2"><b>Market value estimation </b> – Assessment of its financial worth
              </li>
              <li className="ml-5 mt-2"><b>Authorization and certification </b> – Issuance of a unique passport for the artwork
              </li>
            </ul>
          </p>

          <p className="mb-4 text-lg text-gray-600">
            This structured approach ensures an accurate and credible valuation, essential for collectors, investors, insurers, and the art market.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            For more information or to request an art authentication service, contact us today.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ArtAppraisal;
