import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Employee } from '../employees/employees';
import { DateTimeService } from '../util/date-time';

@Component({
	selector: 'page-timepunch',
	templateUrl: 'timepunch.html',
})
export class TimePunchPage {

	private currDateTime = new Date();
	private subscription;

	ID:number = 0;
	employeeToPunch: Employee;

	constructor(public navCtrl: NavController,
							public alertCtrl: AlertController,
							private dateTime: DateTimeService) {

		var source = Observable.interval(1000); // 1 second subscription
		this.subscription = source.subscribe(() => {this.currDateTime = new Date()});
		this.employeeToPunch = null;

	}

	submit() {

		if (this.validID()) {
			let currTime = this.dateTime.getDateTime();
			//let employee: Employee = this.getEmployeeByID();

			let alert = this.alertCtrl.create({
				title: 'Punch for Employee ID: ' + this.ID + ' at ' + currTime + '?',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => { }
					},
					{
						text: 'Confirm',
						handler: () => {
							/*if (employee.isCurrentlyWorking()) {
								employee.punchOut(currTime);
							} else {
								employee.punchIn(currTime);
							}*/
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
		// TODO: Change to check for ID in database
		return this.ID > 0;
	}

	getEmployeeByID() {
		return null;
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
