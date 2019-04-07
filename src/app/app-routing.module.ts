import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//AuthGuard
import { AuthorizatedGuard } from './guards/authorizated.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { MainComponent } from './views/main/main.component';

import { ProfileComponent } from './views/user_views/profile/profile.component';


const routes: Routes = [

  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthorizatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //Users Router
  { path: 'profile', component: ProfileComponent, canActivate: [AuthorizatedGuard] }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
