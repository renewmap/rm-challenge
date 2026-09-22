/**
 * https://docs.openelectricity.org.au/guides/fueltechs/#fueltech-groups
 */
export const FUELTECH_GROUP_OPTIONS = [
  'battery',
  'biomass',
  'bioenergy',
  'coal',
  'distillate',
  'gas',
  'hydro',
  'other',
  'pumps',
  'solar',
  'wind',
] as const

export type FueltechGroup = (typeof FUELTECH_GROUP_OPTIONS)[number]

/**
 * https://docs.openelectricity.org.au/guides/fueltechs/#fueltechs
 */
const FUELTECH_GROUPS_MAP: Record<string, FueltechGroup> = {
  // Simplified to battery for both charging and discharging for the sake of this exercise
  battery_charging: 'battery', // battery_charging
  battery_discharging: 'battery', // battery_discharging
  bioenergy_biogas: 'bioenergy',
  bioenergy_biomass: 'bioenergy',
  coal_black: 'coal',
  coal_brown: 'coal',
  distillate: 'distillate',
  gas_ccgt: 'gas',
  gas_ocgt: 'gas',
  gas_recip: 'gas',
  gas_steam: 'gas',
  gas_wcmg: 'gas',
  hydro: 'hydro',
  pumps: 'pumps',
  solar_rooftop: 'solar',
  solar_thermal: 'solar',
  solar_utility: 'solar',
  wind: 'wind',
  wind_offshore: 'wind',
  battery: 'battery',
  solar: 'solar',
}

/**
 * Get the fueltech group for a given fueltech ID. 
 * Falls back to 'other' if no group is found.
 */
export const getFueltechGroup = (
  fueltechId?: string | null,
): FueltechGroup | null => {
  if (!fueltechId) {
    return null
  }

  return FUELTECH_GROUPS_MAP[fueltechId] ?? 'other'
}
