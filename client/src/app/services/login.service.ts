import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.usernameEmail.next(storedEmail);
    }
  }
  usernameEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  login(email: string, password: string) {
    const body = { email, password };

    this.usernameEmail.next(email);
    localStorage.setItem('userEmail', email);

    console.log('User logged in: ', email);
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.usernameEmail.next('');
    console.log('User logged out');
  }

  register(
    name: string,
    surname: string,
    phone_number: string,
    email: string,
    password: string
  ) {
    console.log('At register front end service');
    const body = { name, surname, phone_number, email, password };
    return this.http.post<any>(`${this.loginUrl}/register`, body);
  }

  updateUser(
    id: string,
    updates: { name?: string; email?: string; phone_number?: string }
  ) {
    return this.http.post<any>(`${this.loginUrl}/users/${id}`, updates);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.loginUrl}/users/${id}`);
  }
}
