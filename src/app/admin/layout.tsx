'use client'
import { useAuth } from '@/hooks/useAuth'
import DashboardHeader from '@/components/admin/DashboardHeader'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect to login if not authenticated
  useAuth()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin'

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <DashboardHeader />}
      {children}
    </div>
  )
}