import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

/**
 * @title Input with hints
 */

@Component({
  selector: 'tnv-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: false
  
})


export class SearchComponent {
  selectedLanguage: string = 'All';
  selectedTag: number | undefined;

  onLanguageChange(event: any): void{
    this.selectedLanguage = event.value;
  }

  onTagChange(event: any): void{
    this.selectedTag = event.value;
  }
}
