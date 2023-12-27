import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNewComponent } from './search-new.component';

describe('SearchNewComponent', () => {
  let component: SearchNewComponent;
  let fixture: ComponentFixture<SearchNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
