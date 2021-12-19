import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';

const routes: Routes = [
  {
    path       : '',
    pathMatch  : 'full',
    redirectTo : '/sign-up',
    data       : {title: 'Sign-up'}
},{
  path       : 'sign-up',
  pathMatch  : 'full',
  component  : SignUpComponent,
},
// Admin routes
// {
//   path       : '',
//   children   : [
//       {path: 'SignUpComponent', loadChildren: () => import('./Authentication/authentication.module').then(m => m.AuthenticationModule)},
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
