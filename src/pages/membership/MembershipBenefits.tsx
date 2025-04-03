
import Layout from "@/components/Layout";

const MembershipBenefits = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">5 Reasons to Become an EAC Member</h1>
        <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
          <li className="ml-5 mt-2">
            <h3 className="text-lg font-bold">Career Growth & Networking</h3>
            Expand your professional network, enhance your reputation in international arbitration communities, and open
            doors to new career opportunities.
          </li>
          <li className="ml-5 mt-2">
            <h3 className="text-lg font-bold">Exclusive Training & Events</h3>
            Access essential business services and participate in seminars, training sessions, masterclasses, round tables, and congresses organized by EAC and its partners—often at discounted rates.
          </li>
          <li className="ml-5 mt-2">
            <h3 className="text-lg font-bold">Valuable Insights & Resources</h3>
            Stay informed with timely updates on key decisions, procedural developments, and industry trends that impact your arbitration practice.
          </li>
          <li className="ml-5 mt-2">
            <h3 className="text-lg font-bold">Visibility & Promotion</h3>
            EAC members can publish corporate news and showcase their professional profiles on the EAC website, increasing their visibility in the arbitration community.
          </li>
          <li className="ml-5 mt-2">
            <h3 className="text-lg font-bold">Accreditation as an Arbitrator</h3>
            Gain the opportunity to take a qualification course for arbitrators and obtain accreditation as an international arbitrator of ICAC upon successfully completing the course and exam.
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default MembershipBenefits;
