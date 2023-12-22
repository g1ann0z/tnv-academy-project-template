import { Component, Input, OnInit, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MovieService } from 'src/app/movie.service';

/**
 * @title Input with hints
 */

@Component({
  selector: 'tnv-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: false
  
})


export class SearchComponent implements OnInit{

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    
  }

  getMoviesByCast(castMember: String): Observable<any> {
    this.movieService.getMoviesByCast
    return this.httpClient.get(url);
  }
}
