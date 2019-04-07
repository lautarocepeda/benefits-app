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
import { LoadingSpinnerComponent } from './views/loading-spinner/loading-spinner.component';


//Views
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { CarrouselComponent } from './views/carrousel/carrousel.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/user_views/profile/profile.component'; //User Profile

//Guards
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { MainComponent } from './views/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarrouselComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    LoadingSpinnerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthorizatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
