import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from '../services/users.login.service';
import { Router, RouterLink } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, AlertComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;
  constructor(
    private formBuilder: FormBuilder,

    private router: Router,
    private usersService: UsersloginService
  ) {
    // Inject the FormBuilder service

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    this.submitForm();
  }

  onHandleError() {
    this.error = null;
  }

  private submitForm() {
    const formGroup = this.loginForm;

    if (formGroup.invalid) {
      return;
    }

    const formData = formGroup.value;
    const authObservable = this.usersService.login(
      formData.email,
      formData.password
    );

    authObservable.subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        console.log(response);
      },
      error: (err) => {
        this.error = err;

        console.log(err);
      },
    });
    formGroup.reset();
  }
 
}
