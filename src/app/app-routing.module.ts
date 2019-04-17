import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//AuthGuard
import { AuthorizatedGuard } from './guards/authorizated.guard';


import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/user_views/profile/profile.component';
import { BenefitComponent } from './views/admin/benefit/benefit.component';
import { Role } from './models/role';
s

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthorizatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //Users Router
  { path: 'profile', component: ProfileComponent, canActivate: [AuthorizatedGuard] },
  { path: 'admin', component: BenefitComponent, canActivate: [AuthorizatedGuard], data: { roles: [Role.Admin] } }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
