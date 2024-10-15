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
  panForm: FormGroup ;
 
  constructor(private fb: FormBuilder,private route:Router,private service:ViewLoanService) {
    this.panForm = this.fb.group({
      panid: ['', [Validators.required,Validators.maxLength(10)]]
    });
 
  }
  
  get panid(): FormControl
  {
    return this.panForm.get('panid') as FormControl;
  }

 
  ngOnInit(): void {
   
  }

     applyLoan(){
         console.log("button clicked");
         this.route.navigate(['/applyloan']);  
     }
 
  onSubmit(){
      
         this.service.viewLoanDetailsById(this.panForm.value).subscribe((loanDetils)=>{
            this.service.setLoanDetails(loanDetils);
            this.panForm.reset();
              this.route.navigate(['/viewloan']);

         },
        (error)=>{

                 
        })
  }
}
