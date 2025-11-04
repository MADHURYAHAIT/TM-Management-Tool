import * as Icons from 'lucide-react';
import { ScriptConfig } from '../../types';

interface ScriptCardProps {
  script: ScriptConfig;
  onSelect: () => void;
}

export default function ScriptCard({ script, onSelect }: ScriptCardProps) {
  const IconComponent = Icons[script.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Salesforce': 'from-blue-500 to-blue-600',
      'Deployment': 'from-green-500 to-green-600',
      'Data Management': 'from-orange-500 to-orange-600',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <button
      onClick={onSelect}
      className="group w-full text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start space-x-4">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${getCategoryColor(script.category)} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
        >
          {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {script.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {script.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
            Fields: {script.fields.map(f => f.label).join(', ')}
          </p>
              <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {script.category}
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {script.action} →
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
