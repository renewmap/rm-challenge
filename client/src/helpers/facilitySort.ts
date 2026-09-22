import type { SortDirection } from '../components/SortableColumnHeader'

export type FacilitySortKey = 'name' | 'state' | 'commenced' | 'tech' | 'status'

export interface FacilitySortValues {
  name: string
  state: string
  commenced: number
  tech: string
  status: string
}

export const sortFacilities = <T extends FacilitySortValues>(
  facilities: T[],
  sortKey: FacilitySortKey,
  sortDirection: SortDirection,
) => {
  const sortedFacilities = facilities.slice()

  sortedFacilities.sort((firstFacility, secondFacility) => {
    const firstValue = firstFacility[sortKey]
    const secondValue = secondFacility[sortKey]
    let comparison: number

    // Number sort
    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      comparison = firstValue - secondValue
    } else {
      // String sort
      comparison = String(firstValue).localeCompare(String(secondValue))
    }

    if (sortDirection === 'asc') {
      return comparison
    }

    return -comparison
  })

  return sortedFacilities
}
