import { Injectable } from '@angular/core';
import { Loan } from '../model/loan';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewLoanService {

  apiUrl="http://localhost:8080/api/loans";

  loanDetails:Loan={};

constructor(private httpClient:HttpClient) { }


   getLoanDetails():Loan{
     
      return this.loanDetails;
   }

   setLoanDetails(loan:Loan){
         console.log("inside setLoan" + loan);
        this.loanDetails=loan;
   }

    viewLoanDetailsById(pancardId:string):Observable<any>{

      return  this.httpClient.get(this.apiUrl + "/"+ pancardId)
    }

    applyForLoan(loan:Loan):Observable<any>{
       
       return this.httpClient.post(this.apiUrl + "/apply",loan);
    }

    makePartPayment(loanId:number,partPayment:number):Observable<any>{

       
          return this.httpClient.put(this.apiUrl+"/partpayment/"+loanId,new HttpParams().set("partPayment",partPayment));
    }

    updateLoan(loanId:number,loanAmount:number,tenureInMonths:number):Observable<any>{

        return this.httpClient.put(this.apiUrl+"/updateLoan/"+loanId,new HttpParams().set("loanAmount",loanAmount).set("tenureInMonths",tenureInMonths));
    }

    findUserByPanId(panId:string):Observable<any>{

       return this.httpClient.get(this.apiUrl+"/PAN/"+panId);
    }

    getAllLoanDetails():Observable<any>{

        return this.httpClient.get(this.apiUrl);
    }
}
