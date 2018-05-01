import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ModalController, ViewController, AlertController } from 'ionic-angular';;
import { Party } from '../util/classes';
import { DateTimeService } from '../util/date-time';
import { InputNumpad } from '../util/numpad';

@IonicPage()
@Component({
	selector: 'page-add-party',
	templateUrl: 'add-party.html',
})
export class AddPartyPage {

	editMode: boolean;

	ID: number;
	name: string;
	size: number;
	contact: number;
	time: string;
	reservation: boolean;

	party: Party;
	parties: Party[];

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public viewCtrl: ViewController,
							public alertCtrl: AlertController,
							public navParams: NavParams,
							private datetime: DateTimeService) {

		this.editMode = this.navParams.get("edit");

		//
		// Editing party mode
		//
		if (this.editMode) {
			this.party = this.navParams.get("edit_party");

			// Set user inputs automatically to the values of party being edited
			this.ID = this.party.ID;
			this.name = this.party.name;
			this.size = this.party.size;
			this.contact = this.party.contact;
			this.reservation = this.party.reservation;
			this.time = this.party.time;

		//
		// Adding new party mode
		//
		} else {
			this.parties = this.navParams.get("parties");

			// All inputs initially empty
			this.ID = null;
			this.name = null;
			this.size = null;
			this.contact = null;
			this.reservation = false;
			this.time = null;
		}

	}

	submit() {
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
						handler: () => { }
					}
				]
			});
			alert.present();

		//
		// Valid Input Data
		//
		} else {

			if (this.editMode) {
				this.party.ID = this.ID;
				this.party.name = this.name;
				this.party.size = this.size;
				this.party.contact = this.contact;
				this.party.reservation = this.reservation;
				this.party.time = this.time;

			// Adding Party Mode
			} else {
				var partyTime: string;

				if (this.reservation) {
					partyTime = this.time;
				} else {
					partyTime = this.datetime.getTime();
				}
				var party = new Party(this.name, this.size, partyTime,
														this.contact, this.reservation);
				this.parties.push(party);
				this.parties.sort(Party.compare);
			}

			let alert = this.alertCtrl.create({
				title: this.editMode? "Edited Party Info Successfully Saved" : "Party Successfully Created",
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

	presentSizeNumpad() {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Party Size",
										alertTitle: "Invalid Party Size",
										alertMsg: null,
										validInputCondition: function(input) { return input > 0;},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				this.size = returnedNum;
			}
		});
		numpadModal.present();
	}

	presentContactNumpad() {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Contact Number",
										alertTitle: "Invalid Contact Number",
										alertMsg: null,
										validInputCondition: function(input) {
											return (input > 999999999) && (input < 10000000000);
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				this.contact = returnedNum;
			}
		});
		numpadModal.present();
	}

	validData() {
		return ((this.name != null) &&
						(this.size != null) &&
						(this.contact != null) &&
						(this.reservation != null) &&
						(!this.reservation || (this.time != null)))
	}

	getContactStr(): string {
		if (this.contact) {
			let phoneStr = this.contact.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return this.contact.toString();
	}
}