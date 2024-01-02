import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from '../services/users.login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AlertComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersloginService,
    private router: Router
  ) {
    // Inject the FormBuilder service
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitSignUp() {
    this.submitForm();
  }
  onHandleError() {
    this.error = null;
  }
  private submitForm() {
    const formGroup = this.signUpForm;

    if (formGroup.invalid) {
      return;
    }

    const formData = formGroup.value;
    const authObservable = this.usersService.signUp(
      formData.email,
      formData.password
    );

    authObservable.subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        this.error = err;

        console.log(err);
      },
    });
    formGroup.reset();
  }
  onSignin() {
    this.router.navigate(['/login']);
  }
}
