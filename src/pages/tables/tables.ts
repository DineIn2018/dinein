import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { AddPartyPage } from './add-party/add-party';
//import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-tables',
	templateUrl: 'tables.html'
})
export class TablesPage {

	selectingTable: any;
	tables: Table[];
	parties: Party[];

	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		public actionSheetCtrl: ActionSheetController,
		public alertCtrl: AlertController) {

		this.selectingTable = {active: false, party: null};
		this.tables = [ new Table(0,4), new Table(1,4), new Table(2,6),
										new Table(3,2), new Table(4,8), new Table(5,2),
										new Table(6,2), new Table(7,4), new Table(8,6),
										new Table(9,8), new Table(10,4), new Table(11,6)];
		this.parties = [ new Party(0, "Kass", 7, "4:20pm", "608 609 5186", true),
										 new Party(1, "Casey", 4, "5:55pm", "608 608 6006", true),
										 new Party(2, "Kameron", 2, "6:15pm", "506 506 5006", false),
										 new Party(3, "Jimmie", 3, "8:01pm", "999 999 9999", false),
										 new Party(4, "Suzy", 1000, "9:00pm", "012 345 6789", false),
										 new Party(5, "Bryan", 1, "11:59pm", "666 666 6666", false), ];

		// TODO: get tables and parties from DB
	}

	//----------------------------------------------------------------------------
	// Button Action: onTablePress
	//----------------------------------------------------------------------------
	onTablePress(table: Table) {

		// If currently selecting a table to seat party
		if (this.selectingTable.active) {
			if (table.free) {

				if (this.selectingTable.party != null && table.capacity < this.selectingTable.party.size) {
					let confirm = this.alertCtrl.create({
						title: 'Table Too Small',
						message: 'This table is not large enough to seat that many people. Are you sure you want to seat them here?',
						enableBackdropDismiss: false,
						buttons: [
							{
								text: 'Cancel',
								handler: () => {
									//do nothing
									// Deactivate table selection mode
									this.deactivateTableSelectionMode();
								}
							},
							{
								text: 'Seat',
								handler: () => {
									// Seat number of party size at table
									table.seat(this.selectingTable.party.size,
										this.selectingTable.party.name);
									this.deleteParty(this.selectingTable.party);
									// Deactivate table selection mode
									this.deactivateTableSelectionMode();
								}
							}
						]
					});
					confirm.present();
				} else {
					// Seat number of party size at table
					table.seat(this.selectingTable.party.size,
						this.selectingTable.party.name);
					this.deleteParty(this.selectingTable.party);
					// Deactivate table selection mode
					this.deactivateTableSelectionMode();
				}

				// // Deactivate table selection mode
				// this.deactivateTableSelectionMode();
			} else {
				// Tried to seat to occupied table
			}

			// Show table actions
		} else {
			this.presentTableActions(table);
		}

	}

	//----------------------------------------------------------------------------
	// Action Sheet: presentTableActions
	//----------------------------------------------------------------------------
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
							this.seatTable(table);
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

	//----------------------------------------------------------------------------
	// Action Sheet: presentPartyActions
	//----------------------------------------------------------------------------
	presentPartyActions(party: Party) {

		let partyActions = this.actionSheetCtrl.create({
			title: 'Party Actions',
			buttons: [
				{
					text: 'Seat Party',
					handler: () => {
						console.log('Selected Party ' + party.ID + ' to seat');
						// Enable seating party to table mode
						this.activateTableSelectionMode(party);
					}
				},
				{
					text: 'Party Information',
					handler: () => {
						console.log('Party ' + party.ID + ' info tappped');
						this.displayPartyInfo(party);
					}
				},
				// TODO: Add edit party page
				{
					text: 'Edit Party',
					handler: () => {
						console.log('Party ' + party.ID + ' edit tappped');
						this.navCtrl.push(AddPartyPage, {"parties" : null, "edit": true, "edit_party": party});
					}
				},
				{
					text: 'Delete Party',
					handler: () => {
						console.log('Party ' + party.ID + ' delete tappped');
						this.deleteParty(party);
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

	//----------------------------------------------------------------------------
	// Modal Trigger: displayTableInfo
	//----------------------------------------------------------------------------
	displayTableInfo(t: Table) {
		let modal = this.modalCtrl.create(TableInfo, { table: t });
		modal.present();
	}

	//----------------------------------------------------------------------------
	// Modal Trigger: displayPartyInfo
	//----------------------------------------------------------------------------
	displayPartyInfo(p: Party) {
		let modal = this.modalCtrl.create(PartyInfo, { party: p });
		modal.present();
	}

	//----------------------------------------------------------------------------
	// Modal Trigger: seatTable
	//----------------------------------------------------------------------------
	seatTable(t: Table) {
		let modal = this.modalCtrl.create(NumToSeat, { table: t });
		modal.present();
	}

	// //----------------------------------------------------------------------------
	// // Button Action: onTablePress
	// //----------------------------------------------------------------------------
	// onTablePress(table: Table) {

	// 		// If currently selecting a table to seat party
	// 		if (this.selectingTable.active) {
	// 			if (table.free) {
	// 				this.deleteParty(this.selectingTable.party);
	// 				// Seat number of party size at table
	// 				table.seat(this.selectingTable.party.size,
	// 									 this.selectingTable.party.name);
	// 				// Deactivate table selection mode
	// 				this.deactivateTableSelectionMode();
	// 			} else {
	// 				// Tried to seat to occupied table
	// 			}

	// 		// Show table actions
	// 		} else {
	// 			this.presentTableActions(table);
	// 		}
	// }
	
	//----------------------------------------------------------------------------
	// Button Action: onEditLayoutPress
	//----------------------------------------------------------------------------
	onEditLayoutPress() {
		console.log('Edit Layout Pressed');
		// Make layout editable
	}

	//----------------------------------------------------------------------------
	// Button Action: onAddPartyPress
	//----------------------------------------------------------------------------
	onAddPartyPress() {
		console.log('Add Party Pressed');
		//let modal = this.modalCtrl.create(AddParty);
		//modal.present();
		this.navCtrl.push(AddPartyPage, {"parties" : this.parties, "edit": false, "edit_party": null});
		// Show popup to get party info, then add party
	}

	activateTableSelectionMode(party: Party) {
		this.selectingTable.active = true;
		this.selectingTable.party = party;
	}

	deactivateTableSelectionMode() {
		this.selectingTable.active = false;
		this.selectingTable.party = null;
	}

	deleteParty(party: Party) {
		// Find corresponding party in list and remove
		var i;
		for (i = 0; i < this.parties.length; i++) {
			if (this.parties[i].ID == party.ID) {
				this.parties.splice(i, 1);
			}
		}
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
				<ion-label class="regularText">Guest: {{t.guestName}}</ion-label>
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
					<button class="modalbutton" ion-button block (click)="dismiss()">Dismiss</button>
			</ion-list>
		</div>
	`
})
export class PartyInfo {

	p: Party

	constructor(public navCtrl: NavController, params: NavParams) {
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
// Sub-View: NumToSeat
//------------------------------------------------------------------------------
@Component({
	selector: 'page-tables',
	template: `
		<div class="modalbase" id="numpadmodal">
				<ion-label class="header">Party Size</ion-label>
				<ion-label class="subtitle">{{numToSeat}}</ion-label>
				<div style="height:300px;width:100%;">
					<table class="numpad">
						<tr>
							<td><button class="numkey" ion-button (click)="pressButton(1)">1</button></td>
							<td><button class="numkey" ion-button (click)="pressButton(2)">2</button></td> 
							<td><button class="numkey" ion-button (click)="pressButton(3)">3</button></td>
						</tr>
						<tr>
							<td><button class="numkey" ion-button (click)="pressButton(4)">4</button></td>
							<td><button class="numkey" ion-button (click)="pressButton(5)">5</button></td> 
							<td><button class="numkey" ion-button (click)="pressButton(6)">6</button></td>
						</tr>
						<tr>
							<td><button class="numkey" ion-button (click)="pressButton(7)">7</button></td>
							<td><button class="numkey" ion-button (click)="pressButton(8)">8</button></td> 
							<td><button class="numkey" ion-button (click)="pressButton(9)">9</button></td>
						</tr>
						<tr>
							<td><button class="numkey" ion-button (click)="clearButton()">C</button></td>
							<td><button class="numkey" ion-button (click)="pressButton(0)">0</button></td> 
							<td><button class="numkey" ion-button (click)="deleteButton()">del</button></td>
						</tr>
					</table>
				</div>
				<button class="modalbutton" ion-button block (click)="seat()">Seat</button>
				<button class="modalbutton" ion-button block outline (click)="cancel()">Cancel</button>
		</div>
	`
})
export class NumToSeat {

	table: Table;
	numToSeat: number;

	constructor(public navCtrl: NavController, params: NavParams, public alertCtrl: AlertController) {
		this.table = params.get('table');
		this.numToSeat = 0;
		console.log('Pop-up: Num To Seat');
	}

	pressButton(n: number) {
		this.numToSeat = this.numToSeat * 10 + n;
	}

	deleteButton() {
		this.numToSeat = Math.floor(this.numToSeat / 10);
	}

	clearButton() {
		this.numToSeat = 0;
	}

	seat() {
		if (this.numToSeat > 0 && this.numToSeat <= this.table.capacity) {
			this.table.seat(this.numToSeat, null);
		} else if (this.numToSeat > this.table.capacity) {
			let confirm = this.alertCtrl.create({
				title: 'Table Too Small',
				message: 'This table is not large enough to seat that many people. Are you sure you want to seat them here?',
				enableBackdropDismiss: false,
				buttons: [
					{
						text: 'Cancel',
						handler: () => {
							//do nothing
						}
					},
					{
						text: 'Seat',
						handler: () => {
							this.table.seat(this.numToSeat, null);
						}
					}
				]
			});
			confirm.present();
		}
		this.navCtrl.pop();
	}

	cancel() {
		this.navCtrl.pop();
	}
}

////////////////////////////////////////////////////////////////////////////////
// Classes
////////////////////////////////////////////////////////////////////////////////

export class Table {
	ID: number;
	capacity: number;
	free: boolean;
	partySize: number;
	server: string;
	guestName: string;

	constructor(IDin: number, capacityIn: number) {
		this.ID = IDin;
		this.capacity = capacityIn;
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
		this.guestName = "N/A";
	}

	getStatus() {
		if (this.free) {
			return "Free";
		} else {
			return "Occupied";
		}
	}

	getButtonText(): string {
		if (this.free) {
			return this.capacity.toString();
		} else {
			return this.partySize + '/' + this.capacity;
		}
	}

	freeTable() {
		console.log('Table ' + this.ID + ' freed');
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
		this.guestName = "N/A";
	}

	seat(size: number, name: string) {

		console.log('Seated ' + size + ' people at Table ' + this.ID);
		this.free = false;
		this.partySize = size;
		this.server = "Manager";
		if (name != null) {
			this.guestName = name;
		} else {
			this.guestName = "N/A";
		}
	}
}

export class Party {
	ID: number;
	name: string;
	size: number;
	time: string;
	contact: string;
	reservation: boolean;

	constructor(ID: number, name: string, size: number, time: string,
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
		return this.time + ' | ' + this.name + ' | ' + this.size;
	}
}
