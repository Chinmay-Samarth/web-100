import { formatDate } from '@angular/common';
import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-dates',
  templateUrl: './transaction-dates.component.html',
  styleUrls: ['./transaction-dates.component.css']
})
export class TransactionDatesComponent implements OnInit, OnChanges {
  constructor(
    private http:HttpClient,
    private snackbar:MatSnackBar,
  ){}

  @ViewChild(MatSort) sort:MatSort | any
  date:any = formatDate(new Date(), 'dd-MM-yyyy','en-IN','+0530')
  date_:Date = new Date()
  serverUrl = 'https://fastapi-server-chinmay-chinmay-samarth.vercel.app/'
  datasource:MatTableDataSource<any> | any
  temp:any
  displayedColumns = ['transaction id','submit date','amount','name','phone','btn']

  previous(){
    this.date_.setDate(this.date_.getDate() - 1)
    this.date = formatDate(this.date_,'dd-MM-yyyy','en-IN','+0530')
    this.tableload()
  }
  next(){
    this.date_.setDate(this.date_.getDate() + 1)
    this.date = formatDate(this.date_,'dd-MM-yyyy','en-IN','+0530')
    this.tableload()
  }
  ngOnInit(): void {
    this.tableload()
  }
  tableload(){
    this.http.get(this.serverUrl + 'by-date/' + formatDate(this.date_,'yyyy-MM-dd','en-IN','+0530') )
    .subscribe((res)=>{
      this.temp = res
      this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
      this.datasource = new MatTableDataSource(this.temp)
      this.datasource.sort = this.sort
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  applyFilter(filtervalue:any){
    this.datasource.filter = filtervalue.trim().toLowerCase()
  }
  onDelete(id:number){
    this.http.delete(this.serverUrl + 'transact/' + id)
    .subscribe((res)=>{console.log(res)
      this.snackbar.open('Transaction deleted','Okay')})
    
    this.http.get(this.serverUrl + 'transact')
    .subscribe((res)=>{
      this.temp = res;
      this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
      this.datasource = new MatTableDataSource(this.temp)
      this.datasource.sort = this.sort
      this.ngOnInit()
    })
  }
}