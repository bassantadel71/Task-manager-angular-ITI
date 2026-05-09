import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl, User } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //getAll users mn el db.json get http://localhost:3000/users
  //adduser post http://localhost:3000/users 
  http = inject(HttpClient);

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${apiUrl}/users`)
  }

  registerUser(user: User): Observable<User>{
    return this.http.post<User>(`${apiUrl}/users`,user);
  }

}
