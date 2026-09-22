import type { FacilityDetails, FacilityUnit } from '../types/Facility'

/**
 * Given a facility, loops through the units and returns the unit with the earliest commencement date.
 * @param facility 
 * @returns The unit with the earliest commencement date, or the first unit if no commencement date is found. Returns undefined if the facility has no units.
 */
export const getEarliestCommencementUnit = (
  facility: FacilityDetails,
): FacilityUnit | undefined => {
  if (facility.units.length === 0) {
    return undefined;
  }

  let earliestUnit = facility.units[0];
  for (const currUnit of facility.units) {
    // Prioritise the first unit if no commencement date is found.
    if (!currUnit.commencement_date) {
      continue;
    }
    
    if (!earliestUnit.commencement_date || new Date(currUnit.commencement_date).getTime() < new Date(earliestUnit.commencement_date).getTime()) {
      earliestUnit = currUnit;
    }
  }
  return earliestUnit;
}
