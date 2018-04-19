import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { AddPartyPage } from './add-party';
import { DateTimeService } from '../util/date-time';
import * as interact from 'interactjs';
//import { Employee } from '../employees/employees';

/*
	BUGS:
	1) Static ID for party and tables keep counting after login-logout
		 should be solved once we use ID's from DB
	2)
*/

@Component({
	selector: 'page-tables',
	templateUrl: 'tables.html'
})
export class TablesPage {

	mode: Mode;
	selectedParty: Party;

	tables: Table[];
	parties: Party[];
	servers: Employee[];

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public alertCtrl: AlertController,
							public actionSheetCtrl: ActionSheetController,
							public viewCtrl: ViewController,
							private datetime: DateTimeService) {

		this.mode = Mode.Default;
		this.selectedParty = null;

		this.tables = [
										new Table(4, "20", "20"), new Table(4, "70", "20"),
										new Table(6, "120", "20"), new Table(2, "170", "20"),
										new Table(8, "220", "20"), new Table(2, "20", "150"),
										new Table(2, "70", "80"), new Table(4, "120", "80"),
										new Table(6, "170", "60"), /*new Table(8),
										new Table(4), new Table(6),
										new Table(3), new Table(1) */
									];
		this.parties = [
										 new Party("Kass", 7, "04:20", "608 609 5186", true),
										 new Party("Kameron", 2, "18:15", "506 506 5006", false),
										 new Party("Jimmie", 3, "21:01", "999 999 9999", false),
										 new Party("Suzy", 1000, "09:00", "012 345 6789", false),
										 new Party("Casey", 4, "05:55", "608 608 6006", true),
										 new Party("Pete", 7, "05:54", "666 666 6969", false),
										 new Party("Kay", 2, "00:59", "666 666 6969", false),
										 new Party("Magaret", 4, "05:20", "666 666 6969", true),
										 new Party("Joyce", 3, "05:55", "666 666 6969", false),
										 new Party("Ivan", 10, "11:59", "666 666 6969", false),
										 new Party("Jason", 12, "11:59", "666 666 6969", false),
										 new Party("Ben", 5, "00:00", "666 666 6969", true),
										 new Party("Issac", 6, "23:59", "666 666 6969", true),
										 new Party("Leslie", 6, "24:59", "666 666 6969", false)
									 ];

		this.parties.sort(Party.compare);

		this.servers = [
										new Employee("Spongebob"),
										new Employee("Squidward"),
										new Employee("Patrick"),
										new Employee("Mr. Krabs"),
										new Employee("Plankton"),
										new Employee("Sandy"),
										new Employee("Pearl"),
										new Employee("Rick"),
										new Employee("Morty"),
										new Employee("Beth"),
										new Employee("Jerry"),
										new Employee("Bird Person")
									 ];
		// TODO: get tables and parties from Database
		// Filter "parties" by date, get only the ones for today
		// Only reservations are going persist in database, grab those from database
		// TODO: write sorting algorithm for the whole list
	}

	ionViewDidLoad() {/*
		var i;
		for(i = 0; i < this.tables.length; i++) {
			let table = this.tables[i];
			console.log('table'+table.ID);
			var tableElement = document.getElementById('table'+table.ID);
			console.log(tableElement.getAttribute('id'));
			tableElement.setAttribute('data-x', table.xPos);
	    tableElement.setAttribute('data-y', table.yPos);
	    tableElement.style.webkitTransform =
	    tableElement.style.transform =
	      'translate(' + table.xPos + 'px, ' + table.yPos + 'px)';
		}*/
	}

	//----------------------------------------------------------------------------
	// Button Action: onTablePress
	//----------------------------------------------------------------------------
	onTablePress(table: Table) {

		if (this.editingLayoutMode()) {
			return;
		}
		//
		// Not in seating party at table mode
		// Show table action sheet
		//
		if (!this.seatingPartyMode()) {
			this.presentTableActions(table);

		//
		// In seating party mode
		// Seat the party at table
		//
		} else {
			console.log('Table tapped in seating party mode');
			if (table.free) {
				if (this.selectedParty.size > table.capacity) {
					console.log('Presented table overcapacity warning');
					let confirm = this.alertCtrl.create({
						title: 'Table Too Small',
						message: 'Are you sure you want to seat them there?',
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
									this.displaySelectServer(table, this.selectedParty.size);
								}
							}
						]
					});
					confirm.present();

				} else {
					// Seat number of party size at table
					this.displaySelectServer(table, this.selectedParty.size);
				}

			// Table is Occupied
			} else {
				console.log('Tried to seat at occupied table');
				let alert = this.alertCtrl.create({
					title: 'This table is currently occupied',
					enableBackdropDismiss: false,
					buttons: [ { text: 'Dismiss', handler: () => {} } ]
				});
				alert.present();
			}
		}
	}

	//----------------------------------------------------------------------------
	// Button Action: onEditLayoutPress
	//----------------------------------------------------------------------------
	onEditLayoutPress() {
		if (this.editingLayoutMode()) {
			this.switchModeTo(Mode.Default);
			this.interactjsUpdate(false);
			console.log('mode now is ' + this.mode);
		} else {
			this.switchModeTo(Mode.EditingLayout);
			this.interactjsUpdate(true);
			console.log('mode now is ' + this.mode);
		}
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
	//----------------------------------------------------------------------------
	// Button Action: onCancelSeatingPartyPress
	//----------------------------------------------------------------------------
	onCancelSeatingPartyPress() {
		this.switchModeTo(Mode.Default);
	}

	//----------------------------------------------------------------------------
	// Action Sheet: presentTableActions
	//----------------------------------------------------------------------------
	presentTableActions(table: Table) {

		let tableActions = this.actionSheetCtrl.create({
			title: 'Table ' + table.ID,
			buttons: [
				{
					text: (table.free? "Seat Party" : "Free Table"),
					handler: () => {
						if (table.free) {
							console.log('Seat Table tapped on table ' + table.ID);
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
			title: party.name + '\'s ' + (party.reservation? "Reservation" : "Party"),
			buttons: [
				{
					text: 'Seat Party',
					handler: () => {
						console.log('Selected Party ' + party.ID + ' to seat');
						this.switchModeTo(Mode.SeatingParty, party);
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
	// MODAL TRIGGERS
	//----------------------------------------------------------------------------
	displayTableInfo(t: Table) {
		let modal = this.modalCtrl.create(TableInfo, { table: t });
		modal.present();
	}

	displayPartyInfo(p: Party) {
		let modal = this.modalCtrl.create(PartyInfo, { party: p });
		modal.present();
	}

	displaySeatTableNumpad(t: Table) {
		let modal = this.modalCtrl.create(NumToSeat, { table: t });
		modal.onDidDismiss(numToSeat => {
			if (numToSeat != null) {
				console.log('NumToSeat returned: ' + numToSeat);
				this.displaySelectServer(t, numToSeat);
			}
		});
		modal.present();
	}

	displaySelectServer(table: Table, numToSeat: number) {

		let modal = this.modalCtrl.create(SelectServer, {servers: this.servers});
		modal.onDidDismiss(server => {
			if (server != null) {
				console.log('SelectServer returned: ' + server.name);
				table.seat(numToSeat, server.name, this.datetime.getTime(), null);
				if (this.seatingPartyMode()) {
					this.deleteParty(this.selectedParty);
					this.switchModeTo(Mode.Default);
				}
			}
		});
		modal.present();
	}

	//----------------------------------------------------------------------------
	// AUXILLARY FUNCTIONS
	//----------------------------------------------------------------------------
	switchModeTo(newMode: Mode, party?: Party) {
		if (this.mode == newMode) {
			console.log('ERROR: tried to change mode to the same mode it is in');
			return;
		}
		if (Mode.SeatingParty == newMode) {
			if (party != null) {
				this.selectedParty = party;
			} else {
				console.log('ERROR: tried to change mode to Seating Party without party passed');
				return;
			}
		} else {
			this.selectedParty = null;
		}
		this.mode = newMode;
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

	editingLayoutMode(): boolean {
		return this.mode == Mode.EditingLayout;
	}
	seatingPartyMode(): boolean {
		return this.mode == Mode.SeatingParty;
	}
	defaultMode(): boolean {
		return this.mode == Mode.Default;
	}

	interactjsUpdate(enabled: boolean) {

		if (enabled) {
			interact('.tablediv').draggable({

			  	snap: {
			      targets: [
			        interact.createSnapGrid({ x: 10, y: 10 })
			      ],
			      range: Infinity,
			      relativePoints: [ { x: 0, y: 0 } ]
		    	},
			    // enable inertial throwing
			    inertia: false,
			    // keep the element within the area of it's parent
			    restrict: {
			      restriction: "parent",
			      endOnly: true,
			      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			    },
			    // enable autoScroll
			    autoScroll: true,

			    // call this function on every dragmove event
			    onmove: dragMoveListener,
			    // call this function on every dragend event
			    onend: function (event) { }
			  })
		} else {
			interact('.tablediv').draggable(false)
		}

	  function dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	    //target.setAttribute('')
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
				<ion-label class="regularText">Time In: {{t.timeIn}}</ion-label>
				<ion-label class="regularText">Server: {{t.server}}</ion-label>
				<ion-label class="regularText">Guest: {{t.guest}}</ion-label>
				<div class="modalbuttons">
					<button class="modalbutton" ion-button block
									(click)="dismiss()">Dismiss</button>
				</div>
			</ion-list>
		</div>
	`
})
export class TableInfo {

	t: Table;

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

	p: Party;

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

	constructor(public alertCtrl: AlertController,
							public viewCtrl: ViewController,
							private params: NavParams) {
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
							this.viewCtrl.dismiss(this.numToSeat);
						}
					}
				]
			});
			confirm.present();

		} else if (this.numToSeat < 1) {
			let alert = this.alertCtrl.create({
				title: 'Invalid Party Size',
				enableBackdropDismiss: false,
				buttons: [
					{
						text: 'Dismiss',
						handler: () => { }
					}
				]
			});
			alert.present();

		} else {
			this.viewCtrl.dismiss(this.numToSeat);
		}
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}
}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
	selector: 'page-tables',
	template: `
		<div id="servermodal">
			<ion-list id="modalcontent">
				<ion-label class="header">Select Server</ion-label>
				<ion-content id="serverlist">
					<ion-list scroll="true" id="listscroll">
						<button ion-button block outline class="listbutton"
										*ngFor="let server of servers"
										[ngClass]="{'selectedserver': server === selectedServer,
																'server': server !== selectedServer}"
										(click)="selectServer(server)">
							{{server.name}}
						</button>
					</ion-list>
				</ion-content>
				<button class="modalbutton" ion-button block
									(click)="OK()">OK</button>
				<button class="modalbutton" ion-button block outline
									(click)="cancel()">Cancel</button>
			</ion-list>
		</div>
	`
})
export class SelectServer {

	servers: Employee[];
	selectedServer: Employee;

	constructor(public viewCtrl: ViewController,
							private params: NavParams) {
		this.servers = params.get('servers');
		this.selectedServer = this.servers[0];
	}

	selectServer(s: Employee) {
		this.selectedServer = s;
	}

	OK() {
		this.viewCtrl.dismiss(this.selectedServer);
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}

}

////////////////////////////////////////////////////////////////////////////////
// Classes
////////////////////////////////////////////////////////////////////////////////

export class Table {

	// TODO: change from static ID runner to getting current ID runner from DB
	static ID_runner: number = 1;

	ID: number;
	capacity: number;
	free: boolean;
	partySize: number;
	timeIn: string;
	server: string;
	guest: string;

	xPos: string;
	yPos: string;

	constructor(capacityIn: number, xPos?: string, yPos?: string) {
		this.ID = Table.ID_runner;
		Table.ID_runner += 1;
		this.capacity = capacityIn;
		this.free = true;
		this.partySize = 0;
		this.timeIn = "N/A";
		this.server = "N/A";
		this.guest = "N/A";

		if (xPos) {
			this.xPos = xPos;
		} else {
			this.xPos = "0";
		}
		if (yPos) {
			this.yPos = yPos;
		} else {
			this.yPos = "0";
		}
	}

	getStatus(): string {
		return this.free? "Free" : "Occupied";
	}

	getButtonText(): string {
		return this.free? String(this.capacity) : this.partySize + '/' + this.capacity
	}

	freeTable() {
		console.log('Table ' + this.ID + ' freed');
		this.free = true;
		this.partySize = 0;
		this.timeIn = "N/A";
		this.server = "N/A";
		this.guest = "N/A";
	}

	seat(size: number, server: string, timeIn: string, guest: string) {
		this.free = false;
		this.partySize = size;
		this.timeIn = timeIn;
		this.server = server;
		this.guest = (guest != null)? guest : "N/A";
		console.log('Seated ' + size + ' people at Table ' + this.ID);
	}


}

export class Party {

	static ID_runner: number = 1;

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
		this.name = name;
		this.size = size;
		this.time = time;
		this.contact = contact;
		this.reservation = reservation;
	}

	getKind(): string {
		return this.reservation? "Reservation" : "Party";
	}

	display(): string {
		return this.time + ' | ' + this.name + ' | ' + this.size;
	}

	static compare(p1, p2) {
		if (p1.reservation && !p2.reservation)
			return -1;
		if (!p1.reservation && p2.reservation)
			return 1;
		else {
			var h1 = parseInt(p1.time.substring(0,2));
			var h2 = parseInt(p2.time.substring(0,2));
			if (h1 < h2)
				return -1;
			if (h1 > h2)
				return 1;

			var m1 = parseInt(p1.time.substring(3,5));
			var m2 = parseInt(p2.time.substring(3,5));
			if (m1 < m2)
				return -1;
			if (m1 > m2)
				return 1;
		}
		return 0;
	}
}

export enum Mode {
	Default = 0,
	SeatingParty = 1,
	EditingLayout = 2
}

// Place holder server
export class Employee {
	name:string;
	constructor(name: string) {
		this.name = name;
	}
}
