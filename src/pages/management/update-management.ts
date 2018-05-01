import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { ManagementPage} from '../management/management';
import { InputNumpad } from '../util/numpad';
import { Restaurant } from '../util/classes';
import { DataService } from '../util/data-service';

@IonicPage()
@Component({
	selector: 'page-update-management',
	templateUrl: 'update-management.html',
})

export class UpdateManagementPage {

	restaurant: Restaurant;
	name: string;
	phone: number;
	addrLine1: string;
	addrLine2: string;
	managerPin: number;

	constructor(public navCtrl: NavController,
							public alertCtrl: AlertController,
							public modalCtrl: ModalController,
							public data: DataService) {

		this.restaurant = this.data.getRestaurant();
		this.name = this.restaurant.name;
		this.phone = this.restaurant.phoneNumber;
		this.addrLine1 = this.restaurant.addrLine1;
		this.addrLine2 = this.restaurant.addrLine2;
		this.managerPin = this.restaurant.managerPin;
	}

	submit() {
		this.restaurant.name = this.name;
		this.restaurant.phoneNumber = this.phone;
		this.restaurant.addrLine1 = this.addrLine1;
		this.restaurant.addrLine2 = this.addrLine2;
		this.restaurant.managerPin = this.managerPin;
		this.navCtrl.pop();
	}

	presentPhoneNumpad() {

		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Phone Number",
										alertTitle: "Invalid Phone Number",
										alertMsg: null,
										validInputCondition: function(input) {
											return (input > 0) && (input < 1000000);
										},
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

	presentPinNumpad() {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Enter 4-digit PIN",
										alertTitle: "PIN must be 4 digits",
										alertMsg: null,
										validInputCondition: function(input) {
											return (input > 999) && (input < 10000);
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				this.managerPin = returnedNum;
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
