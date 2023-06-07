import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ISprint } from '../models/common.model';
import { IEmployeeStatus } from '../models/employee.model';
import { IWorkItem, IWorkItemTask } from '../models/workItem.model';
import { CommonService } from '../services/common.service';
import { WorkItemsService } from '../services/work-items.service';

@Component({
  selector: 'app-chart-task-by-state',
  templateUrl: './chart-task-by-state.component.html',
  styleUrls: ['./chart-task-by-state.component.css']
})

export class ChartTaskByStateComponent {

  public sprints: ISprint[] = [];
  pieChartData: any;
  pieChartOptions: any;
  selectedSprint: ISprint = {} as ISprint;
  selectedWorkItemTypeValue: string = 'User Story';
  sprintData: any = [];
  tableFooter: IEmployeeStatus = {} as IEmployeeStatus;
  sprintCountData: IEmployeeStatus[] = [];
  workItemData: any = [];
  workItemTaskCountByStatus: any = [];
  workItemTaskStatus: any = [];
  totalWorkItemCount: number = 0;
  totalTaskCount: number = 0;
  workItemTypeDisplayText: any;
  employeeData: any = [];
  workItemTasksData: IWorkItemTask[] = [];
  tableTaskDataFooter: IWorkItemTask = {} as IWorkItemTask;
  workItemList: IWorkItemTask[] = [];
  selectedWorkItem: any = [];
  selectedWorkItemId: number = 0;
  tableCaption: string = "";
  taskDetailsTableCaption: string = "";
  columns = [
    { field: "empName", header: "Employee Name" },
    { field: "new", header: "New" },
    { field: "active", header: "Active" },
    //{ field: "prReview", header: "PR Review" },
    //{ field: "deliveredToQA", header: "Delivered To QA" },
    { field: "resolved", header: "Resolved" },
    { field: "closed", header: "Closed" },
    { field: "removed", header: "Removed" },
    { field: "total", header: "Total" },
  ];
  workItemTaskCoulmns = [
    { field: "TaskName", header: "Task Name" },
    { field: "Status", header: "Status" },
    { field: "DurationInHrs", header: "Duration in Hours" },
  ]
  activeStatusCount: number = 0;
  taskDetailsTableDurationInHrs: string = '';

  constructor(private commonService: CommonService, private workItemsService: WorkItemsService) { }

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
        this.selectedSprint = this.sprints[0];
        this.OnSprintSelectionChanged();
      });
  }

  OnSprintSelectionChanged() {
    this.getWorkItems();
  }

  getWorkItems() {
    console.log('Selected Work Item Type ' + this.selectedWorkItemTypeValue);

    let params = new HttpParams();
    params = params.append("sprintUID", this.selectedSprint.sprintUID);
    params = params.append("workItemType", this.selectedWorkItemTypeValue);

    this.workItemsService.getWorkItemsBySprint(params).subscribe(result => {
      this.totalWorkItemCount = 0;
      this.workItemList = result[0];
      console.log(result[0]);
    }, (error) => {
      console.log(error);
    },
      () => {
        if (typeof (this.workItemList) !== 'undefined') {
          this.totalWorkItemCount = this.workItemList.length;
          this.selectedWorkItem = this.workItemList[0];
          this.selectedWorkItemId = this.selectedWorkItem.WorkItemId;
          console.log('Selected Work Item Task');
          console.log(this.selectedWorkItemId);
        }

        this.DisplayChart();
        this.DisplayTable();
      });
  }

  OnWorkItemTypeChanged(event: any) {
    this.selectedWorkItemTypeValue = event.value;
    this.workItemTypeDisplayText = (this.selectedWorkItemTypeValue == 'Bug') ? 'Bugs' : 'User Stories';
    this.tableCaption = this.workItemTypeDisplayText + " Tasks Status";
    this.getWorkItems();
  }

  OnWorkItemSelectionChanged(event: any) {
    console.log('Value Changed: ' + event.value.WorkItemId);
    this.selectedWorkItem = event.value;
    this.selectedWorkItemId = this.selectedWorkItem.WorkItemId;

    this.DisplayChart();
    this.DisplayTable();
  }

  DisplayTable() {
    this.workItemTypeDisplayText = (this.selectedWorkItemTypeValue == 'Bug') ? 'Bugs' : 'User Stories';
    this.tableCaption = this.workItemTypeDisplayText + " Tasks Status";

    let tableViewParams = new HttpParams();
    tableViewParams = tableViewParams.append("sprintUID", this.selectedSprint.sprintUID);
    tableViewParams = tableViewParams.append("workItemType", this.selectedWorkItemTypeValue);
    tableViewParams = tableViewParams.append("workItemId", this.selectedWorkItemId);

    this.getEmployeeTaskCountByStatus(tableViewParams);
    this.getWorkItemTaskDetails(tableViewParams);
  }

  getEmployeeTaskCountByStatus(tableViewParams: HttpParams) {
    this.workItemsService.getEmployeeTaskCountByStatus(tableViewParams).subscribe(result => {
      this.employeeData = [];
      this.sprintCountData = [];
      this.employeeData = result[0];
      this.sprintCountData = result[0];

      this.tableFooter.new = this.sprintCountData.map(a => a.new).reduce(function (a, b) { return a + b; });
      this.tableFooter.active = this.sprintCountData.map(a => a.active).reduce(function (a, b) { return a + b; });
      this.tableFooter.prReview = this.sprintCountData.map(a => a.prReview).reduce(function (a, b) { return a + b; });
      this.tableFooter.deliveredToQA = this.sprintCountData.map(a => a.deliveredToQA).reduce(function (a, b) { return a + b; });
      this.tableFooter.resolved = this.sprintCountData.map(a => a.resolved).reduce(function (a, b) { return a + b; });
      this.tableFooter.closed = this.sprintCountData.map(a => a.closed).reduce(function (a, b) { return a + b; });
      this.tableFooter.removed = this.sprintCountData.map(a => a.removed).reduce(function (a, b) { return a + b; });
      this.tableFooter.total = this.sprintCountData.map(a => a.total).reduce(function (a, b) { return a + b; });
      this.tableFooter.empName = "Total";
    });
  }

  DisplayChart() {
    if (typeof (this.selectedWorkItem) == 'undefined')
      return;

    this.workItemTaskStatus = [];
    this.workItemTaskCountByStatus = [];
    this.totalTaskCount = 0;

    let pieChartParams = new HttpParams();
    pieChartParams = pieChartParams.append("workItemId", this.selectedWorkItemId);

    this.workItemsService.getWorkItemTaskData(pieChartParams).subscribe(result => {
      this.workItemData = result[0];
      this.activeStatusCount = 0;
    }, (error) => {
      console.log(error);
    },
      () => {
        let filteredDataForActiveStatus = this.sprintData.filter((word: any) => (word.Status == 'Active' || word.Status == 'Delivered To QA' || word.Status == 'PR Review'));

        if (filteredDataForActiveStatus.length > 1) {
          this.activeStatusCount = filteredDataForActiveStatus.reduce((a: any, b: any) => {
            if (a.Count != undefined)
              return a.Count + b.Count;
            else
              return a + b.Count;
          });
          this.sprintData.filter((word: any) => (word.Status == 'Active')).map((a: any) => a.Count = this.activeStatusCount);
        }

        let indexOfStatusDeliveredToQA = this.sprintData.findIndex((x: any) => x.Status === "Delivered To QA");
        if (indexOfStatusDeliveredToQA > -1)
          this.sprintData.splice(indexOfStatusDeliveredToQA, 1);

        let indexOfStatusPrReview = this.sprintData.findIndex((x: any) => x.Status === "PR Review");
        if (indexOfStatusPrReview > -1)
          this.sprintData.splice(indexOfStatusPrReview, 1);

        for (var i = 0; i < this.workItemData.length; i++) {
          this.workItemTaskStatus[i] = this.workItemData[i].Status;
          this.workItemTaskCountByStatus[i] = this.workItemData[i].Count;
          this.totalTaskCount += this.workItemData[i].Count;
        }

        this.plotPieChart();
      });
  }

  plotPieChart() {

    this.pieChartData = {
      labels: this.workItemTaskStatus,
      datasets: [
        {
          data: this.workItemTaskCountByStatus,
          backgroundColor: [
            "darkblue",
            "yellow",
            "red",
            "green",
            "grey",
            "orange",
            "pink"
          ],
          hoverBackgroundColor: [
            "darkblue",
            "yellow",
            "red",
            "green",
            "grey",
            "orange",
            "pink"
          ]
        }]
    };

    this.pieChartOptions = {
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true

          }
        }
      }
    };
  }

  getWorkItemTaskDetails(tableViewParams: HttpParams) {
    this.workItemsService.getWorkItemTaskDetails(tableViewParams).subscribe(result => {
      this.workItemTasksData = [];
      this.workItemTasksData = result[0];
      this.taskDetailsTableCaption = this.workItemTypeDisplayText + " Tasks Details";

      this.tableTaskDataFooter.TaskName = "Total";
      this.tableTaskDataFooter.DurationInHrs = this.workItemTasksData.map(a => a.DurationInHrs).reduce(function (a, b) { return a + b; });
      this.taskDetailsTableDurationInHrs = this.tableTaskDataFooter.DurationInHrs.toFixed(2)
      this.tableTaskDataFooter.Status = "";
    });
  }
}


