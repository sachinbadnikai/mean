import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUp } from '../modules/login/signup/signup';
import { Designation } from '../modules/login/signup/designation';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseURL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  userPost(signup): Observable<SignUp> {
    console.log('signup data',signup)
    let authenticatedHeader = new HttpHeaders();
    authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');
    return this.http.post<SignUp>(`${this.baseURL}/user`, signup, { headers: authenticatedHeader });
  }

  getDesignation(): Observable<Designation[]> {
    return this.http.get<Designation[]>(`${this.baseURL}/designation`);
  }
}
