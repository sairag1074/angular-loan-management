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

      console.log("setLOan metyhod",loan);

        this.loanDetails=loan;
      console.log("after setting loan",this.loanDetails);
   }

    viewLoanDetailsById(pancardId:string,otp:number,mail:string):Observable<any>{

      return  this.httpClient.get(this.apiUrl+"/view",{params:new HttpParams().set("mail",mail).set("otp",otp).set("panId",pancardId)});
    }

    applyForLoan(loan:Loan):Observable<any>{
       
       return this.httpClient.post(this.apiUrl + "/apply",loan);
    }

    makePartPayment(loanId:number,partPayment:number):Observable<any>{

       
          return this.httpClient.put(this.apiUrl+"/partpayment/"+loanId,new HttpParams().set("partPayment",partPayment));
    }

    updateLoan(loanId:number,loanAmount:number,tenureInMonths:number):Observable<any>{

        return this.httpClient.put(this.apiUrl+"/updateLoan/"+loanId,new HttpParams().set("loanAmount",loanAmount).set("tenureInMOnths",tenureInMonths));
    }

    findUserByPanId(panId:string):Observable<any>{

       return this.httpClient.get(this.apiUrl+"/PAN/"+panId);
    }

    getAllLoanDetails():Observable<any>{

        return this.httpClient.get(this.apiUrl);
    }
    getPaymentHistory(loanId: number): Observable<{ date: string, amount: number }[]> {
      return this.httpClient.get<{ date: string, amount: number }[]>(`${this.apiUrl}/loans/${loanId}/payments`);
    }

    generateOtp(pandId:string):Observable<any>{

          return this.httpClient.post(this.apiUrl+"/generate",new HttpParams().set("panId",pandId));
    }
}
