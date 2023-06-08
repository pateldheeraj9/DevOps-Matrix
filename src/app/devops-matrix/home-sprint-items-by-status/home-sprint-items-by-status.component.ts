import { Component, Input, OnInit } from '@angular/core';
import { ISprint } from '../models/common.model';
import { ChartVelocityService } from '../services/chart-velocity.service';
import { CommonService } from '../services/common.service';
import { IWorkItemsByStatus } from '../models/workItem.model'

@Component({
  selector: 'app-home-sprint-items-by-status',
  templateUrl: './home-sprint-items-by-status.component.html'
})

export class HomeSprintItemsByStatusComponent implements OnInit {
  @Input() SprintUID = '';
  workItemsByStatusApiResult: any;
  workItemsByStatus: IWorkItemsByStatus[] = [];
  currentSprintNumber: string = "";
  documentStyle: any = getComputedStyle(document.documentElement);
  textColor: any = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary: any = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder: any = this.documentStyle.getPropertyValue('--surface-border');

  barChartWorkItemsByStatus: any = {
    labels: ['User Story', 'Bugs'],
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

  chartOptionsWorkItemsByStatus: any;

  constructor(private commonService: CommonService, private chartVelocityService: ChartVelocityService) { }

  ngOnInit() {
    this.bindChartWorkItemsByStatus();
  }

  bindChartWorkItemsByStatus() {
    var sprintUIDs = [this.SprintUID];
    this.workItemsByStatus = [];

    this.chartVelocityService.getSprintWorkItemsCountByStatus(sprintUIDs).subscribe((result) => {
      this.workItemsByStatusApiResult = result;
    }, (error) => {
      console.log(error);
    },
      () => {
        for (let i = 0; i < this.workItemsByStatusApiResult.length; i++) {
          var temp = this.workItemsByStatusApiResult[i][0];
          this.currentSprintNumber = temp.SprintNumber;
          this.workItemsByStatus.push({
            sprintUID: temp.SprintUID,
            sprintNumber: temp.SprintNumber,
            sprintName: temp.SprintName,
            sprintEndDate: temp.SprintEndDate,
            planned: temp.PlannedWorkItems,
            completed: temp.CompletedWorkItems,
            incomplete: temp.IncompleteWorkItems,
          });
        }

        this.plotBarChartWorkItemsByStatus();
      });
  }

  plotBarChartWorkItemsByStatus() {
    this.configureBarChart();

    let planned = this.workItemsByStatus.map(x => x.planned);
    let completed = this.workItemsByStatus.map(x => x.completed);
    let incomplete = this.workItemsByStatus.map(x => x.incomplete);

    let temp: any = this.barChartWorkItemsByStatus;
    //temp.labels = labels;
    temp.datasets[0].data = planned;
    temp.datasets[1].data = completed;
    temp.datasets[2].data = incomplete;

    this.barChartWorkItemsByStatus = Object.assign({}, temp);
  }

  configureBarChart() {
    this.barChartWorkItemsByStatus = {
      labels: ['User Story', 'Bugs'],
      datasets: [
        {
          type: 'bar',
          label: 'Planned',
          backgroundColor: this.documentStyle.getPropertyValue('--blue-300'),
          borderColor: this.documentStyle.getPropertyValue('--blue-300'),
          data: []
        },
        {
          type: 'bar',
          label: 'Completed',
          backgroundColor: this.documentStyle.getPropertyValue('--green-300'),
          borderColor: this.documentStyle.getPropertyValue('--green-300'),
          data: []
        },
        {
          type: 'bar',
          label: 'Incomplete',
          backgroundColor: this.documentStyle.getPropertyValue('--red-300'),
          borderColor: this.documentStyle.getPropertyValue('--red-300'),
          data: []
        },
      ]
    };

    this.chartOptionsWorkItemsByStatus = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: this.currentSprintNumber,
            font: {
              size: 18
            }
          },
          ticks: {
            color: this.textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: "Count of Work Items",
            font: {
              size: 18
            }
          },
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Count of Work Items',
            fontColor: '#757575',
            fontSize: 12
          }
        }

      }
    };
  }
}
