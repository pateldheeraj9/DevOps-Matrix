import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { PerformanceServiceService } from '../services/performance.service';
import { IUser } from '../models/IUser';
import { ICompletedTasks } from '../models/ICompletedTasks';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { ISprint } from '../models/common.model';

@Component({
  selector: 'app-chart-individual-performance',
  templateUrl: './chart-individual-performance.component.html',
  styleUrls: ['./chart-individual-performance.component.css'],
})

export class ChartIndividualPerformanceComponent implements OnInit {
  constructor(private performanceService: PerformanceServiceService,
    private commonService: CommonService, http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private route: ActivatedRoute) {
  }
  addDays = (date: Date, days: number): Date => {
    let temp = date;
    temp.setDate(temp.getDate() + days);
    return temp;
  };
  remainingEfforts: any;
  userTotalHours: number = 0;
  date: any;
  sprints: ISprint[] = [];
  todayDate: Date = new Date();
  rangeDates: Date[] = [this.addDays(new Date(), -14), this.todayDate];
  completedTasks: ICompletedTasks[] = [];
  remainingTasks: ICompletedTasks[] = [];
  selectedSprints?: ISprint;
  users: IUser[] = [];
  data: any;
  options: any;
  selectedUser: IUser = { EmpId: 0, EmpName: "", EmpEmail: '' };
  ngOnInit() {
    this.commonService.getSprints().subscribe((res) => {
      this.sprints = res;
    }, (error) => {
    },
      () => { this.preSelectData(this.sprints[0]); });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Remaining Tasks',
          type: 'line',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--red-300'),
          tension: 0.4
        },
        {
          label: 'Ideal(Hrs)',
          data: [],
          yAxisID: 'y1',
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        {
          label: 'Remaining(Hrs)',
          data: [],
          yAxisID: 'y1',
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--yellow-500')
        },
        {
          label: 'Completed Tasks',
          type: 'bar',
          data: [],
          yAxisID: 'y',
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-300'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Days",
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
            text: "Tasks",
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
        y1: {
          title: {
            display: true,
            text: "Hours",
            font: {
              size: 18
            }
          },
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder
          }
        }
      }
    };
    this.getAllEmployees();
  }
  onChangeUser() {
    this.getUserData();

  }
  getUserData() {
    this.performanceService.getUserRemainingEffort(this.selectedUser.EmpId, this.rangeDates[0].toISOString().split('T')[0],
      this.rangeDates[1].toISOString().split('T')[0]).subscribe((res) => {
        this.remainingEfforts = this.mapValuesWithDates(res);
      }, (err) => { });

    this.performanceService.getdata(this.selectedUser.EmpId).subscribe((res) => {
      this.completedTasks = this.mapValuesWithDates(res);
    }, (error) => {

    },
      () => {
        let temp: any = this.data;
        temp.datasets[3].data = this.completedTasks;
        temp.datasets[1].data = this.calculateIdealArray();
        this.data = Object.assign({}, temp);
        this.getUserDataRemaining();
      })
  }
  onDateSelect() {
    let temp: any = this.data;
    if(this.selectedSprints){
      this.rangeDates = [new Date(this.selectedSprints.startDate),new Date(this.selectedSprints.endDate)];
    }
    else{
      return;
    }
    temp.labels = this.getDaysArray(this.rangeDates[0], this.rangeDates[1]).map((x: any) => x.toISOString().split('T')[0]);
    this.data = Object.assign({}, temp);
    this.getUserData();
  }

  getDaysArray(start: Date, end: Date) {
    var arr: any = [];
    var dt = new Date(start);
    while (dt <= new Date(end)) {
      let day = dt.getDay();
      console.log(dt,day);
      if (day != 0 && day != 6)
        arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  mapValuesWithDates(valueArr: any) {
    let arr = new Array(this.data.labels.length + 1).fill(0);
    for (const curr of valueArr) {
      let formattedDate = curr['ModDate'].split('T')[0];
      if (this.data.labels.includes(formattedDate)) {
        arr[this.data.labels.indexOf(formattedDate)] = curr['count']
      }
    }
    return arr;
  }
  getUserDataRemaining() {
    this.performanceService.getDataRemaining(this.selectedUser.EmpId).subscribe((res) => {
      this.remainingTasks = this.mapValuesWithDates(res);
    }, (error) => {

    },
      () => {
        let temp: any = this.data;
        temp.datasets[0].data = this.remainingTasks;
        temp.datasets[2].data = this.remainingEfforts;
        this.data = Object.assign({}, temp);
      })
  }
  getAllEmployees() {
    this.commonService.getAllEmployees().subscribe((res) => {
      this.users = res;
    }, (error) => {

    },
      () => {
        if (this.route.snapshot.paramMap.get('empEmail') != undefined) {
          let user = this.users.find(x => x.EmpEmail ==
            this.route.snapshot.paramMap.get('empEmail'));
          if (user != undefined) {
            this.selectedUser = user;
          }
        }
        else {
          this.selectedUser = this.users[0];
        }
        this.onChangeUser();
      });
  }
  calculateIdealArray(): Array<number> {
    var arr: number[] = [];
    this.performanceService.getUserTotalHour(this.selectedUser.EmpId,
      this.rangeDates[0].toISOString().split('T')[0],
      this.rangeDates[1].toISOString().split('T')[0]).subscribe((res) => {
        this.userTotalHours = res[0]['TotalHours'];
      }, (error) => {
      }, () => {
        let end = this.userTotalHours;
        arr.push(end);
        let i = 1;
        let cnst = this.commonService.RoundNumber((end / (this.data.labels.length - 1)));
        while (i < this.data.labels.length - 1) {
          arr[i] = this.commonService.RoundNumber((arr[i - 1] - cnst));
          i++;
        }
        arr.push(0);
      });
    return arr;
  }
  preSelectData(sprint:any){
    this.sprints = this.sprints.sort((a, b) => Number(b.startDate) - Number(a.startDate));
    this.selectedSprints = this.sprints[0];
    this.rangeDates = [new Date(sprint.startDate),new Date(sprint.endDate)];
    this.onDateSelect();
  }
}
