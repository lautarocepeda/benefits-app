import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//Form
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'


//Router
import { AppRoutingModule } from './app-routing.module';


//Interceptor HTTP
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';


//Spinner Loading
import { NgxSpinnerModule } from 'ngx-spinner';

//Social Login
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";

//Views
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { HomeComponent } from './views/user-views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/user-views/profile/profile.component';
import { MainComponent } from './views/main/main.component';
import { BenefitComponent } from './views/user-views/benefit/benefit.component';
import { AddbenefitComponent } from './views/admin-views/addbenefit/addbenefit.component';
import { ModalRedeemComponent } from './views/user-views/benefit/modal-redeem/modal-redeem.component';
import { ModalVerifyComponent } from './views/admin-views/verifycode/modal-verify/modal-verify.component';
import { MybenefitsComponent } from './views/user-views/mybenefits/mybenefits.component';

//Pipes
import { GenderPipe } from './pipes/gender.pipe';

//Guards
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { UsersComponent } from './views/admin-views/users/users.component';
import { VerifycodeComponent } from './views/admin-views/verifycode/verifycode.component';

//Qr Reader
import { ZXingScannerModule } from '@zxing/ngx-scanner';



let config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("403483487119955", { scope: 'email,user_birthday,user_gender'})
    }
]);

export function provideConfig() {
    return config;
}


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MainComponent,
        ProfileComponent,
        BenefitComponent,
        AddbenefitComponent,
        GenderPipe,
        ModalRedeemComponent,
        ModalVerifyComponent,
        MybenefitsComponent,
        UsersComponent,
        VerifycodeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        NgxSpinnerModule,
        ZXingScannerModule,
        SocialLoginModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        ModalRedeemComponent,
        ModalVerifyComponent
    ],
    providers: [
        AuthorizatedGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true
        },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
