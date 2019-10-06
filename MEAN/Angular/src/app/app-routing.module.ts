import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login/user-signup', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule'},
  { path: 'signup', loadChildren: './modules/login/login.module#LoginModule'},
  { path: 'user', loadChildren: './modules/login/login.module#LoginModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
