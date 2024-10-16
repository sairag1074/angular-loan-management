import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ViewLoanService } from '../service/view-loan.service';
import { Loan } from '../model/loan';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-view-loan-details',
  templateUrl: './view-loan-details.component.html',
  styleUrls: ['./view-loan-details.component.css']
})
export class ViewLoanDetailsComponent implements OnInit {

  loanDetails: Loan = {};
  outStandingBalance: number = 0;
  TotalBorrowings: number = 0;
  currentOutstanding: number = 0;
  totalMonthsEMILeft: number = 0;
  monthlyEMIMoney: number = 0;

  constructor(private service: ViewLoanService, private route: Router) {}

  makePayment() {
    this.route.navigate(['/partpayment']);
  }

  chart: any;
  ngOnInit(): void {
    this.loanDetails = this.service.getLoanDetails();
    this.outStandingBalance = this.loanDetails.loanAmount!;
    this.TotalBorrowings = this.loanDetails.emi! * this.loanDetails.tenureInMonths!;
    this.currentOutstanding = this.loanDetails.loanAmount!;
    this.totalMonthsEMILeft = this.loanDetails.tenureInMonths!;
    this.monthlyEMIMoney = this.loanDetails.emi!;
    this.numbers = Array.from({ length: this.totalMonthsEMILeft }, (_, i) => i + 1);

   
    this.data = {
      labels: ["Total Borrowings", "Current Outstanding"],
      datasets: [{
        axis: 'y',
        data: [this.TotalBorrowings, this.currentOutstanding],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)'
        ],
        borderWidth: 0.5,
        borderPercentage: 1,
        categoryPercentage: 1,
        barThickness: 50,
        maxBarThickness: 50
      }]
    };
 this.chart = new Chart("MyChart", {
      type: 'bar',
      data: this.data,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
    

     
  
  }

  readonly monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  currentMonth: string = this.monthNames[new Date().getMonth()];
  currentYear: number = new Date().getFullYear();

  numbers: number[] = Array.from({ length: this.totalMonthsEMILeft }, (_, i) => i + 1);

  public monthCalculator(index: number): string {
    let monthIndex = (new Date().getMonth() + index) % 12;
    return this.monthNames[monthIndex];
  }

  public yearCalculator(index: number): number {
    let yearIndex = Math.floor((new Date().getMonth() + index) / 12);
    return new Date().getFullYear() + yearIndex;
  }

  public data: any;
}

