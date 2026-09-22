import './SortableColumnHeader.css'

export type SortDirection = 'asc' | 'desc'

interface SortableColumnHeaderProps<TSortKey extends string> {
  label: string
  sortKey: TSortKey
  activeSortKey: TSortKey
  sortDirection: SortDirection
  onSort: (sortKey: TSortKey) => void
}

/**
 * Generic component for a sortable column header
 * @param label - The label to display for the column.
 * @param sortKey - The key to sort the column by.
 * @param activeSortKey - The key of the currently active sort.
 * @param sortDirection - The direction of the currently active sort.
 * @param onSort - The function to call when the user clicks on the header to sort the column.
 * @returns A button that the user can click to sort the column.
 */
export function SortableColumnHeader<TSortKey extends string>({
  label,
  sortKey,
  activeSortKey,
  sortDirection,
  onSort,
}: SortableColumnHeaderProps<TSortKey>) {
  const isActive = sortKey === activeSortKey

  return (
    <button
      className="sortable-column-header"
      onClick={() => onSort(sortKey)}
      type="button"
    >
      {label}
      {isActive && (
        <span aria-hidden="true" className="sortable-column-header-icon">
          {sortDirection === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </button>
  )
}
