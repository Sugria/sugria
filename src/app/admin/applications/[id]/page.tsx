import ApplicationDetailsView from './ApplicationDetailsView'

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ApplicationDetailsPage({ params }: PageProps) {
  return (
    <ApplicationDetailsView applicationId={params.id} />
  )
} 