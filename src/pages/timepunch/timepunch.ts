import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Employee } from '../employees/employees';
import { EmployeeShift } from '../punchcard/punchcard';
import { DateTimeService } from '../util/date-time';

@Component({
	selector: 'page-timepunch',
	templateUrl: 'timepunch.html',
})
export class TimePunchPage {

	private currDateTime = new Date();
	private subscription;

	ID:number = 0;

	constructor(public navCtrl: NavController,
							public alertCtrl: AlertController,
							private datetime: DateTimeService) {

		var source = Observable.interval(1000); // 1 second subscription
		this.subscription = source.subscribe(() => {this.currDateTime = new Date()});

	}

	pressButton(n: number) {
		this.ID = this.ID * 10 + n;
	}

	deleteButton() {
		this.ID = Math.floor(this.ID / 10);;
	}

	clearButton() {
		this.ID = 0;
	}

	submit() {
		var punchTime: string = this.datetime.getFullDateTime();
		if (this.validID()) {
			let alert = this.alertCtrl.create({
				title: 'Punch for Employee ID: ' + this.ID + ' at ' + punchTime + '?',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
						}
					},
					{
						text: 'Confirm',
						handler: () => {
							if (this.isCurrentlyWorking(this.ID)) {
								this.punchOut();
							} else {
								this.punchIn();
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
		// TODO: Change to check for ID in database
		return this.ID > 0;
	}

	isCurrentlyWorking(ID: number): boolean {
		// TODO: check database to see if employee is working or not
		return true;
	}

	punchIn() {
		// Instantiate shift object with only shift start time, no shift end time
		// Mark new shift as incompleted/in progress
		// Set employee status to "Currently working"
		// Add the shift object to the employee
	}

	punchOut() {
		// Add shift end time to the latest shift object
		// Mark shift as completed
		// Set employee to not be currently working

		console.log('Successfully punched for employee: ' + this.ID);
	}
}

