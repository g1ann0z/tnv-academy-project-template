import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '363a63846c046b7a3c0d656f3881759b';
  private apyUrl = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<any> {
    const url = `${this.apyUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getThisYearMovies(startYear: number, endYear: number): Observable<any>{
    const url = `${this.apyUrl}/discover/movie?api_key=${this.apiKey}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    return this.httpClient.get(url);
  }
}

