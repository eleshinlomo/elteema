'use client';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  image: string;
}

const TopProducts = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Aso oke',
      category: 'men clothes',
      price: 129.99,
      sales: 245,
      revenue: 31647.55,
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    },
   
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Products</h2>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-md object-cover"
              loading="lazy"
              width={48}
              height={48}
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                <span className="text-sm font-medium text-gray-800">N{product.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">{product.category}</p>
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-gray-500">{product.sales} sold</span>
                <span className="text-xs font-medium text-blue-500">${product.revenue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;