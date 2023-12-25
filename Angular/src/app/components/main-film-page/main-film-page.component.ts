import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'tnv-main-film-page',
  templateUrl: './main-film-page.component.html',
  styleUrls: ['./main-film-page.component.scss']
})
export class MainFilmPageComponent implements OnInit {

  thisYearMovies: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(data => {
      this.thisYearMovies = data.results;
    });
  }

  onMoviesFiltered(movies: any[]): void {
    this.thisYearMovies = movies;
  }
}