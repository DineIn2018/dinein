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

	presentPunchConfirmation() {
		let alert = this.alertCtrl.create({
			title: 'Confirm purchase',
			message: 'Do you want to buy this book?',
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
						this.punch(this.ID)
					}
				}
			]
		});
		alert.present();
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

	punch(ID: number) {
		if (this.validID(ID)) {
			var time: any = new Date();
			console.log('Punched time for Employee: ' + ID + ' at ' + time);
			this.ID = 0;
		}
	}

	validID(ID: number) {
		return ID > 0;
	}
}
