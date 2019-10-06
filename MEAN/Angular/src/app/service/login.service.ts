import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modules/login/login/login';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private router: Router) { }
  userLogin(login): Observable<Login> {
    let authenticatedHeader = new HttpHeaders();
    authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');
    return this.http.post<Login>(`${this.baseURL}/user-authentication`, login, { headers: authenticatedHeader });
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  loggedOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login/user-login']);  
  }
}
