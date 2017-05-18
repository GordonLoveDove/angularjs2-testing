import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { UnitComponent } from './unit.component';

const routes: Routes = [
  { path: 'employee',  component: EmployeeComponent },
  { path: 'unit', component: UnitComponent },
  { path: '', redirectTo: '/employee?id=', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}