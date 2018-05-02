import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Restaurant, Table, Party, Employee, EmployeeShift } from '../util/classes';
import { DateTimeService } from '../util/date-time';

import { DataService } from '../util/data-service';

import { ShiftObject } from '../../DBAssets/DBObjects';
import { DbHelperProvider } from '../../providers/dbhelper/dbhelper';

@Component({
	selector: 'page-timepunch',
	templateUrl: 'timepunch.html',
	providers: [ DbHelperProvider ]
})
export class TimePunchPage {

	private currDateTime = new Date();
	private subscription;

	ID: number = 0;
	employeeToPunch: Employee;
	employees: Employee[];

	constructor(public navCtrl: NavController,
							public alertCtrl: AlertController,
							private dateTime: DateTimeService,
							public data: DataService,
						  public DBHelper: DbHelperProvider) {

		var source = Observable.interval(1000); // 1 second subscription
		this.subscription = source.subscribe(() => {this.currDateTime = new Date()});

		let restaurant = this.data.getRestaurant();
		this.employees = restaurant.employees;
		this.employeeToPunch = null;

	}

	submit() {

		if (this.validID()) {
			let currTime = this.dateTime.getDateTime();
			let employee = this.getEmployeeByID();

			let alert = this.alertCtrl.create({
				title: 'Punch for ' + employee.getFullName() + ' at ' + currTime + '?',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => { }
					},
					{
						text: 'Confirm',
						handler: () => {
							if (employee.isCurrentlyWorking()) {
								employee.punchOut(currTime);
							} else {
								let newShift = new ShiftObject();
								newShift.name = employee.getFullName();
								newShift.startTime = currTime;
								this.DBHelper.addShift(newShift);

								employee.punchIn(currTime);
							}
							this.ID = 0;
						}
					}
				]
			});
			alert.present();

		} else {
			let alert = this.alertCtrl.create({
				title: 'Invalid Employee ID',
				buttons: [
					{
						text: 'Dismiss',
						role: 'cancel',
						handler: () => { }
					}
				]
			});
			alert.present();
		}
	}

	validID() {
		var i;
		for (i = 0; i < this.employees.length; i++) {
			if (this.ID == this.employees[i].ID) {
				return true;
			}
		}
		return false;
	}

	getEmployeeByID() {
		var i;
		for (i = 0; i < this.employees.length; i++) {
			if (this.ID == this.employees[i].ID) {
				return this.employees[i];
			}
		}
	}

	pressButton(n: number) {
		if (this.ID < 1000) {
			this.ID = this.ID * 10 + n;
		}
	}

	deleteButton() {
		this.ID = Math.floor(this.ID / 10);;
	}

	clearButton() {
		this.ID = 0;
	}

	getIDStr() {
		if (this.ID < 10) {
			return '000' + this.ID;
		}
		if (this.ID < 100) {
			return '00' + this.ID;
		}
		if (this.ID < 1000) {
			return '0' + this.ID;
		}
		return this.ID.toString();
	}
}
