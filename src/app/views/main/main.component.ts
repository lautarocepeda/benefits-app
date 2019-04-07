import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


    routerLogin: boolean = true;
    routerRegister: boolean;

    constructor(private router: Router) {
        //verified current router url.
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd))
            .subscribe(event => {
                if (event.url === '/register') {
                    this.routerRegister = true;
                    this.routerLogin = false;
                } else if (event.url === '/login') {
                    this.routerRegister = false;
                    this.routerLogin = true;
                }
            });
    }

    ngOnInit() {
    }

}
