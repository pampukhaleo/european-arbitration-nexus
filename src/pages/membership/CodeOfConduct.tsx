
import Layout from "@/components/Layout";

const CodeOfConduct = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">Code of Conduct</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">The European Arbitration Chamber (EAC) has established this Code of
            Conduct to ensure its members uphold the highest ethical and professional standards. All members are
            expected to adhere to these principles with strict observance.</p>
          <h3 className="mb-4 text-lg">Obligations</h3>
          <p className="mb-4 text-lg text-gray-600">
            Each member of the EAC is committed to:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>Upholding Legal Standards</b> – Promote the observance of international law,
                as well as national legislation relevant to arbitration and dispute resolution.
              </li>
              <li className="ml-5 mt-2"><b>Advancing Alternative Dispute Resolution (ADR)</b> – Support the growth and
                integration of ADR and international arbitration within global business practices.
              </li>
              <li className="ml-5 mt-2"><b>Fostering Institutional Collaboration</b> – Develop constructive
                relationships with authorities and international organizations to uphold justice, the rule of law, and a
                favorable global business climate.
              </li>
              <li className="ml-5 mt-2"><b>Engaging with the EAC Community</b> – Collaborate with fellow EAC members and
                representatives to further the development of ADR on both national and international levels.
              </li>
              <li className="ml-5 mt-2"><b>Active Participation</b> – Take part in official events, conferences, and
                activities organized by or in partnership with the EAC.
              </li>
              <li className="ml-5 mt-2"><b>Promoting ADR Awareness</b> – Contribute to the dissemination of professional
                knowledge about ADR systems worldwide.
              </li>
              <li className="ml-5 mt-2"><b>Compliance with EAC Regulations</b> – Adhere strictly to the principles and
                requirements outlined in the EAC’s Articles of Association.
              </li>
            </ul>
          </p>
          <h3 className="mb-4 text-lg">Responsibilities</h3>
          <p className="mb-4 text-lg text-gray-600">
            Each member is personally responsible for:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>Integrity & Ethical Conduct</b> – Act with honesty, fairness, and respect for
                human rights, in alignment with the principles of the UN Declaration of Human Rights. Avoid all forms of
                discrimination based on race, gender, religion, or political beliefs.
              </li>
              <li className="ml-5 mt-2"><b>Commitment to Society</b> – Consider societal interests by acting loyally and
                honestly in accordance with EAC policies.
              </li>
              <li className="ml-5 mt-2"><b>Professional Respect</b> – Refrain from harming, defaming, or recklessly
                undermining the professional reputation of others.
              </li>
              <li className="ml-5 mt-2"><b>Respect for Property Rights</b> – Uphold intellectual property rights and
                other property-related legal protections.
              </li>
              <li className="ml-5 mt-2"><b>Confidentiality</b> – Maintain strict confidentiality regarding any
                privileged information encountered during professional duties.
              </li>
              <li className="ml-5 mt-2"><b>Competence & Objectivity</b> – Accept only work they are qualified to perform
                and provide professional opinions with the highest degree of objectivity.
              </li>
            </ul>
          </p>
          <h3 className="mb-4 text-lg">Sanctions for Non-Compliance</h3>
          <p className="mb-4 text-lg text-gray-600">
            Failure to adhere to this Code of Conduct, if substantiated by the European Arbitration Chamber, may result
            in <b>immediate revocation of membership.</b>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CodeOfConduct;
