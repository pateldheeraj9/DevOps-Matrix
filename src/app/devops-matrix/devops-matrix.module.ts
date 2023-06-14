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
import { DataExportComponent } from './data-export/data-export.component';
import { ChartIndividualPerformanceComponent } from './chart-individual-performance/chart-individual-performance.component';
import { ChartSprintPerformanceComponent } from './chart-sprint-performance/chart-sprint-performance.component';
import { ChartTeamPerformanceComponent } from './chart-team-performance/chart-team-performance.component';
import { ChartVelocityComponent } from './chart-velocity/chart-velocity.component';
import { ChartWorkScopeAnalysisComponent } from './chart-work-scope-analysis/chart-work-scope-analysis.component';
import { ChartAnalysisComponent } from './chart-work-scope-analysis/chart-analysis/chart-analysis.component';
import { DataAnalysisComponent } from './chart-work-scope-analysis/data-analysis/data-analysis.component';
import { ChartWorkStatusComponent } from './chart-work-status/chart-work-status.component';
import { HomeComponent } from './home/home.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { UploadSprintDataComponent } from './upload-sprint-data/upload-sprint-data.component';
import { HomeSprintItemsByStatusComponent } from './home-sprint-items-by-status/home-sprint-items-by-status.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'upload-sprint-data', component: UploadSprintDataComponent },
  // { path: 'chart-work-items-by-state', component: ChartWorkItemByStateComponent },
  // { path: 'chart-individual-performance', component: ChartIndividualPerformanceComponent },
  // { path: 'chart-sprint-performance', component: ChartSprintPerformanceComponent },
  // { path: 'chart-work-status', component: ChartWorkStatusComponent },
  // { path: 'chart-team-performance', component: ChartTeamPerformanceComponent },
  // { path: 'chart-velocity', component: ChartVelocityComponent },
  // { path: 'chart-task-status', component: ChartTaskByStateComponent },
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
    NavMenuSideBarComponent,
    ChartSprintPerformanceComponent,
    ChartIndividualPerformanceComponent,
    DataExportComponent,
    ChartTeamPerformanceComponent,
    ChartVelocityComponent,
    ChartWorkScopeAnalysisComponent,
    ChartAnalysisComponent,
    DataAnalysisComponent,
    ChartWorkStatusComponent,
    HomeComponent,
    SprintDetailsComponent,
    UploadSprintDataComponent,
    HomeSprintItemsByStatusComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule, 
    FileUploadModule,
    CalendarModule,
    ChartModule,
    MessagesModule,
    TableModule,
    MenuModule,
    TabViewModule,
    RadioButtonModule,
    TabMenuModule,
    CardModule,
    DevOpsMatrixRoutingModule
  ],
  providers: [PerformanceServiceService, { provide: 'BASE_URL', useFactory: getBaseUrl }]
})
export class DevopsMatrixModule { }
