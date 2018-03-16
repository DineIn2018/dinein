import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-tables',
  templateUrl: 'tables.html'
})
export class TablesPage {

  constructor(public navCtrl: NavController,
  					  public modalCtrl: ModalController,
  					  public actionSheetCtrl: ActionSheetController) { }

  tables: Table[] = [ new Table(0,4), new Table(1,4), new Table(2,6), new Table(3,2), new Table(4,8), new Table(5,2)];
  parties: Party[] = [ new Party(0, "Kass", 7, "4:20pm", "608 609 5186", true),
  										 new Party(1, "Casey", 4, "5:55pm", "608 608 6006", true),
  										 new Party(2, "Kameron", 2, "6:15pm", "506 506 5006", false),
  										 new Party(3, "Jimmie", 3, "8:01pm", "999 999 9999", false),
  										 new Party(4, "Suzy", 1000, "9:00pm", "012 345 6789", false),
  										 new Party(5, "Bryan", 1, "11:59pm", "666 666 6666", false),
  									 ]

	presentTableActions(table: Table) {

		var seatOrFree: string;

		if (table.free) {
			seatOrFree = "Seat Party";
		} else {
			seatOrFree = "Free Table";
		}

		let tableActions = this.actionSheetCtrl.create({
			title: 'Table Actions',
			buttons: [
				{
					text: seatOrFree,
					handler: () => {
						if (table.free) {
							console.log('Seat Party tapped on table ' + table.ID);
							// TODO: Let user select party size
							table.seatParty(1);
						} else {
							console.log('Free Table tapped on table ' + table.ID);
							// TODO: Let user select party size
							table.freeTable();
						}		
					}
				},
				{
					text: 'Table Information',
					handler: () => {
						console.log('Table ' + table.ID + ' info tappped');
						this.displayTableInfo(table);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});

		tableActions.present();
	}

	presentPartyActions(party: Party) {

		let partyActions = this.actionSheetCtrl.create({
			title: 'Party Actions',
			buttons: [
				{
					text: 'Seat Party',
					handler: () => {
						console.log('Party ' + party.ID + ' seated');
						// Find corresponding party in list and remove
						var i;
						for (i = 0; i < this.parties.length; i++) {
							if (this.parties[i].ID == party.ID) {
								this.parties.splice(i, 1);
							}
						}
					}
				},
				{
					text: 'Party Information',
					handler: () => {
						console.log('Party ' + party.ID + ' info tappped');
						this.displayPartyInfo(party)
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});

		partyActions.present();
	}

	displayTableInfo(t: Table) {
		let modal = this.modalCtrl.create(TableInfo, {table: t});
		modal.present();
	}

	displayPartyInfo(p: Party) {
		let modal = this.modalCtrl.create(PartyInfo, {party: p});
		modal.present();
	}

	editLayout() {
		console.log('Edit Layout Pressed');
		// Make layout editable
	}

	addParty() {
		console.log('Add Party Pressed');
		let modal = this.modalCtrl.create(AddParty);
		modal.present();
		// Show popup to get party info, then add party
	}

}

////////////////////////////////////////////////////////////////////////////////
// Sub-Views
////////////////////////////////////////////////////////////////////////////////

//------------------------------------------------------------------------------
// Sub-View: TableInfo
//------------------------------------------------------------------------------
@Component({
	selector: 'page-tables',
  template: `
    <div id="tablemodal">
    	<ion-list id="modalcontent">
	    	<ion-label class="subsubtitle">Table {{t.ID}}</ion-label>
	    	<ion-label class="regularText">Capacity: {{t.capacity}}</ion-label>
	    	<ion-label class="regularText">Status: {{t.getStatus()}}</ion-label>
	    	<ion-label class="regularText">Current Party: {{t.partySize}}</ion-label>
	    	<ion-label class="regularText">Server: {{t.server}}</ion-label>
	    	<div class="modalbuttons">
					<button class="modalbutton" ion-button block (click)="dismiss()">Dismiss</button>
	    	</div>
	    </ion-list>
    </div>
  `
})
export class TableInfo {

	t: Table

	constructor(public navCtrl: NavController,
  					  params: NavParams) {
		this.t = params.get('table');
   	console.log('Passed Table ID: ', this.t.ID);
 	}

 	dismiss() {
    this.navCtrl.pop();
  }

  editInfo() {
  	console.log('Edit Table ID ', this.t.ID);
  }
}

//------------------------------------------------------------------------------
// Sub-View: PartyInfo
//------------------------------------------------------------------------------
@Component({
	selector: 'page-tables',
  template: `
    <div id="partymodal">
    	<ion-list id="modalcontent">
	    	<ion-label class="subsubtitle">{{p.name}}'s {{p.getKind()}}</ion-label>
	    	<ion-label class="regularText">Size: {{p.size}}</ion-label>
	    	<ion-label class="regularText">Arrival Time: {{p.time}}</ion-label>
	    	<ion-label class="regularText">Contact: {{p.contact}}</ion-label>
	    	<ion-label class="regularText">ID: {{p.ID}}</ion-label>
	    	<div class="modalbuttons">
	    		<button class="modalbutton" ion-button block (click)="dismiss()">Dismiss</button>
	    		<button class="modalbutton" ion-button block outline (click)="editInfo()">Edit</button>
	    	</div>
	    </ion-list>
    </div>
  `
})
export class PartyInfo {

	p: Party

	constructor(public navCtrl: NavController,
  					  params: NavParams) {
		this.p = params.get('party');
   	console.log('Passed Party ID: ', this.p.ID);
 	}

 	editInfo() {

 	}
 	
 	dismiss() {
    this.navCtrl.pop();
  }
}

//------------------------------------------------------------------------------
// Sub-View: AddParty
//------------------------------------------------------------------------------
@Component({
	selector: 'page-tables',
  template: `
    <div id="partymodal">
    	<ion-list id="modalcontent">
	    	<ion-label class="subsubtitle">Party Information</ion-label>
				<ion-input class="inputfield" clearInput type="Text" placeholder="Name"></ion-input>
				<ion-input class="inputfield" clearInput type="Text" placeholder="Size"></ion-input>
				<ion-input class="inputfield" clearInput type="Number" placeholder="Contact"></ion-input>
				<ion-item>
    			<ion-label>Reservation?</ion-label>
					<ion-checkbox [(ngModel)]="pepperoni"></ion-checkbox>
				</ion-item>
	    	<div class="modalbuttons">
	    		<button class="modalbutton" ion-button block (click)="submit()">Submit</button>
	    		<button class="modalbutton" ion-button block outline (click)="cancel()">Cancel</button>
	    	</div>
	    </ion-list>
    </div>
  `
})
export class AddParty {

	constructor(public navCtrl: NavController) {
		console.log('Pop-up: Add Party');
	}

	submit(){
		// Get entered user info and create party object, then add to party list
		this.navCtrl.pop();
	}

	cancel() {
		this.navCtrl.pop();
	}
}

////////////////////////////////////////////////////////////////////////////////
// Classes
////////////////////////////////////////////////////////////////////////////////

class Table {
	ID: number;
	capacity: number;
	free: boolean;
	partySize: number;
	server: string;

	constructor (IDin: number, capacityIn: number) {
		this.ID = IDin;
		this.capacity = capacityIn;
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
	}

	getStatus() {
		if (this.free) {
			return "Free";
		} else {
			return "Occupied";
		}
	}
	freeTable() {
		console.log('Table ' + this.ID + ' freed');
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
	}

	seatParty(size: number) {
		console.log('Seated ' + size +' people at Table ' + this.ID);
		this.free = false;
		this.partySize = size;
		this.server = "Manager";
	}
}

class Party {
	ID: number;
	name: string;
	size: number;
	time: string;
	contact: string;
	reservation: boolean;

	constructor (ID:number, name: string, size: number, time: string,
							 contact: string, reservation: boolean) {
		this.ID = ID;
		this.name = name;
		this.size = size;
		this.time = time;
		this.contact = contact;
		this.reservation = reservation;
	}

	getKind(): string {
		if (this.reservation) {
			return "Reservation";
		} else {
			return "Party";
		}
	}

	display(): string {
		return this.name + ', ' + this.size + ', ' + this.time;
	}
}
