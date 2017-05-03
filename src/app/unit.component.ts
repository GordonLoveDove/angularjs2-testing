import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

import { Unit }                from './unit';
import { UnitService }         from './unit.service';
import { UnitSearchService }   from './unit-search.service';

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  providers: [ UnitSearchService ]
})
export class UnitComponent implements OnInit {
  units: Unit[];
  selectedUnit: Unit;
  addUnit: boolean = false;

  constructor(
    private unitService: UnitService,
	private unitSearchService: UnitSearchService,
    private router: Router) { }

  getUnits(): void {
    this.unitService
        .getUnits()
        .then(units => this.units = units);
  }
  
  onEdit(unit: Unit) {
  	unit.editable = true;
  }
  
  onSave(unit: Unit) {
  	unit.editable = false;
	this.edit(unit)
  }
  
  add(): void {
  	this.addUnit = true;
  }

  create(name: string,startDate: string): void {
    name = name.trim();
	startDate = startDate.trim();
    if (!name) { return; }
	if (!startDate) { return; }
    this.unitService.create(name,startDate)
      .then(unit => {
        this.units.push(unit);
        this.addUnit = false;
      });
  }
  
  edit(unit: Unit):void {
  	if (!unit.name) { return; }
	if (!unit.startDate) { return; }
	this.unitService.update(unit);
  }

  delete(unit: Unit): void {
    this.unitService
        .delete(unit.id)
        .then(() => {
          this.units = this.units.filter(h => h !== unit);
        });
  }
  
  search(term:string):void {
  	this.unitSearchService.search(term)
		.toPromise()
		.then(unit => {
        this.units=unit;
      });
  }

  ngOnInit(): void {
    this.getUnits();
  }
}