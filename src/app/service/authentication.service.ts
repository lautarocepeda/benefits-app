import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private apiURL: string = "http://localhost:4000";

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    constructor(private httpClient: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    //Signin with email and password
    public signin(data: Login) {
        return this.httpClient.post<User>(`${this.apiURL}/auth/signin`, data)
            .pipe(tap(user => {

                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;

            }));
    }


    public logout() {
        //remove user from localStorage
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        this.router.navigate(['']);
    }


    public validateToken(token: string) {
        return this.httpClient.post(`${this.apiURL}/validate_token`, { 'token': token }).pipe(map(res => {
            return res;
        }))
    }


}
