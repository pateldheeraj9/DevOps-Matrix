
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { Observable } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { PrimeNGConfig } from "primeng/api";

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditTeamMemberComponent } from '../../edit-team-member/edit-team-member.component';
import { ViewTeamMemberComponent } from '../../view-team-member/view-team-member.component';
import { TeamMemberDetailsService } from "../../Service/team-member-details/team-member-details.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExchangeService } from 'src/app/Service/Data/Exchange.service';
import { TeamMemberRemarksComponent } from 'src/app/team-member-remarks/team-member-remarks.component';
import { TeamMemberSkillsComponent } from 'src/app/team-member-skills/team-member-skills.component';

@Component({
  selector: 'app-team-member-details',
  templateUrl: './team-member-details.component.html',
  styleUrls: ['./team-member-details.component.css'],
  providers: [DialogService]
})
export class TeamMemberDetailsComponent implements OnInit {
  visible: boolean | undefined;
  data: any = [];
  membersdata: any = [];
  ngOnInit() {
    this.getdetailsMember();
    this.getdetails();
    this.getAllDropdownTeamDetails();
  }

  Memberform = new FormGroup({
    firstname: new FormControl('', Validators.required),
    emailid: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    teamModuleId: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    empId: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    status: new FormControl(''),
    joiningDate: new FormControl(),
    relievingDate: new FormControl('')
  })

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

  cols: any[] = [];
  selected: number = 0;
  gfg: any[] = [
    { name: 'Active' },
    { name: 'InActive' }
  ];

  filteredTableData: any = [];
  filteredTableData1: any = [];

  searchTerm: string = '';

  radioSearchTerm: string = '';
  SelectedValue: any = 0;
  constructor(private httpProvider: TeamMemberDetailsService, public dialogService: DialogService, private exchangeService:ExchangeService) { }

  closemodal() {
    this.visible = false
  }

  AddMember() {


    let data = {
      "name": this.Memberform.value.firstname,
      "email": "string",
      "phoneNo": this.Memberform.value.phoneNo,
      "teamModuleId": this.Memberform.value.teamModuleId,
      "empId": this.Memberform.value.empId,
      "status": this.Memberform.value.status,
      "joiningDate": this.Memberform.value.joiningDate,
      "billingDate": "2023-05-11T16:31:37.774Z",
      "relievingDate": this.Memberform.value.relievingDate,
      "techStack": "string"
    }



    // let data={
    //   "name":this.Memberform.value.firstname,
    //   "email":this.Memberform.value.emailid,
    //   "phoneNo":this.Memberform.value.phoneNo,
    //   "teamModuleId":this.Memberform.value.teamModuleId,
    //   "empId":this.Memberform.value.empId,
    //   "status":this.Memberform.value.status,
    //   "joiningDate":this.Memberform.value.joiningDate,
    //   "relievingDate":this.Memberform.value.relivingDate 

    // }



  }
  myMethod(value: string): any[] {
    console.log(value)
    value = value.toLocaleLowerCase();
    return this.tableData.filter((tableData: any) =>

      // tableData.name.toLocaleLowerCase());
      console.log(tableData));
  }


  async getdetailsMember() {
    this.httpProvider.getAllDetails().subscribe((data: any) => {

      if (data != null && data.body != null) {

        var resultData = data.body;
        console.log("ddd" + data);
        if (resultData) {
          this.data = resultData;
          this.membersdata = resultData;
        }
      }
    },
      (error: any) => {
        if (error) {
          console.log(error)
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.data = [];
            }
          }
        }
      });

  }



  async getdetails() {
    this.httpProvider.getAllDetails().subscribe((data: any) => {

      if (data != null && data.body != null) {
        console.log(data)

        var resultData = data.body;
        console.log("ddd" + resultData);
        if (resultData) {
          this.tableData = resultData;
          this.data = resultData;
          console.log("TEam Name" + data);
          this.filteredTableData = this.tableData;
        }
      }
    },
      (error: any) => {
        if (error) {
          console.log(error)
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.tableData = [];

            }
          }
        }
      });
  }

  showEditTeamMember(id: any) {
    this.ref = this.dialogService.open(EditTeamMemberComponent, {
      width: '80%',
      height: '70%',
      contentStyle: { overflow: 'auto', background: 'white' },
      baseZIndex: 10000,
      data: { id: id },
      dismissableMask: true
    }
    );

    this.ref.onClose.subscribe(() => {
      this.getdetails();
    });
  }

  showViewTeamMember(id: any) {
    this.exchangeService.setUser(id);

    this.ref = this.dialogService.open(ViewTeamMemberComponent, {
      width: '80%',
      height: '70%',
      contentStyle: { overflow: 'auto', background: 'white' },
      baseZIndex: 10000,
      data: { id: id },
      dismissableMask: true
    }
    );

    this.ref.onClose.subscribe(() => {
      this.getdetails();
    });
  }

  showAddSkills(id:any){
    this.ref = this.dialogService.open(TeamMemberSkillsComponent, {
      width: '80%',
      height: '70%',
      contentStyle: { overflow: 'auto', background: 'white' },
      baseZIndex: 10000,
      data: { id: id },
      dismissableMask: true
    }
    );

    this.ref.onClose.subscribe(() => {
      this.getdetails();
    });
  }

  addRemarkTeamMember(id:any){
    
    this.ref = this.dialogService.open(TeamMemberRemarksComponent, {
      width: '80%',
      height: '70%',
      contentStyle: { overflow: 'auto', background: 'white' },
      baseZIndex: 10000,
      data: { id: id },
      dismissableMask: true
    }
    );

    this.ref.onClose.subscribe(() => {
      this.getdetails();
    });
  }

  deleteProductDialog: boolean = false;
  deletedid:number=0;
  deletedname:string = '';

  deleteProduct(id: number,name:string) {
    this.deletedid=id;
    this.deletedname=name;
    this.deleteProductDialog = true;
}

  deleteMemberById(id: any) {
  this.httpProvider.deleteMemberById(id).subscribe((data: any) => {

        if (data.statusText == "OK") {
          this.deleteProductDialog = false;
          this.getdetails();
        }
      },
        (error: any) => { });
  }
  filterData(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
    if (searchTerm == '') {
      this.tableData = this.membersdata;
    }
    else {
      //this.tableData = this.membersdata.filter((data: { name: string; }) => data.name.toLowerCase().includes(searchTerm));
      var abcd = this.membersdata.filter((data: { phoneNo: string ;name:string ;email :string}) => 
      {
      return (  data.phoneNo.toLowerCase().includes(searchTerm) ||
       data.name.toLowerCase().includes(searchTerm) ||
       data.email.toLowerCase().includes(searchTerm) 
       )
      }
      
      );

      this.tableData = abcd;
    }

  }

  radioFilterData() {
   
    if(this.selected == 9999)
    {

      this.tableData = this.filteredTableData;
    }
    else{
    this.tableData = this.filteredTableData.filter(

      (data: { status: number }) =>
      {
        return  (data.status == this.selected)
      }

    );
    }


    // console.log(this.selected)

    // if (this.selected === 'InActive') {

    //   this.tableData = this.filteredTableData.filter(

    //     (data: { status: number }) => data.status === 1

    //   );

    // } else {

    //   this.tableData = this.filteredTableData.filter(

    //     (data: { status: number }) => data.status !== 1

    //   );

    // }

  }
  async getAllDropdownTeamDetails() {

    this.httpProvider.getAllDropdownTeamDetails().subscribe((data: any) => {



      if (data != null && data.body != null) {



        var resultData1 = data.body;

        console.log("Membe1r" + resultData1);

        if (resultData1) {
          this.tableData1 = resultData1;

          this.filteredTableData1 = this.tableData1





        }

      }

    },

      (error: any) => {

        if (error) {

          console.log(error)

          if (error.status == 404) {

            if (error.error && error.error.message) {

              this.tableData1 = [];

            }

          }

        }

      });

  }
  onDropdownSelected(SelectedValue: number) {
    if (this.SelectedValue == 0 || this.SelectedValue ==  9999) {
      this.tableData = this.filteredTableData;
    }
    else {
      this.tableData = this.filteredTableData.filter((data: { teamModuleId: number }) => {
        return data.teamModuleId == this.SelectedValue;
      });
    }
  }

}





