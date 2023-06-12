import { Component, ElementRef, ViewChild } from "@angular/core";

import { InputTextModule } from "primeng/inputtext";

import { ButtonModule } from "primeng/button";

import { DropdownModule } from "primeng/dropdown";

import { Observable } from "rxjs";
import * as FileSaver from 'file-saver';

import { TeamDetailService } from "../Service/teamdetails/team-detail.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { EditTeamDetailsComponent } from "../edit-team-details/edit-team-details.component";
import { ViewTeamDetailsComponent } from "../view-team-details/view-team-details.component";

@Component({
  selector: "app-team-details",

  templateUrl: "./team-details.component.html",

  styleUrls: ["./team-details.component.css"],
  providers: [DialogService],
})
export class TeamDetailsComponent {
  ref!: DynamicDialogRef;

  //For drop down

  lang = [
    { name: "HTML" },

    { name: "ReactJS" },

    { name: "Angular" },

    { name: "Bootstrap" },

    { name: "PrimeNG" },
  ];

  tableData: any = [];
  tableData1: any = [];
  loading: boolean | undefined;


  cols: any[] = [];

  selected: any = '';

  gfg: any[] = [{ name: "Active" }, { name: "InActive" }];

  filteredTableData: any = [];

  searchTerm: string = "";

  radioSearchTerm: string = "";

  SelectedValue: any = 0;

  constructor(
    private httpProvider: TeamDetailService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getdetails();
  }

  showEditTeamDetails(id: any) {

    this.ref = this.dialogService.open(EditTeamDetailsComponent, {
      width: "80%",
      height: "70%",
      contentStyle: { overflow: "auto", background: "white" },
      baseZIndex: 10000,
      data: { id: id },
      dismissableMask: true,
    });

    // this.ref.onClose.subscribe(() => {
    //   this.getdetails();
    // });
  }

  hideDialog() {
    this.ref.close();
    this.ref.destroy();
    this.getdetails();
  }


  showViewTeamDetails(id: any) {
    this.ref = this.dialogService.open(ViewTeamDetailsComponent, {
      width: "80%",
      height: "70%",
      contentStyle: { overflow: "auto", background: "white" },
      baseZIndex: 10000,
      data: { id: id },
      dismissableMask: true,
    });

    this.ref.onClose.subscribe(() => {
      this.getdetails();
    });
  }
  
  exportExcel() {

    let obj:any=[{}];

  for(let i=0;i<this.tableData.length;i++)
  {
    obj.push({ 
      'NAME': this.tableData[i].name, 
      'PROJECT NAME': this.tableData[i].projectName, 
      'TEAM SIZE': this.tableData[i].totalSize,
      'CLI LEAD': this.tableData[i].cli_Lead,
      'PER LEAD':this.tableData[i].per_Lead,
      'SCRUM MASTER':this.tableData[i].scrumMaster,
  })
  }
  obj.shift();    
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(obj);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'],skipHeader: true
      };
        const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, 'TeamDetails');
    });
    
}

saveAsExcelFile(buffer: any, fileName: string): void {
  
    let EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
}



  async getdetails() {
    this.loading = true;

    this.httpProvider.getAllDetails().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;

          console.log(resultData);

          if (resultData) {
            this.loading=false;

            this.tableData = resultData;
            this.tableData1 = this.tableData;

            this.filteredTableData = this.tableData;
          }
        }
      },

      (error: any) => {
        if (error) {
          console.log(error);

          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.tableData = [];
            }
          }
        }
      }
    );
  }

  filterData(searchTerm: string) {
    // console.log(this.selected.name)

    if (searchTerm == "") {
      this.tableData = this.filteredTableData;
    } else {
      this.tableData = this.filteredTableData.filter((data: { name: string,projectName:string,cli_Lead:string,per_Lead:string,scrumMaster:string }) =>
      {
      
      return ( 
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.cli_Lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.per_Lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.scrumMaster.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      } 
       );
    }
  }

  radioFilterData() {
    // if(this.selected === 'Active'){
    //  this.selected='InActive'
    // }
    // else{
    //  this.selected='Active'
    // }

    console.log(this.selected);
    if (this.selected === "All") {
      this.tableData = this.filteredTableData;
    }
    else{
    if (this.selected === "InActive") {
      this.tableData = this.filteredTableData.filter(
        (data: { status: number }) => data.status === 1
      );
    } else {
      this.tableData = this.filteredTableData.filter(
        (data: { status: number }) => data.status !== 1
      );
    }
  }
}

  deleteProductDialog: boolean = false;
  deletedid:number=0;
  deletedname:string = '';

  deleteProduct(id: number,name:string) {
    this.deletedid=id;
    this.deletedname=name;
    this.deleteProductDialog = true;
}

  deleteTeamDetailsById(id: any) {
      this.httpProvider.deleteTeamDetailsById(id).subscribe(
        (data: any) => {
          if (data.statusText == "OK") {
            this.deleteProductDialog = false;
            this.getdetails();
          }
        },
        (error: any) => {}
      );
    
  }
  onDropdownSelected(SelectedValue: number) {
    if (this.SelectedValue == 0 || this.SelectedValue ==  9999 ) {
      this.tableData = this.filteredTableData;
    } else {
      this.tableData = this.filteredTableData.filter((data: { id: number }) => {
        return data.id == this.SelectedValue;
      });
    }
  }
}
