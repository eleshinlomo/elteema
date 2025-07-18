import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 font-sans">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Elteema Terms of Service</h1>
        <p className="text-lg text-gray-600">Effective Date: July 2025</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 border border-green-100">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Elteema, a proudly Nigerian ecommerce platform specializing in locally made products 
            and farm produce. These Terms govern your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">2. Account Registration</h2>
          <p className="mb-4">
            To access certain features, you must create an account with accurate information about yourself. 
            You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">3. Purchases</h2>
          <p className="mb-4">
            All purchases of Nigerian-made goods through Elteema are subject to availability. We reserve 
            the right to limit quantities and reject orders.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">4. Nigerian Content</h2>
          <p className="mb-4">
            Elteema showcases Nigeria&apos;s cultural heritage. All products are sourced from Nigerian artisans 
            and farmers. We verify authenticity but cannot guarantee all traditional claims.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">5. Limitation of Liability</h2>
          <p>
            As a subsidiary of Petrolage Group, Elteema&apos;s liability is limited to the purchase price of 
            products. We are not liable for indirect damages from using our platform.
          </p>
        </section>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="font-medium text-amber-800">
            By using Elteema, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;