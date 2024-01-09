import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Review } from 'src/app/models/review';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favouriteMovies: any[] = [];

  constructor(private movieService: MovieService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadFavouriteMovies();
  }

  removeMovie(movieId: number) {
    //console.log("passo al service movieId ", movieId);
    this.movieService.removeFromFavourites(movieId).subscribe(
      () => {
        // Rimuovere il film dall'array locale
        this.favouriteMovies = this.favouriteMovies.filter((m) => m.id !== movieId);
        this.loadFavouriteMovies(); //ricaricare pagina per eliminare card
      },
      (error) => {
        console.error('Errore durante la rimozione del film dai preferiti', error);
      }
    );
  }

  private loadFavouriteMovies() {
    {
      const userId = this.authService.getCurrentUserId();

      if (userId !== null) {
        this.movieService.getFavouritesByUserId(userId).subscribe(
          (favouriteMoviesResponse) => {
            this.favouriteMovies = favouriteMoviesResponse;
          },
          (error) => {
            console.error('Errore durante il recupero dei preferiti', error);

          }
        );
      } else {
        console.error('ID utente non disponibile.');
      }
    }
  }

  addReview(review: Review){
    this.movieService.addReview(review).subscribe({
			next: (response) => {
				console.log(response);
			},
			error: (err) => console.log(err),
		});
  }


}