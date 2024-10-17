import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ViewLoanService } from '../service/view-loan.service';
import { Loan } from '../model/loan';
import { User } from '../model/user';
import { controllers } from 'chart.js';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrl: './apply-loan.component.css'
})
export class ApplyLoanComponent {
  loanForm: FormGroup ;

  loan:Loan={};

    user:User={};

    laonStatus=false;
  
  constructor(private fb: FormBuilder,private route:Router,private service:ViewLoanService) {
    this.loanForm = this.fb.group({
      userName: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      address: ['', Validators.required],
      mobno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      salary: ['', [Validators.required, this.salaryValidator()]],
      panid: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[A-Za-z0-9]+$')]],
      loanamount: ['', [Validators.required, Validators.min(50000)]],
        tenure: ['', [Validators.required,  this.tenureValidator()]]
    });

  }


  salaryValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      const value = control.value;
      if (value < 15000) {
        return { minSalary: true };
      } else if (value > 10000000) {
        return { maxSalary: true };
      }
      return null;
    };
  }
  tenureValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value < 12) {
        return { minTenure: true };
      } else if (value > 360) {
        return { maxTenure: true };
      }
      return null;

    };
  }
  
  get userName(): FormControl
  {
    return this.loanForm.get('userName') as FormControl;
  }
  get email(): FormControl
  {
    return this.loanForm.get('email') as FormControl;
  }
  
  get address(): FormControl
  {
    return this.loanForm.get('address') as FormControl;
  }
  get mobno(): FormControl
  {
    return this.loanForm.get('mobno') as FormControl;
  }
  get salary(): FormControl
  {
    return this.loanForm.get('salary') as FormControl;
  }
  get panid(): FormControl
  {
    return this.loanForm.get('panid') as FormControl;
  }
  get loanamount(): FormControl
  {
    return this.loanForm.get('loanamount') as FormControl;
  }
  get tenure(): FormControl
  {
    return this.loanForm.get('tenure') as FormControl;
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
     
      

      const Toast =Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
  
      Toast.fire({
        icon: 'success',
        title: 'Added in successfully'
      });

         this.user={"userName":this.loanForm.value.userName,"email":this.loanForm.value.email,"address":this.loanForm.value.address,"mobile":this.loanForm.value.mobno,"salary":this.loanForm.value.salary,"panId":this.loanForm.value.panid};
         this.loan={"loanAmount":this.loanForm.value.loanamount,"tenureInMonths":this.loanForm.value.tenure,"user":this.user};
      this.service.applyForLoan(this.loan).subscribe((data)=>{
            this.loanForm.reset();
            localStorage.clear();
            localStorage.setItem("loan",JSON.stringify(data));

            if(data.loanStatus=="Rejected"){
              this.route.navigate(['/loanstatus']);
            }

            //this.route.navigate(['/home']);
      },(error)=>{
          
              if(error.error.status==403){
                localStorage.clear();
                this.laonStatus==true;
              }
      })

 
    } else {
      console.log('Form is invalid');
      this.loanForm.reset();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      
      Toast.fire({
        icon: 'error',
        title: 'Something went wrong!'
      });
    }
  }



}
