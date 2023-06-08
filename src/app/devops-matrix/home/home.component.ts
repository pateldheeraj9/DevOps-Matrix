import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  currentSprint: any;
  userStoryCount: any;
  bugsCount: any;
  sprintDaysLeft: number = 0;
  constructor(private commonService: CommonService) { };
  ngOnInit(): void {
    this.commonService.getCurrentSprint().subscribe((res) => {
      this.currentSprint = res;
      this.sprintDaysLeft = res.DaysLeft;
      this.getWorkItemCount(this.currentSprint.sprintUID);
    },
      (error) => {
        console.log(error);
      });
  }

  getWorkItemCount(sprintUID: string) {
    this.commonService.getCurrentSprintWorkItem(sprintUID).subscribe((res) => {      
      this.userStoryCount = res.UserStoryCount;
      this.bugsCount = res.BugsCount;
    },
      (error) => {
        console.log(error);
      });
  }
}
