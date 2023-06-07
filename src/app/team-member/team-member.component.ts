import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DatepickerOptions } from 'ng2-datepicker';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import{TeamDetailService } from "../Service/teamdetails/team-detail.service";
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { el } from 'date-fns/locale';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css'],
  providers: [MessageService]
  
})
export class TeamMemberComponent implements OnInit  {

  
  selectedJoiningDate!: Date;
  selectedBillingDate!: Date;
  selectedRelievingDate!: Date;
  
 
  isInline = true;

  date:Date= new Date();
  options: DatepickerOptions = {
    calendarClass: 'datepicker-default',
    format:"dd/LL/yyyy",
  scrollBarColor: '#ffffff',
  enableKeyboard:true
    
  };
  data: any = [];
 
  isSubmitted: boolean = false;
 
  constructor(private httpProvider: TeamDetailService,private messageService: MessageService) {  
   
    // this.Memberform.setValidators(this.dateComparisonValidator);
  }

  Memberform=new FormGroup({
    firstname:new FormControl('',Validators.required),
    emailid:new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNo:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      teamModuleId:new FormControl(null,Validators.required),
    empId:new FormControl('',[Validators.required,Validators.minLength(5)]),
    status:new FormControl(null,Validators.required),
    joiningDate:new FormControl('',Validators.required),
    billingDate:new FormControl('',Validators.required),
    relievingDate:new FormControl('',Validators.required),
    techStack:new FormControl(null,Validators.required),
    reportingTo:new FormControl('',Validators.required),
   
  })



 

  ngOnInit() {

    this.getdetails();
  }

  async getdetails() {
    this.httpProvider.getAllTeamMembers().subscribe((data : any) => {
        
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

  // onChangeTeamName(){
  //   console.log(this.data)
  //   this.Memberform.controls.reportingTo.setValue("shaunak");

  // }

  onChangeTeamName(SelectedValue:any) {
       this.data.forEach((element: any) => {
         if(element.id == SelectedValue){
          this.Memberform.controls.reportingTo.setValue(element.cli_Lead);
         }
       });
  }
  AddMember() {

    var datePipe = new DatePipe("en-US");
    let joiningDate = datePipe.transform(this.Memberform.value.joiningDate, 'YYYY-MM-dd');
    let billingDate = datePipe.transform(this.Memberform.value.billingDate, 'YYYY-MM-dd');
    let relDate = datePipe.transform(this.Memberform.value.relievingDate, 'YYYY-MM-dd');

     let data=
    {
      "name": this.Memberform.value.firstname,
      "email": this.Memberform.value.emailid,
      "phoneNo": this.Memberform.value.phoneNo,
      "teamModuleId": this.Memberform.value.teamModuleId,
      "empId": this.Memberform.value.empId,
      "status": this.Memberform.value.status,
      "joiningDate": joiningDate,
      "billingDate": billingDate,
      "relievingDate": relDate,
      "techStack": this.Memberform.value.techStack,
      "reportingTo":this.Memberform.value.reportingTo,
    }
    
    
    //{
    //   "name": this.Memberform.value.firstname,
    //   "email": "string",
    //   "phoneNo":this.Memberform.value.phoneNo,
    //   "teamModuleId": this.Memberform.value.teamModuleId,
    //   "empId": this.Memberform.value.empId,
    //   "status": this.Memberform.value.status,
    //   "joiningDate": this.Memberform.value.joiningDate,
    //   "billingDate": "2023-05-11T16:31:37.774Z",
    //   "relievingDate": this.Memberform.value.relivingDate,
    //   "techStack": "string"

    // }


      this.httpProvider.SaveMember(data).subscribe(async data => {
        if (data != null && data.body != null) {
          // alert("Add Successfully")
          // if (data != null && data.body != null) {
          //   var resultData = data.body;
          //   if (resultData != null && resultData.isSuccess) {
              window.setTimeout(() => {
                window.location.href="/TeamMemberDetails";
              }, 2000);

        //     }
        //   }
         }
      },
        async error => {
          console.log(error)
        });
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Successfully' });
}

// dateComparisonValidator(Memberform: FormGroup):{[key:string]:boolean}|null =>{
//   const billingDate:AbstractControl=Memberform.get('billingDate')?.value;
//   const joiningDate=Memberform.get('joiningDate')?.value;
//   if(billingDate && joiningDate && billingDate<joiningDate){
//     return {dateComparison:true};
//   }
// return null;
// }

  
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
  reportingTo:string="";

  


}