import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BarGraphComponent } from './component/bar-graph/bar-graph.component';
import { InvestmentTableComponent } from './component/investment-table/investment-table.component';
import { ExpenseTableComponent } from './component/expense-table/expense-table.component';
import { IncomeTableComponent } from './component/income-table/income-table.component';
import { CategoricalTableComponent } from './component/categorical-table/categorical-table.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarGraphComponent,
    InvestmentTableComponent,
    ExpenseTableComponent,
    IncomeTableComponent,
    CategoricalTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
