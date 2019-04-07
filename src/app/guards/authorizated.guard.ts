import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {


    constructor(private AuthService: AuthenticationService, private router: Router) {
    }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const currentUser = this.AuthService.currentUserValue;

        if (currentUser) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;

    }



}
