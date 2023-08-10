export interface PaciResult {
  IsSuccessful: boolean
  Result: Result[]
  Error: any
  RequestTime: string
}

interface Result {
  ID: string
  ResultSource: string
  FeatureType: string
  TitleArabic: string
  TitleEnglish: string
  DetailsArabic: string
  DetailsEnglish: string
  X: number
  Y: number
  Distance: any
  GovernorateArabic: string
  GovernorateEnglish: string
  NeighborhoodArabic: string
  NeighborhoodEnglish: string
  BlockArabic: string
  BlockEnglish: string
  StreetArabic: string
  StreetEnglish: string
  ParcelArabic: string
  ParcelEnglish: string
  HouseArabic: string
  HouseEnglish: string
  CivilID: number
}
