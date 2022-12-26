import { Component, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonComponent } from '../person/person.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  person_id:number = 0;
  gotoPerson = new EventEmitter()

  serverUrl:string = 'https://fastapi-server-chinmay-web-100.onrender.com/'

  constructor(
    private http:HttpClient,
    private dialref:MatDialogRef<PersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private snackbat:MatSnackBar
  ){}

  onsubmit(pname:string,pphone:any,pamount:any){
    let id = this.data.person_id
    pamount = parseFloat(pamount)
    let person:any = {name:pname, phone:pphone, amount:pamount}
    this.http.put(this.serverUrl + 'update-user/' + id ,person)
    .subscribe((res)=>{
      this.snackbat.open('Person updated','Okay')
      console.log(res)

      this.dialref.close()
      this.gotoPerson.emit()
    })
  }
}
