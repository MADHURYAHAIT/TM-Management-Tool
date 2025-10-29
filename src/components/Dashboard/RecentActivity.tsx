import { Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { ExecutionLog } from '../../types';

interface RecentActivityProps {
  logs: ExecutionLog[];
}

export default function RecentActivity({ logs }: RecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
      case 'running':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {logs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No recent activity</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`border rounded-lg p-4 transition-colors duration-300 ${getStatusColor(log.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{log.scriptName}</p>
                    {log.message && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{log.message}</p>
                    )}
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{log.user}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(log.timestamp)}
                      </span>
                      {log.duration && (
                        <>
                          <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{log.duration}s</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
