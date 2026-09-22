import type { FacilityDetails } from '../../types/Facility'
import { getFacilitiesCapacityTotal } from '../../helpers/totals'

interface TableSummaryProps {
  facilities: FacilityDetails[]
}

export function TableSummary({ facilities }: TableSummaryProps) {
  const capacityTotal = getFacilitiesCapacityTotal(facilities)

  return (
    <div className="table-summary">
      <p>Facilities: {facilities.length}</p>
      <p>
        Capacity:{' '}
        {capacityTotal} MW
      </p>
    </div>
  )
}
