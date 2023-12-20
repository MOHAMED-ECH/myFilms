import { Routes } from '@angular/router';
import {DisplayMoviesComponent} from "./display-movies/display-movies.component";
import {DetailsComponent} from "./details/details.component";

/*export const routes: Routes = [ { path: "", redirectTo: "display-movies", pathMatch: "full" },
  {
    path: "display-movies",
    component: DisplayMoviesComponent,
    children: [{ path: "details/:id", component: DetailsComponent }]
  }
];*/



export const routes: Routes = [{path: "display-movies", component: DisplayMoviesComponent},
  {path: "", redirectTo: "display-movies", pathMatch: "full"},
    {path:"details/:id", component:DetailsComponent}
];

