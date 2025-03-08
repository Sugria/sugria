interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  loading?: boolean
  error?: string
}

const StatCard = ({ title, value, icon, loading, error }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600">
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500 truncate">
            {title}
          </p>
          <p className={`mt-1 text-xl font-semibold ${error ? 'text-red-600' : 'text-gray-900'}`}>
            {loading ? (
              <span className="inline-block w-16 h-6 bg-gray-200 animate-pulse rounded"></span>
            ) : error ? (
              <span title={error}>Error</span>
            ) : (
              value
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatCard 