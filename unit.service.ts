import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Unit } from './unit';

@Injectable()
export class UnitService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private unitsUrl = 'api/units';

  constructor(private http: Http) { }

  getUnits(): Promise<Unit[]> {
    return this.http.get(this.unitsUrl)
               .toPromise()
               .then(response => response.json().data as Unit[])
               .catch(this.handleError);
  }


  getUnit(id: number): Promise<Unit> {
    const url = `${this.unitsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Unit)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.unitsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string,startDate: string): Promise<Unit> {
    return this.http
      .post(this.unitsUrl, JSON.stringify({name: name,startDate: startDate}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Unit)
      .catch(this.handleError);
  }

  update(unit: Unit): Promise<Unit> {
    const url = `${this.unitsUrl}/${unit.id}`;
    return this.http
      .put(url, JSON.stringify(unit), {headers: this.headers})
      .toPromise()
      .then(() => unit)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}