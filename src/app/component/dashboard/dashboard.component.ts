import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Totals } from '../../interface/totals';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoogleSheetsService } from '../../services/google-sheets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{
  public expenseLabel:string[] =[]
  public expenses:any =[]
  public incomeLabel:string[] = []
  public income:any = []
  public total:Totals ={
    Expenses:0,
    Investments:0,
    Income:0,
    Balances:0,
  }
  private expenseSub!:Subscription
  private incomeSub!:Subscription
  constructor(private expenseService: ExpenseService, private router:Router){

  }
  ngOnInit(): void {
      this.expenseService.getExpenses().subscribe((response) => {
        this.expenses = response.expense
        console.log(this.expenses)
        this.expenseLabel = Object.keys(response.expense[0])
        this.expenseLabel = this.expenseLabel.filter((data) => data!=="id")
        this.setTotals()
      })
      this.expenseService.getIncome().subscribe((response) => {
        this.income = response.income
        console.log(this.income)
        this.incomeLabel = Object.keys(response.income[0])
        this.incomeLabel = this.incomeLabel.filter((data) => data !=="id")
        this.setTotals()
      })
  }
  private setTotals(){
    if(this.expenses && this.income){
      const newExpenses= this.expenses.reduce((sum:number,item:any) => sum +item.amount,0)
      const newIncome = this.income.reduce((sum:number,item:any) => sum + item.income,0)
      const newBalances = newIncome - this.total.Investments - newExpenses
      this.total = {
        ...this.total,
        Expenses:newExpenses,
        Income:newIncome,
        Balances:newBalances,
      }
      console.log(this.total)
    }
  }

  public getKeys(event:any):(keyof Totals)[]{
    return Object.keys(event) as (keyof Totals)[]
  }
  public onCardClick(event:any){
    this.router.navigate([`/${event}`])
  }
  ngOnDestroy(): void {
      if(this.expenseSub){
        this.expenseSub.unsubscribe()
      }
      if(this.incomeSub){
        this.incomeSub.unsubscribe()
      }
  }

}
