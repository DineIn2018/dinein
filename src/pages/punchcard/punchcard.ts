import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams, AlertController } from 'ionic-angular';
import { Employee, EmployeeShift } from '../employees/employees';
import { DateTimeService } from '../util/date-time';

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
							private dateTime: DateTimeService) {

		this.displayShiftList = [];
		this.allShifts = [];
		this.selectedEmployeeID = null;
		this.filterStartDate = null;
		this.filterEndDate = null;

		this.employees =
			[
				new Employee("Carl", "Robins", "Assistant Manager", 30, 6083456789, "http://www.math.uni-frankfurt.de/~person/_4170854.jpg"),
				new Employee("Marianne", "Beaumont", "Hostess", 15, 9119119911, "http://www.pearsonvue.com/pteprofessional/images/homepage.png"),
				new Employee("Anna", "Schmidt", "Manager", 50, 6086076006, "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg"),
				new Employee("Valerie", "Carter", "Owner", 1003, 2024561111, "https://cdn10.phillymag.com/wp-content/uploads/2016/01/woman-biz.jpg"),
				new Employee("Phil", "Scott", "Bartender", 10, 6083104545, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg"),
				new Employee("Kevin", "Anderson", "Server", 5, 6088067777, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl"),
				new Employee("Tina", "Russo", "Head Chef", 500, 4149217439, "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg"),
				new Employee("Bryan", "Suzan", "DJ", 0.03, 6666666666, "../../assets/imgs/bryan.jpg")
			];

		this.employees[7].shifts = [
																new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Bryan Suzan"),
																new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Bryan Suzan"),
																new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("04/20/2018 04:20", "04/20/2018 14:20", "Bryan Suzan"),
																new EmployeeShift("04/21/2018 00:20", "04/21/2018 01:54", "Bryan Suzan"),
																new EmployeeShift("02/01/2018 06:01", "02/01/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("02/02/2018 07:01", "02/02/2018 07:15", "Bryan Suzan"),
																new EmployeeShift("02/14/2018 08:01", "02/14/2018 09:30", "Bryan Suzan"),
																new EmployeeShift("04/01/2018 18:01", "04/02/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("04/20/2018 04:21", "04/20/2018 14:20", "Bryan Suzan"),
																new EmployeeShift("04/21/2018 00:21", "04/21/2018 01:54", "Bryan Suzan")
																//new EmployeeShift("04/22/2018 07:01", undefined, "Bryan Suzan")
															 ];
		this.employees[0].shifts = [
																new EmployeeShift("02/01/2018 00:00", "02/01/2018 23:59", "Carl Robins"),
																new EmployeeShift("02/02/2018 23:45", "02/03/2018 00:15", "Carl Robins"),
																new EmployeeShift("02/11/2018 08:13", "02/14/2018 13:22", "Carl Robins"),
																new EmployeeShift("04/20/2018 18:00", "04/02/2018 18:00", "Carl Robins"),
																new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Carl Robins")
															 ];
		this.employees[1].shifts = [
																new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Marianne Beaumont"),
																new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Marianne Beaumont"),
																new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Marianne Beaumont"),
																new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Marianne Beaumont"),
																new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Marianne Beaumont")
															 ];
		this.employees[2].shifts = [
																new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Anna Schmidt"),
																new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Anna Schmidt"),
																new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Anna Schmidt"),
																new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Anna Schmidt"),
																new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Anna Schmidt")
															 ];

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
						this.dateTime.sameDay(tmp[i].endTime, this.filterStartDate) ||
						this.dateTime.sameDay(tmp[i].startTime, this.filterEndDate) ||
						this.dateTime.sameDay(tmp[i].endTime, this.filterEndDate)) {
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
			<ion-content class="modallist">
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
