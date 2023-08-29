import { Component,OnDestroy,OnInit} from '@angular/core';
import { DashboardService } from "../Service/dashboard/dashboard.service";
import { TeamDetailService } from "../Service/teamdetails/team-detail.service";
import { Subscription } from 'rxjs';
import { LayoutService } from '../Service/layout.service';
import { Title } from 'chart.js';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
 
})
export class DashboardComponent implements OnInit, OnDestroy{

  tableData: any = [];
  teamData: any = [];
  teamMembersData: any = [];
  colors:string[]=['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff'];
  barData: any;
  barOptions: any;
  barChartLabel:any=[];
  barChartData:any=[];
  subscription: Subscription;
 

  constructor(private dashboardService: DashboardService,private teamdetailService:TeamDetailService,public layoutService: LayoutService) 
  {
    this.subscription = this.layoutService.configUpdate$.subscribe(config => {
      this.initCharts();
  });
  }
 
  ngOnInit() {
    this.getAllCount();
    this.getTeamDetails();
    this.getMembersBasedOnSkills();
    setTimeout(() => {
    this.getBarChartLabel();
    }, 1000);
    setTimeout(() => {
    this.initCharts();
    },1000);
  }
  

  async getAllCount() {
      this.dashboardService.getAllCount().subscribe(
        (data: any) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            console.log(resultData);
  
            if (resultData) {
              this.tableData = resultData;
             }
          }
        },
  
        (error: any) => {
          if (error) {
            console.log(error);
  
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.tableData = [];
              }
            }
          }
        }
      );
    }

  async getTeamDetails() {
      this.teamdetailService.getAllDetails().subscribe(
        (data: any) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
  
            console.log(resultData);
  
            if (resultData) {
              this.teamData = resultData;
               console.log(this.teamMembersData)

            }
          }
        },
  
        (error: any) => {
          if (error) {
            console.log(error);
  
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.teamData = [];
              }
            }
          }
        }
      );
    }
    async getMembersBasedOnSkills() {
      this.dashboardService.getMembersBasedOnSkills().subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          console.log("ddd" + data);
          if (resultData) {
            this.teamMembersData = resultData;
          }
        }
      },
        (error: any) => {
          if (error) {
            console.log(error)
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.teamMembersData = [];
              }
            }
          }
        });
    }
    getRandomColor():string{
      var randomIndex=Math.floor(Math.random()*this.colors.length);
      return this.colors[randomIndex];
    }
    getBarChartLabel(){
      for(let data of this.teamMembersData) {
        this.barChartLabel.push(data.techStack);
        this.barChartData.push(data.count);
         }
    }
    
    initCharts() {
     
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
      this.barData = {
        
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          labels: this.barChartLabel,
       

          datasets: [
              {
                  label: 'Member Count',
                  backgroundColor:['#9bc2e6', '#f4b084', '#ffd966', '#c6e0b4', '#66d9ff', '#66ffb3', '#ED7D31', '#ff668c', '#ffd966', '#ff6666', '#8c66ff', '#66ff8c', '#b366ff', '#d966ff'],
                  // borderColor: documentStyle.getPropertyValue('--purple-700'),
                  data: this.barChartData
              }
          
            
          ]
      };

      this.barOptions = {
        aspectRatio:1.20,
          plugins: {
              legend: {   
                  display:false
              }
            
          },
          scales: {
              x: {
                 title:{
                    display:true,
                    text:'Skills',
                    font:{
                      size:16,      
                    },
                    color: textColor
                 },
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                        
                      }
                  },
                  grid: {
                      display: false,
                      drawBorder: false
                  },
                
              },
              y: {
                title:{
                  display:true,
                  text:'Member Count',
                  font:{
                    size:16
                  },
                  color:textColor
               },
                  ticks: {
                      color: textColorSecondary
                   
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false,

                  },
                 
              },
          }
      };

   
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
  
  }


  

