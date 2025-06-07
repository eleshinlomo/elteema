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
      name: 'Premium Sneakers',
      category: 'Footwear',
      price: 129.99,
      sales: 245,
      revenue: 31647.55,
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 89.99,
      sales: 189,
      revenue: 17008.11,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
      id: '3',
      name: 'Leather Wallet',
      category: 'Accessories',
      price: 49.99,
      sales: 156,
      revenue: 7798.44,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
      id: '4',
      name: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      sales: 98,
      revenue: 19599.02,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
      id: '5',
      name: 'Cotton T-Shirt',
      category: 'Clothing',
      price: 24.99,
      sales: 312,
      revenue: 7796.88,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
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
                <span className="text-sm font-medium text-gray-800">${product.price.toFixed(2)}</span>
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