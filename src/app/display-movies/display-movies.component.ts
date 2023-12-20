import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {filter, Observable} from "rxjs";
import {TmdbService} from "../services/tmdb.service";
import {Movie} from "../models/movie";
import {HttpClientModule} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Validators} from "@angular/forms";


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
export class DisplayMoviesComponent implements OnInit {

  movies!: Movie[];
  moviesSrch!: Movie[];

  constructor(private tmdbService: TmdbService) {
  }

  ngOnInit(): void {

    this.getMovies();


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




  protected readonly filter = filter;
}
