import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { UpdateUser } from '../interfaces/update-user';

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


    constructor(private httpClient: HttpClient) {}

    //Register user
    public signup(user: Register) {
        return this.httpClient.post(`${this.apiURL}/auth/signup`, user);
    }


    public uploadImage(image: File): Observable<any> {
        const formData = new FormData();
        formData.append('imageInput', image);
        formData.append('token', localStorage.getItem('access_token'));

        return this.httpClient.post(`${this.apiURL}/api/upload`, formData);
    }


    public updateProfile(data: UpdateUser) {
        return this.httpClient.post(`${this.apiURL}/api/updateProfile`, data);
    }


    public getProfile() {
        return this.httpClient.get(`${this.apiURL}/api/profile`, this.httpOptions);
    }

}
