import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { privateDecrypt } from 'crypto';													 

@Component({
  selector: 'tnv-film-card-timeline',
  templateUrl: './film-card-timeline.component.html',
  styleUrl: './film-card-timeline.component.scss',
  standalone: false				   
})
export class FilmCardTimelineComponent {
  @Input() movie: any;

  isMovieFavourite: boolean = false;
  isReviewTextUndefined: boolean = true;

  
  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit(){
    this.checkIfFavourite();
    }

  toggleFavourites(){
    if(!this.movie || !this.movie.id){
      return;
    }

    const isCurrentlyFavourite = this.isFavourite();

    if(isCurrentlyFavourite){
      this.removeFromFavourites();
    } else {
      this.addFavourites();
    }
  }

  addFavourites(){
    //console.log("chiamata addFavourites nel film-card component");
    //console.log("movieId è ", this.movie.id);
    if (!this.movie || !this.movie.id || !this.movie.title || !this.movie.poster_path) {
      return;
    }

    const movieData = {
      movieId : this.movie.id,
      movieTitle : this.movie.title,
      moviePosterPath: this.movie.poster_path,
    };

    this.movieService.addToFavourites(movieData).subscribe(
      (Response) => {
        //console.log('Film aggiunto ai preferiti!', Response);
        this.snackBar.open('Film aggiunto ai preferiti!', 'OK', {
          duration: 3000,
        });
        this.isMovieFavourite = true;
        //Qui possibile chiamata a inserimento review
      },
      (error) => {
        console.error('Errore durante l\'aggiunta ai preferiti', error);
        this.snackBar.open('Errore 1 durante l\'aggiunta ai preferiti', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  removeFromFavourites(){
    this.movieService.removeFromFavourites(this.movie.id).subscribe(
      (response) => {
        console.log('Film rimosso dai preferiti!', response);
        this.snackBar.open('Film rimosso dai preferiti!', 'OK', {
          duration: 3000,
        });
        this.isMovieFavourite = false;
      },
      (error) => {
        console.error('Errore durante la rimozione dai preferiti', error);
        this.snackBar.open('Errore durante la rimozione dai preferiti', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  isFavourite(): boolean{
    return this.isMovieFavourite;
  }

  private checkIfFavourite() {
    this.movieService.isMovieInFavourites(this.movie.id).subscribe(
      (response) => {
        this.isMovieFavourite = response;
      },
      (error) => {
        console.error('Errore durante il controllo se il film è nei preferiti', error);
      }
    );
  }

}

