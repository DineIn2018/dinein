import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { CreateUserPage } from './create-user';
import { Employee } from '../employees/employees';
import { Restaurant } from '../management/management';
import { InputNumpad } from '../util/numpad';

@IonicPage()
@Component({
	selector: 'page-create-restaurant',
	templateUrl: 'create-restaurant.html',
})
export class CreateRestaurantPage {

	restaurantName: string;
	addrLine1: string;
	addrLine2: string;
	phone: number;
	ownerFirstName: string;
	ownerLastName: string;

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public viewCtrl: ViewController,
							public alertCtrl: AlertController) {
		this.restaurantName = null;
		this.addrLine1 = null;
		this.addrLine2 = null;
		this.phone = null;
		this.ownerFirstName = null;
		this.ownerLastName = null;
	}

	create() {
		//
		// Invalid Input data
		//
		if (!this.validData()) {
			let alert = this.alertCtrl.create({
				title: 'Some Information is Missing!',
				enableBackdropDismiss: false,
				buttons: [
					{
						text: 'Dismiss',
						handler: () => {
							console.log(this.restaurantName + this.addrLine1 + this.addrLine2 + this.phone + this.ownerFirstName + this.ownerLastName);
						}
					}
				]
			});
			alert.present();

		//
		// Valid Input Data
		//
		} else {
			let owner = new Employee(this.ownerFirstName, this.ownerLastName, "Owner",
																100000.01, 2024561111, "../assets/imgs/mikefass.jpg", 1);
			let createdRestaurant: Restaurant = new Restaurant(
				this.restaurantName, this.phone, owner, this.addrLine1, this.addrLine2);
			this.navCtrl.popTo(CreateUserPage);
		}
	}

	exit() {
		this.navCtrl.pop();
	}

	presentNumpad(field: string) {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Phone Number",
										alertTitle: "Invalid Phone Number",
										alertMsg: null,
										validInputCondition: function(input) { return input > 0;},
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

	validData() {
		return ((this.addrLine1 != null) &&
						(this.addrLine2 != null) &&
						(this.phone != null) &&
						(this.ownerFirstName != null) &&
						(this.ownerLastName != null));
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

}