import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from 'src/app/@core/services/auth.service';

/**
 * @title Card with multiple sections
 */

@Component({
  selector: 'tnv-film-card',
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss',
  standalone: false
})
export class FilmCardComponent implements OnInit {
  @Input() movie: any;

  showRating: boolean = false;
  userRating: number = 0;
  userId: number | undefined; // Variabile per memorizzare l'ID dell'utente

  constructor(
    private movieService: MovieService,
    private authService: AuthService // Inietta il servizio di autenticazione
  ) {}

  ngOnInit() {
    // Recupera l'ID dell'utente al momento dell'inizializzazione del componente
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      this.userId = userId;
    } else {
      // Puoi gestire la situazione in cui l'ID utente è nullo (ad esempio, non autenticato)
      console.error('L\'ID utente non è disponibile.');
    }
  }

  postRating() {
    // Chiama il servizio per inviare il rating al backend
    this.movieService.postRating({
      userId: this.userId,
      movieId: this.movie.id,
      movieTitle: this.movie.original_title,
      rating: this.userRating,
    }).subscribe(
      (response) => {
        console.log('Rating salvato con successo', response);
      },
      (error) => {
        console.error('Errore durante il salvataggio del rating', error);
      },
      () => {
        console.log('Chiamata completata'); // Aggiunto per debug
      }
    );
  }

  patchRating() {
    this.movieService.patchRating(this.userId, this.movie.id, this.userRating).subscribe(
      (response) => {
        console.log('Rating aggiornato con successo', response);
      },
      (error) => {
        console.error('Errore durante il aggiornamento del rating', error);
      },
      () => {
        console.log('Chiamata completata'); // Aggiunto per debug
      }
    );
  }
  userRatingChange(newRating: number) {
    console.log('Nuovo rating:', newRating);
    this.userRating = newRating;
  
    // Verifica se l'utente è autenticato prima di salvare la valutazione
    if (this.userId) {
      this.getRatingForMovie(this.userId, this.movie.id);
    } else {
      console.error('L\'utente non è autenticato. Impossibile salvare la valutazione.');
    }
  }
  
  getRatingForMovie(userId: number, movieId: number): void {
    this.movieService.getAllRatings(userId).subscribe(
      (ratings: any[]) => {
        console.log('MovieId da cercare:', movieId);
        console.log('Ratings:', ratings);
  
        let movieFound = false;
  
        for (const rating of ratings) {
          console.log('Rating corrente:', rating);
          if (Number(rating.movieId) === movieId) {
            movieFound = true;
            this.patchRating();
            break;
          }
        }
  
        if (!movieFound) {
          this.postRating();
        }
      },
      error => {
        console.error('Errore durante il recupero dei rating dell\'utente:', error);
      }
    );
  }
}