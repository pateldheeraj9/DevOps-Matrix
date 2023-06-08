import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevopsMatrixComponent } from './devops-matrix.component';
import { ChartWorkItemByStateComponent } from './chart-work-item-by-state/chart-work-item-by-state.component';
import { ChartTaskByStateComponent } from './chart-task-by-state/chart-task-by-state.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppRoutingModule } from '../app-routing.module';
//import { NavMenuSideBarComponent } from './navmenu-sidebar/navmenu-sidebar.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DevOpsMatrixRoutingModule } from './devops-matrix-routing.module';
import { NavMenuSideBarComponent } from './navmenu-sidebar/navmenu-sidebar.component';
import { PerformanceServiceService } from './performance-service.service';
import { getBaseUrl } from 'src/main';

const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'upload-sprint-data', component: UploadSprintDataComponent },
  { path: 'chart-work-items-by-state', component: ChartWorkItemByStateComponent },
  // { path: 'chart-individual-performance', component: ChartIndividualPerformanceComponent },
  // { path: 'chart-sprint-performance', component: ChartSprintPerformanceComponent },
  // { path: 'chart-work-status', component: ChartWorkStatusComponent },
  // { path: 'chart-team-performance', component: ChartTeamPerformanceComponent },
  // { path: 'chart-velocity', component: ChartVelocityComponent },
  { path: 'chart-task-status', component: ChartTaskByStateComponent },
  // { path: 'chart-work-analysis', component: ChartWorkScopeAnalysisComponent },
  // { path: 'sprint-details', component: SprintDetailsComponent },
  // { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    DevopsMatrixComponent,
    ChartWorkItemByStateComponent,
    ChartTaskByStateComponent,
    PageHeaderComponent,
    NavMenuSideBarComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    DevOpsMatrixRoutingModule
  ],
  providers: [PerformanceServiceService,{ provide: 'BASE_URL', useFactory: getBaseUrl }]
})
export class DevopsMatrixModule { }
