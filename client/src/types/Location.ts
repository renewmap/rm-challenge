export type LocationBoundaryPosition = [lng: number, lat: number]

export interface LocationBoundary {
  type: 'MultiPolygon'
  coordinates: LocationBoundaryPosition[][][]
}

export interface Location {
  lat: number
  lng: number
}