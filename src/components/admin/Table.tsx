import { useState } from 'react'

interface Column<T> {
  key: string
  header: string
  accessor: keyof T
  render?: (item: T) => React.ReactNode
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

const Table = <T extends Record<string, unknown>>({ columns, data, onRowClick }: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0

    const aValue = a[sortConfig.key as keyof T]
    const bValue = b[sortConfig.key as keyof T]

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => requestSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {sortConfig?.key === column.key && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render ? column.render(row as T) : row[column.accessor as keyof T]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table 