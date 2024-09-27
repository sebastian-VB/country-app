import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountriesService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countryService.searchCountryByAlphaCode(id))
    )
    .subscribe(
      (country) => {
        if(!country){
          return this.router.navigateByUrl('');
        }
        return;
      }
    );
    // this.activatedRoute.params
    // .pipe(
    // )
    // .subscribe(
    //   ({id}) => {
    //     this.countryService.searchCountryByAlphaCode(id).subscribe(
    //       (country) => {
    //         console.log(country[0])
    //       }
    //     );
    //   }
    // );
  }
}
