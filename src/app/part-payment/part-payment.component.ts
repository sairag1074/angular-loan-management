import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-part-payment',
  templateUrl: './part-payment.component.html',
  styleUrl: './part-payment.component.css'
})
export class PartPaymentComponent {
  prePaymentForm: FormGroup;
  paymentHistory: { date: string, amount: number }[] = [];

  constructor(private fb: FormBuilder) {
    this.prePaymentForm = this.fb.group({
      loanId: ['', Validators.required],
      partPayment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
    
  }

  onSubmit() {
    if (this.prePaymentForm.valid) {

    }
  }
}
