import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//AuthGuard
import { AuthorizatedGuard } from './guards/authorizated.guard';

import { Role } from './models/role';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/user-views/profile/profile.component';

//Admin Components
import { BenefitComponent } from './views/admin-views/benefit/benefit.component';
import { AddbenefitComponent } from './views/admin-views/addbenefit/addbenefit.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component:
      HomeComponent,
    canActivate: [AuthorizatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthorizatedGuard]
  },
  //Admins router
  {
    path: 'administration/benefit',
    component: BenefitComponent, // show all benefit
    canActivate: [AuthorizatedGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'administration/benefit/add',
    component: AddbenefitComponent, // add benefits
    canActivate: [AuthorizatedGuard],
    data: { roles: [Role.Admin] }
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
