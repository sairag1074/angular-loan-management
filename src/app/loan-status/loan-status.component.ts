import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrl: './loan-status.component.css'
})
export class LoanStatusComponent implements OnInit {

  updatedLoanStatus:string="Rejected";

  updatedLoanMessage:string="";

  ngOnInit(): void {
    
      this.updatedLoanStatus= JSON.parse(localStorage.getItem("loan")!).loanStatus;
      this.updatedLoanMessage= JSON.parse(localStorage.getItem("loan")!).rejectionReason;

  }

   

}
