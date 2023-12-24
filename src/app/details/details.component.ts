import {Component, Injectable, OnInit} from '@angular/core';
import {Movie} from "../models/movie";
import {TmdbService} from "../services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import {MovieDetails} from "../models/MovieDetails";
import {NgForOf, NgStyle} from "@angular/common";
import {DisplayMoviesComponent} from "../display-movies/display-movies.component";
import {FormsModule} from "@angular/forms";
import {CommentServiceService} from "../services/comment-service.service";
import {Commentaire} from "../models/Commentaire";




@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    FormsModule
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
    private commentService: CommentServiceService

  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.movieService.getMoviesById(this.route.snapshot.params["id"]).subscribe(
        data => {
          this.movieDetails = data;
          this.genres = this.movieDetails.genres;
         this.getComments();
        //  console.log("movie detailes :"+this.movieDetails);
          // Initialiser ici newComment
          this.newComment = { contenu: '', auteur: '', filmId: this.movieDetails.id };

        },
        error => {
          console.error('Erreur lors de la récupération des détails du film', error);
        }
      );
    });
  }



// get comments :

  getComments(): void {
    this.commentService.getComments(this.movieDetails.id).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }





 // addComment

  newComment!: Commentaire;
  comments: Commentaire[] = [];

  submitComment(): void {
    if (!this.newComment) {
      console.log("movie details id :",this.movieDetails.id)
    }
    if (this.newComment) {

      this.comments.push({...this.newComment});
      console.log("movie details id :",this.movieDetails.id)
      console.log("new comment :",this.newComment);

      this.commentService.addComment(this.movieDetails.id, this.newComment).subscribe(
        (comment) => {
          console.log('Commentaire ajouté', comment);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
        }
      );
      this.newComment.auteur ='' ; // Reset le champ de commentaire
      this.newComment.contenu = '';
    }
  }





}
