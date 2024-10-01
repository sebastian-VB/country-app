import { Component } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService){}

  searchByCapital(term: string): void{
    this.isLoading = true;
    console.log('Desde by capital page');
    this.countriesService.searchCapital(term).subscribe(
      (countries) => {
        this.isLoading = false,
        this.countries = countries
      }
    );
  }

}
