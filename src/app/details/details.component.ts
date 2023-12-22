import {Component, Injectable, OnInit} from '@angular/core';
import {Movie} from "../models/movie";
import {TmdbService} from "../services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import {MovieDetails} from "../models/MovieDetails";
import {NgForOf, NgStyle} from "@angular/common";
import {DisplayMoviesComponent} from "../display-movies/display-movies.component";




@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

@Injectable()
export class DetailsComponent implements OnInit{
  movieDetails!: MovieDetails; // Type approprié pour les détails du film

  genres: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: TmdbService,
    private displayMoviesComponent: DisplayMoviesComponent
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieService.getMoviesById(this.route.snapshot.params["id"]).subscribe(
        data => {
          this.movieDetails = data;
          this.genres = this.movieDetails.genres;
          console.log("movie detailes :"+this.movieDetails);
        },
        error => {
          console.error('Erreur lors de la récupération des détails du film', error);
        }
      );
    });
  }


 /* toggleFavoriteDetails(movieDetails: MovieDetails) {

    movieDetails.favorite = !movieDetails.favorite;

    let movieToUpdate = this.displayMoviesComponent.movies.find(movie => movie.id === movieDetails.id);
    if (movieToUpdate) {
      movieToUpdate.favorite = movieDetails.favorite;



      if (movieToUpdate.favorite) {
        this.displayMoviesComponent.moviesFav.push(movieToUpdate);
      } else {
        const index = this.displayMoviesComponent.moviesFav.findIndex(m => m.id === movieToUpdate?.id);
        if (index > -1) {
          this.displayMoviesComponent.moviesFav.splice(index, 1);
        }
      }

    }




  }*/
}
