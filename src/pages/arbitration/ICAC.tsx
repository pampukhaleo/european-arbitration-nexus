
import Layout from "@/components/Layout";

const ICAC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">ICAC at EAC</h1>
        
        <div className="prose max-w-none">
          <p className="mb-6 text-lg text-gray-600">
            The International Commercial Arbitration Court under the European Arbitration Chamber (hereinafter referred to as the ICAC under the EACh) is an independent permanent arbitration court operating under the Belgian Judicial Code (Articles 1676-1723) and Rules.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-eac-dark">Principles:</h2>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
            <li>professionalism of arbitrators</li>
            <li>judiciary's impartiality</li>
            <li>free from political influence during the case consideration</li>
            <li>optimality of terms of case consideration</li>
            <li>efficiency of work of the Secretariat</li>
            <li>optimal amount of arbitration costs</li>
            <li>strict confidence of the arbitration proceeding</li>
            <li>parties' autonomy concerning language and law</li>
            <li>availability of supporting services, such as interpreting service, shorthand service, IT-service, premises in the place of arbitration (proceeding)</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ICAC;
