import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/models/review';
@Component({
  selector: 'app-film-card-favourite',
  templateUrl: './film-card-favourite.component.html',
  styleUrls: ['./film-card-favourite.component.scss'],
})
export class FilmCardFavouriteComponent {
  @Input() movie: any;
  @Output() removeMovie = new EventEmitter();
  @Output() addReview = new EventEmitter();

  

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
    console.log("Review-filmFavoComp", review);
  }

    //codice relativo ad expansion panel dei filtri
    step = 0;

    setStep(index: number) {
      this.step = index;
    }
}