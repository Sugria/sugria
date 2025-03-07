export type SortDirection = 'asc' | 'desc'

export interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface SortConfig {
  key: string
  direction: SortDirection
}

export interface TableColumn<T> {
  header: string
  accessor: keyof T
  render?: (item: T) => React.ReactNode
} 