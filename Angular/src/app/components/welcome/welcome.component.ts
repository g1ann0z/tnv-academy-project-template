import { Component, Input, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { TrendingSectionComponent } from '../trending-section/trending-section.component';
import { MovieService } from 'src/app/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tnv-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  //currentName = 'Paolino'; -lato html [name]="currentName" 
  currentSearch = '';
  

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  searchByActor(actor: string){
    this.currentSearch=actor;
  }


}
