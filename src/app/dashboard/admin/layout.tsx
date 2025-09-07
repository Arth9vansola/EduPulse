'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardLayout({
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
    } else if (role !== 'admin') {
      router.push(`/dashboard/${role}`);
    }
  }, [role, router]);

  // Show nothing while checking authentication
  if (!role || role !== 'admin') {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
