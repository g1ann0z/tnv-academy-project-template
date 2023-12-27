import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { MovieService } from "../../movie.service";
import { error } from "console";

@Component({
	selector: "tnv-search-result",
	templateUrl: "./search-result.component.html",
	styleUrl: "./search-result.component.scss",
})
export class SearchResultComponent implements OnChanges {
	@Input() moviesByTitle!: any[];

	public yearsOfMoviesByTitle: any[] = [];
	public movieResultByYear: any[] = [];

	constructor() {}

	ngOnChanges() {
		this.moviesByTitle.sort();
		//0: ottenere solo anno da data
		for (let movie of this.moviesByTitle) {
			let year = movie.release_date.substring(0, 4);
			this.yearsOfMoviesByTitle.push(year);
			//console.log(year);
		}
		// 1 - capire quali categorie diverse ci sono - in questo caso anni
		const years = [...new Set(this.yearsOfMoviesByTitle)];
		years.sort();

		
	}
}
