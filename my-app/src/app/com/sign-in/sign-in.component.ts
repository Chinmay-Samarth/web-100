import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  constructor(private http:HttpClient, private route:Router,
    private snackbar:MatSnackBar,){}

  sign_password:number | any = '' 

  ngOnInit(){
    this.http.get('https://fastapi-server-chinmay-chinmay-samarth.vercel.app/')
  }

  onsign(){
    this.http.get('https://fastapi-server-chinmay-chinmay-samarth.vercel.app/password')
    .subscribe((res)=>{
      if(this.sign_password == res){

        this.route.navigateByUrl('/home')
      }
      else{

        this.snackbar.open('Wrong password','Okay')
      }
    })
  }
}
