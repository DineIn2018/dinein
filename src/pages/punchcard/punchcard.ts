import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams, AlertController } from 'ionic-angular';

import { Restaurant, Table, Party, Employee, EmployeeShift } from '../util/classes';
import { DateTimeService } from '../util/date-time';

import { DataService } from '../util/data-service';

@Component({
	selector: 'page-punchcard',
	templateUrl: 'punchcard.html'
})
export class PunchCardPage {

	displayShiftList: EmployeeShift[];
	employees: Employee[];
	allShifts: EmployeeShift[];
	filterStartDate: string;
	filterEndDate: string;

	selectedEmployeeID: number;

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public alertCtrl: AlertController,
							private dateTime: DateTimeService,
							public data: DataService) {

		this.displayShiftList = [];
		this.allShifts = [];
		this.selectedEmployeeID = null;
		this.filterStartDate = null;
		this.filterEndDate = null;

		let restaurant = this.data.getRestaurant();
		this.employees = restaurant.employees;

		var i;
		for (i = 0; i < this.employees.length; i++) {
			this.employees[i].shifts.sort(EmployeeShift.compare);
			var j;
			for (j = 0; j < this.employees[i].shifts.length; j++) {
				this.allShifts.push(this.employees[i].shifts[j]);
			}
		}
		this.allShifts.sort(EmployeeShift.compare);

		this.filterShiftByLatest(30);
	}

	filterShiftByEmployeeID(ID: number, shiftCount?: number) {
		let employee: Employee = this.getEmployeeByID(ID);
		let limit = shiftCount? shiftCount : 100;
		var i, count;
		for(i = employee.shifts.length-1, count = 0;
				(i >=0) && (count <= limit);
				i--, count++) {
			this.displayShiftList.push(employee.shifts[i]);
		}
	}

	filterShiftByLatest(shiftCount?: number) {
		let limit = shiftCount? shiftCount : 100;
		var i, count;
		for(i = this.allShifts.length-1, count = 0;
				(i >= 0) && (count <= limit);
				i--, count++) {
			this.displayShiftList.push(this.allShifts[i]);
		}
	}

	filterShiftByDate() {
		let tmp: EmployeeShift[] = [];
		var j;
		for (j = 0; j < this.displayShiftList.length; j++) {
			tmp.push(this.displayShiftList[j]);
		}
		this.clearDisplayShiftList();

		var i;
		if (this.filterBySingleDate()) {
			for (i = 0; i < tmp.length; i++) {
				if (this.dateTime.sameDay(tmp[i].startTime, this.filterStartDate) ||
						this.dateTime.sameDay(tmp[i].startTime, this.filterEndDate))/* ||
						this.dateTime.sameDay(tmp[i].endTime, this.filterStartDate) ||
						this.dateTime.sameDay(tmp[i].endTime, this.filterEndDate))*/ {
					this.displayShiftList.push(tmp[i]);
				}
			}
		} else if (this.filterByInterval()) {
			for (i = 0; i < tmp.length; i++) {
				if (this.dateTime.inBetween(tmp[i].startTime, this.filterStartDate, this.filterEndDate)) {
					this.displayShiftList.push(tmp[i]);
				}
			}
		}
	}

	getEmployeeByID(ID: number) {
		var i: number;
		for (i = 0; i < this.employees.length; i++) {
			if (ID == this.employees[i].ID) {
				return this.employees[i];
			}
		}
		return null // SHOULD NOT BE REACHED
	}

	presentEmployeeSelector() {
		let modal = this.modalCtrl.create(SelectEmployee, {employees: this.employees});
		modal.onDidDismiss(data => {
			if (data != null) {
				this.selectedEmployeeID = data;
			}
		});
		modal.present();
	}

	applyFilter() {

		if (this.selectedEmployeeID == null) {
			let alert = this.alertCtrl.create({
					title: 'Please Select an Employee',
					enableBackdropDismiss: false,
					buttons: [ { text: 'OK', handler: () => {} } ]
				});
			alert.present();
			return;
		}
		if (!this.noTimeFilter() && !this.filterBySingleDate() &&
				!(this.filterStartDate == this.filterEndDate)) {
			if (!this.dateTime.isBefore(this.filterStartDate, this.filterEndDate)) {
				let alert = this.alertCtrl.create({
					title: 'The End Date is Before the Start Date',
					enableBackdropDismiss: false,
					buttons: [ { text: 'OK', handler: () => {} } ]
				});
				alert.present();
				return;
			}
		}

		this.clearDisplayShiftList();
		if (this.selectedEmployeeID == 0) {
			this.filterShiftByLatest();
		} else {
			this.filterShiftByEmployeeID(this.selectedEmployeeID);
		}
		if (!this.noTimeFilter()) {
			this.filterShiftByDate();
		}
	}

	clearDisplayShiftList() {
		this.displayShiftList.length = 0;
	}

	filterBySingleDate(): boolean {
		return !this.filterByInterval() && !this.noTimeFilter();
	}

	filterByInterval(): boolean {
		return ((this.filterStartDate != null) && (this.filterEndDate != null) &&
						!(this.filterStartDate == this.filterEndDate));
	}

	noTimeFilter(): boolean {
		return (this.filterStartDate == null) && (this.filterEndDate == null);
	}

}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
	selector: 'page-punchcard',
	template: `
		<div id="employeemodal" class="modalbase">
			<h4 class="colormedium">Select Employee</h4>
			<ion-content class="modallist3buttons">
				<ion-list scroll="true">
					<button ion-button block outline class="listbutton"
									*ngFor="let employee of employees"
									[ngClass]="{'selectedemployee': employee === selectedEmployee,
															'employee': employee !== selectedEmployee}"
									(click)="selectEmployee(employee)">
						{{employee.getFullName()}}
					</button>
				</ion-list>
			</ion-content>
			<button class="modalbutton" ion-button block
								(click)="OK()">OK</button>
			<button class="modalbutton" ion-button block outline
								(click)="cancel()">Cancel</button>
			<button class="modalbutton" ion-button block outline
								(click)="selectAllEmployees()">Select All</button>
		</div>
	`
})
export class SelectEmployee {

	employees: Employee[];
	selectedEmployee: Employee;

	constructor(public viewCtrl: ViewController,
							private params: NavParams) {
		this.employees = params.get('employees');
		this.selectedEmployee = this.employees[0];
	}

	selectEmployee(e: Employee) {
		this.selectedEmployee = e;
	}

	OK() {
		this.viewCtrl.dismiss(this.selectedEmployee.ID);
	}

	selectAllEmployees() {
		this.viewCtrl.dismiss(0);
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}

}
