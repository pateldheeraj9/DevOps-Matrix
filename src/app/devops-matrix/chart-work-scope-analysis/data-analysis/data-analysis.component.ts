import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: []
})
export class DataAnalysisComponent {
  @Input() Title:string = "";
  @Input() TableData:any = [];

  columns: any = [
    { field: "SprintNumber", header: "Sprint Number" },
    { field: "TeamSize", header: "Team Size" },
    { field: "Team1", header: "Team 1" },
    { field: "Team2", header: "Team 2" },
  ];

  constructor() { }
}

