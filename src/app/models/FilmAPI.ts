import {Commentaire} from "./Commentaire";

export interface FilmAPI {

  idFilm: number; // Peut-être l'identifiant correspondant à un film de l'API TMDB, par exemple.
  commentaires: Commentaire[]; // Tableau de commentaires associés au film.
}
