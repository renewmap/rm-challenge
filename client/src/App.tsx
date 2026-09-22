import { useEffect, useState } from 'react'
import type { FacilityDetails, FacilityUnitStatus } from './types/Facility'
import { FacilitiesTable } from './features/facilities/FacilitiesTable'
import { FacilityFilters } from './features/facilities/FacilityFilters'
import { getFacilities } from './features/facilities/getFacilities'
import { TableSummary } from './features/facilities/TableSummary'
import { parseFacility } from './helpers/facility'
import { filterFacilitiesByStateAndFueltech } from './helpers/filterFacilities'
import type { FueltechGroup } from './helpers/fueltech'
import type { State } from './helpers/state'
import './App.css'

function App() {
  const [facilityDetails, setFacilityDetails] = useState<FacilityDetails[]>([])
  const [statusFilters, setStatusFilters] = useState<FacilityUnitStatus[]>([])
  const [stateFilters, setStateFilters] = useState<State[]>([])
  const [fueltechGroupFilters, setFueltechGroupFilters] = useState<
    FueltechGroup[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadFacilities = async () => {
      setLoading(true)
      setError(null)

      try {
        const { facilities } = await getFacilities(
          statusFilters,
          controller.signal,
        )

        setFacilityDetails(facilities)
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadFacilities()

    return () => controller.abort()
  }, [statusFilters])

  const filteredFacilityDetails = filterFacilitiesByStateAndFueltech(facilityDetails, {
    states: stateFilters,
    fueltechGroups: fueltechGroupFilters,
  })
  const facilities = filteredFacilityDetails.map((facility) => parseFacility(facility))

  return (
    <main>
      <h1>Energy facilities in Australia</h1>
      <FacilityFilters
            onFueltechGroupsChange={setFueltechGroupFilters}
            onStatesChange={setStateFilters}
            onStatusesChange={setStatusFilters}
            selectedFueltechGroups={fueltechGroupFilters}
            selectedStates={stateFilters}
            selectedStatuses={statusFilters}
          />
      {error && <p role="alert">Unable to load facilities: {error}</p>}

      {facilities.length > 0 && <FacilitiesTable facilities={facilities} />}

      {(!loading || facilities.length > 0) && (
        <TableSummary
          facilities={filteredFacilityDetails}
        />
      )}

      {!loading && facilities.length === 0 && <p>No facilities found.</p>}
    </main>
  )
}

export default App
