'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

// Mock analytics data
const mockAnalyticsData = {
  studentPerformance: {
    totalStudents: 45,
    activeStudents: 42,
    averageActivities: 8.5,
    topPerformers: 12,
    needsAttention: 5
  },
  activityStats: {
    totalActivities: 382,
    approved: 298,
    pending: 56,
    rejected: 28,
    approvalRate: 78.0
  },
  monthlyTrends: [
    { month: 'Jan', submissions: 45, approvals: 38 },
    { month: 'Feb', submissions: 52, approvals: 44 },
    { month: 'Mar', submissions: 48, approvals: 41 },
    { month: 'Apr', submissions: 61, approvals: 53 },
    { month: 'May', submissions: 58, approvals: 47 },
    { month: 'Jun', submissions: 64, approvals: 55 },
    { month: 'Jul', submissions: 59, approvals: 48 },
    { month: 'Aug', submissions: 67, approvals: 58 },
    { month: 'Sep', submissions: 28, approvals: 24 }
  ],
  categoryBreakdown: [
    { category: 'Certificates', count: 145, percentage: 38 },
    { category: 'Projects', count: 98, percentage: 26 },
    { category: 'Internships', count: 76, percentage: 20 },
    { category: 'Competitions', count: 43, percentage: 11 },
    { category: 'Workshops', count: 20, percentage: 5 }
  ],
  topStudents: [
    { name: 'John Doe', rollNumber: 'CS2023001', activities: 15, approvalRate: 93 },
    { name: 'Jane Smith', rollNumber: 'CS2023002', activities: 14, approvalRate: 89 },
    { name: 'Mike Johnson', rollNumber: 'CS2023003', activities: 13, approvalRate: 85 },
    { name: 'Sarah Wilson', rollNumber: 'CS2023004', activities: 12, approvalRate: 92 },
    { name: 'David Brown', rollNumber: 'CS2023005', activities: 11, approvalRate: 88 }
  ]
};

// Analytics Card Component
const AnalyticsCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: { value: number; isPositive: boolean };
}> = ({ title, value, icon, color, trend }) => {
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

// Chart Component (Simple Bar Chart)
const SimpleBarChart: React.FC<{ data: any[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.submissions));
  
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Monthly Submission Trends</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm text-gray-400">{item.month}</div>
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <div 
                  className="bg-blue-500/30 h-6 rounded"
                  style={{ width: `${(item.submissions / maxValue) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center px-2 text-xs text-white">
                  {item.submissions} submissions
                </span>
              </div>
              <div className="relative flex-1">
                <div 
                  className="bg-green-500/30 h-6 rounded"
                  style={{ width: `${(item.approvals / maxValue) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center px-2 text-xs text-white">
                  {item.approvals} approved
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500/30 rounded mr-2"></div>
          Submissions
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500/30 rounded mr-2"></div>
          Approvals
        </div>
      </div>
    </div>
  );
};

export default function FacultyAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  return (
    <div className="space-y-8">
      <Header 
        title="Faculty Analytics" 
        subtitle="Comprehensive analytics dashboard for student activity tracking" 
      />

      {/* Period Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label className="text-sm font-medium text-gray-300 whitespace-nowrap">Time Period:</label>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="form-select min-w-[140px] bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="weekly" className="bg-gray-800 text-white">Weekly</option>
            <option value="monthly" className="bg-gray-800 text-white">Monthly</option>
            <option value="semester" className="bg-gray-800 text-white">Semester</option>
            <option value="yearly" className="bg-gray-800 text-white">Yearly</option>
          </select>
        </div>
        <button className="btn btn-primary whitespace-nowrap">Export Report</button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Total Students" 
          value={mockAnalyticsData.studentPerformance.totalStudents}
          icon={<UsersIcon className="w-6 h-6" />}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <AnalyticsCard 
          title="Active Students" 
          value={mockAnalyticsData.studentPerformance.activeStudents}
          icon={<AcademicCapIcon className="w-6 h-6" />}
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        <AnalyticsCard 
          title="Approval Rate" 
          value={`${mockAnalyticsData.activityStats.approvalRate}%`}
          icon={<CheckCircleIcon className="w-6 h-6" />}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <AnalyticsCard 
          title="Avg Activities/Student" 
          value={mockAnalyticsData.studentPerformance.averageActivities}
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="purple"
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends Chart */}
        <SimpleBarChart data={mockAnalyticsData.monthlyTrends} />

        {/* Activity Breakdown */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Activity Category Breakdown</h3>
          <div className="space-y-4">
            {mockAnalyticsData.categoryBreakdown.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded" style={{
                    backgroundColor: `hsl(${index * 72}, 70%, 60%)`
                  }}></div>
                  <span className="text-gray-300">{category.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{category.count}</span>
                  <span className="text-gray-400 text-sm">({category.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Students */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Top Performing Students</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Roll Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Activities</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Approval Rate</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalyticsData.topStudents.map((student, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-gray-300">#{index + 1}</td>
                  <td className="py-3 px-4 text-white font-medium">{student.name}</td>
                  <td className="py-3 px-4 text-gray-300">{student.rollNumber}</td>
                  <td className="py-3 px-4 text-white">{student.activities}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      student.approvalRate >= 90 ? 'bg-green-500/20 text-green-500' :
                      student.approvalRate >= 80 ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {student.approvalRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card text-center">
          <div className="text-green-500 mb-2">
            <CheckCircleIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">High Performers</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockAnalyticsData.studentPerformance.topPerformers}
          </p>
          <p className="text-sm text-gray-400">Students with 90%+ approval rate</p>
        </div>

        <div className="card text-center">
          <div className="text-yellow-500 mb-2">
            <ClockIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">Pending Reviews</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockAnalyticsData.activityStats.pending}
          </p>
          <p className="text-sm text-gray-400">Activities awaiting review</p>
        </div>

        <div className="card text-center">
          <div className="text-red-500 mb-2">
            <XCircleIcon className="w-8 h-8 mx-auto" />
          </div>
          <h4 className="font-medium mb-2">Need Attention</h4>
          <p className="text-2xl font-bold text-white mb-1">
            {mockAnalyticsData.studentPerformance.needsAttention}
          </p>
          <p className="text-sm text-gray-400">Students with low activity</p>
        </div>
      </div>
    </div>
  );
}
