import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewLoanService } from '../service/view-loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part-payment',
  templateUrl: './part-payment.component.html',
  styleUrl: './part-payment.component.css'
})
export class PartPaymentComponent {

  loanNumber:number=0;
  prePaymentForm: FormGroup;
  paymentHistory: { date: string, amount: number }[] = [];

  constructor(private fb: FormBuilder,private service:ViewLoanService,private route:Router) {
    this.prePaymentForm = this.fb.group({
      loanId: ['', Validators.required],
      partPayment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
       this.loanNumber=JSON.parse(localStorage.getItem("loan")!).loanId;
  }

  onSubmit() {
   
         this.service.makePartPayment(this.loanNumber,this.prePaymentForm.value.partPayment).subscribe((data)=>{
            localStorage.clear();
            localStorage.setItem("loan",JSON.stringify(data));
            this.route.navigate(['/viewloan']);
         })
  }
}
