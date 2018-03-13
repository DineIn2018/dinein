import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-tables',
  templateUrl: 'tables.html'
})
export class TablesPage {

  constructor(public navCtrl: NavController,
  					  public actionSheetCtrl: ActionSheetController,
  					  public alertCtrl: AlertController) { }

  tables: Table[] = [ new Table(0,2), new Table(1,4), new Table(2,6)];
  parties: Party[] = [ new Party(0, "Kass", 7, "4:20pm", "608 609 5186", true),
  										 new Party(1, "Casey", 4, "5:55pm", "608 608 6006", true),
  										 new Party(2, "Kameron", 2, "6:15pm", "506 506 5006", false),
  										 new Party(3, "Jimmie", 3, "8:01pm", "999 999 9999", false),
  										 new Party(4, "Suzy", 1000, "9:00pm", "012 345 6789", false),
  										 new Party(5, "Bryan", 1, "11:59pm", "666 666 6666", false),
  									 ]

	presentTableActions(ID: number) {

		var seatOrFree:string;

		if (this.tables[ID].free) {
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
						if (this.tables[ID].free) {
							console.log('Seat Party tapped on table ' + ID);
							// TODO: Let user select party size
							this.tables[ID].seatParty(1);
						} else {
							console.log('Free Table tapped on table ' + ID);
							// TODO: Let user select party size
							this.tables[ID].freeTable();
						}
						
					}
				},
				{
					text: 'Table Information',
					handler: () => {
						console.log('Table ' + ID + ' info tappped');
						this.displayInfo(this.tables[ID]);
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

	presentPartyActions(ID: number) {

		let partyActions = this.actionSheetCtrl.create({
			title: 'Party Actions',
			buttons: [
				{
					text: 'Seat Party',
					handler: () => {
						console.log('Party ' + ID + ' seated');
						this.parties.splice(ID, 1);
					}
				},
				{
					text: 'Party Information',
					handler: () => {
						console.log('Party ' + ID + ' info tappped');
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

	displayInfo(t: Table) {
    let alert = this.alertCtrl.create({
      title: 'Table: ' + t.ID,
      subTitle: 'Capacity: ' + t.capacity +
      					'\nStatus: ' + t.free + 
      					'\nCurrent Party: ' + t.partySize +
      					'\nServer: ' + t.server,
      buttons: ['Dismiss']
    });
    alert.present();
	}


}

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

	constructor (ID:number, name: string, size: number, time: string, contact: string, reservation: boolean) {
		this.ID = ID;
		this.name = name;
		this.size = size;
		this.time = time;
		this.contact = contact;
		this.reservation = reservation;
	}

	display(): string {
		return this.name + ', ' + this.size + ', ' + this.time;
	}
}
