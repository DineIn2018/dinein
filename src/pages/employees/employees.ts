import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { EditEmployeePage } from './edit-employee';

import { Restaurant, Table, Party, Employee, EmployeeShift } from '../util/classes';
import { InputNumpad } from '../util/numpad';
import { DataService } from '../util/data-service';
//import { Restaurant } from '../management/management';
//import { Table, Party } from '../tables/tables';
import { DbHelperProvider } from '../../providers/dbhelper/dbhelper';

@Component({
	selector: 'page-employees',
	templateUrl: 'employees.html',
	providers: [ DbHelperProvider ]
})

export class EmployeesPage {
	//searchQuery: string = '';

	placeholderImg: string = "https://openskymerchants.files.wordpress.com/2013/10/smile_icon.png";

	employees: Employee[];
	selectedEmployee: Employee;
	managerPin: number;

	constructor(public navCtrl: NavController,
							public popCtrl: PopoverController,
							public modalCtrl: ModalController,
							public alertCtrl: AlertController,
							public data: DataService,
							public DBHelper: DbHelperProvider) {

		let restaurant = data.getRestaurant();
		this.employees = restaurant.employees;
		this.managerPin = restaurant.managerPin;

		//this.employees.sort(Employee.sortByLastName);
		this.selectedEmployee = this.employees[0];
	}

	presentPunchPopover(anEvent) {
		let popover = this.popCtrl.create(PunchPopoverPage,{selectedEmployee: this.selectedEmployee});

		popover.present({
			ev: anEvent
		});
	}

	onEditEmployeePress() {
		var pin = this.managerPin;
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Enter PIN",
										alertTitle: "Invalid PIN",
										alertMsg: null,
										validInputCondition: function(input) {
											return input == pin;
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if ((returnedNum == this.managerPin) && (returnedNum != null)) {
				console.log(returnedNum);
				this.navCtrl.push(EditEmployeePage, { editMode: true,
																							employee: this.selectedEmployee,
																							employeesList: this.employees });
			}
		});
		numpadModal.present();
	}

	onCreateEmployeePress() {
		var pin = this.managerPin;
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Enter PIN",
										alertTitle: "Invalid PIN",
										alertMsg: null,
										validInputCondition: function(input) {
											return input == pin;
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			console.log(returnedNum);
			console.log(this.managerPin);
			if ((returnedNum == this.managerPin) && (returnedNum != null)) {
				this.navCtrl.push(EditEmployeePage, { editMode: false,
																							employee: null,
																							employeesList: this.employees });
			}
		});
		numpadModal.present();

	}

	selectEmployee(myEvent, employee) {
		this.selectedEmployee = employee;
	}

}
//@IonicPage()
@Component({

	selector: 'page-employees',

	template: `

	<ion-content class="popover">
		<ion-item>
			<h3>{{selectedEmployee.firstName}}'s Punches</h3>
		</ion-item>
		<ion-item>
			<ion-label>From:</ion-label>
			<ion-datetime displayFormat="YYYY-MMM-DD" pickerFormat="DD-MMMM-YYYY" max="{{currentDate}}" [(ngModel)]="startDate"></ion-datetime>
		</ion-item>
		<ion-item>
			<ion-label>To:</ion-label>
			<ion-datetime displayFormat="YYYY-MMM-DD" pickerFormat="DD-MMMM-YYYY" min="{{startDate}}" max="{{currentDate}}" [(ngModel)]="endDate"></ion-datetime>
		</ion-item>
		<button ion-item (click)="close()">VIEW</button>
	</ion-content>


	`
})
export class PunchPopoverPage {

	startDate: string;
	currentDate: string;
	endDate: string;
	dd: any;
	mm: any;
	selectedEmployee: Employee;

	constructor(public viewCtrl: ViewController,
							public popCtl: PopoverController,
							private navParams: NavParams) {

		this.selectedEmployee = this.navParams.get("selectedEmployee");
		let currDate = new Date(); //initialized to current date
		this.dd = currDate.getDate();
		this.mm = currDate.getMonth() + 1; //January is 0
		let yyyy = currDate.getFullYear();
		if (this.dd < 10) {
			this.dd = '0' + this.dd;
		}
		if (this.mm < 10) {
			this.mm = '0' + this.mm;
		}
		this.startDate = yyyy + "-" + this.mm + "-" + this.dd;
		this.endDate = this.startDate;
		this.currentDate = this.startDate;
	}

	close() {
		this.viewCtrl.dismiss();
	}
}
