import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { MovieService } from "../../movie.service";
import { error } from "console";
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'tnv-search-result-timeline',
  templateUrl: './search-result-timeline.component.html',
  styleUrl: './search-result-timeline.component.scss'
})
export class SearchResultTimelineComponent  implements OnInit, OnChanges {

	@Input() moviesList!: any[];
  @Input() yearsOfMovies!: any[];
  //@Input() moviesResult: any[] = [];
  @Input() actorName: string = "";


	//public yearsOfMovies: any[];
	
	constructor() {
  //  this.yearsOfMovies=[];
  }
  ngOnInit(): void {
    
  }

	ngOnChanges() {
   // console.log(this.yearsOfMovies);
	}

  //filtra film per anno per vedere in timeline i film divisi per anno 
  filterMovieByYear = (year: string): string[] =>  {
    //console.log("ADESSO ", year, this.moviesList);
    let result = [];
    //console.log(year);
    for(let movie of this.moviesList){
      if(movie.release_date!="" && movie.release_date.substring(0, 4)===year){
        result.push(movie);
      }
    }
    return result;
  }

  //funzione per esportazione in pdf/png
  generatePDF(){
    window.print();
  }
  

}
