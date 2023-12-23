import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../models/movie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  baseurl = "https://api.themoviedb.org/3/movie/popular";
  apikey = "78ce52945c3a64fd0c84e4b97a4090ca";

  constructor(private httpClient: HttpClient) { }

  getAllMovies(){
    return this.httpClient.get<any>(`${this.baseurl}?api_key=${this.apikey}`);
  }

  getimagefromapi( poster_path: string){
    return 'https://image.tmdb.org/t/p/w300' + poster_path
  }


  searchMovies(searchTerm: string) {
    return this.httpClient.get<any>(`https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=en-US&query=${searchTerm}%20&page=1&include_adult=true`)

  }

  getMoviesById(id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apikey}`;
    return this.httpClient.get<any>(url);
    console.log(url);
  }


}
