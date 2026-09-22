import type { FacilityDetails } from '../types/Facility'

/**
 * Gets the total capacity in MW of all facilities by summing the capacity_registered of all units. Only shows 2 decimal places.
 */
export const getFacilitiesCapacityTotal = (facilities: FacilityDetails[]) => {
  let capacityTotal = 0

  for (const facility of facilities) {
    capacityTotal += facility.units.reduce((total, unit) => total + (unit.capacity_registered ?? 0), 0)
  }

  return capacityTotal.toLocaleString('en-AU', {
    maximumFractionDigits: 2,
  })
}
