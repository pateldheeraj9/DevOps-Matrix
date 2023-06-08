import { Component, ViewChild } from '@angular/core';
import { ISeverityBugCount, ISprint } from '../models/common.model';
import { IEmployeeBugsCount, IEmployeePoints, IEmployeeStatusNew } from '../models/employee.model';
import { WorkStatusService } from '../services/work-status.service';
import { Table } from 'primeng/table';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chart-team-performance',
  templateUrl: './chart-team-performance.component.html',
  styleUrls: ['./chart-team-performance.component.css']
})
export class ChartTeamPerformanceComponent {
  @ViewChild('tableEmployee') tableEmployee: Table = {} as Table;
  @ViewChild('tableBugEmployee') tableBugEmployee: Table = {} as Table;

  sprintList: ISprint[] = [];
  pointsData: any;
  bugsData: any;
  employeeData: IEmployeeStatusNew[] = [];
  employeePoints: IEmployeePoints[] = [];
  employeeBugCount: IEmployeeBugsCount[] = [];
  pointsCount: any = [];
  empName: any = [];
  bugsCount: any = [];
  totalStoryPoints: number = 0;
  totalBugsCount: number = 0;
  selectedValue = 'User Story Summary';
  selectedSprint: any;
  options: any;
  bugOptions: any;
  tableFooter: IEmployeeStatusNew = {} as IEmployeeStatusNew;
  tableUSShow: boolean = false;
  tableBugShow: boolean = false;
  severityCount: ISeverityBugCount[] = [];
  tableFooterSeverity: ISeverityBugCount = {} as ISeverityBugCount;

  columns = [
    { field: "EmpName", header: "Employee Name" },
    { field: "New", header: "New" },
    { field: "Active", header: "Active" },
    //{ field: "prReview", header: "PR Review" },
    //{ field: "deliveredToQA", header: "Delivered To QA" },
    { field: "Resolved", header: "Resolved" },
    { field: "Closed", header: "Closed" },
    { field: "Removed", header: "Removed" },
    { field: "Other", header: "Other" },
    { field: "", header: "Total" },
  ];

  columnSeverity = [
    { field: "empName", header: "Employee Name" },
    { field: "critical", header: "1-Critical" },
    { field: "high", header: "2-High" },
    { field: "medium", header: "3-Medium" },
    { field: "low", header: "4-Low" },
    { field: "total", header: "Total" },
  ];

  constructor(private workStatusService: WorkStatusService, private commonService: CommonService, private route: Router) { }

  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
    this.commonService.getSprints().subscribe((result) => {
      this.sprintList = result;
      this.sprintList = this.sprintList.sort((a, b) => Number(b.startDate) - Number(a.startDate));
      this.selectedSprint = this.sprintList[0];
      this.OnUserSummarySelected(this.selectedSprint);
      this.OnStoryPointsSelected(this.selectedSprint);
    }, (error) => {
      console.log(error);
    });
  }

  OnSprintSelectionChanged() {
    this.selectedValue = 'User Story Summary';
    //this.tableEmployee.reset();
    //this.tableBugEmployee.reset();
    this.OnUserSummarySelected(this.selectedSprint);
    this.OnStoryPointsSelected(this.selectedSprint);
  }

  OnUserSummarySelected(sprintUID: any) {
    this.tableUSShow = true;
    this.tableBugShow = false;
    this.workStatusService.getUserStoryPointsByStatusNEmployees(sprintUID.sprintUID).subscribe(result => {
      this.employeeData = result;

      console.log(this.employeeData);
      this.tableFooter.New = this.employeeData.map(a => a.New).reduce(function (a, b) { return a + b; });
      this.tableFooter.Active = this.employeeData.map(a => a.Active).reduce(function (a, b) { return a + b; });
      this.tableFooter.PRReview = this.employeeData.map(a => a.PRReview).reduce(function (a, b) { return a + b; });
      this.tableFooter.DeliveredToQA = this.employeeData.map(a => a.DeliveredToQA).reduce(function (a, b) { return a + b; });
      this.tableFooter.Resolved = this.employeeData.map(a => a.Resolved).reduce(function (a, b) { return a + b; });
      this.tableFooter.Closed = this.employeeData.map(a => a.Closed).reduce(function (a, b) { return a + b; });
      this.tableFooter.Removed = this.employeeData.map(a => a.Removed).reduce(function (a, b) { return a + b; });
      this.tableFooter.Other = this.employeeData.map(a => a.Other).reduce(function (a, b) { return a + b; });
      this.tableFooter.Total = this.employeeData.map(a => a.Total).reduce(function (a, b) { return a + b; });

      this.tableFooter.EmpName = "Total";
      this.OnStoryPointsSelected(this.selectedSprint);
    });
  }


  OnStoryPointsSelected(sprintUID: any) {
    this.totalStoryPoints = 0;
    var totalCount = 0;

    this.workStatusService.getUserStoryPointsByEmployees(sprintUID.sprintUID).subscribe(result => {
      this.employeePoints = result;
      this.empName = [];
      this.pointsCount = [];
      for (var i = 0; i <= this.employeePoints.length - 1; i++) {
        this.empName[i] = this.employeePoints[i].EmpName;
        this.pointsCount[i] = this.employeePoints[i].Points;
        totalCount = totalCount + this.employeePoints[i].Points;
      }

      this.totalStoryPoints = totalCount;
      this.pointsData = {
        series: this.pointsCount,
        labels: this.empName,
        datasets: [
          {
            data: this.pointsCount,
            backgroundColor: [
              "darkblue",
              "yellow",
              "red",
              "green",
              "grey",
              "orange",
              "pink",
              "#3366CC",
              "#DC3912", '#FF9900', '#109618', '#990099',
              '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
              '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
              '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
            ],
            hoverBackgroundColor: [
              "darkblue",
              "yellow",
              "red",
              "green",
              "grey",
              "orange",
              "pink",
              "#3366CC",
              "#DC3912", '#FF9900', '#109618', '#990099',
              '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
              '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
              '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
            ],

          }],

      };

      this.options = {
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true

            }
          }
        }
      };
    });
  }

  OnBugSummarySelected(sprintUID: any) {
    this.tableUSShow = false;
    this.tableBugShow = true;
    this.workStatusService.getBugsCountBySeverityNEmployees(sprintUID.sprintUID).subscribe(result => {
      this.severityCount = result[0];
      console.log(this.severityCount);
      this.tableFooterSeverity.critical = this.severityCount.map(a => a.critical).reduce(function (a, b) { return a + b; });
      this.tableFooterSeverity.high = this.severityCount.map(a => a.high).reduce(function (a, b) { return a + b; });
      this.tableFooterSeverity.medium = this.severityCount.map(a => a.medium).reduce(function (a, b) { return a + b; });
      this.tableFooterSeverity.low = this.severityCount.map(a => a.low).reduce(function (a, b) { return a + b; });
      this.tableFooterSeverity.total = this.severityCount.map(a => a.total).reduce(function (a, b) { return a + b; });

      this.tableFooterSeverity.empName = "Total";
      this.OnBugsCountSelected(this.selectedSprint);
    });
  }

  OnBugsCountSelected(sprintUID: any) {
    this.totalBugsCount = 0;
    var totalCount = 0;

    this.workStatusService.getBugsCountByEmployees(sprintUID.sprintUID).subscribe(result => {
      this.employeeBugCount = result;
      this.empName = [];
      this.bugsCount = [];
      for (var i = 0; i <= this.employeeBugCount.length - 1; i++) {
        this.empName[i] = this.employeeBugCount[i].EmpName;
        this.bugsCount[i] = this.employeeBugCount[i].BugCount;
        totalCount = totalCount + this.employeeBugCount[i].BugCount;
      }

      this.totalBugsCount = totalCount;
      this.bugsData = {
        series: this.bugsCount,
        labels: this.empName,
        datasets: [
          {
            data: this.bugsCount,
            backgroundColor: [
              "darkblue",
              "yellow",
              "red",
              "green",
              "grey",
              "orange",
              "pink",
              "#3366CC",
              "#DC3912", '#FF9900', '#109618', '#990099',
              '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
              '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
              '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
            ],
            hoverBackgroundColor: [
              "darkblue",
              "yellow",
              "red",
              "green",
              "grey",
              "orange",
              "pink",
              "#3366CC",
              "#DC3912", '#FF9900', '#109618', '#990099',
              '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
              '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
              '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
            ],

          }],

      };

      this.bugOptions = {
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true

            }
          }
        }
      };
    });
  }

  RedirectToIndividualPerformance(empEmail: string) {
    this.route.navigate(['chart-individual-performance', { empEmail: empEmail }])
  }
}





