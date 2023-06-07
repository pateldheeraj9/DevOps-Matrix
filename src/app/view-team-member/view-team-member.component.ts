import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DatepickerOptions } from 'ng2-datepicker';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import{TeamDetailService } from "../Service/teamdetails/team-detail.service";
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExchangeService } from '../Service/Data/Exchange.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-view-team-member',
  templateUrl: './view-team-member.component.html',
  styleUrls: ['./view-team-member.component.css']
})
export class ViewTeamMemberComponent implements OnInit {
  $user: Observable<number> | undefined;
  date:Date= new Date();
  options: DatepickerOptions = {
    calendarClass: 'datepicker-default',
    format:"dd/LL/yyyy",
  scrollBarColor: '#ffffff'
    
  };
  data: any = [];
  Memberid: any;
  datejoining: any;



 
  isSubmitted: boolean = false;
  constructor(private httpProvider: TeamDetailService,private router: Router,private route: ActivatedRoute,public ref: DynamicDialogRef,
     public config: DynamicDialogConfig, private exchangeService:ExchangeService) {
    
  }
  Memberform=new FormGroup({
    firstname:new FormControl('',Validators.required),
    emailid:new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNo:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    teamModuleId:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    empId:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    status:new FormControl(''),
    joiningDate:new FormControl(),
    relievingDate:new FormControl(),
    billingDate:new FormControl(),
    techStack:new FormControl(''),
    reportingTo:new FormControl('')
  })

  ngOnInit() {
   // this.Memberid=this.route.snapshot.params['Id'];
   this.$user  = this.exchangeService.user; 
   this.$user.subscribe(val => this.Memberid  = val);//this.config.data.id
    this.getdetails();
    this.getEmployeeDetailById();
    this.datejoining='12/12/2022'

   
  }

  async getdetails() {
    this.httpProvider.getAllDetails().subscribe((data : any) => {
        
      if (data != null && data.body != null) {
      
        var resultData = data.body;
        console.log(resultData);
        if (resultData) {
          this.data = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
            console.log(error)
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.data = [];
            }
          }
        }
      });
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

  AddMember() {


let data={
  "id": this.Memberid,
  "name": this.Memberform.value.firstname,
  "email": "string",
  "phoneNo":this.Memberform.value.phoneNo,
  "teamModuleId": this.Memberform.value.teamModuleId,
  "empId": this.Memberform.value.empId,
  "status": this.Memberform.value.status,
  "joiningDate": this.Memberform.value.joiningDate,
  "billingDate": this.Memberform.value.billingDate,
  "relievingDate": this.Memberform.value.relievingDate,
  // "techStack": "string",
  "techStack": this.Memberform.value.techStack,
  "reportingTo": this.Memberform.value.reportingTo,
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


      this.httpProvider.updateMember(data,this.Memberid).subscribe(async data => {
        console.log(data.statusText);
        if (data.statusText=="OK") {
          alert("Update Successfully")
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
             // this.toastr.success(resultData.message);
           
              setTimeout(() => {
               // this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          //this.toastr.error(error.message);
          setTimeout(() => {
           // this.router.navigate(['/Home']);
          }, 500);
        });
  }

    



  
}


export class memberForm {





  name: string= "";
  email: string="";
  phoneNo: string="";
  teamModuleId:Number=0;
  empId:Number=0;
  status:Number=0;
  joiningDate:any;
  billingDate: any;
  relievingDate:any;
  techStack: string="";
  reportingTo: string="";



}