import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {

    private apiURL: string = "http://localhost:4000";

    // auth user
    private currentUser;

    constructor(private httpClient: HttpClient, private AuthService: AuthenticationService) {
        this.currentUser = this.AuthService.currentUserValue;
    }


    upload(image: File, type: string): Observable<any> {
        const formData = new FormData();
        formData.append('imageInput', image);
        formData.append('token', this.currentUser.token);
        formData.append('type', type);

        return this.httpClient.post(`${this.apiURL}/api/profile/img/upload`, formData);
    }


}
