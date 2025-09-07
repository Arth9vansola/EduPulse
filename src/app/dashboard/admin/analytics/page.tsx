'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ServerIcon,
  GlobeAltIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock analytics data for admin
const mockSystemAnalytics = {
  userGrowth: {
    totalUsers: 1347,
    newThisMonth: 45,
    activeUsers: 1142,
    growthRate: 12.5
  },
  activityMetrics: {
    totalActivities: 8947,
    thisMonth: 567,
    approved: 7854,
    pending: 234,
    rejected: 859
  },
  systemPerformance: {
    uptime: 99.94,
    avgResponseTime: 145,
    totalRequests: 45678,
    errorRate: 0.12
  },
  departmentBreakdown: [
    { department: 'Computer Science', students: 456, faculty: 28, activities: 2341 },
    { department: 'Electronics', students: 398, faculty: 24, activities: 1987 },
    { department: 'Mechanical', students: 342, faculty: 22, activities: 1654 },
    { department: 'Civil', students: 151, faculty: 11, activities: 965 }
  ],
  monthlyTrends: [
    { month: 'Jan', users: 1156, activities: 423, reports: 12 },
    { month: 'Feb', users: 1198, activities: 467, reports: 15 },
    { month: 'Mar', users: 1234, activities: 512, reports: 18 },
    { month: 'Apr', users: 1267, activities: 543, reports: 14 },
    { month: 'May', users: 1289, activities: 578, reports: 21 },
    { month: 'Jun', users: 1301, activities: 601, reports: 19 },
    { month: 'Jul', users: 1324, activities: 634, reports: 16 },
    { month: 'Aug', users: 1339, activities: 598, reports: 22 },
    { month: 'Sep', users: 1347, activities: 567, reports: 18 }
  ],
  topPerformingDepartments: [
    { department: 'Computer Science', score: 94.2, trend: 'up' },
    { department: 'Electronics', score: 91.8, trend: 'up' },
    { department: 'Mechanical', score: 88.5, trend: 'down' },
    { department: 'Civil', score: 85.1, trend: 'up' }
  ]
};

// Analytics Card Component
const AdminAnalyticsCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: { value: number; isPositive: boolean };
  subtitle?: string;
}> = ({ title, value, icon, color, trend, subtitle }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-500',
    green: 'bg-green-500/20 text-green-500',
    yellow: 'bg-yellow-500/20 text-yellow-500',
    red: 'bg-red-500/20 text-red-500',
    purple: 'bg-purple-500/20 text-purple-500'
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend.isPositive ? (
                <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              {trend.value}% from last month
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Chart Component
const AdminChart: React.FC<{ data: any[]; title: string }> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.users, item.activities)));
  
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm text-gray-400">{item.month}</div>
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <div 
                  className="bg-blue-500/30 h-6 rounded"
                  style={{ width: `${(item.users / maxValue) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center px-2 text-xs text-white">
                  {item.users} users
                </span>
              </div>
              <div className="relative flex-1">
                <div 
                  className="bg-green-500/30 h-6 rounded"
                  style={{ width: `${(item.activities / maxValue) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center px-2 text-xs text-white">
                  {item.activities} activities
                </span>
              </div>
              <div className="relative flex-1">
                <div 
                  className="bg-purple-500/30 h-6 rounded"
                  style={{ width: `${(item.reports / 25) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center px-2 text-xs text-white">
                  {item.reports} reports
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500/30 rounded mr-2"></div>
          Users
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500/30 rounded mr-2"></div>
          Activities
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500/30 rounded mr-2"></div>
          Reports
        </div>
      </div>
    </div>
  );
};

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('users');

  return (
    <div className="space-y-8">
      <Header 
        title="System Analytics" 
        subtitle="Comprehensive system performance and usage analytics" 
      />

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex space-x-4">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select 
            value={selectedMetric} 
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="input"
          >
            <option value="users">User Metrics</option>
            <option value="activities">Activity Metrics</option>
            <option value="performance">System Performance</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-secondary">Export Data</button>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AdminAnalyticsCard 
          title="Total Users" 
          value={mockSystemAnalytics.userGrowth.totalUsers.toLocaleString()}
          icon={<UsersIcon className="w-6 h-6" />}
          color="blue"
          trend={{ value: mockSystemAnalytics.userGrowth.growthRate, isPositive: true }}
          subtitle="All roles combined"
        />
        <AdminAnalyticsCard 
          title="Active Users" 
          value={mockSystemAnalytics.userGrowth.activeUsers.toLocaleString()}
          icon={<GlobeAltIcon className="w-6 h-6" />}
          color="green"
          trend={{ value: 8.3, isPositive: true }}
          subtitle="Last 30 days"
        />
        <AdminAnalyticsCard 
          title="Total Activities" 
          value={mockSystemAnalytics.activityMetrics.totalActivities.toLocaleString()}
          icon={<AcademicCapIcon className="w-6 h-6" />}
          color="purple"
          trend={{ value: 15.2, isPositive: true }}
          subtitle="All time"
        />
        <AdminAnalyticsCard 
          title="System Uptime" 
          value={`${mockSystemAnalytics.systemPerformance.uptime}%`}
          icon={<ServerIcon className="w-6 h-6" />}
          color="green"
          trend={{ value: 0.1, isPositive: true }}
          subtitle="This month"
        />
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <AdminChart data={mockSystemAnalytics.monthlyTrends} title="Monthly Trends" />

        {/* Department Performance */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Department Performance</h3>
          <div className="space-y-4">
            {mockSystemAnalytics.topPerformingDepartments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                <div>
                  <p className="font-medium text-white">{dept.department}</p>
                  <p className="text-sm text-gray-400">Performance Score</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold text-white">{dept.score}%</span>
                  <div className={`flex items-center ${
                    dept.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {dept.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Department Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Students</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Faculty</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Activities</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Avg per Student</th>
              </tr>
            </thead>
            <tbody>
              {mockSystemAnalytics.departmentBreakdown.map((dept, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-white font-medium">{dept.department}</td>
                  <td className="py-3 px-4 text-gray-300">{dept.students}</td>
                  <td className="py-3 px-4 text-gray-300">{dept.faculty}</td>
                  <td className="py-3 px-4 text-gray-300">{dept.activities}</td>
                  <td className="py-3 px-4 text-gray-300">
                    {(dept.activities / dept.students).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="card text-center">
          <div className="text-green-500 mb-2">
            <ServerIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">Avg Response Time</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockSystemAnalytics.systemPerformance.avgResponseTime}ms
          </p>
          <p className="text-sm text-gray-400">Last 24 hours</p>
        </div>

        <div className="card text-center">
          <div className="text-blue-500 mb-2">
            <ChartBarIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">Total Requests</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockSystemAnalytics.systemPerformance.totalRequests.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">This month</p>
        </div>

        <div className="card text-center">
          <div className="text-yellow-500 mb-2">
            <ClockIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">Error Rate</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockSystemAnalytics.systemPerformance.errorRate}%
          </p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>

        <div className="card text-center">
          <div className="text-purple-500 mb-2">
            <CalendarIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">New Users</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockSystemAnalytics.userGrowth.newThisMonth}
          </p>
          <p className="text-sm text-gray-400">This month</p>
        </div>
      </div>
    </div>
  );
}
