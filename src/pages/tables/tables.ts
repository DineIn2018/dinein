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

	displayInfo(t: Table) {
    let alert = this.alertCtrl.create({
      title: 'Table: ' + t.ID,
      subTitle: 'Capacity: ' + t.capacity,
      subTitle:	'Status: ' + t.free,
      subTitle:	'Current Party: ' + t.partySize,
      subTitle: 'Server: ' + t.server,
      buttons: ['Dismiss']
    });
    alert.present();
	}


}

class Table {
	ID: number;
	capacity: number;
	free: bool;
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
