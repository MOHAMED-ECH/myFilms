export interface Commentaire {
  //  ici les propriétés de  l'objet Commentaire en fonction de la structure de l'API
  contenu: string;
  auteur: string;
  reference: number; // Clé étrangère pour associer le commentaire au film.
}
