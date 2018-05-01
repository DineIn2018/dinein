import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { UpdateManagementPage } from  './update-management';
import { DataService } from '../util/data-service';
import { InputNumpad } from '../util/numpad';

import { Restaurant, Table, Party, Employee, EmployeeShift } from '../util/classes';

@Component({
	selector: 'page-management',
	templateUrl: 'management.html'
})
export class ManagementPage {

	restaurant: Restaurant;

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public alertCtrl: AlertController,
							public data: DataService) {
		this.restaurant = this.data.getRestaurant();
	}

	executeLogout() {
		let alert = this.alertCtrl.create({
			title: "Are you sure you want to logout?",
			enableBackdropDismiss: false,
			buttons: [
				{
					text: "Logout",
					handler: () => { this.navCtrl.parent.parent.pop(this); }
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => { }
				}
			]
		});
		alert.present();
	}

	onEditInfoPress() {
		var pin = this.restaurant.managerPin;
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Enter PIN",
										alertTitle: "Invalid PIN",
										alertMsg: null,
										validInputCondition: function(input) {
											return input == pin;
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if ((returnedNum == this.restaurant.managerPin) && (returnedNum != null)) {
				this.navCtrl.push(UpdateManagementPage, {restaurant: this.restaurant});
			}
		});
		numpadModal.present();
	}

}
