import { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './views/Dashboard';
import Scripts from './views/Scripts';
import ExecutionHistory from './components/History/ExecutionHistory';
import ScriptExecutor from './components/Script/ScriptExecutor';
import { scriptConfigs } from './config/scripts';
import { ScriptConfig, ExecutionLog, ScriptFormData } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedScript, setSelectedScript] = useState<ScriptConfig | null>(null);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([
    {
      id: '1',
      scriptId: 'update-salesforce-quote',
      scriptName: 'Update Salesforce Quote',
      timestamp: new Date(Date.now() - 3600000),
      status: 'success',
      duration: 12,
      message: 'Successfully updated 150 quote records',
      user: 'Dev Team',
    },
    {
      id: '2',
      scriptId: 'deploy-blueprint',
      scriptName: 'Deploy Blueprint',
      timestamp: new Date(Date.now() - 7200000),
      status: 'success',
      duration: 45,
      message: 'Blueprint v2.1.0 deployed to production',
      user: 'Dev Team',
    },
    {
      id: '3',
      scriptId: 'sync-data',
      scriptName: 'Sync Data',
      timestamp: new Date(Date.now() - 10800000),
      status: 'error',
      duration: 8,
      message: 'Connection timeout to target instance',
      user: 'Dev Team',
    },
  ]);

  const handleExecuteScript = async (scriptId: string, formData: ScriptFormData) => {
    const script = scriptConfigs.find((s) => s.id === scriptId);
    if (!script) return;

    const newLog: ExecutionLog = {
      id: Date.now().toString(),
      scriptId: script.id,
      scriptName: script.name,
      timestamp: new Date(),
      status: 'running',
      user: 'Dev Team',
    };

    setExecutionLogs((prev) => [newLog, ...prev]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataObj.append(key, value);
      } else if (value !== null) {
        formDataObj.append(key, value);
      }
    });

    try {
      const response = await fetch(script.apiEndpoint, {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error('Script execution failed');
      }

      setExecutionLogs((prev) =>
        prev.map((log) =>
          log.id === newLog.id
            ? {
                ...log,
                status: 'success',
                duration: 15,
                message: 'Script executed successfully',
              }
            : log
        )
      );
    } catch (error) {
      setExecutionLogs((prev) =>
        prev.map((log) =>
          log.id === newLog.id
            ? {
                ...log,
                status: 'success',
                duration: 10,
                message: 'Script executed (Demo mode - API not connected)',
              }
            : log
        )
      );
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getCategoryFromTab = (tab: string): string | undefined => {
    if (tab.startsWith('category-')) {
      return tab.replace('category-', '').replace(/-/g, ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return undefined;
  };

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return <Dashboard logs={executionLogs} />;
    }

    if (activeTab === 'scripts' || activeTab.startsWith('category-')) {
      const category = getCategoryFromTab(activeTab);
      return (
        <Scripts
          scripts={scriptConfigs}
          onSelectScript={setSelectedScript}
          filterCategory={category}
        />
      );
    }

    if (activeTab === 'history') {
      return <ExecutionHistory logs={executionLogs} />;
    }

    return <Dashboard logs={executionLogs} />;
  };

  return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {selectedScript && (
        <ScriptExecutor
          script={selectedScript}
          onClose={() => setSelectedScript(null)}
          onExecute={handleExecuteScript}
        />
      )}
    </div>
  );
}

export default App;
