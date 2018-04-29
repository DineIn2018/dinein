import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { ManagementPage} from '../management/management';
import { InputNumpad } from '../util/numpad';
import { Restaurant } from './management';

@IonicPage()
@Component({
	selector: 'page-update-management',
	templateUrl: 'update-management.html',
})

export class UpdateManagementPage {

	restaurant: Restaurant;
	phone: number;
	addrLine1: string;
	addrLine2: string;

	constructor(public navCtrl: NavController,
							public navParams: NavParams,
							public alertCtrl: AlertController,
							public modalCtrl: ModalController) {
		// this.managementPage = this.navParams.get('managementPage');
		this.restaurant = this.navParams.get('restaurant');
		this.phone = this.restaurant.phoneNumber;
		this.addrLine1 = this.restaurant.addrLine1;
		this.addrLine2 = this.restaurant.addrLine2;
	}

	submit() {
		this.restaurant.phoneNumber = this.phone;
		this.restaurant.addrLine1 = this.addrLine1;
		this.restaurant.addrLine2 = this.addrLine2;
		this.navCtrl.pop();
	}

	presentPhoneNumpad() {

		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Phone Number",
										alertTitle: "Invalid Phone Number",
										alertMsg: null,
										validInputCondition: function(input) { return input > 0; },
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				this.phone = returnedNum;
			}
		});
		numpadModal.present();
	}

	getPhoneStr(): string {
		if (this.phone) {
			let phoneStr = this.phone.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return this.phone.toString();
	}

	exit() {
		let confirm = this.alertCtrl.create({
			title: 'Exit without saving?',
			message: 'Are you sure you want to exit without saving your changes?',
			enableBackdropDismiss: false,
			buttons: [
				{
					text: 'Cancel',
					handler: () => { }
				},
				{
					text: 'Exit',
					handler: () => { this.navCtrl.pop(); }
				}
			]
		});
		confirm.present();
	}
}
