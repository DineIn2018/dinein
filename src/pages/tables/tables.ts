import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { AddPartyPage } from './add-party/add-party';

@Component({
	selector: 'page-tables',
	templateUrl: 'tables.html'
})
export class TablesPage {

	mode: Mode;
	selectedParty: Party;

	tables: Table[];
	parties: Party[];

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public alertCtrl: AlertController,
							public actionSheetCtrl: ActionSheetController) {

		this.mode = Mode.Default;
		this.selectedParty = null;

		this.tables = [ new Table(4), new Table(4), new Table(6),
										new Table(2), new Table(8), new Table(2),
										new Table(2), new Table(4), new Table(6),
										new Table(8), new Table(4), new Table(6)];
		this.parties = [ new Party("Kass", 7, "4:20pm", "608 609 5186", true),
										 new Party("Casey", 4, "5:55pm", "608 608 6006", true),
										 new Party("Kameron", 2, "6:15pm", "506 506 5006", false),
										 new Party("Jimmie", 3, "8:01pm", "999 999 9999", false),
										 new Party("Suzy", 1000, "9:00pm", "012 345 6789", false),
										 new Party("Bryan", 1, "11:59pm", "666 666 6666", false)];

		// TODO: get tables and parties from DB
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
							this.displaySeatTableNumpad(table);
						} else {
							console.log('Free Table tapped on table ' + table.ID);
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
					handler: () => { }
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
						this.activateSeatingPartyMode(party);
					}
				},
				{
					text: 'Party Information',
					handler: () => {
						console.log('Party ' + party.ID + ' info tappped');
						this.displayPartyInfo(party);
					}
				},
				{
					text: 'Edit Party',
					handler: () => {
						console.log('Party ' + party.ID + ' edit tappped');
						this.navCtrl.push(AddPartyPage, {"parties" : null,
																						 "edit": true,
																						 "edit_party": party});
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
					handler: () => { }
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
	// Modal Trigger: displaySeatTableNumpad
	//----------------------------------------------------------------------------
	displaySeatTableNumpad(t: Table) {
		let modal = this.modalCtrl.create(NumToSeat, { table: t });
		modal.present();
	}

	//----------------------------------------------------------------------------
	// Button Action: onTablePress
	//----------------------------------------------------------------------------
	onTablePress(table: Table) {

		//
		// In seating party mode
		// Seat the party at table
		//
		if (this.seatingPartyMode()) {
			console.log('Table tapped in seating party mode');
			if (table.free) {
				if (this.selectedParty.size > table.capacity) {
					console.log('Presented table overcapacity warning');
					let confirm = this.alertCtrl.create({
						title: 'Table Too Small',
						message: 'This table is not large enough to seat that many people.Are you sure you want to seat them here?',
						enableBackdropDismiss: false,
						buttons: [
							{
								text: 'Cancel',
								handler: () => { console.log('Cancelled seating overcapacity'); }
							},
							{
								text: 'Seat',
								handler: () => {
									console.log('Selected to seat overcapacity');
									// Seat number of party size at table
									table.seat(this.selectedParty.size, this.selectedParty.name);
									this.deleteParty(this.selectedParty);
									this.deactivateSeatingPartyMode();
								}
							}
						]
					});
					confirm.present();

				} else {
					// Seat number of party size at table
					table.seat(this.selectedParty.size, this.selectedParty.name);
					this.deleteParty(this.selectedParty);
					this.deactivateSeatingPartyMode();
				}

			// Table is Occupied
			} else {
				console.log('Tried to seat at occupied table');
				let alert = this.alertCtrl.create({
					title: 'This table is currently occupied',
					enableBackdropDismiss: false,
					buttons: [
						{
							text: 'Dismiss',
							handler: () => { }
						}
					]
				});
				alert.present();
			}

		//
		// Not in seating party at table mode
		// Show table action sheet
		//
		} else {
			this.presentTableActions(table);
		}
	}
	
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
		this.navCtrl.push(AddPartyPage, {"parties" : this.parties,
																		 "edit": false,
																		 "edit_party": null});
	}

	activateSeatingPartyMode(p: Party) {
		this.mode = Mode.SeatingParty;
		this.selectedParty = p;
	}

	deactivateSeatingPartyMode() {
		this.mode = Mode.Default;
		this.selectedParty = null;
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

	seatingPartyMode(): boolean {
		return this.mode == Mode.SeatingParty;
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
					<button class="modalbutton" ion-button block
									(click)="dismiss()">Dismiss</button>
				</div>
			</ion-list>
		</div>
	`
})
export class TableInfo {

	t: Table

	constructor(public navCtrl: NavController, params: NavParams) {
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
					<button class="modalbutton" ion-button block
									(click)="dismiss()">Dismiss</button>
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

	constructor(public navCtrl: NavController,
							public alertCtrl: AlertController,
							params: NavParams) {
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
		if (this.numToSeat > this.table.capacity) {
			let confirm = this.alertCtrl.create({
				title: 'Table Too Small',
				message: 'This table is not large enough to seat that many people. Are you sure you want to seat them here?',
				enableBackdropDismiss: false,
				buttons: [
					{
						text: 'Cancel',
						handler: () => {
							this.clearButton();
						}
					},
					{
						text: 'Seat',
						handler: () => {
							// Seat number of party size at table
							this.table.seat(this.numToSeat, null);
							this.navCtrl.pop();
						}
					}
				]
			});
			confirm.present();
		} else {
			this.table.seat(this.numToSeat, null);
			this.navCtrl.pop();
		}
	}

	cancel() {
		this.navCtrl.pop();
	}
}

////////////////////////////////////////////////////////////////////////////////
// Classes
////////////////////////////////////////////////////////////////////////////////

export class Table {

	static ID_runner: number = 1;

	ID: number;
	capacity: number;
	free: boolean;
	partySize: number;
	server: string;
	guestName: string;

	constructor(capacityIn: number) {
		this.ID = Table.ID_runner;
		Table.ID_runner += 1;
		this.capacity = capacityIn;
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
		this.guestName = "N/A";
	}

	getStatus(): string {
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

	static ID_runner: number = 0;

	ID: number;
	name: string;
	size: number;
	time: string;
	contact: string;
	reservation: boolean;

	constructor(name: string, size: number, time: string,
							contact: string, reservation: boolean) {
		this.ID = Party.ID_runner;
		Party.ID_runner += 1;
		console.log('created party ID: '+ this.ID);
		console.log('curr ID_runner: '+ Party.ID_runner);
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

enum Mode {
	Default = 0,
	SeatingParty = 1,
	EditingLayout = 2
}
