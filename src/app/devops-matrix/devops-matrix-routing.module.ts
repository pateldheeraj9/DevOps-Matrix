import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartIndividualPerformanceComponent } from './chart-individual-performance/chart-individual-performance.component';
import { ChartSprintPerformanceComponent } from './chart-sprint-performance/chart-sprint-performance.component';
import { ChartTaskByStateComponent } from './chart-task-by-state/chart-task-by-state.component';
import { ChartTeamPerformanceComponent } from './chart-team-performance/chart-team-performance.component';
import { ChartVelocityComponent } from './chart-velocity/chart-velocity.component';
import { ChartWorkItemByStateComponent } from './chart-work-item-by-state/chart-work-item-by-state.component';
import { ChartWorkScopeAnalysisComponent } from './chart-work-scope-analysis/chart-work-scope-analysis.component';
import { ChartWorkStatusComponent } from './chart-work-status/chart-work-status.component';
import { DevopsMatrixComponent } from './devops-matrix.component';
import { HomeComponent } from './home/home.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { UploadSprintDataComponent } from './upload-sprint-data/upload-sprint-data.component';

const routes: Routes = [
  {
    path: 'devops-matrix', component: DevopsMatrixComponent, children: [
      { path: 'chart-work-items-by-state', component: ChartWorkItemByStateComponent },
      { path: 'chart-task-status', component: ChartTaskByStateComponent },
      { path: 'chart-individual-performance', component: ChartIndividualPerformanceComponent },
      { path: 'chart-sprint-performance', component: ChartSprintPerformanceComponent },
      { path: 'home', component: HomeComponent },
      { path: 'chart-work-status', component: ChartWorkStatusComponent },
      { path: 'chart-team-performance', component: ChartTeamPerformanceComponent },
      { path: 'chart-velocity', component: ChartVelocityComponent },  
      { path: 'upload-sprint-data', component: UploadSprintDataComponent },
      { path: 'chart-work-analysis', component: ChartWorkScopeAnalysisComponent },
      { path: 'sprint-details', component: SprintDetailsComponent },
      { path: '**', component: HomeComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevOpsMatrixRoutingModule { }