import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 font-sans text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Elteema Cookie Policy</h1>
        <p className="text-lg text-gray-600">Last Updated: July 2025</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-green-100">
        <p className="mb-4">
          At Elteema, we use cookies to enhance your shopping experience on our ecommerce platform. 
          This policy explains how we use cookies and similar technologies when you visit our website.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6 mb-3">What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you visit websites. They help the site remember 
          your preferences and improve functionality.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6 mb-3">How We Use Cookies</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Essential cookies for site functionality</li>
          <li>Preference cookies to remember your selections</li>
          <li>Analytics cookies to understand how customers use our platform</li>
          <li>Marketing cookies to show relevant Nigerian products</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-700 mt-6 mb-3">Managing Cookies</h2>
        <p>
          You can control cookies through your browser settings. However, disabling some cookies may affect 
          your ability to use certain features of our platform.
        </p>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <p className="font-medium text-green-800">
            By continuing to use Elteema, you consent to our use of cookies as described in this policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;