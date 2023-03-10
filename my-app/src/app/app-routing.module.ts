import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './com/home/home.component';
import { SignInComponent } from './com/sign-in/sign-in.component';

const routes: Routes = [
  {path: "", component:SignInComponent},
  {path: "home", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
