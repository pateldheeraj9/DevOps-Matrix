import { Component, Input, ViewChild } from '@angular/core';
import { WorkStatusService } from '../services/work-status.service';
import { CommonService } from '../services/common.service';
import { ISeverityCount, ISprint, ISprintStatus, IUserStoryCount } from '../models/common.model';

@Component({
  selector: 'app-chart-work-status',
  templateUrl: './chart-work-status.component.html',
  styleUrls: ['./chart-work-status.component.css']
})
export class ChartWorkStatusComponent {
  sprintList: ISprint[] = [];
  ItemState: any;
  workItemsCountByStatus: ISprintStatus[] = [];
  tableShow: boolean = false;
  totalCountsByWorkItems: any;
  total: any;
  selectedSprints: ISprint[] = [];
  //{ sprintUID: "0", sprintNumber: "", sprintName: "" };
  severityCount: ISeverityCount[] = [];
  UserStoryPointsCount: IUserStoryCount[] = [];
  UserStoryPointsApiResult:any;
  severityStatusApiResult: any;

  barChartSeverity: any = {
    labels: [],
    datasets: [
      {
        label: '',
        backgroundColor: [],
        borderColor: [],
        data: []
      },
      {
        label: '',
        backgroundColor: [],
        borderColor: [],
        data: []
      },
      {
        label: '',
        backgroundColor: [],
        borderColor: [],
        data: []
      },
    ]
  };
  barChartOptions: any;

  barChartPoints: any = {
    labels: [],
    datasets: [
      {
        label: '',
        backgroundColor: [],
        borderColor: [],
        data: []
      },
      {
        label: '',
        backgroundColor: [],
        borderColor: [],
        data: []
      },
      {
        label: '',
        backgroundColor: [],
        borderColor: [],
        data: []
      },
    ]
  };
  barChartPointsOptions: any;


  constructor(private workStatusService: WorkStatusService, private commonService: CommonService) { }

  default_colors: string[] = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

  ngOnInit() {
    this.getSprints();
    this.OnSprintsSelectionChanged();
  }

  getSprints() {
    this.commonService.getSprints().subscribe((result) => {
      this.sprintList = result;
    }, (error) => {
      console.log(error);
    },
      () => {
        this.selectedSprints = this.sprintList.sort((a, b) => Number(b.startDate) - Number(a.startDate)).slice(0, 3);
        this.OnSprintsSelectionChanged();
      });
  }

  OnSprintsSelectionChanged() {
    this.OnSprintNameSelected();
    this.getSeverityCount();
    this.getUserStoryPointsCount();
  }

  OnSprintNameSelected() {
    this.tableShow = true;
    var sprintUIDs = this.selectedSprints.map(x => x.sprintUID);
    this.workStatusService.getStatusCountData(sprintUIDs).subscribe(result => {
      console.log(result);
      this.workItemsCountByStatus = result[0];
      this.totalCountsByWorkItems = result[1][0];
    });
  }

  getSeverityCount() {
    this.tableShow = true;
    var sprintUIDs = this.selectedSprints.map(x => x.sprintUID);
    this.severityCount = [];
    this.workStatusService.getSprintsSeverityCount(sprintUIDs).subscribe(result => {
      this.severityStatusApiResult = result;
      
    }, (error) => {
      console.log(error);
    },
      () => {

        for (let i = 0; i < sprintUIDs.length; i++) {
          var temp = this.severityStatusApiResult[Object.keys(this.severityStatusApiResult)[i]];
          console.log(temp);
             this.severityCount.push({
               SprintNumber: temp.sprintNumber,
               Critical: temp.critical,
               High: temp.high,
               Medium: temp.medium,
               Low: temp.low,
             });
        
         this.plotBarChart();
        }
        
      });
  }


  plotBarChart() {
    this.configureBarChart();

    let labels = this.severityCount.map(x => x.SprintNumber);
    let critical = this.severityCount.map(x => x.Critical);
    let high = this.severityCount.map(x => x.High);
    let medium = this.severityCount.map(x => x.Medium);
    let low = this.severityCount.map(x => x.Low);

    let temp: any= this.barChartSeverity;
    temp.labels = labels;
    temp.datasets[0].data = critical;
    temp.datasets[1].data = high;
    console.log(high);
    temp.datasets[2].data = medium;
    temp.datasets[3].data = low;
    this.barChartSeverity = Object.assign({}, temp);
    console.log(this.barChartSeverity);
  }
 

  configureBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barChartSeverity = {
      labels: ['1-Critical', '2 - High', '3 - Medium', '4 - Low'],
      datasets: [
        {
          label: '1 - Critical',
          backgroundColor: documentStyle.getPropertyValue('--red-300'),
          borderColor: documentStyle.getPropertyValue('--red-300'),
          data: []
        },
        {
          label: '2 - High',
          backgroundColor: documentStyle.getPropertyValue('--blue-300'),
          borderColor: documentStyle.getPropertyValue('--blue-300'),
          data: []
        },
        {
          label: '3 - Medium',
          backgroundColor: documentStyle.getPropertyValue('--green-300'),
          borderColor: documentStyle.getPropertyValue('--green-300'),
          data: []
        },
        {
          label: '4 - Low',
          backgroundColor: documentStyle.getPropertyValue('--pink-300'),
          borderColor: documentStyle.getPropertyValue('--pink-300'),
          data: []
        },
      ]
    };

    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked:true,
          title: {
            display: true,
            text: "Sprints",
            font: {
              size: 18
            }
          },
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked:true,
          title: {
            display: true,
            text: "Bug Count",
            font: {
              size: 18
            }
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Bug Count',
            fontColor: '#757575',
            fontSize: 12
          }
        }

      }
    };

  }

  getUserStoryPointsCount() {
    this.tableShow = true;
    var sprintUIDs = this.selectedSprints.map(x => x.sprintUID);
    this.UserStoryPointsCount = [];
    this.workStatusService.getSprintsPointsCount(sprintUIDs).subscribe(result => {
      this.UserStoryPointsApiResult = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    },
      () => {

        for (let i = 0; i < sprintUIDs.length; i++) {
          var temp = this.UserStoryPointsApiResult[Object.keys(this.UserStoryPointsApiResult)[i]];
          console.log(temp);
             this.UserStoryPointsCount.push({
               SprintNumber: temp.sprintNumber,
               High: temp.high,
               Medium: temp.medium,
               Low: temp.low,
               //BugCount: temp.BugCount,
             });
         // }
         this.plotPointsBarChart();
        }
        
      });
  }

  plotPointsBarChart() {
    this.configurePointsBarChart();

    let labels = this.UserStoryPointsCount.map(x => x.SprintNumber);
    let high = this.UserStoryPointsCount.map(x => x.High);
    let medium = this.UserStoryPointsCount.map(x => x.Medium);
    let low = this.UserStoryPointsCount.map(x => x.Low);

    let temp: any= this.barChartPoints;
    temp.labels = labels;
    temp.datasets[0].data = high;
    console.log(high);
    temp.datasets[1].data = medium;
    temp.datasets[2].data = low;
    this.barChartPoints = Object.assign({}, temp);
    console.log(this.barChartPoints);
  }
 
  configurePointsBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barChartPoints = {
      labels: ['0-3', '4-8', '>8'],
      datasets: [
        {
          label: '0-3',
          backgroundColor: documentStyle.getPropertyValue('--red-300'),
          borderColor: documentStyle.getPropertyValue('--red-300'),
          data: []
        },
        {
          label: '4-8',
          backgroundColor: documentStyle.getPropertyValue('--pink-200'),
          borderColor: documentStyle.getPropertyValue('--green-200'),
          data: []
        },
        {
          label: '>8',
          backgroundColor: documentStyle.getPropertyValue('--yellow-200'),
          borderColor: documentStyle.getPropertyValue('--yellow-200'),
          data: []
        },
      ]
    };

    this.barChartPointsOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked:true,
          title: {
            display: true,
            text: "Sprints",
            font: {
              size: 18
            }
          },
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked:true,
          title: {
            display: true,
            text: "US Story Points",
            font: {
              size: 18
            }
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'US Story Points',
            fontColor: '#757575',
            fontSize: 12
          }
        }

      }
    };

  }
  columns = [
    { field: "itemType", header: "Type" },
    { field: "new", header: "New" },
    { field: "active", header: "Active" },
    { field: "prReview", header: "PR Review" },
    { field: "resolved", header: "Resolved" },
    { field: "deliveredToQA", header: "Delivered To QA" },
    { field: "closed", header: "Closed" },
    { field: "removed", header: "Removed" },
    { field: "total", header: "Total" },
  ];

}




