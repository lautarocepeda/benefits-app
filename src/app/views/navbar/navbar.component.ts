import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    //User Auth
    userIsLoggin;


    constructor(private AuthService: AuthenticationService) {

        //check user auth
        this.AuthService.currentUser.subscribe(user => this.userIsLoggin = user);

    }

    
    logout() {
        console.log("[USER] logout")
        // App signout
        return this.AuthService.logout();
    }


    ngOnInit() {
    }


}
