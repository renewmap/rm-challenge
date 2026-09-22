import { useState } from 'react'
import {
  SortableColumnHeader,
  type SortDirection,
} from '../../components/SortableColumnHeader'
import {
  sortFacilities,
  type FacilitySortKey,
} from '../../helpers/facilitySort'
import type { Facility } from '../../types/Facility'

const COLUMNS: { label: string; sortKey: FacilitySortKey }[] = [
  { label: 'Name', sortKey: 'name' },
  { label: 'State', sortKey: 'state' },
  { label: 'Commenced', sortKey: 'commenced' },
  { label: 'Tech', sortKey: 'tech' },
  { label: 'Status', sortKey: 'status' },
]

interface FacilitiesTableProps {
  facilities: Facility[]
}

export function FacilitiesTable({ facilities }: FacilitiesTableProps) {
  // We only sort by one column at a time, so we track the sort key and direction in state.
  const [sortKey, setSortKey] = useState<FacilitySortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const sortedFacilities = sortFacilities(facilities, sortKey, sortDirection)

  const handleSort = (nextSortKey: FacilitySortKey) => {
    if (nextSortKey === sortKey) {
      setSortDirection((currentDirection) =>
        currentDirection === 'asc' ? 'desc' : 'asc',
      )
      return
    }
    
    // Sort by ascending first when sorting by a new column
    setSortKey(nextSortKey)
    setSortDirection('asc')
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.sortKey}>
                <SortableColumnHeader
                  activeSortKey={sortKey}
                  label={column.label}
                  onSort={handleSort}
                  sortDirection={sortDirection}
                  sortKey={column.sortKey}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedFacilities.map((facility) => (
            <tr key={facility.code}>
              <td>{facility.name}</td>
              <td>{facility.state}</td>
              <td>{facility.commencementDate}</td>
              <td>{facility.tech}</td>
              <td>{facility.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
