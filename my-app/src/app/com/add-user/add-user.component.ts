import { Component, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonComponent } from '../person/person.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  constructor(
    private http:HttpClient,
    private diareg:MatDialogRef<PersonComponent>,
    private router:Router,
    private per:PersonComponent,
    private snackbar:MatSnackBar
  ){}
  serverUrl:string = 'https://fastapi-server-chinmay-web-100.onrender.com/';
  gotoPerson = new EventEmitter();

  onsubmit(name:string,phone:any,amount:any){
    amount = parseFloat(amount)
    console.log(name,phone,amount)
    let person:any = {name:name, phone:phone, amount:amount}
    person = JSON.stringify(person)
    console.log(person)
    const headers = { 'content-type': 'application/json'}
    this.http.post(this.serverUrl + 'user',person,{'headers':headers})
    .subscribe((res)=>{console.log(res)
    this.snackbar.open('Person added','Okay')})
    this.onclose()
  }
  onclose(){
    this.diareg.close()
    console.log('I reached')
    this.gotoPerson.emit()
  }
}


