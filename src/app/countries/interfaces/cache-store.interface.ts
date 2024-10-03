import { Country } from "./country.interface";
import { Region } from './region.type';

export interface CacheStore {
  byCapital: TermContruis;
  byCountries: TermContruis;
  byRegion: RegionCountries
}

export interface TermContruis{
  term: string;
  countries: Country[];
}

export interface RegionCountries{
  region: Region,
  countries: Country[]
}
