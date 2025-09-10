import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";

const CookiesPolicy = () => {
  return (
    <>
      <Seo 
        title="Cookies Policy | European Arbitration Chamber"
        description="Understand how the European Arbitration Chamber uses cookies and similar technologies on our website."
        lang="en"
      />
      <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">Cookies Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">Last update: 29/08/2019</p>
          <h3 className="mb-4 text-lg">Introduction</h3>
          <p className="mb-4 text-lg text-gray-600">
            Our entity (“us”, “we”, or “our”) uses cookies on the its website (the “Service”). By using the Service, you
            consent to the use of cookies.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            This Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may
            use cookies on the Service, your choices regarding cookies and further information about cookies.
          </p>
          <h3 className="mb-4 text-lg">What are cookies?</h3>
          <p className="mb-4 text-lg text-gray-600">
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in
            your web browser and allows the Service or a third-party to recognize you and make your next visit easier
            and the Service more useful to you.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Cookies can be either “persistent” or “session” cookies. Persistent cookies remain on your personal computer
            or mobile device when you go offline, while session cookies are deleted as soon as you close your web
            browser.
          </p>
          <h3 className="mb-4 text-lg">How we use cookies?</h3>
          <p className="mb-4 text-lg text-gray-600">
            When you use and access the Service, we may place a number of cookies files in your web browser.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            We use cookies for the following purposes:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>To enable certain functions of the Service</b></li>
              <li className="ml-5 mt-2"><b>To provide analytics (Google Analytics)</b></li>
              <li className="ml-5 mt-2"><b>To enable certain functions of the Service</b></li>
            </ul>
          </p>
          <p className="mb-4 text-lg text-gray-600">
            We use both persistent and session cookies on the Service and we use different types of cookies to run the
            Service:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>Essential cookies. We may use essential cookies to authenticate users and
                prevent fraudulent use of user accounts.</b></li>
              <li className="ml-5 mt-2"><b>Preferences cookies. We may use preferences cookies to remember information
                that changes the way the Service behaves or looks, such as the “remember me” functionality of a
                registered user or a user’s language preference.</b></li>
              <li className="ml-5 mt-2"><b>Analytics cookies. We may use analytics cookies to track information on how
                the Service is used so that we can make improvements. We may also use analytics cookies to test new
                advertisements, pages, features or new functionality of the Service to see how our users react to
                them.</b></li>
            </ul>
          </p>
          <h3 className="mb-4 text-lg">What are your choices regarding cookies?</h3>
          <p className="mb-4 text-lg text-gray-600">
            If you would like to delete cookies or instruct your web browser to delete or refuse cookies, please visit
            the help pages of your web browser.
          </p>
          <p className="mb-4 text-lg text-gray-600">
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all
            of the features we offer, you may not be able to store your preferences, and some of our pages might not
            display properly.
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>For the Chrome web browser, please visit this page from Google: <a
                href={ 'https://support.google.com/accounts/answer/32050' }>https://support.google.com/accounts/answer/32050</a></b>
              </li>
              <li className="ml-5 mt-2"><b>For the Internet Explorer web browser, please visit this page from
                Microsoft: <a
                  href={ 'http://support.microsoft.com/kb/278835' }>http://support.microsoft.com/kb/278835</a></b>
              </li>
              <li className="ml-5 mt-2"><b>For the Firefox web browser, please visit this page from Mozilla: <a
                href={ 'https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored' }>https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></b>
              </li>
              <li className="ml-5 mt-2"><b>For the Safari web browser, please visit this page from Apple: <a
                href={ 'https://support.apple.com/kb/PH21411?locale=en_US' }>https://support.apple.com/kb/PH21411?locale=en_US</a></b>
              </li>
              <li className="ml-5 mt-2"><b>For any other web browser, please visit your web browser’s official web
                pages.</b></li>
            </ul>
          </p>
          <h3 className="mb-4 text-lg">Will we change this Privacy Policy?</h3>
          <p className="mb-4 text-lg text-gray-600">
            We are constantly trying to improve our Website and Services, so we may need to change this Privacy Policy
            from time to time as well. We will alert you to material changes by placing a notice on our Website and/or
            by sending you an email (if you have registered your e-mail details with us) when we are required to do so
            by applicable law. You can see when this Privacy Policy was last updated by checking the date at the top of
            this page. You are responsible for periodically reviewing this Privacy Policy.
          </p>
          <h3 className="mb-4 text-lg">Where can you find more information about cookies?</h3>
          <p className="mb-4 text-lg text-gray-600">
            You can learn more about cookies at the following third-party websites:
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              <li className="ml-5 mt-2"><b>All About Cookies: <a
                href={ 'http://www.allaboutcookies.org/' }>http://www.allaboutcookies.org/</a></b>
              </li>
              <li className="ml-5 mt-2"><b>Network Advertising Initiative: <a
                href={ 'http://www.networkadvertising.org/' }>http://www.networkadvertising.org/</a></b>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default CookiesPolicy;
