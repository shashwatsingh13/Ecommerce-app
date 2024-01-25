import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopHereFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries():Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{

    // search URL
    const searchStatesUrl =`${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseState>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
}

interface GetResponseState{
  _embedded:{
    states: State[];
  }
}
