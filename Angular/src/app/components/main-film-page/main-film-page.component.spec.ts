import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFilmPageComponent } from './main-film-page.component';

describe('MainFilmPageComponent', () => {
  let component: MainFilmPageComponent;
  let fixture: ComponentFixture<MainFilmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainFilmPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFilmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
