import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
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
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  // phone: [
  //   '',
  //   [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
  // ],

  constructor(private router: Router, private fb: FormBuilder, public loginService: LoginService) {
    // Initialize the register form
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: new FormControl('', [Validators.required, phoneValidator()])
    });
  }
  registerModel ={}

  onSubmit() {
    if (this.registerForm.valid) {
      // this.loginService.register();
      const formData = this.registerForm.value;
      console.log(formData);
      this.loginService.register(formData.name, formData.surname, formData.phone, formData.email,formData.password).subscribe()
        // (response) => {
      alert('Registration successful');
      this.router.navigate(['/login']);
    } else {
      alert('Please fill in the form!');
    }
  }
}
