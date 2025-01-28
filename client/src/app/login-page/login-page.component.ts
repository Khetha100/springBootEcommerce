import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && !emailPattern.test(email)) {
      return { invalidEmail: true };
    }
    return null;
  };
}

function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    const phonePattern = /^\+?[0-9]{10}$/; // strictly 10 digits

    if (phone && !phonePattern.test(phone)) {
      return { invalidPhone: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,public loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      // phone: new FormControl('', [Validators.required, phoneValidator()]),
    });
  }

  loginModel = {}

  onSubmit() {
    // if (this.loginForm.valid) {
      if (this.loginForm.valid) {
        const formData = this.loginForm.value;
        console.log(formData);
        this.loginService.login(formData.email,formData.password)
      alert('Login successful');

      this.router.navigate(['/products'])

    } else {
      if (this.loginForm.controls['password'].hasError('minlength')) {
        alert('Password should be at least 6 characters');
      } else if (this.loginForm.controls['password'].hasError('required')) {
        alert('Password is required');
      } else if (this.loginForm.controls['email'].hasError('email')) {
        alert('Please enter a valid email');
      } else if (this.loginForm.controls['email'].hasError('required')) {
        alert('Email is required');
      } else if (this.loginForm.controls['phone'].hasError('invalidPhone')) {
        alert('Phone number should be 10 digits.');
      } else {
        alert('Please fill in the form correctly');
      }
    }
  // }
}
}