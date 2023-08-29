import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EditTeamMemberComponent } from './edit-team-member/edit-team-member.component';
import { ViewTeamMemberComponent } from './view-team-member/view-team-member.component';
import { TeamMemberDetailsComponent } from './team-member-details/team-member-details/team-member-details.component';
import { AddTeamDetailsComponent } from './add-team-details/add-team-details.component';
import { EditTeamDetailsComponent } from './edit-team-details/edit-team-details.component';
import { ViewTeamDetailsComponent } from './view-team-details/view-team-details.component';
import { NgPrimeComponent } from './ngPrime/ngPrime.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartTaskByStateComponent } from './devops-matrix/chart-task-by-state/chart-task-by-state.component';
import { ChartWorkItemByStateComponent } from './devops-matrix/chart-work-item-by-state/chart-work-item-by-state.component';
import { DevopsMatrixComponent } from './devops-matrix/devops-matrix.component';
import { GraphImplementationComponent } from './graph-implementation/graph-implementation.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { Role } from './models/role.enum';
// import { HomePageComponent } from './home-page/home-page.component';





const routes: Routes = [
  { path: 'TeamDetails', component: TeamDetailsComponent, canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User, Role.Superuser]  }},
  { path: 'TeamMember', component: TeamMemberComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'Employee', component: EmployeeViewComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'AddEmployee', component: EmployeeAddComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'UpdateEmployee', component: UpdateEmployeeComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'EditTeamMember/:Id', component: EditTeamMemberComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'TeamMemberDetails', component: TeamMemberDetailsComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'ViewTeamMember/:Id', component: ViewTeamMemberComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'AddTeamDetails', component: AddTeamDetailsComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'EditTeamDetails/:Id', component: EditTeamDetailsComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'ViewTeamDetails/:Id', component: ViewTeamDetailsComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'ngprime', component: NgPrimeComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  } },
  { path: 'login', component: LoginComponent },
  {path:'Chartdetails',component:GraphImplementationComponent, canActivate: [AuthGuard],
  data: { roles: [Role.Admin, Role.User, Role.Superuser]  }},


  // {
  //   path: 'devops-matrix', component: DevopsMatrixComponent, children: [
  //     { path: 'chart-work-items-by-state', component: ChartWorkItemByStateComponent },
  //     { path: 'chart-task-status', component: ChartTaskByStateComponent }
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
