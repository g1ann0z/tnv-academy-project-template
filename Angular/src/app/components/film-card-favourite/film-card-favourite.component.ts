import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/models/review';
@Component({
  selector: 'app-film-card-favourite',
  templateUrl: './film-card-favourite.component.html',
  styleUrls: ['./film-card-favourite.component.scss'],
})
export class FilmCardFavouriteComponent {
  @Input() movie: any;
  isRatingVisible = false;
  @Output() removeMovie = new EventEmitter();
  @Output() addReview = new EventEmitter();

  
  @Output() ratingDelete = new EventEmitter();
  @Output() userRatingChange: EventEmitter<any> = new EventEmitter();

  ranking: { rating: number } = { rating: 0 };
  constructor() { }

  onRemoveClick() {
    this.removeMovie.emit(this.movie.movieId);
    //console.log("invia movieId", this.movie.movieId);
  }
  onAddReview(reviewText: string) {
    let review = new Review();
    review.movieId=this.movie.movieId;
    review.text=reviewText;
    this.addReview.emit(review);
    //console.log("Review-filmFavoComp", review);
  }

    //codice relativo ad expansion panel dei filtri
    step = 0;

    setStep(index: number) {
      this.step = index;
    }

  onRemoveRatingClick(){
    this.ratingDelete.emit(this.movie.movieId);
  }

  onRatingButtonClick() {
    // Cambia lo stato per mostrare/nascondere la tendina
    this.isRatingVisible = !this.isRatingVisible;
  }
  
  onUserRatingChange(newRating: number) {
    this.ranking.rating = newRating;  // Aggiorna il valore della valutazione
    this.userRatingChange.emit(newRating);
  }
}