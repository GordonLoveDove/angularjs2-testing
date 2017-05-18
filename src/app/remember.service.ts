import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class Remember {

  private searchEmpSource = new Subject<string>();
  private searchUnitSource = new Subject<string>();
  
  searchEmp$ = this.searchEmpSource.asObservable();
  searchUnit$ = this.searchUnitSource.asObservable();
  
  searchEmp(mission: string) {
    this.searchEmpSource.next(mission);
  }
  searchUnit(astronaut: string) {
    this.searchUnitSource.next(astronaut);
  }
}