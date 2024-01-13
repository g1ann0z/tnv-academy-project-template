import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDataComponent } from './movie-data.component';

describe('MovieDataComponent', () => {
  let component: MovieDataComponent;
  let fixture: ComponentFixture<MovieDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
