'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import StatCard from '@/components/dashboard/StatCard';
import { 
  UsersIcon, AcademicCapIcon, DocumentTextIcon, 
  ServerIcon, ExclamationTriangleIcon, ChartBarIcon 
} from '@heroicons/react/24/outline';

// Mock data for admin dashboard
const mockAdminData = {
  totalUsers: {
    students: 1250,
    faculty: 85,
    admins: 12
  },
  systemHealth: {
    uptime: '99.9%',
    storage: '68%',
    activeUsers: 432
  },
  recentActivity: {
    totalActivities: 2847,
    thisMonth: 156,
    pendingReviews: 23,
    flaggedIssues: 3
  }
};

const mockRecentSystemActivity = [
  {
    id: 1,
    action: 'New user registration',
    user: 'John Doe (Student)',
    time: '2 hours ago',
    type: 'user'
  },
  {
    id: 2,
    action: 'Report generated',
    user: 'Prof. Sarah Johnson',
    time: '4 hours ago',
    type: 'report'
  },
  {
    id: 3,
    action: 'System backup completed',
    user: 'System',
    time: '6 hours ago',
    type: 'system'
  },
  {
    id: 4,
    action: 'Bulk user import',
    user: 'Admin User',
    time: '1 day ago',
    type: 'admin'
  }
];

const mockFlaggedIssues = [
  {
    id: 1,
    title: 'Suspicious activity pattern',
    description: 'Multiple failed login attempts from IP 192.168.1.100',
    severity: 'high',
    time: '1 hour ago'
  },
  {
    id: 2,
    title: 'Storage threshold exceeded',
    description: 'Database storage is at 85% capacity',
    severity: 'medium',
    time: '3 hours ago'
  },
  {
    id: 3,
    title: 'Pending reviews timeout',
    description: 'Some faculty reviews are pending for more than 7 days',
    severity: 'low',
    time: '1 day ago'
  }
];

// System Activity Component
const SystemActivityList: React.FC<{ activities: any[] }> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UsersIcon className="w-5 h-5 text-blue-500" />;
      case 'report':
        return <DocumentTextIcon className="w-5 h-5 text-green-500" />;
      case 'system':
        return <ServerIcon className="w-5 h-5 text-purple-500" />;
      case 'admin':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <ChartBarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Recent System Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{activity.action}</p>
              <p className="text-sm text-gray-400">{activity.user}</p>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Flagged Issues Component
const FlaggedIssuesList: React.FC<{ issues: any[] }> = ({ issues }) => {
  const getSeverityBadge = (severity: string) => {
    const severityStyles = {
      high: 'bg-red-500/20 text-red-500',
      medium: 'bg-yellow-500/20 text-yellow-500',
      low: 'bg-blue-500/20 text-blue-500'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${severityStyles[severity as keyof typeof severityStyles]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Flagged Issues</h3>
      <div className="space-y-3">
        {issues.map((issue) => (
          <div key={issue.id} className="p-4 bg-gray-700 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-white">{issue.title}</h4>
              {getSeverityBadge(issue.severity)}
            </div>
            <p className="text-sm text-gray-300 mb-2">{issue.description}</p>
            <p className="text-xs text-gray-400">{issue.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <Header 
        title="Admin Dashboard" 
        subtitle="System overview and management" 
      />

      {/* User Statistics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard 
            title="Students" 
            value={mockAdminData.totalUsers.students} 
            icon={<AcademicCapIcon className="w-6 h-6" />}
            color="blue"
            change={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Faculty" 
            value={mockAdminData.totalUsers.faculty} 
            icon={<UsersIcon className="w-6 h-6" />}
            color="green"
          />
          <StatCard 
            title="Admins" 
            value={mockAdminData.totalUsers.admins} 
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            color="purple"
          />
        </div>
      </div>

      {/* System Health */}
      <div>
        <h3 className="text-lg font-semibold mb-4">System Health</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard 
            title="System Uptime" 
            value={mockAdminData.systemHealth.uptime} 
            icon={<ServerIcon className="w-6 h-6" />}
            color="green"
          />
          <StatCard 
            title="Storage Usage" 
            value={mockAdminData.systemHealth.storage} 
            icon={<ChartBarIcon className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard 
            title="Active Users" 
            value={mockAdminData.systemHealth.activeUsers} 
            icon={<UsersIcon className="w-6 h-6" />}
            color="blue"
          />
        </div>
      </div>

      {/* Activity Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
        <div className="grid gap-6 md:grid-cols-4">
          <StatCard 
            title="Total Activities" 
            value={mockAdminData.recentActivity.totalActivities} 
            icon={<DocumentTextIcon className="w-6 h-6" />}
            color="blue"
          />
          <StatCard 
            title="This Month" 
            value={mockAdminData.recentActivity.thisMonth} 
            icon={<ChartBarIcon className="w-6 h-6" />}
            color="green"
            change={{ value: 23, isPositive: true }}
          />
          <StatCard 
            title="Pending Reviews" 
            value={mockAdminData.recentActivity.pendingReviews} 
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard 
            title="Flagged Issues" 
            value={mockAdminData.recentActivity.flaggedIssues} 
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            color="red"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent System Activity */}
        <SystemActivityList activities={mockRecentSystemActivity} />

        {/* Flagged Issues */}
        <FlaggedIssuesList issues={mockFlaggedIssues} />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="card text-center">
          <h4 className="font-medium mb-2">Manage Users</h4>
          <p className="text-sm text-gray-400 mb-4">Add, edit, or remove users</p>
          <Link href="/dashboard/admin/users" className="btn btn-primary">
            Manage
          </Link>
        </div>

        <div className="card text-center">
          <h4 className="font-medium mb-2">System Reports</h4>
          <p className="text-sm text-gray-400 mb-4">Generate compliance reports</p>
          <Link href="/dashboard/admin/reports" className="btn btn-secondary">
            Generate
          </Link>
        </div>

        <div className="card text-center">
          <h4 className="font-medium mb-2">Analytics</h4>
          <p className="text-sm text-gray-400 mb-4">View detailed analytics</p>
          <Link href="/dashboard/admin/analytics" className="btn btn-secondary">
            View Analytics
          </Link>
        </div>

        <div className="card text-center">
          <h4 className="font-medium mb-2">Settings</h4>
          <p className="text-sm text-gray-400 mb-4">Configure system settings</p>
          <Link href="/dashboard/admin/settings" className="btn btn-secondary">
            Configure
          </Link>
        </div>
      </div>
    </div>
  );
}
