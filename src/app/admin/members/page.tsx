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
import Button from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { Member } from '@/services/api/members'
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import ConfirmationModal from '@/components/ui/ConfirmationModal'

interface MemberResponse {
  data: {
    data: Member[]
    meta: {
      total: number
      page: string
      limit: string
      pages: number
    }
  }
  timestamp: string
  path: string
}

export default function MembersPage() {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    memberId: number | null
  }>({
    isOpen: false,
    memberId: null
  })

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/members?page=1&limit=100000`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch members')
        }

        const result: MemberResponse = await response.json()
        if (!result.data?.data) {
          throw new Error('Invalid response format')
        }

        setMembers(result.data.data)
      } catch (error) {
        console.error('Failed to fetch members:', error)
        setError('Failed to fetch members. Please try again later.')
        setMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const truncateText = (text: string, length: number) => {
    if (!text) return ''
    if (text.length <= length) return text
    return `${text.substring(0, length)}...`
  }

  const filteredMembers = members.filter(member => 
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

  const handleDeleteMember = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/members/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete member')
      }

      setMembers(members.filter(member => member.id !== id))
      toast.success('Member deleted successfully')
    } catch (error) {
      console.error('Error deleting member:', error)
      toast.error('Failed to delete member')
    }
  }

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    let l;
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              className="text-gray-700"
              onClick={() => router.back()}
            >
              ← Back
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">All Users</h1>
            <div className="flex items-center gap-4">
              <Input
                type="select"
                name="role"
                label=""
                className="h-12 px-3 py-2 text-sm border text-gray-900 bg-white"
                options={[
                  { value: 'all', label: 'All user role' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'member', label: 'Member' }
                ]}
              />
              <Input
                type="search"
                name="search"
                label=""
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 max-w-xs"
              />
              <Button 
                className="h-12 bg-[#1A5D3A] hover:bg-[#0F3622] whitespace-nowrap"
              >
                Invite Team Member
              </Button>
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
                  <TableHead className="pl-6">NAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>PHONE</TableHead>
                  <TableHead>NATIONALITY</TableHead>
                  <TableHead className="text-right">JOIN DATE</TableHead>
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
                ) : filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No members found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentMembers.map((member) => (
                    <TableRow 
                      key={member.id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {member.firstName?.charAt(0)}
                          </div>
                          <span>{truncateText(`${member.firstName} ${member.lastName}`, 20)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{truncateText(member.email, 25)}</TableCell>
                      <TableCell>{member.phoneNumber}</TableCell>
                      <TableCell className="capitalize">{member.nationality.toLowerCase()}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(member.createdAt)}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => router.push(`/admin/members/${member.id}`)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/members/${member.id}/edit`);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeleteModal({ isOpen: true, memberId: member.id })
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

          {/* Pagination - Always shown at bottom */}
          <div className="mt-auto border-t">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="text-sm text-gray-700">
                Showing {filteredMembers.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || filteredMembers.length === 0}
                  className={`p-2 rounded-md ${currentPage === 1 || filteredMembers.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
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
                  disabled={currentPage === totalPages || filteredMembers.length === 0}
                  className={`p-2 rounded-md ${currentPage === totalPages || filteredMembers.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
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
        onClose={() => setDeleteModal({ isOpen: false, memberId: null })}
        onConfirm={() => {
          if (deleteModal.memberId) {
            handleDeleteMember(deleteModal.memberId)
          }
        }}
        title="Delete Member"
        message="Are you sure you want to delete this member? This action cannot be undone."
      />
    </div>
  )
}