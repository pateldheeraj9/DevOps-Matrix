import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DatepickerOptions } from 'ng2-datepicker';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TeamDetailService } from "../Service/teamdetails/team-detail.service";
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.component.html',
  styleUrls: ['./edit-team-member.component.css'],
  providers: [MessageService]
})
export class EditTeamMemberComponent implements OnInit {

  date: Date = new Date();
  options: DatepickerOptions = {
    calendarClass: 'datepicker-default',
    format: "dd/LL/yyyy",
    scrollBarColor: '#ffffff'

  };
  data: any = [];
  Memberid: any;
  // datejoining: any;

  isSubmitted: boolean = false;
  constructor(private httpProvider: TeamDetailService, private router: Router, private route: ActivatedRoute, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService: MessageService) {

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
    relievingDate: new FormControl(),
    billingDate: new FormControl(),
    techStack: new FormControl(''),
    reportingTo: new FormControl('')
  })



  ngOnInit() {
    this.Memberid = this.route.snapshot.params['Id'];
    this.Memberid = this.config.data.id
    this.getdetails();
    this.getEmployeeDetailById();
    // this.datejoining='12/12/2022'
  }

  async getdetails() {
    this.httpProvider.getAllDetails().subscribe((data: any) => {

      if (data != null && data.body != null) {

        var resultData = data.body;
        console.log(resultData);
        if (resultData) {
          this.data = resultData;
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
  hideDialog() {
    this.ref.close();
    this.ref.destroy();
    
  }
  getEmployeeDetailById() {
    this.httpProvider.getMemberById(this.Memberid).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        console.log(resultData)
        if (resultData) {

          this.Memberform.controls.firstname.setValue(resultData[0].name);
          this.Memberform.controls.emailid.setValue(resultData[0].email);
          this.Memberform.controls.phoneNo.setValue(resultData[0].phoneNo);
          this.Memberform.controls.empId.setValue(resultData[0].empId);
          this.Memberform.controls.teamModuleId.setValue(resultData[0].teamModuleId);

          const joiningDate = new Date(resultData[0].joiningDate);
          this.Memberform.controls.joiningDate.setValue(new Date(new Date(joiningDate).getTime() + 86400000).toISOString().slice(0, 10));

          const relievingDate = new Date(resultData[0].relievingDate);
          this.Memberform.controls.relievingDate.setValue(new Date(new Date(relievingDate).getTime() + 86400000).toISOString().slice(0, 10));

          const billingDate = new Date(resultData[0].billingDate);
          this.Memberform.controls.billingDate.setValue(new Date(new Date(billingDate).getTime() + 86400000).toISOString().slice(0, 10));

          this.Memberform.controls.status.setValue(resultData[0].status);
          this.Memberform.controls.techStack.setValue(resultData[0].techStack);
          this.Memberform.controls.reportingTo.setValue(resultData[0].cli_Lead);

        }
      }
    },
      (error: any) => { });
  }
  clearData() {
    this.Memberform.reset();
    this.Memberform.controls.joiningDate.reset("");
  }

  onChangeTeamName(SelectedValue:any) {
    this.data.forEach((element: any) => {
      if(element.id == SelectedValue){
       this.Memberform.controls.reportingTo.setValue(element.cli_Lead);
       
      }
    });
}
  AddMember() {


    let data = {
      "id": this.Memberid,
      "name": this.Memberform.value.firstname,
      "email": this.Memberform.value.emailid,
      "phoneNo": this.Memberform.value.phoneNo,
      "teamModuleId": this.Memberform.value.teamModuleId,
      "empId": this.Memberform.value.empId,
      "status": this.Memberform.value.status,
      "joiningDate": this.Memberform.value.joiningDate,
      "billingDate": this.Memberform.value.billingDate,
      "relievingDate": this.Memberform.value.relievingDate,
      "techStack": this.Memberform.value.techStack,
      "reportingTo": this.Memberform.value.reportingTo,
    }

    this.httpProvider.updateMember(data, this.Memberid).subscribe(async data => {
      console.log(data.statusText);
      // if (data.statusText == "OK") {
        // alert("Edited Successfully")
        if (data != null && data.body != null) {
          // var resultData = data.body;
          // if (resultData != null && resultData.isSuccess) {
            window.setTimeout(() => {
              window.location.href="/TeamMemberDetails";
            }, 2000);
          // }
        
        // }
      }
    },
      async error => {
        console.log(error)
      });
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edited Successfully' });
}

}

export class memberForm {
  name: string = "";
  email: string = "";
  phoneNo: string = "";
  teamModuleId: Number = 0;
  empId: Number = 0;
  status: Number = 0;
  joiningDate: any;
  billingDate: any;
  relievingDate: any;
  techStack: string = "";
  reportingTo: string = "";
}