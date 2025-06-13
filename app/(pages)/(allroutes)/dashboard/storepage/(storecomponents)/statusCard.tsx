interface StatusCardProps  {
  title: string;
  text: string;
  value: number;
  change: number;
  Icon: React.ElementType;
  color: string;
  iconColor: string;
};

const StatusCard = ({ title, text, value, change, Icon, color, iconColor }: StatusCardProps) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
          <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`} from last week
          </p>
         
        </div>
        <div className="p-3 rounded-full bg-opacity-20 bg-gray-500">
          <Icon className={`${iconColor} text-xl`} />
        </div>
      </div>
       <p className="text-sm font-extrabold text-red-500">{text}</p>
       <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
            View
          </button>
    </div>
  );
};

export default StatusCard