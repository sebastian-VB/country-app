
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  //en el pipe se captura el error y con of([]) retorna un nuevo observable
  searchCapital(capital: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${capital}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchCountry(country: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/name/${country}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
      .pipe(
        catchError(() => of([]))
      );
  }

}
