
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }


  private loadFromLocalStorage() {
    const savedCacheStore = localStorage.getItem('cacheStore');
    if (savedCacheStore) {
      this.cacheStore = JSON.parse(savedCacheStore);
    }
  }


  //en el pipe se captura el error y con of([]) retorna un nuevo observable
  private getCountryRequest(url: string): Observable<Country[]>{

    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.getCountryRequest(`${this.apiUrl}/capital/${capital}`)
        .pipe(
          tap(countries => {
            this.cacheStore.byCapital = {term: capital, countries}
            this.saveToLocalStorage();
          })
        );
  }

  searchCountry(country: string): Observable<Country[]>{
    return this.getCountryRequest(`${this.apiUrl}/name/${country}`)
        .pipe(
          tap(countries => {
            this.cacheStore.byCountries = {term: country, countries}
            this.saveToLocalStorage();
          })
        );
  }

  searchRegion(region: Region): Observable<Country[]>{
    return this.getCountryRequest(`${this.apiUrl}/region/${region}`)
        .pipe(
          tap(countries => {
            this.cacheStore.byRegion = {region, countries}
            this.saveToLocalStorage();
          })
        );
  }

}
