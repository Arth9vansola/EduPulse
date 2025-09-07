'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import StatCard from '@/components/dashboard/StatCard';
import Notification from '@/components/dashboard/Notification';
import ActivityCard from '@/components/dashboard/ActivityCard';
import { 
  ChartBarIcon, DocumentTextIcon, 
  AcademicCapIcon, DocumentCheckIcon 
} from '@heroicons/react/24/outline';

// Mock data - would come from API in a real app
const mockNotifications = [
  { 
    id: 1, 
    title: 'Certificate Approved', 
    message: 'Your Java Programming Certificate has been approved by Prof. Johnson.', 
    time: '2 hours ago', 
    type: 'success',
    read: false
  },
  { 
    id: 2, 
    title: 'Submission Reminder', 
    message: 'You have 3 days left to submit your project documentation.', 
    time: '1 day ago', 
    type: 'warning',
    read: true
  },
  { 
    id: 3, 
    title: 'New Opportunity', 
    message: 'New internship opportunity posted by the department.', 
    time: '3 days ago', 
    type: 'info',
    read: true
  },
];

const mockRecentActivities = [
  {
    id: 1,
    title: 'Java Programming Certificate',
    type: 'Certificate',
    date: 'Sep 5, 2025',
    status: 'approved',
    description: 'Oracle Java SE Professional Certification'
  },
  {
    id: 2,
    title: 'Web Development Project',
    type: 'Project',
    date: 'Aug 28, 2025',
    status: 'pending',
    description: 'E-commerce website built with React and Node.js'
  },
  {
    id: 3,
    title: 'Tech Conference',
    type: 'Event',
    date: 'Aug 15, 2025',
    status: 'approved',
    description: 'Attended DevCon 2025'
  },
];

export default function StudentDashboard() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [recentActivities, setRecentActivities] = useState(mockRecentActivities);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="space-y-8">
      <Header 
        title="Student Dashboard" 
        subtitle="Welcome back, John Doe" 
      />

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Pending Submissions" 
          value="3" 
          icon={<DocumentTextIcon className="w-6 h-6" />}
          color="yellow"
        />
        <StatCard 
          title="Approved Activities" 
          value="12" 
          icon={<DocumentCheckIcon className="w-6 h-6" />}
          color="green"
          change={{ value: 25, isPositive: true }}
        />
        <StatCard 
          title="Portfolio Strength" 
          value="85%" 
          icon={<AcademicCapIcon className="w-6 h-6" />}
          color="blue"
          change={{ value: 10, isPositive: true }}
        />
        <StatCard 
          title="Total Certifications" 
          value="7" 
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Recent Activities and Notifications */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityCard 
                key={activity.id}
                title={activity.title}
                type={activity.type}
                date={activity.date}
                status={activity.status as 'pending' | 'approved' | 'rejected'}
                description={activity.description}
              />
            ))}
          </div>
        </div>

        {/* Notifications */}
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
    </div>
  );
}
