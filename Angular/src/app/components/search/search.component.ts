import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tnv-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

    @Output() newSearchEvent = new EventEmitter<string>();
    
    searchByTitle(title: string){
        this.newSearchEvent.emit(title);
    }

}
