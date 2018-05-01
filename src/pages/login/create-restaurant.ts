import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { CreateUserPage } from './create-user';
import { Restaurant, Employee } from '../util/classes';
import { InputNumpad } from '../util/numpad';

import { RestaurantObject } from '../../DBAssets/DBObjects';
import { DbHelperProvider } from '../../providers/dbhelper/dbhelper';

@IonicPage()
@Component({
	selector: 'page-create-restaurant',
	templateUrl: 'create-restaurant.html',
	providers: [ DbHelperProvider ]
})
export class CreateRestaurantPage {

	restaurantName: string;
	addrLine1: string;
	addrLine2: string;
	phone: number;
	ownerFirstName: string;
	ownerLastName: string;
	managerPin: number;

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public viewCtrl: ViewController,
							public alertCtrl: AlertController,
							public DBHelper: DbHelperProvider) {

		this.restaurantName = null;
		this.addrLine1 = null;
		this.addrLine2 = null;
		this.phone = null;
		this.ownerFirstName = null;
		this.ownerLastName = null;
		this.managerPin = null;
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
							console.log(this.restaurantName + this.addrLine1 + this.addrLine2
								+ this.phone + this.ownerFirstName + this.ownerLastName);
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
				this.restaurantName, this.phone, owner, this.addrLine1, this.addrLine2, this.managerPin);

			let newRestaurant = new RestaurantObject();
			newRestaurant.name = this.restaurantName;
			newRestaurant.addr1 = this.addLine1;
			newRestaurant.addr2 = this.addrLine2;
			newRestaurant.capacity = createdRestaurant.getCapacity();
			newRestaurant.phoneNo = this.phone;
			newRestaurant.totalEmploy = createdRestaurant.getNumEmployees();
			newRestaurant.managerPIN = this.managerPin;

			this.DBHelper.addRestaurant(newRestaurant);

			let alert = this.alertCtrl.create({
				title: "Restaurant Successfully Created",
				enableBackdropDismiss: false,
				buttons: [
					{
						text: "OK",
						handler: () => { this.exit(); }
					}
				]
			});
			alert.present();
		}
	}

	exit() {
		this.navCtrl.pop();
	}

	presentPhoneNumpad() {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Phone Number",
										alertTitle: "Invalid Phone Number",
										alertMsg: null,
										validInputCondition: function(input) {
											return (input > 999999999) && (input < 10000000000);
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