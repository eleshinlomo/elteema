import { ChangeEvent, useEffect, useState, useRef, useContext } from "react";
import { FiSearch, FiX, FiClock, FiShoppingBag, FiTag } from "react-icons/fi";
import { ProductContext } from "../../contextProviders/ProductContext";

interface Product {
  productName: string;
  category: string;
}

const NewSearch = () => {
  const [showModal, setShowModal] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [savedSearchQueries, setSavedSearchQueries] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const { Products } = useContext(ProductContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value && !keywords.includes(value)) {
      setKeywords((prev) => [...prev, value]);
    }
    
    setShowModal(value.length > 0);
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = Products.filter(
      (product: Product) =>
        product.productName.toLowerCase().includes(inputValue.toLowerCase()) ||
        product.category.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(results);
  }, [inputValue, Products]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue) {
      window.location.href = `/categorypage/${inputValue}`;
    }
  };

  const clearSearch = () => {
    setInputValue("");
    setShowModal(false);
    setSearchResults([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  const saveSearchQueries = async () => {
    let queries = [...keywords];
    return new Promise<string[]>((resolve) => {
      setTimeout(() => resolve(queries), 500);
    });
  };

  useEffect(() => {
    const getSearchQueries = async () => {
      const queries = await saveSearchQueries();
      setSavedSearchQueries(queries);
    };

    if (keywords.length > 0) {
      getSearchQueries();
    }
  }, [keywords]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full py-12 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-2xl mx-auto px-4" ref={searchRef}>
        <div className="relative">
          <div
            className={`flex items-center border-2 rounded-full px-4 py-3 transition-all duration-300 ${
              isFocused
                ? "border-green-500 shadow-lg"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <FiSearch className="text-gray-500 mr-2" size={20} />
            <input
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for products..."
              value={inputValue}
            />
            {inputValue && (
              <button
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX size={20} />
              </button>
            )}
          </div>

          {showModal && (
            <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform origin-top max-h-96 overflow-y-auto">
              {searchResults.length > 0 && (
                <div className="divide-y divide-gray-100">
                  <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-500 flex items-center">
                    <FiShoppingBag className="mr-2" /> Product Matches
                  </div>
                  {searchResults.slice(0, 5).map((product, index) => (
                    <a
                      key={`product-${index}`}
                      href={`/categorypage/${encodeURIComponent(product.productName)}`}
                      className="block px-4 py-3 hover:bg-green-50 transition-colors duration-200 flex items-center"
                    >
                      <FiTag className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-gray-700 font-medium">{product.productName}</div>
                        <div className="text-xs text-gray-500">in {product.category}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="divide-y divide-gray-100">
                  <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-500 flex items-center">
                    <FiTag className="mr-2" /> Category Matches
                  </div>
                  {Array.from(new Set(searchResults.map(p => p.category)))
                    .slice(0, 3)
                    .map((category, index) => (
                      <a
                        key={`category-${index}`}
                        href={`/categorypage/${encodeURIComponent(category)}`}
                        className="block px-4 py-3 hover:bg-green-50 transition-colors duration-200 flex items-center"
                      >
                        <FiShoppingBag className="text-gray-400 mr-3" />
                        <span className="text-gray-700">{category}</span>
                      </a>
                    ))}
                </div>
              )}

              {savedSearchQueries?.length > 0 && searchResults.length === 0 && (
                <div className="divide-y divide-gray-100">
                  <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-500 flex items-center">
                    <FiClock className="mr-2" /> Recent searches
                  </div>
                  {savedSearchQueries
                    .sort()
                    .slice(0, 5)
                    .map((keyword, index) => (
                      <a
                        key={`recent-${index}`}
                        href={`/categorypage/${keyword.replace(/\s+/g, '-').toLowerCase()}`}
                        className="block px-4 py-3 hover:bg-green-50 transition-colors duration-200 flex items-center"
                      >
                        <FiSearch className="text-gray-400 mr-3" />
                        <span className="text-gray-700">{keyword}</span>
                      </a>
                    ))}
                </div>
              )}

              {searchResults.length === 0 && savedSearchQueries.length === 0 && inputValue && (
                <div className="p-4 text-center text-gray-500">
                  No results found for {inputValue}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSearch;