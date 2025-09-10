import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";

const TermsOfService = () => {
  return (
    <>
      <Seo 
        title="Terms of Service | European Arbitration Chamber"
        description="Read the terms and conditions for using the European Arbitration Chamber's services and website."
        lang="en"
      />
      <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">Terms of Service</h1>
        <div className="prose max-w-none">
          <h3 className="mb-4 text-lg">Terms of Service ("Terms")</h3>
          <p className="mb-4 text-lg text-gray-600">
            Last updated: 28/08/2019
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the
            https://chea-taic.be/ website (the "Service") operated by European Arbitration Chamber ("us", "we", or
            "our").
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            These Terms apply to all visitors, users and others who access or use the Service.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
            terms then you may not access the Service.
          </p>
          <h3 className="mb-4 text-lg">Links To Other Web Sites</h3>
          <p className="mb-4 text-lg text-gray-600">
            Our Service may contain links to third-party web sites or services that are not owned or controlled by
            European Arbitration Chamber.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            European Arbitration Chamber has no control over, and assumes no responsibility for, the content, privacy
            policies, or practices of any third party web sites or services. You further acknowledge and agree that
            European Arbitration Chamber shall not be responsible or liable, directly or indirectly, for any damage or
            loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods
            or services available on or through any such web sites or services.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or
            services that you visit.
          </p>
          <h3 className="mb-4 text-lg">Governing Law</h3>
          <p className="mb-4 text-lg text-gray-600">
            These Terms shall be governed and construed in accordance with the laws of Belgium, without regard to its
            conflict of law provisions.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us
            regarding our Service, and supersede and replace any prior agreements we might have between us regarding the
            Service.
          </p>
          <h3 className="mb-4 text-lg">Changes</h3>
          <p className="mb-4 text-lg text-gray-600">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material we will try to provide at least 30 days notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
          <h3 className="mb-4 text-lg">Contact Us</h3>
          <p className="mb-4 text-lg text-gray-600">
            If you have any questions about these Terms, please contact us: <b>secretary@chea-taic.be</b>
          </p>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default TermsOfService;
