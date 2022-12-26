import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PersonTableComponent } from '../person-table/person-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-person-transaction',
  templateUrl: './update-person-transaction.component.html',
  styleUrls: ['./update-person-transaction.component.css']
})
export class UpdatePersonTransactionComponent {
gotoPersonTable = new EventEmitter
constructor(
  @Inject(MAT_DIALOG_DATA)public data:any,
  private http:HttpClient,
  private dialref: MatDialogRef<PersonTableComponent>,
  private snackbar:MatSnackBar
){}
  serverUrl:string = 'https://fastapi-server-chinmay-web-100.onrender.com/'

  
  onupdate(date:string){
    let record:any = {id:this.data.transaction_id, date:date}
    this.http.put(this.serverUrl + 'update-transact', record)
    .subscribe((res)=>{
      this.snackbar.open('Transaction updated','Okay')
      console.log(res)
      this.dialref.close()
      this.gotoPersonTable.emit()
    })
  }
}
