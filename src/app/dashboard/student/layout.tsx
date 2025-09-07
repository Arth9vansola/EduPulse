'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUser, UserRole } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useUser();
  const router = useRouter();

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    // If no role or wrong role, redirect to home
    if (!role) {
      router.push('/');
    } else if (role !== 'student') {
      router.push(`/dashboard/${role}`);
    }
  }, [role, router]);

  // Show nothing while checking authentication
  if (!role || role !== 'student') {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
