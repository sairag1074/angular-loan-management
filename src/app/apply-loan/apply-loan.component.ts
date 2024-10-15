import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrl: './apply-loan.component.css'
})
export class ApplyLoanComponent {
  loanForm: FormGroup ;
  
  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      userName: ['', Validators.required],
      address: ['', Validators.required],
      mobno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      salary: ['', Validators.required],
      panid: ['', Validators.required],
      loanamount: ['', Validators.required],
      tenure: ['', Validators.required]
    });

  }
  get userName(): FormControl
  {
    return this.loanForm.get('userName') as FormControl;
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
      console.log('Form Submitted', this.loanForm.value);
      this.loanForm.reset();
 
    } else {
      console.log('Form is invalid');
      this.loanForm.reset();
    }
  }



}
