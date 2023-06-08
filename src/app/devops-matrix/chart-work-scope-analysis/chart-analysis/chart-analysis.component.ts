import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-analysis',
  templateUrl: './chart-analysis.component.html',
  styleUrls: []
})
export class ChartAnalysisComponent {
  @Input() Title:string = "";
  @Input() ChartData:any = {};
  @Input() ChartOptions:any = {};
  @Input() XAxisText:string = "";
  @Input() YAxisText:string = "";

  documentStyle: any = getComputedStyle(document.documentElement);
  textColor: any = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary: any = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder: any = this.documentStyle.getPropertyValue('--surface-border');

  constructor() { }

  configureChartUserStoryAnalysis() {
    this.ChartData = {
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

    this.ChartOptions = {
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
            text: this.XAxisText,
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
            text: this.YAxisText,
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

