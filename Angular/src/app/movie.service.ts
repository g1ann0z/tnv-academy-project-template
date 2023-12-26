import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'a4388ed2eb6c9ab9626cf48b1a8bfe8b';
  private apyUrl = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<any> {
    let url = `${this.apyUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getMoviesByTitle(title: String): Observable<any> {
    let url = `${this.apyUrl}/search/movie?query=${title}&api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

}
