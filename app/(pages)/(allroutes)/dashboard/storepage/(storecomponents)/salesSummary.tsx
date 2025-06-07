
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const SalesSummary = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,780',
      change: 12.5,
      isUp: true,
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: 8.2,
      isUp: true,
    },
    {
      title: 'Conversion Rate',
      value: '3.42%',
      change: -1.1,
      isUp: false,
    },
    {
      title: 'Avg. Order Value',
      value: '$89.34',
      change: 2.4,
      isUp: true,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales Summary</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
              <div className={`flex items-center ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                <span className="text-sm">{stat.change}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesSummary;