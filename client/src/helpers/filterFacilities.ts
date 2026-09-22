import type { FacilityDetails } from '../types/Facility'
import { getFueltechGroup, type FueltechGroup } from './fueltech'
import { getStateFromNetworkRegion, type State } from './state'

export interface FacilityDetailFilters {
  states: State[]
  fueltechGroups: FueltechGroup[]
}

/**
 * Filters the facilities by the selected states and fuel-tech groups.
 * 
 * These are custom filters not supported by the API.
 */
export const filterFacilitiesByStateAndFueltech = (
  facilities: FacilityDetails[],
  filters: FacilityDetailFilters,
): FacilityDetails[] =>
  facilities.filter((facility) => {
    const state = getStateFromNetworkRegion(facility.network_region)
    const matchesState =
      filters.states.length === 0 ||
      (state !== '—' && filters.states.includes(state))
      
    const matchesFueltechGroup =
      filters.fueltechGroups.length === 0 ||
      facility.units.some((unit) => {
        const fueltechGroup = getFueltechGroup(unit.fueltech_id)
        return (
          fueltechGroup !== null && filters.fueltechGroups.includes(fueltechGroup)
        )
      })

    return matchesState && matchesFueltechGroup
  })
