import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'tnv-catalogue-filters',
  templateUrl: './catalogue-filters.component.html',
  styleUrls: ['./catalogue-filters.component.scss'],
  standalone: false
})
export class CatalogueFiltersComponent implements OnInit {

  @Output() moviesFiltered = new EventEmitter<any[]>();

  defaultLanguage: string = "en";

  years: number[] = [2000, 2001, 2002, 2003, 2004, 2005, 
    2006, 2007, 2008, 2009, 2010,
     2011, 2012, 2013, 2014, 2015, 
     2016, 2017, 2018, 2019, 2020, 
     2021, 2022, 2023];

  selectedDate: number = 2023;

  genres: any[] = [];

  originalMovies: any[] = [];

  selectedGenreId: number | null = null;
  
  moviesByFilter: any[] = [];

  constructor(private movieService: MovieService) { }
  
  ngOnInit(): void {
    this.getFilteredMovies();
    this.getGenres();
  }

  getFilteredMovies(): void {
    console.log('Selected Language:', this.defaultLanguage);

    this.movieService.getGeneralMovies(this.defaultLanguage).subscribe(
      (data) => {
        console.log('All Movies:', data.results);
        
        this.moviesByFilter = data.results.filter((movie: { original_language: string; }) => movie.original_language === this.defaultLanguage);
        
        console.log('Filtered Movies By Language:', this.moviesByFilter);
        this.moviesFiltered.emit(this.moviesByFilter); 
      },
      (error) => {
        console.error('Error fetching movies by language:', error);
      }
    );
  }

  getFilteredMoviesByDate(): void {
    console.log('Selected Date:', this.selectedDate);

    this.movieService.getMoviesByDate(this.selectedDate).subscribe(
      (data) => {
        console.log('Filtered Movies By Date:', data.results);
        this.originalMovies = data.results; // Aggiorna l'array originale.
        this.moviesByFilter = [...this.originalMovies]; // Clona l'array originale prima di applicare filtri.
        this.filterMovies();
      },
      (error) => {
        console.error('Error fetching movies by date:', error);
      }
    );
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe(
      (data) => {
        console.log('Genres:', data.genres);
        this.genres = data.genres;
        this.filterMovies(); 
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  filterMovies(): void {
    if (this.selectedGenreId) {
      this.moviesByFilter = this.originalMovies.filter(movie => 
        movie.genre_ids.includes(this.selectedGenreId)
      );
    }
    this.moviesFiltered.emit(this.moviesByFilter);
  }

  onGenreSelectionChange(): void {
    this.filterMovies();
  }
}