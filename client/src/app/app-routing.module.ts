import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {AppLayoutComponent} from "./shared/layouts/app-layout/app-layout.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/classes/auth.guard";


const routes: Routes = [
  {
    path:'', component: AuthLayoutComponent, children: [
      {path:'', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegisterComponent}
    ]
  },
  {
    path:'', component: AppLayoutComponent, canActivate: [AuthGuard], children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
