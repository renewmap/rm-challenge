import { ActiveFilters } from '../../components/ActiveFilters'
import { MultiSelect } from '../../components/MultiSelect'
import { selectedLabels, titleCase, toSelectOptions } from '../../helpers/formatting'
import {
  FUELTECH_GROUP_OPTIONS,
  type FueltechGroup,
} from '../../helpers/fueltech'
import {
  FACILITY_UNIT_STATUSES,
  type FacilityUnitStatus,
} from '../../types/Facility'
import { STATES, type State } from '../../helpers/state'

const STATUS_OPTIONS = toSelectOptions(FACILITY_UNIT_STATUSES)
const STATE_OPTIONS = toSelectOptions(STATES)
const FUELTECH_OPTIONS = toSelectOptions(FUELTECH_GROUP_OPTIONS, titleCase)

interface FacilityFiltersProps {
  selectedStatuses: FacilityUnitStatus[]
  selectedStates: State[]
  selectedFueltechGroups: FueltechGroup[]
  onStatusesChange: (statuses: FacilityUnitStatus[]) => void
  onStatesChange: (states: State[]) => void
  onFueltechGroupsChange: (fueltechGroups: FueltechGroup[]) => void
}

export function FacilityFilters({
  selectedStatuses,
  selectedStates,
  selectedFueltechGroups,
  onStatusesChange,
  onStatesChange,
  onFueltechGroupsChange,
}: FacilityFiltersProps) {
  return (
    <div className="filters">
      <MultiSelect
        label="State"
        onChange={onStatesChange}
        options={STATE_OPTIONS}
        selectedValues={selectedStates}
      />
      <MultiSelect
        label="Status"
        onChange={onStatusesChange}
        options={STATUS_OPTIONS}
        selectedValues={selectedStatuses}
      />
      <MultiSelect
        label="Tech"
        onChange={onFueltechGroupsChange}
        options={FUELTECH_OPTIONS}
        selectedValues={selectedFueltechGroups}
      />
      <ActiveFilters
        groups={[
          { label: 'State', values: selectedLabels(STATE_OPTIONS, selectedStates) },
          {
            label: 'Status',
            values: selectedLabels(STATUS_OPTIONS, selectedStatuses),
          },
          {
            label: 'Tech',
            values: selectedLabels(FUELTECH_OPTIONS, selectedFueltechGroups),
          },
        ]}
      />
    </div>
  )
}
