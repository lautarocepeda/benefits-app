import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'app-cv';

    //User Auth
    userIsLoggin;

    constructor(private router: Router, private spinner: NgxSpinnerService, private AuthService: AuthenticationService) {
        //check user auth
        this.AuthService.currentUser.subscribe(user => this.userIsLoggin = user)
    }

    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.spinner.show();
                } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                    this.spinner.hide();
                }
            });
    }

}
