import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: LoginDTO) {
    console.log('auth service.ts', loginData);//qui ha dati - visti in console
    // Passare username e password
    return this.http.post(`${this.springBootUrl}/users/login`,loginData);

  }

  register(registerData: RegisterDTO) {
    // TODO Chiamare il servizio per la registrazione e redirigere l'utente alla root per il login
    return this.http.post(`${this.springBootUrl}/users/`,registerData);

  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

  getCurrentUserId() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user ? user.id : null;
  }
}
