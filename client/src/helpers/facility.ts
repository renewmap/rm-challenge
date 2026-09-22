import type { Facility, FacilityDetails } from '../types/Facility'
import { getEarliestCommencementUnit } from './commencementDate'
import { formatDate, titleCase } from './formatting'
import { getFueltechGroup } from './fueltech'
import { getStateFromNetworkRegion } from './state'

/**
 * Parses the Facily details from the API response into a more usable format.
 */
export const parseFacility = (facility: FacilityDetails): Facility => {
  const earliestCommencementUnit = getEarliestCommencementUnit(facility)
  const fueltechGroup = getFueltechGroup(facility.units[0]?.fueltech_id)
  const commencementDate = earliestCommencementUnit?.commencement_date

  return {
    code: facility.code,
    name: facility.name,
    state: getStateFromNetworkRegion(facility.network_region),
    commencementDate: commencementDate ? formatDate(commencementDate) : '-',
    // Used for sorting by commencement date
    commenced: commencementDate
      ? new Date(commencementDate).getTime()
      : Number.POSITIVE_INFINITY,
    tech: fueltechGroup ? titleCase(fueltechGroup) : '',
    // Assumption that the first unit status is representative of the facility status
    status: facility.units[0]?.status_id ?? '—'
  }
}
