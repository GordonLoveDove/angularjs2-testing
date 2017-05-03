import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		let units = [
			{id:1, name:'unit1', startDate:'2017-04-02', editable: false},
			{id:2, name:'unit2', startDate:'2017-04-05', editable: false},
			{id:3, name:'unit3', startDate:'2017-04-07', editable: false},
			{id:4, name:'unit4', startDate:'2017-04-09', editable: false}
		];
		let employees = [
			{id:1, name:'Tommy', joinDate:'2017-04-02', editable: false},
			{id:2, name:'Lee', joinDate:'2017-04-05', editable: false},
			{id:3, name:'Jones', joinDate:'2017-04-07', editable: false}
		];
		return {units,employees};
	}
}