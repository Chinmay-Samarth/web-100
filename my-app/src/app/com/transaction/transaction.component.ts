import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort|any;
  dataSource:any;
  temp:any = []
  displayedColumns:string[] = ['transaction id','submit date','amount','name','phone','btn']
  serverUrl:string = 'https://fastapi-server-chinmay-chinmay-samarth.vercel.app/'

  constructor(
    private http:HttpClient,
    private dialog:MatDialog,
    private router:Router,
    private snackbar:MatSnackBar
    ){}
  ngOnInit(){
  this.http.get(this.serverUrl + 'transact').subscribe(
    (res)=>{
      this.temp = res
      this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
      this.dataSource = new MatTableDataSource(this.temp)
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(filtervalue:any){
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  onsubmit(){
    const dialCon = new MatDialogConfig()
    dialCon.disableClose = false
    dialCon.autoFocus = true
    dialCon.width = '60%'
    const dial = this.dialog.open(AddTransactionComponent, dialCon);
    dial.afterClosed().subscribe(()=>{
      this.http.get(this.serverUrl + 'transact').subscribe(
        (res)=>{
          this.temp = res
          this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
          this.dataSource = new MatTableDataSource(this.temp)
          this.dataSource.sort = this.sort
          this.router.navigate([this.router.url])
          
        })
    })
  }
  onDelete(id:number){
    this.http.delete(this.serverUrl + 'transact/' + id)
    .subscribe((res)=>{console.log(res)
      this.snackbar.open('Transaction deleted','Okay')})
    
    this.http.get(this.serverUrl + 'transact')
    .subscribe((res)=>{
      this.temp = res;
      this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
      this.dataSource = new MatTableDataSource(this.temp)
      this.dataSource.sort = this.sort
      this.router.navigate([this.router.url])
    })
  }
}
