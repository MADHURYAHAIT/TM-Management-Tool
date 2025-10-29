import { useState } from 'react';
import { Search } from 'lucide-react';
import { ScriptConfig } from '../types';
import ScriptCard from '../components/Script/ScriptCard';

interface ScriptsProps {
  scripts: ScriptConfig[];
  onSelectScript: (script: ScriptConfig) => void;
  filterCategory?: string;
}

export default function Scripts({ scripts, onSelectScript, filterCategory }: ScriptsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(filterCategory || 'all');

  const categories = ['all', ...new Set(scripts.map((s) => s.category))];

  const filteredScripts = scripts.filter((script) => {
    const matchesSearch =
      script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || script.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scripts</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Select and execute scripts for various tasks
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search scripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Script cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScripts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No scripts found matching your criteria
            </p>
          </div>
        ) : (
          filteredScripts.map((script) => (
            <ScriptCard key={script.id} script={script} onSelect={() => onSelectScript(script)} />
          ))
        )}
      </div>
    </div>
  );
}
