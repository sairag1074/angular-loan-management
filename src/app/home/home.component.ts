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
  otpIsInvalid=false;
  noLoan=false;
  otpRecievedFromBackend:string="";
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

         this.isOTPSent=false;
         this.otpIsInvalid=false;
         this.noLoan=false;

  }
  sendOTP(pandId:string) {

    this.service.generateOtp(pandId).subscribe((data)=>{

         console.log(data);
         this.otpRecievedFromBackend=data;
         
    },(error)=>{
      if(error.error.text=="Otp sent successfully"){
        this.isOTPSent=true;
      }})
  }

  applyLoan() {
    console.log("button clicked");
    this.route.navigate(['/applyloan']);
  }

  onSubmit() {

      this.service.viewLoanDetailsById(this.panForm.value.panid,this.panForm.value.otp).subscribe((data) => {
      
          this.panForm.reset();
           localStorage.clear();
           localStorage.setItem("loan",JSON.stringify(data));
          this.route.navigate(["/viewloan"]);
    },
      (error) => {

            if(error.status==401){

                 this.otpIsInvalid=true;
            }
            else if(error.status=400){

                this.noLoan=true;
            }
      })
  }
}
