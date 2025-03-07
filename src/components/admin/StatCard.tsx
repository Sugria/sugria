interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="text-[#1A5D3A]">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard 