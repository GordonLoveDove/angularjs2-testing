import { Component }          from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    	<div class="tab-bar">
        	<a class="tab" [class.cur]="isCur" routerLink="/employee" routerLinkActive="active" (click)="cur()">Employee</a>
            <a class="tab" [class.cur]="!isCur" routerLink="/unit" routerLinkActive="active" (click)="cur()">Unit</a>
        </div>
        <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCur = true;
  cur() {
  	this.isCur=!this.isCur;
  }
}
