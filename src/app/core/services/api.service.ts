import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {
  }



  get(url: string) {
    return this.http.get(`${environment.API_URL}/${url}`)
  }

}
