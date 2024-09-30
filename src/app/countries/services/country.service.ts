
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  //en el pipe se captura el error y con of([]) retorna un nuevo observable
  private getCountryRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        delay(2000)
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
    return this.getCountryRequest(`${this.apiUrl}/capital/${capital}`);
  }

  searchCountry(country: string): Observable<Country[]>{
    return this.getCountryRequest(`${this.apiUrl}/name/${country}`);
  }

  searchRegion(region: string): Observable<Country[]>{
    return this.getCountryRequest(`${this.apiUrl}/region/${region}`);
  }

}
