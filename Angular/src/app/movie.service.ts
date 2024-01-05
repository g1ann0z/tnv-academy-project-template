import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, observable, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { of } from 'rxjs';
import { Filter } from './models/filter';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '363a63846c046b7a3c0d656f3881759b';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) { }

  //funzione che chiama i film trend del momento
  getTrendingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  //funzione per trovare id dal nome della persona
  getActorId(actorName: string): Observable<number | undefined> {
    const url = `${this.apiUrl}/search/person?api_key=${this.apiKey}&query=${actorName}&include_adult=true`;
    
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        console.log('Risposta API per ricerca attore:', response);
        const actor = response.results[0];

        if (actor) {
        console.log(`ID dell'attore ${actorName}: ${actor.id}`);
        return actor.id;
      } else {
        console.log(`Attore non trovato per il nome ${actorName}`);
        return undefined;
      }
      })
    );
  }

  //funzione per ottenere film per attore
  getMoviesByActor(actorName: string): Observable<any> {
    return this.getActorId(actorName).pipe(
      switchMap((actorId) => {
        if (actorId) {
          const moviesUrl = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_people=${actorId}`;
          return this.httpClient.get(moviesUrl).pipe(
            map((moviesResponse: any) => moviesResponse.results)
          );
        } else {
          // Ritorna un array vuoto se non è presente alcun attore con il nome specificato
          return of([]);
        }
      })
    );
  }

  //funzione per filtrare i film in base ai criteri scelti
  getMoviesByFilter(filter: Filter): Observable<any> {
    let url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&include_adult=false&include_video=false&language=it&page=1`;
  
    if (filter.selectedYear !== undefined) {
      url += `&primary_release_year=${filter.selectedYear}`;
    }
  
    if (filter.selectedGenre !== undefined) {
      url += `&with_genres=${filter.selectedGenre}`;
    }
  
    if (filter.selectedLanguage !== undefined) {
      url += `&with_original_language=${filter.selectedLanguage}`;
    }
  
    if (filter.selectedPopularityGrade !== undefined) {
  
      if(filter.selectedPopularityGrade === "desc"){
        url += `&sort_by=popularity.desc`;
      }
      else if(filter.selectedPopularityGrade === "asc"){
        url += `&sort_by=popularity.asc`;
      }
    }
  
    if (filter.selectedDuration !== undefined) {
      url += `&with_runtime.gte=${filter.selectedDuration}`
      }  
  
    console.log("Service URL:", url);
    return this.httpClient.get(url);
  }
  
  //funzione per filtrare i film in base al titolo (anche parziale)
  getMoviesByTitle(title: String): Observable<any> {
    let url = `${this.apiUrl}/search/movie?query=${title}&api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  /*
  getMoviesByTitle(title: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${title}`;
    return this.httpClient.get(url).pipe(
      map((response: any) => response.results)
    );
  }
  */
  /* getMoviesByActor(actorName: string): Observable<any> {
    const url = `${this.apiUrl}/search/person?api_key=${this.apiKey}&query=${actorName}`;
    
    return this.httpClient.get(url).pipe(
      switchMap((response: any) => {
        const actorId = response.results[0]?.id;
  
        if (actorId) {
          const moviesUrl = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_people=${actorId}`;
          return this.httpClient.get(moviesUrl);
        } else {
          return of([]);
        }
      }),
      catchError(error => {
        console.error('Error fetching movies:', error);
        return of([]);
      })
    );
  } */
}
