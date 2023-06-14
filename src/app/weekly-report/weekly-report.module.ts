import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from "primeng/steps";
import { ToastModule } from "primeng/toast";
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToolbarModule, } from 'primeng/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ChartModule } from 'primeng/chart';
import { DatePipe } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './common/component/header/header.component';
import { LeftPanelComponent } from './common/component/left-panel/left-panel.component';
import { SummaryComponent } from './summary/summary.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActionItemComponent } from './action-item/action-item.component';
import { TeamComponent } from './team/team.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { WeeklyReportsComponent } from './weekly-reports.component';
import { WeeklyReportsRoutingModule } from './weekly-report-routing.module';
import { BarChartComponent } from './common/bar-chart/bar-chart.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftPanelComponent,
    SummaryComponent,
    PageNotFoundComponent,
    ActionItemComponent,
    TeamComponent,
    WeeklyReportComponent,
    WeeklyReportsComponent,
    ReportComponent,
    BarChartComponent    
  ],
  imports: [
    CommonModule,
     FormsModule,
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    StepsModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    TagModule,
    ToolbarModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    ChartModule,
    DatePipe,
    AutoCompleteModule,
    WeeklyReportsRoutingModule,
    RadioButtonModule
  ]
})
export class WeeklyReportModule { }
