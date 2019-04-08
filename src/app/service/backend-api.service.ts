import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/Register';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {


    private apiURL: string = "http://localhost:4000";

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
    };


    constructor(private httpClient: HttpClient) {
    }

    //Register user
    public signup(user: Register) {
        return this.httpClient.post(`${this.apiURL}/auth/signup`, user);
    }


    public getProfile() {
        return this.httpClient.get(`${this.apiURL}/api/profile`, this.httpOptions);
    }


    public uploadImage(image: File): Observable<any> {
        return this.httpClient.post(`${this.apiURL}/api/upload`, image);
    }





}
