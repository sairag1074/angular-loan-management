import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewLoanDetailsComponent } from './view-loan-details/view-loan-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { ErrorComponent } from './error/error.component';
import { PartPaymentComponent } from './part-payment/part-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewLoanDetailsComponent,
    HomeComponent,
    ApplyLoanComponent,
    ErrorComponent,
    PartPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
