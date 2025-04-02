
import Layout from "@/components/Layout";

const ExpertiseFields = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">ICJE – Main Areas of Expert Research</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            The International Center of Judicial and ADR Expertise (ICJE) provides a wide range of expert research and
            examination services across various industries, including:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">Engineering Inspection</li>
              <li className="ml-5 mt-2">Construction Inspection</li>
              <li className="ml-5 mt-2">Land Surveying</li>
              <li className="ml-5 mt-2">Electrical Engineering Inspection</li>
              <li className="ml-5 mt-2">Transportation and Traffic Engineering Inspection</li>
              <li className="ml-5 mt-2">Financial Audit & Forensic Accounting</li>
              <li className="ml-5 mt-2">Environmental Assessment</li>
              <li className="ml-5 mt-2">Commodity Inspection & Quality Control</li>
              <li className="ml-5 mt-2">Intellectual Property Valuation</li>
              <li className="ml-5 mt-2">Art Appraisal & Authentication</li>
              <li className="ml-5 mt-2">Linguistic Analysis & Forensic Linguistics</li>
              <li className="ml-5 mt-2">Handwriting Analysis & Signature Verification</li>
              <li className="ml-5 mt-2">Document Examination & Forensic Document Analysis</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-6 text-eac-dark">Expert Examinations Conducted by ICJE</h2>
          <p className="mb-4 text-lg text-gray-600">
            ICJE provides expert examinations:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2">At the request of international arbitration courts (without jurisdictional limitations).</li>
              <li className="ml-5 mt-2">At the request of state courts for legal proceedings.</li>
              <li className="ml-5 mt-2">On behalf of lawyers, legal entities, and individuals seeking professional assessments.</li>
              <li className="ml-5 mt-2">In accordance with other legal and procedural requirements.</li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Our team of certified experts ensures accuracy, reliability, and compliance with international standards in all expert evaluations. Contact us to learn more or request an expert examination.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ExpertiseFields;
