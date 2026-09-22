import type {
  FacilitiesResponse,
  FacilityDetails,
  FacilityUnitStatus,
} from '../../types/Facility'

export interface FacilitiesResult {
  facilities: FacilityDetails[]
}

/**
 * Loads facilities from the API, optionally filtered by unit status.
 * Throws when the response is not usable. Abort errors propagate to the caller.
 */
export const getFacilities = async (
  statusFilters: FacilityUnitStatus[],
  signal?: AbortSignal,
): Promise<FacilitiesResult> => {
  const searchParams = new URLSearchParams()

  statusFilters.forEach((status) => searchParams.append('status_id', status))

  const queryString = searchParams.toString()
  const response = await fetch(
    `/api/facilities${queryString ? `?${queryString}` : ''}`,
    { signal },
  )

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const body = (await response.json()) as FacilitiesResponse

  if (!body.success) {
    throw new Error(body.error ?? 'The API returned an error')
  }

  if (!Array.isArray(body.data)) {
    throw new Error('The API response did not contain a facilities list')
  }

  return {
    facilities: body.data,
  }
}
