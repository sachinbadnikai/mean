import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modules/login/user-data/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  userPost(user): Observable<User> {
    let authenticatedHeader = new HttpHeaders();
    authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');
    return this.http.post<User>(`${this.baseURL}/user-detail`, user, { headers: authenticatedHeader });
  }

  getuserDetails(user_id): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/user-detail/${user_id}`);
  }

  deleteUserDetails(id): Observable<User> {
    const token=localStorage.getItem('token')
    let authenticatedHeader = new HttpHeaders();
    authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');
    authenticatedHeader = authenticatedHeader.set('Authorization', token);
    return this.http.delete<User>(`${this.baseURL}/user-detail/${id}`,{ headers: authenticatedHeader });
  }

  updateUserDetails(id,data){
    const token=localStorage.getItem('token')
    let authenticatedHeader = new HttpHeaders();
    authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');
    authenticatedHeader = authenticatedHeader.set('Authorization', token);
    return this.http.put<User>(`${this.baseURL}/user-detail/${id}`, data,{ headers: authenticatedHeader });

  }

  getById(id): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/user-detailById/${id}`);
  }
}
