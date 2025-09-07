'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { 
  Bars3Icon, XMarkIcon, HomeIcon, DocumentTextIcon, 
  AcademicCapIcon, UserIcon, CogIcon, ChartBarIcon,
  BriefcaseIcon, DocumentDuplicateIcon, UsersIcon
} from '@heroicons/react/24/outline';

interface NavItemProps {
  href: string;
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, text, icon, isActive }) => {
  return (
    <li>
      <Link 
        href={href}
        className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { role, logout } = useUser();

  // Navigation links based on role
  let navLinks: Array<{ href: string; text: string; icon: React.ReactNode }> = [];

  if (role === 'student') {
    navLinks = [
      { href: '/dashboard/student', text: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
      { href: '/dashboard/student/activities', text: 'Activities', icon: <DocumentTextIcon className="w-5 h-5" /> },
      { href: '/dashboard/student/portfolio', text: 'Portfolio', icon: <AcademicCapIcon className="w-5 h-5" /> },
      { href: '/dashboard/student/analytics', text: 'Analytics', icon: <ChartBarIcon className="w-5 h-5" /> },
      { href: '/dashboard/student/profile', text: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
    ];
  } else if (role === 'faculty') {
    navLinks = [
      { href: '/dashboard/faculty', text: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
      { href: '/dashboard/faculty/submissions', text: 'Submissions', icon: <DocumentDuplicateIcon className="w-5 h-5" /> },
      { href: '/dashboard/faculty/analytics', text: 'Analytics', icon: <ChartBarIcon className="w-5 h-5" /> },
      { href: '/dashboard/faculty/reports', text: 'Reports', icon: <DocumentTextIcon className="w-5 h-5" /> },
      { href: '/dashboard/faculty/profile', text: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
    ];
  } else if (role === 'admin') {
    navLinks = [
      { href: '/dashboard/admin', text: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
      { href: '/dashboard/admin/users', text: 'User Management', icon: <UsersIcon className="w-5 h-5" /> },
      { href: '/dashboard/admin/analytics', text: 'Analytics', icon: <ChartBarIcon className="w-5 h-5" /> },
      { href: '/dashboard/admin/reports', text: 'Reports', icon: <DocumentTextIcon className="w-5 h-5" /> },
      { href: '/dashboard/admin/settings', text: 'Settings', icon: <CogIcon className="w-5 h-5" /> },
    ];
  }

  const handleLogout = () => {
    logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 bg-gray-900">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? 
            <XMarkIcon className="w-6 h-6" /> : 
            <Bars3Icon className="w-6 h-6" />
          }
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 w-full md:w-64 flex-shrink-0 ${
          sidebarOpen ? 'block' : 'hidden'
        } md:block transition-all duration-300`}
      >
        <div className="p-4 border-b border-gray-800">
          <Link href="/" className="text-2xl font-bold text-white">
            EduPulse
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <NavItem
                key={index}
                href={link.href}
                text={link.text}
                icon={link.icon}
                isActive={pathname === link.href}
              />
            ))}
            <li className="pt-4 border-t border-gray-800 mt-6">
              <button 
                onClick={handleLogout}
                className="nav-link w-full text-left text-red-400 hover:text-red-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-800">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
