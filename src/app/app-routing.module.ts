import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { HomeComponent } from './home/home.component';
import { ViewLoanDetailsComponent } from './view-loan-details/view-loan-details.component';

const routes: Routes = [

    {path:'applyloan',component:ApplyLoanComponent},
   
    {path:'home',component:HomeComponent},
    
    {path:'viewloan',component:ViewLoanDetailsComponent},
    {path:'**',component:HomeComponent},

    {path:'',redirectTo:'home',pathMatch:'full'}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
