import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IEmployeeStatus, IEmployeeStatusWithWorkItemDetails, IEmployeeWorkItemDetails } from '../models/employee.model';
import { ISprint } from '../models/common.model';
import { CommonService } from '../services/common.service';
import { WorkItemsService } from '../services/work-items.service';

@Component({
  selector: 'app-chart-work-item-by-state',
  templateUrl: './chart-work-item-by-state.component.html',
  styleUrls: ['./chart-work-item-by-state.component.css']
})
export class ChartWorkItemByStateComponent {
  sprints: ISprint[] = [];
  pieChartData: any;
  pieChartOptions: any;
  selectedSprint: ISprint = {} as ISprint;
  selectedWorkItemTypeValue: string = '';
  sprintData: any = [];
  workItemCountByStatus: any = [];
  workItemStatus: any = [];
  totalWorkItems: number = 0;
  workItemTypeDisplayText: any;
  basicData: any;
  StackedOptions: any;
  employeeData: IEmployeeStatusWithWorkItemDetails[] = [];
  sprintCountData: IEmployeeStatus[] = [];
  employeeName: any = [];
  employeeDataStatus: any = [];
  employeeStatusCount: any = [];
  tableFooter: IEmployeeStatus = {} as IEmployeeStatus;
  tableCaption: string = "";
  empID: any;
  workItemTypeDisplayTextAfterExpand: any;
  storyPointsDisplayTextAfterExpand: any;
  statusDisplayTextAfterExpand: any;
  columns = [
    { field: "", header: "" },
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

  workItemDetailsColumns = [
    { field: "Title", header: "WorkItem" },
    { field: "Status", header: "Status" },
    { field: "Points", header: "Story Points" }
  ]

  workItemDetails: IEmployeeWorkItemDetails[] = [];
  workItemTitle: any = [];
  workItemState: any = [];
  workItemPoints: any = [];
  tableWorkItemDetailsCaption: any;
  activeStatusCount: number = 0;
  @ViewChild('tableWorkItemStatus') tableWorkItemStatus: Table = {} as Table;

  constructor(private commonService: CommonService, private workItemsService: WorkItemsService) { }

  ngOnInit() {
    this.getSprints();
  }

  OnUserInputChanged() {
    this.DisplayChartAndData(this.selectedSprint, this.selectedWorkItemTypeValue);
  }

  DisplayChartAndData(sprint: ISprint, workItemValue: string) {
    if (typeof (this.tableWorkItemStatus) != 'undefined')
      this.tableWorkItemStatus.reset();
    this.workItemDetails = [];
    this.workItemStatus = [];
    this.workItemCountByStatus = [];
    this.totalWorkItems = 0;
    let pieChartParams = new HttpParams();
    let tableViewParams = new HttpParams();

    pieChartParams = pieChartParams.append("sprintUID", sprint.sprintUID);
    pieChartParams = pieChartParams.append("workItemType", workItemValue);

    tableViewParams = tableViewParams.append("sprintUID", sprint.sprintUID);
    tableViewParams = tableViewParams.append("workItemType", workItemValue);

    this.workItemTypeDisplayText = (this.selectedWorkItemTypeValue == 'Bug') ? 'Bugs' : 'User Stories';
    this.tableCaption = this.workItemTypeDisplayText + " Status by Employee";
    this.BindPieChart(pieChartParams);
    this.getEmployeeWorkItemCountByStatus(tableViewParams);
  }

  plotPieChart() {
    this.pieChartData = {
      labels: this.workItemStatus,
      datasets: [
        {
          data: this.workItemCountByStatus,
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
        }],
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

  getSprints() {
    this.commonService.getSprints().subscribe((result) => {
      this.sprints = result;
    }, (error) => {
    },
      () => {
        console.log('Selected Sprint');
        console.log(this.sprints[0]);
        this.sprints = this.sprints.sort((a, b) => Number(b.startDate) - Number(a.startDate));
        this.selectedSprint = this.sprints[0];
        this.selectedWorkItemTypeValue = 'User Story';
        this.DisplayChartAndData(this.selectedSprint, this.selectedWorkItemTypeValue);
      });
  }

  BindPieChart(pieChartParams: HttpParams) {
    this.workItemsService.getData(pieChartParams).subscribe(result => {
      this.sprintData = result[0];
      this.activeStatusCount = 0;

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

      for (var i = 0; i <= this.sprintData.length - 1; i++) {
        this.workItemStatus[i] = this.sprintData[i].Status;
        if (this.workItemStatus[i] == "Active")
          this.workItemStatus[i] = "Active (Active + PR Review + Delivered to QA)"
        this.workItemCountByStatus[i] = this.sprintData[i].Count;
        this.totalWorkItems += this.sprintData[i].Count;
      }

      console.log(this.workItemStatus);
      this.plotPieChart();
    });
  }

  getEmployeeWorkItemCountByStatus(tableViewParams: HttpParams) {
    this.workItemsService.getEmployeeWorkItemCountByStatus(tableViewParams).subscribe(result => {
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

  getWorkItemValues(empData: any, expanded: any) {
    if (expanded) {
      let indexToUpdate = this.employeeData.findIndex(item => item.empEmail === empData.empEmail);
      this.employeeData[indexToUpdate].expanded = false;
      this.employeeData = Object.assign([], this.employeeData);
      return;
    }

    this.empID = empData.empId;
    this.workItemTypeDisplayTextAfterExpand = (this.selectedWorkItemTypeValue == 'Bug') ? 'Bugs' : 'User Stories';
    this.storyPointsDisplayTextAfterExpand = 'Story Points';
    this.statusDisplayTextAfterExpand = 'Status';
    let tableViewParams = new HttpParams();
    tableViewParams = tableViewParams.append("sprintUID", this.selectedSprint.sprintUID);
    tableViewParams = tableViewParams.append("workItemType", this.selectedWorkItemTypeValue);
    tableViewParams = tableViewParams.append("empId", empData.empId);

    this.tableWorkItemDetailsCaption = this.selectedSprint.sprintName + '-' + empData.empName + '-' + this.selectedWorkItemTypeValue + ' Details';
    this.getWorkItemDetails(tableViewParams, empData);
  }

  getWorkItemDetails(tableViewParams: HttpParams, empData: any) {
    this.workItemsService.getWorkItemDetails(tableViewParams).subscribe(result => {
      this.workItemDetails = [];
      this.workItemDetails = result;

      let indexToUpdate = this.employeeData.findIndex(item => item.empEmail === empData.empEmail);

      this.employeeData[indexToUpdate].expanded = true;
      this.employeeData[indexToUpdate].workItemDetails = this.workItemDetails;
      this.employeeData[indexToUpdate].totalPoints = this.workItemDetails.map(a => a.Points).reduce(function (a, b) { return a + b; });
      this.employeeData = Object.assign([], this.employeeData);
    });
  }
}

