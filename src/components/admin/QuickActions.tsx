import Link from 'next/link'

const QuickActions = () => {
  const actions = [
    {
      title: 'View Members',
      description: 'See all registered members and their details',
      href: '/admin/members',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'View Applications',
      description: 'Review pending and processed applications',
      href: '/admin/applications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action) => (
        <Link 
          key={action.title}
          href={action.href}
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#1A5D3A]/10 rounded-lg text-[#1A5D3A]">
              {action.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">
                {action.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default QuickActions 