import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tnv-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

   // @Input() name ='';
    @Output() newSearchEvent = new EventEmitter<string>();
    
    searchByActor(actor: string){
        this.newSearchEvent.emit(actor);
    }

}
