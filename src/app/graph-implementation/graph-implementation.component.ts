import { Component, OnInit } from '@angular/core';
import { GraphService } from '../Service/Graph/graph.service';



@Component({
  selector: 'app-graph-implementation',
  templateUrl: './graph-implementation.component.html',
  styleUrls: ['./graph-implementation.component.css']
})
export class GraphImplementationComponent implements OnInit {

    constructor(private httpProvider: GraphService) {    }
    ngOnInit(): void {
       this.getdetails();
    }
    labelsdata:any=[];
    datasetdata:any=[]
  
  basicData = {
      labels: this.labelsdata,
      datasets: [
          {
              label: 'Team',
              backgroundColor:['#9bc2e6', '#f4b084', '#ffd966', '#c6e0b4', '#66d9ff', '#66ffb3', '#ED7D31', '#ff668c', '#ffd966', '#ff6666', '#8c66ff', '#66ff8c', '#b366ff', '#d966ff'],
              data: this.datasetdata
          }
      ]
  };

  StackedOptions = {
      indexAxis: 'x',
      plugins: {
          legend: {
              labels: {
                  color: '#black'
              }
          }
      },
      scales: {
          x: {
              stacked: true,
              ticks: {
                  color: '#black'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              stacked: true,
              ticks: {
                  color: '#black'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
  };

  data = {
    labels: this.labelsdata,
    datasets: [
        {
            data: this.datasetdata,
            backgroundColor:['#9bc2e6', '#f4b084', '#ffd966', '#c6e0b4', '#66d9ff', '#66ffb3', '#ED7D31', '#ff668c', '#ffd966', '#ff6666', '#8c66ff', '#66ff8c', '#b366ff', '#d966ff'],

        }
    ]
};

chartOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#F0B27A'
            }
        }
    }
}






async getdetails() {
    this.httpProvider.getTdBarChart().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;

          console.log(resultData);

          if (resultData) {
                for(let i=0;i<resultData.length;i++)
                {
                    console.log(resultData);
                    this.labelsdata.push(resultData[i].name);
                    this.datasetdata.push(resultData[i].totalSize);
                    
                }
          }
        }
      },

      (error: any) => {
        if (error) {
          console.log(error);

          if (error.status == 404) {
            if (error.error && error.error.message) {
             
            }
          }
        }
      }
    );
  }





}


