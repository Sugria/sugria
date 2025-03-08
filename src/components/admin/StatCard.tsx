interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  loading?: boolean
  error?: string
  onRefresh?: () => void
}

const StatCard = ({ title, value, icon, loading, error, onRefresh }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
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
        {onRefresh && (
          <button
            onClick={onRefresh}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${loading ? 'animate-spin' : ''}`}
            disabled={loading}
            title="Refresh"
          >
            <svg 
              className="w-4 h-4 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default StatCard 