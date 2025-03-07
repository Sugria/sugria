'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import Collapsible from '@/components/ui/Collapsible'

interface ApplicationDetails {
  id: number
  applicationId: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  program: {
    id: number
    category: string
    previousTraining: boolean
    trainingId: number | null
  }
  personal: {
    id: number
    fullName: string
    email: string
    phoneNumber: string
    address: string
    gender: string
    dateOfBirth: string
  }
  farm: {
    id: number
    location: string
    size: number
    type: string
    practices: string
    challenges: string
  }
  grant: {
    id: number
    outcomes: string
    budgetFile: string
  }
  training: {
    id: number
    preference: string
  }
  motivation: {
    id: number
    statement: string
    implementation: string
    identityFile: string
  }
  declaration: {
    id: number
    agreed: boolean
    officerName: string
  }
  createdAt: string
  updatedAt: string
}

export default function ApplicationDetailsView({ applicationId }: { applicationId: string }) {
  const router = useRouter()
  const [application, setApplication] = useState<ApplicationDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/applications/${applicationId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch application')
        }
        const result = await response.json()
        if (!result.data) {
          throw new Error('Invalid response format')
        }
        setApplication(result.data)
      } catch (error) {
        console.error('Failed to fetch application:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch application')
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [applicationId])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const handlePreviewDocument = (documentType: 'budget' | 'identity') => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/programs/applications/${applicationId}/files/${documentType}/view`;
    window.open(url, '_blank');
  };

  const handleDownloadDocument = async (documentType: 'budget' | 'identity', fileName: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/programs/applications/${applicationId}/files/${documentType}/download`
      );
      
      if (!response.ok) {
        throw new Error('Failed to download document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={() => router.back()}
            >
              ← Back
            </Button>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={() => router.back()}
            >
              ← Back
            </Button>
            <div className="text-red-600">{error || 'Application not found'}</div>
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
          <Button
            variant="ghost"
            className="text-gray-600 mb-6"
            onClick={() => router.back()}
          >
            ← Back
          </Button>

          <div className="bg-white shadow p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {application.applicationId}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>
                <p className="text-gray-500 mt-1">Submitted on {new Date(application.submittedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="text-green-700 hover:bg-green-50"
                  onClick={() => {
                    // Add approve logic
                  }}
                >
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-700 hover:bg-red-50"
                  onClick={() => {
                    // Add reject logic
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Personal Information */}
            <div className="bg-white shadow p-6">
              <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900">
                      {application.personal.fullName}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900">
                      {application.personal.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900">
                      {application.personal.address}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900">
                      {application.personal.phoneNumber}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900">
                      {new Date(application.personal.dateOfBirth).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 capitalize">
                      {application.personal.gender}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Details */}
            <Collapsible title="Farm Details">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.farm.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Size (hectares)</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.farm.size}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.farm.type}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-700">Current Practices</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.farm.practices}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-700">Challenges</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.farm.challenges}</dd>
                </div>
              </dl>
            </Collapsible>

            {/* Grant and Motivation Information */}
            <div className="grid grid-cols-2 gap-6">
              <Collapsible title="Grant Information">
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-700">Expected Outcomes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{application.grant.outcomes}</dd>
                  </div>
                </dl>
              </Collapsible>

              <Collapsible title="Motivation">
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-700">Statement</dt>
                    <dd className="mt-1 text-sm text-gray-900">{application.motivation.statement}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-700">Implementation Plan</dt>
                    <dd className="mt-1 text-sm text-gray-900">{application.motivation.implementation}</dd>
                  </div>
                </dl>
              </Collapsible>
            </div>

            {/* Declaration */}
            <Collapsible title="Declaration">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Agreement Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.declaration.agreed ? 'Agreed to Terms' : 'Not Agreed'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Officer Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.declaration.officerName}</dd>
                </div>
              </dl>
            </Collapsible>
          </div>

          {/* Documents Sidebar */}
          <div className="w-80">
            <div className="bg-white shadow rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900 mb-6">Documents</h3>
              <div className="space-y-6">
                {/* Budget File (PDF) */}
                <div className="border-b pb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Budget File</h4>
                  <div className="space-y-4">
                    {/* PDF Preview */}
                    <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                      <iframe
                        src={`${process.env.NEXT_PUBLIC_API_URL}/programs/applications/${applicationId}/files/budget/view`}
                        className="w-full h-[200px]"
                        title="Budget Document"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handlePreviewDocument('budget')}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Open
                      </button>
                      <button
                        onClick={() => handleDownloadDocument('budget', 'budget.pdf')}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Identity Document */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Identity Document</h4>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handlePreviewDocument('identity')}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview Document
                    </button>
                    <button
                      onClick={() => handleDownloadDocument('identity', 'identity.pdf')}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}