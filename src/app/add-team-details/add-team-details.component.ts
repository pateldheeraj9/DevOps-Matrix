import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamDetailService } from '../Service/teamdetails/team-detail.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-team-details',
  templateUrl: './add-team-details.component.html',
  styleUrls: ['./add-team-details.component.css'],
  providers: [MessageService]
})
export class AddTeamDetailsComponent{
  TeamDetailsForm=new FormGroup({
    name:new FormControl('',Validators.required),
    cli_Lead:new FormControl('',Validators.required),
    per_Lead:new FormControl('',Validators.required),
    scrumMaster:new FormControl('',Validators.required),
    status:new FormControl(null,Validators.required),
    projectName:new FormControl('',Validators.required),
    totalSize: new FormControl('',Validators.required),
  })
  constructor(private httpProvider: TeamDetailService,private messageService: MessageService) {    
  }

  AddTeamDetails(){
    console.log(this.TeamDetailsForm.value)
    this.httpProvider.SaveTeamDetails(this.TeamDetailsForm.value).subscribe(async data => {
      if (data != null && data.body != null) {
        //  alert("Add Successfully");
        window.setTimeout(()=>{
          window.location.href="/TeamDetails";
        },2000);
      
      }
    },
      async error => {
        console.log(error)
      });
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Successfully' });
}

}
