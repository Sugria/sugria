'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import Collapsible from '@/components/ui/Collapsible'

interface UserDetails {
  id: number
  firstName: string
  lastName: string
  email: string
  workEmail: string
  dateOfBirth: string
  gender: string
  nationality: string
  phoneNumber: string
  residentialAddress: string
  emergencyContact: {
    name: string
    phoneNumber: string
    relationship: string
  }
  createdAt: string
  updatedAt: string
  education: {
    id: number
    memberId: number
    highestLevel: string
    institutionName: string
    fieldOfStudy: string
    otherCertifications: string
  }
  lastLogin?: string
}

export default function UserDetailsView({ userId }: { userId: string }) {
  const router = useRouter()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/members/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const result = await response.json()
        if (!result.data) {
          throw new Error('Invalid response format')
        }
        setUser(result.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              className="text-gray-700"
              onClick={() => router.back()}
            >
              ← Back
            </button>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              className="text-gray-700"
              onClick={() => router.back()}
            >
              ← Back
            </button>
            <div className="text-red-700">{error || 'User not found'}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              className="text-gray-700"
              onClick={() => router.back()}
            >
              ← Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              User Details
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl uppercase text-gray-700">
                {user?.firstName?.[0] || '?'}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {`${user.firstName} ${user.lastName}`}
                </h2>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="text-red-700 hover:bg-red-50"
              >
                Deactivate User
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white shadow p-6">
              <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900 mb-4">Personal Information</h3>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Work Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.workEmail || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{user.gender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Nationality</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{user.nationality}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.residentialAddress}</dd>
                </div>
              </dl>
            </div>

            {/* Emergency Contact */}
            <Collapsible title="Emergency Contact">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.emergencyContact.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Relationship</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.emergencyContact.relationship}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.emergencyContact.phoneNumber}</dd>
                </div>
              </dl>
            </Collapsible>

            {/* Education */}
            <Collapsible title="Education">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Highest Level</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{user.education.highestLevel}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Institution</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.education.institutionName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Field of Study</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.education.fieldOfStudy}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-700">Other Certifications</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.education.otherCertifications || 'None'}</dd>
                </div>
              </dl>
            </Collapsible>
          </div>

          {/* Activity Log - Right Column (1/3) */}
          <div className="col-span-1">
            <div className="bg-white shadow p-6">
              <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900 mb-4">Account Activity</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  <li className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm text-gray-700">
                            <span className="font-medium text-gray-900">Profile updated</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-700">
                            07/03/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm text-gray-700">
                            <span className="font-medium text-gray-900">Account created</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-700">
                            03/03/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}