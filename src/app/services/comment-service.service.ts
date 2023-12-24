import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";

import {FilmAPI} from "../models/FilmAPI";
import {Commentaire} from "../models/Commentaire";



@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private httpClient: HttpClient) { }



 getComments(filmId: number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`http://localhost:8080/comments/${filmId}`)
      .pipe(
        catchError(error => this.handleCommentsFetchError(error, filmId))
      );
  }

  private handleCommentsFetchError(error: any, filmId: number): Observable<Commentaire[]> {
    if (error.status === 404) {
      // If there are no comments found for the film, return an empty array
      console.error(`No comments found for film with id: ${filmId}`, error);
      return of([]); // Returns an Observable of an empty array
    } else {
      // For all other errors, re-throw the error
      return throwError(() => error);
    }
  }


  addComment(comment: Commentaire): Observable<Commentaire> {
    return this.httpClient.post<Commentaire>(`http://localhost:8080/comments/`, comment)
      .pipe(
        catchError(error => {
          // Handle errors here, perhaps by re-throwing or logging them
          return throwError(() => error);
        })
      );
  }




}
