import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewLoanService } from '../service/view-loan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  panForm: FormGroup;
  isOTPSent = false;
  isOTPVerified = false;
  constructor(private fb: FormBuilder, private route: Router, private service: ViewLoanService) {
    this.panForm = this.fb.group({
      panid: ['', [Validators.required, Validators.maxLength(10)]],
      otp:['',Validators.required]
    });

  }

  get panid(): FormControl {
    return this.panForm.get('panid') as FormControl;
  }

  get otp(): FormControl {
    return this.panForm.get('otp') as FormControl;
  }
  ngOnInit(): void {

  }
  sendOTP() {
    // Simulate sending OTP
    this.isOTPSent = true;
    this.panForm.controls['otp'].enable();
  }

  verifyOTP() {
    // Simulate OTP verification
    this.isOTPVerified = true;
  }

  applyLoan() {
    console.log("button clicked");
    this.route.navigate(['/applyloan']);
  }

  onSubmit() {

    this.service.viewLoanDetailsById(this.panForm.value.panid).subscribe((loanDetails :any) => {
      console.log(loanDetails);
      this.service.setLoanDetails(loanDetails);
      console.log("after", loanDetails);
      this.panForm.reset();
      this.route.navigate(['/viewloan']);

    },
      (error) => {

        this.route.navigate(["/error"]);
      })
  }
}
