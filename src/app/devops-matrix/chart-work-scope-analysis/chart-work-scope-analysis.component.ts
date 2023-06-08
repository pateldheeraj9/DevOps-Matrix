import { Component } from '@angular/core';
import { IUser } from '../models/IUser';
import { ISprint } from '../models/common.model';
import { CommonService } from '../services/common.service';
import { HttpParams } from '@angular/common/http';
import { ChartWorkAnalysisService } from '../services/chart-work-analysis.service';

@Component({
  selector: 'app-chart-work-scope-analysis',
  templateUrl: './chart-work-scope-analysis.component.html',
  styleUrls: ['./chart-work-scope-analysis.component.css']
})
export class ChartWorkScopeAnalysisComponent {
  showAnalysis: boolean = false;
  employees: IUser[] = [];
  selectedTeam1: IUser[] = [];
  selectedTeam2: IUser[] = [];
  sprints: ISprint[] = [];
  selectedSprints: ISprint[] = [];
  userStoryAnalysisResult: any = [];
  bugsAnalysisResult: any = [];
  documentStyle: any = getComputedStyle(document.documentElement);
  textColor: any = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary: any = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder: any = this.documentStyle.getPropertyValue('--surface-border');

  columns: any = [
    { field: "SprintNumber", header: "Sprint Number" },
    { field: "Team1", header: "Team 1" },
    { field: "Team2", header: "Team 2" },
  ];

  chartUserStoryAnalysisData: any = {
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

  chartUserStoryOptions: any;

  chartBugsAnalysisData: any = {
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

  chartBugsAnalysisOptions: any;

  constructor(private commonService: CommonService, private workAnalysisService: ChartWorkAnalysisService) { }

  ngOnInit() {
    this.getAllEmployees();
    this.getSprints();
  }

  getAllEmployees() {
    this.commonService.getAllEmployees().subscribe((result) => {
      this.employees = result;
      this.selectedTeam1 = this.employees.sort((a, b) => a.EmpName.localeCompare(b.EmpName)).slice(0, 4);
      this.selectedTeam2 = this.employees.sort((a, b) => a.EmpName.localeCompare(b.EmpName)).slice(4, this.employees.length);
    }, (error) => { console.log(error); },
      () => {

      });
  }

  getSprints() {
    this.commonService.getSprints().subscribe((result) => {
      this.sprints = result;
    }, (error) => {
      console.log(error);
    },
      () => {
        this.selectedSprints = this.sprints.sort((a, b) => Number(b.startDate) - Number(a.startDate)).slice(0, 3);
      });
  }

  AnalyzeWorkScope() {
    this.showAnalysis = true;
    this.getUserStoryAnalysis();
    this.getBugsAnalysis();
  }

  getUserStoryAnalysis() {
    let sprintUIDs = this.selectedSprints.map(x => x.sprintUID);
    let team1EmployeeIds = this.selectedTeam1.map(x => x.EmpId);
    let team2EmployeeIds = this.selectedTeam2.map(x => x.EmpId);

    this.workAnalysisService.getUserStoryAnalysis(sprintUIDs, team1EmployeeIds, team2EmployeeIds).subscribe((result) => {
      this.userStoryAnalysisResult = result;
    }, (error) => {
      console.log(error)
    },
      () => {
        this.plotChartUserStoryAnalysis();
      });
  }

  plotChartUserStoryAnalysis() {
    this.configureChartUserStoryAnalysis();

    let labels = this.userStoryAnalysisResult.map((x: { SprintNumber: string; }) => x.SprintNumber);
    let team1Data = this.userStoryAnalysisResult.map((x: { Team1: number; }) => x.Team1);
    let team2Data = this.userStoryAnalysisResult.map((x: { Team2: number; }) => x.Team2);

    let temp: any = this.chartUserStoryAnalysisData;
    temp.labels = labels;
    temp.datasets[0].data = team1Data;
    temp.datasets[1].data = team2Data;

    this.chartUserStoryAnalysisData = Object.assign({}, temp);
  }

  configureChartUserStoryAnalysis() {
    this.chartUserStoryAnalysisData = {
      labels: [],
      datasets: [
        {
          type: 'line',
          label: 'Team 1',
          backgroundColor: this.documentStyle.getPropertyValue('--orange-300'),
          borderColor: this.documentStyle.getPropertyValue('--orange-300'),
          data: []
        },
        {
          type: 'line',
          label: 'Team 2',
          backgroundColor: this.documentStyle.getPropertyValue('--green-300'),
          borderColor: this.documentStyle.getPropertyValue('--green-300'),
          data: []
        }
      ]
    };

    this.chartUserStoryOptions = {
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
            text: "User Story Points",
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
        }
      }
    };
  }

  getBugsAnalysis() {
    let sprintUIDs = this.selectedSprints.map(x => x.sprintUID);
    let team1EmployeeIds = this.selectedTeam1.map(x => x.EmpId);
    let team2EmployeeIds = this.selectedTeam2.map(x => x.EmpId);

    this.workAnalysisService.getBugsAnalysis(sprintUIDs, team1EmployeeIds, team2EmployeeIds).subscribe((result) => {
      this.bugsAnalysisResult = result;
      console.log(this.bugsAnalysisResult);
    }, (error) => {
      console.log(error)
    },
      () => {
        this.plotChartBugsAnalysis();
      });
  }

  plotChartBugsAnalysis() {
    this.configureChartBugsAnalysis();

    let labels = this.bugsAnalysisResult.map((x: { SprintNumber: string; }) => x.SprintNumber);
    let team1Data = this.bugsAnalysisResult.map((x: { Team1: number; }) => x.Team1);
    let team2Data = this.bugsAnalysisResult.map((x: { Team2: number; }) => x.Team2);

    let temp: any = this.chartBugsAnalysisData;
    temp.labels = labels;
    temp.datasets[0].data = team1Data;
    temp.datasets[1].data = team2Data;

    this.chartBugsAnalysisData = Object.assign({}, temp);
  }

  configureChartBugsAnalysis() {
    this.chartBugsAnalysisData = {
      labels: [],
      datasets: [
        {
          type: 'line',
          label: 'Team 1',
          backgroundColor: this.documentStyle.getPropertyValue('--orange-300'),
          borderColor: this.documentStyle.getPropertyValue('--orange-300'),
          data: []
        },
        {
          type: 'line',
          label: 'Team 2',
          backgroundColor: this.documentStyle.getPropertyValue('--green-300'),
          borderColor: this.documentStyle.getPropertyValue('--green-300'),
          data: []
        }
      ]
    };

    this.chartBugsAnalysisOptions = {
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
            text: "Bugs Count",
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
        }
      }
    };
  }
}

