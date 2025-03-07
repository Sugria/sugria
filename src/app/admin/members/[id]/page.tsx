import { Suspense } from 'react'
import UserDetailsView from './UserDetailsView'

interface PageProps {
  params: {
    id: string
  }
}

export default function MemberDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetailsView userId={params.id} />
    </Suspense>
  )
} 