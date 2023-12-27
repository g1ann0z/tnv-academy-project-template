import { Component, Input, OnInit } from "@angular/core";
import { MovieService } from "../../movie.service";
import { error } from "console";

@Component({
	selector: "tnv-search-result",
	templateUrl: "./search-result.component.html",
	styleUrl: "./search-result.component.scss",
})
export class SearchResultComponent implements OnInit {
	@Input() moviesByTitle!: any[];

	constructor() {

	}

	ngOnInit() {

	}
}
