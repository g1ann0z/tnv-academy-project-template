import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genreMap: {[id: number]: string} ={
    28: 'Action',
    12: 'Adventure',
    14: 'Fantasy',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  getGenreNameById(id: number): string{
    return this.genreMap[id] || ''
  }

  getAllGenres(): string[] {
    return Object.values(this.genreMap);
  }
  constructor() { }
}
