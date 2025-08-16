import { useState } from "react";

const ProductSuggestionWidget = ()=> {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customRequest, setCustomRequest] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const productCategories = [
    "Electronics",
    "Home Decor",
    "Fashion",
    "Grocery",
    "Books",
    "Fitness Gear",
    "Pet Supplies",
  ];

  

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { selectedOptions, customRequest, email });
    // Send to your backend/analytics (e.g., Firebase, Airtable)
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
        <h3 className="text-green-600 font-medium">Thank you!</h3>
        <p className="text-gray-600 mt-1">
          We’ll work on adding your suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-md mx-auto">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        Can't find what you need?
      </h3>
      <p className="text-gray-600 mb-4">
        Help us stock up by telling us what you&apos;re looking for:
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-4">
          {productCategories.map((category) => (
            <label key={category} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedOptions.includes(category)}
                onChange={() => toggleOption(category)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Something else? (Optional)
          </label>
          <input
            type="text"
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            placeholder="e.g., Organic baby clothes"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Get notified when we add these items? (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Suggestions
        </button>
      </form>
    </div>
  );
}

export default ProductSuggestionWidget