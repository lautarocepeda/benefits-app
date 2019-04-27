import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


declare var FB: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    loginData: Login;


    constructor(private lform: FormBuilder, private router: Router, private AuthService: AuthenticationService) {
        const currentUser = this.AuthService.currentUserValue;
        if (currentUser) {
            this.router.navigate(['']);
        }

        this.validateForm();
    }



    ngOnInit() {
        // initialize sdk facebook
        this.facebookInit();

    }



    loginFacebook() {

        let permissions = ['email', 'user_birthday', 'user_gender'];

        console.log("submit login to facebook");
        // FB.login();
        FB.login((response) => {
            if (response.authResponse) {
                this.AuthService.signinFacebook(response.authResponse.accessToken);
            } else {
                console.log('User login failed');
            }
        }, { scope: permissions });
    }


    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          console.log('connected');
        } else {
          // The person is not logged into your app or we are unable to tell.
          console.log("please log in...");
        }
      }

  
    facebookInit() {
        (window as any).fbAsyncInit = function () {
            FB.init({
                appId: '403483487119955',
                cookie: true,
                xfbml: true,
                version: 'v3.2'
            });
            FB.AppEvents.logPageView();

            

            FB.getLoginStatus((response) => {
                console.log(response);
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }



    //Validate form.
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









}
