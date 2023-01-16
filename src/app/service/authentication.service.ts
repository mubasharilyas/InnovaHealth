import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(user: User) {

        return this.http.post<any>(`${environment.API_URL}/auth/register`, user);
    }
    login(email: any, password: any) {
        return this.http.post<any>(`${environment.API_URL}/auth/login`, { email, password })
            .pipe(tap(response => {

                if (response.success) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    localStorage.setItem('token', JSON.stringify(response.token));

                    this.currentUserSubject.next(response);
                    return response;
                } else {
                    return response.message;
                }

            }))
    }

    logout() {
        console.log("logout")
        this.currentUserSubject.next(null!);

        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login'])
        //  this.isLOgedin=false
    }
}
