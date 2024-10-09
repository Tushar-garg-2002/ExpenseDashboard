import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CategoricalData } from '../../interface/totals';
import { ExpenseService } from '../../services/expense.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categorical-table',
  templateUrl: './categorical-table.component.html',
  styleUrl: './categorical-table.component.css'
})
export class CategoricalTableComponent implements OnInit,OnDestroy {
  public data:any = []
  public labels:string[] = []
  public categoryData:CategoricalData = {}
  private subscription!:Subscription
  constructor(private expenseService: ExpenseService){
    
  }
  ngOnInit(): void {
    this.subscription = this.expenseService.getExpenses().subscribe((response) => {
      this.data = response.expense
      this.labels = this.data.map((element : any) => element.description)
      this.categoryData = this.getCategoricalData()
    })
  }
  private getCategoricalData():CategoricalData{
    const categoryData: CategoricalData ={}

    this.data.forEach((element: any) => {
      const description = element.description;
      if (!categoryData[description]) {
        categoryData[description] = [];
      }
      categoryData[description].push(element);
    });

    return categoryData;
  }
  public getTotal(value:any){
    return value.reduce((acc:number,curr:any) => {
      return acc + curr.amount
    },0)
  }
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
