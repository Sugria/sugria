'use client'
import { useState, useEffect } from 'react'
import StatCard from '@/components/admin/StatCard'
import QuickActions from '@/components/admin/QuickActions'

interface StatsResponse {
  data: {
    totalMembers: number
    totalApplications: number
  }
}

interface DashboardStats {
  totalMembers: number
  totalApplications: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL is not defined')
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats/counts`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: StatsResponse = await response.json()
      
      if (!result.data || typeof result.data.totalMembers !== 'number' || typeof result.data.totalApplications !== 'number') {
        throw new Error('Invalid response format')
      }
      
      setStats({
        totalMembers: result.data.totalMembers,
        totalApplications: result.data.totalApplications
      })

      console.log('Successfully fetched stats:', result.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleRefresh = async () => {
    setLoading(true)
    setError('')
    await fetchStats()
  }

  const getStatValue = (value: number | undefined) => {
    if (loading) return "Loading..."
    if (error) return "Error"
    if (value === undefined || value === null) return "0"
    return value.toString()
  }

  if (error) {
    console.error('Dashboard Error:', error)
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-32 pb-8"> {/* Increased top padding to pt-32 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Members"
            value={getStatValue(stats?.totalMembers)}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            error={error}
            loading={loading}
            onRefresh={handleRefresh}
          />
          <StatCard
            title="Total Applications"
            value={getStatValue(stats?.totalApplications)}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            error={error}
            loading={loading}
            onRefresh={handleRefresh}
          />
          <StatCard
            title="Pending Applications"
            value="--"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <QuickActions />
        </section>
      </div>
    </div>
  )
} 