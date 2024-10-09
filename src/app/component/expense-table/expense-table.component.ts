import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent implements OnInit, OnDestroy {
public expenses !:any
private subscription!:Subscription
  constructor(private expenseService:ExpenseService){

  }
  public labels!:string[]
  public value!:any[]
  ngOnInit(): void {
    this.subscription = this.expenseService.getExpenses().subscribe((response) => {
      this.expenses = response.expense
      this.labels = Object.keys(this.expenses[0])
      this.labels = this.labels.filter((item) => item !== "id")
      this.value = this.expenses
    })
  }
  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe()
      }
  }

}
