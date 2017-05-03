import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Employee }           from './employee';

@Injectable()
export class EmployeeSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Employee[]> {
    return this.http
               .get(`app/employees/?name=${term}`)
               .map(response => response.json().data as Employee[]);
  }
}
