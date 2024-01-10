import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from './@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private nodeUrl = 'http://localhost:1234/api';
  userRating: number = 0;
  userId: number | undefined;

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
  }

  getAllRatings(userId: number | null): Observable<any[]> {
    const url = `${this.nodeUrl}/rating/${userId}`;
    return this.httpClient.get<any[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of([]);
        } else {
          return throwError(error);
        }
      })
    );
  }
  postRating(ratingDetails: any): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    const url = `${this.nodeUrl}/rating`;
    console.log('Chiamato saveRating con i dettagli:', ratingDetails);
    return this.httpClient.post(url, { ...ratingDetails, userId });
  }
  
  patchRating(userId: number | null, movieId: number, rating: number): Observable<any> {
    const url = `${this.nodeUrl}/rating/${movieId}`;
    console.log("tutto ok", userId, movieId, rating);
    return this.httpClient.patch(url, { userId, rating });
  }
  
  deleteRating(userId: number | null, movieId: number): Observable<any> {
    const url = `${this.nodeUrl}/rating/${userId}/${movieId}`;
    console.log("Invio richiesta di eliminazione con userId:", userId, "e movieId:", movieId);
    return this.httpClient.delete(url);
  }
}
