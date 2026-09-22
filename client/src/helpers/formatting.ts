import type { MultiSelectOption } from '../components/MultiSelect'

/**
 * Maps values to select options. Uses the value as the label unless a label function is provided.
 */
export const toSelectOptions = <T extends string>(
  values: readonly T[],
  getLabel: (value: T) => string = (value) => value,
): MultiSelectOption<T>[] =>
  values.map((value) => ({ label: getLabel(value), value }))

/**
 * Returns the labels for the selected option values, in option order.
 */
export const selectedLabels = <T extends string>(
  options: MultiSelectOption<T>[],
  selectedValues: readonly T[],
) =>
  options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label)

/**
 * Returns the value in title case and replaces underscores with spaces.
 */
export const titleCase = (value: string) => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Formats a list of values into a string.
 * e.g. ["QLD", "NSW"] -> "QLD and NSW"
 *      ["QLD", "NSW", "VIC"] -> "QLD, NSW and VIC"
 */
export const formatList = (values: string[]) => {
  if (values.length <= 1) return values[0] ?? ''
  if (values.length === 2) return `${values[0]} and ${values[1]}`

  return `${values.slice(0, -1).join(', ')} and ${values.at(-1)}`
}

/**
 * Simple helper to format dates.
 * We are in Australia so we use the en-AU locale.
 */
export const formatDate = (dateValue: string) =>
  new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue))
