import { Component, OnInit }   from '@angular/core';
import { Router,ActivatedRoute, Params }            from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Unit }                from './unit';
import { UnitService }         from './unit.service';
import { UnitSearchService }   from './unit-search.service';
import { Remember }     		   from './remember.service';

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  providers: [ UnitSearchService ]
})
export class UnitComponent implements OnInit {
  units: Unit[];
  selectedUnit: Unit;
  addUnit: boolean = false;
  unitName:string;

  constructor(
    private unitService: UnitService,
	private unitSearchService: UnitSearchService,
    private route: ActivatedRoute,
	private remember: Remember) { }

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
	this.remember.searchUnit(term);
  }

  ngOnInit(): void {
    const id = this.route.params.map(p => p.id)
	.subscribe(id => {
		if(id === '0'||!id){id=''}
		this.unitName = id;
		this.unitSearchService.search(id)
		.toPromise()
		.then(unit => {
        this.units=unit;
      });
	})
  }
}