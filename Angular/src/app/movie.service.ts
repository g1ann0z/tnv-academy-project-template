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
    const url = `${this.apyUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getMoviesByCast(castMember: String): Observable<any> {
    const url = `${this.apyUrl}/discover/movie?with_cast=${castMember}&api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

}

/*
curl --request GET \
     --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \
     --header 'accept: application/json'
     */