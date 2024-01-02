import { Routes } from '@angular/router';
import { DisplayMoviesComponent } from './display-movies/display-movies.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
  {
    path: 'home',
    component: DisplayMoviesComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'details/:id', component: DetailsComponent },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup page',
  },
  { path: 'login', component: LoginComponent },
];
