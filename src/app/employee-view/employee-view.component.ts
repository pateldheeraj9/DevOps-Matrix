import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
interface People {
  firstname?: string;
  lastname?: string;
  age?: string;
}
@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent {
  lang = [
    { name: "HTML" },
    { name: "ReactJS" },
    { name: "Angular" },
    { name: "Bootstrap" },
    { name: "PrimeNG" },
  ];
  tableData: People[] = [];
  cols: any[] = [];
  selected: any = null;
  gfg: any[] = [
    { name: 'Active' },
    { name: 'InActive' }
  ];
  
  
  constructor() { }

  ngOnInit() {
    this.selected = this.gfg[0];

  
      this.cols = [
          {
              field: 'firstname',
              header: 'First Name'
          },
          {
              field: 'lastname',
              header: 'Last Name'
          },
          {
              field: 'age',
              header: 'Age'
          },
      ];
      this.tableData = [
          {
              firstname: 'David',
              lastname: 'ace',
              age: '40',
          },
          {
              firstname: 'AJne',
              lastname: 'west',
              age: '40',
          },
          {
              firstname: 'Mak',
              lastname: 'Lame',
              age: '40',
          },
         
      ];
  }


}

