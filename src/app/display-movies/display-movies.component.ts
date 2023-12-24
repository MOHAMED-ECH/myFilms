import {Component, Injectable, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {filter, Observable} from "rxjs";
import {TmdbService} from "../services/tmdb.service";
import {Movie} from "../models/movie";
import {HttpClientModule} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Validators} from "@angular/forms";
import {DetailsComponent} from "../details/details.component";


@Component({
  selector: 'app-display-movies',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    HttpClientModule,
    FormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './display-movies.component.html',
  styleUrl: './display-movies.component.css'
})

@Injectable()
export class DisplayMoviesComponent implements OnInit {

  movies!: Movie[];
  moviesSrch!: Movie[];
  moviesFav!: Movie[];

  constructor(private tmdbService: TmdbService) {
  }

  ngOnInit(): void {

    this.getMovies();


  }

  onchange(searchTerm:String): void {

    // @ts-ignore
    this.searchMoviesDynamique(searchTerm);
  }

  getMovies(): void {
    this.tmdbService.getAllMovies().subscribe(result => {
      if (Array.isArray(result.results)) {
        this.movies = result.results;
        this.moviesSrch = this.movies;
      } else {
        console.log(result);
      }

    });
  }

  getUrl(name: any) {
    return this.tmdbService.getimagefromapi(name);
  }


  searchMovies(searchTerm: string): void {
    if (!searchTerm) {
      this.moviesSrch = this.movies;
    } else {
      this.tmdbService.searchMovies(searchTerm).subscribe(reponse => {
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
      this.tmdbService.searchMovies(searchTerm).subscribe(reponse => {
        this.moviesSrch = reponse.results;

        console.log(this.moviesSrch);
      });
    }
  }








  // protected readonly filter = filter;


  getFavorites() {

    this.moviesSrch = this.movies.filter(movie => movie.favorite);

  }

  toggleFavorite(movie: Movie) {
    movie.favorite = !movie.favorite;

    /*if (movie.favorite) {
      this.moviesFav.push(movie);
    } else {
      const index = this.moviesFav.findIndex(m => m.id === movie.id);
      if (index > -1) {
        this.moviesFav.splice(index, 1);
      }
    }*/
  }




}
