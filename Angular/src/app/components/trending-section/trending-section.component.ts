import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'tnv-trending-section',
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.scss',
  standalone: false
})
export class TrendingSectionComponent implements OnChanges {
  @Input() selectedLanguage: string = 'All';
  movies: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if(simpleChanges['selectedLanguage']){
      this.loadMovies();
    }
  }

  private loadMovies(): void{
    this.movieService.getMovies().subscribe((data) => {
      if(this.selectedLanguage === 'All') {
        this.movies = data.results;
      } else {
        this.movies = data.results.filter(
          (movie:{original_language: string})=> movie.original_language===this.selectedLanguage 
        );
      }
    });
  }
}


