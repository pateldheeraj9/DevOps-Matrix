import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TeamDetailService } from '../Service/teamdetails/team-detail.service';
import { TeamMemberDetailsService } from '../Service/team-member-details/team-member-details.service';
import { MessageService } from 'primeng/api';


interface Status {
  name: string;
  code: number;
}

@Component({
  selector: 'app-team-member-remarks',
  templateUrl: './team-member-remarks.component.html',
  styleUrls: ['./team-member-remarks.component.css'],
  providers: [MessageService]
})
export class TeamMemberRemarksComponent implements OnInit{
  statuses : Status[] | undefined
  remarkForm: FormGroup | undefined;
  Memberid : any
  allRemarks : any
 
  deleteRemarkDialog!: boolean | false;
  currentRemarkId: any;
  constructor(private httpProvider: TeamMemberDetailsService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService){
    this.deleteRemarkDialog = false
  }
  ngOnInit() {
    this.Memberid = this.config.data.id

    this.statuses = [
      { name: 'InActive', code: 1 },
      { name: 'New', code: 2 },
      { name: 'OnBoard', code: 3 },
      { name: 'OffBoard', code: 4 },
    ];

    this.remarkForm = new FormGroup({
        remark: new FormControl<string | null>(null),
        selectedStatus: new FormControl<Status | null>(null)
    });
    console.log(this.Memberid)
    this.getAllRemarks()
  }

  getAllRemarks(){
    this.httpProvider.getTeamMemberRemarks(this.Memberid).subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.allRemarks = data.body;
        console.log(this.allRemarks)
      }
    },
    (error: any) => {
      if (error) {
        console.log(error)
      }
    });
  }

  addRemark(){
    console.log(this.remarkForm)
    let data = {
      "teamMemberId": this.Memberid,
      "remark": this.remarkForm?.value.remark,
      "status": this.remarkForm?.value.selectedStatus.code
    }
    this.httpProvider.postTeamMemberRemarks(data).subscribe(async data => {
      console.log(data);
      if (data != null && data.body != null) {
        this.getAllRemarks()
        this.show()
      }
    },
      async error => {
        console.log(error)
      });
  }

  deleteRemark(){
    this.httpProvider.deleteTeamMemberRemarks(this.currentRemarkId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Deletion Successful' });
        console.log("deletion success")
        this.deleteRemarkDialog = false
        this.getAllRemarks()
      }
    },
    (error: any) => {
      if (error) {
        console.log(error)
      }
    });
  }

  deleteRemarkConfirmation(id:any){
    this.deleteRemarkDialog = true;
    this.currentRemarkId = id;
  }
  

  hideDialog() {
    this.ref.close();
    this.ref.destroy();
    
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Successfully' });
  }


}
