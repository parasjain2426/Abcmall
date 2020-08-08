import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAbcService } from './get-abc.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FgtpswrdComponent } from './fgtpswrd/fgtpswrd.component';
import { BusreportComponent } from './busreport/busreport.component';
import { UpcurspaceComponent } from './upcurspace/upcurspace.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DateTimePickerModule
  ],
  providers: [GetAbcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
