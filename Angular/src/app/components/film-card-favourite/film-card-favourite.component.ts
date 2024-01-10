import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "src/app/@core/services/auth.service";
import { Review } from "src/app/models/review";
import { MovieService } from "src/app/movie.service";
@Component({
	selector: "app-film-card-favourite",
	templateUrl: "./film-card-favourite.component.html",
	styleUrls: ["./film-card-favourite.component.scss"],
})
export class FilmCardFavouriteComponent implements OnInit {
	isRatingVisible = false;

	reviewExist = false;
	public review = new Review();

	@Input() movie: any;
	@Output() removeMovie = new EventEmitter();
	@Output() deleteReview = new EventEmitter();

	@Output() ratingDelete = new EventEmitter();
	@Output() userRatingChange: EventEmitter<any> = new EventEmitter();

	ngOnInit(): void {
		this.isReviewExist();
	}
	

	ranking: { rating: number } = { rating: 0 };
	constructor(
		private movieService: MovieService,
		private authService: AuthService
	) {}

	onRemoveClick() {
		this.removeMovie.emit(this.movie.movieId);
		//console.log("invia movieId", this.movie.movieId);
	}

	isReviewExist() {
		const userId = this.authService.getCurrentUserId();
		let movieId = this.movie.movieId;
		
		//console.log(userId, movieId);
		if (userId !== null) {
			this.movieService.reviewExist(userId, movieId).subscribe({
				next: (response) => {
					//console.log(response);
					if (response.data) {
						this.review.movieId = response.data.movieId;
						this.review.text = response.data.text;
						this.reviewExist = true;
					}
				},
				error: (err) => console.log(err),
			});
			if (this.review.text != null) {
				this.reviewExist = true;
			}
		}
	}

  addReview(reviewText: string){
    let review = new Review();
		review.movieId = this.movie.movieId;
		review.text = reviewText;
    this.movieService.addReview(review).subscribe({
			next: (response) => {
       			this.isReviewExist();
			},
			error: (err) => console.log(err),
		});
  }

  onDeleteReview(){
    this.deleteReview.emit(this.movie.movieId);
  }


	onRemoveRatingClick() {
		this.ratingDelete.emit(this.movie.movieId);
	}

	onRatingButtonClick() {
		// Cambia lo stato per mostrare/nascondere la tendina
		this.isRatingVisible = !this.isRatingVisible;
	}

	onUserRatingChange(newRating: number) {
		this.ranking.rating = newRating; // Aggiorna il valore della valutazione
		this.userRatingChange.emit(newRating);
	}

 	//codice relativo ad expansion panel dei filtri
	step = 0;

	setStep(index: number) {
		this.step = index;
	}
}
