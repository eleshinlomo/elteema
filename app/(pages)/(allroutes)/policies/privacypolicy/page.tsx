import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4  font-sans py-24 ">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Elteema Privacy Policy</h1>
        <p className="text-lg text-gray-600">Last Updated: July 2025</p>
        <p className="text-sm text-gray-500 mt-2">
          Protecting the privacy of our customers and partners
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-3">1. Information We Collect</h2>
          <p className="mb-4">
            When you use Elteema, we collect information to provide our services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Personal details (name, contact information)</li>
            <li>Payment information (processed securely)</li>
            <li>Delivery addresses within Nigeria and internationally</li>
            <li>Browsing behavior on our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-3">2. Use of Information</h2>
          <p className="mb-4">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Process your orders</li>
            <li>Improve our platform and services</li>
            <li>Communicate about your orders and promotions</li>
            <li>Support Nigerian artisans and farmers with market insights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-3">3. Data Sharing</h2>
          <p className="mb-4">
            As a subsidiary of Petrolage Group, we may share aggregated data with our parent company. 
            We only share personal information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Delivery partners to fulfill orders</li>
            <li>Payment processors for transaction completion</li>
            <li>When required by Nigerian law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-3">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate measures to protect your information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Secure servers with encryption</li>
            <li>Limited access to personal data</li>
            <li>Regular security audits</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-3">5. Your Rights</h2>
          <p className="mb-4">
            Under Nigerian data protection regulations, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal requirements)</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">Contact Us</h3>
          <p className="text-green-700">
            For privacy concerns or requests, contact our Data Protection Officer at:<br />
            <span className="font-medium">support@petrolage.tech</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;