import {Component, Injectable, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {filter, Observable} from "rxjs";
import {TmdbService} from "../services/tmdb.service";
import {Movie} from "../models/movie";
import {HttpClientModule} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Validators} from "@angular/forms";
import {DetailsComponent} from "../details/details.component";
import {FavorisService} from "../services/favoris.service";
import {FilmAPI} from "../models/FilmAPI";
import {Subscription} from "rxjs";
import {UsersloginService} from "../services/users.login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-movies',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    HttpClientModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './display-movies.component.html',
  styleUrl: './display-movies.component.css',
})
@Injectable()
export class DisplayMoviesComponent implements OnInit {
  movies!: Movie[];
  moviesSrch!: Movie[];
  moviesFav!: Movie[];
  isAuthenticated = false;
  userSub: Subscription;

  constructor(
    private tmdbService: TmdbService,
    private favorisService: FavorisService,
    private userLoginService: UsersloginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log('user', user);
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.userLoginService.logout();
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

  onchange(searchTerm: String): void {
    // @ts-ignore
    this.searchMoviesDynamique(searchTerm);
  }

  getMovies(): void {
    this.tmdbService.getAllMovies().subscribe((result) => {
      if (Array.isArray(result.results)) {
        this.movies = result.results;
        this.moviesSrch = this.movies;
      } else {
        console.log(result);
      }

      this.favorisService.getAllFav().subscribe((aplaodedFilms) => {
        for (let mov of this.moviesSrch) {
          for (let fav of aplaodedFilms) {
            if (mov.id === fav.id) {
              mov.favorite = true;
            }
          }
        }
        console.log('Updated favorites:', this.moviesSrch);
      });
    });
  }

  getUrl(name: any) {
    return this.tmdbService.getimagefromapi(name);
  }

  searchMovies(searchTerm: string): void {
    if (!searchTerm) {
      this.moviesSrch = this.movies;
    } else {
      this.tmdbService.searchMovies(searchTerm).subscribe((reponse) => {
        this.moviesSrch = reponse.results;
        this.movies = this.moviesSrch;
      });
    }
  }

  // la recherche dynamique des filmes :

  searchTerm: any;
  searchMoviesDynamique(searchTerm: string): void {
    if (!searchTerm) {
      this.moviesSrch = this.movies;
    } else {
      this.tmdbService.searchMovies(searchTerm).subscribe((reponse) => {
        this.moviesSrch = reponse.results;

        console.log(this.moviesSrch);
      });
    }
  }

  // protected readonly filter = filter;

  /* getFavorites() {

   // this.moviesSrch = this.movies.filter(movie => movie.favorite);

   let aplaodedFilms!: FilmAPI[];

    this.favorisService.getAllFav().subscribe(result => {
      aplaodedFilms=result;
      console.log("aplaodedFilms :",aplaodedFilms);

    });

    for (let mov of this.moviesSrch) {
      for (let fav of aplaodedFilms) {
        if (mov.id == fav.id) {
          mov.favorite = true;
        }
      }
    }

    this.moviesSrch = this.movies.filter(movie => movie.favorite);

  }*/

  getFavorites() {
    this.favorisService.getAllFav().subscribe((aplaodedFilms) => {
      for (let mov of this.moviesSrch) {
        for (let fav of aplaodedFilms) {
          if (mov.id === fav.id) {
            mov.favorite = true;
          }
        }
      }

      // Filter and update the moviesSrch array after the favorites have been identified
      this.moviesSrch = this.movies.filter((movie) => movie.favorite);

      console.log('Updated favorites:', this.moviesSrch);
    });
  }

  toggleFavorite(movie: Movie) {
    movie.favorite = !movie.favorite;

    let moviToAdd: FilmAPI = {
      id: movie.id,
      titre: movie.title,
    };

    if (movie.favorite) {
      this.favorisService.addFav(moviToAdd).subscribe((result) => {
        console.log('movie added to favorites :', result);
      });
    } else {
      this.favorisService.deleteFav(movie.id).subscribe((result) => {
        console.log('movie deleted from favorites :', result);
      });
    }
  }
}
