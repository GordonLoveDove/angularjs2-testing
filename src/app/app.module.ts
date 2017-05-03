import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee.component';
import { UnitComponent } from './unit.component';
import { EmployeeService } from './employee.service';
import { UnitService } from './unit.service';

@NgModule({
  declarations: [
    AppComponent,
	EmployeeComponent,
	UnitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [
  	EmployeeService,
	UnitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
