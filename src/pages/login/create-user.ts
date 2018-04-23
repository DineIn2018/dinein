import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { CreateRestaurantPage } from './create-restaurant';
import { Restaurant } from './create-restaurant';
import { InputNumpad } from '../util/numpad';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-create-user',
	templateUrl: 'create-user.html'
})
export class CreateUserPage {

	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	phone: number;
	restaurant: string;

	buttonTextPhone: string;
	buttonTextRestaurant: string;

	createdRestaurant: Restaurant;

	restaurantsList: string[] = ["Potbelly", "State St. Brats", "Hopcat", "Five Guys",
															 "Chipotle", "Nitty Gritty", "Dotty's", "Ians",
															 "Glaze", "QQs"];

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public viewCtrl: ViewController,
							public navParams: NavParams) {

		this.createdRestaurant = this.navParams.get('restaurant');
		if (this.createdRestaurant) {
			console.log('received restaurant: ' + this.createdRestaurant.name);
		} else {
			this.createdRestaurant = null;
		}

		this.email = null;
		this.password = null;
		this.confirmPassword = null;
		this.firstName = null;
		this.lastName = null;
		this.phone = null;
		this.restaurant = null;

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateUserPage');
	}

	goToLogin() {
		this.navCtrl.pop();
	}

	presentNumpad() {
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

	presentRestaurantSelector() {
		let modal = this.modalCtrl.create(SelectRestaurant, {restaurants: this.restaurantsList});
		modal.onDidDismiss(data => {
			if (data != null) {
				if (data == 0) {
					this.navCtrl.push(CreateRestaurantPage);
				} else {
					this.restaurant = data;
					this.buttonTextRestaurant = String(this.restaurant);
				}
			}
		});
		modal.present();
	}

	validData() {
		return (this.email != null &&
						this.password != null &&
						this.confirmPassword != null &&
						this.firstName != null &&
						this.restaurant != null);
	}

	passwordsMatch() {
		return (this.password == this.confirmPassword);
	}
}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
	selector: 'page-create-user',
	template: `
		<div class="modalbase" id="restaurantmodal">
			<h3 class="colormedium">Select Restaurant</h3>
			<ion-content class="modallist">
				<ion-list scroll="true">
					<button ion-button block outline class="listbutton"
									*ngFor="let restaurant of restaurants"
									[ngClass]="{'selectedrestaurant': restaurant === selectedRestaurant,
															'restaurant': restaurant !== selectedRestaurant}"
									(click)="selectRestaurant(restaurant)">
						{{restaurant}}
					</button>
				</ion-list>
			</ion-content>
			<button class="modalbutton" ion-button block
								(click)="OK()">OK</button>
			<button class="modalbutton" ion-button block outline
								(click)="cancel()">Cancel</button>
			<button class="modalbutton" ion-button block outline
								(click)="createNewRestaurant()">Create New Restaurant</button>
		</div>
	`
})
export class SelectRestaurant {

	restaurants: string[];
	selectedRestaurant: string;

	constructor(public viewCtrl: ViewController,
							private params: NavParams) {
		this.restaurants = params.get('restaurants');
		this.selectedRestaurant = this.restaurants[0];
	}

	selectRestaurant(r: string) {
		this.selectedRestaurant = r;
	}

	OK() {
		this.viewCtrl.dismiss(this.selectedRestaurant);
	}

	createNewRestaurant() {
		this.viewCtrl.dismiss(0);
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}

}
