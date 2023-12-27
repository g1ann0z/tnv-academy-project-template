import {Component, EventEmitter, Output} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAccordionHarness} from '@angular/material/expansion/testing';
/**
 * @title Expansion panel as accordion
 */
@Component({
  selector: 'tnv-search-new',
  templateUrl: './search-new.component.html',
  styleUrls: ['./search-new.component.scss']
})

export class SearchNewComponent {
  @Output() newSearchEvent = new EventEmitter<string>();
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

 
    
  searchByTitle(title: string){
      this.newSearchEvent.emit(title);
  }
}