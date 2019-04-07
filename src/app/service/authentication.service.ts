import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/Login';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private apiURL: string = "http://localhost:4000";

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;


    constructor(private httpClient: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    //Signin with email and password
    public signin(data: Login) {
        return this.httpClient.post<any>(`${this.apiURL}/auth/signin`, data)
            .pipe(tap(user => {

                if (user && user.token) {
                    localStorage.setItem('currentUser', user.user);
                    localStorage.setItem('access_token', user.token);

                    this.currentUserSubject.next(user);
                }

                return user;

            }));
    }


    public validateToken(token: string) {
        return this.httpClient.post(`${this.apiURL}/validate_token`, { 'token': token }).pipe(map(res => {
            return res;
        }))
    }


    public logout() {
        //remove user from localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);

        this.router.navigate(['']);
    }


    public get currentUserValue() {
        return this.currentUserSubject.value;
    }


}
