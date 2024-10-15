import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  panForm: FormGroup ;
 
  constructor(private fb: FormBuilder) {
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
 
  onSubmit(): void {
    if (this.panForm.valid) {
      console.log('Form Submitted', this.panForm.value);
      this.panForm.reset();
 
    } else {
      console.log('Form is invalid');
      this.panForm.reset();
    }
  }
}
