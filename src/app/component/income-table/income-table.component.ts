import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.css'
})
export class IncomeTableComponent implements OnInit,OnDestroy {
  public income !:any
  private subscription!:Subscription
  constructor(private expenseService:ExpenseService){

  }
  public labels!:string[]
  public value!:any[]
  ngOnInit(): void {
    this.subscription = this.expenseService.getIncome().subscribe((response) => {
      this.income = response.income
      this.labels = Object.keys(this.income[0])
      this.labels = this.labels.filter((item) => item !== "id")
      this.value = this.income
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
