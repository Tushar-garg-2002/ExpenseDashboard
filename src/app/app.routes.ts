import { Routes } from '@angular/router';
import { ExpenseTableComponent } from './component/expense-table/expense-table.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoricalTableComponent } from './component/categorical-table/categorical-table.component';
import { IncomeTableComponent } from './component/income-table/income-table.component';

export const routes: Routes = [
    {path:"",  component: DashboardComponent},
    {path:"Expenses", component:ExpenseTableComponent},
    {path:"category-table",component:CategoricalTableComponent},
    {path:"Income",component:IncomeTableComponent}
];

