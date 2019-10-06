import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDataComponent } from './user-data/user-data.component';



const routes: Routes = [
  { path: 'user-login', component: LoginComponent },
  { path: 'user-signup', component: SignupComponent },
  { path: 'user-data', component: UserDataComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
