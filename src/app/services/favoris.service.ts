import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FilmAPI} from "../models/FilmAPI";
import {catchError, Observable, of, throwError} from "rxjs";
import {Commentaire} from "../models/Commentaire";

@Injectable({
  providedIn: 'root'
})
export class FavorisService {


  private apiURL = 'http://localhost:8080/fav';
  constructor(private http: HttpClient) { }


  getAllFav(): Observable<FilmAPI[]> {
    return this.http.get<FilmAPI[]>(this.apiURL).pipe(
      catchError(error => this.handleError(error))
    );

  }

  private handleError(error: any): Observable<FilmAPI[]> {
    if (error.status === 404) {
      console.error("auccun film n'est trouvé :", error);
      return of([]); // Returns an Observable of an empty array
    } else {
      // For all other errors, re-throw the error
      return throwError(() => error);
    }
  }

  addFav(film: FilmAPI): Observable<FilmAPI> {
    return this.http.post<FilmAPI>(this.apiURL, film) .pipe(
      catchError(error => {
        // Handle errors here, perhaps by re-throwing or logging them
        return throwError(() => error);
      })
    );
  }



  deleteFav(id: number): Observable<FilmAPI> {
    return this.http.delete<FilmAPI>(`${this.apiURL}/${id}`) .pipe(
      catchError(error => {
        // Handle errors here, perhaps by re-throwing or logging them
        return throwError(() => error);
      })
    );
  }





}
