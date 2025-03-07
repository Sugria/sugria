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

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/applications`)
        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }
        const result = await response.json()
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
                              e.stopPropagation();
                              // Add delete logic here
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page 
                        ? 'bg-[#1A5D3A] text-white' 
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
    </div>
  )
} 