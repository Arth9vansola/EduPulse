import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  change,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    red: 'bg-red-500/10 text-red-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
    purple: 'bg-purple-500/10 text-purple-500',
  };

  return (
    <div className="card border-t-4" style={{ borderTopColor: `var(--color-${color}-500)` }}>
      <div className="flex justify-between items-start">
        {icon && (
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
        <div className="text-right">
          {change && (
            <div className={`text-xs font-medium ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg text-gray-400 font-medium">{title}</h4>
        <p className="text-2xl font-semibold text-white mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
