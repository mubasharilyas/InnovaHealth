import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../features/auth/models/user.model';
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

 

get(uri: string) {
 
  
  return this.http.get(`${environment.API_URL}/${uri}`)
}
getContact(uri: string,page:Number,sort:Number,_search?:string) {
 
  return this.http.get(`${environment.API_URL}/${uri}/${page}/${sort}/${_search}`)
}
getAlerts(uri: string,page:Number,sort:Number) {
 
  return this.http.get(`${environment.API_URL}/${uri}/${page}/${sort}`)
}

}
