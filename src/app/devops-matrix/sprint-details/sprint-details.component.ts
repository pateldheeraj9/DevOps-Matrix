import { Component } from '@angular/core';
import { ISprint } from '../models/common.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent {
  Title: string = "Sprint Details";
  sprints: ISprint[] = [];
  columns: any = [
    { field: "sprintNumber", header: "Sprint Number" },
    { field: "sprintName", header: "Sprint Name" },
    { field: "startDate", header: "Start Date" },
    { field: "endDate", header: "End Date" },
  ];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
    this.commonService.getSprints().subscribe((result) => {
      this.sprints = result;
    }, (error) => {
      console.log(error);
    },
      () => {
        this.sprints = this.sprints.sort((a, b) => Number(b.startDate) - Number(a.startDate));
      });
  }
}

