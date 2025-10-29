import * as Icons from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
          {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
              ${
                trend.isPositive
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
              }`}
          >
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}
