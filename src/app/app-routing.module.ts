import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Signup/signup.component';
import {KYCComponent} from './kyc/kyc.component'

const routes: Routes = [
  { path: "signUp",component:SignUpComponent },
  { path: "pandetails",component:KYCComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
