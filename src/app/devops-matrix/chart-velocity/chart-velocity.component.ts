import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ISprint } from '../models/common.model';
import { ChartVelocityService } from '../services/chart-velocity.service';
import { CommonService } from '../services/common.service';
import { ISprintVelocity } from '../models/ISprintVelocity';

@Component({
  selector: 'app-chart-velocity',
  templateUrl: './chart-velocity.component.html',
  styleUrls: ['./chart-velocity.component.css'],
})

export class ChartVelocityComponent implements OnInit {
  sprints: ISprint[] = [];
  selectedSprints: ISprint[] = [];
  sprintVelocityApiResult: any;
  sprintVelocity: ISprintVelocity[] = [];
  documentStyle: any = getComputedStyle(document.documentElement);
  textColor: any = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary: any = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder: any = this.documentStyle.getPropertyValue('--surface-border');

  barChartByStoryPoints: any = {
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
      }
    ]
  };

  chartOptionsByStoryPoints: any;

  constructor(private commonService: CommonService, private chartVelocityService: ChartVelocityService) { }

  ngOnInit() {
    this.getSprints();
    this.OnSprintsSelectionChanged();
  }

  getSprints() {
    this.commonService.getSprints().subscribe((result) => {
      this.sprints = result;
    }, (error) => {
      console.log(error);
    },
      () => {
        console.log(this.sprints);
        this.selectedSprints = this.sprints.sort((a, b) => Number(b.startDate) - Number(a.startDate)).slice(0, 3);
        this.OnSprintsSelectionChanged();
      });
  }

  OnSprintsSelectionChanged() {
    this.bindChartPointsPerSprint();
  }

  bindChartPointsPerSprint() {
    var sprintUIDs = this.selectedSprints.map(x => x.sprintUID);
    this.sprintVelocity = [];

    this.chartVelocityService.getSprintVelocityDetails(sprintUIDs).subscribe((result) => {
      this.sprintVelocityApiResult = result;
    }, (error) => {
      console.log(error);
    },
      () => {
        for (let i = 0; i < sprintUIDs.length; i++) {
          var temp = this.sprintVelocityApiResult[Object.keys(this.sprintVelocityApiResult)[i]];
          this.sprintVelocity.push({
            sprintUID: temp.SprintUID,
            sprintNumber: temp.SprintNumber,
            sprintName: temp.SprintName,
            totalPoints: temp.TotalPoints,
            developerCount: temp.DeveloperCount
          });
        }

        this.plotChartByStoryPoints();
      });
  }

  plotChartByStoryPoints() {
    this.barChartByStoryPoints = {
      labels: [],
      datasets: [
        {
          type: 'line',
          label: 'Developer Count',
          backgroundColor: this.documentStyle.getPropertyValue('--orange-300'),
          borderColor: this.documentStyle.getPropertyValue('--orange-300'),
          data: [],
          yAxisID: 'y1',
        },
        {
          type: 'bar',
          label: 'Completed Story Points',
          backgroundColor: this.documentStyle.getPropertyValue('--green-300'),
          borderColor: this.documentStyle.getPropertyValue('--green-300'),
          data: []
        }
      ]
    };

    this.chartOptionsByStoryPoints = {
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
          title: {
            display: true,
            text: "Sprints",
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
          title: {
            display: true,
            text: "Story Points",
            font: {
              size: 18
            }
          },
          position: 'left',
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          }
        },
        y1: {
          title: {
            display: true,
            text: "Developer Count",
            font: {
              size: 18
            }
          },
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
            drawOnChartArea: false,
          }
        }

      }
    };


    let labels = this.sprintVelocity.map(x => x.sprintNumber);
    let storyPoints = this.sprintVelocity.map(x => x.totalPoints);
    let developerCount = this.sprintVelocity.map(x => x.developerCount);

    let temp: any = this.barChartByStoryPoints;
    temp.labels = labels;
    temp.datasets[0].data = developerCount;
    temp.datasets[1].data = storyPoints;

    this.barChartByStoryPoints = Object.assign({}, temp);
  }
}
