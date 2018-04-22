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

	constructor(public navCtrl: NavController,
							public viewCtrl: ViewController,
							public alertCtrl: AlertController,
							private navParams: NavParams) {
		this.inputField = this.navParams.get('inputField');
		this.alertTitle = this.navParams.get('alertTitle');
		this.alertMsg = this.navParams.get('alertMsg');
		this.validInput = this.navParams.get('validInputCondition');
		this.userInput = 0;
	}

	pressButton(n: number) {
		this.userInput = this.userInput * 10 + n;
	}

	deleteButton() {
		this.userInput = Math.floor(this.userInput / 10);
	}

	clearButton() {
		this.userInput = 0;
	}

	OK() {
		if (this.validInput(this.userInput)) {
			this.viewCtrl.dismiss(this.userInput);
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