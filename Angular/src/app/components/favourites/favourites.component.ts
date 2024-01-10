import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Review } from 'src/app/models/review';
import { MovieService } from 'src/app/movie.service';
import { RankingsService } from 'src/app/rankings.service';

@Component({
	selector: "app-favourites",
	templateUrl: "./favourites.component.html",
	styleUrls: ["./favourites.component.scss"],
})
export class FavouritesComponent implements OnInit {
  @Input() movie: any;

  showRating: boolean = false;
  userRating: number = 0;
  userId!: number | null; // Variabile per memorizzare l'ID dell'utente
	favouriteMovies: any[] = [];
	reviewExist: boolean = false;

	constructor(
		private movieService: MovieService,
		private authService: AuthService
	, private rankingsService: RankingsService) {}

	ngOnInit(): void {
		this.loadFavouriteMovies();
    this.userId = this.authService.getCurrentUserId();
	}

	removeMovie(movieId: number) {
		//console.log("passo al service movieId ", movieId);
		this.movieService.removeFromFavourites(movieId).subscribe(
			() => {
				// Rimuovere il film dall'array locale
				this.favouriteMovies = this.favouriteMovies.filter(
					(m) => m.id !== movieId
				);
				this.loadFavouriteMovies(); //ricaricare pagina per eliminare card
			},
			(error) => {
				console.error(
					"Errore durante la rimozione del film dai preferiti",
					error
				);
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
						console.error("Errore durante il recupero dei preferiti", error);
					}
				);
			} else {
				console.error("ID utente non disponibile.");
			}
		}
	}

	checkIfReviewExist(movieId: number, review: Review) {
		console.log("dentro fav-comp checkIfReviewExist");
		const userId = this.authService.getCurrentUserId();
		if (userId !== null) {
			this.movieService.checkIfReviewExist(userId, movieId).subscribe({
				next: (response) => {
					if (response !== null) {
						this.reviewExist = true;
						console.log(this.reviewExist);
					} else {
						this.addReview(review);
					}
				},
				error: (err) => console.log(err),
			});
		}
	}

	addReview(review: Review) {
		if (!this.reviewExist) {
			this.movieService.addReview(review).subscribe({
				next: (response) => {
					console.log(response);
				},
				error: (err) => console.log(err),
			});
		}
	}

  ratingPost(movie : any) {
    this.rankingsService.postRating({
      userId: this.userId,
      movieId: movie.movieId,
      movieTitle: movie.movieTitle,
      rating: this.userRating,
    }).subscribe(
      (response) => {
        console.log('Rating salvato con successo', response);
      },
      (error) => {
        console.error('Errore durante il salvataggio del rating', error);
      },
      () => {
        console.log('Chiamata completata');
      }
    );
  }

  ratingPatch(movie : any) {
    this.rankingsService.patchRating(this.userId, movie.movieId, this.userRating).subscribe(
      (response) => {
        console.log('Rating aggiornato con successo', response);
      },
      (error) => {
        console.error('Errore durante il aggiornamento del rating', error);
      },
      () => {
        console.log('Chiamata completata');
      }
    );
  }

  ratingDelete(movie : any){
    this.rankingsService.deleteRating(this.userId, movie.movieId).subscribe(
      (response) => {
        console.log('Rating eliminato con successo', response);
      },
      (error) => {
        console.error('Errore durante l\'eliminazione del rating', error);
      },
      () => {
        console.log('Chiamata completata');
      }
    );
  }
  
  getRatingForMovie(userId: number | null, movieId: number, movie: any): void {
    const ratingObservable = this.rankingsService.getAllRatings(userId);
  
    ratingObservable.subscribe(
      (ratings: any[]) => {
        // Se l'array è vuoto, o se il film non ha ancora un rating, esegui la POST
        if (!Array.isArray(ratings) || ratings.length === 0) {
          this.ratingPost(movie);
        } else {
          // Se il film ha già un rating, esegui la PATCH
          const existingRating = ratings.find((rating) => Number(rating.movieId) === movieId);
          if (existingRating) {
            this.ratingPatch(movie);
          } else {
            // Se il film non ha ancora un rating, esegui la POST
            this.ratingPost(movie);
          }
        }
      },
      (error) => {
        // Se si verifica un errore 404, esegui comunque la POST
        if (error.status === 404) {
          console.warn('Ignorato errore 404 durante il recupero dei rating dell\'utente:', error);
          this.ratingPost(movie);
        }
      }
    );
  }

  userRatingChange(newRating: number, movie: any) {
    console.log('Nuovo rating:', newRating);
    this.userRating = newRating;

    // Verifica se l'utente è autenticato prima di salvare la valutazione
    if (this.userId) {
      this.getRatingForMovie(this.userId, movie.movieId, movie);
    } else {
      console.error('L\'utente non è autenticato. Impossibile salvare la valutazione.');
    }
  }
}