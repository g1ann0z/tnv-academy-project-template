import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tnv-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})

export class FilmDetailComponent {

  filmId : string;
  constructor(activatedRoute: ActivatedRoute){
    this.filmId = activatedRoute.snapshot.params['id'];
}
}
