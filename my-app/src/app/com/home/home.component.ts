import { Component, ViewChild } from '@angular/core';
import { PersonTableComponent } from '../person-table/person-table.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(PersonTableComponent) changeTable:boolean | any
  constructor(

  ){}
  url:string = ''
  toTable:boolean = false
  person:object ={}


  changeTab(person:object){
    console.log(this.toTable) 
    if(person!=null){
      this.toTable = !this.toTable
      this.changeMain('/table')
      this.person = person
      console.log(this.person)
    }
  }

  
  changeMain(url:string){
    this.url = url
  }
}
