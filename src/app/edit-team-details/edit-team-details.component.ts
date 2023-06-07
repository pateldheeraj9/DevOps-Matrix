import { Component, OnInit } from '@angular/core';
import { TeamDetailService } from '../Service/teamdetails/team-detail.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-team-details',
  templateUrl: './edit-team-details.component.html',
  styleUrls: ['./edit-team-details.component.css'],
  providers: [MessageService]
})
export class EditTeamDetailsComponent implements OnInit{
  teamId : any
  TeamDetailsForm=new FormGroup({
    name:new FormControl('',Validators.required),
    cli_Lead:new FormControl('',Validators.required),
    per_Lead:new FormControl('',Validators.required),
    scrumMaster:new FormControl('',Validators.required),
    status:new FormControl(null,Validators.required),
    projectName:new FormControl('',Validators.required),
    totalSize: new FormControl('',Validators.required),
  })
  constructor(private httpProvider: TeamDetailService,private router: Router,private route: ActivatedRoute, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService: MessageService) {    
    
  }
  ngOnInit(){
      this.teamId = this.route.snapshot.params['Id'];
      this.teamId = this.config.data.id
      console.log(this.teamId)
      this.getTeamDetailById()
  }
   getTeamDetailById() {
    this.httpProvider.getTeamDetailById(this.teamId).subscribe((data: any) => {
      // console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        // console.log(resultData);
        this.TeamDetailsForm.controls.name.setValue(resultData[0].name);
        this.TeamDetailsForm.controls.cli_Lead.setValue(resultData[0].cli_Lead);
        this.TeamDetailsForm.controls.per_Lead.setValue(resultData[0].per_Lead);
        this.TeamDetailsForm.controls.scrumMaster.setValue(resultData[0].scrumMaster);
        this.TeamDetailsForm.controls.status.setValue(resultData[0].status);
        this.TeamDetailsForm.controls.totalSize.setValue(resultData[0].totalSize);
        this.TeamDetailsForm.controls.projectName.setValue(resultData[0].projectName);
        // console.log(this.TeamDetailsForm.value);
      }
    },
      // (error: any) => { console.log(error); }
      );
  }
  
  hideDialog() {
    this.ref.close();
    this.ref.destroy();
  }

  clearData() {
        this.TeamDetailsForm.reset();
  }

  EditTeamDetails(){
    console.log(this.TeamDetailsForm.value)
    this.httpProvider.updateTeamDetails(this.TeamDetailsForm.value, this.teamId).subscribe(async data => {
      if (data != null && data.body != null) {
        
        //  alert("Edited Successfully")
       
        window.setTimeout(()=>{
        window.location.href="/TeamDetails";
        this.ref.close();
        this.ref.destroy();
        },2000);
       
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
