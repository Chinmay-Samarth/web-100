import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UpdatePersonTransactionComponent } from '../update-person-transaction/update-person-transaction.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})

export class PersonTableComponent implements OnInit{
  @ViewChild(MatSort) sort :MatSort | any
  @Input() person: any = {}
  changeTable = false
  displayedColumns : string[] = ['no','amount','submit date','transaction id','btn']
  dataSource:any;
  temp:any
  serverUrl:string ='https://fastapi-server-chinmay-web-100.onrender.com/'
  count:number = 0;
  temp2:any;
  
  constructor(private http:HttpClient, private router:Router, private dial:MatDialog,
    private snackbar:MatSnackBar){}
  ngOnInit(){
    
    this.http.get(this.serverUrl + 'user/'+ this.person.name)
    .subscribe((res) => {
      console.log(res)
      this.temp = res
      this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
      console.log(this.temp)
      this.dataSource = new MatTableDataSource(this.temp)
      this.dataSource.sort = this.sort
      this.temp2 = JSON.parse(JSON.stringify(res))
      let lastElement = this.temp2.pop()
      this.count= lastElement.no
    })

  }



  applyFilter(filtervalue:any){
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  onsubmit(){
    this.http.post(this.serverUrl + 'transact/' + this.person.name,{})
    .subscribe((res)=>{
      this.snackbar.open('Transaction added','Okay')
      console.log(res)
      this.http.get(this.serverUrl + 'user/'+ this.person.name)
      .subscribe((res) => {
        this.temp = res
        this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
        console.log(this.temp)
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort
        this.temp2 = JSON.parse(JSON.stringify(res))
        let lastElement = this.temp2.pop()
        this.count= lastElement.no
      })
    })
  }

  ondelete(id:number){
    this.http.delete(this.serverUrl + 'transact/' +id)
    .subscribe((res)=>{
      console.log(res)
      this.snackbar.open('transaction deleted','Okay')
      this.http.get(this.serverUrl + 'user/' + this.person.name)
      .subscribe((res:any)=>{
        this.temp = res
        this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
        console.log(this.temp)
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort
        this.temp2 = JSON.parse(JSON.stringify(res))
        let lastElement = this.temp2.pop()
        this.count= lastElement.no
      })
    })
  }

  onEdit(id:any, date:string){
    id = parseFloat(id)
    const dialCon = new MatDialogConfig()
    dialCon.disableClose = false
    dialCon.autoFocus = true
    dialCon.width = '60%'
    dialCon.data = {transaction_id:id, date:date}
    const dialref = this.dial.open(UpdatePersonTransactionComponent,dialCon)

    dialref.afterClosed().subscribe((res)=>{

      console.log(res)
      this.http.get(this.serverUrl + 'user/' + this.person.name).subscribe((res)=>{
        this.temp = res
        this.temp.forEach((v:any)=>{v.submit_date = formatDate(v.submit_date,'dd-MM-yyyy','en-IN','+0530')})
        console.log(this.temp)
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort
        this.temp2 = JSON.parse(JSON.stringify(res))
        let lastElement = this.temp2.pop()
        this.count= lastElement.no
      })
    })
    }
  }
