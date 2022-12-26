import { Component, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionComponent } from '../transaction/transaction.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  constructor(
    private http:HttpClient,
    private dial:MatDialogRef<TransactionComponent>,
    private snackbar:MatSnackBar
  ){}

  gotoTransactions = new EventEmitter()
  serverUrl:string = 'https://fastapi-server-chinmay-web-100.onrender.com/' 

  onsubmit(name:string){
    this.http.post(this.serverUrl + 'transact/' + name,{})
    .subscribe((res)=>{
      this.snackbar.open('Transaction added','Okay')
      console.log(res)
      this.dial.close()
      this.gotoTransactions.emit()
    })
  }
}
