export const STATES = ['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA'] as const

export type State = (typeof STATES)[number]

const NETWORK_REGION_STATES: Record<string, State> = {
  NSW1: 'NSW',
  QLD1: 'QLD',
  SA1: 'SA',
  TAS1: 'TAS',
  VIC1: 'VIC',
  WEM: 'WA',
  // Deprecated: Defaults to NSW
  SNOWY1: 'NSW',
}

/**
 * Gets the state from the network region. Falls back to '—' if no state is found.
 */
export const getStateFromNetworkRegion = (
  networkRegion: string,
): State | '—' => NETWORK_REGION_STATES[networkRegion] ?? '—'
