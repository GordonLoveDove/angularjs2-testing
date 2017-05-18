import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Unit }           from './unit';

@Injectable()
export class UnitSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Unit[]> {
    return this.http
               .get(`app/units/?name=${term}`)
               .map(response => response.json().data as Unit[]);
  }
}
