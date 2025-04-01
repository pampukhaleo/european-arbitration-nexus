
import Layout from "@/components/Layout";

const ArbitrationClause = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark">Arbitration Clause</h1>
        
        <div className="prose max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-eac-dark">Future disputes</h2>
            
            <p className="text-lg text-gray-600 mb-4">
              The parties, entering the contract and wishing that the disputes that may arise in the future are referred to the Arbitration Court according to the ICAC Rules, are recommended to include the following arbitration clause (words or blanks in square brackets should be removed or filled out correspondently) into the contract:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
              <p className="text-gray-800 mb-4">
                "Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, as a result of referring to it, is considered as the part of this clause.
              </p>
              <p className="text-gray-800 mb-4">
                The number of arbitrators shall be- [one / three].
              </p>
              <p className="text-gray-800 mb-4">
                The seat, or legal place, of arbitration shall be [city and/or country].
              </p>
              <p className="text-gray-800 mb-4">
                The language to be used in the arbitral proceedings shall be [___].
              </p>
              <p className="text-gray-800">
                The governing law of the contract shall be the substantive law of [country]."
              </p>
            </div>
            
            <p className="text-lg text-gray-600">
              In the event that the parties involved are not natural persons of Belgian nationality or legal persons, having its registered office in Belgium, within the meaning of Article 1718 of the Belgian Judicial Code, they may also stipulate the following: "The parties expressly exclude any application for setting aside the Arbitral Award".
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-eac-dark">Existing disputes</h2>
            
            <p className="text-lg text-gray-600 mb-4">
              If there is a dispute between the parties by the contract, and at that, there is no agreement about the dispute settlement by the proceeding between the parties, or if the parties wish to change the existing clause for the case of dispute settlement so that it provides the dispute settlement in the ICAC, the following clause is recommended for these parties (words or blanks in square brackets should be removed or filled out correspondently:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
              <p className="text-gray-800 mb-4">
                "Dispute having arisen between the parties concerning [ ], the parties hereby agree that the dispute shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146), according to the Rules of this ICAC.
              </p>
              <p className="text-gray-800 mb-4">
                The number of arbitrators shall be- [one / three].
              </p>
              <p className="text-gray-800 mb-4">
                The seat, or legal place, of arbitration shall be [city and/or country].
              </p>
              <p className="text-gray-800 mb-4">
                The language to be used in the arbitral proceedings shall be [___ ].
              </p>
              <p className="text-gray-800">
                The governing law of the contract shall be the substantive law of [country]."
              </p>
            </div>
            
            <p className="text-lg text-gray-600">
              In the event that the parties involved are not natural persons of Belgian nationality or legal persons, having its registered office in Belgium, within the meaning of Article 1718 of the Belgian Judicial Code, they may also stipulate the following: "The parties expressly exclude any application for setting aside the Arbitral Award".
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ArbitrationClause;
