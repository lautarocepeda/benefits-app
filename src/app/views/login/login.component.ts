import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';


declare var FB: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginData: Login;


    constructor(private lform: FormBuilder, private router: Router, private AuthService: AuthenticationService, private socialAuthService: AuthService) {
        const currentUser = this.AuthService.currentUserValue;
        if (currentUser) {
            this.router.navigate(['']);
        }

        this.validateForm();
    }


    loginFacebook() {
        let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (fbResponse) => {
                console.log('Facebook Login => ', fbResponse);
                if (fbResponse.authToken) {
                    this.AuthService.signinFacebook(fbResponse.authToken);
                }
            },
            (err) => {
                console.error('Facebook Login - Error', err);
            }
        );
    }


    validateForm() {
        this.loginForm = this.lform.group({
            loginFormEmail: ['', [Validators.required, Validators.email]],
            loginFormPassword: ['', Validators.required]
        });
    }


    onSubmit() {
        this.loginData = this.saveLoginForm();

        this.doLogin(this.loginData);
    }


    saveLoginForm() {
        const login = {
            email: this.loginForm.get('loginFormEmail').value,
            password: this.loginForm.get('loginFormPassword').value
        };

        return new Login(login);
    }


    doLogin(data: Login) {
        this.AuthService.signin(data)
            .pipe(first())
            .subscribe(
                response => {
                    this.router.navigate(['']);
                },
                (error: any) => {

                    const password = this.loginForm.get('loginFormPassword');

                    //user or password - invalid errors
                    switch (error.error.type) {
                        case "invalidUser":
                            const email = this.loginForm.get('loginFormEmail');

                            //reset value password input
                            password.reset();

                            email.setErrors({ 'invalid': true });
                            break;

                        case "invalidPassword":
                            //reset value password input
                            password.reset();

                            password.setErrors({ 'invalid': true })
                            break;
                    }

                }
            )
    }

    ngOnInit() {}

}
