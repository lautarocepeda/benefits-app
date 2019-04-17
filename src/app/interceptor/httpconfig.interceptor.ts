import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {



    constructor(private spinner: NgxSpinnerService, private AuthService: AuthenticationService) {}

    //function which will be called for all http calls
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //Auth user.
        let currentUser = this.AuthService.currentUserValue;


        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        
        console.log(request);
        
        //Show spinner
        this.spinner.show();

        return next.handle(request).pipe(
            tap(
                event => {
                    //logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        console.log("api call success :", event);
                    }
                },
                error => {
                    //logging the http response to browser's console in case of a failuer
                    if (event instanceof HttpResponse) {
                        console.log("api call error :", event);
                    }
                }
            ), finalize(() => {
                //Hide spinner loader
                this.spinner.hide();
            })
        );
    }
}