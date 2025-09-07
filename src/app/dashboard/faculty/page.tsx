'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import StatCard from '@/components/dashboard/StatCard';
import Notification from '@/components/dashboard/Notification';
import { 
  UsersIcon, ClockIcon, CheckCircleIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

// Mock data for faculty dashboard
const mockFacultyData = {
  assignedStudents: 45,
  pendingApprovals: 12,
  totalApproved: 156,
  averageReviewTime: 2.3
};

const mockRecentSubmissions = [
  {
    id: 1,
    studentName: 'John Doe',
    rollNumber: 'CS2023001',
    activityType: 'Certificate',
    activityTitle: 'AWS Cloud Practitioner',
    submissionDate: 'Sep 6, 2025',
    status: 'pending'
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    rollNumber: 'CS2023002',
    activityType: 'Project',
    activityTitle: 'E-commerce Website',
    submissionDate: 'Sep 5, 2025',
    status: 'pending'
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    rollNumber: 'CS2023003',
    activityType: 'Internship',
    activityTitle: 'Software Development Intern',
    submissionDate: 'Sep 4, 2025',
    status: 'reviewed'
  }
];

const mockNotifications = [
  {
    id: 1,
    title: 'New Submission',
    message: 'John Doe submitted a new certificate for review.',
    time: '1 hour ago',
    type: 'info',
    read: false
  },
  {
    id: 2,
    title: 'Deadline Reminder',
    message: 'You have 5 submissions pending review for more than 3 days.',
    time: '3 hours ago',
    type: 'warning',
    read: false
  },
  {
    id: 3,
    title: 'Monthly Report',
    message: 'Your monthly mentorship report is ready for download.',
    time: '1 day ago',
    type: 'success',
    read: true
  }
];

// Recent Submissions Component
const RecentSubmissionsTable: React.FC<{ submissions: any[] }> = ({ submissions }) => {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-500/20 text-yellow-500',
      reviewed: 'bg-blue-500/20 text-blue-500',
      approved: 'bg-green-500/20 text-green-500',
      rejected: 'bg-red-500/20 text-red-500'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recent Submissions</h3>
        <Link href="/dashboard/faculty/submissions" className="text-blue-400 hover:text-blue-300 text-sm">
          View All
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-300">Student</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Activity</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-white">{submission.studentName}</p>
                    <p className="text-sm text-gray-400">{submission.rollNumber}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">{submission.activityTitle}</td>
                <td className="py-3 px-4 text-gray-300">{submission.activityType}</td>
                <td className="py-3 px-4 text-gray-300">{submission.submissionDate}</td>
                <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function FacultyDashboard() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="space-y-8">
      <Header 
        title="Faculty Dashboard" 
        subtitle="Welcome back, Prof. Sarah Johnson" 
      />

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Assigned Students" 
          value={mockFacultyData.assignedStudents} 
          icon={<UsersIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatCard 
          title="Pending Approvals" 
          value={mockFacultyData.pendingApprovals} 
          icon={<ExclamationTriangleIcon className="w-6 h-6" />}
          color="yellow"
        />
        <StatCard 
          title="Total Approved" 
          value={mockFacultyData.totalApproved} 
          icon={<CheckCircleIcon className="w-6 h-6" />}
          color="green"
          change={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Avg Review Time" 
          value={`${mockFacultyData.averageReviewTime} days`} 
          icon={<ClockIcon className="w-6 h-6" />}
          color="purple"
          change={{ value: 15, isPositive: false }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Submissions - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentSubmissionsTable submissions={mockRecentSubmissions} />
        </div>

        {/* Notifications - Takes 1 column */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Notification 
                key={notification.id}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                type={notification.type as 'info' | 'success' | 'warning' | 'error'}
                read={notification.read}
                onClick={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card text-center">
          <h4 className="font-medium mb-2">Review Submissions</h4>
          <p className="text-sm text-gray-400 mb-4">Review pending student activity submissions</p>
          <Link href="/dashboard/faculty/submissions" className="btn btn-primary">
            Review Now
          </Link>
        </div>

        <div className="card text-center">
          <h4 className="font-medium mb-2">Generate Reports</h4>
          <p className="text-sm text-gray-400 mb-4">Create NAAC/NIRF compliance reports</p>
          <Link href="/dashboard/faculty/reports" className="btn btn-secondary">
            Generate Report
          </Link>
        </div>

        <div className="card text-center">
          <h4 className="font-medium mb-2">Student Analytics</h4>
          <p className="text-sm text-gray-400 mb-4">View detailed student progress analytics</p>
          <Link href="/dashboard/faculty/analytics" className="btn btn-secondary">
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
