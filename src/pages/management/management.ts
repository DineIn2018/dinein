import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateManagementPage } from  './update-management';
import { Employee } from '../employees/employees';
import { Table } from '../tables/tables';
//import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'page-management',
	templateUrl: 'management.html'
})
export class ManagementPage {

	restaurant: Restaurant;

	constructor(public navCtrl: NavController) {
		let owner = new Employee("Michael", "Fassbender", "Owner", 100000.01,
															2024561111, "../assets/imgs/mikefass.jpg", 1);
    this.restaurant = new Restaurant("Osteria Francescana", 6088060806, owner,
			"168 World's End St.", "Nowhere, NO, 99999");

    this.restaurant.employees.push(new Employee("Anna", "Schmidt", "Manager",
    	50.00, 6086076006, "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg", 2));
	}

	executeLogout() {
		this.navCtrl.parent.parent.pop(this);
	}

	onEditInfoPress() {
		this.navCtrl.push(UpdateManagementPage, {restaurant: this.restaurant});
	}

}

export class Restaurant {

	name: string;
	addrLine1: string;
	addrLine2: string;

	capacity: number;
	phoneNumber: number;
	totalEmployees: number;
	tables: Table[];

	employees: Employee[];

	constructor(name: string, phoneNumber: number, owner: Employee,
							addrLine1: string, addrLine2: string) {
		this.name = name;
		this.addrLine1 = addrLine1;
		this.addrLine2 = addrLine2;
		this.phoneNumber = phoneNumber;

		this.tables = [];
		this.employees = [];
		this.employees.push(owner);
	}

	getPhoneStr(): string {
		if (this.phoneNumber) {
			let phoneStr = this.phoneNumber.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return this.phoneNumber.toString();
	}

	getOwner(): Employee {
		var i;
		for (i = 0; i < this.employees.length; i++) {
			if (this.employees[i].ID == 1) {
				return this.employees[i];
			}
		}
	}
	getManager(): Employee {
		var i;
		for (i = 0; i < this.employees.length; i++) {
			if (this.employees[i].ID == 2) {
				return this.employees[i];
			}
		}
	}

	getNumEmployees(): number {
		return this.employees.length;
	}
	getNumTables(): number {
		return this.tables.length;
	}
	getCapacity(): number {
		if (this.tables.length == 0) {
			return 0;
		} else {
			var i = 0;
			for (i = 0; i < this.tables.length; i++) {
				i += this.tables[i].capacity;
			}
		}
	}
}
