import type { Location } from './Location'

export const FACILITY_UNIT_STATUSES = [
  'committed',
  'operating',
  'commissioning',
  'retired',
] as const

export type FacilityUnitStatus = (typeof FACILITY_UNIT_STATUSES)[number]

/**
 * API RESPONSE FACILITY DATA TYPES
 */
export interface FacilityUnit {
  code: string
  fueltech_id: string
  status_id: FacilityUnitStatus
  capacity_registered?: number
  capacity_maximum?: number
  capacity_storage?: number
  emissions_factor_co2?: number
  dispatch_type: 'BIDIRECTIONAL' | 'LOAD' | 'GENERATOR'
  data_first_seen?: string
  data_last_seen?: string
  commencement_date?: string
  commencement_date_serialized?: string
  closure_date?: string
  closure_date_serialized?: string
  expected_operation_date?: string
  expected_operation_date_serialized?: string
  expected_closure_date?: string
  expected_closure_date_serialized?: string
  construction_start_date?: string
  construction_start_date_serialized?: string
  project_approval_date?: string
  project_approval_date_serialized?: string
  project_lodgement_date?: string
  created_at?: string
  updated_at?: string
}

export interface FacilityDetails {
  code: string
  name: string
  network_id: string
  network_region: string
  description?: string
  location?: Location
  npi_id?: string
  units: FacilityUnit[]
}

export interface FacilitiesResponse {
  version: string
  created_at: string
  success: boolean
  error: string | null
  data: FacilityDetails[]
  total_records: number | null
}


/**
 * FACILITY DATA TYPE FOR THE APP
 */
export interface Facility {
  code: string
  name: string
  state: string
  commencementDate: string
  commenced: number
  tech: string
  status: string
}

