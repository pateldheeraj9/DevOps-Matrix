import { Component, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerformanceServiceService } from '../services/performance.service';
import { CommonService } from '../services/common.service';
import { ISprint } from '../models/common.model';
import { ISprintHours } from '../models/ISprintHours';
import { ISprintTotalPoints } from '../models/ISprintTotalPoints';

@Component({
  selector: 'app-chart-sprint-performance',
  templateUrl: './chart-sprint-performance.component.html',
  styleUrls: ['./chart-sprint-performance.component.css']
})
export class ChartSprintPerformanceComponent {
  constructor(private performanceService: PerformanceServiceService,
    private commonService: CommonService,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  }
  @Input("isHome") isHome: boolean = false;
  sprintRemainingEffort: ISprintHours[] = [];
  sprintTotalPoints: ISprintTotalPoints[] = [];
  sprintActual: ISprintHours[] = [];
  sprintPlanned: ISprintHours[] = [];
  changedData: object = {};
  sprints: ISprint[] = [];
  data: any;
  options: any;
  selectedSprints: ISprint[] = [];
  sprintDeviated: any;
  status: string = "";
  totalExpected: number = 0;
  totalActual: number = 0;
  columns = [
    { field: "Title", header: "Work Item" },
    { field: "EmpName", header: "Employee Name" },
    { field: "SprintName", header: "Sprint Name" },
    { field: "ExpectedHour", header: "Expected Hour" },
    { field: "ActualHour", header: "Actual Hour" }
  ];
  ngOnInit() {
    this.commonService.getSprints().subscribe((res) => {
      this.sprints = res;
    }, (error) => {
    },
      () => { this.preSelectData(); });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [],
      datasets: [
        {
          type: 'line',
          label: 'Ideal',
          data: [],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--yellow-500')
        },
        {
          type: 'line',
          label: 'Remaining',
          data: [],
          display: false,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--red-500'),
          tension: 0.4
        },
        {
          type: 'bar',
          label: 'Planned',
          data: [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--blue-200'),
          tension: 0.4
        },
        {
          type: 'bar',
          label: 'Actual',
          data: [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--pink-200'),
          tension: 0.4
        },

      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          position: this.isHome ? 'top' : 'right',
          labels: {
            color: textColor
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
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          title: {
            display: true,
            text: "Hours",
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
          }
        }
      }
    };
    this.getSprintDeviated();
  }
  onSprintSelected() {
    this.getSprintActualHr();
  }

  calculateIdealArray(): Array<number> {
    let end = this.sprintTotalPoints.reduce((end, curr) => end + curr.TotalPoints, 0) * 6;
    var arr = [end];
    if (this.selectedSprints.length > 2) {
      let i = 1;
      let cnst = end / this.selectedSprints.length;
      while (i < this.selectedSprints.length - 1) {
        arr[i] = arr[i - 1] - cnst;
        i++;
      }
    }
    arr.push(0);
    return arr;
  }

  preSelectData() {
    this.sprints = this.sprints.sort((a, b) => Number(b.startDate) - Number(a.startDate));

    if (this.isHome)      
      this.selectedSprints = [this.sprints[0]];
    else
      this.selectedSprints = this.sprints.slice(0, 3);

    this.onSprintSelected();
  }

  getSprintActualHr() {
    this.performanceService.getSprintActualHr(this.selectedSprints).subscribe((res) => {
      this.sprintActual = res;
    }, (error) => {
    }, () => {
      this.getSprintTotalPoints();
    });
  }

  getSprintTotalPoints() {
    this.performanceService.getSprintTotalPoints(this.selectedSprints).subscribe((res) => {
      this.sprintTotalPoints = res;
    }, (error) => {
    },
      () => { this.getSprintRemainingEffort(); })
  }

  getSprintRemainingEffort() {
    this.performanceService.getSprintRemainingEffort(this.selectedSprints).subscribe((res) => {
      this.sprintRemainingEffort = res;
    }, (error) => {

    }, () => {
      this.getSprintPlannedHr();
    })
  }

  getSprintPlannedHr() {
    this.performanceService.getSprintPlannedHr(this.selectedSprints).subscribe((res) => {
      this.sprintPlanned = res;
    }, (error) => {
    },
      () => {
        let temp: any = this.data;
        temp.labels = this.sprintPlanned.map(x => x.SprintNumber);
        temp.datasets[0].data = this.calculateIdealArray();
        temp.datasets[1].data = this.sprintRemainingEffort.map(x => x.Hr);
        temp.datasets[2].data = this.sprintPlanned.map(x => x.Hr);
        temp.datasets[3].data = this.sprintActual.map(x => x.Hr);
        if (this.isHome) {
          temp.datasets = this.data.datasets.slice(2);
        }
        this.data = Object.assign({}, temp);
        this.getSprintDeviated();
      });
  }

  getSprintDeviated() {
    this.performanceService.getSprintDeviations(this.selectedSprints).subscribe((res) => {
      this.sprintDeviated = res.filter((x: any) => (Math.abs(x.ExpectedHour - x.ActualHour) * 100) / x.ExpectedHour > 20);
      this.totalActual = this.sprintDeviated.reduce(function (acc: any, obj: any) { return acc + obj.ActualHour }, 0);
      this.totalExpected = this.sprintDeviated.reduce(function (acc: any, obj: any) { return acc + obj.ExpectedHour }, 0)
    }, (error) => {
    })
  }

  calculateInterpretation(expected: number, actual: number): string {
    let status;
    if (expected < actual) {
      let deviation = ((actual - expected) / expected) * 100
      if (deviation <= 20)
        status = "On Track"
      else
        status = "Needs Attention"
    }
    else {
      let deviation = ((expected - actual) / expected) * 100
      if (deviation <= 20)
        status = "On Track"
      else
        status = "Needs Attention"
    }
    this.status = status;
    return status;
  }
}
