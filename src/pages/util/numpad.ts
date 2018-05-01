import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
	selector: 'modal-numpad',
	templateUrl: 'numpad.html'
})
export class InputNumpad {

	userInput: number;
	inputField: string;

	alertMsg: string;
	alertTitle: string;
	validInput: any;

	secondaryAlertMsg: string;
	secondaryAlertTitle: string;
	secondaryAlertButton: string;
	secondaryValidInput: any;

	secondaryCondition: boolean;

	constructor(public navCtrl: NavController,
							public viewCtrl: ViewController,
							public alertCtrl: AlertController,
							private navParams: NavParams) {
		this.inputField = this.navParams.get('inputField');

		this.alertTitle = this.navParams.get('alertTitle');
		this.alertMsg = this.navParams.get('alertMsg');
		this.validInput = this.navParams.get('validInputCondition');

		this.secondaryValidInput = this.navParams.get('secondaryValidInputCondition');
		this.secondaryCondition = (this.secondaryValidInput != null);

		if (this.secondaryCondition) {
			this.secondaryAlertTitle = this.navParams.get('secondaryAlertTitle');
			this.secondaryAlertMsg = this.navParams.get('secondaryAlertMsg');
			this.secondaryAlertButton = this.navParams.get('secondaryAlertButton');
		}

		this.userInput = 0;
	}

	pressButton(n: number) {
		if (this.userInput < 1000000000) {
			this.userInput = this.userInput * 10 + n;
		}
	}

	deleteButton() {
		this.userInput = Math.floor(this.userInput / 10);
	}

	clearButton() {
		this.userInput = 0;
	}

	OK() {
		if (this.validInput(this.userInput)) {

			if(this.secondaryCondition) {
				if(this.secondaryValidInput(this.userInput)) {
					this.viewCtrl.dismiss(this.userInput);
				} else {
					let alert = this.alertCtrl.create({
						title: this.secondaryAlertTitle,
						message: this.secondaryAlertMsg,
						enableBackdropDismiss: false,
						buttons: [
							{
								text: 'Cancel',
								handler: () => { this.clearButton(); }
							},
							{
								text: this.secondaryAlertButton,
								handler: () => { this.viewCtrl.dismiss(this.userInput) }
							}
						]
					});
					alert.present();
				}
			} else {
				this.viewCtrl.dismiss(this.userInput);
			}

		} else {
			let alert = this.alertCtrl.create({
				title: this.alertTitle,
				message: this.alertMsg,
				enableBackdropDismiss: false,
				buttons: [
					{
						text: 'OK',
						handler: () => { }
					}
				]
			});
			alert.present();
		}
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}
}