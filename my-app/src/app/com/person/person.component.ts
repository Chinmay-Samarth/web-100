import { Component, OnInit, ViewChild, Output, EventEmitter, Injectable} from '@angular/core';
import { MatSort} from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({'providedIn':'root'})

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit{

  constructor(private http:HttpClient, private dialog:MatDialog, private router:Router
    , private snackbar:MatSnackBar){}

  @ViewChild(MatSort) sort:MatSort | undefined;
  @Output() changeToTable = new EventEmitter()

  displayedColumns:string[] = ['id','name','phone','amount','del'];
  dataSource:MatTableDataSource<any> | any;
  temp:any = []
  serverUrl:string='https://fastapi-server-chinmay-chinmay-samarth.vercel.app/';
  person_id:number | any

  ngOnInit(){
    this.http.get(this.serverUrl + 'user')
    .subscribe(
      (res)=>{
        this.temp = res
        this.temp.forEach((v:any) => {
          v.phone = parseFloat(v.phone)
        });
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort
      })
}

  onclick(person:object){
    this.changeToTable.emit(person)
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  addUser(){
    const dialogCon = new MatDialogConfig()
    dialogCon.disableClose = false
    dialogCon.autoFocus = true
    dialogCon.width = '60%'
    const dial = this.dialog.open(AddUserComponent,dialogCon)
    dial.afterClosed().subscribe(()=>{
      this.http.get(this.serverUrl+'user')
      .subscribe((res)=>{
        this.temp = res
        this.temp.forEach((v:any) => {
          v.phone = parseFloat(v.phone)
        });
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort;
        this.router.navigate([this.router.url])
      })
    })
  }


  deleteUser(id:number){
    this.http.delete(this.serverUrl + 'delete-user/'+id).subscribe((res)=>{console.log(res)
      this.snackbar.open('Person Deleted','Okay')})
    this.http.get(this.serverUrl+'user')
    .subscribe(
      (res)=>{
        this.temp = res
        this.temp.forEach((v:any) => {
          v.phone = parseFloat(v.phone)
        });
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort
        this.router.navigate([this.router.url])
        
      })
  }

  onEdit(id:number){
    this.person_id = id
    const dialCon = new MatDialogConfig()
    dialCon.disableClose = false
    dialCon.autoFocus = true
    dialCon.width = '60%'
    dialCon.data = {person_id:id}
    const dial = this.dialog.open(UpdateUserComponent,dialCon)
    dial.afterClosed().subscribe(()=>{
      this.http.get(this.serverUrl+'user')
      .subscribe((res)=>{
        this.temp = res
        this.temp.forEach((v:any) => {
          v.phone = parseFloat(v.phone)
        });
        this.dataSource = new MatTableDataSource(this.temp)
        this.dataSource.sort = this.sort;
        this.router.navigate([this.router.url])
      })
    })
  }
}
