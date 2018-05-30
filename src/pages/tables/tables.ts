import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { AddPartyPage } from './add-party';
import { DateTimeService } from '../util/date-time';
import { InputNumpad } from '../util/numpad';
import * as interact from 'interactjs';

import { DataService } from '../util/data-service';
import { Restaurant, Table, Party, Employee, EmployeeShift } from '../util/classes';

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

	restaurantName: string;
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
							private datetime: DateTimeService,
							public data: DataService) {

		this.mode = Mode.Default;
		this.selectedParty = null;

		let restaurant = this.data.getRestaurant();
		this.restaurantName = restaurant.name;
		this.tables = restaurant.tables;
		this.parties = restaurant.parties;
		this.servers = restaurant.employees;

		this.parties.sort(Party.compare);

		// TODO: get tables and parties from Database
		// Filter "parties" by date, get only the ones for today
		// Only reservations are going persist in database, grab those from database
		// TODO: write sorting algorithm for the whole list
	}

	ionViewDidLoad() {
		var i;
		for(i = 0; i < this.tables.length; i++) {
			let table = this.tables[i];
			var tableElement = document.getElementById('table'+table.ID);
			tableElement.setAttribute('data-x', table.xPos);
	    tableElement.setAttribute('data-y', table.yPos);
	    tableElement.style.webkitTransform =
	    tableElement.style.transform =
	      'translate(' + table.xPos + 'px, ' + table.yPos + 'px)';
		}
	}

	ionViewWillLeave() {
		var i;
		for(i = 0; i < this.tables.length; i++) {
			let table = this.tables[i];
			var tableElement = document.getElementById('table'+table.ID);
			var x = tableElement.getAttribute('data-x');
	    var y = tableElement.getAttribute('data-y');
	    table.xPos = x;
	    table.yPos = y;
		}
	}

	//----------------------------------------------------------------------------
	// Button Action: onTablePress
	//----------------------------------------------------------------------------
	onTablePress(table: Table) {

		if (this.editingLayoutMode()) {
			/*
			let confirm = this.alertCtrl.create({
				title: 'Confirm Table Delete',
				message: 'This cannot be undone, are you sure?',
				enableBackdropDismiss: false,
				buttons: [
					{
						text: 'Cancel',
						handler: () => { }
					},
					{
						text: 'Delete',
						handler: () => { this.deleteTable(table); }
					}
				]
			});
			confirm.present();*/
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
					text: 'Delete Table',
					handler: () => {
						let confirm = this.alertCtrl.create({
							title: 'Confirm Table Delete',
							message: 'This cannot be undone, are you sure?',
							enableBackdropDismiss: false,
							buttons: [
								{
									text: 'Cancel',
									handler: () => { }
								},
								{
									text: 'Delete',
									handler: () => { this.deleteTable(table); }
								}
							]
						});
						confirm.present();
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

		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Party Size",
										alertTitle: "Invalid Party Size",
										alertMsg: null,
										validInputCondition: function(input) { return input > 0; },
										secondaryValidInputCondition: function(input) { return input <= t.capacity; },
										secondaryAlertTitle: "Table is too Small",
										secondaryAlertMsg: "Are you sure you want to seat overcapacity?",
										secondaryAlertButton: "Seat"
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				this.displaySelectServer(t, returnedNum);
			}
		});
		numpadModal.present();
	}

	displaySelectServer(table: Table, numToSeat: number) {

		let modal = this.modalCtrl.create(SelectServer, {servers: this.servers});
		modal.onDidDismiss(server => {
			if (server != null) {
				table.seat(numToSeat, server.firstName, this.datetime.getTime(), null);
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
		this.parties.splice(this.parties.indexOf(party), 1);
	}

	deleteTable(table: Table) {
		this.tables.splice(this.tables.indexOf(table), 1);
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

	addTable() {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Table Capacity",
										alertTitle: "Invalid Table Capacity",
										alertMsg: null,
										validInputCondition: function(input) {
											return (input > 0) && (input < 100);
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				let t = new Table(returnedNum, "0", "0")
				this.tables.push(t);
			}
		});
		numpadModal.present();
	}

	interactjsUpdate(enabled: boolean) {

		if (enabled) {
			interact('.tablediv').draggable({

			  	snap: {
			      targets: [
			        { x: 10, y: 10 }
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
			//interact('.tablediv').draggable(false)
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
		<div id="tablemodal" class="modalbase">
			<h3 class="colorprimary">Table {{t.ID}}</h3>
			<h5 class="colormedium">Status: {{t.getStatus()}}</h5>
			<h5 class="colormedium">Capacity: {{t.capacity}}</h5>
			<h5 class="colormedium">Current Party: {{t.partySize}}</h5>
			<h5 class="colormedium">Time In: {{t.timeIn}}</h5>
			<h5 class="colormedium">Server: {{t.server}}</h5>
			<h5 class="colormedium">Guest: {{t.guest}}</h5>

			<div style="margin-top: 30px;">
				<button class="modalbutton" ion-button block (click)="dismiss()">
					Dismiss
				</button>
			</div>
		</div>
	`
})
export class TableInfo {

	t: Table;

	constructor(public navCtrl: NavController, params: NavParams) {
		this.t = params.get('table');
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
		<div id="partymodal" class="modalbase">
			<h3 class="colorprimary">{{p.name}}'s {{p.getKind()}}</h3>
			<h5 class="colormedium">Size: {{p.size}}</h5>
			<h5 class="colormedium">Arrival Time: {{p.time}}</h5>
			<h5 class="colormedium">Contact: {{p.getContactStr()}}</h5>
			<h5 class="colormedium">ID: {{p.ID}}</h5>

			<div style="margin-top: 30px;">
				<button class="modalbutton" ion-button block (click)="dismiss()">
					Dismiss
				</button>
			</div>
		</div>
	`
})
export class PartyInfo {

	p: Party;

	constructor(public navCtrl: NavController, params: NavParams) {
		this.p = params.get('party');
	}

	dismiss() {
		this.navCtrl.pop();
	}
}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
	selector: 'page-tables',
	template: `
		<div id="servermodal" class="modalbase">
				<h4 class="colorprimary">Select Server</h4>
				<ion-content class="modallist">
					<ion-list scroll="true" id="listscroll">
						<button ion-button block outline class="listbutton"
										*ngFor="let server of servers"
										[ngClass]="{'selectedserver': server === selectedServer,
																'server': server !== selectedServer}"
										(click)="selectServer(server)">
							{{server.getFullName()}}
						</button>
					</ion-list>
				</ion-content>
				<button class="modalbutton modalbuttonprimary" ion-button block
									(click)="OK()">OK</button>
				<button class="modalbutton redbutton" ion-button block outline
									(click)="cancel()">Cancel</button>
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


export enum Mode {
	Default = 0,
	SeatingParty = 1,
	EditingLayout = 2
}
