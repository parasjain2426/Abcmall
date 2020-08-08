import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusispaceComponent } from './busispace/busispace.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MdashboardComponent } from './mdashboard/mdashboard.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { RevReportComponent } from './rev-report/rev-report.component';
import { ComReportComponent } from './com-report/com-report.component';
import { FgtpswrdComponent } from './fgtpswrd/fgtpswrd.component';
import { BusreportComponent } from './busreport/busreport.component';
import { UpcurspaceComponent } from './upcurspace/upcurspace.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'businessSpace',component:BusispaceComponent},
  {path:'SignUp/:businessSpace',component:UsersignupComponent},
  {path:'login',component:LoginComponent},
  {path:'login/dashboard/:Username',component:DashboardComponent},
  {path:'login/mdashboard/:Username',component:MdashboardComponent},
  {path:'requestServices/:Username',component:ComplaintComponent},
  {path:'revReport/:Username',component:RevReportComponent},
  {path:'comReport/:Username',component:ComReportComponent},
  {path:'fgtpswrd',component:FgtpswrdComponent},
  {path:'busreport/:Username',component:BusreportComponent},
  {path:'upcurspace/:BusinessSpace',component:UpcurspaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[HomeComponent,BusispaceComponent,UsersignupComponent,LoginComponent,DashboardComponent,MdashboardComponent,ComplaintComponent,RevReportComponent,ComReportComponent,FgtpswrdComponent,BusreportComponent,UpcurspaceComponent]
