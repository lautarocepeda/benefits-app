import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//AuthGuard
import { AuthorizatedGuard } from './guards/authorizated.guard';

import { Role } from './models/role';

import { HomeComponent } from './views/user-views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/user-views/profile/profile.component';
import { MybenefitsComponent } from './views/user-views/mybenefits/mybenefits.component';

//Admin Components
import { BenefitComponent } from './views/user-views/benefit/benefit.component';
import { AddbenefitComponent } from './views/admin-views/addbenefit/addbenefit.component';
import { UsersComponent } from './views/admin-views/users/users.component';
import { VerifycodeComponent } from './views/admin-views/verifycode/verifycode.component';

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
  {
    path: 'benefits',
    component: BenefitComponent, // show all benefit
    canActivate: [AuthorizatedGuard]
  },
  {
    path: 'mycoupons',
    component: MybenefitsComponent, // show all benefit
    canActivate: [AuthorizatedGuard]
  },
  //Admins router
  {
    path: 'administration/benefit/add',
    component: AddbenefitComponent, // add benefits
    canActivate: [AuthorizatedGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'administration/users',
    component: UsersComponent,
    canActivate: [AuthorizatedGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'administration/verify',
    component: VerifycodeComponent,
    canActivate: [AuthorizatedGuard],
    data: { roles: [Role.Admin] }
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
