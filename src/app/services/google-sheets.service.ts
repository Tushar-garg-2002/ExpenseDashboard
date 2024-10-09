import { Injectable } from '@angular/core';
import { GoogleAuth, JWT } from 'google-auth-library';
import {google, sheets_v4} from 'googleapis';
@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private sheets!:sheets_v4.Sheets
  private auth!:GoogleAuth
  constructor() { 
    
    this.initiateService()
  }
  async initiateService(){
    // this.auth= new GoogleAuth({
    //   keyFile:"./src/app/keys.json",
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    // })
    const authClient:JWT = await this.auth.getClient() as JWT
      this.sheets = google.sheets({
        version:'v4',
        auth:authClient
      })
  }
  async fetchData(sheetId:string,range:string):Promise<any>{
    try{
      const client = await this.auth.getClient()
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId:sheetId,
        range:range,
      })
      return response
    } catch(error){
      console.error("Error")
      throw error
    }
  }
}
