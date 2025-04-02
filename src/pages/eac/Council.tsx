
import Layout from "@/components/Layout";
import CouncilMember from "@/components/council/CouncilMember";

const Council = () => {
  const councilMembers = [
    {
      name: "Hennadii Pampukha",
      position: "President of the EAC and member of the EAC Council",
      description: "President of the EAC and member of the EAC Council, Vice-President of International Commercial Arbitration Court under the European Court of Arbitration, international arbitrator, judicial expert certified by the Ministry of Justice of Ukraine, founding partner of the Expert Legal Group \"Independent Institute of Judicial Expertise\" (Ukraine), Chairman of the Board of the All-Ukrainian Chamber of Experts, Managing Partner of Attorney's Association \"Princip\" (Ukraine), Board member of I.I.Expertise (Estonia)."
    },
    {
      name: "Andrea Moja",
      position: "Member of the EAC Council",
      description: "Member of the EAC Council, Professor of European Law and Trusts at Brescia University, member of STEP Italy's scientific committee, Senior partner of the Law Firm S.L.C. – Studio Legale Commerciale (Italy) with over 25 years' experience in trust and corporate law, successions and wealth planning, tax, international cross-border transactions and major international commercial disputes, international arbitrator of International Commercial Arbitration Court under the European Court of Arbitration."
    },
    {
      name: "Ryszard Marcinkowski",
      position: "Member of the EAC Council",
      description: "Member of the EAC Council, Senior partner of Law office \"Marcinkowski Marcinkowska Trzeciak\", advocate with over 32 years experience, Vice Dean of the Bar Association of Lodz (Poland), international arbitrator of International Commercial Arbitration Court under the European Court of Arbitration. He is a lecturer in the field of civil law, including in the aspect of civil appeal."
    }
  ];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark">Members of the EAC Council</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {councilMembers.map((member) => (
            <CouncilMember
              key={member.name}
              name={member.name}
              position={member.position}
              description={member.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Council;
