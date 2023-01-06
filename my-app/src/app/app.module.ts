import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './com/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './com/home/home.component';
import { PersonComponent } from './com/person/person.component';
import { MatTableModule} from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonTableComponent } from './com/person-table/person-table.component';
import { TransactionComponent } from './com/transaction/transaction.component'
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './com/add-user/add-user.component';
import { AddTransactionComponent } from './com/add-transaction/add-transaction.component';
import { UpdateUserComponent } from './com/update-user/update-user.component';
import { UpdatePersonTransactionComponent } from './com/update-person-transaction/update-person-transaction.component'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TransactionDatesComponent } from './com/transaction-dates/transaction-dates.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    PersonComponent,
    PersonTableComponent,
    TransactionComponent,
    AddUserComponent,
    AddTransactionComponent,
    UpdateUserComponent,
    UpdatePersonTransactionComponent,
    TransactionDatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponent]
})
export class AppModule { }
