import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartTaskByStateComponent } from './chart-task-by-state/chart-task-by-state.component';
import { ChartWorkItemByStateComponent } from './chart-work-item-by-state/chart-work-item-by-state.component';
import { DevopsMatrixComponent } from './devops-matrix.component';

const routes: Routes = [
    {
      path: 'devops-matrix', component: DevopsMatrixComponent, children: [
        { path: 'chart-work-items-by-state', component: ChartWorkItemByStateComponent },
        { path: 'chart-task-status', component: ChartTaskByStateComponent }
      ]
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DevOpsMatrixRoutingModule { }