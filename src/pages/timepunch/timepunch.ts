import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Component({
	selector: 'page-timepunch',
	templateUrl: 'timepunch.html',
})
export class TimePunchPage {

	private currDateTime = new Date();
	private subscription;

	ID:number = 0;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

		var source = Observable.interval(1000); // 1 second subscription
		this.subscription = source.subscribe((x) => this.currDateTime = new Date());

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
		if (this.validID(this.ID)) {
			let alert = this.alertCtrl.create({
				title: 'Punch for Employee ID: ' + this.ID + '?',
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
							console.log('Punched time for Employee: ' + this.ID + ' at ' + this.currDateTime);
							this.submitPunch();
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

	submitPunch() {
		console.log('Successfully punched for employee: ' + this.ID);
		this.ID = 0;
	}
}
