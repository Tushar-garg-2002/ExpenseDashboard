import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SHEET_API } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private userName = "tgarg"
  private password = "tgargDashboard"
  private headers = new HttpHeaders({
    "Authorization": `Basic ${btoa(this.userName + ':' + this.password)}`
  })
  constructor(private client:HttpClient) { }
  getExpenses(){
    // return [
    //   {date: '1-10-2024', amount: 2350, description: 'Others', id: 2},
    //   {date: '1-10-2024', amount: 12000, description: 'FE', id: 3},
    //   {date: '1-10-2024', amount: 2183, description: 'PE', id: 4},
    //   {date: '1-10-2024', amount: 700, description: 'PE', id: 5},
    //   {date: '1-10-2024', amount: 561, description: 'Flat', id: 6},
    //   {date: '1-10-2024', amount: 789, description: 'Raashan', id: 7},
    //   {date: '1-10-2024', amount: 174, description: 'Travel', id: 8},
    //   {date: '1-10-2024', amount: 135, description: 'Raashan', id: 9},
    //   {date: '1-10-2024', amount: 17500, description: 'Rent', id: 10},
    //   {date: '1-10-2024', amount: 174, description: 'Travel', id: 11},
    //   {date: '1-10-2024', amount: 165, description: 'Food', id: 12},
    //   {date: '1-10-2024', amount: 1928, description: 'Party', id: 13},
    //   {date: '1-10-2024', amount: 11441, description: 'PE', id: 14},
    //   {date: '3-10-2024', amount: 118, description: 'Travel', id: 15},
    //   {date: '3-10-2024', amount: 65, description: 'Food', id: 16},
    //   {date: '3-10-2024', amount: 86, description: 'Travel', id: 17},
    //   {date: '3-10-2024', amount: 276, description: 'Food', id: 18},
    //   {date: '4-10-2024', amount: 190, description: 'Others', id: 19}
    // ]
    return this.client.get<any>(SHEET_API.expense)

  }
  getIncome(){
    // return [
    //   {date: '4-10-2024', amount: 95000, description: '', id: 1},
    //   {date: '4-10-2024', amount: 9000, description: '', id: 2}
    // ]
    return this.client.get<any>(SHEET_API.income)
  }
}
