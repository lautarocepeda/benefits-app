import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { UpdateUser } from '../interfaces/update-user';
import { Benefit } from '../models/benefit';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {

    public apiURL: string = "http://localhost:4000";

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


    public updateProfile(data: UpdateUser) {
        return this.httpClient.put(`${this.apiURL}/api/profile/update`, data);
    }

    public getUsers() {
        return this.httpClient.get(`${this.apiURL}/api/users`);
    }


    public getProfile() {
        return this.httpClient.get(`${this.apiURL}/api/profile`, this.httpOptions);
    }


    public getBenefits(): Observable<Benefit[]> {
        return this.httpClient.get<Benefit[]>(`${this.apiURL}/api/benefits`);
    }

    public getBenefit(id:number) {
        return this.httpClient.get<Benefit>(`${this.apiURL}/api/benefit/` + id);
    }


    public getMyCoupons(): Observable<Benefit> {
        return this.httpClient.get<Benefit>(`${this.apiURL}/api/coupons`);
    }


    public createBenefit(data: any) {
        return this.httpClient.post(`${this.apiURL}/api/benefits/create`, data);
    }


    public redeemBenefit(benefitId: object) {
        return this.httpClient.post(`${this.apiURL}/api/benefits/exchange`, benefitId);
    }


    public verifyCode(code: any) {
        return this.httpClient.get(`${this.apiURL}/api/benefit/verify`, { params: {"code" : code} } );
    }



}
