import { formatList } from '../helpers/formatting'
import './ActiveFilters.css'

export interface ActiveFilterGroup {
  label: string
  values: string[]
}

interface ActiveFiltersProps {
  groups: ActiveFilterGroup[]
}

/**
 * Returns a component that shows the active filters in a list
 * e.g. Filtering by State: QLD, SA and TAS · Tech: Battery 
 */
export function ActiveFilters({ groups }: ActiveFiltersProps) {
  const activeGroups = groups.filter((group) => group.values.length > 0)

  if (activeGroups.length === 0) return null

  const summary = activeGroups
    .map((group) => `${group.label}: ${formatList(group.values)}`)
    .join(' · ')

  return (
    <p aria-live="polite" className="active-filters">
      Filtering by {summary}
    </p>
  )
}
