import { Activity, CheckCircle, Clock, TrendingUp, XCircle } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { ExecutionLog } from '../types';

interface DashboardProps {
  logs: ExecutionLog[];
}

export default function Dashboard({ logs }: DashboardProps) {
  const successCount = logs.filter((log) => log.status === 'success').length;
  const errorCount = logs.filter((log) => log.status === 'error').length;
  const runningCount = logs.filter((log) => log.status === 'running').length;
  const totalExecutions = logs.length;

  const recentLogs = logs.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Overview of your script executions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Executions"
          value={totalExecutions}
          icon="Activity"
          color="from-blue-500 to-blue-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Successful"
          value={successCount}
          icon="CheckCircle"
          color="from-green-500 to-green-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Failed"
          value={errorCount}
          icon="XCircle"
          color="from-red-500 to-red-600"
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Running"
          value={runningCount}
          icon="Clock"
          color="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Section */}
        <div className="lg:col-span-2">
          <RecentActivity logs={recentLogs} />
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>

          <div className="space-y-4">
            {/* Success Rate */}
            {/* Success Rate */}
<div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 transition-colors duration-300">
  <div className="flex items-center space-x-3">
    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</span>
  </div>
  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
    {totalExecutions > 0 ? Math.round((successCount / totalExecutions) * 100) : 0}%
  </span>
</div>

{/* Average Duration */}
<div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30 transition-colors duration-300">
  <div className="flex items-center space-x-3">
    <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg. Duration</span>
  </div>
  <span className="text-lg font-bold text-green-600 dark:text-green-400">
    {logs.length > 0
      ? Math.round(
          logs.reduce((acc, log) => acc + (log.duration || 0), 0) / logs.length
        )
      : 0}
    s
  </span>
</div>

{/* This Week */}
<div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 transition-colors duration-300">
  <div className="flex items-center space-x-3">
    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Week</span>
  </div>
  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
    {totalExecutions}
  </span>
</div>


            {/* Average Duration */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg. Duration</span>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {logs.length > 0
                  ? Math.round(
                      logs.reduce((acc, log) => acc + (log.duration || 0), 0) / logs.length
                    )
                  : 0}
                s
              </span>
            </div>

            {/* This Week */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Week</span>
              </div>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {totalExecutions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
