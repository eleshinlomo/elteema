import Hero from "../../../../components/hero"

const CreateStoreLandingPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <Hero />
      
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Start Selling to Millions on Elteema
        </h1>
        
        <p className="text-xl text-gray-600">
          Create your store in minutes and reach over 200 million Nigerians. 
          Showcase your products and services to customers both at home and in the diaspora.
        </p>
      </section>

      <section className="bg-blue-50 rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Store Options</h2>
        <p className="text-gray-700">You can open a store as:</p>
        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="" disabled selected>Select store type</option>
          <option value="individual">Individual Seller</option>
          <option value="business">Registered Business</option>
        </select>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">What You Need to Get Started</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800">For Individual Sellers</h3>
              <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                <li>Valid government-issued ID</li>
                <li>Bank verification number (BVN)</li>
                <li>Active bank account details</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800">For Businesses</h3>
              <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                <li>Company registration documents</li>
                <li>Tax identification number (TIN)</li>
                <li>Official company bank account</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-8">
        <a href='/dashboard/createstorepage'>
          <button className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md">
            Create Your Store Now
          </button>
        </a>
      </div>
    </div>
  )
}

export default CreateStoreLandingPage