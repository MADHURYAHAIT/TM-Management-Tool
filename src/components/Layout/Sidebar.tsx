import { Home, Database, Rocket, RefreshCw, History, FileText } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'scripts', label: 'Scripts', icon: FileText },
  { id: 'history', label: 'Execution History', icon: History },
];

const categories = [
  { id: 'salesforce', label: 'Salesforce', icon: Database, color: 'text-blue-600 dark:text-blue-400' },
  { id: 'deployment', label: 'Deployment', icon: Rocket, color: 'text-green-600 dark:text-green-400' },
  { id: 'data-management', label: 'Data Management', icon: RefreshCw, color: 'text-orange-600 dark:text-orange-400' },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="p-4 space-y-6">
        {/* Main Menu */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </h3>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        {/* <div>
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
            Categories
          </h3>
          <div className="space-y-1">
            
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === `category-${category.id}`;
              return (
                <button
                  key={category.id}
                  onClick={() => onTabChange(`category-${category.id}`)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-gray-50 dark:bg-gray-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${category.color}`} />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div> */}
      </nav>
    </aside>
  );
}
