
import Layout from "@/components/Layout";

const HowToJoin = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">Membership in the European Arbitration Chamber</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            If you would like to become an associated member of the European Arbitration Chamber, follow these steps:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>Submit an application</b> by filling out the online membership request form.</li>
              <li className="ml-5 mt-2"><b>Verification process </b> – The EAC Secretariat will review your application and assess your eligibility.</li>
              <li className="ml-5 mt-2"><b>Complete your membership</b> by paying the annual fee after successful verification.</li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            The annual membership fee is <b>301.29 EUR (VAT included).</b>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            All applicants must undergo a verification process before being accepted as members.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            To request membership, please complete the form here:
            <p><a href={'https://forms.gle/cue4X8S6g6kpWM6q8'}>https://forms.gle/cue4X8S6g6kpWM6q8</a></p>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            The EAC Secretariat will reach out to you with further instructions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HowToJoin;
