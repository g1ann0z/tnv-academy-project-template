import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GenreService } from 'src/app/genre.service';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'tnv-trending-section',
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.scss',
  standalone: false
})
export class TrendingSectionComponent implements OnChanges {
  @Input() selectedLanguage: string = 'All';
  @Input() selectedGenre: number | undefined;
  movies: any[] = [];

  constructor(private movieService: MovieService, private genreService: GenreService) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if(simpleChanges['selectedLanguage'] || simpleChanges['selectedGenre']){
      this.loadMovies();
    }
  }

  private loadMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.results;
       if (this.selectedLanguage === 'All' && this.selectedGenre === undefined) {
         this.movies = data.results;
       } else {
         this.movies = data.results.map((movie: { genre_ids: any[]; }) => ({
           ...movie,
           genre_names: movie.genre_ids.map((genreId: number) => this.genreService.getGenreNameById(genreId)),
         })).filter(
           (movie: { original_language: string, genre_names: string[] }) => {
             const languageCondition = this.selectedLanguage === 'All' || movie.original_language === this.selectedLanguage;
             const genreCondition = this.selectedGenre === undefined || this.selectedGenre === 0 || (this.selectedGenre !== 0 && movie.genre_names.includes(this.genreService.getGenreNameById(this.selectedGenre)));
             return languageCondition && genreCondition;
           }
         );
       }
     });
   }
  }

