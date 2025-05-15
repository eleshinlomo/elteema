
import { FaLeaf, FaHandsHelping, FaGlobeAfrica, FaTshirt, FaCarrot } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connecting Nigeria&apos;s finest artisans and farmers with the world since 2025
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Welcome to Elteema</h2>
            <p className="text-gray-700 mb-4">
              Elteema is a proudly Nigerian ecommerce platform specializing in locally made clothing and farm produce. 
              Founded in 2025 as a subsidiary of Petrolage Group, we&apos;re committed to showcasing Nigeria&apos;s rich cultural 
              heritage and agricultural bounty to the global market.
            </p>
            <p className="text-gray-700 mb-4">
              Our name Elteema reflects our mission towards elevating traditional excellence to Modern Audiences. 
              We bridge the gap between talented Nigerian artisans, farmers, and conscious consumers worldwide.
            </p>
            <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-green-800 italic">
                From the looms of Aba to the farms of Ogun State, we bring authentic Nigerian quality to your doorstep.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FaTshirt className="text-green-600 text-4xl mb-3" />
              <h3 className="font-semibold text-green-800">100+ Artisans</h3>
              <p className="text-sm text-gray-600">Partnered across Nigeria</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FaCarrot className="text-green-600 text-4xl mb-3" />
              <h3 className="font-semibold text-green-800">50+ Farms</h3>
              <p className="text-sm text-gray-600">Providing fresh produce</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FaGlobeAfrica className="text-green-600 text-4xl mb-3" />
              <h3 className="font-semibold text-green-800">Global Reach</h3>
              <p className="text-sm text-gray-600">Shipping to 30+ countries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FaHandsHelping className="text-green-600 text-4xl mb-3" />
              <h3 className="font-semibold text-green-800">Community</h3>
              <p className="text-sm text-gray-600">Supporting local economies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-green-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaLeaf className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Sustainability</h3>
              <p className="text-gray-700">
                We promote eco-friendly practices from farm to fashion, ensuring minimal environmental impact.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaHandsHelping className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Fair Trade</h3>
              <p className="text-gray-700">
                Our artisans and farmers receive fair compensation for their exceptional work and products.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaGlobeAfrica className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Cultural Pride</h3>
              <p className="text-gray-700">
                We celebrate and preserve Nigerian heritage through authentic, high-quality products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Behind Elteema</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-200 mb-4 flex items-center justify-center text-green-800 text-4xl font-bold">PG</div>
            <h3 className="font-semibold text-green-800">Petrolage Group</h3>
            <p className="text-sm text-gray-600">Parent Company</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-200 mb-4 flex items-center justify-center text-green-800 text-4xl font-bold">25</div>
            <h3 className="font-semibold text-green-800">Dedicated Staff</h3>
            <p className="text-sm text-gray-600">Across Nigeria</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-200 mb-4 flex items-center justify-center text-green-800 text-4xl font-bold">150+</div>
            <h3 className="font-semibold text-green-800">Partners</h3>
            <p className="text-sm text-gray-600">Artisans & Farmers</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-200 mb-4 flex items-center justify-center text-green-800 text-4xl font-bold">You</div>
            <h3 className="font-semibold text-green-800">Our Customers</h3>
            <p className="text-sm text-gray-600">Global Community</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Movement</h2>
          <p className="text-xl mb-8">
            Whether you&apos;re a customer seeking authentic Nigerian products or an artisan looking to reach global markets, 
            Elteema is your platform for connection and growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href='/allstorespage'><button className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition">
              Shop Our Collection
            </button>
            </a>
            <a href='/dashboard/sellerpage'><button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Become a Partner
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;