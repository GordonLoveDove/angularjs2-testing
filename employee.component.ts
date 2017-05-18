import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }            from '@angular/router';

import 'rxjs/add/operator/map';

import { Employee }                from './employee';
import { EmployeeService }         from './employee.service';
import { EmployeeSearchService }   from './employee-search.service';
import { Remember }     		   from './remember.service';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  providers: [ EmployeeSearchService ]
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  selectedEmployee: Employee;
  addEmployee: boolean = false;
  employeeName:string;

  constructor(
    private employeeService: EmployeeService,
	private employeeSearchService: EmployeeSearchService,
	private route: ActivatedRoute,
	private remember: Remember) { }

  getEmployees(): void {
    this.employeeService
        .getEmployees()
        .then(employees => this.employees = employees);
  }
  
  onEdit(employee: Employee) {
  	employee.editable = true;
  }
  
  onSave(employee: Employee) {
  	employee.editable = false;
	this.edit(employee)
  }
  
  add(): void {
  	this.addEmployee = true;
  }

  create(name: string,joinDate: string): void {
    name = name.trim();
	joinDate = joinDate.trim();
    if (!name) { return; }
	if (!joinDate) { return; }
    this.employeeService.create(name,joinDate)
      .then(employee => {
        this.employees.push(employee);
		this.addEmployee = false;
      });
  }
  
  edit(employee: Employee):void {
  	if (!employee.name) { return; }
	if (!employee.joinDate) { return; }
	this.employeeService.update(employee);
  }

  delete(employee: Employee): void {
    this.employeeService
        .delete(employee.id)
        .then(() => {
          this.employees = this.employees.filter(h => h !== employee);
        });
  }
  
  search(term:string):void {
  	this.employeeSearchService.search(term)
		.toPromise()
		.then(employee => {
        this.employees=employee;
      });
	this.remember.searchEmp(term);
  }

  ngOnInit(): void {
    /*this.route.params
    .switchMap((params: Params) => this.employeeSearchService.search(this.employeeName = params['id']))
    .subscribe(employee => {
		console.log(employee);
        this.employees=employee;});*/
	//console.log(this.route.snapshot.queryParams);
	const id = this.route.queryParams.map((params: Params) => params['id'])
	.subscribe(id => {
		console.log(id);
		if(id === '0'||!id){id=''}
		this.employeeName = id;
		this.employeeSearchService.search(id)
		.toPromise()
		.then(employee => {
        this.employees=employee;
      });
	})
  }
}