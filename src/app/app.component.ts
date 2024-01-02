import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';

import { UsersloginService } from './services/users.login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {

 

  constructor(
    
    private userLoginService: UsersloginService
  ) {}
  ngOnInit() {
    this.userLoginService.autoLogin();
    
  }
  
  
}
