import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './@shared/components/login/login.component';
import { LogoutComponent } from './@shared/components/logout/logout.component';
import { RegisterComponent } from './@shared/components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './@shared/components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './@shared/modules/angular-material/angular-material.module';
import { SearchComponent } from './components/search/search.component';
import { TrendingSectionComponent } from './components/trending-section/trending-section.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from './movie.service';
import { MovieSearchResultComponent } from './components/movie-search-result/movie-search-result.component';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { SearchResultTimelineComponent } from './components/search-result-timeline/search-result-timeline.component';
import { FilterComponent } from './components/filter/filter.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SearchFinalComponent } from './components/search-final/search-final.component';
import { FilmCardTimelineComponent } from './components/film-card-timeline/film-card-timeline.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { FilmCardFavouriteComponent } from './components/film-card-favourite/film-card-favourite.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    LogoutComponent,
    NavbarComponent,
    WelcomeComponent,
    ProfileComponent,
    RankingsComponent,
    SearchComponent,
    TrendingSectionComponent,
    FilmCardComponent,
    MovieSearchResultComponent,
    SearchResultTimelineComponent,
    FilterComponent,
    MovieListComponent,
    SearchFinalComponent,
    FilmCardTimelineComponent,
    FavouritesComponent,
    FilmCardFavouriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatRadioModule,
    MatExpansionModule,
    MatRadioModule, 
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
