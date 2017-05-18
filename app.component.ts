import { Component }          from '@angular/core';

import { Remember }     from './remember.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    	<div class="tab-bar">
        	<a class="tab" [routerLink]="['employee']" [queryParams]="{id: empSearchName}" routerLinkActive="cur">Employee</a>
            <a class="tab" [routerLink]="['unit']" [queryParams]="{id: unitSearchName}" routerLinkActive="cur" >Unit</a>
        </div>
        <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	empSearchName : string = '';
	unitSearchName : string = '';

	constructor(private remember: Remember) {
		remember.searchEmp$.subscribe(
		  name => {
			this.empSearchName = name;
		});
		
		remember.searchUnit$.subscribe(
		  name => {
			this.unitSearchName = name;
		});
	}
	
}
