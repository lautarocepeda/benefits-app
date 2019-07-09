import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';


@Injectable({
    providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {


    constructor(private AuthService: AuthenticationService, private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const currentUser = this.AuthService.currentUserValue;

    
        if (currentUser) {

            let token = JSON.parse(localStorage.getItem('currentUser'))['token'];

            if (token) {
                this.AuthService.validateToken(token);
            }

            // check if route is restricted by role
            if(route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                this.router.navigate(['/']);
                return false;
            }

            // authorised
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;

    }
}
