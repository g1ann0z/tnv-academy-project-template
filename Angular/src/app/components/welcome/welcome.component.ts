import { Component, Input, OnInit } from "@angular/core";
import { SearchComponent } from "../search/search.component";
import { TrendingSectionComponent } from "../trending-section/trending-section.component";
import { MovieService } from "src/app/movie.service";
import { Observable } from "rxjs";

@Component({
	selector: "tnv-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
	currentSearch: string = "";
	public moviesByTitle: any[];

	constructor(private movieService: MovieService) {
		this.moviesByTitle = [];
	}

	ngOnInit(): void {}

	searchByTitle(title: string) {
		this.currentSearch = title;
		this.movieService.getMoviesByTitle(this.currentSearch).subscribe({
			next: (response) => {
				console.log(this.moviesByTitle);
				this.moviesByTitle = response.results;
			},
			error: (err) => console.log(err),
		});
	}
}
