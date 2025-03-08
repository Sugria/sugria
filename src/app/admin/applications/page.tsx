'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table'
import Input from '@/components/ui/Input'
import { formatDate } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import ConfirmationModal from '@/components/ui/ConfirmationModal'

interface Application {
  applicationId: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  personal: {
    fullName: string
    email: string
    phoneNumber: string
  }
  program: {
    category: string
  }
}

interface ApplicationResponse {
  data: {
    data: Application[]
    meta: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
  timestamp: string
  path: string
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    applicationId: string | null
  }>({
    isOpen: false,
    applicationId: null
  })

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/applications?page=1&limit=10000`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }

        const result: ApplicationResponse = await response.json()
        if (!result.data?.data) {
          throw new Error('Invalid response format')
        }

        setApplications(result.data.data)
      } catch (error) {
        console.error('Failed to fetch applications:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch applications')
        setApplications([])
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const filteredApplications = applications.filter(app => 
    app.personal.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.personal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = filteredApplications.slice(startIndex, endIndex)

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

  const handleDeleteApplication = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/applications/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        // Try to get error message from response
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to delete application (${response.status})`)
      }

      // Only update state if deletion was successful
      setApplications(applications.filter(app => app.applicationId !== id))
      setDeleteModal({ isOpen: false, applicationId: null })
      toast.success('Application deleted successfully')
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete application')
    }
  }

  // Generate pagination numbers with ellipsis
  const generatePaginationNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range = [];

    // Always show first page
    range.push(1);

    if (totalPages <= 10) {
      // If total pages is 10 or less, show all pages
      for (let i = 2; i < totalPages; i++) {
        range.push(i);
      }
    } else {
      // For larger page counts, show selected pages with ellipsis
      if (currentPage <= 4) {
        // Near the start
        for (let i = 2; i <= 5; i++) {
          range.push(i);
        }
        range.push('...');
        range.push(totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        // Near the end
        range.push(2);
        range.push('...');
        for (let i = totalPages - 4; i < totalPages; i++) {
          range.push(i);
        }
      } else {
        // Somewhere in the middle
        range.push(2);
        range.push('...');
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
          range.push(i);
        }
        range.push('...');
        range.push(totalPages - 1);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">All Applications</h1>
            <div className="flex items-center gap-4">
              <Input
                type="select"
                name="status"
                label=""
                className="h-12 px-3 py-2 text-sm border text-gray-900 bg-white"
                options={[
                  { value: 'all', label: 'All status' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'rejected', label: 'Rejected' }
                ]}
              />
              <Input
                type="search"
                name="search"
                label=""
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 max-w-xs"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow min-h-[700px] flex flex-col">
          {/* Table */}
          <div className="flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">APPLICATION ID</TableHead>
                  <TableHead>APPLICANT</TableHead>
                  <TableHead>PROGRAM</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead className="text-right">SUBMITTED</TableHead>
                  <TableHead className="text-right pr-6">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-red-600">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentApplications.map((application) => (
                    <TableRow 
                      key={application.applicationId}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="pl-6 font-medium">
                        {application.applicationId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {application.personal.fullName}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {application.personal.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {application.program.category}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(application.submittedAt)}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => router.push(`/admin/applications/${application.applicationId}`)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/applications/${application.applicationId}/edit`);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeleteModal({ isOpen: true, applicationId: application.applicationId })
                            }}
                            className="p-2 hover:bg-red-100 rounded-full"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-auto border-t">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="text-sm text-gray-700">
                Showing {filteredApplications.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || filteredApplications.length === 0}
                  className={`p-2 rounded-md ${currentPage === 1 || filteredApplications.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {generatePaginationNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
                    className={`px-3 py-1 rounded-md ${
                      page === currentPage 
                        ? 'bg-[#1A5D3A] text-white' 
                        : page === '...' 
                          ? 'text-gray-600 cursor-default'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || filteredApplications.length === 0}
                  className={`p-2 rounded-md ${currentPage === totalPages || filteredApplications.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, applicationId: null })}
        onConfirm={() => {
          if (deleteModal.applicationId) {
            handleDeleteApplication(deleteModal.applicationId)
          }
        }}
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
      />
    </div>
  )
} 