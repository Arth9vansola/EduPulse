'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const router = useRouter();
  const { login } = useUser();

  const handleRoleSelect = (role: 'student' | 'faculty' | 'admin') => {
    // Use the login function from context
    login(role);
    
    // Redirect to appropriate dashboard
    if (role === 'student') {
      router.push('/dashboard/student');
    } else if (role === 'faculty') {
      router.push('/dashboard/faculty');
    } else {
      router.push('/dashboard/admin');
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">EduPulse - Centralized Student Activity Record Platform</h1>
      </header>

      {/* Role Selection */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-24">
        <div className="w-full max-w-xl text-center">
          <h2 className="text-4xl font-bold mb-6">Welcome</h2>
          <p className="text-xl mb-12">
            Select your role to continue:
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Student Card */}
            <div 
              onClick={() => handleRoleSelect('student')}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Student</h3>
                <p className="mt-2 text-gray-400 text-sm">
                  Upload activities, manage portfolio, view progress
                </p>
              </div>
            </div>

            {/* Faculty Card */}
            <div 
              onClick={() => handleRoleSelect('faculty')}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Faculty</h3>
                <p className="mt-2 text-gray-400 text-sm">
                  Review submissions, generate reports, track mentorship
                </p>
              </div>
            </div>

            {/* Admin Card */}
            <div 
              onClick={() => handleRoleSelect('admin')}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Admin</h3>
                <p className="mt-2 text-gray-400 text-sm">
                  Manage users, configure system, generate analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} EduPulse - Centralized Student Activity Record Platform</p>
      </footer>
    </main>
  );
}
