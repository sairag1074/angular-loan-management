import { User } from "./user";


export interface Loan {

      loanId?:number;
      user?:User;
      loanAmount?:number;
      tenureInMonths?:number;
      intrestRate?:number;
      emi?:number;
      loanStatus?:string;
      rejectionReason?:string;
      createdAt?:Date
}
