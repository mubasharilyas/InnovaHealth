import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user:User
  constructor(private http:HttpClient,private authentication:AuthenticationService) { 
    this.user=this.authentication.currentUserValue
    console.log("userss",this.user)
  }

  register(user: User) {

    return this.http.post<any>(`${environment.API_URL}/register`, user);
}

get(uri: string) {
  let headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization':`Bearer ${JSON.parse(localStorage.getItem('token')!)}` 
  });
  
  return this.http.get(`${environment.API_URL}/${uri}`,{headers})
}
getContact(uri: string,page:Number,sort:Number,_search?:string) {
  let headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization':`Bearer ${JSON.parse(localStorage.getItem('token')!)}` 
  });
  return this.http.get(`${environment.API_URL}/${uri}/${page}/sortBy/${sort}/${_search}`,{headers})
}
getAlerts(uri: string,page:Number,sort:Number) {
  let headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization':`Bearer ${JSON.parse(localStorage.getItem('token')!)}` 
  });
  return this.http.get(`${environment.API_URL}/${uri}/${page}/sortBy/${sort}`,{headers})
}

}
